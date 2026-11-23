import { prisma } from "@/lib/prisma";
import {
  STATIC_MODELS,
  STATIC_LABS,
  STATIC_PROVIDERS,
} from "@/lib/data/dataset";
import { ModelsQuery, RankingsQuery, ParetoQuery } from "./schemas";

export interface ComputedModelPricing {
  lowestInputPrice: number;
  lowestOutputPrice: number;
  lowestCachePrice: number | null;
  lowestLatencyMs: number;
  highestThroughputTps: number;
  providerCount: number;
}

export function computeModelPricing(endpoints: Array<{
  inputPricePer1M: number;
  outputPricePer1M: number;
  cacheInputPricePer1M?: number | null;
  latencyMs: number;
  throughputTps: number;
}>): ComputedModelPricing {
  if (!endpoints || endpoints.length === 0) {
    return {
      lowestInputPrice: 0,
      lowestOutputPrice: 0,
      lowestCachePrice: null,
      lowestLatencyMs: 0,
      highestThroughputTps: 0,
      providerCount: 0,
    };
  }

  let lowestInputPrice = Infinity;
  let lowestOutputPrice = Infinity;
  let lowestCachePrice: number | null = null;
  let lowestLatencyMs = Infinity;
  let highestThroughputTps = 0;

  for (const ep of endpoints) {
    if (ep.inputPricePer1M < lowestInputPrice) {
      lowestInputPrice = ep.inputPricePer1M;
    }
    if (ep.outputPricePer1M < lowestOutputPrice) {
      lowestOutputPrice = ep.outputPricePer1M;
    }
    if (ep.cacheInputPricePer1M != null) {
      if (lowestCachePrice === null || ep.cacheInputPricePer1M < lowestCachePrice) {
        lowestCachePrice = ep.cacheInputPricePer1M;
      }
    }
    if (ep.latencyMs < lowestLatencyMs) {
      lowestLatencyMs = ep.latencyMs;
    }
    if (ep.throughputTps > highestThroughputTps) {
      highestThroughputTps = ep.throughputTps;
    }
  }

  return {
    lowestInputPrice: lowestInputPrice === Infinity ? 0 : lowestInputPrice,
    lowestOutputPrice: lowestOutputPrice === Infinity ? 0 : lowestOutputPrice,
    lowestCachePrice,
    lowestLatencyMs: lowestLatencyMs === Infinity ? 0 : lowestLatencyMs,
    highestThroughputTps,
    providerCount: endpoints.length,
  };
}

let cachedPrismaReady: boolean | null = null;
let lastCheckTime = 0;

async function isPrismaReady(): Promise<boolean> {
  const now = Date.now();
  if (cachedPrismaReady !== null && now - lastCheckTime < 10000) {
    return cachedPrismaReady;
  }

  try {
    const count = await prisma.model.count();
    if (count > 0) {
      cachedPrismaReady = true;
      lastCheckTime = now;
      return true;
    }
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        `[CRITICAL_DATABASE_ERROR] Production requires an active PostgreSQL connection. Could not reach database: ${
          (error as Error).message
        }`
      );
    }
    console.warn(
      `[DATABASE_OFFLINE_WARNING] Could not reach PostgreSQL at DATABASE_URL. Falling back to development mock dataset. ${
        (error as Error).message
      }`
    );
  }

  cachedPrismaReady = false;
  lastCheckTime = now;
  return false;
}

// ----------------------------------------------------------------------------
// 1. GET /api/models
// ----------------------------------------------------------------------------
export async function fetchModels(query: ModelsQuery) {
  const useDb = await isPrismaReady();

  if (useDb) {
    return fetchModelsFromDb(query);
  }
  return fetchModelsFromMemory(query);
}

