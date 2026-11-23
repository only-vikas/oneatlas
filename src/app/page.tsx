import Image from "next/image";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center relative overflow-hidden">
      <div className="max-w-2xl flex flex-col items-center space-y-6">
        <div className="relative group">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[var(--signal-amber)]/30 via-[var(--signal-sky)]/30 to-[var(--signal-amber)]/30 blur-xl opacity-70 group-hover:opacity-100 transition duration-1000" />
          <div className="relative flex items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-2xl border border-[var(--hairline-strong)] bg-[var(--surface-raised)]/90 backdrop-blur-md p-3 shadow-2xl overflow-hidden">
            <Image
              src="/logo.png"
              alt="OneAtlas Logo"
              width={144}
              height={144}
              priority
              className="object-contain w-full h-full drop-shadow-[0_0_20px_rgba(245,158,11,0.4)]"
            />
          </div>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--hairline-strong)] bg-[var(--surface-raised)] px-3 py-1 text-xs font-mono text-[var(--signal-mint)] tabular-nums">
          <span className="h-2 w-2 rounded-full bg-[var(--signal-mint)] animate-pulse" />
          SYSTEM_ONLINE :: CARBON_LEDGER_ACTIVE
        </div>

        <h1 className="font-display text-5xl md:text-6xl tracking-tight text-[var(--text-primary)]">
          OneAtlas
        </h1>
        <p className="font-structural text-lg text-[var(--text-secondary)]">
          High-performance AI model intelligence, benchmarking, and routing ledger.
        </p>
      </div>
    </main>
  );
}
