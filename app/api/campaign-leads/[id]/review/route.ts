import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await request.json();
  const action: string = body.action;

  if (action !== "approve" && action !== "skip") {
    return NextResponse.json(
      { error: 'action must be "approve" or "skip"' },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  // Only allow reviewing leads that are actually pending review
  const { data: campaignLead, error: clError } = await supabase
    .from("campaign_leads")
    .select("id, status, current_node_id, campaign_id")
    .eq("id", id)
    .eq("status", "pending_review")
    .single();

  if (clError || !campaignLead) {
    return NextResponse.json(
      { error: "Campaign lead not found or not pending review" },
      { status: 404 }
    );
  }

  if (action === "skip") {
    const { error } = await supabase
      .from("campaign_leads")
      .update({
        status: "completed",
        next_action_time: null,
        last_action_time: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: "Failed to skip" }, { status: 500 });
    }

    await supabase.from("logs").insert({
      campaign_lead_id: id,
      action: "human_review",
      status: "skipped",
    });

    return NextResponse.json({ status: "skipped" });
  }

  // action === "approve"
  // Advance current_node_id past the human_review node to the next node in the workflow.
  // Without this, the engine would re-execute human_review on the next sweep → infinite loop.
  const { data: campaign, error: campaignError } = await supabase
    .from("campaigns")
    .select("workflow_json")
    .eq("id", campaignLead.campaign_id)
    .single();

  if (campaignError || !campaign) {
    return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
  }

  const humanReviewNodeId: string = campaignLead.current_node_id;
  const edges: Array<{ source: string; target: string }> =
    campaign.workflow_json?.edges ?? [];
  const outgoingEdge = edges.find((e) => e.source === humanReviewNodeId);

  if (!outgoingEdge) {
    // No next node — the workflow ends here; mark completed
    await supabase
      .from("campaign_leads")
      .update({
        status: "completed",
        next_action_time: null,
        last_action_time: new Date().toISOString(),
      })
      .eq("id", id);

    await supabase.from("logs").insert({
      campaign_lead_id: id,
      action: "human_review",
      status: "approved",
      metadata: { note: "no next node — marked completed" },
    });

    return NextResponse.json({ status: "approved" });
  }

  const { error } = await supabase
    .from("campaign_leads")
    .update({
      status: "queued",
      current_node_id: outgoingEdge.target,
      next_action_time: new Date().toISOString(),
      last_action_time: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: "Failed to approve" }, { status: 500 });
  }

  // If the campaign auto-completed while leads were pending review, reactivate it
  // so the engine picks up this newly queued lead on the next sweep.
  await supabase
    .from("campaigns")
    .update({ status: "active" })
    .eq("id", campaignLead.campaign_id)
    .eq("status", "completed");

  await supabase.from("logs").insert({
    campaign_lead_id: id,
    action: "human_review",
    status: "approved",
    metadata: { next_node_id: outgoingEdge.target },
  });

  return NextResponse.json({ status: "approved" });
}
