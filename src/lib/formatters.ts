import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Standard Tailwind class merger with clsx
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format price per 1M tokens with exact tabular currency
 * e.g. "$0.14", "$15.00", or "—"
 */
export function formatPricePer1M(price: number | null | undefined): string {
  if (price === null || price === undefined) return "—";
  if (price === 0) return "$0.00";
  if (price < 0.01) return `$${price.toFixed(3)}`;
  return `$${price.toFixed(2)}`;
}

/**
 * Format context tokens into comma-separated tabular integer
 * e.g. "1,048,576"
 */
export function formatContext(tokens: number | null | undefined): string {
  if (tokens === null || tokens === undefined) return "—";
  return tokens.toLocaleString("en-US");
}

/**
 * Format context tokens into compact short form
 * e.g. "2M", "1M", "200K", "32K"
 */
export function formatContextShort(tokens: number | null | undefined): string {
  if (!tokens) return "—";
  if (tokens >= 1_000_000) {
    const val = tokens / 1_000_000;
    return Number.isInteger(val) ? `${val}M` : `${val.toFixed(1)}M`;
  }
  if (tokens >= 1_000) {
    const val = tokens / 1_000;
    return Number.isInteger(val) ? `${val}K` : `${val.toFixed(1)}K`;
  }
  return `${tokens}`;
}

/**
 * Format latency in milliseconds
 * e.g. "148ms" or "—"
 */
export function formatLatency(ms: number | null | undefined): string {
  if (ms === null || ms === undefined || ms <= 0) return "—";
  return `${Math.round(ms)}ms`;
}

/**
 * Format rank or telemetry delta with semantic tone
 * e.g. { text: "+3", tone: "mint" } or { text: "-2", tone: "coral" }
 */
export function formatDelta(delta: number | null | undefined): {
  text: string;
  tone: "mint" | "coral" | "neutral";
} {
  if (delta === null || delta === undefined || delta === 0) {
    return { text: "0", tone: "neutral" };
  }
  if (delta > 0) {
    return { text: `+${delta}`, tone: "mint" };
  }
  return { text: `${delta}`, tone: "coral" };
}

/**
 * Compute blended rate (75% input, 25% output per 1M tokens)
 */
export function computeBlendedCost(inputPer1M: number, outputPer1M: number): number {
  return parseFloat((0.75 * inputPer1M + 0.25 * outputPer1M).toFixed(4));
}
