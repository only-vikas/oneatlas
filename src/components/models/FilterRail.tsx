"use client";

import React from "react";
import { Check, RotateCcw } from "lucide-react";
import { cn } from "@/lib/formatters";

export const PROVIDER_OPTIONS = [
  { slug: "anthropic-direct", label: "Anthropic Direct" },
  { slug: "openai-direct", label: "OpenAI Direct" },
  { slug: "google-vertex-ai", label: "Google Vertex AI" },
  { slug: "deepseek-direct", label: "DeepSeek Direct" },
  { slug: "aws-bedrock", label: "AWS Bedrock" },
  { slug: "azure-ai-foundry", label: "Azure AI Foundry" },
  { slug: "groq", label: "Groq LPU" },
  { slug: "fireworks-ai", label: "Fireworks AI" },
  { slug: "together-ai", label: "Together AI" },
];

export const CAPABILITY_OPTIONS = [
  { key: "reasoning", label: "Reasoning (CoT)" },
  { key: "vision", label: "Vision / Multimodal" },
  { key: "tool_calling", label: "Tool / Function Call" },
  { key: "prompt_caching", label: "Prompt Caching" },
  { key: "json_mode", label: "JSON / Structured" },
];

export const CONTEXT_OPTIONS = [
  { value: 0, label: "Any Context" },
  { value: 32768, label: "32K+ Tokens" },
  { value: 131072, label: "128K+ Tokens" },
  { value: 1000000, label: "1,000,000+ Tokens" },
];

export const WEIGHT_OPTIONS = [
  { value: "all", label: "All Architectures" },
  { value: "true", label: "Open Weights Only" },
  { value: "false", label: "Proprietary Only" },
];

interface FilterRailProps {
  selectedProviders: string[];
  selectedCapabilities: string[];
  selectedContext: number;
  selectedWeights: string;
  onToggleProvider: (slug: string) => void;
  onToggleCapability: (cap: string) => void;
  onSelectContext: (ctx: number) => void;
  onSelectWeights: (w: string) => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
  totalFilteredCount?: number;
  className?: string;
}