function fetchModelsFromMemory(query: ModelsQuery) {
  let list = [...STATIC_MODELS];

  // Search filter
  if (query.q) {
    const term = query.q.toLowerCase();
    list = list.filter(
      (m) =>
        m.name.toLowerCase().includes(term) ||
        m.slug.toLowerCase().includes(term) ||
        m.description.toLowerCase().includes(term) ||
        m.lab.name.toLowerCase().includes(term)
    );
  }

  // Lab filter
  if (query.lab) {
    const labSlugs = query.lab.split(",").map((s) => s.trim().toLowerCase());
    list = list.filter((m) => labSlugs.includes(m.lab.slug.toLowerCase()));
  }

  // Provider filter
  if (query.provider) {
    const provSlugs = query.provider.split(",").map((s) => s.trim().toLowerCase());
    list = list.filter((m) =>
      m.endpoints.some((ep) => provSlugs.includes(ep.provider.slug.toLowerCase()))
    );
  }

  // Modality
  if (query.modality) {
    list = list.filter((m) => m.modality === query.modality);
  }

  // ModelType
  if (query.modelType) {
    list = list.filter((m) => m.modelType === query.modelType);
  }

  // Capability
  if (query.capability) {
    const caps = query.capability.split(",").map((c) => c.trim().toLowerCase());
    list = list.filter((m) =>
      caps.every((reqCap) => m.capabilities.map((c) => c.toLowerCase()).includes(reqCap))
    );
  }

  // Open weights
  if (query.openWeights !== undefined) {
    list = list.filter((m) => m.isOpenWeights === query.openWeights);
  }

  // Min context
  if (query.minContext !== undefined) {
    list = list.filter((m) => m.contextWindow >= query.minContext!);
  }

  // Enriched items with lowest pricing for sorting
  const enriched = list.map((m) => ({
    ...m,
    pricing: computeModelPricing(m.endpoints),
  }));

  // Sorting
  const dir = query.dir ?? (query.sort === "rank" || query.sort === "price" ? "asc" : "desc");
  const mult = dir === "asc" ? 1 : -1;

  enriched.sort((a, b) => {
    switch (query.sort) {
      case "price":
        return (a.pricing.lowestInputPrice - b.pricing.lowestInputPrice) * mult;
      case "context":
        return (a.contextWindow - b.contextWindow) * mult;
      case "released":
        return (new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()) * mult;
      case "rank":
      default:
        return (a.rankCurrent - b.rankCurrent) * mult;
    }
  });

  const totalCount = enriched.length;

  // Cursor pagination
  let startIndex = 0;
  if (query.cursor) {
    const cursorIdx = enriched.findIndex((m) => m.id === query.cursor);
    if (cursorIdx !== -1) {
      startIndex = cursorIdx + 1;
    }
  }

  const limit = query.limit ?? 20;
  const paginated = enriched.slice(startIndex, startIndex + limit);
  const nextCursor =
    startIndex + limit < enriched.length ? paginated[paginated.length - 1]?.id : null;

  return {
    items: paginated,
    nextCursor,
    totalCount,
  };
}

async function fetchModelsFromDb(query: ModelsQuery) {
  const where: Record<string, unknown> = {};

  if (query.q) {
    where.OR = [
      { name: { contains: query.q, mode: "insensitive" } },
      { slug: { contains: query.q, mode: "insensitive" } },
      { description: { contains: query.q, mode: "insensitive" } },
      { lab: { name: { contains: query.q, mode: "insensitive" } } },
    ];
  }

  if (query.lab) {
    const labSlugs = query.lab.split(",").map((s) => s.trim());
    where.lab = { slug: { in: labSlugs } };
  }

  if (query.provider) {
    const provSlugs = query.provider.split(",").map((s) => s.trim());
    where.endpoints = { some: { provider: { slug: { in: provSlugs } } } };
  }

  if (query.modality) where.modality = query.modality;
  if (query.modelType) where.modelType = query.modelType;
  if (query.openWeights !== undefined) where.isOpenWeights = query.openWeights;
  if (query.minContext !== undefined) where.contextWindow = { gte: query.minContext };

  if (query.capability) {
    const caps = query.capability.split(",").map((c) => c.trim());
    where.capabilities = { hasEvery: caps };
  }

  const rawModels = await prisma.model.findMany({
    where,
    include: {
      lab: true,
      endpoints: { include: { provider: true } },
      benchmarks: true,
    },
  });

  const enriched = rawModels.map((m) => ({
    ...m,
    pricing: computeModelPricing(m.endpoints),
  }));

  const dir = query.dir ?? (query.sort === "rank" || query.sort === "price" ? "asc" : "desc");
  const mult = dir === "asc" ? 1 : -1;

  enriched.sort((a, b) => {
    switch (query.sort) {
      case "price":
        return (a.pricing.lowestInputPrice - b.pricing.lowestInputPrice) * mult;
      case "context":
        return (a.contextWindow - b.contextWindow) * mult;
      case "released":
        return (new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()) * mult;
      case "rank":
      default:
        return (a.rankCurrent - b.rankCurrent) * mult;
    }
  });

  const totalCount = enriched.length;
  let startIndex = 0;
  if (query.cursor) {
    const cursorIdx = enriched.findIndex((m) => m.id === query.cursor);
    if (cursorIdx !== -1) startIndex = cursorIdx + 1;
  }

  const limit = query.limit ?? 20;
  const paginated = enriched.slice(startIndex, startIndex + limit);
  const nextCursor =
    startIndex + limit < enriched.length ? paginated[paginated.length - 1]?.id : null;

  return {
    items: paginated,
    nextCursor,
    totalCount,
  };
}

