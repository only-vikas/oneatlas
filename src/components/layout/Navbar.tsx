"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/formatters";
import { useCompare } from "@/lib/store/compare-store";
import {
  Layers,
  BarChart2,
  GitCompare,
  Building2,
  Search,
} from "lucide-react";

const NAV_LINKS = [
  { href: "/models", label: "Models", icon: Layers },
  { href: "/rankings", label: "Rankings", icon: BarChart2 },
  { href: "/compare", label: "Compare", icon: GitCompare },
  { href: "/directory", label: "Directory", icon: Building2 },
];

export function Navbar() {
  const pathname = usePathname();
  const { selectedModels } = useCompare();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openPalette = () => {
    window.dispatchEvent(new CustomEvent("oneatlas:open-command-palette"));
  };

  return (
    <>
      {/* Top Desktop & Tablet Header (56px) */}
      <header className="sticky top-0 left-0 right-0 h-14 z-40 bg-surface-canvas/90 backdrop-blur-md border-b border-hairline">
        <div className="w-full h-full px-4 sm:px-6 flex items-center justify-between">
          {/* Left: Brand Identity */}
          <div className="flex items-center gap-6 lg:gap-8">
            <Link
              href="/"
              className="flex items-center gap-2.5 group select-none"
            >
              <div className="relative w-6 h-6 rounded-[3px] border border-hairline-strong bg-surface-well overflow-hidden flex items-center justify-center p-0.5 group-hover:border-signal-amber/40 transition-colors">
                <Image
                  src="/logo.png"
                  alt="OneAtlas Diamond Mark"
                  width={24}
                  height={24}
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="font-structural font-semibold text-[15px] tracking-tight text-text-primary group-hover:text-signal-amber transition-colors">
                ONEATLAS
              </span>
              <span className="font-mono text-[10px] text-text-tertiary px-1.5 py-0.5 bg-surface-raised border border-hairline rounded-[2px] hidden sm:inline-block">
                TM-01
              </span>
            </Link>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 font-structural text-[13px]">
              {NAV_LINKS.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname?.startsWith(link.href));

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-3 py-1.5 rounded-[4px] transition-colors select-none",
                      isActive
                        ? "text-text-primary font-medium"
                        : "text-text-secondary hover:text-text-primary hover:bg-surface-raised/40"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-pill"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 30,
                          duration: 0.16,
                        }}
                        className="absolute inset-0 rounded-[4px] border border-hairline-strong bg-surface-raised shadow-xs -z-10"
                      />
                    )}
                    <span className="flex items-center gap-1.5">
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-signal-amber shrink-0" />
                      )}
                      <span>{link.label}</span>
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right: Telemetry & Controls */}
          <div className="flex items-center gap-3">
            {/* Live Feed Status Indicator */}
            <div className="hidden lg:flex items-center gap-2 font-mono text-[11px] text-text-secondary px-2.5 py-1 border border-hairline rounded-[4px] bg-surface-well select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-signal-mint animate-pulse" />
              <span>FEED LIVE</span>
            </div>

            {/* Live Compare Counter (if models selected) */}
            {mounted && selectedModels.length > 0 && (
              <Link
                href={`/compare?slugs=${selectedModels.map((m) => m.slug).join(",")}`}
                className="flex items-center gap-1.5 font-mono text-[11px] text-signal-amber border border-signal-amber/30 bg-signal-amber/10 px-2 py-0.5 rounded-[4px] hover:bg-signal-amber/20 transition-colors select-none"
              >
                <GitCompare className="w-3 h-3" />
                <span className="tabular-nums">{selectedModels.length}</span>
                <span className="hidden sm:inline">QUEUED</span>
              </Link>
            )}

            {/* ⌘K Trigger Button */}
            <button
              type="button"
              onClick={openPalette}
              className="flex items-center gap-2 border border-hairline-strong px-2.5 py-1 rounded-[4px] bg-surface-raised hover:bg-surface-overlay hover:border-signal-amber/30 transition-all font-mono text-[11px] text-text-secondary hover:text-text-primary cursor-pointer select-none"
              title="Search Command Palette (⌘K / Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-text-tertiary" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="px-1 py-0.5 rounded-[2px] bg-surface-well border border-hairline text-[10px] text-signal-amber font-mono">
                ⌘K
              </kbd>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fixed Bottom Navigation Bar (< 768px) */}
      <nav
        aria-label="Mobile Navigation"
        className="fixed bottom-0 left-0 right-0 h-14 z-40 bg-surface-canvas/95 backdrop-blur-md border-t border-hairline flex items-center justify-around px-2 md:hidden"
      >
        {NAV_LINKS.map((link) => {
          const Icon = link.icon;
          const isActive =
            pathname === link.href ||
            (link.href !== "/" && pathname?.startsWith(link.href));

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full py-1 text-[10px] font-sans tracking-wide transition-colors",
                isActive
                  ? "text-signal-amber font-medium"
                  : "text-text-tertiary hover:text-text-secondary"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 mb-0.5",
                  isActive ? "text-signal-amber" : "text-text-tertiary"
                )}
              />
              <span className="uppercase text-[9px] tracking-[0.05em]">
                {link.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
