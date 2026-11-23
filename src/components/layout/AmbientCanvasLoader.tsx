"use client";

import React from "react";
import dynamic from "next/dynamic";

/**
 * Client-only wrapper for AmbientCanvas.
 * Ensures next/dynamic with { ssr: false } is never called inside a Server Component layout.
 */
const DynamicAmbientCanvas = dynamic(
  () => import("./AmbientCanvas"),
  { ssr: false }
);

export function AmbientCanvasLoader() {
  return <DynamicAmbientCanvas />;
}
