"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { SignalBadge } from "@/components/ui/SignalBadge";
import { CatalogSkeleton, ErrorBanner, EmptyState } from "@/components/ui/States";
import { formatPrice, formatCompactNumber } from "@/lib/formatters";
import type { DirectoryResponse, DirectoryLabItem, DirectoryProviderItem } from "@/lib/types/api";

export function DirectoryClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const typeParam = searchParams.get("type");
  const [activeTab, setActiveTab] = useState<"lab" | "provider">(
    typeParam === "provider" ? "provider" : "lab"
  );

  // Track expanded lab/provider IDs for inline inspection (max 2 pinned)
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  // Sync state to URL
  useEffect(() => {
    const newPath = `/directory?type=${activeTab}`;
    window.history.replaceState(null, "", newPath);
  }, [activeTab]);

  const { data, isLoading, isError, error, refetch } = useQuery<DirectoryResponse>({
    queryKey: ["directory", activeTab],
    queryFn: async () => {
      const res = await fetch(`/api/directory?type=${activeTab}`);
      if (!res.ok) throw new Error(`Failed to load directory: HTTP ${res.status}`);
      return res.json();
    },
    staleTime: 60_000,
  });

  const toggleExpand = useCallback((id: string) => {
    setExpandedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id);
      }
      // Keep at most 2 pinned open
      if (prev.length >= 2) {
        return [prev[prev.length - 1], id];
      }
      return [...prev, id];
    });
  }, []);

  return (
    <div className="w-full min-h-screen bg-surface-canvas text-text-primary flex flex-col">
      {/* Header Band */}
      <section className="w-full bg-surface-well border-b border-hairline py-6 px-4 md:px-6">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs uppercase tracking-wider text-signal-amber font-semibold">
                SYSTEM DIRECTORY
              </span>
              <span className="text-text-tertiary text-xs font-mono">/</span>
              <span className="font-mono text-xs text-text-secondary uppercase">
                {activeTab === "lab" ? "RESEARCH LABS" : "INFERENCE PROVIDERS"}
              </span>
            </div>
            <h1 className="font-headline font-bold text-2xl md:text-3xl tracking-tight text-text-primary">
              Frontier Labs & Inference Providers
            </h1>
            <p className="font-sans text-xs md:text-sm text-text-secondary mt-1 max-w-2xl">
              Inspect verified foundation model laboratories, hosting infrastructure providers, SLA tiers, and regional edge distribution.
            </p>
          </div>

          {/* Segmented Control with Framer Motion sliding pill */}
          <div className="flex items-center p-1 bg-surface-canvas border border-hairline-strong rounded self-start md:self-auto">
            <button
              type="button"
              onClick={() => {
                setActiveTab("lab");
                setExpandedIds([]);
              }}
              className="relative px-4 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors z-10"
            >
              {activeTab === "lab" && (
                <motion.div
                  layoutId="directory-tab-pill"
                  className="absolute inset-0 bg-surface-raised border border-hairline-strong rounded -z-10 shadow-sm"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className={activeTab === "lab" ? "text-signal-amber font-semibold" : "text-text-secondary hover:text-text-primary"}>
                Research Labs
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("provider");
                setExpandedIds([]);
              }}
              className="relative px-4 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors z-10"
            >
              {activeTab === "provider" && (
                <motion.div
                  layoutId="directory-tab-pill"
                  className="absolute inset-0 bg-surface-raised border border-hairline-strong rounded -z-10 shadow-sm"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className={activeTab === "provider" ? "text-signal-amber font-semibold" : "text-text-secondary hover:text-text-primary"}>
                Inference Providers
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Directory Table Content */}
      <div className="max-w-[1440px] mx-auto w-full px-4 md:px-6 py-6 flex-1">
        {isLoading && (
          <div className="py-6">
            <CatalogSkeleton rows={8} />
          </div>
        )}

        {isError && (
          <div className="py-6">
            <ErrorBanner
              message={error instanceof Error ? error.message : "Failed to load directory."}
              onRetry={() => refetch()}
            />
          </div>
        )}

        {!isLoading && !isError && data && (
          <div className="w-full border border-hairline rounded bg-surface-well overflow-hidden">
            {/* Table Column Bar */}
            <div className="w-full bg-surface-raised border-b border-hairline px-4 py-2.5 grid grid-cols-12 text-[10px] font-mono uppercase tracking-wider text-text-tertiary select-none">
              <div className="col-span-6 md:col-span-4 flex items-center">
                {activeTab === "lab" ? "LABORATORY & IDENTITY" : "PROVIDER & CLOUD"}
              </div>
              <div className="hidden md:flex md:col-span-3 items-center">
                {activeTab === "lab" ? "HEADQUARTERS & FOUNDED" : "REGIONS & SLA"}
              </div>
              <div className="col-span-3 md:col-span-2 flex items-center justify-end md:justify-start">
                {activeTab === "lab" ? "MODELS INDEXED" : "HOSTED MODELS"}
              </div>
              <div className="hidden md:flex md:col-span-2 items-center">
                {activeTab === "lab" ? "AVG INPUT PRICE" : "MEDIAN LATENCY"}
              </div>
              <div className="col-span-3 md:col-span-1 flex items-center justify-end">INSPECT</div>
            </div>

            {/* Entity Rows */}
            <div className="divide-y divide-hairline">
              {data.type === "lab" &&
                data.items.map((lab: DirectoryLabItem) => {
                  const isExpanded = expandedIds.includes(lab.id);

                  return (
                    <div key={lab.id} className="flex flex-col">
                      {/* Main 56px Row */}
                      <div className="w-full min-h-[56px] px-4 py-3 grid grid-cols-12 items-center hover:bg-surface-raised/40 transition-colors group">
                        {/* Col 1: Name & logo */}
                        <div className="col-span-6 md:col-span-4 flex items-center gap-3 pr-2 min-w-0">
                          <div className="w-8 h-8 rounded bg-surface-canvas border border-hairline-strong flex items-center justify-center shrink-0 font-mono text-xs text-signal-amber font-bold">
                            {lab.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-1.5 truncate">
                              <Link
                                href={`/directory/${lab.slug}`}
                                className="font-headline font-semibold text-sm text-text-primary hover:text-signal-amber transition-colors truncate"
                              >
                                {lab.name}
                              </Link>
                              {lab.verified && (
                                <span className="text-[10px] text-signal-mint font-mono" title="Verified Lab">
                                  ✓
                                </span>
                              )}
                            </div>
                            <span className="font-mono text-[10px] text-text-tertiary truncate">
                              {lab.website.replace(/^https?:\/\//, "")}
                            </span>
                          </div>
                        </div>

                        {/* Col 2: Headquarters & Founded */}
                        <div className="hidden md:flex md:col-span-3 flex-col text-xs font-mono">
                          <span className="text-text-secondary truncate">{lab.headquarters}</span>
                          <span className="text-text-tertiary text-[10px]">Est. {lab.foundedYear}</span>
                        </div>

                        {/* Col 3: Model Count */}
                        <div className="col-span-3 md:col-span-2 flex items-center justify-end md:justify-start">
                          <span className="font-mono tabular-nums text-sm font-semibold text-text-primary">
                            {lab.modelCount} models
                          </span>
                        </div>

                        {/* Col 4: Avg Price */}
                        <div className="hidden md:flex md:col-span-2 flex-col font-mono">
                          <span className="tabular-nums text-xs text-text-primary">
                            {formatPrice(lab.avgInputPrice)}
                          </span>
                          <span className="text-[10px] text-text-tertiary">Max CTX: {formatCompactNumber(lab.maxContext)}</span>
                        </div>

                        {/* Col 5: Actions (Inline Toggle + Profile Link) */}
                        <div className="col-span-3 md:col-span-1 flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => toggleExpand(lab.id)}
                            className="px-2 py-1 text-[11px] font-mono uppercase bg-surface-canvas hover:bg-surface-overlay border border-hairline rounded text-text-secondary hover:text-text-primary transition-colors"
                            aria-label={`Toggle models for ${lab.name}`}
                          >
                            {isExpanded ? "CLOSE" : "EXPAND"}
                          </button>
                        </div>
                      </div>

                      {/* Nested Expandable Models Sub-Table (36px rows) */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="w-full bg-surface-canvas/90 border-t border-hairline overflow-hidden"
                          >
                            <div className="px-6 py-3 flex flex-col gap-2">
                              <div className="flex items-center justify-between text-[10px] font-mono uppercase text-text-tertiary tracking-wider border-b border-hairline pb-1">
                                <span>TOP REGISTERED MODELS FROM {lab.name.toUpperCase()}</span>
                                <Link
                                  href={`/directory/${lab.slug}`}
                                  className="text-signal-amber hover:underline flex items-center gap-1"
                                >
                                  <span>FULL LAB PROFILE</span>
                                  <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
                                </Link>
                              </div>

                              <div className="divide-y divide-hairline">
                                {lab.topModels.map((m) => (
                                  <div
                                    key={m.slug}
                                    className="h-9 flex items-center justify-between px-2 text-xs hover:bg-surface-raised/50 rounded transition-colors"
                                  >
                                    <div className="flex items-center gap-3">
                                      <span className="font-mono text-text-tertiary text-[10px]">
                                        #{m.rank}
                                      </span>
                                      <Link
                                        href={`/models/${m.slug}`}
                                        className="font-headline font-medium text-text-primary hover:text-signal-amber transition-colors"
                                      >
                                        {m.name}
                                      </Link>
                                    </div>
                                    <div className="flex items-center gap-4 font-mono text-[11px] tabular-nums">
                                      <span className="text-signal-amber font-semibold">
                                        {m.score.toFixed(1)} score
                                      </span>
                                      <Link
                                        href={`/models/${m.slug}`}
                                        className="text-text-tertiary hover:text-text-primary text-[10px] uppercase underline"
                                      >
                                        Inspect
                                      </Link>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

              {data.type === "provider" &&
                data.items.map((prov: DirectoryProviderItem) => {
                  const isExpanded = expandedIds.includes(prov.id);

                  return (
                    <div key={prov.id} className="flex flex-col">
                      {/* Main 56px Row */}
                      <div className="w-full min-h-[56px] px-4 py-3 grid grid-cols-12 items-center hover:bg-surface-raised/40 transition-colors group">
                        {/* Col 1: Provider Name & Type */}
                        <div className="col-span-6 md:col-span-4 flex items-center gap-3 pr-2 min-w-0">
                          <div className="w-8 h-8 rounded bg-surface-canvas border border-hairline-strong flex items-center justify-center shrink-0 font-mono text-xs text-signal-sky font-bold">
                            {prov.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-1.5 truncate">
                              <Link
                                href={`/directory/${prov.slug}`}
                                className="font-headline font-semibold text-sm text-text-primary hover:text-signal-sky transition-colors truncate"
                              >
                                {prov.name}
                              </Link>
                              <SignalBadge variant="sky" size="xs">
                                {prov.type === "FIRST_PARTY" ? "1ST PARTY" : "CLOUD"}
                              </SignalBadge>
                            </div>
                            <span className="font-mono text-[10px] text-text-tertiary truncate">
                              {prov.regions.join(", ")}
                            </span>
                          </div>
                        </div>

                        {/* Col 2: SLA & Uptime */}
                        <div className="hidden md:flex md:col-span-3 flex-col text-xs font-mono">
                          <div className="flex items-center gap-1.5 text-text-secondary">
                            <span className="w-1.5 h-1.5 rounded-full bg-signal-mint"></span>
                            <span>{prov.uptime30d}% 30d Uptime</span>
                          </div>
                          <span className="text-text-tertiary text-[10px]">{prov.slaTier} SLA Tier</span>
                        </div>

                        {/* Col 3: Hosted Model Count */}
                        <div className="col-span-3 md:col-span-2 flex items-center justify-end md:justify-start">
                          <span className="font-mono tabular-nums text-sm font-semibold text-text-primary">
                            {prov.hostedModelCount} endpoints
                          </span>
                        </div>

                        {/* Col 4: Median Latency */}
                        <div className="hidden md:flex md:col-span-2 flex-col font-mono">
                          <span className="tabular-nums text-xs text-signal-sky font-medium">
                            {prov.medianLatencyMs} ms TTFT
                          </span>
                          <span className="text-[10px] text-text-tertiary">Edge Routing</span>
                        </div>

                        {/* Col 5: Actions */}
                        <div className="col-span-3 md:col-span-1 flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => toggleExpand(prov.id)}
                            className="px-2 py-1 text-[11px] font-mono uppercase bg-surface-canvas hover:bg-surface-overlay border border-hairline rounded text-text-secondary hover:text-text-primary transition-colors"
                            aria-label={`Toggle endpoints for ${prov.name}`}
                          >
                            {isExpanded ? "CLOSE" : "EXPAND"}
                          </button>
                        </div>
                      </div>

                      {/* Nested Expandable Endpoints Sub-Table (36px rows) */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="w-full bg-surface-canvas/90 border-t border-hairline overflow-hidden"
                          >
                            <div className="px-6 py-3 flex flex-col gap-2">
                              <div className="flex items-center justify-between text-[10px] font-mono uppercase text-text-tertiary tracking-wider border-b border-hairline pb-1">
                                <span>HOSTED MODEL ENDPOINTS ON {prov.name.toUpperCase()}</span>
                                <Link
                                  href={`/directory/${prov.slug}`}
                                  className="text-signal-sky hover:underline flex items-center gap-1"
                                >
                                  <span>FULL PROVIDER PROFILE</span>
                                  <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
                                </Link>
                              </div>

                              <div className="divide-y divide-hairline">
                                {prov.hostedModels.map((hm) => (
                                  <div
                                    key={hm.slug}
                                    className="h-9 flex items-center justify-between px-2 text-xs hover:bg-surface-raised/50 rounded transition-colors"
                                  >
                                    <Link
                                      href={`/models/${hm.slug}`}
                                      className="font-headline font-medium text-text-primary hover:text-signal-sky transition-colors"
                                    >
                                      {hm.name}
                                    </Link>
                                    <div className="flex items-center gap-4 font-mono text-[11px] tabular-nums">
                                      <span className="text-text-secondary">
                                        {formatPrice(hm.inputPrice)} / 1M
                                      </span>
                                      <span className="text-signal-sky">{hm.latencyMs} ms</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