// ----------------------------------------------------------------------------
// 2. GET /api/models/[slug]
// ----------------------------------------------------------------------------
export async function fetchModelBySlug(slug: string) {
  const useDb = await isPrismaReady();

  if (useDb) {
    const model = await prisma.model.findUnique({
      where: { slug },
      include: {
        lab: true,
        endpoints: { include: { provider: true } },
        benchmarks: true,
      },
    });
    if (!model) return null;
    return {
      ...model,
      pricing: computeModelPricing(model.endpoints),
      providerCount: model.endpoints.length,
    };
  }

  const staticModel = STATIC_MODELS.find((m) => m.slug.toLowerCase() === slug.toLowerCase());
  if (!staticModel) return null;

  return {
    ...staticModel,
    pricing: computeModelPricing(staticModel.endpoints),
    providerCount: staticModel.endpoints.length,
  };
}

// ----------------------------------------------------------------------------
// 3. GET /api/models/[slug]/providers
// ----------------------------------------------------------------------------
export async function fetchModelProviders(slug: string) {
  const model = await fetchModelBySlug(slug);
  if (!model) return null;

  const endpoints = [...model.endpoints];
  endpoints.sort((a, b) => a.inputPricePer1M - b.inputPricePer1M);

  let lowestPrice = Infinity;
  let lowestLatency = Infinity;

  for (const ep of endpoints) {
    if (ep.inputPricePer1M < lowestPrice) lowestPrice = ep.inputPricePer1M;
    if (ep.latencyMs < lowestLatency) lowestLatency = ep.latencyMs;
  }

  const enrichedEndpoints = endpoints.map((ep) => ({
    ...ep,
    isBestValue: ep.inputPricePer1M === lowestPrice,
    isFastest: ep.latencyMs === lowestLatency,
  }));

  return {
    model: {
      id: model.id,
      name: model.name,
      slug: model.slug,
    },
    endpoints: enrichedEndpoints,
  };
}

// ----------------------------------------------------------------------------
// 4. GET /api/models/[slug]/benchmarks
// ----------------------------------------------------------------------------
export async function fetchModelBenchmarks(slug: string) {
  const model = await fetchModelBySlug(slug);
  if (!model) return null;

  const allModels = (await isPrismaReady())
    ? await prisma.model.findMany({ include: { benchmarks: true } })
    : STATIC_MODELS;

  // Category averages across all models with benchmarks
  const categoryStats: Record<string, { sum: number; count: number; max: number }> = {};
  for (const m of allModels) {
    for (const bm of m.benchmarks) {
      if (!categoryStats[bm.category]) {
        categoryStats[bm.category] = { sum: 0, count: 0, max: bm.maxScore };
      }
      categoryStats[bm.category].sum += bm.score;
      categoryStats[bm.category].count += 1;
    }
  }

  const categoryAverages: Record<
    string,
    { averageScore: number; sampleCount: number; maxScore: number }
  > = {};
  for (const [cat, stat] of Object.entries(categoryStats)) {
    categoryAverages[cat] = {
      averageScore: parseFloat((stat.sum / stat.count).toFixed(2)),
      sampleCount: stat.count,
      maxScore: stat.max,
    };
  }

  return {
    model: {
      id: model.id,
      name: model.name,
      slug: model.slug,
      compositeScore: model.compositeScore,
      rankCurrent: model.rankCurrent,
    },
    benchmarks: model.benchmarks,
    categoryAverages,
  };
}

