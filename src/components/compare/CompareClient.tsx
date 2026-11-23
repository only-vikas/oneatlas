"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useCompare } from "@/lib/store/compare-store";
import { SignalBadge } from "@/components/ui/SignalBadge";
import { EmptyState, ErrorBanner, CatalogSkeleton } from "@/components/ui/States";
import { formatPrice, formatCompactNumber } from "@/lib/formatters";
import type { CompareResponse, SearchResponse } from "@/lib/types/api";

const DEFAULT_SLUGS = ["claude-4-5-sonnet", "deepseek-r2", "gpt-5"];

interface ModelOption {
  slug: string;
  name: string;
  labName: string;
}

export function CompareClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const compare = useCompare();

  // Read initial slugs from URL or store or fallback
  const urlSlugsParam = searchParams.get("slugs");
  const [activeSlugs, setActiveSlugs] = useState<string[]>(() => {
    if (urlSlugsParam) {
      const parsed = Array.from(
        new Set(
          urlSlugsParam
            .split(",")
            .map((s) => s.trim().toLowerCase())
            .filter(Boolean)
        )
      );
      if (parsed.length > 0) return parsed.slice(0, 4);
    }
    return DEFAULT_SLUGS;
  });

  // Track copy URL feedback
  const [copied, setCopied] = useState(false);

  // Quick Add Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Sync with URL when activeSlugs changes
  useEffect(() => {
    if (activeSlugs.length > 0) {
      const currentParam = activeSlugs.join(",");
      const newUrl = `/compare?slugs=${encodeURIComponent(currentParam)}`;
      window.history.replaceState(null, "", newUrl);
    }
  }, [activeSlugs]);

  // Synchronize from store if URL is completely absent on initial load
  useEffect(() => {
    if (!urlSlugsParam && compare.isHydrated && compare.selectedModels.length > 0) {
      setActiveSlugs(compare.selectedModels.map((m) => m.slug).slice(0, 4));
    }
  }, [urlSlugsParam, compare.isHydrated, compare.selectedModels]);

  // Fetch Compare Matrix data
  const {
    data: compareData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<CompareResponse>({
    queryKey: ["compare-matrix", activeSlugs.join(",")],
    queryFn: async () => {
      if (activeSlugs.length === 0) {
        return { models: [], winners: { bestValueSlug: null, fastestSlug: null, largestContextSlug: null, benchmarks: {} } };
      }
      const res = await fetch(`/api/compare?slugs=${encodeURIComponent(activeSlugs.join(","))}`);
      if (!res.ok) {
        throw new Error(`Failed to load comparison: HTTP ${res.status}`);
      }
      return res.json();
    },
    enabled: activeSlugs.length > 0,
    staleTime: 60_000,
  });

  // Fetch quick model search suggestions when modal is open
  const { data: searchResults, isLoading: isSearching } = useQuery<SearchResponse>({
    queryKey: ["quick-search-compare", searchQuery],
    queryFn: async () => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      if (!res.ok) throw new Error("Search failed");
      return res.json();
    },
    enabled: isAddModalOpen,
    staleTime: 30_000,
  });

  const handleRemoveSlug = useCallback(
    (slugToRemove: string) => {
      setActiveSlugs((prev) => prev.filter((s) => s !== slugToRemove));
      compare.removeModel(slugToRemove);
    },
    [compare]
  );

  const handleAddSlug = useCallback(
    (newSlug: string) => {
      if (activeSlugs.includes(newSlug) || activeSlugs.length >= 4) return;
      setActiveSlugs((prev) => [...prev, newSlug]);
      setIsAddModalOpen(false);
      setSearchQuery("");
    },
    [activeSlugs]
  );

  const handleClearAll = useCallback(() => {
    setActiveSlugs([]);
    compare.clearModels();
    window.history.replaceState(null, "", "/compare");
  }, [compare]);

  const handleCopyShareUrl = useCallback(() => {
    if (typeof window === "undefined") return;
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const models = compareData?.models ?? [];
  const winners = compareData?.winners ?? {
    bestValueSlug: null,
    fastestSlug: null,
    largestContextSlug: null,
    benchmarks: {},
  };

  // Distinct benchmark names across all compared models
  const allBenchmarkNames = useMemo(() => {
    const set = new Set<string>();
    for (const m of models) {
      if ("benchmarkScores" in m && m.benchmarkScores) {
        Object.keys(m.benchmarkScores).forEach((k) => set.add(k));
      } else if (m.benchmarks) {
        m.benchmarks.forEach((b) => set.add(b.benchmarkName));
      }
    }
    // Preferred ordering
    const order = ["SWE-bench Verified", "MMLU-Pro", "GPQA Diamond", "LiveCodeBench", "Arena Elo"];
    return Array.from(set).sort((a, b) => {
      const idxA = order.indexOf(a);
      const idxB = order.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });
  }, [models]);

  return (
    <div className="w-full min-h-screen bg-surface-canvas text-text-primary flex flex-col">
      {/* 4-SLOT COMPARISON BAR */}
      <section className="w-full bg-surface-well border-b border-hairline sticky top-14 z-30 backdrop-blur-md bg-opacity-95">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Slots 0-3 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-1 max-w-4xl">
            {[0, 1, 2, 3].map((slotIdx) => {
              const slug = activeSlugs[slotIdx];
              const model = models.find((m) => m.slug === slug);

              if (slug) {
                return (
                  <div
                    key={slotIdx}
                    className="h-10 px-3 bg-surface-raised border border-hairline-strong rounded flex items-center justify-between gap-2 overflow-hidden"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-mono text-[10px] text-signal-amber font-semibold">
                        0{slotIdx + 1}
                      </span>
                      <span className="font-medium text-xs text-text-primary truncate">
                        {model?.name || slug}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveSlug(slug)}
                      aria-label={`Remove ${model?.name || slug}`}
                      className="w-5 h-5 flex items-center justify-center text-text-tertiary hover:text-signal-coral hover:bg-surface-overlay rounded transition-colors text-xs font-mono"
                    >
                      ×
                    </button>
                  </div>
                );
              }

              return (
                <button
                  key={slotIdx}
                  type="button"
                  onClick={() => setIsAddModalOpen(true)}
                  className="h-10 px-3 border border-dashed border-hairline-strong hover:border-signal-amber bg-surface-canvas/50 hover:bg-surface-raised rounded flex items-center justify-center gap-1.5 text-xs text-text-secondary hover:text-signal-amber transition-colors"
                >
                  <span className="font-mono text-sm leading-none">+</span>
                  <span>Slot 0{slotIdx + 1}</span>
                </button>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
            {activeSlugs.length > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                className="h-9 px-3 text-xs font-mono uppercase text-text-secondary hover:text-signal-coral border border-hairline hover:border-signal-coral/30 rounded transition-colors"
              >
                Clear All
              </button>
            )}
            <button
              type="button"
              onClick={handleCopyShareUrl}
              className="h-9 px-3 text-xs font-mono uppercase text-text-primary bg-surface-raised hover:bg-surface-overlay border border-hairline-strong rounded flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">
                {copied ? "check" : "share"}
              </span>
              <span>{copied ? "COPIED!" : "SHARE LINK"}</span>
            </button>
          </div>
        </div>
      </section>

      {/* MAIN MATRIX CONTENT */}
      <div className="max-w-[1440px] mx-auto w-full px-4 md:px-6 py-6 flex-1">
        {/* Loading State */}
        {isLoading && (
          <div className="py-12">
            <CatalogSkeleton rows={8} />
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="py-8">
            <ErrorBanner
              message={error instanceof Error ? error.message : "Failed to load model comparison matrix."}
              onRetry={() => refetch()}
            />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && models.length === 0 && (
          <div className="py-16">
            <EmptyState
              title="NO MODELS SELECTED"
              message="Select up to 4 models to perform side-by-side technical and economic diff analysis."
              actionLabel="Add Flagship Models"
              onAction={() => setActiveSlugs(DEFAULT_SLUGS)}
            />
          </div>
        )}

        {/* Comparison Table */}
        {!isLoading && !isError && models.length > 0 && (
          <div className="w-full border border-hairline rounded bg-surface-well overflow-hidden">
            <div className="overflow-x-auto">
              <div
                className="min-w-[840px] w-full grid"
                style={{
                  gridTemplateColumns: `200px repeat(${models.length}, minmax(0, 1fr))`,
                }}
              >
                {/* -------------------------------------------------------- */}
                {/* STICKY HEADER ROW */}
                {/* -------------------------------------------------------- */}
                <div className="sticky top-0 left-0 z-30 bg-surface-raised border-b border-hairline p-4 flex flex-col justify-end shadow-[1px_0_0_0_rgba(255,255,255,0.07)]">
                  <span className="font-mono text-[10px] text-text-tertiary uppercase tracking-wider">
                    SPECIFICATION / DIMENSION
                  </span>
                </div>

                {models.map((model) => {
                  const isBestValue = winners.bestValueSlug === model.slug;
                  const isFastest = winners.fastestSlug === model.slug;
                  const isLargestContext = winners.largestContextSlug === model.slug;

                  return (
                    <div
                      key={model.slug}
                      className="sticky top-0 z-20 bg-surface-raised border-b border-l border-hairline p-4 flex flex-col justify-between gap-3 relative"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[10px] text-text-tertiary uppercase">
                              {model.lab.name}
                            </span>
                            {model.isOpenWeights && (
                              <span className="px-1 py-0.2 rounded bg-signal-mint/10 text-signal-mint text-[9px] font-mono border border-signal-mint/20">
                                OPEN
                              </span>
                            )}
                          </div>
                          <Link
                            href={`/models/${model.slug}`}
                            className="font-headline font-semibold text-base text-text-primary hover:text-signal-amber transition-colors"
                          >
                            {model.name}
                          </Link>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveSlug(model.slug)}
                          aria-label={`Remove ${model.name}`}
                          className="w-5 h-5 flex items-center justify-center text-text-tertiary hover:text-signal-coral rounded text-sm font-mono"
                        >
                          ×
                        </button>
                      </div>

                      {/* Winner Badges Strip */}
                      <div className="flex flex-wrap items-center gap-1.5 min-h-[22px]">
                        {isBestValue && (
                          <SignalBadge variant="mint" size="xs">
                            BEST VALUE
                          </SignalBadge>
                        )}
                        {isFastest && (
                          <SignalBadge variant="sky" size="xs">
                            FASTEST
                          </SignalBadge>
                        )}
                        {isLargestContext && (
                          <SignalBadge variant="amber" size="xs">
                            MAX CTX
                          </SignalBadge>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* -------------------------------------------------------- */}
                {/* SECTION 01 // PRICING & CACHING */}
                {/* -------------------------------------------------------- */}
                <div
                  className="col-span-full bg-surface-canvas/90 px-4 py-2 border-b border-hairline text-[10px] font-mono uppercase tracking-widest text-signal-amber font-semibold flex items-center justify-between"
                >
                  <span>01 // PRICING & CACHING (PER 1M TOKENS)</span>
                  <span className="text-text-tertiary text-[9px]">LOWEST INDEXED RATES</span>
                </div>

                {/* Row: Input Price */}
                <MatrixRow
                  label="Input Price"
                  sublabel="Direct prompt token cost"
                  models={models}
                  renderValue={(m) => (
                    <div className="flex items-center gap-2">
                      <span className="font-mono tabular-nums text-sm font-medium text-text-primary">
                        {formatPrice(m.pricing.lowestInputPrice)}
                      </span>
                      {winners.bestValueSlug === m.slug && (
                        <SignalBadge variant="mint" size="xs">
                          LOWEST
                        </SignalBadge>
                      )}
                    </div>
                  )}
                />

                {/* Row: Output Price */}
                <MatrixRow
                  label="Output Price"
                  sublabel="Generated completion tokens"
                  models={models}
                  renderValue={(m) => (
                    <span className="font-mono tabular-nums text-sm text-text-primary">
                      {formatPrice(m.pricing.lowestOutputPrice)}
                    </span>
                  )}
                />

                {/* Row: Blended Cost (3:1 ratio) */}
                <MatrixRow
                  label="Blended $/1M"
                  sublabel="75% input : 25% output"
                  models={models}
                  renderValue={(m) => {
                    const blended =
                      0.75 * m.pricing.lowestInputPrice + 0.25 * m.pricing.lowestOutputPrice;
                    return (
                      <span className="font-mono tabular-nums text-sm text-text-secondary">
                        {formatPrice(blended)}
                      </span>
                    );
                  }}
                />

                {/* Row: Cache Read Price */}
                <MatrixRow
                  label="Cache Read Price"
                  sublabel="Prompt cache hit discount"
                  models={models}
                  renderValue={(m) => {
                    const cachePrice = m.pricing.lowestCachePrice;
                    if (cachePrice === null || cachePrice === undefined) {
                      return <span className="text-text-tertiary text-xs font-mono">N/A</span>;
                    }
                    return (
                      <span className="font-mono tabular-nums text-sm text-signal-mint font-medium">
                        {formatPrice(cachePrice)}
                      </span>
                    );
                  }}
                />

                {/* Row: Caching Support */}
                <MatrixRow
                  label="Prompt Caching"
                  sublabel="KV-cache reuse architecture"
                  models={models}
                  renderValue={(m) => (
                    <span className="text-xs font-mono">
                      {m.pricing.lowestCachePrice !== null ? (
                        <span className="text-signal-mint flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-signal-mint"></span>
                          SUPPORTED
                        </span>
                      ) : (
                        <span className="text-text-tertiary">NOT SUPPORTED</span>
                      )}
                    </span>
                  )}
                />

                {/* -------------------------------------------------------- */}
                {/* SECTION 02 // ARCHITECTURE & RUNTIME */}
                {/* -------------------------------------------------------- */}
                <div
                  className="col-span-full bg-surface-canvas/90 px-4 py-2 border-b border-hairline text-[10px] font-mono uppercase tracking-widest text-signal-amber font-semibold flex items-center justify-between"
                >
                  <span>02 // ARCHITECTURE & RUNTIME</span>
                  <span className="text-text-tertiary text-[9px]">TOKEN BOUNDS & LATENCY</span>
                </div>

                {/* Row: Context Window */}
                <MatrixRow
                  label="Context Window"
                  sublabel="Maximum prompt size"
                  models={models}
                  renderValue={(m) => (
                    <div className="flex items-center gap-2">
                      <span className="font-mono tabular-nums text-sm font-semibold text-text-primary">
                        {formatCompactNumber(m.contextWindow)}
                      </span>
                      {winners.largestContextSlug === m.slug && (
                        <SignalBadge variant="amber" size="xs">
                          LARGEST
                        </SignalBadge>
                      )}
                    </div>
                  )}
                />

                {/* Row: Max Output Tokens */}
                <MatrixRow
                  label="Max Output Tokens"
                  sublabel="Generation burst limit"
                  models={models}
                  renderValue={(m) => (
                    <span className="font-mono tabular-nums text-sm text-text-secondary">
                      {formatCompactNumber(m.maxOutputTokens)}
                    </span>
                  )}
                />

                {/* Row: Latency TTFT */}
                <MatrixRow
                  label="Lowest Latency"
                  sublabel="Fastest provider TTFT"
                  models={models}
                  renderValue={(m) => (
                    <div className="flex items-center gap-2">
                      <span className="font-mono tabular-nums text-sm text-text-primary">
                        {m.pricing.lowestLatencyMs} ms
                      </span>
                      {winners.fastestSlug === m.slug && (
                        <SignalBadge variant="sky" size="xs">
                          FASTEST
                        </SignalBadge>
                      )}
                    </div>
                  )}
                />

                {/* Row: Max Throughput */}
                <MatrixRow
                  label="Max Throughput"
                  sublabel="Generation speed"
                  models={models}
                  renderValue={(m) => (
                    <span className="font-mono tabular-nums text-sm text-text-secondary">
                      {m.pricing.highestThroughputTps > 0
                        ? `${m.pricing.highestThroughputTps} tps`
                        : "N/A"}
                    </span>
                  )}
                />

                {/* Row: Modality & Type */}
                <MatrixRow
                  label="Modality & Type"
                  sublabel="Input domain and reasoning"
                  models={models}
                  renderValue={(m) => (
                    <div className="flex flex-col gap-1 text-xs">
                      <span className="font-mono text-text-primary uppercase">{m.modality}</span>
                      <span className="font-mono text-text-tertiary text-[10px]">{m.modelType}</span>
                    </div>
                  )}
                />

                {/* -------------------------------------------------------- */}
                {/* SECTION 03 // STANDARDIZED BENCHMARKS */}
                {/* -------------------------------------------------------- */}
                <div
                  className="col-span-full bg-surface-canvas/90 px-4 py-2 border-b border-hairline text-[10px] font-mono uppercase tracking-widest text-signal-amber font-semibold flex items-center justify-between"
                >
                  <span>03 // STANDARDIZED BENCHMARKS</span>
                  <span className="text-text-tertiary text-[9px]">EVALUATED ZERO-SHOT</span>
                </div>

                {/* Row: Composite Score */}
                <MatrixRow
                  label="Composite Score"
                  sublabel="Multi-domain harmonic score"
                  models={models}
                  renderValue={(m) => (
                    <div className="flex items-center gap-2">
                      <span className="font-mono tabular-nums text-base font-bold text-signal-amber">
                        {m.compositeScore.toFixed(1)}
                      </span>
                      <span className="text-[10px] font-mono text-text-tertiary">/ 100</span>
                    </div>
                  )}
                />

                {/* Individual Benchmark Rows */}
                {allBenchmarkNames.map((bmName) => {
                  const winnerSlug = winners.benchmarks[bmName];

                  return (
                    <MatrixRow
                      key={bmName}
                      label={bmName}
                      sublabel="Standard evaluation score"
                      models={models}
                      renderValue={(m) => {
                        let score: number | undefined;
                        if ("benchmarkScores" in m && m.benchmarkScores) {
                          score = (m.benchmarkScores as Record<string, number>)[bmName];
                        } else if (m.benchmarks) {
                          const bm = m.benchmarks.find((b: { benchmarkName: string; score: number }) => b.benchmarkName === bmName);
                          score = bm?.score;
                        }

                        if (score === undefined) {
                          return <span className="text-text-tertiary text-xs font-mono">—</span>;
                        }

                        const isBmWinner = winnerSlug === m.slug;

                        return (
                          <div className="flex items-center gap-2">
                            <span
                              className={`font-mono tabular-nums text-sm font-semibold ${
                                isBmWinner ? "text-signal-mint" : "text-text-primary"
                              }`}
                            >
                              {score.toFixed(1)}
                            </span>
                            {isBmWinner && (
                              <SignalBadge variant="mint" size="xs">
                                TOP
                              </SignalBadge>
                            )}
                          </div>
                        );
                      }}
                    />
                  );
                })}

                {/* -------------------------------------------------------- */}
                {/* SECTION 04 // GOVERNANCE & HOSTING */}
                {/* -------------------------------------------------------- */}
                <div
                  className="col-span-full bg-surface-canvas/90 px-4 py-2 border-b border-hairline text-[10px] font-mono uppercase tracking-widest text-signal-amber font-semibold flex items-center justify-between"
                >
                  <span>04 // GOVERNANCE & HOSTING</span>
                  <span className="text-text-tertiary text-[9px]">REGIONAL AVAILABILITY & LICENSE</span>
                </div>

                {/* Row: Weights License */}
                <MatrixRow
                  label="Weights & License"
                  sublabel="Deployment freedom"
                  models={models}
                  renderValue={(m) => (
                    <div className="flex flex-col gap-1">
                      <SignalBadge variant={m.isOpenWeights ? "mint" : "amber"} size="xs">
                        {m.isOpenWeights ? "OPEN WEIGHTS" : "PROPRIETARY"}
                      </SignalBadge>
                      <span className="font-mono text-[10px] text-text-tertiary truncate">
                        {m.license || "Commercial API"}
                      </span>
                    </div>
                  )}
                />

                {/* Row: Provider Count */}
                <MatrixRow
                  label="Indexed Providers"
                  sublabel="Active routing endpoints"
                  models={models}
                  renderValue={(m) => (
                    <span className="font-mono tabular-nums text-sm text-text-primary">
                      {m.pricing.providerCount} providers
                    </span>
                  )}
                />

                {/* Row: Capabilities */}
                <MatrixRow
                  label="Capabilities"
                  sublabel="Native execution traits"
                  models={models}
                  renderValue={(m) => (
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {m.capabilities.map((cap: string) => (
                        <span
                          key={cap}
                          className="px-1.5 py-0.5 rounded bg-surface-overlay text-[10px] font-mono text-text-secondary border border-hairline"
                        >
                          {cap.replace(/_/g, " ")}
                        </span>
                      ))}
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* QUICK ADD MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-surface-canvas/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-surface-well border border-hairline-strong rounded p-4 flex flex-col gap-3 shadow-2xl">
            <div className="flex items-center justify-between border-b border-hairline pb-2.5">
              <span className="font-mono text-xs uppercase tracking-wider text-text-primary">
                SELECT MODEL TO COMPARE
              </span>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="w-6 h-6 flex items-center justify-center text-text-tertiary hover:text-text-primary font-mono text-sm"
              >
                ×
              </button>
            </div>

            <div className="relative">
              <span className="material-symbols-outlined text-[16px] text-text-tertiary absolute left-3 top-2.5">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, slug, or lab..."
                autoFocus
                className="w-full pl-9 pr-3 py-2 bg-surface-canvas border border-hairline-strong focus:border-signal-amber rounded text-sm text-text-primary placeholder:text-text-tertiary font-mono outline-none"
              />
            </div>

            <div className="max-h-64 overflow-y-auto flex flex-col divide-y divide-hairline">
              {isSearching && (
                <div className="py-6 text-center text-xs font-mono text-text-tertiary">
                  Searching models...
                </div>
              )}

              {!isSearching &&
                searchResults?.models &&
                searchResults.models.length > 0 &&
                searchResults.models.map((result) => {
                  const isAlreadyAdded = activeSlugs.includes(result.slug);
                  return (
                    <button
                      key={result.slug}
                      type="button"
                      disabled={isAlreadyAdded}
                      onClick={() => handleAddSlug(result.slug)}
                      className={`py-2 px-2 flex items-center justify-between text-left hover:bg-surface-raised transition-colors ${
                        isAlreadyAdded ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
                      }`}
                    >
                      <div>
                        <div className="text-xs font-semibold text-text-primary font-headline">
                          {result.name}
                        </div>
                        <div className="text-[10px] text-text-tertiary font-mono">
                          {result.labName} · Score: {result.compositeScore.toFixed(1)}
                        </div>
                      </div>
                      <span className="text-xs font-mono text-signal-amber">
                        {isAlreadyAdded ? "ADDED" : "+ ADD"}
                      </span>
                    </button>
                  );
                })}

              {!isSearching &&
                (!searchResults?.models || searchResults.models.length === 0) && (
                  <div className="py-6 text-center text-xs font-mono text-text-tertiary">
                    No models found matching &quot;{searchQuery}&quot;
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------------
// Reusable Matrix Row with Full-Row Hover Highlighting
// ----------------------------------------------------------------------------
interface MatrixRowProps {
  label: string;
  sublabel: string;
  models: any[];
  renderValue: (model: any) => React.ReactNode;
}

function MatrixRow({ label, sublabel, models, renderValue }: MatrixRowProps) {
  return (
    <div className="contents group">
      {/* Attribute label cell (sticky left column for mobile & desktop) */}
      <div className="sticky left-0 z-10 bg-surface-well group-hover:bg-surface-raised/90 border-b border-hairline p-4 flex flex-col justify-center transition-colors shadow-[1px_0_0_0_rgba(255,255,255,0.07)]">
        <span className="text-xs font-semibold text-text-primary tracking-tight">{label}</span>
        <span className="text-[10px] text-text-tertiary font-mono">{sublabel}</span>
      </div>

      {/* Model value cells */}
      {models.map((model) => (
        <div
          key={model.slug}
          className="border-b border-l border-hairline p-4 flex items-center group-hover:bg-surface-raised/40 transition-colors"
        >
          {renderValue(model)}
        </div>
      ))}
    </div>
  );
}
