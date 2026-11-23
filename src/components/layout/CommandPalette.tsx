"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useCompare } from "@/lib/store/compare-store";
import { formatPricePer1M, formatContextShort } from "@/lib/formatters";
import { SearchResponse, SearchModelResult, SearchLabResult, SearchProviderResult } from "@/lib/types/api";
import { Search, CornerDownLeft, GitCompare } from "lucide-react";

interface PaletteAction {
  id: string;
  name: string;
  href: string;
  category: string;
}

const STATIC_ACTIONS: PaletteAction[] = [
  { id: "act-models", name: "Browse Frontier Models Catalog", href: "/models", category: "NAVIGATION" },
  { id: "act-rankings", name: "View Benchmark Leaderboards & Elo", href: "/rankings", category: "NAVIGATION" },
  { id: "act-pareto", name: "Explore Pareto Frontier Cost/Quality", href: "/rankings?benchmark=COMPOSITE", category: "NAVIGATION" },
  { id: "act-compare", name: "Open Multi-Model Compare Matrix", href: "/compare", category: "NAVIGATION" },
  { id: "act-directory", name: "Directory of AI Labs & Inference Clouds", href: "/directory", category: "NAVIGATION" },
];

export function CommandPalette() {
  const router = useRouter();
  const { toggleModel, isSelected } = useCompare();

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isNavigatingList, setIsNavigatingList] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Debounce search query by 180ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm.trim());
    }, 180);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Query search endpoint
  const { data: searchData, isLoading } = useQuery<SearchResponse>({
    queryKey: ["search", debouncedTerm],
    queryFn: async () => {
      const url = debouncedTerm
        ? `/api/search?q=${encodeURIComponent(debouncedTerm)}`
        : "/api/search";
      const res = await fetch(url);
      if (!res.ok) throw new Error("Search failed");
      return res.json();
    },
    enabled: isOpen,
    staleTime: 30_000,
  });

  // Flat list of selectable items for keyboard navigation
  type FlatItem =
    | { type: "model"; item: SearchModelResult }
    | { type: "lab"; item: SearchLabResult }
    | { type: "provider"; item: SearchProviderResult }
    | { type: "action"; item: PaletteAction };

  const flatItems: FlatItem[] = useMemo(() => {
    const list: FlatItem[] = [];

    if (searchData?.models && searchData.models.length > 0) {
      searchData.models.forEach((m) => list.push({ type: "model", item: m }));
    }
    if (searchData?.labs && searchData.labs.length > 0) {
      searchData.labs.forEach((l) => list.push({ type: "lab", item: l }));
    }
    if (searchData?.providers && searchData.providers.length > 0) {
      searchData.providers.forEach((p) => list.push({ type: "provider", item: p }));
    }

    // Include actions if search term matches or if search is empty
    const matchedActions = debouncedTerm
      ? STATIC_ACTIONS.filter((a) =>
          a.name.toLowerCase().includes(debouncedTerm.toLowerCase())
        )
      : STATIC_ACTIONS.slice(0, 3);

    matchedActions.forEach((a) => list.push({ type: "action", item: a }));

    return list;
  }, [searchData, debouncedTerm]);

  // Reset selected index when items change
  useEffect(() => {
    setSelectedIndex(0);
  }, [flatItems]);

  const closePalette = useCallback(() => {
    setIsOpen(false);
    setSearchTerm("");
    setDebouncedTerm("");
    setSelectedIndex(0);
    setIsNavigatingList(false);
  }, []);

  const handleSelect = useCallback(
    (item: FlatItem) => {
      if (item.type === "model") {
        router.push(`/models/${item.item.slug}`);
      } else if (item.type === "lab" || item.type === "provider") {
        router.push(`/directory/${item.item.slug}`);
      } else if (item.type === "action") {
        router.push(item.item.href);
      }
      closePalette();
    },
    [router, closePalette]
  );

  // Global Keyboard shortcuts (Cmd+K / Ctrl+K / slash)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }

      // Quick slash key (when not typing in an input/textarea)
      if (
        e.key === "/" &&
        !isOpen &&
        !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)
      ) {
        e.preventDefault();
        setIsOpen(true);
        return;
      }

      // Custom event trigger
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        closePalette();
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("oneatlas:open-command-palette", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("oneatlas:open-command-palette", handleCustomOpen);
    };
  }, [isOpen, closePalette]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard navigation inside palette
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIsNavigatingList(true);
      setSelectedIndex((prev) => (prev + 1 < flatItems.length ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIsNavigatingList(true);
      setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : flatItems.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const current = flatItems[selectedIndex];
      if (current) handleSelect(current);
    } else if ((e.key === "C" || (isNavigatingList && e.key.toLowerCase() === "c")) && !e.metaKey && !e.ctrlKey) {
      // Toggle compare if active item is a model
      const current = flatItems[selectedIndex];
      if (current && current.type === "model") {
        e.preventDefault();
        toggleModel({
          slug: current.item.slug,
          name: current.item.name,
          labName: current.item.labName,
          labSlug: current.item.slug.split("-")[0] || "lab",
          inputPricePer1M: 0,
          outputPricePer1M: 0,
          contextWindow: 128000,
        });
      }
    } else {
      setIsNavigatingList(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-start pt-[12vh] sm:pt-[16vh] px-4">
          {/* Backdrop Dimmer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={closePalette}
            className="fixed inset-0 bg-black/60 backdrop-blur-[4px] -z-10"
          />

          {/* Dialog Modal Container (600px max width) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -8 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[600px] bg-surface-overlay border border-hairline-strong rounded-[4px] shadow-2xl flex flex-col overflow-hidden"
            style={{
              boxShadow:
                "0 0 0 1px rgba(255, 255, 255, 0.14), 0 24px 48px -12px rgba(0, 0, 0, 0.85)",
            }}
          >
            {/* Input Row (48px) */}
            <div className="h-12 px-4 border-b border-hairline-strong flex items-center justify-between gap-3 bg-surface-overlay relative">
              <Search className="w-4 h-4 text-text-secondary shrink-0" />
              <input
                ref={inputRef}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Search models, labs, providers, or actions…"
                className="w-full bg-transparent border-none outline-none font-sans text-[14px] text-text-primary placeholder:text-text-tertiary tracking-tight"
              />
              <div className="flex items-center gap-1.5 shrink-0">
                <kbd className="font-mono text-[10px] font-medium tracking-[0.09em] uppercase text-text-tertiary px-1.5 py-0.5 border border-hairline-strong rounded-[3px] bg-surface-well/80 shadow-xs">
                  ESC
                </kbd>
              </div>
            </div>

            {/* Results Area */}
            <div
              ref={listRef}
              className="max-h-[440px] overflow-y-auto divide-y divide-hairline py-1 bg-surface-overlay"
            >
              {/* Models Section */}
              {searchData?.models && searchData.models.length > 0 && (
                <div className="py-1">
                  <div className="px-4 py-1.5 font-sans text-[10px] font-medium tracking-[0.09em] uppercase text-text-tertiary">
                    MODELS
                  </div>
                  {searchData.models.map((m) => {
                    const idx = flatItems.findIndex(
                      (x) => x.type === "model" && x.item.id === m.id
                    );
                    const isRowActive = idx === selectedIndex;
                    const inCompare = isSelected(m.slug);

                    return (
                      <div
                        key={m.id}
                        onClick={() => handleSelect({ type: "model", item: m })}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`mx-1.5 px-3 h-10 flex items-center justify-between rounded-[4px] cursor-pointer transition-colors ${
                          isRowActive
                            ? "bg-surface-raised border border-signal-amber/40"
                            : "hover:bg-surface-raised border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                              isRowActive ? "bg-signal-amber" : "bg-transparent"
                            }`}
                          />
                          <span className="font-structural font-medium text-[13px] text-text-primary truncate">
                            {m.name}
                          </span>
                          <span className="font-sans text-[12px] text-text-secondary shrink-0">
                            {m.labName}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {inCompare && (
                            <span className="font-mono text-[10px] text-signal-amber bg-signal-amber/10 border border-signal-amber/20 px-1 rounded-[2px]">
                              QUEUED
                            </span>
                          )}
                          <span className="font-mono text-[11px] text-text-tertiary tabular-nums">
                            SCORE {m.compositeScore.toFixed(1)}
                          </span>
                          {isRowActive && (
                            <div className="flex items-center gap-1 font-mono text-[10px] text-signal-amber px-1 py-0.5 rounded-[2px] bg-signal-amber/10 border border-signal-amber/20">
                              <CornerDownLeft className="w-2.5 h-2.5" />
                              <span>Open</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Research Labs Section */}
              {searchData?.labs && searchData.labs.length > 0 && (
                <div className="py-1">
                  <div className="px-4 py-1.5 font-sans text-[10px] font-medium tracking-[0.09em] uppercase text-text-tertiary">
                    RESEARCH LABS
                  </div>
                  {searchData.labs.map((lab) => {
                    const idx = flatItems.findIndex(
                      (x) => x.type === "lab" && x.item.id === lab.id
                    );
                    const isRowActive = idx === selectedIndex;

                    return (
                      <div
                        key={lab.id}
                        onClick={() => handleSelect({ type: "lab", item: lab })}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`mx-1.5 px-3 h-10 flex items-center justify-between rounded-[4px] cursor-pointer transition-colors ${
                          isRowActive
                            ? "bg-surface-raised border border-signal-amber/40"
                            : "hover:bg-surface-raised border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                              isRowActive ? "bg-signal-amber" : "bg-transparent"
                            }`}
                          />
                          <span className="font-structural font-medium text-[13px] text-text-primary">
                            {lab.name}
                          </span>
                        </div>
                        <span className="font-mono text-[11px] text-text-tertiary">
                          LAB PROFILE
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Inference Providers Section */}
              {searchData?.providers && searchData.providers.length > 0 && (
                <div className="py-1">
                  <div className="px-4 py-1.5 font-sans text-[10px] font-medium tracking-[0.09em] uppercase text-text-tertiary">
                    INFERENCE PROVIDERS
                  </div>
                  {searchData.providers.map((prov) => {
                    const idx = flatItems.findIndex(
                      (x) => x.type === "provider" && x.item.id === prov.id
                    );
                    const isRowActive = idx === selectedIndex;

                    return (
                      <div
                        key={prov.id}
                        onClick={() => handleSelect({ type: "provider", item: prov })}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`mx-1.5 px-3 h-10 flex items-center justify-between rounded-[4px] cursor-pointer transition-colors ${
                          isRowActive
                            ? "bg-surface-raised border border-signal-amber/40"
                            : "hover:bg-surface-raised border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                              isRowActive ? "bg-signal-amber" : "bg-transparent"
                            }`}
                          />
                          <span className="font-structural font-medium text-[13px] text-text-primary">
                            {prov.name}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-text-tertiary uppercase">
                          {prov.type}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Actions Section */}
              <div className="py-1">
                <div className="px-4 py-1.5 font-sans text-[10px] font-medium tracking-[0.09em] uppercase text-text-tertiary">
                  ACTIONS & SHORTCUTS
                </div>
                {STATIC_ACTIONS.map((action) => {
                  const idx = flatItems.findIndex(
                    (x) => x.type === "action" && x.item.id === action.id
                  );
                  if (idx === -1) return null;
                  const isRowActive = idx === selectedIndex;

                  return (
                    <div
                      key={action.id}
                      onClick={() => handleSelect({ type: "action", item: action })}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`mx-1.5 px-3 h-10 flex items-center justify-between rounded-[4px] cursor-pointer transition-colors ${
                        isRowActive
                          ? "bg-surface-raised border border-signal-amber/40"
                          : "hover:bg-surface-raised border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            isRowActive ? "bg-signal-amber" : "bg-transparent"
                          }`}
                        />
                        <span className="font-sans text-[13px] text-text-primary">
                          {action.name}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-text-tertiary">
                        {action.href}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Empty state inside palette */}
              {flatItems.length === 0 && !isLoading && (
                <div className="p-8 text-center text-xs text-text-secondary font-sans">
                  No matching models, labs, or actions found for &quot;{searchTerm}&quot;.
                </div>
              )}
            </div>

            {/* Footer Legend */}
            <div className="h-9 px-4 border-t border-hairline bg-surface-well/50 flex items-center justify-between font-mono text-[11px] text-text-tertiary select-none">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>·</span>
                <span>↵ Open</span>
                <span>·</span>
                <span className="text-signal-amber">C Compare</span>
              </div>
              <div>Esc to Close</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