export function FilterRail({
  selectedProviders,
  selectedCapabilities,
  selectedContext,
  selectedWeights,
  onToggleProvider,
  onToggleCapability,
  onSelectContext,
  onSelectWeights,
  onResetFilters,
  hasActiveFilters,
  totalFilteredCount,
  className,
}: FilterRailProps) {
  return (
    <aside
      className={cn(
        "w-60 shrink-0 border-r border-hairline bg-surface-well/80 flex flex-col justify-between select-none text-xs",
        className
      )}
    >
      <div className="flex flex-col divide-y divide-hairline">
        {/* Rail Top Title Bar */}
        <div className="h-11 px-4 flex items-center justify-between bg-surface-well">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "w-1.5 h-1.5 rounded-full",
                hasActiveFilters ? "bg-signal-amber animate-pulse" : "bg-text-tertiary"
              )}
            />
            <span className="font-sans text-[11px] font-medium uppercase tracking-[0.09em] text-text-primary">
              Filters
            </span>
            {hasActiveFilters && (
              <span className="font-mono text-[10px] text-signal-amber bg-signal-amber/10 border border-signal-amber/20 px-1.5 py-0.2 rounded-[2px]">
                ACTIVE
              </span>
            )}
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="flex items-center gap-1 font-mono text-[10px] text-signal-amber hover:text-amber-400 uppercase tracking-wider transition-colors cursor-pointer"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>RESET</span>
            </button>
          )}
        </div>

        {/* Section: Hosting Providers */}
        <div className="p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="font-sans text-[10px] font-medium uppercase tracking-[0.09em] text-text-tertiary">
              PROVIDERS
            </span>
            {selectedProviders.length > 0 && (
              <span className="font-mono text-[10px] text-signal-amber tabular-nums">
                {selectedProviders.length}
              </span>
            )}
          </div>
          <div className="space-y-1.5">
            {PROVIDER_OPTIONS.map((p) => {
              const checked = selectedProviders.includes(p.slug);
              return (
                <label
                  key={p.slug}
                  onClick={() => onToggleProvider(p.slug)}
                  className="flex items-center gap-2 text-text-secondary hover:text-text-primary cursor-pointer group transition-colors py-0.5"
                >
                  <div
                    className={cn(
                      "w-3.5 h-3.5 rounded-[3px] border flex items-center justify-center transition-colors",
                      checked
                        ? "bg-signal-amber border-signal-amber text-surface-canvas"
                        : "bg-surface-raised border-hairline-strong group-hover:border-signal-amber/40"
                    )}
                  >
                    {checked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                  <span className="font-sans text-xs tracking-tight">{p.label}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Section: Capabilities */}
        <div className="p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="font-sans text-[10px] font-medium uppercase tracking-[0.09em] text-text-tertiary">
              CAPABILITIES
            </span>
            {selectedCapabilities.length > 0 && (
              <span className="font-mono text-[10px] text-signal-amber tabular-nums">
                {selectedCapabilities.length}
              </span>
            )}
          </div>
          <div className="space-y-1.5">
            {CAPABILITY_OPTIONS.map((c) => {
              const checked = selectedCapabilities.includes(c.key);
              return (
                <label
                  key={c.key}
                  onClick={() => onToggleCapability(c.key)}
                  className="flex items-center gap-2 text-text-secondary hover:text-text-primary cursor-pointer group transition-colors py-0.5"
                >
                  <div
                    className={cn(
                      "w-3.5 h-3.5 rounded-[3px] border flex items-center justify-center transition-colors",
                      checked
                        ? "bg-signal-amber border-signal-amber text-surface-canvas"
                        : "bg-surface-raised border-hairline-strong group-hover:border-signal-amber/40"
                    )}
                  >
                    {checked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                  <span className="font-sans text-xs tracking-tight">{c.label}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Section: Context Window */}
        <div className="p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="font-sans text-[10px] font-medium uppercase tracking-[0.09em] text-text-tertiary">
              CONTEXT WINDOW
            </span>
          </div>
          <div className="space-y-1.5">
            {CONTEXT_OPTIONS.map((ctx) => {
              const active = selectedContext === ctx.value;
              return (
                <div
                  key={ctx.value}
                  onClick={() => onSelectContext(ctx.value)}
                  className={cn(
                    "px-2 py-1 rounded-[3px] border flex items-center justify-between cursor-pointer transition-all",
                    active
                      ? "bg-surface-raised border-signal-amber/40 text-text-primary"
                      : "bg-transparent border-transparent text-text-secondary hover:bg-surface-raised/40 hover:text-text-primary"
                  )}
                >
                  <span className="font-mono text-xs">{ctx.label}</span>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-signal-amber" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Section: Weights & Architecture */}
        <div className="p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="font-sans text-[10px] font-medium uppercase tracking-[0.09em] text-text-tertiary">
              LICENSE & WEIGHTS
            </span>
          </div>
          <div className="space-y-1.5">
            {WEIGHT_OPTIONS.map((w) => {
              const active = selectedWeights === w.value;
              return (
                <div
                  key={w.value}
                  onClick={() => onSelectWeights(w.value)}
                  className={cn(
                    "px-2 py-1 rounded-[3px] border flex items-center justify-between cursor-pointer transition-all",
                    active
                      ? "bg-surface-raised border-signal-amber/40 text-text-primary"
                      : "bg-transparent border-transparent text-text-secondary hover:bg-surface-raised/40 hover:text-text-primary"
                  )}
                >
                  <span className="font-sans text-xs">{w.label}</span>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-signal-amber" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Rail Bottom Status */}
      <div className="p-4 border-t border-hairline bg-surface-well/50">
        <div className="flex items-center justify-between text-text-tertiary font-mono text-[11px]">
          <span>MATCHING NODES</span>
          <span className="text-text-primary font-medium tabular-nums">
            {totalFilteredCount !== undefined ? totalFilteredCount : "—"}
          </span>
        </div>
      </div>
    </aside>
  );
}
