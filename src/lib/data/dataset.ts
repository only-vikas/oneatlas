export interface StaticLab {
  id: string;
  name: string;
  slug: string;
  logoSlug: string;
  description: string;
  website: string;
  headquarters: string;
  foundedYear: number;
  verified: boolean;
}

export interface StaticProvider {
  id: string;
  name: string;
  slug: string;
  logoSlug: string;
  type: "FIRST_PARTY" | "INFERENCE_CLOUD";
  description: string;
  website: string;
  regions: string[];
  slaTier: string;
  uptime30d: number;
}

export interface StaticEndpoint {
  id: string;
  modelId: string;
  providerId: string;
  provider: StaticProvider;
  inputPricePer1M: number;
  outputPricePer1M: number;
  cacheInputPricePer1M: number | null;
  latencyMs: number;
  throughputTps: number;
  uptimePct: number;
  contextLimit: number;
  isDefault: boolean;
}

export interface StaticBenchmark {
  id: string;
  modelId: string;
  benchmarkName: string;
  category: "REASONING" | "CODING" | "GENERAL" | "AGENTIC";
  score: number;
  maxScore: number;
}

export interface StaticModel {
  id: string;
  name: string;
  slug: string;
  labId: string;
  lab: StaticLab;
  modality: "TEXT" | "MULTIMODAL" | "IMAGE" | "EMBEDDING";
  modelType: "CHAT" | "REASONING" | "CODE";
  isOpenWeights: boolean;
  license: string;
  contextWindow: number;
  maxOutputTokens: number;
  trainingCutoff: string;
  capabilities: string[];
  supportsCaching: boolean;
  releaseDate: string;
  description: string;
  compositeScore: number;
  rankCurrent: number;
  rankPrevious: number;
  usageDelta7d: number;
  sparkline7d: number[];
  endpoints: StaticEndpoint[];
  benchmarks: StaticBenchmark[];
}

export const STATIC_LABS: StaticLab[] = [
  {
    id: "lab-openai",
    name: "OpenAI",
    slug: "openai",
    logoSlug: "openai",
    description: "Pioneer in frontier foundation models, reinforcement learning, and agentic reasoning systems.",
    website: "https://openai.com",
    headquarters: "San Francisco, CA, USA",
    foundedYear: 2015,
    verified: true,
  },
  {
    id: "lab-anthropic",
    name: "Anthropic",
    slug: "anthropic",
    logoSlug: "anthropic",
    description: "AI safety and research company building reliable, interpretable, and steerable AI systems (Claude).",
    website: "https://anthropic.com",
    headquarters: "San Francisco, CA, USA",
    foundedYear: 2021,
    verified: true,
  },
  {
    id: "lab-google-deepmind",
    name: "Google DeepMind",
    slug: "google-deepmind",
    logoSlug: "google",
    description: "Alphabet's world-leading artificial intelligence research laboratory developing Gemini foundation models.",
    website: "https://deepmind.google",
    headquarters: "London, United Kingdom",
    foundedYear: 2010,
    verified: true,
  },
  {
    id: "lab-meta-ai",
    name: "Meta AI",
    slug: "meta-ai",
    logoSlug: "meta",
    description: "Champion of open-weights frontier AI, developing the Llama family and open multimodal foundations.",
    website: "https://ai.meta.com",
    headquarters: "Menlo Park, CA, USA",
    foundedYear: 2013,
    verified: true,
  },
  {
    id: "lab-deepseek",
    name: "DeepSeek",
    slug: "deepseek",
    logoSlug: "deepseek",
    description: "High-efficiency AI research lab pioneering Mixture-of-Experts architectures and open reasoning models.",
    website: "https://deepseek.com",
    headquarters: "Hangzhou, Zhejiang, China",
    foundedYear: 2023,
    verified: true,
  },
  {
    id: "lab-mistral-ai",
    name: "Mistral AI",
    slug: "mistral-ai",
    logoSlug: "mistral",
    description: "European champion in open and portable generative AI models with high inference efficiency.",
    website: "https://mistral.ai",
    headquarters: "Paris, France",
    foundedYear: 2023,
    verified: true,
  },
  {
    id: "lab-alibaba-qwen",
    name: "Alibaba Qwen",
    slug: "alibaba-qwen",
    logoSlug: "qwen",
    description: "Alibaba Cloud's advanced intelligence research group creator of the multilingual Qwen model series.",
    website: "https://qwenlm.github.io",
    headquarters: "Hangzhou, Zhejiang, China",
    foundedYear: 2023,
    verified: true,
  },
  {
    id: "lab-xai",
    name: "xAI",
    slug: "xai",
    logoSlug: "xai",
    description: "Building artificial intelligence to accelerate human scientific discovery, creator of Grok.",
    website: "https://x.ai",
    headquarters: "Palo Alto, CA, USA",
    foundedYear: 2023,
    verified: true,
  },
];