// ----------------------------------------------------------------------------
// 5. GET /api/compare
// ----------------------------------------------------------------------------
export async function fetchCompareModels(slugs: string[]) {
  type ModelDetail = NonNullable<Awaited<ReturnType<typeof fetchModelBySlug>>>;
  const models: ModelDetail[] = [];
  const uniqueSlugs = Array.from(new Set(slugs.map((s) => s.trim().toLowerCase())));
  for (const slug of uniqueSlugs) {
    const m = await fetchModelBySlug(slug);
    if (m) models.push(m);
  }

  if (models.length === 0) return null;

  // Winner computations
  let bestValueSlug = models[0].slug;
  let lowestBlendedPrice = Infinity;

  let fastestSlug = models[0].slug;
  let lowestLatency = Infinity;

  let largestContextSlug = models[0].slug;
  let maxContext = -1;

  for (const m of models) {
    const blended = 0.75 * m.pricing.lowestInputPrice + 0.25 * m.pricing.lowestOutputPrice;
    if (blended < lowestBlendedPrice) {
      lowestBlendedPrice = blended;
      bestValueSlug = m.slug;
    }
    if (m.pricing.lowestLatencyMs < lowestLatency) {
      lowestLatency = m.pricing.lowestLatencyMs;
      fastestSlug = m.slug;
    }
    if (m.contextWindow > maxContext) {
      maxContext = m.contextWindow;
      largestContextSlug = m.slug;
    }
  }

  // Benchmark winners
  const benchmarkWinners: Record<string, { winnerSlug: string; highestScore: number }> = {};
  for (const m of models) {
    for (const bm of m.benchmarks) {
      const existing = benchmarkWinners[bm.benchmarkName];
      if (!existing || bm.score > existing.highestScore) {
        benchmarkWinners[bm.benchmarkName] = {
          winnerSlug: m.slug,
          highestScore: bm.score,
        };
      }
    }
  }

  const alignedModels = models.map((m) => {
    const benchmarkMap: Record<string, number> = {};
    for (const bm of m.benchmarks) {
      benchmarkMap[bm.benchmarkName] = bm.score;
    }
    return {
      id: m.id,
      name: m.name,
      slug: m.slug,
      lab: m.lab,
      modality: m.modality,
      modelType: m.modelType,
      license: m.license,
      isOpenWeights: m.isOpenWeights,
      contextWindow: m.contextWindow,
      maxOutputTokens: m.maxOutputTokens,
      capabilities: m.capabilities,
      compositeScore: m.compositeScore,
      pricing: m.pricing,
      benchmarkScores: benchmarkMap,
    };
  });

  return {
    models: alignedModels,
    winners: {
      bestValueSlug,
      fastestSlug,
      largestContextSlug,
      benchmarks: Object.fromEntries(
        Object.entries(benchmarkWinners).map(([k, v]) => [k, v.winnerSlug])
      ),
    },
  };
}

// ----------------------------------------------------------------------------
// 6. GET /api/rankings
// ----------------------------------------------------------------------------
export async function fetchRankings(query: RankingsQuery) {
  const allModels = (await isPrismaReady())
    ? await prisma.model.findMany({
        include: { lab: true, benchmarks: true },
      })
    : STATIC_MODELS;

  let filtered = [...allModels];

  // Category filter
  if (query.category !== "ALL") {
    if (query.category === "REASONING") {
      filtered = filtered.filter((m) => m.modelType === "REASONING");
    } else if (query.category === "CODING") {
      filtered = filtered.filter((m) => m.modelType === "CODE");
    } else if (query.category === "MULTIMODAL") {
      filtered = filtered.filter((m) => m.modality === "MULTIMODAL");
    } else if (query.category === "AGENTIC") {
      filtered = filtered.filter((m) =>
        m.capabilities.map((c) => c.toLowerCase()).includes("tool_calling")
      );
    }
  }

  // Scoring mapping
  const items = filtered.map((m) => {
    let score = m.compositeScore;
    if (query.benchmark !== "COMPOSITE") {
      const match = m.benchmarks.find(
        (b) => b.benchmarkName.toLowerCase() === query.benchmark.toLowerCase()
      );
      score = match ? match.score : 0;
    }

    return {
      id: m.id,
      name: m.name,
      slug: m.slug,
      lab: {
        name: m.lab.name,
        slug: m.lab.slug,
        logoSlug: m.lab.logoSlug,
      },
      modality: m.modality,
      modelType: m.modelType,
      isOpenWeights: m.isOpenWeights,
      score,
      rankCurrent: m.rankCurrent,
      rankPrevious: m.rankPrevious,
      delta: m.rankPrevious - m.rankCurrent,
      sparkline7d: m.sparkline7d,
      updatedAt: "updatedAt" in m ? m.updatedAt : new Date().toISOString(),
    };
  });

  // Sort descending by score
  items.sort((a, b) => b.score - a.score);

  const rankedItems = items.map((item, index) => ({
    ...item,
    rank: index + 1,
  }));

  return {
    category: query.category,
    benchmark: query.benchmark,
    count: rankedItems.length,
    items: rankedItems,
  };
}

