"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ArrowUpDown, ChevronDown, RefreshCw, X } from "lucide-react";
import { FilterRail } from "./FilterRail";
import { CatalogTable } from "./CatalogTable";
import { CatalogSkeleton, EmptyState, ErrorBanner } from "@/components/ui/States";
import { ModelsResponse, ModelListItem } from "@/lib/types/api";

const MODALITY_TABS = [
  { key: "ALL", label: "All Modalities" },
  { key: "TEXT", label: "Text Only" },
  { key: "REASONING", label: "Reasoning" },
  { key: "CODE", label: "Coding" },
  { key: "MULTIMODAL", label: "Multimodal" },
];

const SORT_OPTIONS = [
  { key: "rank", label: "Rank" },
  { key: "price", label: "Price" },
  { key: "context", label: "Context" },
  { key: "released", label: "Released" },
];

export function ModelCatalogClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Parse filters from URL
  const queryQ = searchParams.get("q") ?? "";
  const queryModality = searchParams.get("modality") ?? "ALL";
  const queryLabs = searchParams.get("lab")?.split(",").filter(Boolean) ?? [];
  const queryProviders = searchParams.get("provider")?.split(",").filter(Boolean) ?? [];
  const queryCapabilities = searchParams.get("capability")?.split(",").filter(Boolean) ?? [];
  const queryMinContext = parseInt(searchParams.get("minContext") ?? "0", 10) || 0;
  const queryWeights = searchParams.get("openWeights") ?? "all";
  const querySort = searchParams.get("sort") ?? "rank";
  const queryDir = (searchParams.get("dir") as "asc" | "desc") ?? (querySort === "rank" || querySort === "price" ? "asc" : "desc");

  // Local state for instant input feedback
  const [searchInput, setSearchInput] = useState(queryQ);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync search input if URL changes externally
  useEffect(() => {
    setSearchInput(queryQ);
  }, [queryQ]);

  // Debounced update to URL
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== queryQ) {
        updateQuery({ q: searchInput || undefined });
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [searchInput, queryQ]);

  // Helper to update URL params cleanly
  const updateQuery = useCallback(
    (updates: Record<string, string | number | undefined>) => {
      const current = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, val]) => {
        if (val === undefined || val === "" || val === 0 || val === "ALL" || val === "all") {
          current.delete(key);
        } else {
          current.set(key, String(val));
        }
      });

      router.replace(`${pathname}?${current.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  // Filter actions
  const handleToggleLab = (slug: string) => {
    const next = queryLabs.includes(slug)
      ? queryLabs.filter((l) => l !== slug)
      : [...queryLabs, slug];
    updateQuery({ lab: next.length > 0 ? next.join(",") : undefined });
  };

  const handleToggleProvider = (slug: string) => {
    const next = queryProviders.includes(slug)
      ? queryProviders.filter((p) => p !== slug)
      : [...queryProviders, slug];
    updateQuery({ provider: next.length > 0 ? next.join(",") : undefined });
  };

  const handleToggleCapability = (cap: string) => {
    const next = queryCapabilities.includes(cap)
      ? queryCapabilities.filter((c) => c !== cap)
      : [...queryCapabilities, cap];
    updateQuery({ capability: next.length > 0 ? next.join(",") : undefined });
  };

  const handleSelectModality = (modality: string) => {
    updateQuery({ modality });
  };

  const handleSelectContext = (ctx: number) => {
    updateQuery({ minContext: ctx || undefined });
  };

  const handleSelectWeights = (weights: string) => {
    updateQuery({ openWeights: weights !== "all" ? weights : undefined });
  };

  const handleSortChange = (newSort: string) => {
    if (newSort === querySort) {
      // Toggle direction
      updateQuery({ dir: queryDir === "asc" ? "desc" : "asc" });
    } else {
      updateQuery({
        sort: newSort,
        dir: newSort === "rank" || newSort === "price" ? "asc" : "desc",
      });
    }
  };

  const handleResetFilters = () => {
    setSearchInput("");
    router.replace(pathname, { scroll: false });
  };

  const hasActiveFilters =
    Boolean(queryQ) ||
    queryModality !== "ALL" ||
    queryLabs.length > 0 ||
    queryProviders.length > 0 ||
    queryCapabilities.length > 0 ||
    queryMinContext > 0 ||
    queryWeights !== "all";

  // Query models from backend API with infinite pagination
  const {
    data,
    isLoading,
    isError,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<ModelsResponse>({
    queryKey: [
      "models",
      queryQ,
      queryModality,
      queryLabs.join(","),
      queryProviders.join(","),
      queryCapabilities.join(","),
      queryMinContext,
      queryWeights,
      querySort,
      queryDir,
    ],
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams();
      if (queryQ) params.set("q", queryQ);
      if (queryModality && queryModality !== "ALL") {
        if (queryModality === "REASONING" || queryModality === "CODE") {
          params.set("modelType", queryModality);
        } else {
          params.set("modality", queryModality);
        }
      }
      if (queryLabs.length > 0) params.set("lab", queryLabs.join(","));
      if (queryProviders.length > 0) params.set("provider", queryProviders.join(","));
      if (queryCapabilities.length > 0) params.set("capability", queryCapabilities.join(","));
      if (queryMinContext > 0) params.set("minContext", String(queryMinContext));
      if (queryWeights !== "all") params.set("openWeights", queryWeights);
      params.set("sort", querySort);
      params.set("dir", queryDir);
      params.set("limit", "20");
      if (pageParam) params.set("cursor", pageParam as string);

      const res = await fetch(`/api/models?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load models");
      return res.json();
    },
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    staleTime: 60_000,
  });

  const allModels: ModelListItem[] = useMemo(() => {
    return data?.pages.flatMap((page) => page.items) ?? [];
  }, [data]);

  const totalCount = data?.pages[0]?.totalCount ?? 0;

  return (
    <div className="w-full flex flex-col min-h-[calc(100vh-3.5rem)] relative bg-surface-canvas select-none">
      {/* Top Header Band (64px) with .bg-dot-matrix */}
      <div className="relative h-16 w-full border-b border-hairline flex items-center justify-between px-4 sm:px-6 bg-surface-canvas overflow-hidden">
        {/* Masked 24px-Pitch Dot Matrix */}
        <div className="absolute top-0 inset-x-0 h-full pointer-events-none opacity-35 bg-dot-matrix [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]" />

        {/* Search Input Box */}
        <div className="relative flex items-center w-full max-w-lg z-10">
          <Search className="w-4 h-4 text-text-tertiary absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search 32+ models by name, slug, capability, or lab…"
            className="w-full h-9 pl-9 pr-14 rounded-[4px] bg-surface-well border border-hairline focus:border-signal-amber focus:ring-1 focus:ring-signal-amber text-xs text-text-primary placeholder:text-text-tertiary outline-none font-sans transition-all"
          />
          <kbd className="absolute right-2.5 px-1 py-0.5 rounded-[2px] bg-surface-raised border border-hairline font-mono text-[10px] text-text-tertiary">
            ⌘K
          </kbd>
        </div>

        {/* Telemetry Indicator & Mobile Filter Trigger */}
        <div className="flex items-center gap-3 z-10">
          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-text-tertiary">
            <span>INDEXED:</span>
            <span className="text-text-primary font-medium tabular-nums">
              {totalCount} VERIFIED MODELS
            </span>
          </div>

          {/* Mobile Filter Sheet Trigger (< 1024px) */}
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 h-8 px-2.5 rounded-[4px] bg-surface-well border border-hairline text-text-secondary hover:text-text-primary font-mono text-xs cursor-pointer"
          >
            <Filter className="w-3.5 h-3.5 text-signal-amber" />
            <span>FILTERS</span>
            {hasActiveFilters && (
              <span className="w-1.5 h-1.5 rounded-full bg-signal-amber" />
            )}
          </button>
        </div>
      </div>

      {/* Control Strip: Modality Tabs & Sort Controls */}
      <div className="h-11 border-b border-hairline px-4 sm:px-6 bg-surface-well/40 flex items-center justify-between gap-4 overflow-x-auto">
        {/* Modality Tabs */}
        <div className="flex items-center gap-1 font-structural text-xs shrink-0">
          {MODALITY_TABS.map((tab) => {
            const isActive = queryModality === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => handleSelectModality(tab.key)}
                className={`relative px-3 py-1 rounded-[4px] transition-colors cursor-pointer select-none ${
                  isActive
                    ? "text-text-primary font-medium"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="catalog-modality-pill"
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 30,
                      duration: 0.16,
                    }}
                    className="absolute inset-0 rounded-[4px] border border-hairline-strong bg-surface-raised -z-10 shadow-xs"
                  />
                )}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 shrink-0 font-mono text-xs text-text-tertiary">
          <span className="hidden sm:inline">SORT:</span>
          <div className="flex items-center gap-1 bg-surface-well border border-hairline rounded-[4px] p-0.5">
            {SORT_OPTIONS.map((opt) => {
              const isSelected = querySort === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => handleSortChange(opt.key)}
                  className={`px-2 py-0.5 rounded-[2px] transition-colors flex items-center gap-1 cursor-pointer ${
                    isSelected
                      ? "bg-surface-raised text-signal-amber font-medium"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <span className="uppercase text-[11px]">{opt.label}</span>
                  {isSelected && (
                    <span className="text-[10px]">
                      {queryDir === "asc" ? "▲" : "▼"}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Catalog Viewport: Filter Rail + Ledger Table */}
      <div className="flex flex-1 w-full relative">
        {/* Fixed 240px Left Filter Rail (Desktop ≥ 1024px) */}
        <div className="hidden lg:block shrink-0">
          <FilterRail
            selectedLabs={queryLabs}
            selectedProviders={queryProviders}
            selectedCapabilities={queryCapabilities}
            selectedContext={queryMinContext}
            selectedWeights={queryWeights}
            onToggleLab={handleToggleLab}
            onToggleProvider={handleToggleProvider}
            onToggleCapability={handleToggleCapability}
            onSelectContext={handleSelectContext}
            onSelectWeights={handleSelectWeights}
            onResetFilters={handleResetFilters}
            hasActiveFilters={hasActiveFilters}
            totalFilteredCount={totalCount}
          />
        </div>

        {/* Data Workstation (Table / Skeleton / Empty / Error) */}
        <main className="flex-1 min-w-0 bg-surface-canvas flex flex-col justify-between">
          <div className="w-full">
            {isLoading ? (
              <CatalogSkeleton rows={10} />
            ) : isError ? (
              <div className="p-6">
                <ErrorBanner
                  title="CATALOG SYNC FAULT"
                  message="Could not retrieve models from the PostgreSQL ledger. Verify network connection and retry."
                  onRetry={() => refetch()}
                />
              </div>
            ) : allModels.length === 0 ? (
              <div className="p-6">
                <EmptyState
                  title="No models match "
                  italicWord="that"
                  description="No models in the index matched your active search query or filter constraints."
                  activeFilters={[
                    queryQ ? `query: "${queryQ}"` : null,
                    queryModality !== "ALL" ? `modality: ${queryModality}` : null,
                    ...queryLabs.map((l) => `lab: ${l}`),
                    ...queryProviders.map((p) => `provider: ${p}`),
                    ...queryCapabilities.map((c) => `capability: ${c}`),
                    queryMinContext > 0 ? `context ≥ ${queryMinContext}` : null,
                  ].filter(Boolean) as string[]}
                  onReset={handleResetFilters}
                />
              </div>
            ) : (
              <CatalogTable models={allModels} />
            )}
          </div>

          {/* Load More Pagination Button */}
          {hasNextPage && (
            <div className="p-6 border-t border-hairline flex justify-center bg-surface-canvas">
              <button
                type="button"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="h-9 px-6 rounded-[4px] bg-surface-well hover:bg-surface-raised border border-hairline-strong text-text-primary font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
              >
                {isFetchingNextPage ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-signal-amber" />
                    <span>FETCHING NODES…</span>
                  </>
                ) : (
                  <>
                    <span>LOAD MORE MODELS ({allModels.length} / {totalCount})</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Drawer Bottom Sheet (< 1024px) */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-[4px] -z-10"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="bg-surface-overlay border-t border-hairline-strong rounded-t-[6px] max-h-[80vh] flex flex-col overflow-hidden shadow-2xl"
            >
              <div className="h-12 px-4 border-b border-hairline flex items-center justify-between">
                <span className="font-sans text-xs uppercase tracking-wider font-semibold text-text-primary">
                  Filter Constraints ({totalCount} models)
                </span>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-text-tertiary hover:text-text-primary"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="overflow-y-auto flex-1">
                <FilterRail
                  selectedLabs={queryLabs}
                  selectedProviders={queryProviders}
                  selectedCapabilities={queryCapabilities}
                  selectedContext={queryMinContext}
                  selectedWeights={queryWeights}
                  onToggleLab={handleToggleLab}
                  onToggleProvider={handleToggleProvider}
                  onToggleCapability={handleToggleCapability}
                  onSelectContext={handleSelectContext}
                  onSelectWeights={handleSelectWeights}
                  onResetFilters={handleResetFilters}
                  hasActiveFilters={hasActiveFilters}
                  totalFilteredCount={totalCount}
                  className="w-full border-r-0 bg-transparent"
                />
              </div>
              <div className="p-3 border-t border-hairline bg-surface-well flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    handleResetFilters();
                    setMobileFilterOpen(false);
                  }}
                  className="flex-1 h-9 rounded-[4px] border border-hairline text-xs font-mono text-text-secondary"
                >
                  CLEAR
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 h-9 rounded-[4px] bg-signal-amber text-surface-canvas font-sans font-semibold text-xs uppercase tracking-wider"
                >
                  APPLY FILTERS
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
