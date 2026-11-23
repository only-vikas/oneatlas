"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCompare } from "@/lib/store/compare-store";
import { ArrowRight, X, ChevronUp, ChevronDown } from "lucide-react";

export function CompareFloatingDock() {
  const pathname = usePathname();
  const { selectedModels, removeModel, clearModels, isHydrated } = useCompare();
  const [mobileExpanded, setMobileExpanded] = useState(false);

  // Do not show dock if not hydrated, no models selected, or currently on compare page
  if (!isHydrated || selectedModels.length === 0 || pathname === "/compare") {
    return null;
  }

  const compareUrl = `/compare?slugs=${selectedModels.map((m) => m.slug).join(",")}`;

  return (
    <AnimatePresence>
      <motion.aside
        aria-label="Model Comparison Dock"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 380,
          damping: 28,
        }}
        className="fixed bottom-16 md:bottom-6 right-4 md:right-8 z-40 select-none max-w-[calc(100vw-2rem)]"
      >
        {/* Desktop & Tablet Floating Dock */}
        <div
          className="hidden md:flex items-center gap-4 px-4 py-2.5 rounded-[4px] bg-surface-overlay/85 backdrop-blur-[20px] border border-hairline-strong shadow-2xl"
          style={{
            boxShadow:
              "0 0 0 1px rgba(255, 255, 255, 0.14), 0 20px 40px -10px rgba(0, 0, 0, 0.8)",
          }}
        >
          {/* Status info */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-signal-amber animate-pulse" />
            <span className="font-mono text-xs text-text-primary font-medium tabular-nums">
              {selectedModels.length}/4
            </span>
            <span className="font-sans text-[10px] text-text-tertiary uppercase tracking-[0.09em]">
              MODELS SELECTED
            </span>
          </div>

          <div className="h-4 w-[1px] bg-hairline-strong" />

          {/* Model Chips */}
          <div className="flex items-center gap-1.5 max-w-md overflow-x-auto py-0.5">
            {selectedModels.map((m) => (
              <div
                key={m.slug}
                className="h-6 pl-2 pr-1 rounded-[4px] bg-surface-well border border-hairline flex items-center gap-1 text-xs shrink-0"
              >
                <span className="font-structural text-xs text-text-primary max-w-[120px] truncate">
                  {m.name}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeModel(m.slug);
                  }}
                  className="w-4 h-4 flex items-center justify-center text-text-tertiary hover:text-signal-coral transition-colors cursor-pointer"
                  title={`Remove ${m.name}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          {/* Clear button */}
          <button
            type="button"
            onClick={clearModels}
            className="font-sans text-[11px] text-text-tertiary hover:text-text-secondary uppercase tracking-wider px-1.5 py-1 transition-colors cursor-pointer"
          >
            Clear
          </button>

          {/* Primary Action Button */}
          <Link
            href={compareUrl}
            className="h-8 px-3.5 rounded-[4px] bg-signal-amber hover:bg-amber-400 text-surface-canvas font-sans text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all active:scale-[0.98] cursor-pointer"
          >
            <span>Compare Matrix</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Compact Pill Bar (< 768px) */}
        <div className="flex flex-col md:hidden items-end">
          {mobileExpanded && (
            <div className="mb-2 p-2 rounded-[4px] bg-surface-overlay/95 backdrop-blur-[20px] border border-hairline-strong shadow-xl w-72 flex flex-col gap-2">
              <div className="flex items-center justify-between pb-1.5 border-b border-hairline">
                <span className="font-sans text-[10px] text-text-tertiary uppercase tracking-wider">
                  Compare Queue ({selectedModels.length}/4)
                </span>
                <button
                  type="button"
                  onClick={clearModels}
                  className="font-mono text-[10px] text-signal-coral hover:underline"
                >
                  Clear all
                </button>
              </div>
              <div className="flex flex-col gap-1 max-h-36 overflow-y-auto">
                {selectedModels.map((m) => (
                  <div
                    key={m.slug}
                    className="flex items-center justify-between py-1 px-1.5 rounded-[3px] bg-surface-well border border-hairline text-xs"
                  >
                    <span className="font-structural text-text-primary truncate max-w-[180px]">
                      {m.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeModel(m.slug)}
                      className="text-text-tertiary hover:text-signal-coral p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Collapsed Pill */}
          <div className="flex items-center gap-1.5 p-1 rounded-[4px] bg-surface-overlay/90 backdrop-blur-[20px] border border-hairline-strong shadow-xl">
            <button
              type="button"
              onClick={() => setMobileExpanded((prev) => !prev)}
              className="flex items-center gap-1.5 px-2 py-1 text-xs font-mono text-text-primary"
            >
              <span className="w-2 h-2 rounded-full bg-signal-amber animate-pulse" />
              <span className="tabular-nums">{selectedModels.length} selected</span>
              {mobileExpanded ? (
                <ChevronDown className="w-3.5 h-3.5 text-text-secondary" />
              ) : (
                <ChevronUp className="w-3.5 h-3.5 text-text-secondary" />
              )}
            </button>

            <Link
              href={compareUrl}
              className="h-7 px-3 rounded-[3px] bg-signal-amber text-surface-canvas font-sans text-xs font-semibold uppercase tracking-wider flex items-center gap-1"
            >
              <span>Compare</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
