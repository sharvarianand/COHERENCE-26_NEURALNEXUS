"use client";

import { memo } from "react";
import { Search } from "lucide-react";
import { type NodeProps, type Node } from "@xyflow/react";
import { NodeShell } from "./node-shell";

function ResearchNodeComponent({ id, selected }: NodeProps<Node>) {
  return (
    <NodeShell
      id={id}
      selected={selected}
      accent="emerald"
      icon={Search}
      eyebrow="Intelligence"
      title="Research Lead"
      description="Automatically researches the lead using web search before generating emails."
      badge="Auto"
      minWidthClassName="min-w-[260px]"
    />
  );
}

export const ResearchNode = memo(ResearchNodeComponent);
