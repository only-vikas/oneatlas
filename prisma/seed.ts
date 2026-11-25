import { randomUUID } from "node:crypto";
import "dotenv/config";
import postgres from "@prisma/orm-postgres/runtime";
import { and } from "@prisma/orm-postgres/orm-client";
import { contractFromJson } from "@prisma/orm-postgres/static";
import type { Contract } from "../src/prisma/contract";
import contractJson from "../src/prisma/contract.json" with { type: "json" };

const ProviderType = {
  FIRST_PARTY: "FIRST_PARTY",
  INFERENCE_CLOUD: "INFERENCE_CLOUD",
} as const;
type ProviderType = (typeof ProviderType)[keyof typeof ProviderType];
const Modality = {
  TEXT: "TEXT",
  MULTIMODAL: "MULTIMODAL",
  IMAGE: "IMAGE",
  EMBEDDING: "EMBEDDING",
} as const;
type Modality = (typeof Modality)[keyof typeof Modality];
const ModelType = {
  CHAT: "CHAT",
  REASONING: "REASONING",
  CODE: "CODE",
} as const;
type ModelType = (typeof ModelType)[keyof typeof ModelType];
const BenchmarkCategory = {
  REASONING: "REASONING",
  CODING: "CODING",
  GENERAL: "GENERAL",
  AGENTIC: "AGENTIC",
} as const;
type BenchmarkCategory = (typeof BenchmarkCategory)[keyof typeof BenchmarkCategory];

const db = postgres({
  contract: contractFromJson<Contract>(contractJson),
  url: process.env["DATABASE_URL"]!,
});

let idCounter = 0;
function createId(): string {
  idCounter += 1;
  return `c${Date.now().toString(36)}${idCounter.toString(36)}${randomUUID()
    .replace(/-/g, "")
    .slice(0, 8)}`;
}

// ============================================================================
// 1. 8 AI RESEARCH LABS
// ============================================================================
const LABS = [
  {
    name: "OpenAI",
    slug: "openai",
    logoSlug: "openai",
    description:
      "Pioneer in frontier foundation models, reinforcement learning, and agentic reasoning systems.",
    website: "https://openai.com",
    headquarters: "San Francisco, CA, USA",
    foundedYear: 2015,
    verified: true,
  },
  {
    name: "Anthropic",
    slug: "anthropic",
    logoSlug: "anthropic",
    description:
      "AI safety and research company building reliable, interpretable, and steerable AI systems (Claude).",
    website: "https://anthropic.com",
    headquarters: "San Francisco, CA, USA",
    foundedYear: 2021,
    verified: true,
  },
  {
    name: "Google DeepMind",
    slug: "google-deepmind",
    logoSlug: "google",
    description:
      "Alphabet's world-leading artificial intelligence research laboratory developing Gemini foundation models.",
    website: "https://deepmind.google",
    headquarters: "London, United Kingdom",
    foundedYear: 2010,
    verified: true,
  },
  {
    name: "Meta AI",
    slug: "meta-ai",
    logoSlug: "meta",
    description:
      "Champion of open-weights frontier AI, developing the Llama family and open multimodal foundations.",
    website: "https://ai.meta.com",
    headquarters: "Menlo Park, CA, USA",
    foundedYear: 2013,
    verified: true,
  },
  {
    name: "DeepSeek",
    slug: "deepseek",
    logoSlug: "deepseek",
    description:
      "High-efficiency AI research lab pioneering Mixture-of-Experts architectures and open reasoning models.",
    website: "https://deepseek.com",
    headquarters: "Hangzhou, Zhejiang, China",
    foundedYear: 2023,
    verified: true,
  },
  {
    name: "Mistral AI",
    slug: "mistral-ai",
    logoSlug: "mistral",
    description:
      "European champion in open and portable generative AI models with high inference efficiency.",
    website: "https://mistral.ai",
    headquarters: "Paris, France",
    foundedYear: 2023,
    verified: true,
  },
  {
    name: "Alibaba Qwen",
    slug: "alibaba-qwen",
    logoSlug: "qwen",
    description:
      "Alibaba Cloud's advanced intelligence research group creator of the multilingual Qwen model series.",
    website: "https://qwenlm.github.io",
    headquarters: "Hangzhou, Zhejiang, China",
    foundedYear: 2023,
    verified: true,
  },
  {
    name: "xAI",
    slug: "xai",
    logoSlug: "xai",
    description:
      "Building artificial intelligence to accelerate human scientific discovery, creator of Grok.",
    website: "https://x.ai",
    headquarters: "Palo Alto, CA, USA",
    foundedYear: 2023,
    verified: true,
  },
];

// ============================================================================
// 2. 9 INFERENCE PROVIDERS
// ============================================================================
const PROVIDERS = [
  // First-party
  {
    name: "OpenAI Direct",
    slug: "openai-direct",
    logoSlug: "openai",
    type: ProviderType.FIRST_PARTY,
    description:
      "Direct API access to OpenAI flagship models with priority tiering, fine-tuning, and low-latency WebSockets.",
    website: "https://platform.openai.com",
    regions: ["us-east-1", "us-west-2", "eu-west-1", "ap-southeast-1"],
    slaTier: "99.95%",
    uptime30d: 99.97,
  },
  {
    name: "Anthropic Direct",
    slug: "anthropic-direct",
    logoSlug: "anthropic",
    type: ProviderType.FIRST_PARTY,
    description:
      "First-party Claude API featuring native prompt caching, extended thinking budgets, and tool use.",
    website: "https://docs.anthropic.com",
    regions: ["us-east-1", "us-west-2", "eu-central-1"],
    slaTier: "99.95%",
    uptime30d: 99.96,
  },
  {
    name: "Google Vertex AI",
    slug: "google-vertex-ai",
    logoSlug: "google-cloud",
    type: ProviderType.FIRST_PARTY,
    description:
      "Google Cloud enterprise AI platform offering Gemini models with grounding, compliance, and global SLA.",
    website: "https://cloud.google.com/vertex-ai",
    regions: ["us-central1", "europe-west4", "asia-east1", "us-east4", "southamerica-east1"],
    slaTier: "99.99%",
    uptime30d: 99.99,
  },
  {
    name: "DeepSeek Direct",
    slug: "deepseek-direct",
    logoSlug: "deepseek",
    type: ProviderType.FIRST_PARTY,
    description:
      "Official high-throughput inference platform for DeepSeek-R2 and V3 models with discounted off-peak pricing.",
    website: "https://platform.deepseek.com",
    regions: ["ap-east-1", "ap-southeast-1", "eu-west-1"],
    slaTier: "99.90%",
    uptime30d: 99.92,
  },
  // Inference clouds
  {
    name: "AWS Bedrock",
    slug: "aws-bedrock",
    logoSlug: "aws",
    type: ProviderType.INFERENCE_CLOUD,
    description:
      "Fully managed service offering Claude, Llama, and Mistral models with enterprise VPC security and guardrails.",
    website: "https://aws.amazon.com/bedrock",
    regions: ["us-east-1", "us-west-2", "eu-west-1", "ap-northeast-1", "ca-central-1"],
    slaTier: "99.99%",
    uptime30d: 99.98,
  },
  {
    name: "Azure AI Foundry",
    slug: "azure-ai-foundry",
    logoSlug: "azure",
    type: ProviderType.INFERENCE_CLOUD,
    description:
      "Enterprise hosting for OpenAI, Meta Llama, and Mistral with SOC2 compliance and regional data residency.",
    website: "https://azure.microsoft.com/products/ai-foundry",
    regions: ["eastus2", "swedencentral", "westus3", "japaneast", "australiaeast"],
    slaTier: "99.99%",
    uptime30d: 99.99,
  },
  {
    name: "Groq",
    slug: "groq",
    logoSlug: "groq",
    type: ProviderType.INFERENCE_CLOUD,
    description:
      "LPU Inference Engine delivering lightning-fast token generation for open-weight models at 300-800+ TPS.",
    website: "https://groq.com",
    regions: ["us-central-1", "us-west-1", "eu-west-1"],
    slaTier: "99.90%",
    uptime30d: 99.94,
  },
  {
    name: "Together AI",
    slug: "together-ai",
    logoSlug: "together",
    type: ProviderType.INFERENCE_CLOUD,
    description:
      "Fast cloud inference platform with custom speculative decoding, low cost per token, and fine-tuning support.",
    website: "https://together.ai",
    regions: ["us-east-1", "us-west-1", "eu-central-1"],
    slaTier: "99.90%",
    uptime30d: 99.93,
  },
  {
    name: "Fireworks AI",
    slug: "fireworks-ai",
    logoSlug: "fireworks",
    type: ProviderType.INFERENCE_CLOUD,
    description:
      "Production inference platform optimized for compound AI systems, function calling, and structured JSON generation.",
    website: "https://fireworks.ai",
    regions: ["us-east-1", "us-west-2", "eu-west-1"],
    slaTier: "99.95%",
    uptime30d: 99.95,
  },
];

// ============================================================================
// 3. 32 REALISTIC 2026 FRONTIER & OPEN-WEIGHT MODELS
// ============================================================================
interface ModelSeedData {
  slug: string;
  name: string;
  labSlug: string;
  modality: Modality;
  modelType: ModelType;
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
  endpoints: Array<{
    providerSlug: string;
    inputPrice: number;
    outputPrice: number;
    cachePrice?: number;
    latencyMs: number;
    throughputTps: number;
    uptimePct: number;
    contextLimit: number;
    isDefault: boolean;
  }>;
  benchmarks?: Array<{
    name: string;
    category: BenchmarkCategory;
    score: number;
    maxScore: number;
  }>;
}

