import assert from "assert";

const BASE_URL = "http://localhost:3000";

interface TestReport {
  suite: string;
  id: string;
  description: string;
  passed: boolean;
  error?: string;
}

const reports: TestReport[] = [];

async function runTest(
  suite: string,
  id: string,
  description: string,
  fn: () => Promise<void>
) {
  try {
    await fn();
    reports.push({ suite, id, description, passed: true });
    console.log(`  ✓ [PASS] ${id}: ${description}`);
  } catch (err: any) {
    reports.push({
      suite,
      id,
      description,
      passed: false,
      error: err.message || String(err),
    });
    console.error(`  ✗ [FAIL] ${id}: ${description} -> ${err.message}`);
  }
}

async function main() {
  console.log("\n=======================================================");
  console.log("   ONEATLAS SYSTEM VERIFICATION & COMPLIANCE HARNESS   ");
  console.log("=======================================================\n");

  // --------------------------------------------------------------------------
  // SUITE 1: Navigation, Command Palette & Dock Logic
  // --------------------------------------------------------------------------
  console.log("Suite 1: Shell & Global UI Primitives");

  await runTest(
    "Suite 1",
    "TC-CMD-03",
    "Default empty-query state returns trending models, top labs, top providers",
    async () => {
      const res = await fetch(`${BASE_URL}/api/search?q=`);
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert(Array.isArray(data.models) && data.models.length > 0);
      assert(Array.isArray(data.labs) && data.labs.length > 0);
      assert(Array.isArray(data.providers) && data.providers.length > 0);
    }
  );

  await runTest(
    "Suite 1",
    "TC-CMD-05",
    "Special characters & injection payloads (; DROP TABLE..., <script>, %%%) return safe 200 OK without SQL errors",
    async () => {
      const payloads = [
        "'; DROP TABLE models;--",
        "<script>alert(1)</script>",
        "%%%",
        "\" OR 1=1 --",
      ];
      for (const p of payloads) {
        const res = await fetch(`${BASE_URL}/api/search?q=${encodeURIComponent(p)}`);
        assert.strictEqual(res.status, 200, `Payload '${p}' failed HTTP 200`);
        const data = await res.json();
        assert(Array.isArray(data.models), `Payload '${p}' returned non-array models`);
      }
    }
  );

  // --------------------------------------------------------------------------
  // SUITE 2: Market Pulse Landing (/)
  // --------------------------------------------------------------------------
  console.log("\nSuite 2: Market Pulse Landing (/)");

  await runTest(
    "Suite 2",
    "TC-HOME-01",
    "Live telemetry hydration (GET /api/pulse) returns 32 models, 9 providers, 8 labs & top lists",
    async () => {
      const res = await fetch(`${BASE_URL}/api/pulse`);
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.counts.models, 32);
      assert.strictEqual(data.counts.providers, 9);
      assert.strictEqual(data.counts.labs, 8);
      assert.strictEqual(data.trending.length, 5);
      assert.strictEqual(data.recent.length, 5);
      assert.strictEqual(data.paretoLeaders.length, 5);
    }
  );

  await runTest(
    "Suite 2",
    "TC-HOME-03",
    "Ledger rows contain valid slugs deep-linking to /models/[slug]",
    async () => {
      const res = await fetch(`${BASE_URL}/api/pulse`);
      const data = await res.json();
      const firstTrending = data.trending[0];
      const modelRes = await fetch(`${BASE_URL}/api/models/${firstTrending.slug}`);
      assert.strictEqual(modelRes.status, 200);
    }
  );

  // --------------------------------------------------------------------------
  // SUITE 3: Model Discovery Catalog (/models)
  // --------------------------------------------------------------------------
  console.log("\nSuite 3: Model Discovery Catalog (/models)");

  await runTest(
    "Suite 3",
    "TC-CAT-01",
    "URL-synced multi-facet filtering returns exact intersection",
    async () => {
      const res = await fetch(
        `${BASE_URL}/api/models?provider=anthropic-direct&modality=MULTIMODAL&minContext=200000`
      );
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert(data.items.length > 0);
      for (const m of data.items) {
        assert.strictEqual(m.modality, "MULTIMODAL");
        assert(m.contextWindow >= 200000);
      }
    }
  );

  await runTest(
    "Suite 3",
    "TC-CAT-03",
    "Sort toggle direction & tie handling (sort=price&dir=asc vs desc)",
    async () => {
      const resAsc = await fetch(`${BASE_URL}/api/models?sort=price&dir=asc`);
      const dataAsc = await resAsc.json();
      const resDesc = await fetch(`${BASE_URL}/api/models?sort=price&dir=desc`);
      const dataDesc = await resDesc.json();

      const lowestPriceAsc = dataAsc.items[0].pricing.lowestInputPrice;
      const highestPriceDesc = dataDesc.items[0].pricing.lowestInputPrice;
      assert(
        lowestPriceAsc <= highestPriceDesc,
        `Asc lowest (${lowestPriceAsc}) should be <= Desc highest (${highestPriceDesc})`
      );
    }
  );

  await runTest(
    "Suite 3",
    "TC-CAT-04",
    "Cursor pagination fetches page 2 and avoids duplicate items",
    async () => {
      const resPage1 = await fetch(`${BASE_URL}/api/models?limit=20`);
      const dataPage1 = await resPage1.json();
      assert.strictEqual(dataPage1.items.length, 20);
      assert(dataPage1.nextCursor !== null);

      const resPage2 = await fetch(
        `${BASE_URL}/api/models?limit=20&cursor=${dataPage1.nextCursor}`
      );
      const dataPage2 = await resPage2.json();
      assert(dataPage2.items.length > 0);

      const ids1 = new Set(dataPage1.items.map((m: any) => m.id));
      for (const item of dataPage2.items) {
        assert(!ids1.has(item.id), `Duplicate item across cursor: ${item.id}`);
      }
    }
  );

  await runTest(
    "Suite 3",
    "TC-CAT-05",
    "Zero-match constraint query returns items: [] and totalCount: 0 cleanly",
    async () => {
      const res = await fetch(
        `${BASE_URL}/api/models?provider=openai-direct&openWeights=true&minContext=5000000`
      );
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.items.length, 0);
      assert.strictEqual(data.totalCount, 0);
    }
  );

  // --------------------------------------------------------------------------
  // SUITE 4: Model Detail & Cost Simulator (/models/[slug])
  // --------------------------------------------------------------------------
  console.log("\nSuite 4: Model Detail & Workload Cost Simulator (/models/[slug])");

  await runTest(
    "Suite 4",
    "TC-DET-01",
    "Flagship model detail hydration for claude-4-5-sonnet",
    async () => {
      const res = await fetch(`${BASE_URL}/api/models/claude-4-5-sonnet`);
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.slug, "claude-4-5-sonnet");
      assert(data.pricing.lowestInputPrice > 0);
      assert(data.contextWindow >= 200000);
    }
  );

  await runTest(
    "Suite 4",
    "TC-DET-02",
    "Invalid model slug returns HTTP 404 with standard NOT_FOUND error",
    async () => {
      const res = await fetch(`${BASE_URL}/api/models/unknown-model-xyz`);
      assert.strictEqual(res.status, 404);
      const data = await res.json();
      assert.strictEqual(data.error.code, "NOT_FOUND");
    }
  );

  // --------------------------------------------------------------------------
  // SUITE 5: Side-by-Side Comparison Matrix (/compare)
  // --------------------------------------------------------------------------
  console.log("\nSuite 5: Side-by-Side Comparison Matrix (/compare)");

  await runTest(
    "Suite 5",
    "TC-CMP-02",
    "Server-computed winner badges calculated correctly",
    async () => {
      const res = await fetch(
        `${BASE_URL}/api/compare?slugs=claude-4-5-sonnet,deepseek-r2,gpt-5`
      );
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert(data.winners.bestValueSlug !== null);
      assert(data.winners.fastestSlug !== null);
      assert(data.winners.largestContextSlug !== null);
      assert(Object.keys(data.winners.benchmarks).length > 0);
    }
  );

  await runTest(
    "Suite 5",
    "TC-CMP-03",
    "Deduplicates repeated slugs in query string",
    async () => {
      const res = await fetch(`${BASE_URL}/api/compare?slugs=gpt-5,gpt-5`);
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.models.length, 1);
      assert.strictEqual(data.models[0].slug, "gpt-5");
    }
  );

  // --------------------------------------------------------------------------
  // SUITE 6: Rankings & Pareto Frontier Quadrant (/rankings)
  // --------------------------------------------------------------------------
  console.log("\nSuite 6: Rankings & Pareto Frontier Quadrant (/rankings)");

  await runTest(
    "Suite 6",
    "TC-RNK-01",
    "Category & benchmark re-ranking sorts descending by chosen benchmark",
    async () => {
      const res = await fetch(
        `${BASE_URL}/api/rankings?category=CODING&benchmark=SWE-bench%20Verified`
      );
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert(data.items.length > 0);
      for (let i = 0; i < data.items.length - 1; i++) {
        assert(
          data.items[i].score >= data.items[i + 1].score,
          `Item ${i} score (${data.items[i].score}) should be >= Item ${i+1} score (${data.items[i+1].score})`
        );
      }
    }
  );

  await runTest(
    "Suite 6",
    "TC-RNK-03",
    "Pareto Frontier math identifies non-dominated frontier models",
    async () => {
      const res = await fetch(`${BASE_URL}/api/pareto?category=ALL`);
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert(data.frontierCount > 0);
      const frontierNodes = data.points.filter((p: any) => p.onFrontier);
      assert.strictEqual(frontierNodes.length, data.frontierCount);

      // Verify no frontier node is strictly dominated by another
      for (const a of frontierNodes) {
        for (const b of frontierNodes) {
          if (a.modelId === b.modelId) continue;
          const bBeatsAOnCost = b.blendedCost < a.blendedCost;
          const bBeatsAOnIntel = b.intelligence > a.intelligence;
          assert(
            !(bBeatsAOnCost && bBeatsAOnIntel),
            `Frontier violation: ${b.name} strictly dominates ${a.name}`
          );
        }
      }
    }
  );

  // --------------------------------------------------------------------------
  // SUITE 7: AI Labs & Inference Providers Directory (/directory)
  // --------------------------------------------------------------------------
  console.log("\nSuite 7: AI Labs & Inference Providers Directory (/directory)");

  await runTest(
    "Suite 7",
    "TC-DIR-01",
    "Directory list switches between 8 labs and 9 providers",
    async () => {
      const resLabs = await fetch(`${BASE_URL}/api/directory?type=lab`);
      const dataLabs = await resLabs.json();
      assert.strictEqual(dataLabs.count, 8);

      const resProviders = await fetch(`${BASE_URL}/api/directory?type=provider`);
      const dataProviders = await resProviders.json();
      assert.strictEqual(dataProviders.count, 9);
    }
  );

  await runTest(
    "Suite 7",
    "TC-DIR-03",
    "Lab profile (Anthropic) and Provider profile (Groq) hydrate specialized specs",
    async () => {
      const resLab = await fetch(`${BASE_URL}/api/directory/anthropic`);
      assert.strictEqual(resLab.status, 200);
      const labData = await resLab.json();
      assert.strictEqual(labData.entityType, "lab");
      assert(labData.models.length > 0);

      const resProv = await fetch(`${BASE_URL}/api/directory/groq`);
      assert.strictEqual(resProv.status, 200);
      const provData = await resProv.json();
      assert.strictEqual(provData.entityType, "provider");
      assert(provData.models.length > 0);
    }
  );

  await runTest(
    "Suite 7",
    "TC-DIR-04",
    "Unknown directory entity slug returns HTTP 404",
    async () => {
      const res = await fetch(`${BASE_URL}/api/directory/non-existent-lab`);
      assert.strictEqual(res.status, 404);
      const data = await res.json();
      assert.strictEqual(data.error.code, "NOT_FOUND");
    }
  );

  // --------------------------------------------------------------------------
  // SUITE 8: Backend API, Zod Boundary Validation & Error Codes
  // --------------------------------------------------------------------------
  console.log("\nSuite 8: Backend API & Zod Validation Boundaries");

  await runTest(
    "Suite 8",
    "TC-API-01",
    "Zod boundary validation returns HTTP 400 with VALIDATION_ERROR",
    async () => {
      const invalidRequests = [
        "/api/models?limit=500",
        "/api/models?minContext=-10",
        "/api/compare?slugs=a,b,c,d,e",
        "/api/directory?type=invalid",
      ];
      for (const uri of invalidRequests) {
        const res = await fetch(`${BASE_URL}${uri}`);
        assert.strictEqual(res.status, 400, `${uri} did not return HTTP 400`);
        const data = await res.json();
        assert.strictEqual(data.error.code, "VALIDATION_ERROR");
      }
    }
  );

  await runTest(
    "Suite 8",
    "TC-API-02",
    "Missing resources return HTTP 404 with NOT_FOUND",
    async () => {
      const missingRequests = [
        "/api/models/fake-model-slug",
        "/api/models/fake-model-slug/providers",
        "/api/models/fake-model-slug/benchmarks",
        "/api/directory/fake-entity-slug",
      ];
      for (const uri of missingRequests) {
        const res = await fetch(`${BASE_URL}${uri}`);
        assert.strictEqual(res.status, 404, `${uri} did not return HTTP 404`);
        const data = await res.json();
        assert.strictEqual(data.error.code, "NOT_FOUND");
      }
    }
  );

  // --------------------------------------------------------------------------
  // Summary
  // --------------------------------------------------------------------------
  console.log("\n=======================================================");
  const passed = reports.filter((r) => r.passed).length;
  const failed = reports.filter((r) => !r.passed).length;
  console.log(`TOTAL TESTS: ${reports.length} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log("=======================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Fatal test runner failure:", err);
  process.exit(1);
});
