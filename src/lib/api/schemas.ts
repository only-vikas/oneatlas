import { z } from "zod";

export const ModalityEnum = z.enum(["TEXT", "MULTIMODAL", "IMAGE", "EMBEDDING"]);
export const ModelTypeEnum = z.enum(["CHAT", "REASONING", "CODE"]);
export const BenchmarkCategoryEnum = z.enum(["REASONING", "CODING", "GENERAL", "AGENTIC"]);

// 1. GET /api/models
export const modelsQuerySchema = z.object({
  q: z.string().trim().optional(),
  lab: z.string().trim().optional(),
  provider: z.string().trim().optional(),
  modality: ModalityEnum.optional(),
  modelType: ModelTypeEnum.optional(),
  capability: z.string().trim().optional(),
  openWeights: z
    .enum(["true", "false"])
    .optional()
    .transform((val) => (val === undefined ? undefined : val === "true")),
  minContext: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined))
    .refine((val) => val === undefined || (!isNaN(val) && val >= 0), {
      message: "minContext must be a non-negative integer",
    }),
  sort: z.enum(["price", "context", "released", "rank"]).default("rank"),
  dir: z.enum(["asc", "desc"]).optional(),
  cursor: z.string().optional(),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 20))
    .refine((val) => !isNaN(val) && val >= 1 && val <= 50, {
      message: "limit must be between 1 and 50",
    }),
});

export type ModelsQuery = z.infer<typeof modelsQuerySchema>;

// 2. Route slug param
export const slugParamSchema = z.object({
  slug: z.string().trim().min(1, "Slug is required"),
});

// 5. GET /api/compare
export const compareQuerySchema = z.object({
  slugs: z
    .string()
    .trim()
    .min(1, "At least one model slug is required")
    .transform((str) => str.split(",").map((s) => s.trim()).filter(Boolean))
    .refine((arr) => arr.length >= 1 && arr.length <= 4, {
      message: "Must provide between 1 and 4 model slugs to compare",
    }),
});

export type CompareQuery = z.infer<typeof compareQuerySchema>;

// 6. GET /api/rankings
export const rankingsCategoryEnum = z.enum([
  "ALL",
  "REASONING",
  "CODING",
  "MULTIMODAL",
  "AGENTIC",
]);

export const rankingsBenchmarkEnum = z.enum([
  "COMPOSITE",
  "SWE-bench Verified",
  "MMLU-Pro",
  "GPQA Diamond",
  "LiveCodeBench",
  "Arena Elo",
]);

export const rankingsQuerySchema = z.object({
  category: rankingsCategoryEnum.default("ALL"),
  benchmark: rankingsBenchmarkEnum.default("COMPOSITE"),
});

export type RankingsQuery = z.infer<typeof rankingsQuerySchema>;

// 7. GET /api/pareto
export const paretoCategoryEnum = z.enum(["ALL", "REASONING", "CODING", "MULTIMODAL"]);

export const paretoQuerySchema = z.object({
  category: paretoCategoryEnum.default("ALL"),
});

export type ParetoQuery = z.infer<typeof paretoQuerySchema>;

// 8. GET /api/directory
export const directoryQuerySchema = z.object({
  type: z.enum(["lab", "provider"]).default("lab"),
});

export type DirectoryQuery = z.infer<typeof directoryQuerySchema>;

// 10. GET /api/search
export const searchQuerySchema = z.object({
  q: z.string().trim().optional().default(""),
});

export type SearchQuery = z.infer<typeof searchQuerySchema>;