const MODELS: ModelSeedData[] = [
  // 1. Claude 4.5 Sonnet
  {
    slug: "claude-4-5-sonnet",
    name: "Claude 4.5 Sonnet",
    labSlug: "anthropic",
    modality: Modality.MULTIMODAL,
    modelType: ModelType.CHAT,
    isOpenWeights: false,
    license: "Proprietary",
    contextWindow: 1000000,
    maxOutputTokens: 64000,
    trainingCutoff: "October 2025",
    capabilities: ["tool_calling", "vision", "json_mode", "streaming", "prompt_caching", "reasoning"],
    supportsCaching: true,
    releaseDate: "2026-01-15T00:00:00Z",
    description: "Anthropic's flagship model balancing state-of-the-art coding, vision analysis, and rapid execution.",
    compositeScore: 94.5,
    rankCurrent: 1,
    rankPrevious: 2,
    usageDelta7d: 42.8,
    sparkline7d: [91.2, 92.0, 93.1, 93.8, 94.0, 94.2, 94.5],
    endpoints: [
      { providerSlug: "anthropic-direct", inputPrice: 3.0, outputPrice: 15.0, cachePrice: 0.3, latencyMs: 195, throughputTps: 95, uptimePct: 99.98, contextLimit: 1000000, isDefault: true },
      { providerSlug: "aws-bedrock", inputPrice: 3.0, outputPrice: 15.0, cachePrice: 0.3, latencyMs: 220, throughputTps: 88, uptimePct: 99.99, contextLimit: 1000000, isDefault: false },
      { providerSlug: "azure-ai-foundry", inputPrice: 3.1, outputPrice: 15.2, cachePrice: 0.35, latencyMs: 240, throughputTps: 82, uptimePct: 99.97, contextLimit: 1000000, isDefault: false },
    ],
    benchmarks: [
      { name: "SWE-bench Verified", category: BenchmarkCategory.CODING, score: 72.4, maxScore: 100.0 },
      { name: "MMLU-Pro", category: BenchmarkCategory.GENERAL, score: 88.6, maxScore: 100.0 },
      { name: "GPQA Diamond", category: BenchmarkCategory.REASONING, score: 71.8, maxScore: 100.0 },
      { name: "LiveCodeBench", category: BenchmarkCategory.CODING, score: 68.9, maxScore: 100.0 },
      { name: "Arena Elo", category: BenchmarkCategory.GENERAL, score: 1412.0, maxScore: 1500.0 },
    ],
  },
  // 2. Claude 4.1 Opus
  {
    slug: "claude-4-1-opus",
    name: "Claude 4.1 Opus",
    labSlug: "anthropic",
    modality: Modality.MULTIMODAL,
    modelType: ModelType.REASONING,
    isOpenWeights: false,
    license: "Proprietary",
    contextWindow: 1000000,
    maxOutputTokens: 64000,
    trainingCutoff: "September 2025",
    capabilities: ["tool_calling", "vision", "json_mode", "streaming", "prompt_caching", "reasoning"],
    supportsCaching: true,
    releaseDate: "2025-11-20T00:00:00Z",
    description: "Deep research and creative reasoning flagship capable of multi-hour autonomous system synthesis.",
    compositeScore: 93.8,
    rankCurrent: 2,
    rankPrevious: 1,
    usageDelta7d: -4.2,
    sparkline7d: [94.1, 94.0, 93.9, 93.9, 93.8, 93.8, 93.8],
    endpoints: [
      { providerSlug: "anthropic-direct", inputPrice: 15.0, outputPrice: 75.0, cachePrice: 1.5, latencyMs: 420, throughputTps: 48, uptimePct: 99.96, contextLimit: 1000000, isDefault: true },
      { providerSlug: "aws-bedrock", inputPrice: 15.0, outputPrice: 75.0, cachePrice: 1.5, latencyMs: 460, throughputTps: 45, uptimePct: 99.98, contextLimit: 1000000, isDefault: false },
    ],
    benchmarks: [
      { name: "SWE-bench Verified", category: BenchmarkCategory.CODING, score: 69.5, maxScore: 100.0 },
      { name: "MMLU-Pro", category: BenchmarkCategory.GENERAL, score: 90.2, maxScore: 100.0 },
      { name: "GPQA Diamond", category: BenchmarkCategory.REASONING, score: 73.1, maxScore: 100.0 },
      { name: "LiveCodeBench", category: BenchmarkCategory.CODING, score: 66.4, maxScore: 100.0 },
      { name: "Arena Elo", category: BenchmarkCategory.GENERAL, score: 1404.0, maxScore: 1500.0 },
    ],
  },
  // 3. GPT-5
  {
    slug: "gpt-5",
    name: "GPT-5 Thinking System",
    labSlug: "openai",
    modality: Modality.MULTIMODAL,
    modelType: ModelType.REASONING,
    isOpenWeights: false,
    license: "Proprietary",
    contextWindow: 1000000,
    maxOutputTokens: 128000,
    trainingCutoff: "November 2025",
    capabilities: ["tool_calling", "vision", "json_mode", "streaming", "prompt_caching", "reasoning"],
    supportsCaching: true,
    releaseDate: "2026-01-28T00:00:00Z",
    description: "OpenAI's next-generation multimodal model with native test-time compute scaling and autonomous tool loop.",
    compositeScore: 93.4,
    rankCurrent: 3,
    rankPrevious: 4,
    usageDelta7d: 58.6,
    sparkline7d: [89.0, 90.2, 91.5, 92.1, 92.8, 93.1, 93.4],
    endpoints: [
      { providerSlug: "openai-direct", inputPrice: 5.0, outputPrice: 20.0, cachePrice: 0.75, latencyMs: 310, throughputTps: 65, uptimePct: 99.97, contextLimit: 1000000, isDefault: true },
      { providerSlug: "azure-ai-foundry", inputPrice: 5.0, outputPrice: 20.0, cachePrice: 0.75, latencyMs: 330, throughputTps: 62, uptimePct: 99.99, contextLimit: 1000000, isDefault: false },
    ],
    benchmarks: [
      { name: "SWE-bench Verified", category: BenchmarkCategory.CODING, score: 73.8, maxScore: 100.0 },
      { name: "MMLU-Pro", category: BenchmarkCategory.GENERAL, score: 89.5, maxScore: 100.0 },
      { name: "GPQA Diamond", category: BenchmarkCategory.REASONING, score: 74.5, maxScore: 100.0 },
      { name: "LiveCodeBench", category: BenchmarkCategory.CODING, score: 71.2, maxScore: 100.0 },
      { name: "Arena Elo", category: BenchmarkCategory.GENERAL, score: 1408.0, maxScore: 1500.0 },
    ],
  },
  // 4. Gemini 2.5 Pro
  {
    slug: "gemini-2-5-pro",
    name: "Gemini 2.5 Pro",
    labSlug: "google-deepmind",
    modality: Modality.MULTIMODAL,
    modelType: ModelType.CHAT,
    isOpenWeights: false,
    license: "Proprietary",
    contextWindow: 2000000,
    maxOutputTokens: 64000,
    trainingCutoff: "December 2025",
    capabilities: ["tool_calling", "vision", "json_mode", "streaming", "prompt_caching", "reasoning"],
    supportsCaching: true,
    releaseDate: "2026-02-05T00:00:00Z",
    description: "2M token context window champion with state-of-the-art audio/video comprehension and complex reasoning.",
    compositeScore: 92.9,
    rankCurrent: 4,
    rankPrevious: 3,
    usageDelta7d: 14.1,
    sparkline7d: [92.0, 92.2, 92.5, 92.6, 92.7, 92.8, 92.9],
    endpoints: [
      { providerSlug: "google-vertex-ai", inputPrice: 2.5, outputPrice: 10.0, cachePrice: 0.25, latencyMs: 250, throughputTps: 90, uptimePct: 99.99, contextLimit: 2000000, isDefault: true },
    ],
    benchmarks: [
      { name: "SWE-bench Verified", category: BenchmarkCategory.CODING, score: 68.2, maxScore: 100.0 },
      { name: "MMLU-Pro", category: BenchmarkCategory.GENERAL, score: 89.1, maxScore: 100.0 },
      { name: "GPQA Diamond", category: BenchmarkCategory.REASONING, score: 70.9, maxScore: 100.0 },
      { name: "LiveCodeBench", category: BenchmarkCategory.CODING, score: 67.5, maxScore: 100.0 },
      { name: "Arena Elo", category: BenchmarkCategory.GENERAL, score: 1395.0, maxScore: 1500.0 },
    ],
  },
  // 5. DeepSeek-R2
  {
    slug: "deepseek-r2",
    name: "DeepSeek-R2",
    labSlug: "deepseek",
    modality: Modality.TEXT,
    modelType: ModelType.REASONING,
    isOpenWeights: true,
    license: "MIT",
    contextWindow: 128000,
    maxOutputTokens: 64000,
    trainingCutoff: "November 2025",
    capabilities: ["tool_calling", "json_mode", "streaming", "prompt_caching", "reasoning"],
    supportsCaching: true,
    releaseDate: "2026-01-10T00:00:00Z",
    description: "Open-weights reasoning powerhouse matching proprietary reasoning leaders at a fraction of compute cost.",
    compositeScore: 92.5,
    rankCurrent: 5,
    rankPrevious: 6,
    usageDelta7d: 74.2,
    sparkline7d: [87.5, 88.9, 90.2, 91.0, 91.8, 92.2, 92.5],
    endpoints: [
      { providerSlug: "deepseek-direct", inputPrice: 0.55, outputPrice: 2.19, cachePrice: 0.14, latencyMs: 260, throughputTps: 75, uptimePct: 99.92, contextLimit: 128000, isDefault: true },
      { providerSlug: "together-ai", inputPrice: 0.65, outputPrice: 2.4, cachePrice: 0.16, latencyMs: 210, throughputTps: 85, uptimePct: 99.94, contextLimit: 128000, isDefault: false },
      { providerSlug: "groq", inputPrice: 0.89, outputPrice: 2.8, latencyMs: 68, throughputTps: 290, uptimePct: 99.95, contextLimit: 128000, isDefault: false },
      { providerSlug: "fireworks-ai", inputPrice: 0.6, outputPrice: 2.3, cachePrice: 0.15, latencyMs: 140, throughputTps: 110, uptimePct: 99.96, contextLimit: 128000, isDefault: false },
    ],
    benchmarks: [
      { name: "SWE-bench Verified", category: BenchmarkCategory.CODING, score: 71.0, maxScore: 100.0 },
      { name: "MMLU-Pro", category: BenchmarkCategory.GENERAL, score: 87.8, maxScore: 100.0 },
      { name: "GPQA Diamond", category: BenchmarkCategory.REASONING, score: 73.2, maxScore: 100.0 },
      { name: "LiveCodeBench", category: BenchmarkCategory.CODING, score: 70.4, maxScore: 100.0 },
      { name: "Arena Elo", category: BenchmarkCategory.GENERAL, score: 1391.0, maxScore: 1500.0 },
    ],
  },
  // 6. o3
  {
    slug: "o3",
    name: "o3 High-Reasoning",
    labSlug: "openai",
    modality: Modality.TEXT,
    modelType: ModelType.REASONING,
    isOpenWeights: false,
    license: "Proprietary",
    contextWindow: 200000,
    maxOutputTokens: 100000,
    trainingCutoff: "October 2025",
    capabilities: ["tool_calling", "json_mode", "streaming", "reasoning"],
    supportsCaching: true,
    releaseDate: "2025-12-15T00:00:00Z",
    description: "OpenAI's dedicated high-compute chain-of-thought system designed for competitive STEM challenges.",
    compositeScore: 92.1,
    rankCurrent: 6,
    rankPrevious: 5,
    usageDelta7d: -2.3,
    sparkline7d: [92.4, 92.4, 92.3, 92.2, 92.2, 92.1, 92.1],
    endpoints: [
      { providerSlug: "openai-direct", inputPrice: 10.0, outputPrice: 40.0, cachePrice: 2.0, latencyMs: 580, throughputTps: 38, uptimePct: 99.97, contextLimit: 200000, isDefault: true },
      { providerSlug: "azure-ai-foundry", inputPrice: 10.0, outputPrice: 40.0, cachePrice: 2.0, latencyMs: 620, throughputTps: 36, uptimePct: 99.99, contextLimit: 200000, isDefault: false },
    ],
    benchmarks: [
      { name: "SWE-bench Verified", category: BenchmarkCategory.CODING, score: 72.1, maxScore: 100.0 },
      { name: "MMLU-Pro", category: BenchmarkCategory.GENERAL, score: 89.2, maxScore: 100.0 },
      { name: "GPQA Diamond", category: BenchmarkCategory.REASONING, score: 75.4, maxScore: 100.0 },
      { name: "LiveCodeBench", category: BenchmarkCategory.CODING, score: 69.8, maxScore: 100.0 },
      { name: "Arena Elo", category: BenchmarkCategory.GENERAL, score: 1386.0, maxScore: 1500.0 },
    ],
  },
  // 7. Llama 4 Maverick 400B
  {
    slug: "llama-4-maverick-400b",
    name: "Llama 4 Maverick 400B",
    labSlug: "meta-ai",
    modality: Modality.MULTIMODAL,
    modelType: ModelType.CHAT,
    isOpenWeights: true,
    license: "Llama-4-Community",
    contextWindow: 512000,
    maxOutputTokens: 64000,
    trainingCutoff: "December 2025",
    capabilities: ["tool_calling", "vision", "json_mode", "streaming", "prompt_caching"],
    supportsCaching: true,
    releaseDate: "2026-02-01T00:00:00Z",
    description: "Meta's flagship open multimodal foundation model delivering near-frontier intelligence on unencumbered weights.",
    compositeScore: 91.7,
    rankCurrent: 7,
    rankPrevious: 9,
    usageDelta7d: 31.4,
    sparkline7d: [88.5, 89.2, 90.1, 90.9, 91.3, 91.5, 91.7],
    endpoints: [
      { providerSlug: "together-ai", inputPrice: 1.8, outputPrice: 4.5, cachePrice: 0.35, latencyMs: 240, throughputTps: 70, uptimePct: 99.94, contextLimit: 512000, isDefault: true },
      { providerSlug: "fireworks-ai", inputPrice: 1.75, outputPrice: 4.4, cachePrice: 0.35, latencyMs: 160, throughputTps: 92, uptimePct: 99.96, contextLimit: 512000, isDefault: false },
      { providerSlug: "aws-bedrock", inputPrice: 2.0, outputPrice: 5.0, cachePrice: 0.4, latencyMs: 310, throughputTps: 58, uptimePct: 99.98, contextLimit: 512000, isDefault: false },
      { providerSlug: "azure-ai-foundry", inputPrice: 2.0, outputPrice: 5.0, cachePrice: 0.4, latencyMs: 320, throughputTps: 56, uptimePct: 99.98, contextLimit: 512000, isDefault: false },
    ],
    benchmarks: [
      { name: "SWE-bench Verified", category: BenchmarkCategory.CODING, score: 65.4, maxScore: 100.0 },
      { name: "MMLU-Pro", category: BenchmarkCategory.GENERAL, score: 86.8, maxScore: 100.0 },
      { name: "GPQA Diamond", category: BenchmarkCategory.REASONING, score: 68.2, maxScore: 100.0 },
      { name: "LiveCodeBench", category: BenchmarkCategory.CODING, score: 64.9, maxScore: 100.0 },
      { name: "Arena Elo", category: BenchmarkCategory.GENERAL, score: 1378.0, maxScore: 1500.0 },
    ],
  },
  // 8. Qwen 3 Max
  {
    slug: "qwen-3-max",
    name: "Qwen 3 Max",
    labSlug: "alibaba-qwen",
    modality: Modality.MULTIMODAL,
    modelType: ModelType.CHAT,
    isOpenWeights: false,
    license: "Proprietary",
    contextWindow: 256000,
    maxOutputTokens: 32768,
    trainingCutoff: "January 2026",
    capabilities: ["tool_calling", "vision", "json_mode", "streaming", "prompt_caching"],
    supportsCaching: true,
    releaseDate: "2026-01-20T00:00:00Z",
    description: "Alibaba's premier mixture-of-experts flagship with world-class multilingual and agentic tool dispatch.",
    compositeScore: 91.2,
    rankCurrent: 8,
    rankPrevious: 8,
    usageDelta7d: 18.5,
    sparkline7d: [89.9, 90.3, 90.7, 90.9, 91.0, 91.1, 91.2],
    endpoints: [
      { providerSlug: "together-ai", inputPrice: 1.6, outputPrice: 6.4, cachePrice: 0.3, latencyMs: 220, throughputTps: 80, uptimePct: 99.93, contextLimit: 256000, isDefault: true },
      { providerSlug: "fireworks-ai", inputPrice: 1.5, outputPrice: 6.0, cachePrice: 0.28, latencyMs: 150, throughputTps: 98, uptimePct: 99.95, contextLimit: 256000, isDefault: false },
    ],
    benchmarks: [
      { name: "SWE-bench Verified", category: BenchmarkCategory.CODING, score: 64.1, maxScore: 100.0 },
      { name: "MMLU-Pro", category: BenchmarkCategory.GENERAL, score: 87.2, maxScore: 100.0 },
      { name: "GPQA Diamond", category: BenchmarkCategory.REASONING, score: 67.5, maxScore: 100.0 },
      { name: "LiveCodeBench", category: BenchmarkCategory.CODING, score: 63.8, maxScore: 100.0 },
      { name: "Arena Elo", category: BenchmarkCategory.GENERAL, score: 1372.0, maxScore: 1500.0 },
    ],
  },
  // 9. Grok 3.5
  {
    slug: "grok-3-5",
    name: "Grok 3.5 Colossus",
    labSlug: "xai",
    modality: Modality.MULTIMODAL,
    modelType: ModelType.REASONING,
    isOpenWeights: false,
    license: "Proprietary",
    contextWindow: 512000,
    maxOutputTokens: 64000,
    trainingCutoff: "January 2026",
    capabilities: ["tool_calling", "vision", "json_mode", "streaming", "reasoning"],
    supportsCaching: true,
    releaseDate: "2026-02-12T00:00:00Z",
    description: "Trained on the Colossus 200k GPU cluster, offering live real-time web telemetry and robust math reasoning.",
    compositeScore: 90.6,
    rankCurrent: 9,
    rankPrevious: 11,
    usageDelta7d: 46.2,
    sparkline7d: [87.0, 88.1, 89.0, 89.5, 90.0, 90.3, 90.6],
    endpoints: [
      { providerSlug: "together-ai", inputPrice: 2.5, outputPrice: 10.0, cachePrice: 0.5, latencyMs: 290, throughputTps: 65, uptimePct: 99.93, contextLimit: 512000, isDefault: true },
      { providerSlug: "aws-bedrock", inputPrice: 2.8, outputPrice: 11.2, cachePrice: 0.55, latencyMs: 340, throughputTps: 58, uptimePct: 99.97, contextLimit: 512000, isDefault: false },
    ],
    benchmarks: [
      { name: "SWE-bench Verified", category: BenchmarkCategory.CODING, score: 63.9, maxScore: 100.0 },
      { name: "MMLU-Pro", category: BenchmarkCategory.GENERAL, score: 86.4, maxScore: 100.0 },
      { name: "GPQA Diamond", category: BenchmarkCategory.REASONING, score: 68.9, maxScore: 100.0 },
      { name: "LiveCodeBench", category: BenchmarkCategory.CODING, score: 62.1, maxScore: 100.0 },
      { name: "Arena Elo", category: BenchmarkCategory.GENERAL, score: 1365.0, maxScore: 1500.0 },
    ],
  },
  // 10. Mistral Large 3
  {
    slug: "mistral-large-3",
    name: "Mistral Large 3",
    labSlug: "mistral-ai",
    modality: Modality.MULTIMODAL,
    modelType: ModelType.CHAT,
    isOpenWeights: false,
    license: "Proprietary",
    contextWindow: 256000,
    maxOutputTokens: 32768,
    trainingCutoff: "November 2025",
    capabilities: ["tool_calling", "vision", "json_mode", "streaming", "prompt_caching"],
    supportsCaching: true,
    releaseDate: "2025-12-05T00:00:00Z",
    description: "Mistral's flagship enterprise model with native multilingual reasoning and low-overhead JSON schemas.",
    compositeScore: 90.1,
    rankCurrent: 10,
    rankPrevious: 10,
    usageDelta7d: 5.3,
    sparkline7d: [89.7, 89.8, 89.9, 90.0, 90.0, 90.1, 90.1],
    endpoints: [
      { providerSlug: "azure-ai-foundry", inputPrice: 2.0, outputPrice: 6.0, cachePrice: 0.4, latencyMs: 230, throughputTps: 84, uptimePct: 99.98, contextLimit: 256000, isDefault: true },
      { providerSlug: "aws-bedrock", inputPrice: 2.0, outputPrice: 6.0, cachePrice: 0.4, latencyMs: 245, throughputTps: 80, uptimePct: 99.98, contextLimit: 256000, isDefault: false },
    ],
    benchmarks: [
      { name: "SWE-bench Verified", category: BenchmarkCategory.CODING, score: 61.5, maxScore: 100.0 },
      { name: "MMLU-Pro", category: BenchmarkCategory.GENERAL, score: 85.3, maxScore: 100.0 },
      { name: "GPQA Diamond", category: BenchmarkCategory.REASONING, score: 65.8, maxScore: 100.0 },
      { name: "LiveCodeBench", category: BenchmarkCategory.CODING, score: 61.2, maxScore: 100.0 },
      { name: "Arena Elo", category: BenchmarkCategory.GENERAL, score: 1358.0, maxScore: 1500.0 },
    ],
  },
  // 11. DeepSeek-V3.2
  {
    slug: "deepseek-v3-2",
    name: "DeepSeek-V3.2",
    labSlug: "deepseek",
    modality: Modality.MULTIMODAL,
    modelType: ModelType.CHAT,
    isOpenWeights: true,
    license: "MIT",
    contextWindow: 256000,
    maxOutputTokens: 32768,
    trainingCutoff: "December 2025",
    capabilities: ["tool_calling", "vision", "json_mode", "streaming", "prompt_caching"],
    supportsCaching: true,
    releaseDate: "2026-01-05T00:00:00Z",
    description: "671B parameter Mixture-of-Experts workhorse with 37B active parameters and ultra-low cost tokenomics.",
    compositeScore: 89.6,
    rankCurrent: 11,
    rankPrevious: 12,
    usageDelta7d: 68.9,
    sparkline7d: [85.0, 86.4, 87.6, 88.4, 89.0, 89.3, 89.6],
    endpoints: [
      { providerSlug: "deepseek-direct", inputPrice: 0.14, outputPrice: 0.28, cachePrice: 0.03, latencyMs: 180, throughputTps: 90, uptimePct: 99.92, contextLimit: 256000, isDefault: true },
      { providerSlug: "together-ai", inputPrice: 0.25, outputPrice: 0.5, cachePrice: 0.05, latencyMs: 150, throughputTps: 115, uptimePct: 99.94, contextLimit: 256000, isDefault: false },
      { providerSlug: "fireworks-ai", inputPrice: 0.22, outputPrice: 0.45, cachePrice: 0.04, latencyMs: 110, throughputTps: 135, uptimePct: 99.96, contextLimit: 256000, isDefault: false },
      { providerSlug: "groq", inputPrice: 0.35, outputPrice: 0.7, latencyMs: 45, throughputTps: 340, uptimePct: 99.94, contextLimit: 256000, isDefault: false },
    ],
    benchmarks: [
      { name: "SWE-bench Verified", category: BenchmarkCategory.CODING, score: 62.4, maxScore: 100.0 },
      { name: "MMLU-Pro", category: BenchmarkCategory.GENERAL, score: 85.0, maxScore: 100.0 },
      { name: "GPQA Diamond", category: BenchmarkCategory.REASONING, score: 64.9, maxScore: 100.0 },
      { name: "LiveCodeBench", category: BenchmarkCategory.CODING, score: 61.8, maxScore: 100.0 },
      { name: "Arena Elo", category: BenchmarkCategory.GENERAL, score: 1352.0, maxScore: 1500.0 },
    ],
  },
  // 12. o4-mini
  {
    slug: "o4-mini",
    name: "o4-mini Fast Reasoning",
    labSlug: "openai",
    modality: Modality.MULTIMODAL,
    modelType: ModelType.REASONING,
    isOpenWeights: false,
    license: "Proprietary",
    contextWindow: 256000,
    maxOutputTokens: 64000,
    trainingCutoff: "October 2025",
    capabilities: ["tool_calling", "vision", "json_mode", "streaming", "reasoning"],
    supportsCaching: true,
    releaseDate: "2025-11-15T00:00:00Z",
    description: "Distilled reasoning engine offering snappy math, coding, and logical evaluation with minimal latency.",
    compositeScore: 89.2,
    rankCurrent: 12,
    rankPrevious: 7,
    usageDelta7d: -6.1,
    sparkline7d: [91.0, 90.5, 90.1, 89.8, 89.5, 89.3, 89.2],
    endpoints: [
      { providerSlug: "openai-direct", inputPrice: 1.1, outputPrice: 4.4, cachePrice: 0.28, latencyMs: 240, throughputTps: 110, uptimePct: 99.97, contextLimit: 256000, isDefault: true },
      { providerSlug: "azure-ai-foundry", inputPrice: 1.1, outputPrice: 4.4, cachePrice: 0.28, latencyMs: 260, throughputTps: 102, uptimePct: 99.99, contextLimit: 256000, isDefault: false },
    ],
    benchmarks: [
      { name: "SWE-bench Verified", category: BenchmarkCategory.CODING, score: 64.0, maxScore: 100.0 },
      { name: "MMLU-Pro", category: BenchmarkCategory.GENERAL, score: 84.7, maxScore: 100.0 },
      { name: "GPQA Diamond", category: BenchmarkCategory.REASONING, score: 69.1, maxScore: 100.0 },
      { name: "LiveCodeBench", category: BenchmarkCategory.CODING, score: 63.5, maxScore: 100.0 },
      { name: "Arena Elo", category: BenchmarkCategory.GENERAL, score: 1346.0, maxScore: 1500.0 },
    ],
  },
  // 13. Gemini 2.5 Flash
  {
    slug: "gemini-2-5-flash",
    name: "Gemini 2.5 Flash",
    labSlug: "google-deepmind",
    modality: Modality.MULTIMODAL,
    modelType: ModelType.CHAT,
    isOpenWeights: false,
    license: "Proprietary",
    contextWindow: 1000000,
    maxOutputTokens: 32768,
    trainingCutoff: "January 2026",
    capabilities: ["tool_calling", "vision", "json_mode", "streaming", "prompt_caching"],
    supportsCaching: true,
    releaseDate: "2026-02-08T00:00:00Z",
    description: "High-frequency sub-second multimodal model optimized for real-time customer agents and audio chat.",
    compositeScore: 88.7,
    rankCurrent: 13,
    rankPrevious: 14,
    usageDelta7d: 22.3,
    sparkline7d: [86.8, 87.2, 87.9, 88.2, 88.5, 88.6, 88.7],
    endpoints: [
      { providerSlug: "google-vertex-ai", inputPrice: 0.1, outputPrice: 0.4, cachePrice: 0.025, latencyMs: 140, throughputTps: 180, uptimePct: 99.99, contextLimit: 1000000, isDefault: true },
    ],
    benchmarks: [
      { name: "SWE-bench Verified", category: BenchmarkCategory.CODING, score: 58.7, maxScore: 100.0 },
      { name: "MMLU-Pro", category: BenchmarkCategory.GENERAL, score: 83.2, maxScore: 100.0 },
      { name: "GPQA Diamond", category: BenchmarkCategory.REASONING, score: 62.4, maxScore: 100.0 },
      { name: "LiveCodeBench", category: BenchmarkCategory.CODING, score: 59.8, maxScore: 100.0 },
      { name: "Arena Elo", category: BenchmarkCategory.GENERAL, score: 1339.0, maxScore: 1500.0 },
    ],
  },
  // 14. Claude 3.5 Haiku
  {
    slug: "claude-3-5-haiku",
    name: "Claude 3.5 Haiku",
    labSlug: "anthropic",
    modality: Modality.MULTIMODAL,
    modelType: ModelType.CHAT,
    isOpenWeights: false,
    license: "Proprietary",
    contextWindow: 200000,
    maxOutputTokens: 8192,
    trainingCutoff: "July 2025",
    capabilities: ["tool_calling", "vision", "json_mode", "streaming", "prompt_caching"],
    supportsCaching: true,
    releaseDate: "2025-10-22T00:00:00Z",
    description: "Ultra-fast low-cost Claude intelligence tailored for triage, classification, and background workers.",
    compositeScore: 88.1,
    rankCurrent: 14,
    rankPrevious: 13,
    usageDelta7d: 8.7,
    sparkline7d: [87.5, 87.6, 87.8, 87.9, 88.0, 88.1, 88.1],
    endpoints: [
      { providerSlug: "anthropic-direct", inputPrice: 0.8, outputPrice: 4.0, cachePrice: 0.08, latencyMs: 160, throughputTps: 140, uptimePct: 99.98, contextLimit: 200000, isDefault: true },
      { providerSlug: "aws-bedrock", inputPrice: 0.8, outputPrice: 4.0, cachePrice: 0.08, latencyMs: 185, throughputTps: 125, uptimePct: 99.99, contextLimit: 200000, isDefault: false },
    ],
    benchmarks: [
      { name: "SWE-bench Verified", category: BenchmarkCategory.CODING, score: 56.9, maxScore: 100.0 },
      { name: "MMLU-Pro", category: BenchmarkCategory.GENERAL, score: 82.5, maxScore: 100.0 },
      { name: "GPQA Diamond", category: BenchmarkCategory.REASONING, score: 61.2, maxScore: 100.0 },
      { name: "LiveCodeBench", category: BenchmarkCategory.CODING, score: 58.1, maxScore: 100.0 },
      { name: "Arena Elo", category: BenchmarkCategory.GENERAL, score: 1332.0, maxScore: 1500.0 },
    ],
  },
  // 15. GPT-4.5
  {
    slug: "gpt-4-5",
    name: "GPT-4.5 Orion",
    labSlug: "openai",
    modality: Modality.MULTIMODAL,
    modelType: ModelType.CHAT,
    isOpenWeights: false,
    license: "Proprietary",
    contextWindow: 128000,
    maxOutputTokens: 16384,
    trainingCutoff: "August 2025",
    capabilities: ["tool_calling", "vision", "json_mode", "streaming", "prompt_caching"],
    supportsCaching: true,
    releaseDate: "2025-09-10T00:00:00Z",
    description: "Dense pre-trained foundation model excelling in emotional resonance, creative prose, and conversational depth.",
    compositeScore: 87.8,
    rankCurrent: 15,
    rankPrevious: 15,
    usageDelta7d: -1.8,
    sparkline7d: [88.2, 88.0, 87.9, 87.9, 87.8, 87.8, 87.8],
    endpoints: [
      { providerSlug: "openai-direct", inputPrice: 20.0, outputPrice: 60.0, cachePrice: 5.0, latencyMs: 380, throughputTps: 52, uptimePct: 99.97, contextLimit: 128000, isDefault: true },
      { providerSlug: "azure-ai-foundry", inputPrice: 20.0, outputPrice: 60.0, cachePrice: 5.0, latencyMs: 410, throughputTps: 50, uptimePct: 99.99, contextLimit: 128000, isDefault: false },
    ],
    benchmarks: [
      { name: "SWE-bench Verified", category: BenchmarkCategory.CODING, score: 57.2, maxScore: 100.0 },
      { name: "MMLU-Pro", category: BenchmarkCategory.GENERAL, score: 84.1, maxScore: 100.0 },
      { name: "GPQA Diamond", category: BenchmarkCategory.REASONING, score: 62.0, maxScore: 100.0 },
      { name: "LiveCodeBench", category: BenchmarkCategory.CODING, score: 57.5, maxScore: 100.0 },
      { name: "Arena Elo", category: BenchmarkCategory.GENERAL, score: 1326.0, maxScore: 1500.0 },
    ],
  },
  // 16. Codestral 2
  {
    slug: "codestral-2",
    name: "Codestral 2 64B",
    labSlug: "mistral-ai",
    modality: Modality.TEXT,
    modelType: ModelType.CODE,
    isOpenWeights: true,
    license: "Apache-2.0",
    contextWindow: 256000,
    maxOutputTokens: 32768,
    trainingCutoff: "October 2025",
    capabilities: ["tool_calling", "json_mode", "streaming", "prompt_caching"],
    supportsCaching: true,
    releaseDate: "2025-11-28T00:00:00Z",
    description: "Dedicated developer companion specializing in 80+ programming languages, repo-level FIM, and AST edits.",
    compositeScore: 87.3,
    rankCurrent: 16,
    rankPrevious: 17,
    usageDelta7d: 19.4,
    sparkline7d: [85.9, 86.2, 86.8, 87.0, 87.1, 87.2, 87.3],
    endpoints: [
      { providerSlug: "together-ai", inputPrice: 0.3, outputPrice: 0.9, cachePrice: 0.05, latencyMs: 170, throughputTps: 110, uptimePct: 99.93, contextLimit: 256000, isDefault: true },
      { providerSlug: "fireworks-ai", inputPrice: 0.28, outputPrice: 0.85, cachePrice: 0.04, latencyMs: 120, throughputTps: 135, uptimePct: 99.95, contextLimit: 256000, isDefault: false },
      { providerSlug: "groq", inputPrice: 0.45, outputPrice: 1.2, latencyMs: 50, throughputTps: 310, uptimePct: 99.94, contextLimit: 256000, isDefault: false },
    ],
    benchmarks: [
      { name: "SWE-bench Verified", category: BenchmarkCategory.CODING, score: 62.8, maxScore: 100.0 },
      { name: "MMLU-Pro", category: BenchmarkCategory.GENERAL, score: 79.5, maxScore: 100.0 },
      { name: "GPQA Diamond", category: BenchmarkCategory.REASONING, score: 58.4, maxScore: 100.0 },
      { name: "LiveCodeBench", category: BenchmarkCategory.CODING, score: 65.2, maxScore: 100.0 },
      { name: "Arena Elo", category: BenchmarkCategory.GENERAL, score: 1318.0, maxScore: 1500.0 },
    ],
  },
  // 17. Qwen 3 Coder 480B
  {
    slug: "qwen-3-coder-480b",
    name: "Qwen 3 Coder 480B",
    labSlug: "alibaba-qwen",
    modality: Modality.TEXT,
    modelType: ModelType.CODE,
    isOpenWeights: true,
    license: "Apache-2.0",
    contextWindow: 128000,
    maxOutputTokens: 32768,
    trainingCutoff: "December 2025",
    capabilities: ["tool_calling", "json_mode", "streaming", "prompt_caching"],
    supportsCaching: true,
    releaseDate: "2026-01-18T00:00:00Z",
    description: "Massive open-source software engineering MoE model competitive with leading proprietary code engines.",
    compositeScore: 86.9,
    rankCurrent: 17,
    rankPrevious: 16,
    usageDelta7d: 12.8,
    sparkline7d: [85.5, 86.0, 86.4, 86.7, 86.8, 86.9, 86.9],
    endpoints: [
      { providerSlug: "together-ai", inputPrice: 0.75, outputPrice: 2.2, cachePrice: 0.12, latencyMs: 230, throughputTps: 78, uptimePct: 99.92, contextLimit: 128000, isDefault: true },
      { providerSlug: "fireworks-ai", inputPrice: 0.7, outputPrice: 2.1, cachePrice: 0.11, latencyMs: 160, throughputTps: 96, uptimePct: 99.95, contextLimit: 128000, isDefault: false },
    ],
    benchmarks: [
      { name: "SWE-bench Verified", category: BenchmarkCategory.CODING, score: 63.5, maxScore: 100.0 },
      { name: "MMLU-Pro", category: BenchmarkCategory.GENERAL, score: 81.0, maxScore: 100.0 },
      { name: "GPQA Diamond", category: BenchmarkCategory.REASONING, score: 59.1, maxScore: 100.0 },
      { name: "LiveCodeBench", category: BenchmarkCategory.CODING, score: 66.0, maxScore: 100.0 },
      { name: "Arena Elo", category: BenchmarkCategory.GENERAL, score: 1312.0, maxScore: 1500.0 },
    ],
  },
  // 18. DeepSeek-Coder-V3
  {
    slug: "deepseek-coder-v3",
    name: "DeepSeek Coder V3",
    labSlug: "deepseek",
    modality: Modality.TEXT,
    modelType: ModelType.CODE,
    isOpenWeights: true,
    license: "MIT",
    contextWindow: 128000,
    maxOutputTokens: 32768,
    trainingCutoff: "October 2025",
    capabilities: ["tool_calling", "json_mode", "streaming", "prompt_caching"],
    supportsCaching: true,
    releaseDate: "2025-11-10T00:00:00Z",
    description: "Compact high-accuracy code model with stellar benchmark scores on human eval and automated bug triage.",
    compositeScore: 86.4,
    rankCurrent: 18,
    rankPrevious: 18,
    usageDelta7d: 14.6,
    sparkline7d: [85.0, 85.3, 85.8, 86.1, 86.2, 86.3, 86.4],
    endpoints: [
      { providerSlug: "deepseek-direct", inputPrice: 0.14, outputPrice: 0.28, cachePrice: 0.03, latencyMs: 160, throughputTps: 100, uptimePct: 99.92, contextLimit: 128000, isDefault: true },
      { providerSlug: "together-ai", inputPrice: 0.2, outputPrice: 0.4, cachePrice: 0.04, latencyMs: 140, throughputTps: 120, uptimePct: 99.94, contextLimit: 128000, isDefault: false },
      { providerSlug: "groq", inputPrice: 0.3, outputPrice: 0.6, latencyMs: 40, throughputTps: 360, uptimePct: 99.94, contextLimit: 128000, isDefault: false },
    ],
    benchmarks: [
      { name: "SWE-bench Verified", category: BenchmarkCategory.CODING, score: 61.9, maxScore: 100.0 },
      { name: "MMLU-Pro", category: BenchmarkCategory.GENERAL, score: 80.2, maxScore: 100.0 },
      { name: "GPQA Diamond", category: BenchmarkCategory.REASONING, score: 57.9, maxScore: 100.0 },
      { name: "LiveCodeBench", category: BenchmarkCategory.CODING, score: 64.1, maxScore: 100.0 },
      { name: "Arena Elo", category: BenchmarkCategory.GENERAL, score: 1305.0, maxScore: 1500.0 },
    ],
  },
  // 19. Llama 4 Scout 70B
  {
    slug: "llama-4-scout-70b",
    name: "Llama 4 Scout 70B",
    labSlug: "meta-ai",
    modality: Modality.MULTIMODAL,
    modelType: ModelType.CHAT,
    isOpenWeights: true,
    license: "Llama-4-Community",
    contextWindow: 256000,
    maxOutputTokens: 32768,
    trainingCutoff: "December 2025",
    capabilities: ["tool_calling", "vision", "json_mode", "streaming", "prompt_caching"],
    supportsCaching: true,
    releaseDate: "2026-01-30T00:00:00Z",
    description: "Highly versatile 70B multimodal model fitting single node H100/H200 instances for enterprise self-hosting.",
    compositeScore: 85.9,
    rankCurrent: 19,
    rankPrevious: 20,
    usageDelta7d: 28.1,
    sparkline7d: [83.9, 84.4, 84.9, 85.3, 85.6, 85.8, 85.9],
    endpoints: [
      { providerSlug: "together-ai", inputPrice: 0.45, outputPrice: 0.9, cachePrice: 0.08, latencyMs: 140, throughputTps: 130, uptimePct: 99.94, contextLimit: 256000, isDefault: true },
      { providerSlug: "fireworks-ai", inputPrice: 0.4, outputPrice: 0.85, cachePrice: 0.07, latencyMs: 95, throughputTps: 160, uptimePct: 99.96, contextLimit: 256000, isDefault: false },
      { providerSlug: "groq", inputPrice: 0.59, outputPrice: 0.99, latencyMs: 38, throughputTps: 420, uptimePct: 99.95, contextLimit: 256000, isDefault: false },
    ],
    benchmarks: [
      { name: "SWE-bench Verified", category: BenchmarkCategory.CODING, score: 55.4, maxScore: 100.0 },
      { name: "MMLU-Pro", category: BenchmarkCategory.GENERAL, score: 81.3, maxScore: 100.0 },
      { name: "GPQA Diamond", category: BenchmarkCategory.REASONING, score: 58.7, maxScore: 100.0 },
      { name: "LiveCodeBench", category: BenchmarkCategory.CODING, score: 56.4, maxScore: 100.0 },
      { name: "Arena Elo", category: BenchmarkCategory.GENERAL, score: 1298.0, maxScore: 1500.0 },
    ],
  },
  // 20. Gemini 2.0 Flash Thinking
  {
    slug: "gemini-2-0-flash-thinking",
    name: "Gemini 2.0 Flash Thinking",
    labSlug: "google-deepmind",
    modality: Modality.MULTIMODAL,
    modelType: ModelType.REASONING,
    isOpenWeights: false,
    license: "Proprietary",
    contextWindow: 1000000,
    maxOutputTokens: 64000,
    trainingCutoff: "October 2025",
    capabilities: ["tool_calling", "vision", "json_mode", "streaming", "reasoning"],
    supportsCaching: true,
    releaseDate: "2025-12-18T00:00:00Z",
    description: "Visible reasoning trace model offering transparent step-by-step logic and mathematical validation.",
    compositeScore: 85.2,
    rankCurrent: 20,
    rankPrevious: 19,
    usageDelta7d: 3.4,
    sparkline7d: [85.0, 85.1, 85.1, 85.2, 85.2, 85.2, 85.2],
    endpoints: [
      { providerSlug: "google-vertex-ai", inputPrice: 0.35, outputPrice: 1.4, cachePrice: 0.08, latencyMs: 290, throughputTps: 85, uptimePct: 99.99, contextLimit: 1000000, isDefault: true },
    ],
    benchmarks: [
      { name: "SWE-bench Verified", category: BenchmarkCategory.CODING, score: 58.2, maxScore: 100.0 },
      { name: "MMLU-Pro", category: BenchmarkCategory.GENERAL, score: 82.0, maxScore: 100.0 },
      { name: "GPQA Diamond", category: BenchmarkCategory.REASONING, score: 63.8, maxScore: 100.0 },
      { name: "LiveCodeBench", category: BenchmarkCategory.CODING, score: 57.0, maxScore: 100.0 },
      { name: "Arena Elo", category: BenchmarkCategory.GENERAL, score: 1290.0, maxScore: 1500.0 },
    ],
  },
  // 21. Pixtral 2 Large
  {
    slug: "pixtral-2-large",
    name: "Pixtral 2 Large 124B",
    labSlug: "mistral-ai",
    modality: Modality.MULTIMODAL,
    modelType: ModelType.CHAT,
    isOpenWeights: true,
    license: "Apache-2.0",
    contextWindow: 128000,
    maxOutputTokens: 16384,
    trainingCutoff: "November 2025",
    capabilities: ["tool_calling", "vision", "json_mode", "streaming"],
    supportsCaching: true,
    releaseDate: "2025-12-12T00:00:00Z",
    description: "Multimodal frontier model capable of high-resolution diagram parsing, OCR, and geospatial imagery analysis.",
    compositeScore: 84.7,
    rankCurrent: 21,
    rankPrevious: 21,
    usageDelta7d: 9.1,
    sparkline7d: [83.8, 84.0, 84.2, 84.4, 84.5, 84.6, 84.7],
    endpoints: [
      { providerSlug: "together-ai", inputPrice: 0.6, outputPrice: 1.8, cachePrice: 0.1, latencyMs: 210, throughputTps: 80, uptimePct: 99.93, contextLimit: 128000, isDefault: true },
      { providerSlug: "fireworks-ai", inputPrice: 0.55, outputPrice: 1.7, cachePrice: 0.09, latencyMs: 150, throughputTps: 100, uptimePct: 99.95, contextLimit: 128000, isDefault: false },
    ],
    benchmarks: [
      { name: "SWE-bench Verified", category: BenchmarkCategory.CODING, score: 51.2, maxScore: 100.0 },
      { name: "MMLU-Pro", category: BenchmarkCategory.GENERAL, score: 79.4, maxScore: 100.0 },
      { name: "GPQA Diamond", category: BenchmarkCategory.REASONING, score: 54.8, maxScore: 100.0 },
      { name: "LiveCodeBench", category: BenchmarkCategory.CODING, score: 52.3, maxScore: 100.0 },
      { name: "Arena Elo", category: BenchmarkCategory.GENERAL, score: 1282.0, maxScore: 1500.0 },
    ],
  },
  // 22. Llama 3.3 70B Instruct
  {
    slug: "llama-3-3-70b-instruct",
    name: "Llama 3.3 70B Instruct",
    labSlug: "meta-ai",
    modality: Modality.TEXT,
    modelType: ModelType.CHAT,
    isOpenWeights: true,
    license: "Llama-4-Community",
    contextWindow: 128000,
    maxOutputTokens: 16384,
    trainingCutoff: "October 2024",
    capabilities: ["tool_calling", "json_mode", "streaming"],
    supportsCaching: true,
    releaseDate: "2024-12-06T00:00:00Z",
    description: "Reliable industry-standard open weights instruction model for production classification, summarization, and RAG.",
    compositeScore: 83.9,
    rankCurrent: 22,
    rankPrevious: 22,
    usageDelta7d: -5.4,
    sparkline7d: [84.5, 84.2, 84.1, 84.0, 84.0, 83.9, 83.9],
    endpoints: [
      { providerSlug: "groq", inputPrice: 0.59, outputPrice: 0.79, latencyMs: 36, throughputTps: 390, uptimePct: 99.95, contextLimit: 128000, isDefault: true },
      { providerSlug: "together-ai", inputPrice: 0.4, outputPrice: 0.8, cachePrice: 0.08, latencyMs: 130, throughputTps: 130, uptimePct: 99.94, contextLimit: 128000, isDefault: false },
      { providerSlug: "fireworks-ai", inputPrice: 0.38, outputPrice: 0.76, cachePrice: 0.07, latencyMs: 90, throughputTps: 155, uptimePct: 99.96, contextLimit: 128000, isDefault: false },
    ],
    benchmarks: [
      { name: "SWE-bench Verified", category: BenchmarkCategory.CODING, score: 48.9, maxScore: 100.0 },
      { name: "MMLU-Pro", category: BenchmarkCategory.GENERAL, score: 77.2, maxScore: 100.0 },
      { name: "GPQA Diamond", category: BenchmarkCategory.REASONING, score: 52.4, maxScore: 100.0 },
      { name: "LiveCodeBench", category: BenchmarkCategory.CODING, score: 49.8, maxScore: 100.0 },
      { name: "Arena Elo", category: BenchmarkCategory.GENERAL, score: 1274.0, maxScore: 1500.0 },
    ],
  },
  // 23. Qwen 2.5 72B Instruct
  {
    slug: "qwen-2-5-72b-instruct",
    name: "Qwen 2.5 72B Instruct",
    labSlug: "alibaba-qwen",
    modality: Modality.TEXT,
    modelType: ModelType.CHAT,
    isOpenWeights: true,
    license: "Apache-2.0",
    contextWindow: 128000,
    maxOutputTokens: 16384,
    trainingCutoff: "September 2024",
    capabilities: ["tool_calling", "json_mode", "streaming"],
    supportsCaching: true,
    releaseDate: "2024-09-19T00:00:00Z",
    description: "Versatile multilingual model with exceptionally strong Chinese, English, coding, and mathematical reasoning.",
    compositeScore: 83.2,
    rankCurrent: 23,
    rankPrevious: 23,
    usageDelta7d: -3.2,
    sparkline7d: [83.6, 83.5, 83.4, 83.3, 83.3, 83.2, 83.2],
    endpoints: [
      { providerSlug: "together-ai", inputPrice: 0.35, outputPrice: 0.7, cachePrice: 0.07, latencyMs: 145, throughputTps: 125, uptimePct: 99.93, contextLimit: 128000, isDefault: true },
      { providerSlug: "fireworks-ai", inputPrice: 0.33, outputPrice: 0.66, cachePrice: 0.06, latencyMs: 95, throughputTps: 150, uptimePct: 99.95, contextLimit: 128000, isDefault: false },
    ],
    benchmarks: [
      { name: "SWE-bench Verified", category: BenchmarkCategory.CODING, score: 47.5, maxScore: 100.0 },
      { name: "MMLU-Pro", category: BenchmarkCategory.GENERAL, score: 76.5, maxScore: 100.0 },
      { name: "GPQA Diamond", category: BenchmarkCategory.REASONING, score: 51.8, maxScore: 100.0 },
      { name: "LiveCodeBench", category: BenchmarkCategory.CODING, score: 48.9, maxScore: 100.0 },
      { name: "Arena Elo", category: BenchmarkCategory.GENERAL, score: 1265.0, maxScore: 1500.0 },
    ],
  },
  // 24. Grok 3 Mini
  {
    slug: "grok-3-mini",
    name: "Grok 3 Mini",
    labSlug: "xai",
    modality: Modality.TEXT,
    modelType: ModelType.REASONING,
    isOpenWeights: false,
    license: "Proprietary",
    contextWindow: 128000,
    maxOutputTokens: 32768,
    trainingCutoff: "January 2026",
    capabilities: ["tool_calling", "json_mode", "streaming", "reasoning"],
    supportsCaching: true,
    releaseDate: "2026-02-15T00:00:00Z",
    description: "Compact reasoning model from xAI tuned for rapid STEM validation and low-overhead verification loops.",
    compositeScore: 82.5,
    rankCurrent: 24,
    rankPrevious: 25,
    usageDelta7d: 17.2,
    sparkline7d: [80.5, 81.0, 81.6, 81.9, 82.1, 82.3, 82.5],
    endpoints: [
      { providerSlug: "together-ai", inputPrice: 0.4, outputPrice: 1.6, cachePrice: 0.08, latencyMs: 190, throughputTps: 110, uptimePct: 99.92, contextLimit: 128000, isDefault: true },
    ],
    benchmarks: [
      { name: "SWE-bench Verified", category: BenchmarkCategory.CODING, score: 50.1, maxScore: 100.0 },
      { name: "MMLU-Pro", category: BenchmarkCategory.GENERAL, score: 75.8, maxScore: 100.0 },
      { name: "GPQA Diamond", category: BenchmarkCategory.REASONING, score: 56.2, maxScore: 100.0 },
      { name: "LiveCodeBench", category: BenchmarkCategory.CODING, score: 51.0, maxScore: 100.0 },
      { name: "Arena Elo", category: BenchmarkCategory.GENERAL, score: 1258.0, maxScore: 1500.0 },
    ],
  },
  // 25. DeepSeek-VL-2
  {
    slug: "deepseek-vl-2",
    name: "DeepSeek-VL-2 38B",
    labSlug: "deepseek",
    modality: Modality.MULTIMODAL,
    modelType: ModelType.CHAT,
    isOpenWeights: true,
    license: "MIT",
    contextWindow: 128000,
    maxOutputTokens: 16384,
    trainingCutoff: "November 2025",
    capabilities: ["vision", "json_mode", "streaming"],
    supportsCaching: true,
    releaseDate: "2025-12-20T00:00:00Z",
    description: "Specialized visual language model for chart reasoning, industrial inspection, and dense document OCR.",
    compositeScore: 81.8,
    rankCurrent: 25,
    rankPrevious: 24,
    usageDelta7d: 2.1,
    sparkline7d: [81.5, 81.6, 81.6, 81.7, 81.7, 81.8, 81.8],
    endpoints: [
      { providerSlug: "deepseek-direct", inputPrice: 0.2, outputPrice: 0.5, cachePrice: 0.04, latencyMs: 195, throughputTps: 85, uptimePct: 99.92, contextLimit: 128000, isDefault: true },
      { providerSlug: "together-ai", inputPrice: 0.28, outputPrice: 0.65, cachePrice: 0.05, latencyMs: 160, throughputTps: 98, uptimePct: 99.94, contextLimit: 128000, isDefault: false },
    ],
    benchmarks: [
      { name: "MMLU-Pro", category: BenchmarkCategory.GENERAL, score: 74.2, maxScore: 100.0 },
      { name: "GPQA Diamond", category: BenchmarkCategory.REASONING, score: 48.9, maxScore: 100.0 },
      { name: "Arena Elo", category: BenchmarkCategory.GENERAL, score: 1245.0, maxScore: 1500.0 },
    ],
  },
  // 26. OpenAI DALL-E 4
  {
    slug: "openai-dall-e-4",
    name: "DALL-E 4 Photoreal",
    labSlug: "openai",
    modality: Modality.IMAGE,
    modelType: ModelType.CHAT,
    isOpenWeights: false,
    license: "Proprietary",
    contextWindow: 32768,
    maxOutputTokens: 8192,
    trainingCutoff: "October 2025",
    capabilities: ["vision", "streaming"],
    supportsCaching: false,
    releaseDate: "2025-11-05T00:00:00Z",
    description: "State-of-the-art text-to-image synthesis engine with native typography rendering, lighting physics, and inpainting.",
    compositeScore: 79.5,
    rankCurrent: 26,
    rankPrevious: 26,
    usageDelta7d: 6.8,
    sparkline7d: [78.9, 79.1, 79.2, 79.3, 79.4, 79.5, 79.5],
    endpoints: [
      { providerSlug: "openai-direct", inputPrice: 35.0, outputPrice: 70.0, latencyMs: 1850, throughputTps: 18, uptimePct: 99.96, contextLimit: 32768, isDefault: true },
      { providerSlug: "azure-ai-foundry", inputPrice: 35.0, outputPrice: 70.0, latencyMs: 1920, throughputTps: 17, uptimePct: 99.98, contextLimit: 32768, isDefault: false },
    ],
  },
  // 27. Google Imagen 4 Ultra
  {
    slug: "google-imagen-4-ultra",
    name: "Imagen 4 Ultra",
    labSlug: "google-deepmind",
    modality: Modality.IMAGE,
    modelType: ModelType.CHAT,
    isOpenWeights: false,
    license: "Proprietary",
    contextWindow: 32768,
    maxOutputTokens: 8192,
    trainingCutoff: "November 2025",
    capabilities: ["vision", "streaming"],
    supportsCaching: false,
    releaseDate: "2025-12-01T00:00:00Z",
    description: "DeepMind's enterprise photorealism generator with SynthID watermarking and commercial indemnity.",
    compositeScore: 78.9,
    rankCurrent: 27,
    rankPrevious: 27,
    usageDelta7d: 8.5,
    sparkline7d: [78.2, 78.4, 78.5, 78.7, 78.8, 78.8, 78.9],
    endpoints: [
      { providerSlug: "google-vertex-ai", inputPrice: 30.0, outputPrice: 65.0, latencyMs: 1750, throughputTps: 20, uptimePct: 99.99, contextLimit: 32768, isDefault: true },
    ],
  },
  // 28. Meta FLUX-Chameleon 2
  {
    slug: "meta-flux-chameleon-2",
    name: "FLUX-Chameleon 2",
    labSlug: "meta-ai",
    modality: Modality.IMAGE,
    modelType: ModelType.CHAT,
    isOpenWeights: true,
    license: "Apache-2.0",
    contextWindow: 32768,
    maxOutputTokens: 8192,
    trainingCutoff: "December 2025",
    capabilities: ["vision"],
    supportsCaching: false,
    releaseDate: "2026-01-12T00:00:00Z",
    description: "Open diffusion transformer model capable of producing 4K cinema-grade visual assets in under 2 seconds.",
    compositeScore: 77.4,
    rankCurrent: 28,
    rankPrevious: 28,
    usageDelta7d: 19.3,
    sparkline7d: [75.8, 76.2, 76.8, 77.0, 77.2, 77.3, 77.4],
    endpoints: [
      { providerSlug: "together-ai", inputPrice: 15.0, outputPrice: 30.0, latencyMs: 950, throughputTps: 35, uptimePct: 99.93, contextLimit: 32768, isDefault: true },
      { providerSlug: "fireworks-ai", inputPrice: 14.5, outputPrice: 28.0, latencyMs: 780, throughputTps: 42, uptimePct: 99.95, contextLimit: 32768, isDefault: false },
    ],
  },
  // 29. OpenAI text-embedding-4-large
  {
    slug: "openai-text-embedding-4",
    name: "text-embedding-4-large",
    labSlug: "openai",
    modality: Modality.EMBEDDING,
    modelType: ModelType.CHAT,
    isOpenWeights: false,
    license: "Proprietary",
    contextWindow: 32768,
    maxOutputTokens: 8192,
    trainingCutoff: "October 2025",
    capabilities: ["streaming"],
    supportsCaching: false,
    releaseDate: "2025-11-12T00:00:00Z",
    description: "3072-dimension dense embedding vector model with Matryoshka representation learning for fast semantic search.",
    compositeScore: 74.0,
    rankCurrent: 29,
    rankPrevious: 29,
    usageDelta7d: 11.2,
    sparkline7d: [73.5, 73.6, 73.8, 73.8, 73.9, 74.0, 74.0],
    endpoints: [
      { providerSlug: "openai-direct", inputPrice: 0.05, outputPrice: 0.0, latencyMs: 45, throughputTps: 450, uptimePct: 99.98, contextLimit: 32768, isDefault: true },
      { providerSlug: "azure-ai-foundry", inputPrice: 0.05, outputPrice: 0.0, latencyMs: 48, throughputTps: 430, uptimePct: 99.99, contextLimit: 32768, isDefault: false },
    ],
  },
  // 30. Google Gecko-Embedding-v2
  {
    slug: "google-gecko-embedding-v2",
    name: "Gecko-Embedding-v2",
    labSlug: "google-deepmind",
    modality: Modality.EMBEDDING,
    modelType: ModelType.CHAT,
    isOpenWeights: false,
    license: "Proprietary",
    contextWindow: 32768,
    maxOutputTokens: 8192,
    trainingCutoff: "November 2025",
    capabilities: ["streaming"],
    supportsCaching: false,
    releaseDate: "2025-12-08T00:00:00Z",
    description: "Compact high-fidelity embedding model optimized for multi-billion vector indices and cross-lingual retrieval.",
    compositeScore: 72.8,
    rankCurrent: 30,
    rankPrevious: 30,
    usageDelta7d: 5.8,
    sparkline7d: [72.2, 72.4, 72.5, 72.6, 72.7, 72.8, 72.8],
    endpoints: [
      { providerSlug: "google-vertex-ai", inputPrice: 0.04, outputPrice: 0.0, latencyMs: 42, throughputTps: 480, uptimePct: 99.99, contextLimit: 32768, isDefault: true },
    ],
  },
  // 31. Meta Llama-Vision-Embed-2
  {
    slug: "meta-llama-vision-embed-2",
    name: "Llama-Vision-Embed-2",
    labSlug: "meta-ai",
    modality: Modality.EMBEDDING,
    modelType: ModelType.CHAT,
    isOpenWeights: true,
    license: "Llama-4-Community",
    contextWindow: 32768,
    maxOutputTokens: 8192,
    trainingCutoff: "December 2025",
    capabilities: ["vision"],
    supportsCaching: false,
    releaseDate: "2026-01-22T00:00:00Z",
    description: "Joint image-text multimodal embedding space designed for zero-shot image search and visual RAG systems.",
    compositeScore: 70.5,
    rankCurrent: 31,
    rankPrevious: 31,
    usageDelta7d: 15.4,
    sparkline7d: [69.5, 69.8, 70.0, 70.2, 70.3, 70.4, 70.5],
    endpoints: [
      { providerSlug: "together-ai", inputPrice: 0.06, outputPrice: 0.0, latencyMs: 55, throughputTps: 380, uptimePct: 99.93, contextLimit: 32768, isDefault: true },
      { providerSlug: "fireworks-ai", inputPrice: 0.055, outputPrice: 0.0, latencyMs: 46, throughputTps: 410, uptimePct: 99.95, contextLimit: 32768, isDefault: false },
    ],
  },
  // 32. Mistral Embed 2
  {
    slug: "mistral-embed-2",
    name: "Mistral Embed 2",
    labSlug: "mistral-ai",
    modality: Modality.EMBEDDING,
    modelType: ModelType.CHAT,
    isOpenWeights: true,
    license: "Apache-2.0",
    contextWindow: 32768,
    maxOutputTokens: 8192,
    trainingCutoff: "October 2025",
    capabilities: ["streaming"],
    supportsCaching: false,
    releaseDate: "2025-11-18T00:00:00Z",
    description: "High-speed semantic embedding model tailored for European multilingual compliance and code retrieval.",
    compositeScore: 68.2,
    rankCurrent: 32,
    rankPrevious: 32,
    usageDelta7d: 2.5,
    sparkline7d: [67.8, 67.9, 68.0, 68.1, 68.1, 68.2, 68.2],
    endpoints: [
      { providerSlug: "together-ai", inputPrice: 0.035, outputPrice: 0.0, latencyMs: 38, throughputTps: 520, uptimePct: 99.94, contextLimit: 32768, isDefault: true },
      { providerSlug: "fireworks-ai", inputPrice: 0.03, outputPrice: 0.0, latencyMs: 32, throughputTps: 560, uptimePct: 99.96, contextLimit: 32768, isDefault: false },
    ],
  },
];