// ----------------------------------------------------------------------------
// 7. GET /api/pareto
// ----------------------------------------------------------------------------
export async function fetchPareto(query: ParetoQuery) {
  const allModels = (await isPrismaReady())
    ? await prisma.model.findMany({
        include: { lab: true, endpoints: true },
      })
    : STATIC_MODELS;

  let filtered = [...allModels];
  if (query.category !== "ALL") {
    if (query.category === "REASONING") {
      filtered = filtered.filter((m) => m.modelType === "REASONING");
    } else if (query.category === "CODING") {
      filtered = filtered.filter((m) => m.modelType === "CODE");
    } else if (query.category === "MULTIMODAL") {
      filtered = filtered.filter((m) => m.modality === "MULTIMODAL");
    }
  }

  const points = filtered.map((m) => {
    const pricing = computeModelPricing(m.endpoints);
    const blendedCost = parseFloat(
      (0.75 * pricing.lowestInputPrice + 0.25 * pricing.lowestOutputPrice).toFixed(4)
    );
    const intelligence = m.compositeScore;

    return {
      modelId: m.id,
      name: m.name,
      slug: m.slug,
      labSlug: m.lab.slug,
      labName: m.lab.name,
      isOpenWeights: m.isOpenWeights,
      blendedCost,
      intelligence,
      lowestInputPrice: pricing.lowestInputPrice,
      lowestOutputPrice: pricing.lowestOutputPrice,
      onFrontier: false,
    };
  });

  // Compute Pareto frontier:
  // onFrontier = true iff no other model has (blendedCost <= this.blendedCost AND intelligence >= this.intelligence)
  // with at least one strict inequality.
  for (let i = 0; i < points.length; i++) {
    let dominated = false;
    for (let j = 0; j < points.length; j++) {
      if (i === j) continue;
      const other = points[j];
      const cur = points[i];

      const otherCheaperOrEqual = other.blendedCost <= cur.blendedCost;
      const otherSmarterOrEqual = other.intelligence >= cur.intelligence;
      const strictlyBetter =
        other.blendedCost < cur.blendedCost || other.intelligence > cur.intelligence;

      if (otherCheaperOrEqual && otherSmarterOrEqual && strictlyBetter) {
        dominated = true;
        break;
      }
    }
    points[i].onFrontier = !dominated;
  }

  // Sort by blendedCost ascending
  points.sort((a, b) => a.blendedCost - b.blendedCost);

  return {
    category: query.category,
    totalPoints: points.length,
    frontierCount: points.filter((p) => p.onFrontier).length,
    points,
  };
}

// ----------------------------------------------------------------------------
// 8. GET /api/directory
// ----------------------------------------------------------------------------
export async function fetchDirectory(type: "lab" | "provider") {
  const useDb = await isPrismaReady();

  if (type === "lab") {
    const labs = useDb
      ? await prisma.lab.findMany({
          include: {
            models: {
              include: { endpoints: true },
            },
          },
        })
      : STATIC_LABS.map((l) => ({
          ...l,
          models: STATIC_MODELS.filter((m) => m.labId === l.id),
        }));

    const items = labs.map((l) => {
      const modelCount = l.models.length;
      let totalInputPrice = 0;
      let maxContext = 0;

      for (const m of l.models) {
        if (m.contextWindow > maxContext) maxContext = m.contextWindow;
        const p = computeModelPricing(m.endpoints);
        totalInputPrice += p.lowestInputPrice;
      }

      const avgInputPrice =
        modelCount > 0 ? parseFloat((totalInputPrice / modelCount).toFixed(2)) : 0;

      const topModels = [...l.models]
        .sort((a, b) => b.compositeScore - a.compositeScore)
        .slice(0, 4)
        .map((m) => ({
          name: m.name,
          slug: m.slug,
          score: m.compositeScore,
          rank: m.rankCurrent,
        }));

      return {
        id: l.id,
        name: l.name,
        slug: l.slug,
        logoSlug: l.logoSlug,
        description: l.description,
        website: l.website,
        headquarters: l.headquarters,
        foundedYear: l.foundedYear,
        verified: l.verified,
        modelCount,
        avgInputPrice,
        maxContext,
        topModels,
      };
    });

    return { type: "lab", count: items.length, items };
  } else {
    const providers = useDb
      ? await prisma.provider.findMany({
          include: {
            endpoints: {
              include: { model: true },
            },
          },
        })
      : STATIC_PROVIDERS.map((p) => {
          const endpoints = STATIC_MODELS.flatMap((m) =>
            m.endpoints.filter((ep) => ep.providerId === p.id).map((ep) => ({ ...ep, model: m }))
          );
          return { ...p, endpoints };
        });

    const items = providers.map((p) => {
      const hostedModelCount = p.endpoints.length;
      const latencies = p.endpoints.map((ep) => ep.latencyMs).sort((a, b) => a - b);
      const medianLatencyMs =
        latencies.length > 0 ? latencies[Math.floor(latencies.length / 2)] : 0;

      const hostedModels = p.endpoints.slice(0, 5).map((ep) => ({
        name: ep.model.name,
        slug: ep.model.slug,
        inputPrice: ep.inputPricePer1M,
        latencyMs: ep.latencyMs,
      }));

      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        logoSlug: p.logoSlug,
        type: p.type,
        description: p.description,
        website: p.website,
        regions: p.regions,
        slaTier: p.slaTier,
        uptime30d: p.uptime30d,
        hostedModelCount,
        medianLatencyMs,
        hostedModels,
      };
    });

    return { type: "provider", count: items.length, items };
  }
}

