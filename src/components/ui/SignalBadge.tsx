import React from "react";
import { cn } from "@/lib/formatters";

export type SignalTone = "amber" | "mint" | "sky" | "coral" | "neutral";

export interface SignalBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: SignalTone;
  dot?: boolean;
  pulse?: boolean;
  children: React.ReactNode;
}

const TONE_CLASSES: Record<SignalTone, { badge: string; dot: string }> = {
  amber: {
    badge: "border-[#F59E0B]/20 bg-[#F59E0B]/[0.08] text-[#F59E0B]",
    dot: "bg-[#F59E0B]",
  },
  mint: {
    badge: "border-[#10B981]/20 bg-[#10B981]/[0.08] text-[#10B981]",
    dot: "bg-[#10B981]",
  },
  sky: {
    badge: "border-[#38BDF8]/20 bg-[#38BDF8]/[0.08] text-[#38BDF8]",
    dot: "bg-[#38BDF8]",
  },
  coral: {
    badge: "border-[#F43F5E]/20 bg-[#F43F5E]/[0.08] text-[#F43F5E]",
    dot: "bg-[#F43F5E]",
  },
  neutral: {
    badge: "border-hairline-strong bg-surface-raised text-text-secondary",
    dot: "bg-text-tertiary",
  },
};

export function SignalBadge({
  tone = "neutral",
  dot = false,
  pulse = false,
  children,
  className,
  ...props
}: SignalBadgeProps) {
  const config = TONE_CLASSES[tone];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 h-5 px-1.5 rounded-[4px] border font-sans text-[10px] font-medium uppercase tracking-[0.09em] leading-none select-none",
        config.badge,
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full shrink-0",
            config.dot,
            pulse && "animate-pulse"
          )}
        />
      )}
      <span>{children}</span>
    </span>
  );
}
