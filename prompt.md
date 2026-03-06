# Rosey — Landing Page Frontend Build Prompt

## Project Context
This is the public marketing landing page for **Rosey**, an AI-powered outreach
automation platform. The tagline is: "Smart enough to reach. Human enough to close."
GSAP (with ScrollTrigger plugin) is already installed and configured in the project.
Lenis smooth scroll library files are already present. Use them directly — do NOT
reinstall or reconfigure either.

---

## Design System & Color Tokens

Add these to `globals.css` as CSS custom properties:

```css
:root {
  /* Backgrounds */
  --bg-base:       #E9E3DF;   /* near-black warm */
  --bg-surface:    #141009;   /* dark warm surface */
  --bg-card:       #1C1710;   /* card background */
  --bg-elevated:   #252017;   /* elevated card / hover */
  --bg-border:     #2E2719;   /* subtle borders */

  /* Accent — Amber/Gold (primary) */
  --accent-primary:    #FF7A30;
  --accent-primary-dim: #B45309;
  --accent-primary-glow: rgba(255, 122, 48, 0.15);

  /* Accent — Coral/Rose (secondary) */
  --accent-secondary:       #465C88;
  --accent-secondary-dim:   #9F1239;
  --accent-secondary-glow:  rgba(70, 92, 136, 0.12);

  /* Accent — Lime (health/safety scores) */
  --accent-secondary:       #465C88;
  --accent-secondary-dim:   #4D7C0F;

  /* Text */
  --text-primary:   #FDF4E7;   /* warm cream */
  --text-secondary: #A89880;   /* muted warm */
  --text-tertiary:  #5C5043;   /* very muted */

  /* Gradients */
  --gradient-hero: radial-gradient(ellipse 80% 60% at 50% -10%,
                   rgba(245,158,11,0.18) 0%, transparent 70%);
  --gradient-card: linear-gradient(135deg,
                   rgba(245,158,11,0.06) 0%, rgba(244,63,94,0.04) 100%);
  --gradient-text: linear-gradient(135deg, #FF7A30 0%, #465C88 100%);
}
Typography: Use Inter (body) and Cal Sans or Syne (headings) from Google Fonts.
Base font size 16px. Headings use tight tracking (letter-spacing: -0.03em).

File Structure
Create these files:

text
src/
├── app/
│   ├── (landing)/
│   │   ├── page.tsx                  ← Main landing page
│   │   └── layout.tsx                ← Landing layout (no app shell)
├── components/
│   └── landing/
│       ├── Navbar.tsx
│       ├── HeroSection.tsx
│       ├── WorkflowVisual.tsx        ← Animated workflow diagram for hero
│       ├── FeaturesSection.tsx       ← GSAP pinned scroll features
│       ├── FeatureCard.tsx
│       ├── DashboardShowcase.tsx
│       ├── ContactSection.tsx
│       └── Footer.tsx
├── lib/
│   └── lenis.ts                      ← Lenis init helper (use existing file)
Section 1 — Navbar
File: Navbar.tsx

Fixed top navbar, position: fixed, z-index: 100.
Background: var(--bg-base) with border-bottom: 1px solid var(--bg-border).
Add backdrop-filter: blur(12px) and background: rgba(13,11,9,0.85).

Layout: flex justify-between items-center px-8 h-16

Left: Rosey logo — a small amber ◈ glyph followed by Rosey in
var(--text-primary), weight 600.
Center: Nav links — Features, How It Works, Dashboard, Contact
in var(--text-secondary), 14px. Hover → var(--accent-primary),
smooth transition 200ms.
Right: CTA button — Get Early Access — amber border button:
border: 1px solid var(--accent-primary), text var(--accent-primary),
hover fills with var(--accent-primary), text goes var(--bg-base).

On mount, GSAP fromTo the navbar: y: -80, opacity: 0 → y: 0, opacity: 1,
duration 0.6, ease power2.out, delay 0.2.

Section 2 — Hero Section
File: HeroSection.tsx + WorkflowVisual.tsx

Full-viewport height (min-h-screen). Background: var(--bg-base).
Apply --gradient-hero as a ::before pseudo-element behind everything.

Layout
Two-column grid: grid-cols-2 on desktop, single column stacked on mobile.
gap-16, items-center, px-16 py-32.

LEFT COLUMN — Tagline (animates in on load)
Badge chip at top:

text
[ ◈ AI-Powered Outreach ]
Pill shape, background var(--accent-primary-glow),
border 1px solid rgba(245,158,11,0.3), text var(--accent-primary) 12px.
GSAP: from { opacity:0, y:20 } → appear, delay 0.3.

H1 heading (two lines, large ~72px, tight tracking):

text
Smart enough
to reach.
Then in gradient text (--gradient-text) using background-clip: text:

text
Human enough
to close.
GSAP: Each line animates from { opacity:0, y:40 } staggered 0.15s.

Sub-copy (18px, var(--text-secondary), max-width 420px):

text
Rosey researches your leads, writes
personalized messages, sends at the
perfect moment, and hands off to your
team only when they're ready to close.
GSAP: fade in after heading, delay 0.8.

Two CTA buttons side by side, gap-4, margin-top 40px:

Primary: filled amber bg: var(--accent-primary), text dark,
px-6 py-3 rounded-xl font-semibold — "Start Building"

Secondary: ghost border var(--bg-border), text var(--text-secondary) —
"Watch Demo →"
GSAP: from { opacity:0, y:20 } → appear, delay 1.0.

Stats row below CTAs (mt-10, flex gap-8):

47% Reply Rate Lift

8 AI Agents Working

<60s Time to First Send
Each stat: number in var(--accent-primary) 28px bold, label in
var(--text-tertiary) 12px.

RIGHT COLUMN — WorkflowVisual.tsx
This is the animated UI widget, similar in concept to Claude's "Cowork" panel shown
in the reference screenshot (right side has a UI demo of the product in action).

Create a mock campaign workflow card — dark card with rounded corners,
background: var(--bg-card), border: 1px solid var(--bg-border),
border-radius: 20px, padding: 24px, subtle drop shadow.

Inside the card render a simplified visual of a running campaign:

Header row:

text
🔴 Rosey  ·  Campaign: SaaS CTOs — Mumbai
              ● Live
Workflow pipeline (vertical list of 5 step rows):
Each row: left icon + step name + right status badge.
Animate each row appearing sequentially with GSAP stagger on load.

text
✦  Research Lead          [ ✓ Done ]
✉  Generate Message       [ ✓ Done ]  
🛡 Safety Check           [ ✓ 94/100 ]
⏱  Circadian Delay        [ ● Sending at 8am ]
👤 Human Handoff Score    [ ▓▓▓▓▓░ 68/100 ]
Color logic:

Done badges: var(--accent-secondary) bg at 10% opacity, secondary text

Active badge: amber var(--accent-primary-glow) bg, amber text

Score bar: amber gradient fill on var(--bg-elevated) track

Below the pipeline, a mini "Lead Card":

text
┌─────────────────────────────┐
│  Priya Sharma · CTO         │
│  FinStack · Mumbai          │
│  Crystal: D-type            │
│  Last signal: Opened 3x     │
└─────────────────────────────┘
Card background: var(--bg-elevated), amber left border accent.

Animation:
On page load, GSAP timeline:

Card appears: from { opacity:0, x:60, scale:0.95 }, delay 0.5, ease power3.out

Each pipeline row staggers in: from { opacity:0, x:20 } stagger 0.1s

The "Safety Check" badge counts from 0→94 using GSAP Counter trick

The score bar fills from 0→68% width with GSAP tween

Add a subtle floating animation loop on the entire card:
gsap.to(card, { y: -8, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' })

Section 3 — Features (GSAP Pinned Scroll)
File: FeaturesSection.tsx

This is the hero scroll-experience section. Uses GSAP ScrollTrigger pinning
combined with Lenis for smooth scrolling.

Structure
Outer wrapper: position: relative, height = 500vh (5 × 100vh to allow scroll).

Inner sticky container: position: sticky, top: 0, height: 100vh,
overflow: hidden. This is the pinned element.

Inside: two-column layout — LEFT is image/visual, RIGHT is text.

tsx
<section ref={sectionRef} className="features-scroll-section">
  <div ref={stickyRef} className="features-sticky">
    <div className="features-left">
      <div ref={imageTrackRef} className="image-track">
        {features.map((f, i) => (
          <FeatureVisual key={i} feature={f} index={i} />
        ))}
      </div>
    </div>
    <div className="features-right">
      <div ref={textTrackRef} className="text-track">
        {features.map((f, i) => (
          <FeatureText key={i} feature={f} index={i} />
        ))}
      </div>
    </div>
  </div>
</section>
GSAP ScrollTrigger Setup
ts
useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    const totalFeatures = 5;
    
    // Pin the sticky container for the duration of the scroll section
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: stickyRef.current,
      pinSpacing: false,
    });

    // Animate each feature in/out based on scroll progress
    features.forEach((_, i) => {
      const progress = i / totalFeatures;
      const imageEl = imageTrackRef.current.children[i];
      const textEl = textTrackRef.current.children[i];

      // Image panel
      gsap.fromTo(imageEl,
        { opacity: 0, x: -60, scale: 0.92 },
        {
          opacity: 1, x: 0, scale: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `${progress * 100}% top`,
            end: `${(progress + 0.15) * 100}% top`,
            scrub: 1,
          }
        }
      );

      // Text panel
      gsap.fromTo(textEl,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `${progress * 100}% top`,
            end: `${(progress + 0.12) * 100}% top`,
            scrub: 1.2,
          }
        }
      );

      // Exit animation (fade out before next feature)
      if (i < totalFeatures - 1) {
        gsap.to([imageEl, textEl], {
          opacity: 0,
          y: -30,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `${(progress + 0.17) * 100}% top`,
            end: `${(progress + 0.20) * 100}% top`,
            scrub: 1,
          }
        });
      }
    });

  }, sectionRef);

  return () => ctx.revert();
}, []);
The 5 Features
Define as a features array:

ts
const features = [
  {
    number: "01",
    title: "Campaign Brain",
    subtitle: "Describe your goal. Rosey builds the workflow.",
    body: `Type "Warm up 50 SaaS CTOs over 5 days" and Campaign Brain 
           generates a complete multi-step outreach workflow on the canvas 
           — nodes, delays, branches, and all. No drag-and-drop required 
           unless you want to fine-tune it.`,
    tag: "Natural Language → Workflow",
    accent: "var(--accent-primary)",
    visual: "campaign-brain",   // visual component key
  },
  {
    number: "02",
    title: "Persona Intelligence",
    subtitle: "Every message shaped by personality, not templates.",
    body: `Rosey enriches each lead with Crystal personality data — 
           D, I, S, or C type — and writes messages that match how 
           they actually think. Dominant types get ROI-first directness. 
           Steady types get empathy and no pressure.`,
    tag: "Crystal · DISC Profiles",
    accent: "var(--accent-secondary)",
    visual: "persona",
  },
  {
    number: "03",
    title: "Circadian Timing",
    subtitle: "Sent when your lead is most likely to open it.",
    body: `Rosey analyzes each lead's historical email engagement 
           timestamps and calculates their personal optimal send window. 
           Your message arrives Thursday at 8am because that's when 
           they opened the last three emails.`,
    tag: "Per-Lead Timing Engine",
    accent: "var(--accent-primary)",
    visual: "timing",
  },
  {
    number: "04",
    title: "Ghost Detector",
    subtitle: "Silence isn't the end. It's a signal.",
    body: `When a lead goes dark, Rosey diagnoses why — bad timing, 
           tone mismatch, spam filters, weak subject line — and generates 
           a completely new re-engagement strategy with a different hook, 
           tone, and approach.`,
    tag: "AI Silence Analysis",
    accent: "var(--accent-secondary)",
    visual: "ghost",
  },
  {
    number: "05",
    title: "Human Handoff Intelligence",
    subtitle: "When it's time for a human, they can't possibly fail.",
    body: `When a lead's readiness score crosses 70, Rosey stops and 
           hands off to your team with a complete AI call brief — 
           personality summary, email thread digest, top 3 predicted 
           objections with responses, and a recommended opening line.`,
    tag: "Readiness Score · Call Brief",
    accent: "var(--accent-secondary)",
    visual: "handoff",
  },
];
FeatureVisual Component (LEFT side)
Left panel takes 60% width. Dark card with border-radius: 24px,
background: var(--bg-card), border: 1px solid var(--bg-border).
Dimensions: ~560px × 400px, centered.

Each visual is a unique mock UI illustration using HTML/CSS (no images needed):

visual: "campaign-brain"
Show a mock React Flow canvas — dark grid background (background-image: radial-gradient(var(--bg-border) 1px, transparent 1px), background-size: 28px 28px).
Place 4 node pills connected by SVG lines:
[Start] → [Message] → [2-Day Delay] → [If Replied?]
Nodes: rounded rectangles, amber border, dark fill, label in cream text.
SVG connector lines in var(--bg-border) color with amber arrow tips.

visual: "persona"
4-quadrant DISC grid. Each quadrant labeled:

D (top-left): "Short · Direct · ROI-first" — amber

I (top-right): "Warm · Story-driven" — rose

S (bottom-left): "Empathetic · Low-pressure" — lime

C (bottom-right): "Data-heavy · Structured" — amber-dim
Center: small Crystal ◈ logo badge.
A lead card floats at bottom: "Priya S. — D-type detected" with amber tag.

visual: "timing"
A bar chart mock: 7 bars for Mon–Sun, bars in var(--bg-elevated).
Thursday bar highlighted in amber, taller than others.
Overlay: "Best window: Thu 8–9am" amber pill floating above.
Below chart: "Confidence: High · Based on 3 opens" muted text.

visual: "ghost"
A lead status timeline — vertical dotted line with 5 event dots.
First 3: filled amber (emails sent). Next 2: empty gray (no response).
Below: diagnosis card in rose tint:
"Ghost detected · Tone mismatch (C-type, sent I-style message)"
"New strategy: Switch to data-driven approach"
with a "Re-engage →" amber pill button.

visual: "handoff"
Readiness score dial — a circular progress ring at 72%, amber fill on
dark track. Center: large 72 in amber, / 100 small.
Below: Call Brief card with sections:

Crystal: D-type amber tag

Predicted objection: Budget approval

Opener: "I'll keep this to 90 seconds..."

Action pills: [📞 Call Now] [📅 Send Calendly]

FeatureText Component (RIGHT side)
Right panel takes 40% width. padding: 48px 40px.

Layout (top to bottom, flex flex-col gap-6):

Feature number: "01" in var(--text-tertiary) 13px mono font

Tag pill: small rounded pill, border 1px solid currentColor, color = accent

H2: feature title, 48px, tight tracking, var(--text-primary)

Subtitle: 20px, var(--accent-primary) or accent color, italic

Body: 16px, var(--text-secondary), line-height 1.7, max-width 380px

Bottom row: small feature stat or "Learn more →" link

Section header above the entire feature block (before scroll starts):

text
[ AI Intelligence Layer ]
How Rosey thinks, sends, and decides.
This header fades out as the first feature comes in.

Progress Indicator
Fixed right-side dot nav (like a scroll indicator):
5 dots vertically stacked. Active dot = larger + amber filled.
Update active index based on ScrollTrigger progress.
position: fixed, right: 32px, top: 50%, transform: translateY(-50%).

Section 4 — Dashboard Showcase
File: DashboardShowcase.tsx

Full-width section, min-height: 100vh, dark background.

Section header (centered):

text
[ Live Intelligence ]
The control room for every
outreach campaign you run.
Three dashboard preview cards in a staggered grid layout:

Card 1 (wide, top) — Campaign Overview
Mock analytics card: KPI tiles in a row showing
Emails Sent: 247, Replies: 31, Reply Rate: 12.6%, In Handoff: 4
Each tile: number in amber/rose/lime, label in muted text.
Below: a simple bar chart sparkline using CSS gradient bars.
Card label: "Product Overview · my-b2b-saas"

Card 2 (left, bottom) — Campaign Health Score
Large circular arc gauge, 0–100, score at 78.
"Campaign Health Score" label. Amber arc on dark track.
Below: AI explanation text in muted italic:
"Open rate trending up 6% this week. Subject line changes working."

Card 3 (right, bottom) — Human Handoff Queue
List of 3 lead rows, each showing:

Avatar circle (initials), name, company

Readiness score bar (amber gradient, different fill per lead)

Status badge: [Ready to Call] in lime or [Warming Up] in amber

Animation: On scroll into view, use ScrollTrigger to trigger each card:
from { opacity:0, y:60 } staggered 0.15s, ease power3.out.

Card style: var(--bg-card), border: 1px solid var(--bg-border),
border-radius: 20px, padding: 28px.
Add a very subtle amber glow on hover:
box-shadow: 0 0 40px var(--accent-primary-glow).

Section 5 — Contact / CTA
File: ContactSection.tsx

Centered layout, min-height: 70vh, flex flex-col items-center justify-center.
Background: var(--bg-surface) with a radial amber glow at bottom center.

Large heading (centered, 64px):

text
Ready to let Rosey
do the outreach?
Word "Rosey" in gradient text (--gradient-text).

Sub-copy (20px, muted, centered, max-width 520px):

text
Join teams using Rosey to run intelligent, 
personalized outreach that's safe, compliant, 
and built around the human conversation.
Email capture form:

text
[ Enter your work email          ] [ Get Early Access → ]
Input: var(--bg-card) background, border: 1px solid var(--bg-border),
amber focus ring (outline: 2px solid var(--accent-primary)),
border-radius: 12px, px-5 py-3, text var(--text-primary).
Button: solid amber, dark text, same height as input.

Below form (small, centered, muted):

text
No cold email scripts. No manual follow-ups.
Just leads that are ready to talk.
On scroll into view: GSAP from { opacity:0, y:50, scale:0.97 } → appear,
ease power3.out.

Section 6 — Footer
File: Footer.tsx

Minimal, var(--bg-base), border-top: 1px solid var(--bg-border).
Two rows:

Row 1: flex justify-between items-center px-16 py-6

Left: ◈ Rosey logo

Right: Features · Dashboard · Contact · Privacy

Row 2: flex justify-between px-16 pb-6

Left: © 2026 Rosey. All rights reserved.

Right: Built with Next.js · Powered by Claude
Both in var(--text-tertiary) 13px.

Lenis + GSAP Integration
In lib/lenis.ts (use the existing file), ensure Lenis is initialized and
its RAF loop is connected to GSAP ticker:

ts
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return lenis;
}
Call initLenis() inside a useEffect in the landing layout.tsx.

Responsive Breakpoints
All sections use Tailwind responsive prefixes:

md:grid-cols-2 → single column on mobile

Hero: on mobile, WorkflowVisual stacks below tagline

Features: on mobile, visual stacks above text, no pinned scroll
(replace with simple stacked cards)

All font sizes scale down one step on mobile

Performance Notes
All GSAP animations use will-change: transform, opacity via inline style
on animated elements

Use gsap.context() with cleanup on every component for memory safety

All ScrollTrigger instances created inside gsap.context() and cleaned
with ctx.revert() on unmount

WorkflowVisual stat counters use gsap.to(obj, { val: target, ... }) pattern
not innerText manipulation directly

DO NOT
Do not use any shade of blue, purple, navy, or indigo anywhere

Do not use pure white (#ffffff) or pure black (#000000) — use the warm
equivalents from the token system above

Do not install GSAP or Lenis — they are already set up

Do not use any third-party chart library — all charts are CSS/HTML mocks

Do not use Next.js Image component for the visual panels — they are all
HTML/CSS constructed components, not images

text

***

This prompt covers every section with pixel-level specs, the exact GSAP + Lenis integration pattern, the warm amber/rose/lime palette (zero blues or purples), all 5 feature visuals as pure CSS/HTML (no image files needed), and responsive breakpoint handling. The `WorkflowVisual` on the hero mirrors the Claude "Cowork" layout from your reference screenshot  — live pipeline card on the right, big tagline on the left. Paste this into Cline and it will scaffold the full page in one shot.[1][2]
