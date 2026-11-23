export type Modality = "TEXT" | "MULTIMODAL" | "IMAGE" | "EMBEDDING";
export type ModelType = "CHAT" | "REASONING" | "CODE";
export type ProviderType = "FIRST_PARTY" | "INFERENCE_CLOUD";
export type BenchmarkCategory = "REASONING" | "CODING" | "GENERAL" | "AGENTIC";

export interface ComputedPricing {
  lowestInputPrice: number;
  lowestOutputPrice: number;
  lowestCachePrice: number | null;
  lowestLatencyMs: number;
  highestThroughputTps: number;
  providerCount: number;
}

export interface LabSummary {
  id?: string;
  name: string;
  slug: string;
  logoSlug: string;
}

export interface ProviderSummary {
  id?: string;
  name: string;
  slug: string;
  logoSlug: string;
  type: ProviderType;
}

export interface ProviderEndpointItem {
  id: string;
  modelId: string;
  providerId: string;
  inputPricePer1M: number;
  outputPricePer1M: number;
  cacheInputPricePer1M: number | null;
  latencyMs: number;
  throughputTps: number;
  uptimePct: number;
  contextLimit: number;
  isDefault: boolean;
  isBestValue?: boolean;
  isFastest?: boolean;
  provider: {
    id: string;
    name: string;
    slug: string;
    logoSlug: string;
    type: ProviderType;
    regions: string[];
    slaTier: string;
    uptime30d: number;
  };
}

export interface BenchmarkItem {
  id: string;
  modelId: string;
  benchmarkName: string;
  category: BenchmarkCategory;
  score: number;
  maxScore: number;
}

export interface ModelListItem {
  id: string;
  name: string;
  slug: string;
  labId: string;
  description: string;
  modality: Modality;
  modelType: ModelType;
  isOpenWeights: boolean;
  license: string;
  contextWindow: number;
  maxOutputTokens: number;
  releaseDate: string;
  compositeScore: number;
  rankCurrent: number;
  rankPrevious: number;
  usageDelta7d: number;
  sparkline7d: number[];
  capabilities: string[];
  lab: LabSummary;
  pricing: ComputedPricing;
  endpoints?: ProviderEndpointItem[];
}

export interface ModelDetail extends ModelListItem {
  endpoints: ProviderEndpointItem[];
  benchmarks: BenchmarkItem[];
}

export interface ModelsResponse {
  items: ModelListItem[];
  nextCursor: string | null;
  totalCount: number;
}

export interface CompareWinners {
  bestValueSlug: string | null;
  fastestSlug: string | null;
  largestContextSlug: string | null;
  benchmarks: Record<string, string | null>;
}

export interface CompareResponse {
  models: ModelDetail[];
  winners: CompareWinners;
}

export interface RankingItem {
  id: string;
  name: string;
  slug: string;
  lab: LabSummary;
  modality: Modality;
  modelType: ModelType;
  isOpenWeights: boolean;
  score: number;
  rankCurrent: number;
  rankPrevious: number;
  delta: number;
  sparkline7d: number[];
  rank: number;
  updatedAt?: string;
  model?: {
    id: string;
    name: string;
    slug: string;
    lab: LabSummary;
    modality: Modality;
    modelType: ModelType;
    isOpenWeights: boolean;
    contextWindow: number;
    releaseDate: string;
  };
  benchmark?: string;
  pricing?: {
    lowestInputPrice: number;
    lowestOutputPrice: number;
    blendedCost: number;
  };
}

export interface RankingsResponse {
  category: string;
  benchmark: string;
  count: number;
  items: RankingItem[];
}

export interface ParetoPoint {
  modelId: string;
  name: string;
  slug: string;
  labSlug: string;
  labName: string;
  isOpenWeights: boolean;
  blendedCost: number;
  intelligence: number;
  lowestInputPrice: number;
  lowestOutputPrice: number;
  onFrontier: boolean;
}

export interface ParetoResponse {
  category: string;
  totalPoints: number;
  frontierCount: number;
  points: ParetoPoint[];
}

export interface DirectoryLabItem {
  id: string;
  name: string;
  slug: string;
  logoSlug: string;
  description: string;
  website: string;
  headquarters: string;
  foundedYear: number;
  verified: boolean;
  modelCount: number;
  avgInputPrice: number;
  maxContext: number;
  topModels: Array<{
    name: string;
    slug: string;
    score: number;
    rank: number;
  }>;
}

export interface DirectoryProviderItem {
  id: string;
  name: string;
  slug: string;
  logoSlug: string;
  type: ProviderType;
  slaTier: string;
  uptime30d: number;
  regions: string[];
  hostedModelCount: number;
  medianLatencyMs: number;
  hostedModels: Array<{
    name: string;
    slug: string;
    inputPrice: number;
    latencyMs: number;
  }>;
}

export type DirectoryResponse =
  | { type: "lab"; count: number; items: DirectoryLabItem[] }
  | { type: "provider"; count: number; items: DirectoryProviderItem[] };

export interface DirectoryDetailResponse {
  entityType: "lab" | "provider";
  profile: DirectoryLabItem | DirectoryProviderItem;
  models: Array<{
    name: string;
    slug: string;
    score?: number;
    rank?: number;
    inputPrice?: number;
    outputPrice?: number;
    latencyMs?: number;
    contextWindow?: number;
    modality?: string;
    endpoints?: Array<{
      providerName: string;
      providerSlug: string;
      inputPricePer1M: number;
      outputPricePer1M: number;
      latencyMs: number;
      throughputTps: number;
      uptimePct: number;
    }>;
  }>;
  timelineOrRegions: {
    foundedYear?: number;
    headquarters?: string;
    website?: string;
    regions?: string[];
  };
}

export interface SearchModelResult {
  id: string;
  name: string;
  slug: string;
  labName: string;
  compositeScore: number;
  usageDelta7d: number;
}

export interface SearchLabResult {
  id: string;
  name: string;
  slug: string;
  logoSlug: string;
}

export interface SearchProviderResult {
  id: string;
  name: string;
  slug: string;
  logoSlug: string;
  type: string;
}

export interface SearchResponse {
  models: SearchModelResult[];
  labs: SearchLabResult[];
  providers: SearchProviderResult[];
}

export interface MarketPulseResponse {
  counts: {
    models: number;
    providers: number;
    labs: number;
  };
  trending: ModelListItem[];
  recent: ModelListItem[];
  paretoLeaders: ParetoPoint[];
}