// ----------------------------------------------------------------------------
// 9. GET /api/directory/[slug]
// ----------------------------------------------------------------------------
export async function fetchDirectoryBySlug(slug: string) {
  const normSlug = slug.toLowerCase();
  const useDb = await isPrismaReady();

  // 1. Try finding Lab
  if (useDb) {
    const lab = await prisma.lab.findUnique({
      where: { slug: normSlug },
      include: {
        models: {
          include: { endpoints: { include: { provider: true } } },
        },
      },
    });

    if (lab) {
      let totalInputPrice = 0;
      let maxContext = 0;
      for (const m of lab.models) {
        if (m.contextWindow > maxContext) maxContext = m.contextWindow;
        const p = computeModelPricing(m.endpoints);
        totalInputPrice += p.lowestInputPrice;
      }
      const avgInputPrice =
        lab.models.length > 0 ? parseFloat((totalInputPrice / lab.models.length).toFixed(2)) : 0;

      return {
        entityType: "lab" as const,
        profile: {
          id: lab.id,
          name: lab.name,
          slug: lab.slug,
          logoSlug: lab.logoSlug,
          description: lab.description,
          website: lab.website,
          headquarters: lab.headquarters,
          foundedYear: lab.foundedYear,
          verified: lab.verified,
        },
        telemetry: {
          modelCount: lab.models.length,
          avgInputPrice,
          maxContext,
        },
        models: lab.models.map((m) => ({
          ...m,
          pricing: computeModelPricing(m.endpoints),
        })),
        timelineOrRegions: {
          foundedYear: lab.foundedYear,
          releases: lab.models.map((m) => ({
            name: m.name,
            slug: m.slug,
            date: m.releaseDate,
          })),
        },
      };
    }

    // 2. Try finding Provider
    const provider = await prisma.provider.findUnique({
      where: { slug: normSlug },
      include: {
        endpoints: {
          include: { model: { include: { lab: true } } },
        },
      },
    });

    if (provider) {
      const latencies = provider.endpoints.map((ep) => ep.latencyMs).sort((a, b) => a - b);
      const medianLatencyMs =
        latencies.length > 0 ? latencies[Math.floor(latencies.length / 2)] : 0;

      return {
        entityType: "provider" as const,
        profile: {
          id: provider.id,
          name: provider.name,
          slug: provider.slug,
          logoSlug: provider.logoSlug,
          type: provider.type,
          description: provider.description,
          website: provider.website,
          slaTier: provider.slaTier,
          uptime30d: provider.uptime30d,
        },
        telemetry: {
          hostedModelCount: provider.endpoints.length,
          medianLatencyMs,
          uptime30d: provider.uptime30d,
        },
        models: provider.endpoints.map((ep) => ({
          ...ep.model,
          endpointInfo: {
            inputPricePer1M: ep.inputPricePer1M,
            outputPricePer1M: ep.outputPricePer1M,
            cacheInputPricePer1M: ep.cacheInputPricePer1M,
            latencyMs: ep.latencyMs,
            throughputTps: ep.throughputTps,
            uptimePct: ep.uptimePct,
          },
        })),
        timelineOrRegions: {
          regions: provider.regions,
        },
      };
    }

    return null;
  }

  // Memory fallback
  const staticLab = STATIC_LABS.find((l) => l.slug.toLowerCase() === normSlug);
  if (staticLab) {
    const models = STATIC_MODELS.filter((m) => m.labId === staticLab.id);
    let totalInputPrice = 0;
    let maxContext = 0;
    for (const m of models) {
      if (m.contextWindow > maxContext) maxContext = m.contextWindow;
      const p = computeModelPricing(m.endpoints);
      totalInputPrice += p.lowestInputPrice;
    }
    const avgInputPrice =
      models.length > 0 ? parseFloat((totalInputPrice / models.length).toFixed(2)) : 0;

    return {
      entityType: "lab" as const,
      profile: staticLab,
      telemetry: {
        modelCount: models.length,
        avgInputPrice,
        maxContext,
      },
      models: models.map((m) => ({
        ...m,
        pricing: computeModelPricing(m.endpoints),
      })),
      timelineOrRegions: {
        foundedYear: staticLab.foundedYear,
        releases: models.map((m) => ({
          name: m.name,
          slug: m.slug,
          date: m.releaseDate,
        })),
      },
    };
  }

  const staticProvider = STATIC_PROVIDERS.find((p) => p.slug.toLowerCase() === normSlug);
  if (staticProvider) {
    const endpoints = STATIC_MODELS.flatMap((m) =>
      m.endpoints
        .filter((ep) => ep.providerId === staticProvider.id)
        .map((ep) => ({ ...ep, model: m }))
    );

    const latencies = endpoints.map((ep) => ep.latencyMs).sort((a, b) => a - b);
    const medianLatencyMs =
      latencies.length > 0 ? latencies[Math.floor(latencies.length / 2)] : 0;

    return {
      entityType: "provider" as const,
      profile: staticProvider,
      telemetry: {
        hostedModelCount: endpoints.length,
        medianLatencyMs,
        uptime30d: staticProvider.uptime30d,
      },
      models: endpoints.map((ep) => ({
        ...ep.model,
        endpointInfo: {
          inputPricePer1M: ep.inputPricePer1M,
          outputPricePer1M: ep.outputPricePer1M,
          cacheInputPricePer1M: ep.cacheInputPricePer1M,
          latencyMs: ep.latencyMs,
          throughputTps: ep.throughputTps,
          uptimePct: ep.uptimePct,
        },
      })),
      timelineOrRegions: {
        regions: staticProvider.regions,
      },
    };
  }

  return null;
}

