import { Suspense } from "react";
import type { Metadata } from "next";
import { CompareClient } from "@/components/compare/CompareClient";
import { CatalogSkeleton } from "@/components/ui/States";

export const metadata: Metadata = {
  title: "Compare Models — OneAtlas Unified Matrix",
  description:
    "Side-by-side technical and economic diff matrix for frontier AI models. Compare real-time provider pricing, KV-caching discounts, context windows, and standardized benchmark scores.",
};

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-surface-canvas text-text-primary max-w-[1440px] mx-auto px-4 md:px-6 py-12">
          <CatalogSkeleton rows={10} />
        </div>
      }
    >
      <CompareClient />
    </Suspense>
  );
}
