import { Suspense } from "react";
import { Metadata } from "next";
import { ModelCatalogClient } from "@/components/models/ModelCatalogClient";
import { CatalogSkeleton } from "@/components/ui/States";

export const metadata: Metadata = {
  title: "Model Discovery Catalog | OneAtlas",
  description:
    "Explore 32+ frontier and open-weight AI models with cross-provider pricing, context windows, and real-time benchmark telemetry.",
};

export default function ModelsPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-[calc(100vh-3.5rem)] bg-surface-canvas p-6">
          <CatalogSkeleton rows={12} />
        </div>
      }
    >
      <ModelCatalogClient />
    </Suspense>
  );
}
