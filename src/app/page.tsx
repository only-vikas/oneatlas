export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <div className="max-w-2xl space-y-6">
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