// ----------------------------------------------------------------------------
// 10. GET /api/search
// ----------------------------------------------------------------------------
export async function searchAll(query: string) {
  const useDb = await isPrismaReady();
  const q = query.trim();

  if (useDb) {
    if (!q) {
      const [trendingModels, topLabs, topProviders] = await Promise.all([
        prisma.model.findMany({
          orderBy: { usageDelta7d: "desc" },
          take: 5,
          include: { lab: true },
        }),
        prisma.lab.findMany({ take: 5 }),
        prisma.provider.findMany({ take: 5 }),
      ]);

      return {
        models: trendingModels.map((m) => ({
          id: m.id,
          name: m.name,
          slug: m.slug,
          labName: m.lab.name,
          compositeScore: m.compositeScore,
          usageDelta7d: m.usageDelta7d,
        })),
        labs: topLabs.map((l) => ({
          id: l.id,
          name: l.name,
          slug: l.slug,
          logoSlug: l.logoSlug,
        })),
        providers: topProviders.map((p) => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          logoSlug: p.logoSlug,
          type: p.type,
        })),
      };
    }

    const [matchedModels, matchedLabs, matchedProviders] = await Promise.all([
      prisma.model.findMany({
        where: {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { slug: { contains: q, mode: "insensitive" } },
            { description: { contains: q, mode: "insensitive" } },
          ],
        },
        take: 5,
        include: { lab: true },
      }),
      prisma.lab.findMany({
        where: {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { slug: { contains: q, mode: "insensitive" } },
            { headquarters: { contains: q, mode: "insensitive" } },
          ],
        },
        take: 5,
      }),
      prisma.provider.findMany({
        where: {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { slug: { contains: q, mode: "insensitive" } },
          ],
        },
        take: 5,
      }),
    ]);

    return {
      models: matchedModels.map((m) => ({
        id: m.id,
        name: m.name,
        slug: m.slug,
        labName: m.lab.name,
        compositeScore: m.compositeScore,
        usageDelta7d: m.usageDelta7d,
      })),
      labs: matchedLabs.map((l) => ({
        id: l.id,
        name: l.name,
        slug: l.slug,
        logoSlug: l.logoSlug,
      })),
      providers: matchedProviders.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        logoSlug: p.logoSlug,
        type: p.type,
      })),
    };
  }

  // Fallback to static in-memory data
  const qLower = q.toLowerCase();
  if (!qLower) {
    // Return default ⌘K palette state: top trending models, top labs, top providers
    const trendingModels = [...STATIC_MODELS]
      .sort((a, b) => b.usageDelta7d - a.usageDelta7d)
      .slice(0, 5)
      .map((m) => ({
        id: m.id,
        name: m.name,
        slug: m.slug,
        labName: m.lab.name,
        compositeScore: m.compositeScore,
        usageDelta7d: m.usageDelta7d,
      }));

    const topLabs = STATIC_LABS.slice(0, 5).map((l) => ({
      id: l.id,
      name: l.name,
      slug: l.slug,
      logoSlug: l.logoSlug,
    }));

    const topProviders = STATIC_PROVIDERS.slice(0, 5).map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      logoSlug: p.logoSlug,
      type: p.type,
    }));

    return {
      models: trendingModels,
      labs: topLabs,
      providers: topProviders,
    };
  }

  const matchedModels = STATIC_MODELS.filter(
    (m) =>
      m.name.toLowerCase().includes(qLower) ||
      m.slug.toLowerCase().includes(qLower) ||
      m.description.toLowerCase().includes(qLower)
  )
    .slice(0, 5)
    .map((m) => ({
      id: m.id,
      name: m.name,
      slug: m.slug,
      labName: m.lab.name,
      compositeScore: m.compositeScore,
      usageDelta7d: m.usageDelta7d,
    }));

  const matchedLabs = STATIC_LABS.filter(
    (l) =>
      l.name.toLowerCase().includes(qLower) ||
      l.slug.toLowerCase().includes(qLower) ||
      l.headquarters.toLowerCase().includes(qLower)
  )
    .slice(0, 5)
    .map((l) => ({
      id: l.id,
      name: l.name,
      slug: l.slug,
      logoSlug: l.logoSlug,
    }));

  const matchedProviders = STATIC_PROVIDERS.filter(
    (p) =>
      p.name.toLowerCase().includes(qLower) ||
      p.slug.toLowerCase().includes(qLower) ||
      p.regions.some((r) => r.toLowerCase().includes(qLower))
  )
    .slice(0, 5)
    .map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      logoSlug: p.logoSlug,
      type: p.type,
    }));

  return {
    models: matchedModels,
    labs: matchedLabs,
    providers: matchedProviders,
  };
}

