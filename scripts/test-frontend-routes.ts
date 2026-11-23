async function testRoutes() {
  const routes = [
    "/",
    "/models",
    "/models/claude-4-5-sonnet",
    "/compare",
    "/compare?slugs=claude-4-5-sonnet,gpt-5",
    "/rankings",
    "/rankings?category=REASONING&benchmark=MMLU-Pro",
    "/directory",
    "/directory?type=provider",
    "/directory/anthropic",
    "/directory/groq",
    "/api/compare?slugs=claude-4-5-sonnet,gpt-5",
    "/api/rankings",
    "/api/pareto",
    "/api/directory?type=lab",
    "/api/directory/anthropic",
  ];

  console.log("Checking live server routes on http://localhost:3000...\n");
  let allPass = true;

  for (const r of routes) {
    try {
      const res = await fetch(`http://localhost:3000${r}`);
      console.log(`[${res.status}] ${r}`);
      if (res.status !== 200) {
        allPass = false;
      }
    } catch (err: any) {
      console.error(`[ERR] ${r}: ${err.message}`);
      allPass = false;
    }
  }

  if (allPass) {
    console.log("\nAll routes verified HTTP 200 OK!");
    process.exit(0);
  } else {
    console.error("\nSome routes failed verification.");
    process.exit(1);
  }
}

testRoutes();
