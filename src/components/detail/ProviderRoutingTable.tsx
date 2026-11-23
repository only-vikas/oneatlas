"use client";

import React from "react";
import { formatPricePer1M, formatLatency } from "@/lib/formatters";
import { SignalBadge } from "@/components/ui/SignalBadge";
import { ProviderEndpointItem } from "@/lib/types/api";
import { Server, ExternalLink } from "lucide-react";

interface ProviderRoutingTableProps {
  endpoints: ProviderEndpointItem[];
}

export function ProviderRoutingTable({ endpoints }: ProviderRoutingTableProps) {
  if (!endpoints || endpoints.length === 0) {
    return (
      <div className="p-8 text-center text-xs text-text-tertiary font-mono bg-surface-canvas border-b border-hairline">
        NO HOSTED PROVIDER ENDPOINTS CONFIGURED
      </div>
    );
  }

  return (
    <section className="w-full bg-surface-canvas border-b border-hairline">
      {/* Header bar */}
      <div className="h-11 px-6 border-b border-hairline bg-surface-well/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 text-signal-sky" />
          <span className="font-sans text-[11px] font-medium uppercase tracking-[0.09em] text-text-primary">
            Provider Routing Matrix
          </span>
          <span className="font-mono text-[10px] text-text-tertiary">
            ({endpoints.length} ACTIVE ENDPOINTS)
          </span>
        </div>
        <span className="font-mono text-[10px] text-text-tertiary hidden sm:inline">
          RATES PER 1M TOKENS · 30-DAY SLA
        </span>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[800px] w-full">
          {/* Column headers (44px) */}
          <div className="h-11 border-b border-hairline px-6 grid grid-cols-12 items-center font-sans text-[11px] font-medium uppercase tracking-[0.09em] text-text-tertiary select-none bg-surface-canvas/60">
            <div className="col-span-3">Inference Host</div>
            <div className="col-span-2 text-right">Input / 1M</div>
            <div className="col-span-2 text-right">Output / 1M</div>
            <div className="col-span-2 text-right">Cache / 1M</div>
            <div className="col-span-1 text-right">Latency</div>
            <div className="col-span-1 text-right">Throughput</div>
            <div className="col-span-1 text-right">Uptime</div>
          </div>

          {/* Rows (44px) */}
          <div className="divide-y divide-hairline">
            {endpoints.map((ep) => {
              const isHighLatency = ep.latencyMs > 800;

              return (
                <div
                  key={ep.id}
                  className="h-11 px-6 grid grid-cols-12 items-center text-xs hover:bg-surface-raised transition-colors group select-none"
                >
                  {/* Host Name & Badges */}
                  <div className="col-span-3 flex items-center gap-2 min-w-0 pr-3">
                    <span className="font-structural font-medium text-xs sm:text-[13px] text-text-primary truncate">
                      {ep.provider.name}
                    </span>

                    {ep.isBestValue && (
                      <SignalBadge tone="mint" className="text-[8px] h-3.5 px-1 shrink-0">
                        VALUE
                      </SignalBadge>
                    )}

                    {ep.isFastest && (
                      <SignalBadge tone="sky" className="text-[8px] h-3.5 px-1 shrink-0">
                        FASTEST
                      </SignalBadge>
                    )}
                  </div>

                  {/* Input Price */}
                  <div className="col-span-2 text-right font-mono text-xs tabular-nums text-text-primary font-medium">
                    {formatPricePer1M(ep.inputPricePer1M)}
                  </div>

                  {/* Output Price */}
                  <div className="col-span-2 text-right font-mono text-xs tabular-nums text-text-secondary">
                    {formatPricePer1M(ep.outputPricePer1M)}
                  </div>

                  {/* Cache Price */}
                  <div className="col-span-2 text-right font-mono text-xs tabular-nums text-text-tertiary">
                    {ep.cacheInputPricePer1M != null
                      ? formatPricePer1M(ep.cacheInputPricePer1M)
                      : "—"}
                  </div>

                  {/* Latency */}
                  <div
                    className={`col-span-1 text-right font-mono text-xs tabular-nums ${
                      isHighLatency
                        ? "text-signal-coral font-medium"
                        : ep.isFastest
                        ? "text-signal-sky font-medium"
                        : "text-text-secondary"
                    }`}
                  >
                    {formatLatency(ep.latencyMs)}
                  </div>

                  {/* Throughput */}
                  <div className="col-span-1 text-right font-mono text-xs tabular-nums text-text-secondary">
                    {ep.throughputTps > 0 ? `${ep.throughputTps} tps` : "—"}
                  </div>

                  {/* Uptime */}
                  <div className="col-span-1 text-right font-mono text-xs tabular-nums text-text-tertiary">
                    {ep.uptimePct ? `${ep.uptimePct.toFixed(1)}%` : "99.9%"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
