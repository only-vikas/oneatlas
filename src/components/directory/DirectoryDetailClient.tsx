"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { SignalBadge } from "@/components/ui/SignalBadge";
import { CatalogSkeleton, ErrorBanner, EmptyState } from "@/components/ui/States";
import { formatPrice, formatCompactNumber, formatDate } from "@/lib/formatters";

interface DirectoryDetailClientProps {
  slug: string;
}

export function DirectoryDetailClient({ slug }: DirectoryDetailClientProps) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["directory-detail", slug],
    queryFn: async () => {
      const res = await fetch(`/api/directory/${encodeURIComponent(slug)}`);
      if (!res.ok) {
        throw new Error(`Failed to load directory entity '${slug}': HTTP ${res.status}`);
      }
      return res.json();
    },
    staleTime: 60_000,
  });

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-surface-canvas text-text-primary max-w-[1440px] mx-auto px-4 md:px-6 py-12">
        <CatalogSkeleton rows={10} />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full min-h-screen bg-surface-canvas text-text-primary max-w-[1440px] mx-auto px-4 md:px-6 py-12">
        <ErrorBanner
          message={error instanceof Error ? error.message : "Entity not found."}
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  const { entityType, profile, telemetry, models, timelineOrRegions } = data;
  const isLab = entityType === "lab";

  return (
    <div className="w-full min-h-screen bg-surface-canvas text-text-primary flex flex-col">
      {/* ------------------------------------------------------------------ */}
      {/* MODULE A: MASTHEAD (160px Recessed Terminal Panel) */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative w-full bg-surface-well border-b border-hairline overflow-hidden p-6 md:p-8">
        {/* Masked 24px dot-matrix ambient canvas pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 [mask-image:linear-gradient(to_bottom,black_30%,transparent_100%)] bg-dot-matrix"
        />

        <div className="max-w-[1440px] mx-auto relative z-10 flex flex-col gap-6">
          {/* Top Row: Identity & Badges */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex flex-col gap-2 max-w-3xl">
              <div className="flex items-center gap-3 flex-wrap">
                <Link
                  href="/directory"
                  className="text-xs font-mono text-text-tertiary hover:text-signal-amber transition-colors flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                  <span>DIRECTORY</span>
                </Link>
                <span className="text-text-tertiary font-mono text-xs">/</span>
                <span className="font-mono text-xs text-signal-amber uppercase font-semibold">
                  {isLab ? "RESEARCH LAB" : "INFERENCE PROVIDER"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <h1 className="font-headline font-bold text-3xl md:text-5xl uppercase tracking-tight text-text-primary">
                  {profile.name}
                </h1>
                <SignalBadge variant={isLab ? "amber" : "sky"} size="sm">
                  {isLab ? "LAB" : profile.type === "FIRST_PARTY" ? "1ST PARTY" : "CLOUD"}
                </SignalBadge>
              </div>

              <p className="font-sans text-xs md:text-sm text-text-secondary mt-1 max-w-3xl leading-relaxed">
                {profile.description ||
                  (isLab
                    ? "Frontier artificial intelligence research laboratory creating state-of-the-art neural foundation models."
                    : "High-performance inference cloud infrastructure provider specializing in low-latency token streaming.")}
              </p>
            </div>

            {/* Right Meta Block */}
            <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0 font-mono text-xs text-text-tertiary">
              {isLab && profile.headquarters && (
                <span>HQ: {profile.headquarters} · EST. {profile.foundedYear}</span>
              )}
              {!isLab && profile.regions && (
                <span>REGIONS: {profile.regions.join(", ")}</span>
              )}
              {profile.website && (
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-signal-sky hover:underline flex items-center gap-1 uppercase tracking-wider text-[11px]"
                >
                  <span>OFFICIAL PORTAL</span>
                  <span className="material-symbols-outlined text-[13px]">arrow_outward</span>
                </a>
              )}
            </div>
          </div>

          {/* Stat Strip / Hairline Ledger Dividers */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-hairline pt-4 bg-surface-canvas/40 -mx-6 md:-mx-8 px-6 md:px-8 -mb-6 md:-mb-8 pb-4">
            {isLab ? (
              <>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono uppercase text-text-tertiary">
                    REGISTERED MODELS
                  </span>
                  <span className="text-sm md:text-base font-mono font-semibold tabular-nums text-text-primary">
                    {telemetry?.modelCount ?? models?.length ?? 0} MODELS
                  </span>
                </div>
                <div className="flex flex-col border-l border-hairline pl-4">
                  <span className="text-[10px] font-mono uppercase text-text-tertiary">
                    AVG INPUT RATE
                  </span>
                  <span className="text-sm md:text-base font-mono font-semibold tabular-nums text-text-primary">
                    {formatPrice(telemetry?.avgInputPrice ?? 0)} / 1M
                  </span>
                </div>
                <div className="flex flex-col border-l border-hairline pl-4">
                  <span className="text-[10px] font-mono uppercase text-text-tertiary">
                    MAX CONTEXT WINDOW
                  </span>
                  <span className="text-sm md:text-base font-mono font-semibold tabular-nums text-signal-amber">
                    {formatCompactNumber(telemetry?.maxContext ?? 0)}
                  </span>
                </div>
                <div className="flex flex-col border-l border-hairline pl-4">
                  <span className="text-[10px] font-mono uppercase text-text-tertiary">
                    VERIFICATION STATUS
                  </span>
                  <span className="text-sm md:text-base font-mono font-semibold text-signal-mint flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-signal-mint"></span>
                    VERIFIED LAB
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono uppercase text-text-tertiary">
                    HOSTED ENDPOINTS
                  </span>
                  <span className="text-sm md:text-base font-mono font-semibold tabular-nums text-text-primary">
                    {telemetry?.hostedModelCount ?? models?.length ?? 0} ENDPOINTS
                  </span>
                </div>
                <div className="flex flex-col border-l border-hairline pl-4">
                  <span className="text-[10px] font-mono uppercase text-text-tertiary">
                    MEDIAN TTFT
                  </span>
                  <span className="text-sm md:text-base font-mono font-semibold tabular-nums text-signal-sky">
                    {telemetry?.medianLatencyMs ?? 0} MS
                  </span>
                </div>
                <div className="flex flex-col border-l border-hairline pl-4">
                  <span className="text-[10px] font-mono uppercase text-text-tertiary">
                    30D UPTIME SLA
                  </span>
                  <span className="text-sm md:text-base font-mono font-semibold tabular-nums text-signal-mint flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-signal-mint"></span>
                    {profile.uptime30d ?? 99.9}%
                  </span>
                </div>
                <div className="flex flex-col border-l border-hairline pl-4">
                  <span className="text-[10px] font-mono uppercase text-text-tertiary">
                    SLA TIER
                  </span>
                  <span className="text-sm md:text-base font-mono font-semibold text-text-primary">
                    {profile.slaTier ?? "Enterprise"}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* MODULE B: MAIN CONTENT WORKSPACE */}
      {/* ------------------------------------------------------------------ */}
      <div className="max-w-[1440px] mx-auto w-full px-4 md:px-6 py-8 flex-1">
        {isLab ? (
          /* LAB LAYOUT: 65% Model Ledger + 35% Chronological Release Timeline */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 65%: Model Ledger */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-text-primary font-semibold">
                  DEVELOPED MODEL ROSTER ({models?.length ?? 0})
                </span>
                <span className="font-mono text-[10px] text-text-tertiary">
                  SORTED BY COMPOSITE INTELLIGENCE
                </span>
              </div>

              <div className="w-full border border-hairline rounded bg-surface-well overflow-hidden">
                <div className="w-full bg-surface-raised border-b border-hairline px-4 py-2.5 grid grid-cols-12 text-[10px] font-mono uppercase tracking-wider text-text-tertiary select-none">
                  <div className="col-span-6 md:col-span-5">MODEL</div>
                  <div className="hidden md:block md:col-span-2">CONTEXT</div>
                  <div className="col-span-3 md:col-span-3">LOWEST $/1M</div>
                  <div className="col-span-3 md:col-span-2 text-right">SCORE</div>
                </div>

                <div className="divide-y divide-hairline">
                  {models &&
                    models.map((model: any) => (
                      <div
                        key={model.slug}
                        className="w-full min-h-[44px] px-4 py-2.5 grid grid-cols-12 items-center hover:bg-surface-raised/40 transition-colors"
                      >
                        {/* Col 1: Model name */}
                        <div className="col-span-6 md:col-span-5 flex items-center gap-2 min-w-0 pr-2">
                          <Link
                            href={`/models/${model.slug}`}
                            className="font-headline font-semibold text-sm text-text-primary hover:text-signal-amber transition-colors truncate"
                          >
                            {model.name}
                          </Link>
                          {model.isOpenWeights && (
                            <span className="px-1 py-0.2 rounded bg-signal-mint/10 text-signal-mint text-[9px] font-mono border border-signal-mint/20 shrink-0">
                              OPEN
                            </span>
                          )}
                        </div>

                        {/* Col 2: Context Window */}
                        <div className="hidden md:block md:col-span-2 font-mono text-xs text-text-secondary tabular-nums">
                          {formatCompactNumber(model.contextWindow)}
                        </div>

                        {/* Col 3: Lowest Price */}
                        <div className="col-span-3 md:col-span-3 font-mono text-xs tabular-nums text-text-primary">
                          {formatPrice(model.pricing?.lowestInputPrice ?? 0)}
                        </div>

                        {/* Col 4: Composite Score */}
                        <div className="col-span-3 md:col-span-2 font-mono tabular-nums text-right font-bold text-sm text-signal-amber">
                          {model.compositeScore?.toFixed(1) ?? "—"}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Right 35%: Vertical Release Timeline */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <span className="font-mono text-xs uppercase tracking-wider text-text-primary font-semibold">
                RELEASE TIMELINE & ROADMAP
              </span>

              <div className="w-full bg-surface-well border border-hairline rounded p-4 relative">
                {/* Timeline vertical spine */}
                <div className="absolute left-[27px] top-6 bottom-6 w-[1px] bg-hairline-strong" />

                <div className="flex flex-col gap-5 relative z-10">
                  {timelineOrRegions?.releases &&
                    [...timelineOrRegions.releases]
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((rel, idx) => (
                        <div key={rel.slug} className="flex items-start gap-3">
                          <div
                            className={`w-3.5 h-3.5 rounded-full border-2 border-surface-well shrink-0 mt-0.5 ${
                              idx === 0 ? "bg-signal-amber ring-2 ring-signal-amber/30" : "bg-text-tertiary"
                            }`}
                          />
                          <div className="flex flex-col min-w-0">
                            <span className="font-mono text-[10px] text-text-tertiary">
                              {formatDate(rel.date)}
                            </span>
                            <Link
                              href={`/models/${rel.slug}`}
                              className="font-headline font-semibold text-xs text-text-primary hover:text-signal-amber transition-colors truncate"
                            >
                              {rel.name}
                            </Link>
                          </div>
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* PROVIDER LAYOUT: Hosted Endpoints Table + Regional Edge Info */
          <div className="flex flex-col gap-8">
            {/* Hosted Models Table */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-text-primary font-semibold">
                  HOSTED INFERENCE ENDPOINTS ({models?.length ?? 0})
                </span>
                <span className="font-mono text-[10px] text-text-tertiary">
                  REAL-TIME MEASURED TELEMETRY
                </span>
              </div>

              <div className="w-full border border-hairline rounded bg-surface-well overflow-hidden">
                <div className="w-full bg-surface-raised border-b border-hairline px-4 py-2.5 grid grid-cols-12 text-[10px] font-mono uppercase tracking-wider text-text-tertiary select-none">
                  <div className="col-span-5 md:col-span-4">MODEL / FAMILY</div>
                  <div className="col-span-3 md:col-span-2">INPUT / 1M</div>
                  <div className="hidden md:block md:col-span-2">OUTPUT / 1M</div>
                  <div className="col-span-2 md:col-span-2">LATENCY</div>
                  <div className="col-span-2 md:col-span-2 text-right">UPTIME</div>
                </div>

                <div className="divide-y divide-hairline">
                  {models &&
                    models.map((ep: any) => (
                      <div
                        key={ep.slug}
                        className="w-full min-h-[44px] px-4 py-2.5 grid grid-cols-12 items-center hover:bg-surface-raised/40 transition-colors"
                      >
                        <div className="col-span-5 md:col-span-4 flex items-center gap-2 min-w-0 pr-2">
                          <Link
                            href={`/models/${ep.slug}`}
                            className="font-headline font-semibold text-sm text-text-primary hover:text-signal-sky transition-colors truncate"
                          >
                            {ep.name}
                          </Link>
                        </div>

                        <div className="col-span-3 md:col-span-2 font-mono text-xs text-text-primary tabular-nums">
                          {formatPrice(ep.inputPrice ?? 0)}
                        </div>

                        <div className="hidden md:block md:col-span-2 font-mono text-xs text-text-secondary tabular-nums">
                          {formatPrice(ep.outputPrice ?? 0)}
                        </div>

                        <div className="col-span-2 md:col-span-2 font-mono text-xs text-signal-sky tabular-nums">
                          {ep.latencyMs ?? 0} ms
                        </div>

                        <div className="col-span-2 md:col-span-2 font-mono text-xs text-signal-mint tabular-nums text-right">
                          {ep.uptimePct ?? 99.9}%
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Regional Edge Infrastructure */}
            {profile.regions && profile.regions.length > 0 && (
              <div className="flex flex-col gap-3">
                <span className="font-mono text-xs uppercase tracking-wider text-text-primary font-semibold">
                  REGIONAL EDGE DISTRIBUTION ({profile.regions.length} REGIONS)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {profile.regions.map((reg: string) => (
                    <div
                      key={reg}
                      className="p-3 bg-surface-well border border-hairline rounded flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-signal-mint"></span>
                        <span className="font-mono text-xs text-text-primary uppercase">{reg}</span>
                      </div>
                      <span className="font-mono text-[10px] text-text-tertiary">ACTIVE</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
