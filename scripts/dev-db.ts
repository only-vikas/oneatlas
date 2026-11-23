import { PGlite } from "@electric-sql/pglite";
import { createServer } from "pglite-server";

async function start() {
  const db = new PGlite("./.pgdata");
  await db.waitReady;
  const server = createServer(db);
  server.listen(5432, () => {
    console.log("PGlite PostgreSQL server ready on port 5432");
  });
}

start().catch(console.error);
