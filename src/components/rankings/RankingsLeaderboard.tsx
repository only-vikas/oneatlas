"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useCompare } from "@/lib/store/compare-store";
import { Sparkline } from "@/components/ui/Sparkline";
import { SignalBadge } from "@/components/ui/SignalBadge";
import { CatalogSkeleton, ErrorBanner, EmptyState } from "@/components/ui/States";
import type { RankingsResponse, RankingItem } from "@/lib/types/api";

interface RankingsLeaderboardProps {
  category: string;
  benchmark: string;
}

export function RankingsLeaderboard({ category, benchmark }: RankingsLeaderboardProps) {
  const compare = useCompare();

  const { data, isLoading, isError, error, refetch } = useQuery<RankingsResponse>({
    queryKey: ["rankings", category, benchmark],
    queryFn: async () => {
      const res = await fetch(
        `/api/rankings?category=${encodeURIComponent(category)}&benchmark=${encodeURIComponent(
          benchmark
        )}`
      );
      if (!res.ok) throw new Error("Failed to load rankings leaderboard");
      return res.json();
    },
    staleTime: 60_000,
  });

  const items = data?.items ?? [];

  if (isLoading) {
    return (
      <div className="w-full bg-surface-well border border-hairline rounded p-4">
        <CatalogSkeleton rows={10} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full py-6">
        <ErrorBanner
          message={error instanceof Error ? error.message : "Failed to load rankings."}
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="w-full py-12">
        <EmptyState
          title="NO MODELS FOUND IN THIS BRACKET"
          message="Try selecting 'ALL' categories or another evaluation benchmark."
        />
      </div>
    );
  }

  return (
    <div className="w-full border border-hairline rounded bg-surface-well overflow-hidden">
      {/* Table Header (Carbon Ledger Column Spec) */}
      <div className="w-full bg-surface-raised border-b border-hairline px-4 py-2.5 grid grid-cols-12 text-[10px] font-mono uppercase tracking-wider text-text-tertiary select-none">
        <div className="col-span-2 md:col-span-1 flex items-center">RANK</div>
        <div className="col-span-6 md:col-span-4 flex items-center">MODEL & LAB</div>
        <div className="hidden md:flex md:col-span-2 items-center">ARCHITECTURE</div>
        <div className="col-span-4 md:col-span-2 flex items-center justify-end md:justify-start">
          {benchmark === "COMPOSITE" ? "COMPOSITE SCORE" : benchmark}
        </div>
        <div className="hidden md:flex md:col-span-2 items-center">7D TREND</div>
        <div className="hidden md:flex md:col-span-1 items-center justify-end">COMPARE</div>
      </div>

      {/* Leaderboard Rows with Framer Motion AnimatePresence & layout transitions */}
      <div className="divide-y divide-hairline">
        <AnimatePresence mode="popLayout">
          {items.map((item) => {
            const isRank1 = item.rank === 1;
            const isTop10 = item.rank <= 10;
            const isSelected = compare.isSelected(item.slug);

            // Rank height classes:
            // #1 -> 64px (h-16) with radial amber wash
            // #2-#10 -> 44px (h-11)
            // #11+ -> 36px (h-9)
            const rowHeightClass = isRank1
              ? "min-h-[64px] bg-[radial-gradient(ellipse_at_top_left,rgba(245,158,11,0.07),transparent_60%)]"
              : isTop10
              ? "min-h-[44px]"
              : "min-h-[36px] bg-surface-canvas/30";

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className={`w-full px-4 py-2 grid grid-cols-12 items-center hover:bg-surface-raised/40 transition-colors group ${rowHeightClass}`}
              >
                {/* Column 1: Rank & Delta */}
                <div className="col-span-2 md:col-span-1 flex items-center gap-2">
                  <span
                    className={`font-mono tabular-nums font-bold ${
                      isRank1
                        ? "text-base text-signal-amber"
                        : isTop10
                        ? "text-sm text-text-primary"
                        : "text-xs text-text-secondary"
                    }`}
                  >
                    #{item.rank < 10 ? `0${item.rank}` : item.rank}
                  </span>

                  {/* 7d Delta Indicator */}
                  <span className="font-mono text-[10px] tabular-nums">
                    {item.delta > 0 && (
                      <span className="text-signal-mint font-medium">▲{item.delta}</span>
                    )}
                    {item.delta < 0 && (
                      <span className="text-signal-coral font-medium">▼{Math.abs(item.delta)}</span>
                    )}
                    {item.delta === 0 && <span className="text-text-tertiary">—</span>}
                  </span>
                </div>

                {/* Column 2: Model Name & Lab */}
                <div className="col-span-6 md:col-span-4 flex items-center gap-3 pr-2 min-w-0">
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2 truncate">
                      <Link
                        href={`/models/${item.slug}`}
                        className={`truncate hover:text-signal-amber transition-colors ${
                          isRank1
                            ? "font-headline font-bold text-base text-text-primary"
                            : "font-headline font-semibold text-sm text-text-primary"
                        }`}
                      >
                        {item.name}
                      </Link>
                      {item.isOpenWeights && (
                        <span className="px-1 py-0.2 rounded bg-signal-mint/10 text-signal-mint text-[9px] font-mono border border-signal-mint/20 shrink-0">
                          OPEN
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-[10px] text-text-tertiary truncate">
                      {item.lab.name}
                    </span>
                  </div>
                </div>

                {/* Column 3: Architecture & Modality (Desktop only) */}
                <div className="hidden md:flex md:col-span-2 items-center gap-1.5 text-xs font-mono">
                  <span className="text-text-secondary uppercase">{item.modality}</span>
                  <span className="text-text-tertiary">·</span>
                  <span className="text-text-tertiary">{item.modelType}</span>
                </div>

                {/* Column 4: Score */}
                <div className="col-span-4 md:col-span-2 flex items-center justify-end md:justify-start gap-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-mono tabular-nums font-bold ${
                        isRank1
                          ? "text-lg text-signal-amber"
                          : isTop10
                          ? "text-sm text-text-primary"
                          : "text-xs text-text-secondary"
                      }`}
                    >
                      {item.score.toFixed(1)}
                    </span>
                    {/* Visual miniature score bar */}
                    <div className="hidden sm:block w-16 h-1.5 bg-surface-canvas rounded-full overflow-hidden border border-hairline">
                      <div
                        className={`h-full ${
                          isRank1 ? "bg-signal-amber" : isTop10 ? "bg-signal-mint" : "bg-text-tertiary"
                        }`}
                        style={{ width: `${Math.min(100, Math.max(0, item.score))}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Column 5: 7d Sparkline (Desktop only) */}
                <div className="hidden md:flex md:col-span-2 items-center">
                  <Sparkline
                    data={item.sparkline7d}
                    width={72}
                    height={18}
                    color={isRank1 ? "amber" : "mint"}
                  />
                </div>

                {/* Column 6: Compare Checkbox */}
                <div className="hidden md:flex md:col-span-1 items-center justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        compare.removeModel(item.slug);
                      } else {
                        compare.addModel({
                          slug: item.slug,
                          name: item.name,
                          labName: item.lab.name,
                          labSlug: item.lab.slug,
                          inputPricePer1M: 0,
                          outputPricePer1M: 0,
                          contextWindow: 0,
                        });
                      }
                    }}
                    className={`w-4 h-4 rounded border transition-colors flex items-center justify-center text-[10px] font-mono ${
                      isSelected
                        ? "bg-signal-amber border-signal-amber text-surface-canvas font-bold"
                        : "border-hairline-strong bg-surface-canvas hover:border-signal-amber text-transparent"
                    }`}
                    aria-label={`Compare ${item.name}`}
                  >
                    ✓
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
