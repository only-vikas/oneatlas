"use client";

import React from "react";
import Link from "next/link";
import { useCompare } from "@/lib/store/compare-store";
import { formatPricePer1M, formatContext, formatContextShort } from "@/lib/formatters";
import { Sparkline } from "@/components/ui/Sparkline";
import { SignalBadge } from "@/components/ui/SignalBadge";
import { ModelListItem } from "@/lib/types/api";
import { Check, Plus } from "lucide-react";

interface CatalogTableProps {
  models: ModelListItem[];
}

export function CatalogTable({ models }: CatalogTableProps) {
  const { isSelected, toggleModel } = useCompare();

  return (
    <div className="w-full bg-surface-canvas overflow-x-auto">
      {/* ========================================================= */}
      {/* DESKTOP TABLE VIEW (≥ 768px)                              */}
      {/* ========================================================= */}
      <div className="hidden md:block min-w-[760px] w-full">
        {/* Table Column Headers (44px) */}
        <div className="h-11 border-b border-hairline px-6 grid grid-cols-12 items-center font-sans text-[11px] font-medium uppercase tracking-[0.09em] text-text-tertiary select-none bg-surface-well/40">
          <div className="col-span-4 flex items-center gap-2">
            <span className="w-8">Index</span>
            <span>Model / Specification</span>
          </div>
          <div className="col-span-2">Laboratory</div>
          <div className="col-span-2 text-right">Input / 1M</div>
          <div className="col-span-1 text-right">Output / 1M</div>
          <div className="col-span-2 text-right">Context Window</div>
          <div className="col-span-1 text-right pr-2">Compare</div>
        </div>

        {/* Table Rows (44px compact standard) */}
        <div className="divide-y divide-hairline">
          {models.map((model, idx) => {
            const inCompare = isSelected(model.slug);
            const isRank1 = model.rankCurrent === 1 || idx === 0;

            const handleToggleCompare = (e: React.MouseEvent) => {
              e.preventDefault();
              e.stopPropagation();
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

            return (
              <div
                key={model.id}
                className={`group h-11 px-6 grid grid-cols-12 items-center text-xs transition-colors relative cursor-pointer ${
                  isRank1
                    ? "bg-[radial-gradient(circle_at_12%_50%,rgba(245,158,11,0.035)_0%,transparent_70%)] hover:bg-surface-raised"
                    : "hover:bg-surface-raised"
                }`}
              >
                {/* 1. Model Column (Index + Name + Badges) */}
                <div className="col-span-4 flex items-center gap-2.5 min-w-0 pr-3">
                  <span
                    className={`font-mono text-xs w-8 shrink-0 tabular-nums ${
                      isRank1 ? "text-signal-amber font-semibold" : "text-text-tertiary"
                    }`}
                  >
                    #{String(model.rankCurrent).padStart(2, "0")}
                  </span>

                  <Link
                    href={`/models/${model.slug}`}
                    className="font-structural font-medium text-[13px] text-text-primary group-hover:text-signal-amber transition-colors truncate"
                  >
                    {model.name}
                  </Link>

                  {model.isOpenWeights ? (
                    <SignalBadge tone="sky" className="text-[9px] px-1 h-4 shrink-0">
                      OPEN
                    </SignalBadge>
                  ) : isRank1 ? (
                    <SignalBadge tone="amber" className="text-[9px] px-1 h-4 shrink-0">
                      FRONTIER
                    </SignalBadge>
                  ) : null}
                </div>

                {/* 2. Laboratory */}
                <div className="col-span-2 text-text-secondary truncate">
                  <Link
                    href={`/directory/${model.lab.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="hover:text-text-primary hover:underline underline-offset-4 transition-colors"
                  >
                    {model.lab.name}
                  </Link>
                </div>

                {/* 3. Lowest Input Price */}
                <div className="col-span-2 text-right font-mono text-xs text-text-primary tabular-nums">
                  {formatPricePer1M(model.pricing.lowestInputPrice)}
                </div>

                {/* 4. Lowest Output Price */}
                <div className="col-span-1 text-right font-mono text-xs text-text-secondary tabular-nums">
                  {formatPricePer1M(model.pricing.lowestOutputPrice)}
                </div>

                {/* 5. Context Window */}
                <div className="col-span-2 text-right font-mono text-xs text-text-secondary tabular-nums">
                  {formatContext(model.contextWindow)}
                </div>

                {/* 6. Compare Checkbox Toggle */}
                <div className="col-span-1 flex items-center justify-end pr-2">
                  <button
                    type="button"
                    onClick={handleToggleCompare}
                    aria-label={`Compare ${model.name}`}
                    className={`w-6 h-6 rounded-[3px] border flex items-center justify-center transition-colors cursor-pointer ${
                      inCompare
                        ? "bg-signal-amber border-signal-amber text-surface-canvas"
                        : "bg-surface-well border-hairline hover:border-signal-amber/40 text-text-tertiary hover:text-text-primary"
                    }`}
                  >
                    {inCompare ? <Check className="w-3 h-3 stroke-[3]" /> : <Plus className="w-3 h-3" />}
                  </button>
                </div>

                {/* Floating Asymmetric Sparkline (xl screens) */}
                <div className="hidden xl:flex absolute right-4 top-1/2 -translate-y-1/2 items-center gap-3 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <Sparkline
                    data={model.sparkline7d}
                    color={model.usageDelta7d >= 0 ? "mint" : "coral"}
                    width={64}
                    height={16}
                  />
                  <span className="font-mono text-[10px] text-text-tertiary">
                    {model.usageDelta7d > 0 ? `+${model.usageDelta7d}%` : `${model.usageDelta7d}%`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE STACKED VIEW (< 768px)                             */}
      {/* ========================================================= */}
      <div className="md:hidden divide-y divide-hairline">
        {models.map((model) => {
          const inCompare = isSelected(model.slug);

          const handleToggleCompare = (e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
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

          return (
            <div
              key={model.id}
              className="p-3.5 flex flex-col gap-1.5 hover:bg-surface-raised transition-colors"
            >
              {/* Line 1: Compare button + Model Name + Badges */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-mono text-xs text-signal-amber shrink-0 font-medium">
                    #{model.rankCurrent}
                  </span>
                  <Link
                    href={`/models/${model.slug}`}
                    className="font-structural font-medium text-sm text-text-primary truncate"
                  >
                    {model.name}
                  </Link>
                  {model.isOpenWeights && (
                    <SignalBadge tone="sky" className="text-[8px] px-1 h-3.5 shrink-0">
                      OPEN
                    </SignalBadge>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleToggleCompare}
                  className={`px-2 py-0.5 rounded-[3px] border font-mono text-[10px] flex items-center gap-1 transition-colors ${
                    inCompare
                      ? "bg-signal-amber border-signal-amber text-surface-canvas font-semibold"
                      : "bg-surface-well border-hairline text-text-secondary"
                  }`}
                >
                  {inCompare ? "QUEUED" : "+ COMPARE"}
                </button>
              </div>

              {/* Line 2: Pricing · Context · Lab */}
              <div className="flex items-center justify-between text-xs font-mono text-text-tertiary">
                <div className="flex items-center gap-2">
                  <span className="text-text-primary font-medium tabular-nums">
                    {formatPricePer1M(model.pricing.lowestInputPrice)}
                  </span>
                  <span>/</span>
                  <span className="tabular-nums">
                    {formatPricePer1M(model.pricing.lowestOutputPrice)}
                  </span>
                  <span>·</span>
                  <span className="text-text-secondary tabular-nums">
                    {formatContextShort(model.contextWindow)} ctx
                  </span>
                </div>

                <span className="text-text-secondary font-sans text-[11px] truncate max-w-[100px]">
                  {model.lab.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
