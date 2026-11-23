import { Suspense } from "react";
import { Metadata } from "next";
import { ModelDetailClient } from "@/components/detail/ModelDetailClient";
import { CatalogSkeleton } from "@/components/ui/States";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug.toUpperCase()} | Model Telemetry & Cost Engine | OneAtlas`,
    description: `Real-time pricing, provider dispatch routing, workload simulation, and benchmark evaluations for ${slug}.`,
  };
}

async function ModelDetailContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ModelDetailClient slug={slug} />;
}

export default function ModelDetailPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-[calc(100vh-3.5rem)] bg-surface-canvas p-6">
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="h-8 w-48 rounded-[2px] shimmer-sweep" />
            <div className="h-14 w-96 rounded-[2px] shimmer-sweep" />
            <CatalogSkeleton rows={8} />
          </div>
        </div>
      }
    >
      <ModelDetailContent params={params} />
    </Suspense>
  );
}

