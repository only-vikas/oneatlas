"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Copy, Check, ChevronDown, ChevronUp, Zap } from "lucide-react";

interface ApiSnippetDrawerProps {
  modelSlug: string;
  defaultProviderSlug?: string;
}

type TabType = "curl" | "typescript" | "python";

export function ApiSnippetDrawer({
  modelSlug,
  defaultProviderSlug = "anthropic-direct",
}: ApiSnippetDrawerProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("curl");
  const [enableCaching, setEnableCaching] = useState(true);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState(false);

  const getSnippets = () => {
    const cachingPayloadCurl = enableCaching
      ? `,\n      "cache_control": { "type": "ephemeral" }`
      : "";

    const cachingPayloadTs = enableCaching
      ? `,\n        cacheControl: { type: "ephemeral" }`
      : "";

    const cachingPayloadPy = enableCaching
      ? `,\n            "cache_control": {"type": "ephemeral"}`
      : "";

    const curl = `curl https://api.oneatlas.io/v1/chat/completions \\
  -H "Authorization: Bearer $ONEATLAS_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "${modelSlug}",
    "provider": "${defaultProviderSlug}",
    "messages": [
      {
        "role": "user",
        "content": "Analyze system architecture telemetry."${cachingPayloadCurl}
      }
    ],
    "temperature": 0.2
  }'`;

    const typescript = `import { OneAtlasClient } from "@oneatlas/sdk";

const client = new OneAtlasClient({
  apiKey: process.env.ONEATLAS_API_KEY,
});

const response = await client.chat.create({
  model: "${modelSlug}",
  provider: "${defaultProviderSlug}",
  messages: [
    {
      role: "user",
      content: "Analyze system architecture telemetry."${cachingPayloadTs}
    }
  ],
  temperature: 0.2,
});

console.log(response.choices[0].message.content);`;

    const python = `from oneatlas import OneAtlasClient

client = OneAtlasClient()

response = client.chat.create(
    model="${modelSlug}",
    provider="${defaultProviderSlug}",
    messages=[
        {
            "role": "user",
            "content": "Analyze system architecture telemetry."${cachingPayloadPy}
        }
    ],
    temperature=0.2,
)

print(response.choices[0].message.content)`;

    return { curl, typescript, python };
  };

  const snippets = getSnippets();
  const currentCode = snippets[activeTab];

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      // Ignore error
    }
  };

  const handleCopySlug = async () => {
    try {
      await navigator.clipboard.writeText(modelSlug);
      setCopiedSlug(true);
      setTimeout(() => setCopiedSlug(false), 2000);
    } catch {
      // Ignore error
    }
  };

  return (
    <section className="w-full bg-surface-canvas border-b border-hairline">
      {/* Drawer Toggle Header */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="h-11 px-6 bg-surface-well/60 border-b border-hairline flex items-center justify-between cursor-pointer hover:bg-surface-well transition-colors select-none"
      >
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-signal-amber" />
          <span className="font-sans text-[11px] font-medium uppercase tracking-[0.09em] text-text-primary">
            Quick Route via OneAtlas API
          </span>
          <span className="font-mono text-[10px] text-text-tertiary">
            // UNIFIED INFERENCE DISPATCH
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-text-tertiary hidden sm:inline">
            CLICK TO {isOpen ? "COLLAPSE" : "EXPAND"}
          </span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-text-secondary" />
          ) : (
            <ChevronDown className="w-4 h-4 text-text-secondary" />
          )}
        </div>
      </div>

      {/* Expandable Code Body */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-surface-canvas"
          >
            <div className="p-4 sm:p-6 flex flex-col gap-4">
              {/* Controls bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-hairline">
                {/* Language Tabs */}
                <div className="flex items-center gap-1 bg-surface-well border border-hairline p-0.5 rounded-[4px] font-mono text-xs">
                  {(["curl", "typescript", "python"] as TabType[]).map((tab) => {
                    const isActive = activeTab === tab;
                    return (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={`relative px-3 py-1 rounded-[2px] uppercase text-[10px] tracking-wider transition-colors cursor-pointer ${
                          isActive
                            ? "text-signal-amber font-semibold"
                            : "text-text-tertiary hover:text-text-primary"
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="api-tab-active"
                            className="absolute inset-0 bg-surface-raised rounded-[2px] -z-10 shadow-xs"
                            transition={{ duration: 0.15 }}
                          />
                        )}
                        <span>{tab}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Right Options: Prompt Caching Switch + Copy Buttons */}
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 cursor-pointer text-xs font-mono text-text-secondary">
                    <input
                      type="checkbox"
                      checked={enableCaching}
                      onChange={(e) => setEnableCaching(e.target.checked)}
                      className="accent-signal-amber cursor-pointer"
                    />
                    <Zap className="w-3 h-3 text-signal-amber" />
                    <span className="text-[11px]">Prompt Caching</span>
                  </label>

                  <div className="h-4 w-[1px] bg-hairline" />

                  <button
                    type="button"
                    onClick={handleCopySlug}
                    className="h-7 px-2.5 rounded-[3px] bg-surface-well hover:bg-surface-raised border border-hairline font-mono text-[10px] uppercase text-text-secondary hover:text-text-primary flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedSlug ? <Check className="w-3 h-3 text-signal-mint" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedSlug ? "COPIED" : "SLUG"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="h-7 px-2.5 rounded-[3px] bg-signal-amber/15 hover:bg-signal-amber/25 border border-signal-amber/30 font-mono text-[10px] uppercase text-signal-amber flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3 h-3 text-signal-mint" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode ? "COPIED" : "COPY CODE"}</span>
                  </button>
                </div>
              </div>

              {/* Code Pre Box */}
              <div className="relative rounded-[4px] bg-surface-well border border-hairline p-4 overflow-x-auto font-mono text-xs text-text-secondary leading-relaxed">
                <pre>
                  <code>{currentCode}</code>
                </pre>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
