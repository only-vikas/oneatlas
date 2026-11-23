import { Suspense } from "react";
import type { Metadata } from "next";
import { RankingsClient } from "@/components/rankings/RankingsClient";
import { CatalogSkeleton } from "@/components/ui/States";

export const metadata: Metadata = {
  title: "Model Rankings & Pareto Frontier — OneAtlas",
  description:
    "Explore the intelligence vs. cost Pareto frontier and standardized zero-shot leaderboards for frontier LLMs across SWE-bench Verified, MMLU-Pro, GPQA Diamond, LiveCodeBench, and Arena Elo.",
};

export default function RankingsPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-surface-canvas text-text-primary max-w-[1440px] mx-auto px-4 md:px-6 py-12">
          <CatalogSkeleton rows={12} />
        </div>
      }
    >
      <RankingsClient />
    </Suspense>
  );
}
