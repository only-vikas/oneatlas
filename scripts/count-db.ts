import { prisma } from "../src/lib/prisma";

async function main() {
  const [labs, providers, models, endpoints, benchmarks] = await Promise.all([
    prisma.lab.count(),
    prisma.provider.count(),
    prisma.model.count(),
    prisma.modelProviderEndpoint.count(),
    prisma.benchmarkScore.count(),
  ]);

  console.log("=== POSTGRESQL ROW COUNTS ===");
  console.log("Lab:                  ", labs);
  console.log("Provider:             ", providers);
  console.log("Model:                ", models);
  console.log("ModelProviderEndpoint:", endpoints);
  console.log("BenchmarkScore:       ", benchmarks);
  console.log("=============================");

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error("Error querying db:", err);
  process.exit(1);
});
