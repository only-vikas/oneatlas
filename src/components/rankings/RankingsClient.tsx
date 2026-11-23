"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ParetoQuadrant } from "@/components/rankings/ParetoQuadrant";
import { RankingsLeaderboard } from "@/components/rankings/RankingsLeaderboard";

const CATEGORIES = [
  { label: "All Categories", value: "ALL" },
  { label: "Reasoning", value: "REASONING" },
  { label: "Coding", value: "CODING" },
  { label: "Multimodal", value: "MULTIMODAL" },
  { label: "Agentic / Tools", value: "AGENTIC" },
];

const BENCHMARKS = [
  { label: "Composite Score", value: "COMPOSITE" },
  { label: "SWE-bench Verified", value: "SWE-bench Verified" },
  { label: "MMLU-Pro", value: "MMLU-Pro" },
  { label: "GPQA Diamond", value: "GPQA Diamond" },
  { label: "LiveCodeBench", value: "LiveCodeBench" },
  { label: "Arena Elo", value: "Arena Elo" },
];

export function RankingsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read initial filter values from URL
  const initialCategory = searchParams.get("category") || "ALL";
  const initialBenchmark = searchParams.get("benchmark") || "COMPOSITE";

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [activeBenchmark, setActiveBenchmark] = useState<string>(initialBenchmark);

  // Sync state changes with URL query string
  const updateUrl = useCallback((cat: string, bm: string) => {
    const params = new URLSearchParams();
    if (cat !== "ALL") params.set("category", cat);
    if (bm !== "COMPOSITE") params.set("benchmark", bm);
    const qs = params.toString();
    const newPath = qs ? `/rankings?${qs}` : "/rankings";
    window.history.replaceState(null, "", newPath);
  }, []);

  const handleCategorySelect = (val: string) => {
    setActiveCategory(val);
    updateUrl(val, activeBenchmark);
  };

  const handleBenchmarkSelect = (val: string) => {
    setActiveBenchmark(val);
    updateUrl(activeCategory, val);
  };

  const handleReset = () => {
    setActiveCategory("ALL");
    setActiveBenchmark("COMPOSITE");
    updateUrl("ALL", "COMPOSITE");
  };

  return (
    <div className="w-full min-h-screen bg-surface-canvas text-text-primary flex flex-col">
      {/* Top Banner / Breadcrumb */}
      <div className="w-full bg-surface-well border-b border-hairline px-4 md:px-6 py-3">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-text-secondary">
              SYSTEM RANKINGS /
            </span>
            <span className="font-mono text-xs uppercase font-semibold text-signal-amber">
              {activeCategory} · {activeBenchmark}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-signal-mint animate-pulse"></span>
            <span className="font-mono text-[10px] text-signal-mint uppercase">
              INDEX_SYNC: 99.98% LIVE
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto w-full flex-1 flex flex-col lg:flex-row min-h-[calc(100vh-112px)]">
        {/* LEFT FILTER RAIL (240px) */}
        <aside className="w-full lg:w-[240px] shrink-0 border-b lg:border-b-0 lg:border-r border-hairline bg-surface-canvas flex flex-col select-none">
          <div className="px-4 py-3 border-b border-hairline flex items-center justify-between">
            <span className="font-mono text-[10px] text-text-tertiary uppercase tracking-wider">
              EVALUATION FILTERS
            </span>
            {(activeCategory !== "ALL" || activeBenchmark !== "COMPOSITE") && (
              <button
                type="button"
                onClick={handleReset}
                className="font-mono text-[10px] text-signal-amber hover:underline uppercase"
              >
                RESET
              </button>
            )}
          </div>

          {/* Section 1: Category Filter */}
          <div className="border-b border-hairline p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] text-text-secondary uppercase tracking-wider">
                CATEGORY
              </span>
              <span className="font-mono text-[10px] text-signal-amber">
                {activeCategory === "ALL" ? "ALL" : "01"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              {CATEGORIES.map((cat) => {
                const isSelected = activeCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => handleCategorySelect(cat.value)}
                    className={`px-3 py-1.5 rounded text-left text-xs font-mono flex items-center justify-between transition-colors ${
                      isSelected
                        ? "bg-surface-raised text-signal-amber border border-hairline-strong font-medium"
                        : "text-text-secondary hover:text-text-primary hover:bg-surface-well"
                    }`}
                  >
                    <span>{cat.label}</span>
                    {isSelected && <span className="text-[10px]">●</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Benchmark Metric Filter */}
          <div className="border-b border-hairline p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] text-text-secondary uppercase tracking-wider">
                BENCHMARK METRIC
              </span>
              <span className="font-mono text-[10px] text-signal-amber">01</span>
            </div>
            <div className="flex flex-col gap-1">
              {BENCHMARKS.map((bm) => {
                const isSelected = activeBenchmark === bm.value;
                return (
                  <button
                    key={bm.value}
                    type="button"
                    onClick={() => handleBenchmarkSelect(bm.value)}
                    className={`px-3 py-1.5 rounded text-left text-xs font-mono flex items-center justify-between transition-colors ${
                      isSelected
                        ? "bg-surface-raised text-signal-amber border border-hairline-strong font-medium"
                        : "text-text-secondary hover:text-text-primary hover:bg-surface-well"
                    }`}
                  >
                    <span className="truncate">{bm.label}</span>
                    {isSelected && <span className="text-[10px]">●</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Telemetry info at bottom of rail */}
          <div className="mt-auto p-4 hidden lg:flex flex-col gap-2 border-t border-hairline bg-surface-canvas/50 text-[10px] font-mono text-text-tertiary">
            <div className="flex justify-between">
              <span>WEIGHTING:</span>
              <span className="text-text-secondary">HARMONIC</span>
            </div>
            <div className="flex justify-between">
              <span>ZERO-SHOT:</span>
              <span className="text-signal-mint">ENFORCED</span>
            </div>
            <div className="flex justify-between">
              <span>SOURCE:</span>
              <span className="text-text-secondary">VERIFIED BENCH</span>
            </div>
          </div>
        </aside>

        {/* RIGHT MAIN WORKSPACE */}
        <div className="flex-1 min-w-0 p-4 md:p-6 flex flex-col gap-6">
          {/* Top: Pareto Frontier Scatterplot */}
          <ParetoQuadrant category={activeCategory} />

          {/* Bottom: Dynamic Leaderboard */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-text-primary font-semibold">
                GLOBAL LEADERBOARD BRACKET
              </span>
              <span className="font-mono text-[10px] text-text-tertiary">
                SORTED BY ZERO-SHOT PERFORMANCE
              </span>
            </div>

            <RankingsLeaderboard
              category={activeCategory}
              benchmark={activeBenchmark}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
