import type { Metadata } from "next";
import { Suspense } from "react";
import {
  Instrument_Serif,
  Space_Grotesk,
  Geist,
  Geist_Mono,
} from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { CompareProvider } from "@/lib/store/compare-store";
import { Navbar } from "@/components/layout/Navbar";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { CompareFloatingDock } from "@/components/layout/CompareFloatingDock";
import { AmbientCanvasLoader } from "@/components/layout/AmbientCanvasLoader";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-structural",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-ui",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "OneAtlas | AI Model Intelligence Ledger",
  description:
    "Real-time AI model intelligence, benchmarking, pricing, and latency routing ledger.",
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/logo.png",
    shortcut: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${spaceGrotesk.variable} ${geist.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[var(--surface-canvas)] text-[var(--text-primary)] relative selection:bg-signal-amber/20 selection:text-signal-amber">
        <QueryProvider>
          <CompareProvider>
            {/* Persistent WebGL Background Scene */}
            <AmbientCanvasLoader />

            {/* Persistent Top Navigation Bar */}
            <Suspense fallback={<div className="h-14 border-b border-hairline bg-surface-canvas/90" />}>
              <Navbar />
            </Suspense>

            {/* Main Content Area */}
            <main className="relative z-10 flex-1 pb-20 md:pb-12">
              {children}
            </main>

            {/* Global Overlay Utilities */}
            <Suspense fallback={null}>
              <CommandPalette />
            </Suspense>

            <Suspense fallback={null}>
              <CompareFloatingDock />
            </Suspense>
          </CompareProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
