"use client";

import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useCompare } from "@/lib/store/compare-store";
import { formatContext } from "@/lib/formatters";
import { SignalBadge } from "@/components/ui/SignalBadge";
import { WorkloadCostSimulator } from "./WorkloadCostSimulator";
import { ProviderRoutingTable } from "./ProviderRoutingTable";
import { ApiSnippetDrawer } from "./ApiSnippetDrawer";
import { BenchmarkSection } from "./BenchmarkSection";
import { CatalogSkeleton, ErrorBanner, EmptyState } from "@/components/ui/States";
import { ModelDetail, ProviderEndpointItem, BenchmarkItem } from "@/lib/types/api";
import { Check, Plus, ExternalLink, ArrowLeft } from "lucide-react";

interface ModelDetailClientProps {
  slug: string;
}

export function ModelDetailClient({ slug }: ModelDetailClientProps) {
  const { isSelected, toggleModel } = useCompare();

  // 1. Fetch Model Details
  const {
    data: model,
    isLoading: isModelLoading,
    isError: isModelError,
    refetch: refetchModel,
  } = useQuery<ModelDetail>({
    queryKey: ["model-detail", slug],
    queryFn: async () => {
      const res = await fetch(`/api/models/${slug}`);
      if (res.status === 404) throw new Error("NOT_FOUND");
      if (!res.ok) throw new Error("Failed to load model details");
      return res.json();
    },
    staleTime: 60_000,
  });

  // 2. Fetch Hosting Providers
  const { data: providersData } = useQuery<{ endpoints: ProviderEndpointItem[] }>({
    queryKey: ["model-providers", slug],
    queryFn: async () => {
      const res = await fetch(`/api/models/${slug}/providers`);
      if (!res.ok) return { endpoints: [] };
      return res.json();
    },
    staleTime: 60_000,
  });

  // 3. Fetch Benchmarks
  const { data: benchmarksData } = useQuery<{
    benchmarks: BenchmarkItem[];
    categoryAverages: Record<string, number>;
  }>({
    queryKey: ["model-benchmarks", slug],
    queryFn: async () => {
      const res = await fetch(`/api/models/${slug}/benchmarks`);
      if (!res.ok) return { benchmarks: [], categoryAverages: {} };
      return res.json();
    },
    staleTime: 60_000,
  });

  if (isModelLoading) {
    return (
      <div className="w-full min-h-[calc(100vh-3.5rem)] bg-surface-canvas p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="h-8 w-48 rounded-[2px] shimmer-sweep" />
          <div className="h-14 w-96 rounded-[2px] shimmer-sweep" />
          <CatalogSkeleton rows={6} />
        </div>
      </div>
    );
  }

  if (isModelError || !model) {
    return (
      <div className="w-full min-h-[calc(100vh-3.5rem)] bg-surface-canvas p-6 flex flex-col items-center justify-center">
        <EmptyState
          title="Model route not in "
          italicWord="ledger"
          description={`The model identifier '${slug}' does not match any indexed foundation model in the OneAtlas ledger.`}
          onReset={() => window.location.assign("/models")}
        />
      </div>
    );
  }

  const inCompare = isSelected(model.slug);

  const handleToggleCompare = () => {
    toggleModel({
      slug: model.slug,
      name: model.name,
      labName: model.lab.name,
      labSlug: model.lab.slug,
      inputPricePer1M: model.pricing.lowestInputPrice,
      outputPricePer1M: model.pricing.lowestOutputPrice,
      contextWindow: model.contextWindow,
    });
  };

  // Split title so the final token is styled italic in Instrument Serif per DESIGN.v3.md §1
  const words = model.name.split(" ");
  const leadingWords = words.slice(0, -1).join(" ");
  const lastWord = words[words.length - 1];

  const endpoints = providersData?.endpoints ?? model.endpoints ?? [];
  const benchmarks = benchmarksData?.benchmarks ?? model.benchmarks ?? [];
  const categoryAverages = benchmarksData?.categoryAverages ?? {};

  return (
    <div className="w-full flex flex-col bg-surface-canvas select-none">
      {/* 1. HERO ZONE (Transparent over <AmbientCanvas> routing-graph mode) */}
      <section className="relative px-4 sm:px-8 lg:px-12 pt-8 pb-10 overflow-hidden">
        {/* Masked 24px-Pitch Dot Matrix */}
        <div className="absolute top-0 inset-x-0 h-full pointer-events-none opacity-40 [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)] bg-dot-matrix -z-10" />

        <div className="max-w-5xl flex flex-col items-start gap-4">
          {/* Breadcrumb Line */}
          <div className="flex items-center gap-2 text-xs font-mono text-text-tertiary">
            <Link
              href="/models"
              className="hover:text-text-primary flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>MODELS</span>
            </Link>
            <span>/</span>
            <span className="text-signal-amber font-medium uppercase">
              {model.slug}
            </span>
          </div>

          {/* Model Title in Instrument Serif */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-text-primary tracking-tight font-normal leading-tight">
            {leadingWords} <span className="italic text-signal-amber">{lastWord}</span>
          </h1>

          {/* Subline & Metas */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              href={`/directory/${model.lab.slug}`}
              className="font-structural font-medium text-sm text-text-primary hover:text-signal-amber transition-colors flex items-center gap-1"
            >
              <span>{model.lab.name}</span>
              <ExternalLink className="w-3 h-3 text-text-tertiary" />
            </Link>

            <span className="text-hairline-strong">·</span>
            <span className="font-mono text-xs text-text-tertiary">
              RELEASED {model.releaseDate}
            </span>

            {model.isOpenWeights && (
              <SignalBadge tone="sky" className="text-[9px] h-4 px-1.5">
                OPEN WEIGHTS
              </SignalBadge>
            )}

            {/* Compare Toggle Button */}
            <button
              type="button"
              onClick={handleToggleCompare}
              className={`h-6 px-2.5 rounded-[3px] border font-mono text-[10px] uppercase flex items-center gap-1 transition-all cursor-pointer ${
                inCompare
                  ? "bg-signal-amber border-signal-amber text-surface-canvas font-semibold"
                  : "bg-surface-well border-hairline-strong text-text-secondary hover:text-text-primary hover:border-signal-amber/40"
              }`}
            >
              {inCompare ? <Check className="w-3 h-3 stroke-[3]" /> : <Plus className="w-3 h-3" />}
              <span>{inCompare ? "IN COMPARE MATRIX" : "+ ADD TO COMPARE"}</span>
            </button>
          </div>

          {/* Description */}
          <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed max-w-3xl pt-1">
            {model.description}
          </p>

          {/* Capability Badges */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2">
            {model.capabilities.map((cap) => (
              <span
                key={cap}
                className="px-2 py-0.5 rounded-[3px] bg-surface-raised border border-hairline font-sans text-[10px] uppercase tracking-wider text-text-tertiary"
              >
                {cap.replace(/_/g, " ")}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 2. 4-CELL TELEMETRY STRIP (56px) */}
      <section className="w-full h-14 bg-surface-well border-y border-hairline grid grid-cols-2 md:grid-cols-4 divide-x divide-hairline text-xs font-mono">
        <div className="h-full px-6 flex items-center justify-between">
          <span className="font-sans text-[10px] font-medium uppercase tracking-[0.09em] text-text-tertiary">
            CONTEXT WINDOW
          </span>
          <span className="text-text-primary font-medium tabular-nums">
            {formatContext(model.contextWindow)}
          </span>
        </div>

        <div className="h-full px-6 flex items-center justify-between">
          <span className="font-sans text-[10px] font-medium uppercase tracking-[0.09em] text-text-tertiary">
            MAX OUTPUT
          </span>
          <span className="text-text-primary font-medium tabular-nums">
            {formatContext(model.maxOutputTokens)}
          </span>
        </div>

        <div className="h-full px-6 flex items-center justify-between">
          <span className="font-sans text-[10px] font-medium uppercase tracking-[0.09em] text-text-tertiary">
            MODEL TYPE
          </span>
          <span className="text-text-secondary uppercase">
            {model.modelType}
          </span>
        </div>

        <div className="h-full px-6 flex items-center justify-between">
          <span className="font-sans text-[10px] font-medium uppercase tracking-[0.09em] text-text-tertiary">
            LICENSE
          </span>
          <span className="text-text-secondary uppercase truncate max-w-[120px]">
            {model.license}
          </span>
        </div>
      </section>

      {/* 3. WORKLOAD COST ENGINE SIMULATOR */}
      <WorkloadCostSimulator
        modelName={model.name}
        endpoints={endpoints}
        defaultInputPrice={model.pricing.lowestInputPrice}
        defaultOutputPrice={model.pricing.lowestOutputPrice}
      />

      {/* 4. PROVIDER ROUTING MATRIX */}
      <ProviderRoutingTable endpoints={endpoints} />

      {/* 5. COLLAPSIBLE API SNIPPET DRAWER */}
      <ApiSnippetDrawer
        modelSlug={model.slug}
        defaultProviderSlug={endpoints[0]?.provider.slug}
      />

      {/* 6. STANDARDIZED EVALUATION BENCHMARKS */}
      <BenchmarkSection
        benchmarks={benchmarks}
        categoryAverages={categoryAverages}
      />
    </div>
  );
}
