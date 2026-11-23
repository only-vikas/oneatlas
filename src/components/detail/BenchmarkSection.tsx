"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { BenchmarkItem } from "@/lib/types/api";
import { BarChart3 } from "lucide-react";

interface BenchmarkSectionProps {
  benchmarks: BenchmarkItem[];
  categoryAverages?: Record<string, number>;
}

export function BenchmarkSection({
  benchmarks,
  categoryAverages = {},
}: BenchmarkSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP 40ms stagger animation on bar fills
  useEffect(() => {
    if (!benchmarks || benchmarks.length === 0 || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".benchmark-bar-fill",
        { width: "0%" },
        {
          width: (index, target) => target.getAttribute("data-target-width") || "50%",
          duration: 0.8,
          stagger: 0.04,
          ease: "power2.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [benchmarks]);

  if (!benchmarks || benchmarks.length === 0) {
    return (
      <section className="w-full bg-surface-canvas p-8 text-center text-xs text-text-tertiary font-mono">
        NO BENCHMARK EVALUATION TELEMETRY LOGGED
      </section>
    );
  }

  return (
    <section ref={containerRef} className="w-full bg-surface-canvas border-b border-hairline p-4 sm:p-6 lg:p-8">
      {/* Title */}
      <div className="flex items-center justify-between pb-5 border-b border-hairline">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-signal-sky" />
          <h2 className="font-headline-sm text-base sm:text-lg uppercase text-text-primary tracking-tight font-medium">
            Standardized Evaluation Benchmarks
          </h2>
        </div>
        <span className="font-mono text-[10px] text-text-tertiary hidden sm:inline">
          NORMALIZED 0-100% SCALE (ARENA ELO 1000-1500)
        </span>
      </div>

      {/* Grid of Benchmark Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
        {benchmarks.map((bm) => {
          const isElo = bm.benchmarkName.toLowerCase().includes("elo");
          const percentage = isElo
            ? Math.min(100, Math.max(0, ((bm.score - 1000) / 500) * 100))
            : Math.min(100, Math.max(0, (bm.score / (bm.maxScore || 100)) * 100));

          const catAvg = categoryAverages[bm.category];
          const avgPercentage = catAvg
            ? isElo
              ? Math.min(100, Math.max(0, ((catAvg - 1000) / 500) * 100))
              : catAvg
            : null;

          return (
            <div
              key={bm.benchmarkName}
              className="p-4 rounded-[4px] bg-surface-well/70 border border-hairline flex flex-col justify-between gap-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-structural font-medium text-xs sm:text-sm text-text-primary">
                    {bm.benchmarkName}
                  </span>
                  <span className="font-sans text-[10px] font-medium uppercase tracking-[0.09em] text-text-tertiary">
                    {bm.category}
                  </span>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-base font-semibold text-text-primary tabular-nums">
                    {isElo ? Math.round(bm.score) : `${bm.score.toFixed(1)}%`}
                  </span>
                  {!isElo && (
                    <span className="font-mono text-[10px] text-text-tertiary">
                      / {bm.maxScore}%
                    </span>
                  )}
                </div>
              </div>

              {/* Progress Bar Container */}
              <div className="relative w-full h-3 bg-surface-raised rounded-[2px] overflow-hidden flex items-center">
                {/* Category Average Marker */}
                {avgPercentage !== null && (
                  <div
                    title={`Category Average: ${avgPercentage.toFixed(1)}%`}
                    style={{ left: `${avgPercentage}%` }}
                    className="absolute top-0 bottom-0 w-[2px] bg-text-tertiary z-10"
                  />
                )}

                {/* Animated Fill Bar */}
                <div
                  data-target-width={`${percentage}%`}
                  className="benchmark-bar-fill h-full bg-signal-sky rounded-[2px] transition-all"
                />
              </div>

              {/* Sub-label comparison */}
              <div className="flex items-center justify-between font-mono text-[10px] text-text-tertiary">
                <span>0%</span>
                {catAvg && (
                  <span>
                    AVG: {isElo ? Math.round(catAvg) : `${catAvg.toFixed(1)}%`}
                  </span>
                )}
                <span>{isElo ? "1500" : "100%"}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