// ----------------------------------------------------------------------------
// 11. GET /api/pulse (Market Pulse Landing Page)
// ----------------------------------------------------------------------------
export async function fetchMarketPulse() {
  const useDb = await isPrismaReady();

  if (useDb) {
    const [modelCount, providerCount, labCount] = await Promise.all([
      prisma.model.count(),
      prisma.provider.count(),
      prisma.lab.count(),
    ]);

    const trendingRaw = await prisma.model.findMany({
      orderBy: { usageDelta7d: "desc" },
      take: 5,
      include: {
        lab: true,
        endpoints: true,
      },
    });

    const recentRaw = await prisma.model.findMany({
      orderBy: { releaseDate: "desc" },
      take: 5,
      include: {
        lab: true,
        endpoints: true,
      },
    });

    const paretoResult = await fetchPareto({ category: "ALL" });
    const paretoFrontier = paretoResult.points
      .filter((p) => p.onFrontier)
      .slice(0, 5);

    const mapSummary = (m: typeof trendingRaw[number]) => ({
      id: m.id,
      name: m.name,
      slug: m.slug,
      lab: {
        name: m.lab.name,
        slug: m.lab.slug,
        logoSlug: m.lab.logoSlug,
      },
      modality: m.modality,
      modelType: m.modelType,
      contextWindow: m.contextWindow,
      compositeScore: m.compositeScore,
      usageDelta7d: m.usageDelta7d,
      sparkline7d: m.sparkline7d,
      releaseDate: m.releaseDate,
      pricing: computeModelPricing(m.endpoints),
    });

    return {
      counts: {
        models: modelCount,
        providers: providerCount,
        labs: labCount,
      },
      trending: trendingRaw.map(mapSummary),
      recent: recentRaw.map(mapSummary),
      paretoLeaders: paretoFrontier,
    };
  }

  // Fallback to static in-memory data
  const modelCount = STATIC_MODELS.length;
  const providerCount = STATIC_PROVIDERS.length;
  const labCount = STATIC_LABS.length;

  const trendingRaw = [...STATIC_MODELS]
    .sort((a, b) => b.usageDelta7d - a.usageDelta7d)
    .slice(0, 5);

  const recentRaw = [...STATIC_MODELS]
    .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
    .slice(0, 5);

  const paretoResult = await fetchPareto({ category: "ALL" });
  const paretoFrontier = paretoResult.points
    .filter((p) => p.onFrontier)
    .slice(0, 5);

  const mapSummary = (m: (typeof STATIC_MODELS)[number]) => ({
    id: m.id,
    name: m.name,
    slug: m.slug,
    lab: {
      name: m.lab.name,
      slug: m.lab.slug,
      logoSlug: m.lab.logoSlug,
    },
    modality: m.modality,
    modelType: m.modelType,
    contextWindow: m.contextWindow,
    compositeScore: m.compositeScore,
    usageDelta7d: m.usageDelta7d,
    sparkline7d: m.sparkline7d,
    releaseDate: m.releaseDate,
    pricing: computeModelPricing(m.endpoints),
  });

  return {
    counts: {
      models: modelCount,
      providers: providerCount,
      labs: labCount,
    },
    trending: trendingRaw.map(mapSummary),
    recent: recentRaw.map(mapSummary),
    paretoLeaders: paretoFrontier,
  };
}