export const STATIC_PROVIDERS: StaticProvider[] = [
  {
    id: "prov-openai-direct",
    name: "OpenAI Direct",
    slug: "openai-direct",
    logoSlug: "openai",
    type: "FIRST_PARTY",
    description: "Direct API access to OpenAI flagship models with priority tiering, fine-tuning, and low-latency WebSockets.",
    website: "https://platform.openai.com",
    regions: ["us-east-1", "us-west-2", "eu-west-1", "ap-southeast-1"],
    slaTier: "99.95%",
    uptime30d: 99.97,
  },
  {
    id: "prov-anthropic-direct",
    name: "Anthropic Direct",
    slug: "anthropic-direct",
    logoSlug: "anthropic",
    type: "FIRST_PARTY",
    description: "First-party Claude API featuring native prompt caching, extended thinking budgets, and tool use.",
    website: "https://docs.anthropic.com",
    regions: ["us-east-1", "us-west-2", "eu-central-1"],
    slaTier: "99.95%",
    uptime30d: 99.96,
  },
  {
    id: "prov-google-vertex-ai",
    name: "Google Vertex AI",
    slug: "google-vertex-ai",
    logoSlug: "google-cloud",
    type: "FIRST_PARTY",
    description: "Google Cloud enterprise AI platform offering Gemini models with grounding, compliance, and global SLA.",
    website: "https://cloud.google.com/vertex-ai",
    regions: ["us-central1", "europe-west4", "asia-east1", "us-east4", "southamerica-east1"],
    slaTier: "99.99%",
    uptime30d: 99.99,
  },
  {
    id: "prov-deepseek-direct",
    name: "DeepSeek Direct",
    slug: "deepseek-direct",
    logoSlug: "deepseek",
    type: "FIRST_PARTY",
    description: "Official high-throughput inference platform for DeepSeek-R2 and V3 models with discounted off-peak pricing.",
    website: "https://platform.deepseek.com",
    regions: ["ap-east-1", "ap-southeast-1", "eu-west-1"],
    slaTier: "99.90%",
    uptime30d: 99.92,
  },
  {
    id: "prov-aws-bedrock",
    name: "AWS Bedrock",
    slug: "aws-bedrock",
    logoSlug: "aws",
    type: "INFERENCE_CLOUD",
    description: "Fully managed service offering Claude, Llama, and Mistral models with enterprise VPC security and guardrails.",
    website: "https://aws.amazon.com/bedrock",
    regions: ["us-east-1", "us-west-2", "eu-west-1", "ap-northeast-1", "ca-central-1"],
    slaTier: "99.99%",
    uptime30d: 99.98,
  },
  {
    id: "prov-azure-ai-foundry",
    name: "Azure AI Foundry",
    slug: "azure-ai-foundry",
    logoSlug: "azure",
    type: "INFERENCE_CLOUD",
    description: "Enterprise hosting for OpenAI, Meta Llama, and Mistral with SOC2 compliance and regional data residency.",
    website: "https://azure.microsoft.com/products/ai-foundry",
    regions: ["eastus2", "swedencentral", "westus3", "japaneast", "australiaeast"],
    slaTier: "99.99%",
    uptime30d: 99.99,
  },
  {
    id: "prov-groq",
    name: "Groq",
    slug: "groq",
    logoSlug: "groq",
    type: "INFERENCE_CLOUD",
    description: "LPU Inference Engine delivering lightning-fast token generation for open-weight models at 300-800+ TPS.",
    website: "https://groq.com",
    regions: ["us-central-1", "us-west-1", "eu-west-1"],
    slaTier: "99.90%",
    uptime30d: 99.94,
  },
  {
    id: "prov-together-ai",
    name: "Together AI",
    slug: "together-ai",
    logoSlug: "together",
    type: "INFERENCE_CLOUD",
    description: "Fast cloud inference platform with custom speculative decoding, low cost per token, and fine-tuning support.",
    website: "https://together.ai",
    regions: ["us-east-1", "us-west-1", "eu-central-1"],
    slaTier: "99.90%",
    uptime30d: 99.93,
  },
  {
    id: "prov-fireworks-ai",
    name: "Fireworks AI",
    slug: "fireworks-ai",
    logoSlug: "fireworks",
    type: "INFERENCE_CLOUD",
    description: "Production inference platform optimized for compound AI systems, function calling, and structured JSON generation.",
    website: "https://fireworks.ai",
    regions: ["us-east-1", "us-west-2", "eu-west-1"],
    slaTier: "99.95%",
    uptime30d: 99.95,
  },
];

const labLookup = new Map(STATIC_LABS.map((l) => [l.slug, l]));
const provLookup = new Map(STATIC_PROVIDERS.map((p) => [p.slug, p]));

function createModel(
  id: string,
  slug: string,
  name: string,
  labSlug: string,
  modality: "TEXT" | "MULTIMODAL" | "IMAGE" | "EMBEDDING",
  modelType: "CHAT" | "REASONING" | "CODE",
  isOpenWeights: boolean,
  license: string,
  contextWindow: number,
  maxOutputTokens: number,
  trainingCutoff: string,
  capabilities: string[],
  supportsCaching: boolean,
  releaseDate: string,
  description: string,
  compositeScore: number,
  rankCurrent: number,
  rankPrevious: number,
  usageDelta7d: number,
  sparkline7d: number[],
  endpointsConfig: Array<{
    provSlug: string;
    input: number;
    output: number;
    cache?: number;
    latency: number;
    tps: number;
    uptime: number;
    limit: number;
    isDefault: boolean;
  }>,
  benchmarksConfig: Array<{
    name: string;
    category: "REASONING" | "CODING" | "GENERAL" | "AGENTIC";
    score: number;
    maxScore: number;
  }> = []
): StaticModel {
  const lab = labLookup.get(labSlug)!;
  const endpoints: StaticEndpoint[] = endpointsConfig.map((ep, idx) => {
    const provider = provLookup.get(ep.provSlug)!;
    return {
      id: `${id}-ep-${idx + 1}`,
      modelId: id,
      providerId: provider.id,
      provider,
      inputPricePer1M: ep.input,
      outputPricePer1M: ep.output,
      cacheInputPricePer1M: ep.cache ?? null,
      latencyMs: ep.latency,
      throughputTps: ep.tps,
      uptimePct: ep.uptime,
      contextLimit: ep.limit,
      isDefault: ep.isDefault,
    };
  });

  const benchmarks: StaticBenchmark[] = benchmarksConfig.map((bm, idx) => ({
    id: `${id}-bm-${idx + 1}`,
    modelId: id,
    benchmarkName: bm.name,
    category: bm.category,
    score: bm.score,
    maxScore: bm.maxScore,
  }));

  return {
    id,
    slug,
    name,
    labId: lab.id,
    lab,
    modality,
    modelType,
    isOpenWeights,
    license,
    contextWindow,
    maxOutputTokens,
    trainingCutoff,
    capabilities,
    supportsCaching,
    releaseDate,
    description,
    compositeScore,
    rankCurrent,
    rankPrevious,
    usageDelta7d,
    sparkline7d,
    endpoints,
    benchmarks,
  };
}

