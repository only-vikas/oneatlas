import { Suspense } from "react";
import type { Metadata } from "next";
import { DirectoryClient } from "@/components/directory/DirectoryClient";
import { CatalogSkeleton } from "@/components/ui/States";

export const metadata: Metadata = {
  title: "Directory — Frontier AI Labs & Cloud Inference Providers — OneAtlas",
  description:
    "Comprehensive directory of world-leading AI research laboratories (Anthropic, OpenAI, DeepSeek, Google DeepMind, Meta, Mistral) and cloud inference providers (Groq, Cerebras, Bedrock, Together).",
};

export default function DirectoryPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-surface-canvas text-text-primary max-w-[1440px] mx-auto px-4 md:px-6 py-12">
          <CatalogSkeleton rows={8} />
        </div>
      }
    >
      <DirectoryClient />
    </Suspense>
  );
}
