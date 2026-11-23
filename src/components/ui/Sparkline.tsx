"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/formatters";

export interface SparklineProps {
  data: number[];
  color?: "mint" | "sky" | "coral" | "amber";
  width?: number;
  height?: number;
  className?: string;
}

const COLOR_MAP = {
  mint: { stroke: "#10B981", fill: "#10B981" },
  sky: { stroke: "#38BDF8", fill: "#38BDF8" },
  coral: { stroke: "#F43F5E", fill: "#F43F5E" },
  amber: { stroke: "#F59E0B", fill: "#F59E0B" },
};

export function Sparkline({
  data,
  color = "mint",
  width = 72,
  height = 20,
  className,
}: SparklineProps) {
  const pathRef = useRef<SVGPolylineElement | null>(null);
  const dotRef = useRef<SVGCircleElement | null>(null);

  const points = data && data.length > 0 ? data : [1, 2, 2.5, 3, 2.8, 3.5, 4];
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;

  const paddingY = 3;
  const paddingX = 2;
  const usableWidth = width - paddingX * 2;
  const usableHeight = height - paddingY * 2;

  const coords = points.map((val, idx) => {
    const x = paddingX + (idx / (points.length - 1)) * usableWidth;
    const y = height - paddingY - ((val - min) / range) * usableHeight;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const polylineStr = coords.join(" ");
  const lastCoord = coords[coords.length - 1]?.split(",") ?? ["0", "0"];
  const lastX = parseFloat(lastCoord[0] || "0");
  const lastY = parseFloat(lastCoord[1] || "0");

  useEffect(() => {
    const pathEl = pathRef.current;
    if (!pathEl) return;

    try {
      const len = pathEl.getTotalLength ? pathEl.getTotalLength() : 100;
      gsap.set(pathEl, { strokeDasharray: len, strokeDashoffset: len });

      const ctx = gsap.context(() => {
        gsap.to(pathEl, {
          strokeDashoffset: 0,
          duration: 0.9,
          ease: "power2.out",
        });

        if (dotRef.current) {
          gsap.fromTo(
            dotRef.current,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, delay: 0.7, ease: "back.out(2)" }
          );
        }
      });

      return () => ctx.revert();
    } catch {
      // Fallback gracefully if getTotalLength is unavailable in test environments
    }
  }, [points]);

  const activeColor = COLOR_MAP[color] ?? COLOR_MAP.mint;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn("overflow-visible shrink-0", className)}
      aria-hidden="true"
    >
      <polyline
        ref={pathRef}
        fill="none"
        stroke={activeColor.stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={polylineStr}
      />
      <circle
        ref={dotRef}
        cx={lastX}
        cy={lastY}
        r="2"
        fill={activeColor.fill}
      />
    </svg>
  );
}
