import OpenAI from "openai";
import type { Lead, ResearchResult } from "@/types";

const openai = new OpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  baseURL: process.env.AZURE_OPENAI_BASE_URL,
});

const TAVILY_API_URL = "https://api.tavily.com/search";
const TAVILY_TIMEOUT_MS = 15_000;

interface TavilySearchResult {
  title: string;
  url: string;
  content: string;
  score: number;
}

interface TavilyResponse {
  results: TavilySearchResult[];
  answer?: string;
}

async function tavilySearch(
  query: string,
  maxResults = 5
): Promise<TavilySearchResult[]> {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) {
    console.warn("TAVILY_API_KEY not set — skipping Tavily search");
    return [];
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TAVILY_TIMEOUT_MS);

  try {
    const res = await fetch(TAVILY_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: apiKey,
        query,
        max_results: maxResults,
        include_answer: false,
        search_depth: "advanced",
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      console.error(`Tavily search failed: ${res.status}`);
      return [];
    }

    const data = (await res.json()) as TavilyResponse;
    return data.results || [];
  } catch (err) {
    console.error("Tavily search error:", err);
    return [];
  } finally {
    clearTimeout(timer);
  }
}

export async function researchLead(lead: Lead): Promise<ResearchResult> {
  const company = lead.company || "";
  const industry = lead.industry || "";
  const name = lead.name;

  // Run multiple Tavily searches in parallel for comprehensive coverage
  const [companyResults, personResults, industryResults] =
    await Promise.allSettled([
      company
        ? tavilySearch(
            `${company} company overview recent news ${industry} 2025 2026`,
            5
          )
        : Promise.resolve([]),
      tavilySearch(
        `${name}${company ? ` ${company}` : ""} professional background`,
        3
      ),
      industry
        ? tavilySearch(
            `${industry} industry challenges pain points trends 2026`,
            3
          )
        : Promise.resolve([]),
    ]);

  const allResults: { label: string; results: TavilySearchResult[] }[] = [];

  if (
    companyResults.status === "fulfilled" &&
    companyResults.value.length > 0
  ) {
    allResults.push({
      label: "Company Research",
      results: companyResults.value,
    });
  }
  if (personResults.status === "fulfilled" && personResults.value.length > 0) {
    allResults.push({ label: "Person Research", results: personResults.value });
  }
  if (
    industryResults.status === "fulfilled" &&
    industryResults.value.length > 0
  ) {
    allResults.push({
      label: "Industry Research",
      results: industryResults.value,
    });
  }

  const sources = allResults.flatMap((r) => r.results.map((s) => s.url));

  if (allResults.length === 0) {
    return {
      company_overview: null,
      industry_challenges: [],
      recent_news: [],
      competitive_landscape: null,
      pain_points: [],
      talking_points: [],
      sources: [],
      researched_at: new Date().toISOString(),
    };
  }

  // Compile all search results into a single context document
  const searchContext = allResults
    .map(
      (section) =>
        `### ${section.label}\n\n` +
        section.results
          .map((r) => `**${r.title}** (${r.url})\n${r.content}`)
          .join("\n\n")
    )
    .join("\n\n---\n\n");

  // Synthesize with LLM
  const systemPrompt = `You are an expert B2B sales researcher. Analyse the web search results below and produce structured research about a lead for use in sales outreach.

Lead info:
- Name: ${name}
- Email: ${lead.email}
- Company: ${company || "unknown"}
- Industry: ${industry || "unknown"}

Return a JSON object with this exact shape:
{
  "company_overview": "string or null — 2-3 sentence overview of the company",
  "industry_challenges": ["top 3 challenges facing this industry right now"],
  "recent_news": ["up to 3 recent news items about the company or person"],
  "competitive_landscape": "string or null — brief competitive context",
  "pain_points": ["3-5 specific pain points this lead/company likely faces"],
  "talking_points": ["3-5 specific conversation starters for outreach — reference real details from the research"]
}

Focus on actionable intelligence for crafting personalised outreach emails.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-5.3-chat",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: `Web search results:\n\n${searchContext}` },
    ],
    response_format: { type: "json_object" },
  });

  const raw = completion.choices[0]?.message?.content;
  if (!raw) {
    return {
      company_overview: null,
      industry_challenges: [],
      recent_news: [],
      competitive_landscape: null,
      pain_points: [],
      talking_points: [],
      sources,
      researched_at: new Date().toISOString(),
    };
  }

  const parsed = JSON.parse(raw) as Omit<
    ResearchResult,
    "sources" | "researched_at"
  >;

  return {
    ...parsed,
    sources,
    researched_at: new Date().toISOString(),
  };
}
