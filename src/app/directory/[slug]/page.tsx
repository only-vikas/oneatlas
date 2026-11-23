import { Suspense } from "react";
import type { Metadata } from "next";
import { DirectoryDetailClient } from "@/components/directory/DirectoryDetailClient";
import { CatalogSkeleton } from "@/components/ui/States";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const capitalized = slug.charAt(0).toUpperCase() + slug.slice(1);
  return {
    title: `${capitalized} — Directory Profile — OneAtlas`,
    description: `Inspect model roster, hardware infrastructure, SLA uptime, and latency telemetry for ${slug} on OneAtlas.`,
  };
}

export default function DirectoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-surface-canvas text-text-primary max-w-[1440px] mx-auto px-4 md:px-6 py-12">
          <CatalogSkeleton rows={8} />
        </div>
      }
    >
      <DirectoryDetailContent params={params} />
    </Suspense>
  );
}

async function DirectoryDetailContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <DirectoryDetailClient slug={slug} />;
}
