"use client";

import { memo } from "react";
import { UserCheck } from "lucide-react";
import { type NodeProps, type Node } from "@xyflow/react";
import { NodeShell } from "./node-shell";

function HumanReviewNodeComponent({ id, selected }: NodeProps<Node>) {
  return (
    <NodeShell
      id={id}
      selected={selected}
      accent="amber"
      icon={UserCheck}
      eyebrow="Approval"
      title="Human Review"
      description="Pauses the workflow so you can review the lead and decide whether to continue or skip."
      badge="Manual"
      minWidthClassName="min-w-[260px]"
    />
  );
}

export const HumanReviewNode = memo(HumanReviewNodeComponent);
