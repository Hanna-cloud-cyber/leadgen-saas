import type { Metadata } from "next";
import { AiMatchClient } from "./ai-match-client";

export const metadata: Metadata = {
  title: "AI Supplier Match",
  description: "Describe what you're sourcing and let Veridian's AI Sourcing Assistant surface the best-matching verified suppliers.",
};

export default function AiMatchPage() {
  return <AiMatchClient />;
}