export const STATIC_MODELS: StaticModel[] = [
  createModel(
    "model-1", "claude-4-5-sonnet", "Claude 4.5 Sonnet", "anthropic", "MULTIMODAL", "CHAT",
    false, "Proprietary", 1000000, 64000, "October 2025",
    ["tool_calling", "vision", "json_mode", "streaming", "prompt_caching", "reasoning"],
    true, "2026-01-15T00:00:00Z",
    "Anthropic's flagship model balancing state-of-the-art coding, vision analysis, and rapid execution.",
    94.5, 1, 2, 42.8, [91.2, 92.0, 93.1, 93.8, 94.0, 94.2, 94.5],
    [
      { provSlug: "anthropic-direct", input: 3.0, output: 15.0, cache: 0.3, latency: 195, tps: 95, uptime: 99.98, limit: 1000000, isDefault: true },
      { provSlug: "aws-bedrock", input: 3.0, output: 15.0, cache: 0.3, latency: 220, tps: 88, uptime: 99.99, limit: 1000000, isDefault: false },
      { provSlug: "azure-ai-foundry", input: 3.1, output: 15.2, cache: 0.35, latency: 240, tps: 82, uptime: 99.97, limit: 1000000, isDefault: false },
    ],
    [
      { name: "SWE-bench Verified", category: "CODING", score: 72.4, maxScore: 100 },
      { name: "MMLU-Pro", category: "GENERAL", score: 88.6, maxScore: 100 },
      { name: "GPQA Diamond", category: "REASONING", score: 71.8, maxScore: 100 },
      { name: "LiveCodeBench", category: "CODING", score: 68.9, maxScore: 100 },
      { name: "Arena Elo", category: "GENERAL", score: 1412, maxScore: 1500 },
    ]
  ),
  createModel(
    "model-2", "claude-4-1-opus", "Claude 4.1 Opus", "anthropic", "MULTIMODAL", "REASONING",
    false, "Proprietary", 1000000, 64000, "September 2025",
    ["tool_calling", "vision", "json_mode", "streaming", "prompt_caching", "reasoning"],
    true, "2025-11-20T00:00:00Z",
    "Deep research and creative reasoning flagship capable of multi-hour autonomous system synthesis.",
    93.8, 2, 1, -4.2, [94.1, 94.0, 93.9, 93.9, 93.8, 93.8, 93.8],
    [
      { provSlug: "anthropic-direct", input: 15.0, output: 75.0, cache: 1.5, latency: 420, tps: 48, uptime: 99.96, limit: 1000000, isDefault: true },
      { provSlug: "aws-bedrock", input: 15.0, output: 75.0, cache: 1.5, latency: 460, tps: 45, uptime: 99.98, limit: 1000000, isDefault: false },
    ],
    [
      { name: "SWE-bench Verified", category: "CODING", score: 69.5, maxScore: 100 },
      { name: "MMLU-Pro", category: "GENERAL", score: 90.2, maxScore: 100 },
      { name: "GPQA Diamond", category: "REASONING", score: 73.1, maxScore: 100 },
      { name: "LiveCodeBench", category: "CODING", score: 66.4, maxScore: 100 },
      { name: "Arena Elo", category: "GENERAL", score: 1404, maxScore: 1500 },
    ]
  ),
  createModel(
    "model-3", "gpt-5", "GPT-5 Thinking System", "openai", "MULTIMODAL", "REASONING",
    false, "Proprietary", 1000000, 128000, "November 2025",
    ["tool_calling", "vision", "json_mode", "streaming", "prompt_caching", "reasoning"],
    true, "2026-01-28T00:00:00Z",
    "OpenAI's next-generation multimodal model with native test-time compute scaling and autonomous tool loop.",
    93.4, 3, 4, 58.6, [89.0, 90.2, 91.5, 92.1, 92.8, 93.1, 93.4],
    [
      { provSlug: "openai-direct", input: 5.0, output: 20.0, cache: 0.75, latency: 310, tps: 65, uptime: 99.97, limit: 1000000, isDefault: true },
      { provSlug: "azure-ai-foundry", input: 5.0, output: 20.0, cache: 0.75, latency: 330, tps: 62, uptime: 99.99, limit: 1000000, isDefault: false },
    ],
    [
      { name: "SWE-bench Verified", category: "CODING", score: 73.8, maxScore: 100 },
      { name: "MMLU-Pro", category: "GENERAL", score: 89.5, maxScore: 100 },
      { name: "GPQA Diamond", category: "REASONING", score: 74.5, maxScore: 100 },
      { name: "LiveCodeBench", category: "CODING", score: 71.2, maxScore: 100 },
      { name: "Arena Elo", category: "GENERAL", score: 1408, maxScore: 1500 },
    ]
  ),
  createModel(
    "model-4", "gemini-2-5-pro", "Gemini 2.5 Pro", "google-deepmind", "MULTIMODAL", "CHAT",
    false, "Proprietary", 2000000, 64000, "December 2025",
    ["tool_calling", "vision", "json_mode", "streaming", "prompt_caching", "reasoning"],
    true, "2026-02-05T00:00:00Z",
    "2M token context window champion with state-of-the-art audio/video comprehension and complex reasoning.",
    92.9, 4, 3, 14.1, [92.0, 92.2, 92.5, 92.6, 92.7, 92.8, 92.9],
    [
      { provSlug: "google-vertex-ai", input: 2.5, output: 10.0, cache: 0.25, latency: 250, tps: 90, uptime: 99.99, limit: 2000000, isDefault: true },
    ],
    [
      { name: "SWE-bench Verified", category: "CODING", score: 68.2, maxScore: 100 },
      { name: "MMLU-Pro", category: "GENERAL", score: 89.1, maxScore: 100 },
      { name: "GPQA Diamond", category: "REASONING", score: 70.9, maxScore: 100 },
      { name: "LiveCodeBench", category: "CODING", score: 67.5, maxScore: 100 },
      { name: "Arena Elo", category: "GENERAL", score: 1395, maxScore: 1500 },
    ]
  ),
  createModel(
    "model-5", "deepseek-r2", "DeepSeek-R2", "deepseek", "TEXT", "REASONING",
    true, "MIT", 128000, 64000, "November 2025",
    ["tool_calling", "json_mode", "streaming", "prompt_caching", "reasoning"],
    true, "2026-01-10T00:00:00Z",
    "Open-weights reasoning powerhouse matching proprietary reasoning leaders at a fraction of compute cost.",
    92.5, 5, 6, 74.2, [87.5, 88.9, 90.2, 91.0, 91.8, 92.2, 92.5],
    [
      { provSlug: "deepseek-direct", input: 0.55, output: 2.19, cache: 0.14, latency: 260, tps: 75, uptime: 99.92, limit: 128000, isDefault: true },
      { provSlug: "together-ai", input: 0.65, output: 2.4, cache: 0.16, latency: 210, tps: 85, uptime: 99.94, limit: 128000, isDefault: false },
      { provSlug: "groq", input: 0.89, output: 2.8, latency: 68, tps: 290, uptime: 99.95, limit: 128000, isDefault: false },
      { provSlug: "fireworks-ai", input: 0.6, output: 2.3, cache: 0.15, latency: 140, tps: 110, uptime: 99.96, limit: 128000, isDefault: false },
    ],
    [
      { name: "SWE-bench Verified", category: "CODING", score: 71.0, maxScore: 100 },
      { name: "MMLU-Pro", category: "GENERAL", score: 87.8, maxScore: 100 },
      { name: "GPQA Diamond", category: "REASONING", score: 73.2, maxScore: 100 },
      { name: "LiveCodeBench", category: "CODING", score: 70.4, maxScore: 100 },
      { name: "Arena Elo", category: "GENERAL", score: 1391, maxScore: 1500 },
    ]
  ),
  createModel(
    "model-6", "o3", "o3 High-Reasoning", "openai", "TEXT", "REASONING",
    false, "Proprietary", 200000, 100000, "October 2025",
    ["tool_calling", "json_mode", "streaming", "reasoning"],
    true, "2025-12-15T00:00:00Z",
    "OpenAI's dedicated high-compute chain-of-thought system designed for competitive STEM challenges.",
    92.1, 6, 5, -2.3, [92.4, 92.4, 92.3, 92.2, 92.2, 92.1, 92.1],
    [
      { provSlug: "openai-direct", input: 10.0, output: 40.0, cache: 2.0, latency: 580, tps: 38, uptime: 99.97, limit: 200000, isDefault: true },
      { provSlug: "azure-ai-foundry", input: 10.0, output: 40.0, cache: 2.0, latency: 620, tps: 36, uptime: 99.99, limit: 200000, isDefault: false },
    ],
    [
      { name: "SWE-bench Verified", category: "CODING", score: 72.1, maxScore: 100 },
      { name: "MMLU-Pro", category: "GENERAL", score: 89.2, maxScore: 100 },
      { name: "GPQA Diamond", category: "REASONING", score: 75.4, maxScore: 100 },
      { name: "LiveCodeBench", category: "CODING", score: 69.8, maxScore: 100 },
      { name: "Arena Elo", category: "GENERAL", score: 1386, maxScore: 1500 },
    ]
  ),
  createModel(
    "model-7", "llama-4-maverick-400b", "Llama 4 Maverick 400B", "meta-ai", "MULTIMODAL", "CHAT",
    true, "Llama-4-Community", 512000, 64000, "December 2025",
    ["tool_calling", "vision", "json_mode", "streaming", "prompt_caching"],
    true, "2026-02-01T00:00:00Z",
    "Meta's flagship open multimodal foundation model delivering near-frontier intelligence on unencumbered weights.",
    91.7, 7, 9, 31.4, [88.5, 89.2, 90.1, 90.9, 91.3, 91.5, 91.7],
    [
      { provSlug: "together-ai", input: 1.8, output: 4.5, cache: 0.35, latency: 240, tps: 70, uptime: 99.94, limit: 512000, isDefault: true },
      { provSlug: "fireworks-ai", input: 1.75, output: 4.4, cache: 0.35, latency: 160, tps: 92, uptime: 99.96, limit: 512000, isDefault: false },
      { provSlug: "aws-bedrock", input: 2.0, output: 5.0, cache: 0.4, latency: 310, tps: 58, uptime: 99.98, limit: 512000, isDefault: false },
    ],
    [
      { name: "SWE-bench Verified", category: "CODING", score: 65.4, maxScore: 100 },
      { name: "MMLU-Pro", category: "GENERAL", score: 86.8, maxScore: 100 },
      { name: "GPQA Diamond", category: "REASONING", score: 68.2, maxScore: 100 },
      { name: "LiveCodeBench", category: "CODING", score: 64.9, maxScore: 100 },
      { name: "Arena Elo", category: "GENERAL", score: 1378, maxScore: 1500 },
    ]
  ),
  createModel(
    "model-8", "qwen-3-max", "Qwen 3 Max", "alibaba-qwen", "MULTIMODAL", "CHAT",
    false, "Proprietary", 256000, 32768, "January 2026",
    ["tool_calling", "vision", "json_mode", "streaming", "prompt_caching"],
    true, "2026-01-20T00:00:00Z",
    "Alibaba's premier mixture-of-experts flagship with world-class multilingual and agentic tool dispatch.",
    91.2, 8, 8, 18.5, [89.9, 90.3, 90.7, 90.9, 91.0, 91.1, 91.2],
    [
      { provSlug: "together-ai", input: 1.6, output: 6.4, cache: 0.3, latency: 220, tps: 80, uptime: 99.93, limit: 256000, isDefault: true },
      { provSlug: "fireworks-ai", input: 1.5, output: 6.0, cache: 0.28, latency: 150, tps: 98, uptime: 99.95, limit: 256000, isDefault: false },
    ],
    [
      { name: "SWE-bench Verified", category: "CODING", score: 64.1, maxScore: 100 },
      { name: "MMLU-Pro", category: "GENERAL", score: 87.2, maxScore: 100 },
      { name: "GPQA Diamond", category: "REASONING", score: 67.5, maxScore: 100 },
      { name: "LiveCodeBench", category: "CODING", score: 63.8, maxScore: 100 },
      { name: "Arena Elo", category: "GENERAL", score: 1372, maxScore: 1500 },
    ]
  ),
  createModel(
    "model-9", "grok-3-5", "Grok 3.5 Colossus", "xai", "MULTIMODAL", "REASONING",
    false, "Proprietary", 512000, 64000, "January 2026",
    ["tool_calling", "vision", "json_mode", "streaming", "reasoning"],
    true, "2026-02-12T00:00:00Z",
    "Trained on the Colossus 200k GPU cluster, offering live real-time web telemetry and robust math reasoning.",
    90.6, 9, 11, 46.2, [87.0, 88.1, 89.0, 89.5, 90.0, 90.3, 90.6],
    [
      { provSlug: "together-ai", input: 2.5, output: 10.0, cache: 0.5, latency: 290, tps: 65, uptime: 99.93, limit: 512000, isDefault: true },
      { provSlug: "aws-bedrock", input: 2.8, output: 11.2, cache: 0.55, latency: 340, tps: 58, uptime: 99.97, limit: 512000, isDefault: false },
    ],
    [
      { name: "SWE-bench Verified", category: "CODING", score: 63.9, maxScore: 100 },
      { name: "MMLU-Pro", category: "GENERAL", score: 86.4, maxScore: 100 },
      { name: "GPQA Diamond", category: "REASONING", score: 68.9, maxScore: 100 },
      { name: "LiveCodeBench", category: "CODING", score: 62.1, maxScore: 100 },
      { name: "Arena Elo", category: "GENERAL", score: 1365, maxScore: 1500 },
    ]
  ),
  createModel(
    "model-10", "mistral-large-3", "Mistral Large 3", "mistral-ai", "MULTIMODAL", "CHAT",
    false, "Proprietary", 256000, 32768, "November 2025",
    ["tool_calling", "vision", "json_mode", "streaming", "prompt_caching"],
    true, "2025-12-05T00:00:00Z",
    "Mistral's flagship enterprise model with native multilingual reasoning and low-overhead JSON schemas.",
    90.1, 10, 10, 5.3, [89.7, 89.8, 89.9, 90.0, 90.0, 90.1, 90.1],
    [
      { provSlug: "azure-ai-foundry", input: 2.0, output: 6.0, cache: 0.4, latency: 230, tps: 84, uptime: 99.98, limit: 256000, isDefault: true },
      { provSlug: "aws-bedrock", input: 2.0, output: 6.0, cache: 0.4, latency: 245, tps: 80, uptime: 99.98, limit: 256000, isDefault: false },
    ],
    [
      { name: "SWE-bench Verified", category: "CODING", score: 61.5, maxScore: 100 },
      { name: "MMLU-Pro", category: "GENERAL", score: 85.3, maxScore: 100 },
      { name: "GPQA Diamond", category: "REASONING", score: 65.8, maxScore: 100 },
      { name: "LiveCodeBench", category: "CODING", score: 61.2, maxScore: 100 },
      { name: "Arena Elo", category: "GENERAL", score: 1358, maxScore: 1500 },
    ]
  ),
  createModel(
    "model-11", "deepseek-v3-2", "DeepSeek-V3.2", "deepseek", "MULTIMODAL", "CHAT",
    true, "MIT", 256000, 32768, "December 2025",
    ["tool_calling", "vision", "json_mode", "streaming", "prompt_caching"],
    true, "2026-01-05T00:00:00Z",
    "671B parameter Mixture-of-Experts workhorse with 37B active parameters and ultra-low cost tokenomics.",
    89.6, 11, 12, 68.9, [85.0, 86.4, 87.6, 88.4, 89.0, 89.3, 89.6],
    [
      { provSlug: "deepseek-direct", input: 0.14, output: 0.28, cache: 0.03, latency: 180, tps: 90, uptime: 99.92, limit: 256000, isDefault: true },
      { provSlug: "together-ai", input: 0.25, output: 0.5, cache: 0.05, latency: 150, tps: 115, uptime: 99.94, limit: 256000, isDefault: false },
      { provSlug: "fireworks-ai", input: 0.22, output: 0.45, cache: 0.04, latency: 110, tps: 135, uptime: 99.96, limit: 256000, isDefault: false },
      { provSlug: "groq", input: 0.35, output: 0.7, latency: 45, tps: 340, uptime: 99.94, limit: 256000, isDefault: false },
    ],
    [
      { name: "SWE-bench Verified", category: "CODING", score: 62.4, maxScore: 100 },
      { name: "MMLU-Pro", category: "GENERAL", score: 85.0, maxScore: 100 },
      { name: "GPQA Diamond", category: "REASONING", score: 64.9, maxScore: 100 },
      { name: "LiveCodeBench", category: "CODING", score: 61.8, maxScore: 100 },
      { name: "Arena Elo", category: "GENERAL", score: 1352, maxScore: 1500 },
    ]
  ),
  createModel(
    "model-12", "o4-mini", "o4-mini Fast Reasoning", "openai", "MULTIMODAL", "REASONING",
    false, "Proprietary", 256000, 64000, "October 2025",
    ["tool_calling", "vision", "json_mode", "streaming", "reasoning"],
    true, "2025-11-15T00:00:00Z",
    "Distilled reasoning engine offering snappy math, coding, and logical evaluation with minimal latency.",
    89.2, 12, 7, -6.1, [91.0, 90.5, 90.1, 89.8, 89.5, 89.3, 89.2],
    [
      { provSlug: "openai-direct", input: 1.1, output: 4.4, cache: 0.28, latency: 240, tps: 110, uptime: 99.97, limit: 256000, isDefault: true },
      { provSlug: "azure-ai-foundry", input: 1.1, output: 4.4, cache: 0.28, latency: 260, tps: 102, uptime: 99.99, limit: 256000, isDefault: false },
    ],
    [
      { name: "SWE-bench Verified", category: "CODING", score: 64.0, maxScore: 100 },
      { name: "MMLU-Pro", category: "GENERAL", score: 84.7, maxScore: 100 },
      { name: "GPQA Diamond", category: "REASONING", score: 69.1, maxScore: 100 },
      { name: "LiveCodeBench", category: "CODING", score: 63.5, maxScore: 100 },
      { name: "Arena Elo", category: "GENERAL", score: 1346, maxScore: 1500 },
    ]
  ),
  createModel(
    "model-13", "gemini-2-5-flash", "Gemini 2.5 Flash", "google-deepmind", "MULTIMODAL", "CHAT",
    false, "Proprietary", 1000000, 32768, "January 2026",
    ["tool_calling", "vision", "json_mode", "streaming", "prompt_caching"],
    true, "2026-02-08T00:00:00Z",
    "High-frequency sub-second multimodal model optimized for real-time customer agents and audio chat.",
    88.7, 13, 14, 22.3, [86.8, 87.2, 87.9, 88.2, 88.5, 88.6, 88.7],
    [
      { provSlug: "google-vertex-ai", input: 0.1, output: 0.4, cache: 0.025, latency: 140, tps: 180, uptime: 99.99, limit: 1000000, isDefault: true },
    ],
    [
      { name: "SWE-bench Verified", category: "CODING", score: 58.7, maxScore: 100 },
      { name: "MMLU-Pro", category: "GENERAL", score: 83.2, maxScore: 100 },
      { name: "GPQA Diamond", category: "REASONING", score: 62.4, maxScore: 100 },
      { name: "LiveCodeBench", category: "CODING", score: 59.8, maxScore: 100 },
      { name: "Arena Elo", category: "GENERAL", score: 1339, maxScore: 1500 },
    ]
  ),
  createModel(
    "model-14", "claude-3-5-haiku", "Claude 3.5 Haiku", "anthropic", "MULTIMODAL", "CHAT",
    false, "Proprietary", 200000, 8192, "July 2025",
    ["tool_calling", "vision", "json_mode", "streaming", "prompt_caching"],
    true, "2025-10-22T00:00:00Z",
    "Ultra-fast low-cost Claude intelligence tailored for triage, classification, and background workers.",
    88.1, 14, 13, 8.7, [87.5, 87.6, 87.8, 87.9, 88.0, 88.1, 88.1],
    [
      { provSlug: "anthropic-direct", input: 0.8, output: 4.0, cache: 0.08, latency: 160, tps: 140, uptime: 99.98, limit: 200000, isDefault: true },
      { provSlug: "aws-bedrock", input: 0.8, output: 4.0, cache: 0.08, latency: 185, tps: 125, uptime: 99.99, limit: 200000, isDefault: false },
    ],
    [
      { name: "SWE-bench Verified", category: "CODING", score: 56.9, maxScore: 100 },
      { name: "MMLU-Pro", category: "GENERAL", score: 82.5, maxScore: 100 },
      { name: "GPQA Diamond", category: "REASONING", score: 61.2, maxScore: 100 },
      { name: "LiveCodeBench", category: "CODING", score: 58.1, maxScore: 100 },
      { name: "Arena Elo", category: "GENERAL", score: 1332, maxScore: 1500 },
    ]
  ),
  createModel(
    "model-15", "gpt-4-5", "GPT-4.5 Orion", "openai", "MULTIMODAL", "CHAT",
    false, "Proprietary", 128000, 16384, "August 2025",
    ["tool_calling", "vision", "json_mode", "streaming", "prompt_caching"],
    true, "2025-09-10T00:00:00Z",
    "Dense pre-trained foundation model excelling in emotional resonance, creative prose, and conversational depth.",
    87.8, 15, 15, -1.8, [88.2, 88.0, 87.9, 87.9, 87.8, 87.8, 87.8],
    [
      { provSlug: "openai-direct", input: 20.0, output: 60.0, cache: 5.0, latency: 380, tps: 52, uptime: 99.97, limit: 128000, isDefault: true },
      { provSlug: "azure-ai-foundry", input: 20.0, output: 60.0, cache: 5.0, latency: 410, tps: 50, uptime: 99.99, limit: 128000, isDefault: false },
    ],
    [
      { name: "SWE-bench Verified", category: "CODING", score: 57.2, maxScore: 100 },
      { name: "MMLU-Pro", category: "GENERAL", score: 84.1, maxScore: 100 },
      { name: "GPQA Diamond", category: "REASONING", score: 62.0, maxScore: 100 },
      { name: "LiveCodeBench", category: "CODING", score: 57.5, maxScore: 100 },
      { name: "Arena Elo", category: "GENERAL", score: 1326, maxScore: 1500 },
    ]
  ),
  createModel(
    "model-16", "codestral-2", "Codestral 2 64B", "mistral-ai", "TEXT", "CODE",
    true, "Apache-2.0", 256000, 32768, "October 2025",
    ["tool_calling", "json_mode", "streaming", "prompt_caching"],
    true, "2025-11-28T00:00:00Z",
    "Dedicated developer companion specializing in 80+ programming languages, repo-level FIM, and AST edits.",
    87.3, 16, 17, 19.4, [85.9, 86.2, 86.8, 87.0, 87.1, 87.2, 87.3],
    [
      { provSlug: "together-ai", input: 0.3, output: 0.9, cache: 0.05, latency: 170, tps: 110, uptime: 99.93, limit: 256000, isDefault: true },
      { provSlug: "fireworks-ai", input: 0.28, output: 0.85, cache: 0.04, latency: 120, tps: 135, uptime: 99.95, limit: 256000, isDefault: false },
      { provSlug: "groq", input: 0.45, output: 1.2, latency: 50, tps: 310, uptime: 99.94, limit: 256000, isDefault: false },
    ],
    [
      { name: "SWE-bench Verified", category: "CODING", score: 62.8, maxScore: 100 },
      { name: "MMLU-Pro", category: "GENERAL", score: 79.5, maxScore: 100 },
      { name: "GPQA Diamond", category: "REASONING", score: 58.4, maxScore: 100 },
      { name: "LiveCodeBench", category: "CODING", score: 65.2, maxScore: 100 },
      { name: "Arena Elo", category: "GENERAL", score: 1318, maxScore: 1500 },
    ]
  ),
  createModel(
    "model-17", "qwen-3-coder-480b", "Qwen 3 Coder 480B", "alibaba-qwen", "TEXT", "CODE",
    true, "Apache-2.0", 128000, 32768, "December 2025",
    ["tool_calling", "json_mode", "streaming", "prompt_caching"],
    true, "2026-01-18T00:00:00Z",
    "Massive open-source software engineering MoE model competitive with leading proprietary code engines.",
    86.9, 17, 16, 12.8, [85.5, 86.0, 86.4, 86.7, 86.8, 86.9, 86.9],
    [
      { provSlug: "together-ai", input: 0.75, output: 2.2, cache: 0.12, latency: 230, tps: 78, uptime: 99.92, limit: 128000, isDefault: true },
      { provSlug: "fireworks-ai", input: 0.7, output: 2.1, cache: 0.11, latency: 160, tps: 96, uptime: 99.95, limit: 128000, isDefault: false },
    ],
    [
      { name: "SWE-bench Verified", category: "CODING", score: 63.5, maxScore: 100 },
      { name: "MMLU-Pro", category: "GENERAL", score: 81.0, maxScore: 100 },
      { name: "GPQA Diamond", category: "REASONING", score: 59.1, maxScore: 100 },
      { name: "LiveCodeBench", category: "CODING", score: 66.0, maxScore: 100 },
      { name: "Arena Elo", category: "GENERAL", score: 1312, maxScore: 1500 },
    ]
  ),
  createModel(
    "model-18", "deepseek-coder-v3", "DeepSeek Coder V3", "deepseek", "TEXT", "CODE",
    true, "MIT", 128000, 32768, "October 2025",
    ["tool_calling", "json_mode", "streaming", "prompt_caching"],
    true, "2025-11-10T00:00:00Z",
    "Compact high-accuracy code model with stellar benchmark scores on human eval and automated bug triage.",
    86.4, 18, 18, 14.6, [85.0, 85.3, 85.8, 86.1, 86.2, 86.3, 86.4],
    [
      { provSlug: "deepseek-direct", input: 0.14, output: 0.28, cache: 0.03, latency: 160, tps: 100, uptime: 99.92, limit: 128000, isDefault: true },
      { provSlug: "together-ai", input: 0.2, output: 0.4, cache: 0.04, latency: 140, tps: 120, uptime: 99.94, limit: 128000, isDefault: false },
      { provSlug: "groq", input: 0.3, output: 0.6, latency: 40, tps: 360, uptime: 99.94, limit: 128000, isDefault: false },
    ],
    [
      { name: "SWE-bench Verified", category: "CODING", score: 61.9, maxScore: 100 },
      { name: "MMLU-Pro", category: "GENERAL", score: 80.2, maxScore: 100 },
      { name: "GPQA Diamond", category: "REASONING", score: 57.9, maxScore: 100 },
      { name: "LiveCodeBench", category: "CODING", score: 64.1, maxScore: 100 },
      { name: "Arena Elo", category: "GENERAL", score: 1305, maxScore: 1500 },
    ]
  ),
  createModel(
    "model-19", "llama-4-scout-70b", "Llama 4 Scout 70B", "meta-ai", "MULTIMODAL", "CHAT",
    true, "Llama-4-Community", 256000, 32768, "December 2025",
    ["tool_calling", "vision", "json_mode", "streaming", "prompt_caching"],
    true, "2026-01-30T00:00:00Z",
    "Highly versatile 70B multimodal model fitting single node H100/H200 instances for enterprise self-hosting.",
    85.9, 19, 20, 28.1, [83.9, 84.4, 84.9, 85.3, 85.6, 85.8, 85.9],
    [
      { provSlug: "together-ai", input: 0.45, output: 0.9, cache: 0.08, latency: 140, tps: 130, uptime: 99.94, limit: 256000, isDefault: true },
      { provSlug: "fireworks-ai", input: 0.4, output: 0.85, cache: 0.07, latency: 95, tps: 160, uptime: 99.96, limit: 256000, isDefault: false },
      { provSlug: "groq", input: 0.59, output: 0.99, latency: 38, tps: 420, uptime: 99.95, limit: 256000, isDefault: false },
    ],
    [
      { name: "SWE-bench Verified", category: "CODING", score: 55.4, maxScore: 100 },
      { name: "MMLU-Pro", category: "GENERAL", score: 81.3, maxScore: 100 },
      { name: "GPQA Diamond", category: "REASONING", score: 58.7, maxScore: 100 },
      { name: "LiveCodeBench", category: "CODING", score: 56.4, maxScore: 100 },
      { name: "Arena Elo", category: "GENERAL", score: 1298, maxScore: 1500 },
    ]
  ),
  createModel(
    "model-20", "gemini-2-0-flash-thinking", "Gemini 2.0 Flash Thinking", "google-deepmind", "MULTIMODAL", "REASONING",
    false, "Proprietary", 1000000, 64000, "October 2025",
    ["tool_calling", "vision", "json_mode", "streaming", "reasoning"],
    true, "2025-12-18T00:00:00Z",
    "Visible reasoning trace model offering transparent step-by-step logic and mathematical validation.",
    85.2, 20, 19, 3.4, [85.0, 85.1, 85.1, 85.2, 85.2, 85.2, 85.2],
    [
      { provSlug: "google-vertex-ai", input: 0.35, output: 1.4, cache: 0.08, latency: 290, tps: 85, uptime: 99.99, limit: 1000000, isDefault: true },
    ],
    [
      { name: "SWE-bench Verified", category: "CODING", score: 58.2, maxScore: 100 },
      { name: "MMLU-Pro", category: "GENERAL", score: 82.0, maxScore: 100 },
      { name: "GPQA Diamond", category: "REASONING", score: 63.8, maxScore: 100 },
      { name: "LiveCodeBench", category: "CODING", score: 57.0, maxScore: 100 },
      { name: "Arena Elo", category: "GENERAL", score: 1290, maxScore: 1500 },
    ]
  ),
  createModel(
    "model-21", "pixtral-2-large", "Pixtral 2 Large 124B", "mistral-ai", "MULTIMODAL", "CHAT",
    true, "Apache-2.0", 128000, 16384, "November 2025",
    ["tool_calling", "vision", "json_mode", "streaming"],
    true, "2025-12-12T00:00:00Z",
    "Multimodal frontier model capable of high-resolution diagram parsing, OCR, and geospatial imagery analysis.",
    84.7, 21, 21, 9.1, [83.8, 84.0, 84.2, 84.4, 84.5, 84.6, 84.7],
    [
      { provSlug: "together-ai", input: 0.6, output: 1.8, cache: 0.1, latency: 210, tps: 80, uptime: 99.93, limit: 128000, isDefault: true },
      { provSlug: "fireworks-ai", input: 0.55, output: 1.7, cache: 0.09, latency: 150, tps: 100, uptime: 99.95, limit: 128000, isDefault: false },
    ],
    [
      { name: "SWE-bench Verified", category: "CODING", score: 51.2, maxScore: 100 },
      { name: "MMLU-Pro", category: "GENERAL", score: 79.4, maxScore: 100 },
      { name: "GPQA Diamond", category: "REASONING", score: 54.8, maxScore: 100 },
      { name: "LiveCodeBench", category: "CODING", score: 52.3, maxScore: 100 },
      { name: "Arena Elo", category: "GENERAL", score: 1282, maxScore: 1500 },
    ]
  ),
  createModel(
    "model-22", "llama-3-3-70b-instruct", "Llama 3.3 70B Instruct", "meta-ai", "TEXT", "CHAT",
    true, "Llama-4-Community", 128000, 16384, "October 2024",
    ["tool_calling", "json_mode", "streaming"],
    true, "2024-12-06T00:00:00Z",
    "Reliable industry-standard open weights instruction model for production classification, summarization, and RAG.",
    83.9, 22, 22, -5.4, [84.5, 84.2, 84.1, 84.0, 84.0, 83.9, 83.9],
    [
      { provSlug: "groq", input: 0.59, output: 0.79, latency: 36, tps: 390, uptime: 99.95, limit: 128000, isDefault: true },
      { provSlug: "together-ai", input: 0.4, output: 0.8, cache: 0.08, latency: 130, tps: 130, uptime: 99.94, limit: 128000, isDefault: false },
      { provSlug: "fireworks-ai", input: 0.38, output: 0.76, cache: 0.07, latency: 90, tps: 155, uptime: 99.96, limit: 128000, isDefault: false },
    ],
    [
      { name: "SWE-bench Verified", category: "CODING", score: 48.9, maxScore: 100 },
      { name: "MMLU-Pro", category: "GENERAL", score: 77.2, maxScore: 100 },
      { name: "GPQA Diamond", category: "REASONING", score: 52.4, maxScore: 100 },
      { name: "LiveCodeBench", category: "CODING", score: 49.8, maxScore: 100 },
      { name: "Arena Elo", category: "GENERAL", score: 1274, maxScore: 1500 },
    ]
  ),
  createModel(
    "model-23", "qwen-2-5-72b-instruct", "Qwen 2.5 72B Instruct", "alibaba-qwen", "TEXT", "CHAT",
    true, "Apache-2.0", 128000, 16384, "September 2024",
    ["tool_calling", "json_mode", "streaming"],
    true, "2024-09-19T00:00:00Z",
    "Versatile multilingual model with exceptionally strong Chinese, English, coding, and mathematical reasoning.",
    83.2, 23, 23, -3.2, [83.6, 83.5, 83.4, 83.3, 83.3, 83.2, 83.2],
    [
      { provSlug: "together-ai", input: 0.35, output: 0.7, cache: 0.07, latency: 145, tps: 125, uptime: 99.93, limit: 128000, isDefault: true },
      { provSlug: "fireworks-ai", input: 0.33, output: 0.66, cache: 0.06, latency: 95, tps: 150, uptime: 99.95, limit: 128000, isDefault: false },
    ],
    [
      { name: "SWE-bench Verified", category: "CODING", score: 47.5, maxScore: 100 },
      { name: "MMLU-Pro", category: "GENERAL", score: 76.5, maxScore: 100 },
      { name: "GPQA Diamond", category: "REASONING", score: 51.8, maxScore: 100 },
      { name: "LiveCodeBench", category: "CODING", score: 48.9, maxScore: 100 },
      { name: "Arena Elo", category: "GENERAL", score: 1265, maxScore: 1500 },
    ]
  ),
  createModel(
    "model-24", "grok-3-mini", "Grok 3 Mini", "xai", "TEXT", "REASONING",
    false, "Proprietary", 128000, 32768, "January 2026",
    ["tool_calling", "json_mode", "streaming", "reasoning"],
    true, "2026-02-15T00:00:00Z",
    "Compact reasoning model from xAI tuned for rapid STEM validation and low-overhead verification loops.",
    82.5, 24, 25, 17.2, [80.5, 81.0, 81.6, 81.9, 82.1, 82.3, 82.5],
    [
      { provSlug: "together-ai", input: 0.4, output: 1.6, cache: 0.08, latency: 190, tps: 110, uptime: 99.92, limit: 128000, isDefault: true },
    ],
    [
      { name: "SWE-bench Verified", category: "CODING", score: 50.1, maxScore: 100 },
      { name: "MMLU-Pro", category: "GENERAL", score: 75.8, maxScore: 100 },
      { name: "GPQA Diamond", category: "REASONING", score: 56.2, maxScore: 100 },
      { name: "LiveCodeBench", category: "CODING", score: 51.0, maxScore: 100 },
      { name: "Arena Elo", category: "GENERAL", score: 1258, maxScore: 1500 },
    ]
  ),
  createModel(
    "model-25", "deepseek-vl-2", "DeepSeek-VL-2 38B", "deepseek", "MULTIMODAL", "CHAT",
    true, "MIT", 128000, 16384, "November 2025",
    ["vision", "json_mode", "streaming"],
    true, "2025-12-20T00:00:00Z",
    "Specialized visual language model for chart reasoning, industrial inspection, and dense document OCR.",
    81.8, 25, 24, 2.1, [81.5, 81.6, 81.6, 81.7, 81.7, 81.8, 81.8],
    [
      { provSlug: "deepseek-direct", input: 0.2, output: 0.5, cache: 0.04, latency: 195, tps: 85, uptime: 99.92, limit: 128000, isDefault: true },
      { provSlug: "together-ai", input: 0.28, output: 0.65, cache: 0.05, latency: 160, tps: 98, uptime: 99.94, limit: 128000, isDefault: false },
    ],
    [
      { name: "MMLU-Pro", category: "GENERAL", score: 74.2, maxScore: 100 },
      { name: "GPQA Diamond", category: "REASONING", score: 48.9, maxScore: 100 },
      { name: "Arena Elo", category: "GENERAL", score: 1245, maxScore: 1500 },
    ]
  ),
  createModel(
    "model-26", "openai-dall-e-4", "DALL-E 4 Photoreal", "openai", "IMAGE", "CHAT",
    false, "Proprietary", 32768, 8192, "October 2025",
    ["vision", "streaming"],
    false, "2025-11-05T00:00:00Z",
    "State-of-the-art text-to-image synthesis engine with native typography rendering, lighting physics, and inpainting.",
    79.5, 26, 26, 6.8, [78.9, 79.1, 79.2, 79.3, 79.4, 79.5, 79.5],
    [
      { provSlug: "openai-direct", input: 35.0, output: 70.0, latency: 1850, tps: 18, uptime: 99.96, limit: 32768, isDefault: true },
      { provSlug: "azure-ai-foundry", input: 35.0, output: 70.0, latency: 1920, tps: 17, uptime: 99.98, limit: 32768, isDefault: false },
    ]
  ),
  createModel(
    "model-27", "google-imagen-4-ultra", "Imagen 4 Ultra", "google-deepmind", "IMAGE", "CHAT",
    false, "Proprietary", 32768, 8192, "November 2025",
    ["vision", "streaming"],
    false, "2025-12-01T00:00:00Z",
    "DeepMind's enterprise photorealism generator with SynthID watermarking and commercial indemnity.",
    78.9, 27, 27, 8.5, [78.2, 78.4, 78.5, 78.7, 78.8, 78.8, 78.9],
    [
      { provSlug: "google-vertex-ai", input: 30.0, output: 65.0, latency: 1750, tps: 20, uptime: 99.99, limit: 32768, isDefault: true },
    ]
  ),
  createModel(
    "model-28", "meta-flux-chameleon-2", "FLUX-Chameleon 2", "meta-ai", "IMAGE", "CHAT",
    true, "Apache-2.0", 32768, 8192, "December 2025",
    ["vision"],
    false, "2026-01-12T00:00:00Z",
    "Open diffusion transformer model capable of producing 4K cinema-grade visual assets in under 2 seconds.",
    77.4, 28, 28, 19.3, [75.8, 76.2, 76.8, 77.0, 77.2, 77.3, 77.4],
    [
      { provSlug: "together-ai", input: 15.0, output: 30.0, latency: 950, tps: 35, uptime: 99.93, limit: 32768, isDefault: true },
      { provSlug: "fireworks-ai", input: 14.5, output: 28.0, latency: 780, tps: 42, uptime: 99.95, limit: 32768, isDefault: false },
    ]
  ),
  createModel(
    "model-29", "openai-text-embedding-4", "text-embedding-4-large", "openai", "EMBEDDING", "CHAT",
    false, "Proprietary", 32768, 8192, "October 2025",
    ["streaming"],
    false, "2025-11-12T00:00:00Z",
    "3072-dimension dense embedding vector model with Matryoshka representation learning for fast semantic search.",
    74.0, 29, 29, 11.2, [73.5, 73.6, 73.8, 73.8, 73.9, 74.0, 74.0],
    [
      { provSlug: "openai-direct", input: 0.05, output: 0.0, latency: 45, tps: 450, uptime: 99.98, limit: 32768, isDefault: true },
      { provSlug: "azure-ai-foundry", input: 0.05, output: 0.0, latency: 48, tps: 430, uptime: 99.99, limit: 32768, isDefault: false },
    ]
  ),
  createModel(
    "model-30", "google-gecko-embedding-v2", "Gecko-Embedding-v2", "google-deepmind", "EMBEDDING", "CHAT",
    false, "Proprietary", 32768, 8192, "November 2025",
    ["streaming"],
    false, "2025-12-08T00:00:00Z",
    "Compact high-fidelity embedding model optimized for multi-billion vector indices and cross-lingual retrieval.",
    72.8, 30, 30, 5.8, [72.2, 72.4, 72.5, 72.6, 72.7, 72.8, 72.8],
    [
      { provSlug: "google-vertex-ai", input: 0.04, output: 0.0, latency: 42, tps: 480, uptime: 99.99, limit: 32768, isDefault: true },
    ]
  ),
  createModel(
    "model-31", "meta-llama-vision-embed-2", "Llama-Vision-Embed-2", "meta-ai", "EMBEDDING", "CHAT",
    true, "Llama-4-Community", 32768, 8192, "December 2025",
    ["vision"],
    false, "2026-01-22T00:00:00Z",
    "Joint image-text multimodal embedding space designed for zero-shot image search and visual RAG systems.",
    70.5, 31, 31, 15.4, [69.5, 69.8, 70.0, 70.2, 70.3, 70.4, 70.5],
    [
      { provSlug: "together-ai", input: 0.06, output: 0.0, latency: 55, tps: 380, uptime: 99.93, limit: 32768, isDefault: true },
      { provSlug: "fireworks-ai", input: 0.055, output: 0.0, latency: 46, tps: 410, uptime: 99.95, limit: 32768, isDefault: false },
    ]
  ),
  createModel(
    "model-32", "mistral-embed-2", "Mistral Embed 2", "mistral-ai", "EMBEDDING", "CHAT",
    true, "Apache-2.0", 32768, 8192, "October 2025",
    ["streaming"],
    false, "2025-11-18T00:00:00Z",
    "High-speed semantic embedding model tailored for European multilingual compliance and code retrieval.",
    68.2, 32, 32, 2.5, [67.8, 67.9, 68.0, 68.1, 68.1, 68.2, 68.2],
    [
      { provSlug: "together-ai", input: 0.035, output: 0.0, latency: 38, tps: 520, uptime: 99.94, limit: 32768, isDefault: true },
      { provSlug: "fireworks-ai", input: 0.03, output: 0.0, latency: 32, tps: 560, uptime: 99.96, limit: 32768, isDefault: false },
    ]
  ),
];
