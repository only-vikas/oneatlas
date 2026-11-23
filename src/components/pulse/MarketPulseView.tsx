"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import gsap from "gsap";
import { Search, ArrowRight, Activity, Clock, Award, Terminal } from "lucide-react";
import { SignalBadge } from "@/components/ui/SignalBadge";
import { formatPricePer1M, cn } from "@/lib/formatters";
import { MarketPulseResponse } from "@/lib/types/api";

export function MarketPulseView() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: pulse, isLoading, isError, refetch } = useQuery<MarketPulseResponse>({
    queryKey: ["market-pulse"],
    queryFn: async () => {
      const res = await fetch("/api/pulse");
      if (!res.ok) throw new Error("Failed to fetch market pulse telemetry");
      return res.json();
    },
    staleTime: 30_000,
  });

  const openPalette = () => {
    window.dispatchEvent(new CustomEvent("oneatlas:open-command-palette"));
  };

  // GSAP 40ms stagger animation on rows when pulse data loads
  useEffect(() => {
    if (!pulse || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pulse-row",
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.04,
          ease: "power2.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [pulse]);

  return (
    <div ref={containerRef} className="w-full flex flex-col relative select-none">
      {/* 1. Hero Zone (Transparent over <AmbientCanvas> model-field mode) */}
      <section className="relative px-4 sm:px-8 lg:px-12 pt-12 pb-14 overflow-hidden">
        {/* Masked 24px-Pitch Dot Matrix Header Band */}
        <div className="absolute top-0 inset-x-0 h-80 pointer-events-none opacity-40 [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)] bg-dot-matrix -z-10" />

        <div className="max-w-5xl flex flex-col items-start gap-4">
          {/* Overline Micro-label */}
          <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-[4px] bg-surface-raised border border-hairline font-mono text-[11px] text-text-tertiary">
            <span className="w-1.5 h-1.5 rounded-full bg-signal-mint animate-pulse" />
            <span>TERMINAL LEDGER v3.2</span>
            <span className="text-hairline-strong">/</span>
            <span className="text-text-secondary">INDEXING 2026 FRONTIER AI</span>
          </div>

          {/* Headline in Instrument Serif */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-text-primary tracking-tight font-normal leading-[1.08] max-w-4xl">
            Route to the <span className="italic text-signal-amber font-normal">fastest</span> intelligence.
          </h1>

          {/* Subline */}
          <p className="font-sans text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl">
            Unified model discovery, cross-provider pricing, and benchmark telemetry across
            frontier and open-weight models.
          </p>

          {/* 640px Hero Search Bar */}
          <div className="w-full max-w-[640px] pt-4">
            <div
              onClick={openPalette}
              className="h-12 w-full px-4 rounded-[4px] bg-surface-well/90 backdrop-blur-md border border-hairline-strong hover:border-signal-amber/40 hover:shadow-[0_0_20px_rgba(245,158,11,0.08)] flex items-center justify-between gap-3 cursor-pointer transition-all duration-200 group"
            >
              <div className="flex items-center gap-3 text-text-tertiary group-hover:text-text-secondary transition-colors">
                <Search className="w-4 h-4 text-signal-amber" />
                <span className="font-sans text-sm text-text-tertiary group-hover:text-text-secondary">
                  Search models, labs, providers, benchmarks, or press ⌘K…
                </span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <kbd className="font-mono text-[10px] text-text-tertiary uppercase tracking-wider px-1.5 py-0.5 border border-hairline rounded-[3px] bg-surface-raised">
                  ⌘K
                </kbd>
                <kbd className="font-mono text-[10px] text-text-tertiary uppercase px-1.5 py-0.5 border border-hairline rounded-[3px] bg-surface-raised">
                  ↵
                </kbd>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Three-Column Asymmetric Hairline Ledger Strip (Opaque bg-surface-canvas) */}
      <section className="w-full border-y border-hairline bg-surface-canvas">
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-hairline">
          {/* COLUMN 1: TRENDING USAGE (7D) */}
          <div className="flex flex-col bg-surface-canvas">
            <div className="h-11 px-6 border-b border-hairline bg-surface-well/50 flex items-center justify-between font-sans text-[11px] font-medium uppercase tracking-[0.09em] text-text-tertiary">
              <span className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-signal-mint" />
                <span>TRENDING USAGE (7D)</span>
              </span>
              <span className="font-mono text-[10px] text-text-tertiary">DELTA</span>
            </div>

            <div className="divide-y divide-hairline">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-12 px-6 flex items-center justify-between">
                    <div className="w-36 h-3 rounded-[2px] shimmer-sweep" />
                    <div className="w-12 h-3 rounded-[2px] shimmer-sweep" />
                  </div>
                ))
              ) : isError ? (
                <div className="p-6 text-center text-xs text-signal-coral">
                  Failed to load trending models.{" "}
                  <button onClick={() => refetch()} className="underline ml-1">
                    Retry
                  </button>
                </div>
              ) : (
                pulse?.trending.slice(0, 5).map((model) => (
                  <Link
                    key={model.id}
                    href={`/models/${model.slug}`}
                    className="pulse-row h-12 px-6 flex items-center justify-between hover:bg-surface-raised transition-colors group cursor-pointer"
                  >
                    <div className="flex flex-col min-w-0 pr-3">
                      <span className="font-structural font-medium text-xs sm:text-[13px] text-text-primary group-hover:text-signal-amber transition-colors truncate">
                        {model.name}
                      </span>
                      <span className="font-mono text-[11px] text-text-tertiary tabular-nums">
                        {formatPricePer1M(model.pricing.lowestInputPrice)} in ·{" "}
                        {formatPricePer1M(model.pricing.lowestOutputPrice)} out
                      </span>
                    </div>

                    <div className="shrink-0 text-right">
                      <span
                        className={cn(
                          "font-mono text-xs font-medium tabular-nums",
                          model.usageDelta7d < 0
                            ? "text-signal-coral"
                            : model.usageDelta7d > 0
                            ? "text-signal-mint"
                            : "text-text-tertiary"
                        )}
                      >
                        {model.usageDelta7d > 0 ? `+${model.usageDelta7d}%` : `${model.usageDelta7d}%`}
                      </span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* COLUMN 2: RECENTLY ADDED */}
          <div className="flex flex-col bg-surface-canvas">
            <div className="h-11 px-6 border-b border-hairline bg-surface-well/50 flex items-center justify-between font-sans text-[11px] font-medium uppercase tracking-[0.09em] text-text-tertiary">
              <span className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-signal-sky" />
                <span>RECENTLY ADDED</span>
              </span>
              <span className="font-mono text-[10px] text-text-tertiary">RELEASED</span>
            </div>

            <div className="divide-y divide-hairline">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-12 px-6 flex items-center justify-between">
                    <div className="w-36 h-3 rounded-[2px] shimmer-sweep" />
                    <div className="w-16 h-3 rounded-[2px] shimmer-sweep" />
                  </div>
                ))
              ) : isError ? (
                <div className="p-6 text-center text-xs text-signal-coral">
                  Failed to load recent models.
                </div>
              ) : (
                pulse?.recent.slice(0, 5).map((model) => (
                  <Link
                    key={model.id}
                    href={`/models/${model.slug}`}
                    className="pulse-row h-12 px-6 flex items-center justify-between hover:bg-surface-raised transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-2 min-w-0 pr-3">
                      <SignalBadge tone="sky" className="shrink-0 text-[9px] px-1 h-4">
                        NEW
                      </SignalBadge>
                      <span className="font-structural font-medium text-xs sm:text-[13px] text-text-primary group-hover:text-signal-amber transition-colors truncate">
                        {model.name}
                      </span>
                    </div>

                    <div className="shrink-0 text-right">
                      <span className="font-mono text-[11px] text-text-secondary tabular-nums">
                        {model.releaseDate}
                      </span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* COLUMN 3: PARETO VALUE LEADERS */}
          <div className="flex flex-col bg-surface-canvas">
            <div className="h-11 px-6 border-b border-hairline bg-surface-well/50 flex items-center justify-between font-sans text-[11px] font-medium uppercase tracking-[0.09em] text-text-tertiary">
              <span className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-signal-amber" />
                <span>PARETO VALUE LEADERS</span>
              </span>
              <span className="font-mono text-[10px] text-text-tertiary">SCORE · BLENDED</span>
            </div>

            <div className="divide-y divide-hairline">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-12 px-6 flex items-center justify-between">
                    <div className="w-36 h-3 rounded-[2px] shimmer-sweep" />
                    <div className="w-20 h-3 rounded-[2px] shimmer-sweep" />
                  </div>
                ))
              ) : isError ? (
                <div className="p-6 text-center text-xs text-signal-coral">
                  Failed to load Pareto frontier.
                </div>
              ) : (
                pulse?.paretoLeaders.slice(0, 5).map((pt) => (
                  <Link
                    key={pt.modelId}
                    href={`/models/${pt.slug}`}
                    className="pulse-row h-12 px-6 flex items-center justify-between hover:bg-surface-raised transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-2 min-w-0 pr-3">
                      <SignalBadge tone="mint" className="shrink-0 text-[9px] px-1 h-4">
                        BEST VALUE
                      </SignalBadge>
                      <span className="font-structural font-medium text-xs sm:text-[13px] text-text-primary group-hover:text-signal-amber transition-colors truncate">
                        {pt.name}
                      </span>
                    </div>

                    <div className="shrink-0 text-right flex items-center gap-2">
                      <span className="font-mono text-[11px] text-text-tertiary tabular-nums hidden sm:inline">
                        {pt.intelligence.toFixed(1)} pts
                      </span>
                      <span className="font-mono text-xs text-signal-mint font-medium tabular-nums">
                        ${pt.blendedCost.toFixed(2)}
                      </span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Bottom Telemetry Strip */}
      <footer className="w-full h-14 border-t border-hairline bg-surface-well px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-text-tertiary font-mono text-[11px]">
        <div className="flex items-center gap-3">
          <Terminal className="w-3.5 h-3.5 text-text-secondary" />
          <span>
            Indexed{" "}
            <span className="text-text-primary tabular-nums">
              {pulse?.counts.models ?? 32}
            </span>{" "}
            models ·{" "}
            <span className="text-text-primary tabular-nums">
              {pulse?.counts.providers ?? 9}
            </span>{" "}
            providers ·{" "}
            <span className="text-text-primary tabular-nums">
              {pulse?.counts.labs ?? 8}
            </span>{" "}
            labs · live PostgreSQL ledger
          </span>
        </div>

        <div className="flex items-center gap-5">
          <Link
            href="/models"
            className="text-text-secondary hover:text-signal-amber transition-colors flex items-center gap-1 group font-sans text-xs uppercase tracking-wider font-medium"
          >
            <span>Explore Catalog</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/rankings"
            className="text-text-secondary hover:text-signal-amber transition-colors flex items-center gap-1 group font-sans text-xs uppercase tracking-wider font-medium"
          >
            <span>Pareto Rankings</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/compare"
            className="text-text-secondary hover:text-signal-amber transition-colors flex items-center gap-1 group font-sans text-xs uppercase tracking-wider font-medium"
          >
            <span>Compare Matrix</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
