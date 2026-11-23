import { NextRequest } from "next/server";
import { GET as getModels } from "../src/app/api/models/route";
import { GET as getModelSlug } from "../src/app/api/models/[slug]/route";
import { GET as getModelProviders } from "../src/app/api/models/[slug]/providers/route";
import { GET as getModelBenchmarks } from "../src/app/api/models/[slug]/benchmarks/route";
import { GET as getCompare } from "../src/app/api/compare/route";
import { GET as getRankings } from "../src/app/api/rankings/route";
import { GET as getPareto } from "../src/app/api/pareto/route";
import { GET as getDirectory } from "../src/app/api/directory/route";
import { GET as getDirectorySlug } from "../src/app/api/directory/[slug]/route";
import { GET as getSearch } from "../src/app/api/search/route";
import { GET as getPulse } from "../src/app/api/pulse/route";

async function runTests() {
  console.log("\n========================================================");
  console.log("       ONEATLAS API BACKEND ENDPOINT VERIFICATION       ");
  console.log("========================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, msg: string) {
    if (condition) {
      console.log(`  ✓ ${msg}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${msg}`);
      failed++;
    }
  }

  // 1. GET /api/models
  console.log("[1/12] Testing GET /api/models...");
  {
    const req = new NextRequest("http://localhost:3000/api/models?limit=5&sort=rank");
    const res = await getModels(req);
    const data = await res.json();
    assert(res.status === 200, "Status is 200");
    assert(data.items.length === 5, `Returned 5 items (got ${data.items.length})`);
    assert(data.totalCount === 32, `Total count is 32 (got ${data.totalCount})`);
    assert(data.items[0].slug === "claude-4-5-sonnet", `First ranked model is Claude 4.5 Sonnet`);
    assert(data.items[0].pricing.lowestInputPrice > 0, "Pricing calculated on items");
  }

  // 2. GET /api/models/[slug]
  console.log("\n[2/12] Testing GET /api/models/[slug]...");
  {
    const req = new NextRequest("http://localhost:3000/api/models/deepseek-r2");
    const res = await getModelSlug(req, { params: Promise.resolve({ slug: "deepseek-r2" }) });
    const data = await res.json();
    assert(res.status === 200, "Status is 200 for valid slug");
    assert(data.slug === "deepseek-r2", "Matched model slug");
    assert(data.lab.name === "DeepSeek", "Joined lab metadata");
    assert(data.providerCount >= 3, `Provider count is >= 3 (got ${data.providerCount})`);

    // 404 test
    const notFoundRes = await getModelSlug(req, { params: Promise.resolve({ slug: "non-existent-model" }) });
    const notFoundData = await notFoundRes.json();
    assert(notFoundRes.status === 404, "Returns 404 for invalid slug");
    assert(notFoundData.error?.code === "NOT_FOUND", "Error has NOT_FOUND code");
  }

  // 3. GET /api/models/[slug]/providers
  console.log("\n[3/12] Testing GET /api/models/[slug]/providers...");
  {
    const req = new NextRequest("http://localhost:3000/api/models/deepseek-r2/providers");
    const res = await getModelProviders(req, { params: Promise.resolve({ slug: "deepseek-r2" }) });
    const data = await res.json();
    assert(res.status === 200, "Status is 200");
    assert(data.endpoints.length >= 3, `Has multiple endpoints (got ${data.endpoints.length})`);
    assert(data.endpoints.some((e: { isBestValue?: boolean }) => e.isBestValue === true), "Flags cheapest with isBestValue: true");
    assert(data.endpoints.some((e: { isFastest?: boolean }) => e.isFastest === true), "Flags lowest latency with isFastest: true");
  }

  // 4. GET /api/models/[slug]/benchmarks
  console.log("\n[4/12] Testing GET /api/models/[slug]/benchmarks...");
  {
    const req = new NextRequest("http://localhost:3000/api/models/gpt-5/benchmarks");
    const res = await getModelBenchmarks(req, { params: Promise.resolve({ slug: "gpt-5" }) });
    const data = await res.json();
    assert(res.status === 200, "Status is 200");
    assert(data.benchmarks.length >= 4, `Contains benchmarks (got ${data.benchmarks.length})`);
    assert(!!data.categoryAverages.CODING, "Computes category averages");
  }

  // 5. GET /api/compare
  console.log("\n[5/12] Testing GET /api/compare...");
  {
    const req = new NextRequest("http://localhost:3000/api/compare?slugs=claude-4-5-sonnet,gpt-5,deepseek-r2");
    const res = await getCompare(req);
    const data = await res.json();
    assert(res.status === 200, "Status is 200");
    assert(data.models.length === 3, `Aligned 3 models (got ${data.models.length})`);
    assert(!!data.winners.bestValueSlug, `Computed bestValueSlug: ${data.winners.bestValueSlug}`);
    assert(!!data.winners.fastestSlug, `Computed fastestSlug: ${data.winners.fastestSlug}`);
    assert(!!data.winners.largestContextSlug, `Computed largestContextSlug: ${data.winners.largestContextSlug}`);
    assert(!!data.winners.benchmarks["SWE-bench Verified"], "Computed benchmark winners");
  }

  // 6. GET /api/rankings
  console.log("\n[6/12] Testing GET /api/rankings...");
  {
    const req = new NextRequest("http://localhost:3000/api/rankings?category=REASONING&benchmark=COMPOSITE");
    const res = await getRankings(req);
    const data = await res.json();
    assert(res.status === 200, "Status is 200");
    assert(data.items.length > 0, `Returned reasoning models (got ${data.items.length})`);
    assert(data.items[0].rank === 1, "First item has rank 1");
    assert(typeof data.items[0].delta === "number", "Includes rank delta");
    assert(Array.isArray(data.items[0].sparkline7d), "Includes 7d sparkline");
  }

  // 7. GET /api/pareto
  console.log("\n[7/12] Testing GET /api/pareto...");
  {
    const req = new NextRequest("http://localhost:3000/api/pareto?category=ALL");
    const res = await getPareto(req);
    const data = await res.json();
    assert(res.status === 200, "Status is 200");
    assert(data.points.length === 32, `Evaluated all 32 models (got ${data.points.length})`);
    assert(data.frontierCount > 0, `Computed frontier items (${data.frontierCount} models on Pareto frontier)`);
    // Verify ascending order
    let isAsc = true;
    for (let i = 1; i < data.points.length; i++) {
      if (data.points[i].blendedCost < data.points[i - 1].blendedCost) isAsc = false;
    }
    assert(isAsc, "Points sorted by blendedCost ascending");
  }

  // 8. GET /api/directory
  console.log("\n[8/12] Testing GET /api/directory...");
  {
    const reqLab = new NextRequest("http://localhost:3000/api/directory?type=lab");
    const resLab = await getDirectory(reqLab);
    const dataLab = await resLab.json();
    assert(resLab.status === 200, "Status is 200 for type=lab");
    assert(dataLab.items.length === 8, `Returned all 8 labs (got ${dataLab.items.length})`);
    assert(dataLab.items[0].topModels.length > 0, "Included top models preview");

    const reqProv = new NextRequest("http://localhost:3000/api/directory?type=provider");
    const resProv = await getDirectory(reqProv);
    const dataProv = await resProv.json();
    assert(resProv.status === 200, "Status is 200 for type=provider");
    assert(dataProv.items.length === 9, `Returned all 9 providers (got ${dataProv.items.length})`);
    assert(typeof dataProv.items[0].medianLatencyMs === "number", "Computed medianLatencyMs");
  }

  // 9. GET /api/directory/[slug]
  console.log("\n[9/12] Testing GET /api/directory/[slug]...");
  {
    const reqLab = new NextRequest("http://localhost:3000/api/directory/anthropic");
    const resLab = await getDirectorySlug(reqLab, { params: Promise.resolve({ slug: "anthropic" }) });
    const dataLab = await resLab.json();
    assert(resLab.status === 200, "Status is 200 for lab slug");
    assert(dataLab.entityType === "lab", "Identified entityType as 'lab'");
    assert(dataLab.profile.name === "Anthropic", "Retrieved lab profile");

    const reqProv = new NextRequest("http://localhost:3000/api/directory/groq");
    const resProv = await getDirectorySlug(reqProv, { params: Promise.resolve({ slug: "groq" }) });
    const dataProv = await resProv.json();
    assert(resProv.status === 200, "Status is 200 for provider slug");
    assert(dataProv.entityType === "provider", "Identified entityType as 'provider'");
    assert(dataProv.profile.name === "Groq", "Retrieved provider profile");
  }

  // 10. GET /api/search
  console.log("\n[10/12] Testing GET /api/search...");
  {
    // Empty search -> palette default
    const reqEmpty = new NextRequest("http://localhost:3000/api/search");
    const resEmpty = await getSearch(reqEmpty);
    const dataEmpty = await resEmpty.json();
    assert(resEmpty.status === 200, "Status is 200 for empty search");
    assert(dataEmpty.models.length === 5, "Returns top 5 trending models for default palette");
    assert(dataEmpty.labs.length === 5, "Returns top 5 labs for default palette");

    // Query search
    const reqQ = new NextRequest("http://localhost:3000/api/search?q=claude");
    const resQ = await getSearch(reqQ);
    const dataQ = await resQ.json();
    assert(resQ.status === 200, "Status is 200 for query search");
    assert(dataQ.models.length >= 2, "Found matched Claude models");
  }

  // 11. GET /api/pulse
  console.log("\n[11/12] Testing GET /api/pulse...");
  {
    const reqPulse = new NextRequest("http://localhost:3000/api/pulse");
    const resPulse = await getPulse(reqPulse);
    const dataPulse = await resPulse.json();
    assert(resPulse.status === 200, "Status is 200 for market pulse");
    assert(dataPulse.counts?.models === 32, `Counts models is 32 (got ${dataPulse.counts?.models})`);
    assert(dataPulse.counts?.providers === 9, `Counts providers is 9 (got ${dataPulse.counts?.providers})`);
    assert(dataPulse.counts?.labs === 8, `Counts labs is 8 (got ${dataPulse.counts?.labs})`);
    assert(dataPulse.trending?.length === 5, `Trending has 5 models (got ${dataPulse.trending?.length})`);
    assert(dataPulse.recent?.length === 5, `Recent has 5 models (got ${dataPulse.recent?.length})`);
    assert(dataPulse.paretoLeaders?.length > 0, `Pareto leaders has items (got ${dataPulse.paretoLeaders?.length})`);
    assert(dataPulse.trending[0].pricing.lowestInputPrice > 0, "Pulse models have computed pricing");
  }

  // 12. Negative / Error Validations (Standardized { error: { code, message } })
  console.log("\n[12/12] Testing Error Handling & Input Validation (400/404)...");
  {
    // 400 on invalid sort in /api/models
    const reqBadSort = new NextRequest("http://localhost:3000/api/models?sort=unsupported_sort");
    const resBadSort = await getModels(reqBadSort);
    const dataBadSort = await resBadSort.json();
    assert(resBadSort.status === 400, "Returns 400 on invalid query params");
    assert(dataBadSort.error?.code === "VALIDATION_ERROR", `Error code is VALIDATION_ERROR (got ${dataBadSort.error?.code})`);

    // 400 on compare with > 4 slugs
    const reqTooManySlugs = new NextRequest("http://localhost:3000/api/compare?slugs=m1,m2,m3,m4,m5");
    const resTooManySlugs = await getCompare(reqTooManySlugs);
    const dataTooManySlugs = await resTooManySlugs.json();
    assert(resTooManySlugs.status === 400, "Returns 400 when >4 slugs requested in compare");
    assert(dataTooManySlugs.error?.code === "VALIDATION_ERROR", "Error code is VALIDATION_ERROR");

    // 400 on invalid directory type
    const reqBadDir = new NextRequest("http://localhost:3000/api/directory?type=invalid_type");
    const resBadDir = await getDirectory(reqBadDir);
    const dataBadDir = await resBadDir.json();
    assert(resBadDir.status === 400, "Returns 400 on invalid directory type");
    assert(dataBadDir.error?.code === "VALIDATION_ERROR", "Error code is VALIDATION_ERROR");

    // 404 on nonexistent directory entity
    const reqMissingEntity = new NextRequest("http://localhost:3000/api/directory/nonexistent-org");
    const resMissingEntity = await getDirectorySlug(reqMissingEntity, { params: Promise.resolve({ slug: "nonexistent-org" }) });
    const dataMissingEntity = await resMissingEntity.json();
    assert(resMissingEntity.status === 404, "Returns 404 for unknown directory entity");
    assert(dataMissingEntity.error?.code === "NOT_FOUND", "Error code is NOT_FOUND");
  }

  console.log("\n========================================================");
  console.log(`API Verification Summary: ${passed} passed, ${failed} failed`);
  console.log("========================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((e) => {
  console.error("Verification failed with exception:", e);
  process.exit(1);
});
