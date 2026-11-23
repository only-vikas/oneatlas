# OneAtlas — Frontier AI Intelligence Ledger & Routing Matrix

OneAtlas is a unified intelligence ledger and real-time inference routing terminal for frontier artificial intelligence models. It aggregates and cross-analyzes pricing, context limits, prompt caching economics, benchmark performance, and provider routing telemetry across all major foundation labs and inference clouds.

---

## Architecture & Technology Stack

- **Framework**: Next.js 16 (App Router) with Partial Prerendering (`cacheComponents: true`, `partialPrefetching: true`).
- **Styling**: Tailwind CSS v4 with bespoke **Carbon Ledger** design tokens (`@theme inline`).
- **Database & ORM**: Neon Serverless PostgreSQL with Prisma ORM.
- **3D Visualization**: React Three Fiber (`@react-three/fiber`, `@react-three/drei`, `three`) with persistent WebGL `<AmbientCanvas>` supporting multi-mode state transitions.
- **Animation & Transitions**: GSAP (odometer numeric tickers) & Framer Motion (leaderboard re-ordering, sliding segmented pills).
- **Client State**: `@tanstack/react-query` for query caching and `useCompare` global persistence store.

---

## Carbon Ledger Design Philosophy

1. **Signal Budget ($\le 6\%$)**: 94%+ of UI surface utilizes monochromatic obsidian and graphite (`bg-surface-canvas`, `bg-surface-well`, `bg-surface-raised`), reserving high-saturation signals for actionable telemetry:
   - Amber (`#F59E0B`): Frontier leaders, primary active state, max context.
   - Mint (`#10B981`): Lowest prices, cache discounts, uptime health, winners.
   - Sky (`#38BDF8`): Fastest TTFT latency, cloud inference endpoints.
   - Coral (`#F43F5E`): Rank drops, deprecation warnings, error states.
2. **Micro-Radius (`rounded-[4px]`)**: Zero rounded-pill buttons. Badges and buttons strictly cap at 4px.
3. **Tabular Monospace Numbers**: Every quantitative value (prices, token counts, benchmarks, latencies) renders in `JetBrains Mono` with `tabular-nums` alignment.
4. **Zero Box-Shadows**: Elevation is expressed strictly through 1px hairline border contrasts (`border-hairline`, `border-hairline-strong`) and surface luminosity layers.

---

## Complete Route Specification

| Route | Viewport | Description | Key Features |
| :--- | :--- | :--- | :--- |
| `/` | Desktop & Mobile | Market Pulse Terminal Landing | 3-column ledger strip, hero search, live telemetry ticker, GSAP ambient canvas sync |
| `/models` | Desktop & Mobile | Model Discovery Catalog | Dynamic URL-synced multi-filter rail, infinite scroll table, 7d sparklines, 44px rows |
| `/models/[slug]` | Desktop & Mobile | Model Specification & Cost Simulator | Interactive workload cost simulator (70% KV-cache savings), provider routing table, copyable API snippets |
| `/compare` | Desktop & Mobile | 4-Column Side-by-Side Diff Matrix | 4-slot picker, server-computed winner badges (Best Value, Fastest, Max Context), sticky attribute headers |
| `/rankings` | Desktop & Mobile | Pareto Frontier & System Leaderboard | SVG logarithmic cost vs. score scatter plot, dashed frontier polyline, rank-varying rows (64px, 44px, 36px) |
| `/directory` | Desktop & Mobile | Labs & Providers Directory | Segmented toggle, 56px rows, inline expandable nested model tables (up to 2 pinned open) |
| `/directory/[slug]` | Desktop & Mobile | Laboratory / Provider Deep-Dive | 160px recessed masthead, lab release timeline, provider regional edge distribution matrix |

---

## Backend API Specification (11 Endpoints)

All endpoints adhere to standardized JSON payloads (`apiSuccess` / `apiError`) with `{ error: { code, message } }` on failures.

- `GET /api/pulse`: Summary counts, trending models by `usageDelta7d`, recent releases, and Pareto leaders.
- `GET /api/models`: Filterable model catalog with pagination (`q`, `lab`, `provider`, `modality`, `modelType`, `openWeights`, `minContext`, `sort`, `dir`, `cursor`, `limit`).
- `GET /api/models/[slug]`: Complete model specification with lowest computed pricing across all providers.
- `GET /api/models/[slug]/providers`: Enriched provider routing table with `isBestValue` and `isFastest` flags.
- `GET /api/models/[slug]/benchmarks`: Model benchmark breakdown with normalized category averages.
- `GET /api/compare`: Side-by-side comparison matrix for up to 4 model slugs with server-computed winner badges.
- `GET /api/rankings`: Zero-shot evaluation leaderboard sorted by category (`REASONING`, `CODING`, `MULTIMODAL`, `AGENTIC`) and benchmark.
- `GET /api/pareto`: Logarithmic Pareto frontier nodes calculated by non-domination criteria.
- `GET /api/directory`: Labs or Providers listing with aggregated model counts and pricing summaries.
- `GET /api/directory/[slug]`: Specific lab or provider profile with model ledger and timeline/regional telemetry.
- `GET /api/search`: Instant search across models, research labs, and inference providers.

---

## Getting Started

### 1. Environment Setup

Create a `.env` file in the repository root:

```env
DATABASE_URL="postgresql://<user>:<password>@<neon-host>/neondb?sslmode=require"
DIRECT_URL="postgresql://<user>:<password>@<neon-host>/neondb?sslmode=require"
```

### 2. Database Synchronization & Seeding

```bash
# Push Prisma schema to Neon PostgreSQL
npx prisma db push

# Seed 8 labs, 9 providers, 32 models, 69 endpoints, and 123 benchmark scores
npm run seed
```

### 3. Verification & Smoke Testing

```bash
# Run comprehensive 66-point API smoke test suite
npx tsx scripts/test-api.ts

# Perform strict TypeScript compiler check
npx tsc --noEmit

# Next.js production build with Partial Prerendering verification
npm run build
```

### 4. Development Server

```bash
npm run dev
# Server runs at http://localhost:3000
```

---

## Repository & License

- **GitHub**: [https://github.com/only-vikas/oneatlas.git](https://github.com/only-vikas/oneatlas.git)
- **License**: MIT
