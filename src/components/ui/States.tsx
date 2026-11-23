"use client";

import React from "react";
import { cn } from "@/lib/formatters";
import { SignalBadge } from "./SignalBadge";
import { RefreshCw, AlertTriangle, FilterX } from "lucide-react";

/**
 * CatalogSkeleton (§4.1):
 * 8 hairline-divided 44px rows with column-aligned thin placeholders and a CSS shimmer sweep
 */
export function CatalogSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div className="w-full flex flex-col divide-y divide-hairline bg-surface-canvas border-y border-hairline">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-11 px-6 flex items-center justify-between gap-4 font-mono text-xs select-none"
        >
          {/* Index + Model Name */}
          <div className="flex items-center gap-3 w-72">
            <div className="w-6 h-3 rounded-[2px] shimmer-sweep" />
            <div className="w-32 h-3.5 rounded-[2px] shimmer-sweep" />
            <div className="w-12 h-4 rounded-[3px] shimmer-sweep" />
          </div>

          {/* Provider / Lab */}
          <div className="w-28 hidden md:block">
            <div className="w-20 h-3 rounded-[2px] shimmer-sweep" />
          </div>

          {/* Input Price */}
          <div className="w-24 text-right">
            <div className="w-16 h-3.5 rounded-[2px] shimmer-sweep ml-auto" />
          </div>

          {/* Output Price */}
          <div className="w-24 text-right hidden sm:block">
            <div className="w-16 h-3.5 rounded-[2px] shimmer-sweep ml-auto" />
          </div>

          {/* Context Window */}
          <div className="w-24 text-right hidden lg:block">
            <div className="w-14 h-3 rounded-[2px] shimmer-sweep ml-auto" />
          </div>

          {/* Benchmark / Score */}
          <div className="w-24 text-right hidden xl:block">
            <div className="w-16 h-3.5 rounded-[2px] shimmer-sweep ml-auto" />
          </div>

          {/* Sparkline */}
          <div className="w-20 hidden md:block">
            <div className="w-18 h-4 rounded-[2px] shimmer-sweep" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * EmptyState (§4):
 * Instrument Serif italic headline ("No models match *that* combination yet."),
 * active filter tags in Geist Mono, and secondary "Clear filters" button
 */
export interface EmptyStateProps {
  title?: string;
  italicWord?: string;
  description?: string;
  message?: string;
  activeFilters?: string[];
  onReset?: () => void;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  title = "No models match ",
  italicWord = "that",
  description,
  message,
  activeFilters = [],
  onReset,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  const effectiveDescription =
    message ||
    description ||
    "The active filter combination did not return any indexed models from the catalog ledger. Loosen filters or reset bounds.";
  const handleAction = onAction || onReset;
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 sm:p-14 text-center max-w-xl mx-auto my-12 border border-hairline rounded-[4px] bg-surface-well/40 relative overflow-hidden",
        className
      )}
    >
      <div className="mb-4">
        <SignalBadge tone="coral" dot pulse>
          FILTER CONSTRAINT BOUNDS
        </SignalBadge>
      </div>

      <h3 className="font-display text-3xl sm:text-4xl text-text-primary tracking-tight font-normal mb-3">
        {title}
        <span className="italic text-signal-amber">{italicWord}</span> combination yet.
      </h3>

      <p className="font-sans text-sm text-text-secondary leading-relaxed max-w-md mb-6">
        {description}
      </p>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-6 max-w-sm">
          {activeFilters.map((filter, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-[4px] font-mono text-[11px] text-text-tertiary bg-surface-raised border border-hairline"
            >
              {filter}
            </span>
          ))}
        </div>
      )}

      {handleAction && (
        <button
          type="button"
          onClick={handleAction}
          className="inline-flex items-center gap-2 h-9 px-4 rounded-[4px] bg-transparent border border-hairline-strong text-text-primary hover:bg-surface-raised hover:border-hairline transition-all active:scale-[0.99] font-sans text-xs tracking-wide uppercase font-medium cursor-pointer"
        >
          <FilterX className="w-3.5 h-3.5 text-text-secondary" />
          <span>{actionLabel || "Clear filters"}</span>
        </button>
      )}
    </div>
  );
}

/**
 * ErrorBanner (§4):
 * --signal-coral Micro-label alert bar ("DATA UNAVAILABLE"), error description, Retry button, optional STALE badge
 */
export interface ErrorBannerProps {
  title?: string;
  message?: string;
  staleBadge?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorBanner({
  title = "DATA UNAVAILABLE",
  message = "Failed to synchronize ledger telemetry from upstream endpoint. Gateway connection timed out.",
  staleBadge,
  onRetry,
  className,
}: ErrorBannerProps) {
  return (
    <div
      role="alert"
      className={cn(
        "w-full rounded-[4px] bg-[#F43F5E]/[0.08] border border-[#F43F5E]/40 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs",
        className
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center justify-center w-7 h-7 rounded-[4px] bg-[#F43F5E]/[0.15] text-signal-coral shrink-0">
          <AlertTriangle className="w-4 h-4 text-signal-coral" />
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-sans text-[10px] font-semibold tracking-[0.09em] uppercase text-signal-coral">
              {title}
            </span>
            {staleBadge && (
              <span className="px-1.5 py-0.2 rounded-[3px] font-mono text-[9px] uppercase tracking-wider text-text-tertiary bg-surface-well border border-hairline">
                {staleBadge}
              </span>
            )}
          </div>
          <p className="font-sans text-xs text-text-secondary mt-0.5 line-clamp-2">
            {message}
          </p>
        </div>
      </div>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 h-7 px-3 rounded-[4px] bg-[#F43F5E]/[0.12] hover:bg-[#F43F5E]/[0.22] border border-[#F43F5E]/30 text-signal-coral text-[11px] font-sans font-medium uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Retry</span>
        </button>
      )}
    </div>
  );
}