// ============================================================================
// SEED RUNNER
// ============================================================================
async function main() {
  console.log("\n========================================================");
  console.log("   ONEATLAS DATABASE SEED (2026 AI Ecosystem Data)      ");
  console.log("========================================================\n");

  try {
    // 1. Seed Labs
    console.log(`[1/5] Seeding ${LABS.length} AI Research Labs...`);
    const labMap = new Map<string, string>();
    for (const lab of LABS) {
      const values = {
        name: lab.name,
        logoSlug: lab.logoSlug,
        description: lab.description,
        website: lab.website,
        headquarters: lab.headquarters,
        foundedYear: lab.foundedYear,
        verified: lab.verified,
        updatedAt: new Date(),
      };
      const existing = await db.orm.public.Lab.where((l) => l.slug.eq(lab.slug)).first();
      const record = existing
        ? ((await db.orm.public.Lab.where((l) => l.slug.eq(lab.slug)).update(values)) ??
          existing)
        : await db.orm.public.Lab.create({ ...values, slug: lab.slug, id: createId() });
      labMap.set(lab.slug, record.id);
    }
    console.log(`  ✓ ${labMap.size} Labs successfully upserted.`);

    // 2. Seed Providers
    console.log(`\n[2/5] Seeding ${PROVIDERS.length} Inference Providers...`);
    const providerMap = new Map<string, string>();
    for (const provider of PROVIDERS) {
      const values = {
        name: provider.name,
        logoSlug: provider.logoSlug,
        type: provider.type,
        description: provider.description,
        website: provider.website,
        regions: provider.regions,
        slaTier: provider.slaTier,
        uptime30d: provider.uptime30d,
        updatedAt: new Date(),
      };
      const existing = await db.orm.public.Provider.where((p) =>
        p.slug.eq(provider.slug)
      ).first();
      const record = existing
        ? ((await db.orm.public.Provider.where((p) => p.slug.eq(provider.slug)).update(values)) ??
          existing)
        : await db.orm.public.Provider.create({
            ...values,
            slug: provider.slug,
            id: createId(),
          });
      providerMap.set(provider.slug, record.id);
    }
    console.log(`  ✓ ${providerMap.size} Providers successfully upserted.`);

    // 3. Seed Models
    console.log(`\n[3/5] Seeding ${MODELS.length} Models...`);
    let totalEndpoints = 0;
    let totalBenchmarks = 0;

    for (const modelData of MODELS) {
      const labId = labMap.get(modelData.labSlug);
      if (!labId) {
        throw new Error(`Missing labId for labSlug '${modelData.labSlug}' on model '${modelData.slug}'`);
      }

      const values = {
        name: modelData.name,
        labId,
        modality: modelData.modality,
        modelType: modelData.modelType,
        isOpenWeights: modelData.isOpenWeights,
        license: modelData.license,
        contextWindow: modelData.contextWindow,
        maxOutputTokens: modelData.maxOutputTokens,
        trainingCutoff: modelData.trainingCutoff,
        capabilities: modelData.capabilities,
        supportsCaching: modelData.supportsCaching,
        releaseDate: new Date(modelData.releaseDate),
        description: modelData.description,
        compositeScore: modelData.compositeScore,
        rankCurrent: modelData.rankCurrent,
        rankPrevious: modelData.rankPrevious,
        usageDelta7d: modelData.usageDelta7d,
        sparkline7d: modelData.sparkline7d,
        updatedAt: new Date(),
      };
      const existing = await db.orm.public.Model.where((m) =>
        m.slug.eq(modelData.slug)
      ).first();
      const modelRecord = existing
        ? ((await db.orm.public.Model.where((m) => m.slug.eq(modelData.slug)).update(values)) ??
          existing)
        : await db.orm.public.Model.create({
            ...values,
            slug: modelData.slug,
            id: createId(),
          });

      // 4. Seed ModelProviderEndpoints
      for (const ep of modelData.endpoints) {
        const providerId = providerMap.get(ep.providerSlug);
        if (!providerId) {
          throw new Error(`Missing providerId for providerSlug '${ep.providerSlug}' on model '${modelData.slug}'`);
        }

        const endpointValues = {
          inputPricePer1M: ep.inputPrice,
          outputPricePer1M: ep.outputPrice,
          cacheInputPricePer1M: ep.cachePrice ?? null,
          latencyMs: ep.latencyMs,
          throughputTps: ep.throughputTps,
          uptimePct: ep.uptimePct,
          contextLimit: ep.contextLimit,
          isDefault: ep.isDefault,
          updatedAt: new Date(),
        };
        const endpointExists = await db.orm.public.ModelProviderEndpoint
          .where((e) => and(e.modelId.eq(modelRecord.id), e.providerId.eq(providerId)))
          .first();
        if (endpointExists) {
          await db.orm.public.ModelProviderEndpoint
            .where((e) => and(e.modelId.eq(modelRecord.id), e.providerId.eq(providerId)))
            .update(endpointValues);
        } else {
          await db.orm.public.ModelProviderEndpoint.create({
            ...endpointValues,
            id: createId(),
            modelId: modelRecord.id,
            providerId,
          });
        }
        totalEndpoints++;
      }

      // 5. Seed BenchmarkScores
      if (modelData.benchmarks) {
        for (const bm of modelData.benchmarks) {
          const benchmarkValues = {
            category: bm.category,
            score: bm.score,
            maxScore: bm.maxScore,
            updatedAt: new Date(),
          };
          const benchmarkExists = await db.orm.public.BenchmarkScore
            .where((b) => and(b.modelId.eq(modelRecord.id), b.benchmarkName.eq(bm.name)))
            .first();
          if (benchmarkExists) {
            await db.orm.public.BenchmarkScore
              .where((b) => and(b.modelId.eq(modelRecord.id), b.benchmarkName.eq(bm.name)))
              .update(benchmarkValues);
          } else {
            await db.orm.public.BenchmarkScore.create({
              ...benchmarkValues,
              id: createId(),
              modelId: modelRecord.id,
              benchmarkName: bm.name,
            });
          }
          totalBenchmarks++;
        }
      }
    }
    console.log(`  ✓ ${MODELS.length} Models successfully upserted.`);
    console.log(`  ✓ ${totalEndpoints} ModelProviderEndpoints upserted.`);
    console.log(`  ✓ ${totalBenchmarks} BenchmarkScores upserted.`);

    // Final Counts Verification
    const [finalLabs, finalProviders, finalModels, finalEndpoints, finalBenchmarks] =
      await Promise.all([
        db.orm.public.Lab.aggregate((aggregate) => ({ count: aggregate.count() })).then((r) => r.count),
        db.orm.public.Provider.aggregate((aggregate) => ({ count: aggregate.count() })).then((r) => r.count),
        db.orm.public.Model.aggregate((aggregate) => ({ count: aggregate.count() })).then((r) => r.count),
        db.orm.public.ModelProviderEndpoint.aggregate((aggregate) => ({ count: aggregate.count() })).then((r) => r.count),
        db.orm.public.BenchmarkScore.aggregate((aggregate) => ({ count: aggregate.count() })).then((r) => r.count),
      ]);

    console.log("\n========================================================");
    console.log("       ONEATLAS DATABASE SEEDING COMPLETED             ");
    console.log("========================================================");
    console.log(`  Labs:                   ${finalLabs}`);
    console.log(`  Providers:              ${finalProviders}`);
    console.log(`  Models:                 ${finalModels}`);
    console.log(`  Model Provider Routes:  ${finalEndpoints}`);
    console.log(`  Benchmark Scores:       ${finalBenchmarks}`);
    console.log("========================================================\n");
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string };
    if (
      err.code === "ECONNREFUSED" ||
      err.code === "P1001" ||
      err.message?.includes("Can't reach database server")
    ) {
      console.warn("\n⚠️  [DATABASE NOTICE: PostgreSQL Not Connected]");
      console.warn("Could not connect to PostgreSQL at process.env.DATABASE_URL.");
      console.warn(
        "When your local or cloud PostgreSQL (e.g. Supabase, Neon) database is running and migrated,"
      );
      console.warn(
        "run `npx prisma db seed` to insert the 8 labs, 9 providers, 32 models, endpoints, and benchmarks.\n"
      );
      return;
    }
    console.error("Seed execution error:", error);
    throw error;
  } finally {
    await db.close();
  }
}

main().catch((e) => {
  console.error("Failed to execute database seed:", e);
  process.exit(1);
});
