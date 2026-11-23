"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { formatPrice } from "@/lib/formatters";
import type { ParetoResponse, ParetoPoint } from "@/lib/types/api";

interface ParetoQuadrantProps {
  category: string;
}

export function ParetoQuadrant({ category }: ParetoQuadrantProps) {
  const [hoveredPoint, setHoveredPoint] = useState<ParetoPoint | null>(null);

  const { data, isLoading } = useQuery<ParetoResponse>({
    queryKey: ["pareto", category],
    queryFn: async () => {
      const res = await fetch(`/api/pareto?category=${encodeURIComponent(category)}`);
      if (!res.ok) throw new Error("Failed to load Pareto data");
      return res.json();
    },
    staleTime: 60_000,
  });

  const points = data?.points ?? [];

  // Coordinate mapping
  // SVG ViewBox: 0 0 800 190
  // X: Logarithmic from $0.10 to $30.00 (x: 50 to 760)
  // Y: Linear from 50 to 100 (y: 160 down to 20)
  const mapCoordinates = useMemo(() => {
    const xMin = Math.log10(0.1);
    const xMax = Math.log10(30.0);
    const xRange = xMax - xMin;

    const yMin = 50;
    const yMax = 100;
    const yRange = yMax - yMin;

    return (cost: number, score: number) => {
      const safeCost = Math.max(0.1, Math.min(30.0, cost));
      const logCost = Math.log10(safeCost);
      const normX = (logCost - xMin) / xRange;
      const x = 50 + normX * 710;

      const safeScore = Math.max(50, Math.min(100, score));
      const normY = (safeScore - yMin) / yRange;
      const y = 160 - normY * 140;

      return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
    };
  }, []);

  // Compute polyline string for frontier points
  const frontierPolylinePoints = useMemo(() => {
    const frontierPoints = points
      .filter((p) => p.onFrontier)
      .sort((a, b) => a.blendedCost - b.blendedCost);

    return frontierPoints
      .map((p) => {
        const { x, y } = mapCoordinates(p.blendedCost, p.intelligence);
        return `${x},${y}`;
      })
      .join(" ");
  }, [points, mapCoordinates]);

  return (
    <section className="w-full bg-surface-well border border-hairline rounded relative p-4 flex flex-col justify-between overflow-hidden">
      {/* Top Section Header */}
      <div className="flex items-center justify-between z-10 mb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-signal-amber animate-pulse"></span>
          <span className="font-mono text-xs uppercase tracking-wider text-text-primary font-semibold">
            PARETO FRONTIER · INTELLIGENCE VS. COST
          </span>
          <span className="text-[10px] font-mono text-text-tertiary hidden sm:inline">
            (BLENDED $/1M, 3:1 RATIO)
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-text-tertiary uppercase">LOG10 SCALE</span>
          <span className="font-mono text-[10px] text-signal-amber uppercase">
            {data?.frontierCount ?? 0} ON FRONTIER
          </span>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative w-full h-[180px] my-1 select-none">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center font-mono text-xs text-text-tertiary">
            Calculating Pareto Frontier...
          </div>
        ) : (
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 800 190"
            preserveAspectRatio="none"
          >
            {/* Background Grid Lines (Horizontal Scores) */}
            <line x1="50" y1="20" x2="760" y2="20" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <line x1="50" y1="55" x2="760" y2="55" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <line x1="50" y1="90" x2="760" y2="90" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <line x1="50" y1="125" x2="760" y2="125" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <line x1="50" y1="160" x2="760" y2="160" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

            {/* Score Y-axis Labels */}
            <text x="40" y="24" textAnchor="end" className="fill-text-tertiary font-mono text-[10px]">
              100
            </text>
            <text x="40" y="59" textAnchor="end" className="fill-text-tertiary font-mono text-[10px]">
              88
            </text>
            <text x="40" y="94" textAnchor="end" className="fill-text-tertiary font-mono text-[10px]">
              75
            </text>
            <text x="40" y="129" textAnchor="end" className="fill-text-tertiary font-mono text-[10px]">
              63
            </text>
            <text x="40" y="164" textAnchor="end" className="fill-text-tertiary font-mono text-[10px]">
              50
            </text>

            {/* Price X-axis Labels */}
            <text x="50" y="178" textAnchor="middle" className="fill-text-tertiary font-mono text-[10px]">
              $0.10
            </text>
            <text x="185" y="178" textAnchor="middle" className="fill-text-tertiary font-mono text-[10px]">
              $0.30
            </text>
            <text x="335" y="178" textAnchor="middle" className="fill-text-tertiary font-mono text-[10px]">
              $1.00
            </text>
            <text x="475" y="178" textAnchor="middle" className="fill-text-tertiary font-mono text-[10px]">
              $3.00
            </text>
            <text x="625" y="178" textAnchor="middle" className="fill-text-tertiary font-mono text-[10px]">
              $10.00
            </text>
            <text x="760" y="178" textAnchor="middle" className="fill-text-tertiary font-mono text-[10px]">
              $30.00
            </text>

            {/* Dashed Pareto Frontier Polyline */}
            {frontierPolylinePoints && (
              <polyline
                fill="none"
                points={frontierPolylinePoints}
                stroke="#F59E0B"
                strokeDasharray="4 3"
                strokeWidth="1.5"
              />
            )}

            {/* Non-Frontier Model Nodes */}
            {points
              .filter((p) => !p.onFrontier)
              .map((point) => {
                const { x, y } = mapCoordinates(point.blendedCost, point.intelligence);
                return (
                  <circle
                    key={point.modelId}
                    cx={x}
                    cy={y}
                    r="3"
                    fill="#6B6B74"
                    fillOpacity="0.45"
                    className="cursor-pointer transition-all hover:fill-text-primary hover:r-4"
                    onMouseEnter={() => setHoveredPoint(point)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                );
              })}

            {/* Frontier Optimal Model Nodes (Amber with pulse) */}
            {points
              .filter((p) => p.onFrontier)
              .map((point) => {
                const { x, y } = mapCoordinates(point.blendedCost, point.intelligence);
                const isHovered = hoveredPoint?.modelId === point.modelId;

                return (
                  <g key={point.modelId}>
                    <circle
                      cx={x}
                      cy={y}
                      r={isHovered ? 6 : 4}
                      fill="#F59E0B"
                      className="cursor-pointer transition-all duration-150"
                      onMouseEnter={() => setHoveredPoint(point)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                    {isHovered && (
                      <circle
                        cx={x}
                        cy={y}
                        r="10"
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth="1"
                        strokeOpacity="0.6"
                        className="animate-ping"
                      />
                    )}
                  </g>
                );
              })}
          </svg>
        )}

        {/* Floating Tooltip */}
        {hoveredPoint && (
          <div
            className="absolute z-30 pointer-events-none bg-surface-overlay border border-hairline-strong rounded px-2.5 py-1.5 shadow-xl transition-all"
            style={{
              left: `${Math.min(
                85,
                Math.max(15, (mapCoordinates(hoveredPoint.blendedCost, hoveredPoint.intelligence).x / 800) * 100)
              )}%`,
              top: `${Math.max(
                5,
                (mapCoordinates(hoveredPoint.blendedCost, hoveredPoint.intelligence).y / 190) * 100 - 32
              )}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="font-headline font-semibold text-xs text-text-primary flex items-center gap-1.5">
              <span>{hoveredPoint.name}</span>
              {hoveredPoint.onFrontier && (
                <span className="px-1 py-0.2 bg-signal-amber/20 text-signal-amber text-[9px] font-mono rounded">
                  FRONTIER
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 mt-0.5 font-mono text-[11px] tabular-nums">
              <span className="text-signal-amber">{hoveredPoint.intelligence.toFixed(1)} score</span>
              <span className="text-text-secondary">{formatPrice(hoveredPoint.blendedCost)} / 1M</span>
            </div>
          </div>
        )}
      </div>

      {/* Legend Footer */}
      <div className="flex items-center justify-between z-10 pt-2 border-t border-hairline">
        <div className="flex items-center gap-4 text-[10px] font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-signal-amber"></span>
            <span className="text-text-primary uppercase">Frontier Optimal</span>
          </div>
          <span className="text-text-tertiary">·</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#6B6B74]"></span>
            <span className="text-text-tertiary uppercase">Sub-Optimal / Domain Specialized</span>
          </div>
        </div>

        {hoveredPoint && (
          <Link
            href={`/models/${hoveredPoint.slug}`}
            className="text-[10px] font-mono text-signal-amber hover:underline flex items-center gap-1"
          >
            <span>View {hoveredPoint.name} Specs</span>
            <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
          </Link>
        )}
      </div>
    </section>
  );
}
