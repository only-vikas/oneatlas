"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { SignalBadge } from "@/components/ui/SignalBadge";
import { ProviderEndpointItem } from "@/lib/types/api";
import { Zap, Sparkles } from "lucide-react";

interface WorkloadCostSimulatorProps {
  modelName: string;
  endpoints: ProviderEndpointItem[];
  defaultInputPrice: number;
  defaultOutputPrice: number;
}

interface Preset {
  id: string;
  label: string;
  dailyRequests: number;
  inputTokens: number;
  outputTokens: number;
}

const PRESETS: Preset[] = [
  {
    id: "chat",
    label: "1K Chat Replies · 2K in / 500 out",
    dailyRequests: 1000,
    inputTokens: 2000,
    outputTokens: 500,
  },
  {
    id: "rag",
    label: "1K RAG Queries · 32K in / 800 out",
    dailyRequests: 1000,
    inputTokens: 32000,
    outputTokens: 800,
  },
  {
    id: "agent",
    label: "1K Agent Runs · 50K in / 5K out",
    dailyRequests: 1000,
    inputTokens: 50000,
    outputTokens: 5000,
  },
];

export function WorkloadCostSimulator({
  modelName: _modelName,
  endpoints,
  defaultInputPrice,
  defaultOutputPrice,
}: WorkloadCostSimulatorProps) {
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [dailyRequests, setDailyRequests] = useState<number>(25000);
  const [inputTokens, setInputTokens] = useState<number>(32000);
  const [outputTokens, setOutputTokens] = useState<number>(800);
  const [cachingEnabled, setCachingEnabled] = useState<boolean>(true);

  // Odometer animated value ref
  const spendRef = useRef<HTMLSpanElement>(null);
  const tweenObj = useRef({ value: 0 });

  // Scrub chart hover state
  const chartRef = useRef<HTMLDivElement>(null);
  const [scrubX, setScrubX] = useState<number | null>(null);
  const [scrubPercent, setScrubPercent] = useState<number>(50);

  // Calculate monthly costs across all endpoints
  const providerCalculations = useMemo(() => {
    const list = endpoints.length > 0
      ? endpoints
      : [
          {
            id: "default-ep",
            provider: { name: "Direct API", slug: "direct" },
            inputPricePer1M: defaultInputPrice,
            outputPricePer1M: defaultOutputPrice,
            cacheInputPricePer1M: defaultInputPrice * 0.25,
            latencyMs: 120,
            throughputTps: 90,
          } as unknown as ProviderEndpointItem,
        ];

    const results = list.map((ep) => {
      const standardIn = ep.inputPricePer1M;
      const standardOut = ep.outputPricePer1M;
      const cacheIn = ep.cacheInputPricePer1M ?? standardIn;

      // Uncached monthly
      const uncachedMonthly =
        (((dailyRequests * inputTokens) / 1_000_000) * standardIn +
          ((dailyRequests * outputTokens) / 1_000_000) * standardOut) *
        30;

      // Caching applies 70% cache-hit rate if supported
      const effectiveIn = cachingEnabled ? 0.3 * standardIn + 0.7 * cacheIn : standardIn;
      const monthly =
        (((dailyRequests * inputTokens) / 1_000_000) * effectiveIn +
          ((dailyRequests * outputTokens) / 1_000_000) * standardOut) *
        30;

      const monthlySavings = Math.max(0, uncachedMonthly - monthly);

      return {
        endpoint: ep,
        providerName: ep.provider.name,
        providerSlug: ep.provider.slug,
        monthlyCost: monthly,
        uncachedCost: uncachedMonthly,
        monthlySavings,
        latencyMs: ep.latencyMs,
      };
    });

    results.sort((a, b) => a.monthlyCost - b.monthlyCost);
    return results;
  }, [endpoints, defaultInputPrice, defaultOutputPrice, dailyRequests, inputTokens, outputTokens, cachingEnabled]);

  const cheapestCalculation = providerCalculations[0] ?? {
    monthlyCost: 0,
    monthlySavings: 0,
  };

  const highestCost = Math.max(
    ...providerCalculations.map((p) => p.monthlyCost),
    1
  );

  // Trigger routing pulse event and animate odometer on parameter changes
  useEffect(() => {
    // Dispatch routing pulse to Three.js AmbientCanvas
    window.dispatchEvent(new CustomEvent("oneatlas:routing-pulse"));

    const targetVal = cheapestCalculation.monthlyCost;
    gsap.to(tweenObj.current, {
      value: targetVal,
      duration: 0.6,
      ease: "power2.out",
      onUpdate: () => {
        if (spendRef.current) {
          spendRef.current.textContent = `$${tweenObj.current.value.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`;
        }
      },
    });
  }, [cheapestCalculation.monthlyCost]);

  const handleSelectPreset = (p: Preset) => {
    setActivePreset(p.id);
    setDailyRequests(p.dailyRequests);
    setInputTokens(p.inputTokens);
    setOutputTokens(p.outputTokens);
  };

  // Chart pointer scrub handler
  const handleChartMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!chartRef.current) return;
    const rect = chartRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setScrubX(x);
    setScrubPercent(Math.round((x / rect.width) * 100));
  };

  const handleChartMouseLeave = () => {
    setScrubX(null);
  };

  return (
    <section className="w-full bg-surface-well/40 border-b border-hairline p-4 sm:p-6 lg:p-8">
      {/* Title & Micro-label */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-5 border-b border-hairline">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-signal-amber rotate-45 shrink-0" />
          <h2 className="font-headline-sm text-base sm:text-lg uppercase text-text-primary tracking-tight font-medium">
            Cost Engine Simulator
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <SignalBadge tone="amber" dot>
            70% CACHING ASSUMPTION
          </SignalBadge>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap items-center gap-2 py-4 border-b border-hairline">
        {PRESETS.map((p) => {
          const isActive = activePreset === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => handleSelectPreset(p)}
              className={`h-8 px-3 rounded-[4px] border text-xs font-sans flex items-center gap-2 transition-all cursor-pointer ${
                isActive
                  ? "bg-surface-raised border-signal-amber text-text-primary font-medium"
                  : "bg-surface-well border-hairline text-text-secondary hover:text-text-primary hover:border-hairline-strong"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isActive ? "bg-signal-amber" : "bg-text-tertiary"
                }`}
              />
              <span>{p.label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Left Column: Sliders & Controls (Col span 7) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Slider 1: Daily Requests */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-sans text-[11px] uppercase tracking-wider text-text-secondary">
                Daily Workload Ingress
              </span>
              <span className="font-mono text-text-primary font-semibold tabular-nums">
                {dailyRequests.toLocaleString()} reqs / day
              </span>
            </div>
            <div className="relative flex items-center h-5">
              <input
                type="range"
                min={100}
                max={100000}
                step={500}
                value={dailyRequests}
                onChange={(e) => {
                  setActivePreset(null);
                  setDailyRequests(Number(e.target.value));
                }}
                className="w-full h-1 bg-hairline-strong rounded-none appearance-none cursor-pointer accent-signal-amber"
              />
            </div>
          </div>

          {/* Slider 2: Input Tokens */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-sans text-[11px] uppercase tracking-wider text-text-secondary">
                Avg Ingress Tokens (Prompt)
              </span>
              <span className="font-mono text-text-primary font-semibold tabular-nums">
                {inputTokens.toLocaleString()} tokens
              </span>
            </div>
            <div className="relative flex items-center h-5">
              <input
                type="range"
                min={500}
                max={100000}
                step={500}
                value={inputTokens}
                onChange={(e) => {
                  setActivePreset(null);
                  setInputTokens(Number(e.target.value));
                }}
                className="w-full h-1 bg-hairline-strong rounded-none appearance-none cursor-pointer accent-signal-amber"
              />
            </div>
          </div>

          {/* Slider 3: Output Tokens */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-sans text-[11px] uppercase tracking-wider text-text-secondary">
                Avg Egress Tokens (Generation)
              </span>
              <span className="font-mono text-text-primary font-semibold tabular-nums">
                {outputTokens.toLocaleString()} tokens
              </span>
            </div>
            <div className="relative flex items-center h-5">
              <input
                type="range"
                min={100}
                max={32000}
                step={100}
                value={outputTokens}
                onChange={(e) => {
                  setActivePreset(null);
                  setOutputTokens(Number(e.target.value));
                }}
                className="w-full h-1 bg-hairline-strong rounded-none appearance-none cursor-pointer accent-signal-amber"
              />
            </div>
          </div>

          {/* Prompt Caching Toggle Switch */}
          <div className="p-3 rounded-[4px] bg-surface-raised/70 border border-hairline flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-signal-amber" />
              <div className="flex flex-col">
                <span className="font-sans text-xs font-medium text-text-primary">
                  Prompt Caching Optimization
                </span>
                <span className="font-sans text-[11px] text-text-tertiary">
                  Applies provider ephemeral cache rates (~10-25% base token cost)
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setCachingEnabled((prev) => !prev)}
              className={`w-10 h-5 rounded-[4px] p-0.5 transition-colors cursor-pointer border ${
                cachingEnabled
                  ? "bg-signal-amber/20 border-signal-amber"
                  : "bg-surface-well border-hairline-strong"
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-[2px] transition-transform ${
                  cachingEnabled
                    ? "translate-x-5 bg-signal-amber"
                    : "translate-x-0 bg-text-tertiary"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Right Column: Odometer Readout & Provider Cost Chart (Col span 5) */}
        <div className="lg:col-span-5 flex flex-col justify-between p-5 rounded-[4px] bg-surface-well border border-hairline">
          {/* Odometer Spend Box */}
          <div className="flex flex-col gap-1 pb-4 border-b border-hairline">
            <span className="font-sans text-[11px] uppercase tracking-wider text-text-tertiary">
              ESTIMATED MONTHLY INFERENCE SPEND
            </span>
            <div className="flex items-baseline gap-2">
              <span
                ref={spendRef}
                className="font-mono text-3xl sm:text-4xl text-text-primary font-bold tracking-tight tabular-nums"
              >
                $0.00
              </span>
              <span className="font-mono text-xs text-text-tertiary uppercase">/ MO</span>
            </div>

            {cachingEnabled && cheapestCalculation.monthlySavings > 0 && (
              <div className="flex items-center gap-1.5 text-xs font-mono text-signal-mint mt-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  Save ${cheapestCalculation.monthlySavings.toLocaleString("en-US", {
                    maximumFractionDigits: 0,
                  })}/mo with caching
                </span>
              </div>
            )}
          </div>

          {/* Provider Comparison Bars with Scrub Line */}
          <div className="pt-4 flex flex-col gap-3">
            <div className="flex items-center justify-between text-[11px] font-mono text-text-tertiary">
              <span>PROVIDER DISPATCH SPREAD</span>
              <span>LOWEST COST</span>
            </div>

            <div
              ref={chartRef}
              onMouseMove={handleChartMouseMove}
              onMouseLeave={handleChartMouseLeave}
              className="relative flex flex-col gap-2.5 py-1 cursor-crosshair"
            >
              {/* Scrub line cursor */}
              {scrubX !== null && (
                <>
                  <div
                    className="absolute top-0 bottom-0 w-[1px] bg-signal-amber z-20 pointer-events-none"
                    style={{ left: `${scrubX}px` }}
                  />
                  <div
                    className="absolute -top-6 px-1.5 py-0.5 rounded-[2px] bg-surface-overlay border border-signal-amber font-mono text-[9px] text-signal-amber z-20 pointer-events-none -translate-x-1/2 whitespace-nowrap"
                    style={{ left: `${scrubX}px` }}
                  >
                    SCALE: {scrubPercent}%
                  </div>
                </>
              )}

              {providerCalculations.slice(0, 4).map((calc, i) => {
                const isCheapest = i === 0;
                const widthPercent = Math.max(
                  8,
                  Math.round((calc.monthlyCost / highestCost) * 100)
                );

                return (
                  <div key={calc.providerSlug} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="font-sans text-xs text-text-primary">
                          {calc.providerName}
                        </span>
                        {isCheapest && (
                          <SignalBadge tone="mint" className="text-[8px] h-3.5 px-1">
                            BEST VALUE
                          </SignalBadge>
                        )}
                      </div>
                      <span className="font-mono text-xs tabular-nums text-text-secondary">
                        ${calc.monthlyCost.toLocaleString("en-US", {
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>

                    {/* Bar */}
                    <div className="w-full h-3 bg-surface-raised rounded-[2px] overflow-hidden flex">
                      <div
                        style={{ width: `${widthPercent}%` }}
                        className={`h-full transition-all duration-300 rounded-[2px] ${
                          isCheapest ? "bg-signal-mint" : "bg-signal-sky/80"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
