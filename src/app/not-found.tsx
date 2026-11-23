"use client";

import React from "react";
import Link from "next/link";
import { SignalBadge } from "@/components/ui/SignalBadge";
import { ArrowLeft, Terminal, Search, ArrowRight } from "lucide-react";

export default function NotFound() {
  const openPalette = () => {
    window.dispatchEvent(new CustomEvent("oneatlas:open-command-palette"));
  };

  return (
    <div className="w-full min-h-[calc(100vh-3.5rem)] flex flex-col justify-between relative overflow-hidden bg-surface-canvas text-text-primary">
      {/* Masked 24px-Pitch Dot Matrix Header Band */}
      <div className="absolute top-0 left-0 right-0 h-96 pointer-events-none opacity-40 [mask-image:linear-gradient(to_bottom,black_20%,transparent_100%)] bg-dot-matrix" />

      {/* Terminal Frame Layout */}
      <div className="relative z-10 flex-1 grid grid-cols-12 w-full">
        {/* Left Spine Rail (Desktop 240px equivalent via grid col-span-3) */}
        <aside className="col-span-12 lg:col-span-3 xl:col-span-2 flex flex-col justify-between p-6 bg-surface-well/40 border-r border-hairline select-none">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 font-mono text-xs text-text-tertiary">
              <span className="w-1.5 h-1.5 bg-signal-coral inline-block" />
              <span className="tracking-widest uppercase">DISPATCH_FAULT</span>
            </div>

            <div className="flex flex-col gap-1 py-1">
              <span className="font-sans text-[10px] font-medium uppercase tracking-[0.09em] text-text-tertiary">
                Trace Identifier
              </span>
              <span className="font-mono text-xs text-text-secondary select-all">
                ERR_0x7FE9A04B
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-sans text-[10px] font-medium uppercase tracking-[0.09em] text-text-tertiary">
                Active Node Group
              </span>
              <span className="font-mono text-xs text-text-secondary">
                iad-edge-us-east-04
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-sans text-[10px] font-medium uppercase tracking-[0.09em] text-text-tertiary">
                Resolver Status
              </span>
              <span className="font-mono text-xs text-signal-coral">
                UNRESOLVED_URI
              </span>
            </div>

            {/* Micro Activity Bar */}
            <div className="flex flex-col gap-1 pt-4">
              <div className="flex items-center justify-between font-sans text-[10px] uppercase text-text-tertiary">
                <span>Bus Telemetry</span>
                <span className="text-signal-coral font-mono">0.0 req/s</span>
              </div>
              <div className="h-8 w-full bg-surface-well border border-hairline p-1 flex items-end gap-0.5">
                <span className="w-1/12 h-5 bg-surface-raised" />
                <span className="w-1/12 h-6 bg-surface-raised" />
                <span className="w-1/12 h-7 bg-surface-raised" />
                <span className="w-1/12 h-5 bg-surface-raised" />
                <span className="w-1/12 h-6 bg-surface-raised" />
                <span className="w-1/12 h-4 bg-surface-raised" />
                <span className="w-1/12 h-5 bg-surface-raised" />
                <span className="w-1/12 h-6 bg-surface-raised" />
                <span className="w-1/12 h-3 bg-surface-raised" />
                <span className="w-1/12 h-2 bg-signal-coral/60" />
                <span className="w-1/12 h-1 bg-signal-coral" />
                <span className="w-1/12 h-[1px] bg-signal-coral" />
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-text-tertiary font-sans text-[10px] uppercase tracking-wider">
              <span className="w-1 h-1 bg-text-tertiary" />
              <span>ROUTING_TABLE_NOMINAL</span>
            </div>
            <span className="font-mono text-[11px] text-text-tertiary">
              SUBSYSTEM_REV: 03.2
            </span>
          </div>
        </aside>

        {/* Data Workstation (Main Telemetry Viewport) */}
        <section className="col-span-12 lg:col-span-9 xl:col-span-10 flex flex-col justify-between p-6 sm:p-10 lg:p-12 relative">
          <div className="max-w-4xl flex flex-col gap-6">
            {/* Route Ledger Overline */}
            <div className="flex items-center gap-3">
              <SignalBadge tone="coral" dot>
                FAIL_ROUTE_UNMAPPED
              </SignalBadge>
              <span className="font-mono text-xs text-text-tertiary">
                INGRESS_TARGET :: URI_NOT_IN_LEDGER
              </span>
            </div>

            {/* Primary Error Notice */}
            <div className="flex flex-col gap-3">
              <h1 className="font-display text-4xl sm:text-5xl text-text-primary tracking-tight font-normal">
                This route is not in the <span className="italic text-signal-amber">index</span>.
              </h1>

              {/* Status Line */}
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs bg-surface-well border border-hairline px-3 py-1.5 rounded-[4px] max-w-fit">
                <span className="text-signal-coral font-medium">HTTP 404</span>
                <span className="text-text-tertiary">·</span>
                <span className="text-text-tertiary uppercase">INGRESS RESOLVER</span>
                <span className="text-text-tertiary">·</span>
                <span className="text-signal-coral uppercase font-medium">
                  STATUS: UNRESOLVED
                </span>
              </div>

              <p className="font-sans text-sm text-text-secondary max-w-2xl leading-relaxed">
                The model, provider, or benchmark telemetry resource requested does not exist in
                the active catalog index or was migrated to another slug identifier. Check the ledger
                or route back to the frontier catalog.
              </p>
            </div>

            {/* Action Cluster */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/models"
                className="h-9 px-4 rounded-[4px] flex items-center gap-2 bg-transparent border border-hairline-strong text-text-primary hover:bg-surface-raised hover:border-hairline transition-all active:scale-[0.99] font-sans text-xs tracking-wide uppercase font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-text-secondary" />
                <span>Models Catalog</span>
              </Link>

              <Link
                href="/"
                className="h-9 px-4 rounded-[4px] flex items-center gap-2 bg-transparent border border-hairline-strong text-text-primary hover:bg-surface-raised hover:border-hairline transition-all active:scale-[0.99] font-sans text-xs tracking-wide uppercase font-medium"
              >
                <Terminal className="w-3.5 h-3.5 text-text-secondary" />
                <span>Home Ledger</span>
              </Link>

              <button
                type="button"
                onClick={openPalette}
                className="h-9 px-3 rounded-[4px] flex items-center gap-2 bg-surface-well border border-hairline text-text-tertiary hover:text-text-secondary hover:border-hairline-strong transition-colors font-mono text-xs cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Slug Lookup</span>
                <kbd className="px-1 py-0.2 bg-surface-raised border border-hairline rounded-[2px] text-text-primary">
                  ⌘K
                </kbd>
              </button>
            </div>

            {/* Terminal Diagnostics Block */}
            <div className="mt-4 rounded-[4px] bg-surface-well border border-hairline p-4 max-w-2xl flex flex-col gap-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-hairline">
                <span className="text-text-tertiary uppercase font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-mint" />
                  SYSTEM DIAGNOSTICS: ROUTING ENGINE v2026.1
                </span>
                <span className="text-text-tertiary">INDEX_HEALTH: OK</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 pt-1 text-text-secondary text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-text-tertiary">CANONICAL RESOLVER:</span>
                  <span className="text-text-primary">32 FRONTIER MODELS</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-tertiary">TABLE CHECKSUM:</span>
                  <span className="text-text-primary">0x92CFE18B</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-tertiary">RESOLVER LATENCY:</span>
                  <span className="text-text-primary">1.14 ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-tertiary">RECOVERY FALLBACK:</span>
                  <span className="text-text-primary">STABLE_SLUG_MAP</span>
                </div>
              </div>
            </div>

            {/* Suggested Alternatives Quick Switcher */}
            <div className="mt-2 flex flex-col max-w-2xl border border-hairline rounded-[4px] bg-surface-well/50 overflow-hidden">
              <div className="px-4 py-2 border-b border-hairline flex items-center justify-between">
                <span className="font-sans text-[10px] font-medium uppercase text-text-tertiary tracking-wider">
                  Closest Valid Routing Slugs
                </span>
                <span className="font-mono text-[10px] text-text-tertiary">
                  CONFIDENCE
                </span>
              </div>
              <Link
                href="/models/claude-4-5-sonnet"
                className="h-10 px-4 flex items-center justify-between border-b border-hairline hover:bg-surface-raised transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-text-primary group-hover:text-signal-amber transition-colors">
                    /models/claude-4-5-sonnet
                  </span>
                  <span className="font-sans text-[11px] text-text-secondary">
                    (Claude 4.5 Sonnet)
                  </span>
                </div>
                <span className="font-mono text-xs text-signal-mint flex items-center gap-1">
                  <span>99.2% MATCH</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
              <Link
                href="/models/deepseek-r2"
                className="h-10 px-4 flex items-center justify-between border-b border-hairline hover:bg-surface-raised transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-text-primary group-hover:text-signal-amber transition-colors">
                    /models/deepseek-r2
                  </span>
                  <span className="font-sans text-[11px] text-text-secondary">
                    (DeepSeek-R2)
                  </span>
                </div>
                <span className="font-mono text-xs text-signal-mint flex items-center gap-1">
                  <span>98.6% MATCH</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
              <Link
                href="/models/gpt-5"
                className="h-10 px-4 flex items-center justify-between hover:bg-surface-raised transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-text-primary group-hover:text-signal-amber transition-colors">
                    /models/gpt-5
                  </span>
                  <span className="font-sans text-[11px] text-text-secondary">
                    (GPT-5)
                  </span>
                </div>
                <span className="font-mono text-xs text-signal-mint flex items-center gap-1">
                  <span>97.9% MATCH</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
