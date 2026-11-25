import type { PostgresClient } from "@prisma/orm-postgres/runtime";
import service from "../../service.mjs";
import type { Contract } from "../prisma/contract";

// The typed Prisma ORM 8 client over the emitted contract at
// src/prisma/contract.json. The service declaration is JavaScript (.mjs), so
// the client's contract type parameter is restored here.
export type OneAtlasClient = PostgresClient<Contract>;

// On Compute and under `prisma dev` the app gets its database through the
// service declaration, never from DATABASE_URL. `service.load()` caches its
// result, so calling this once per request is safe. It must be called from
// request-time code (route handlers, pages, actions) and never at module
// scope: `next build` imports every route module without the runtime
// environment.
export function getDb(): OneAtlasClient {
  return service.load().db.client as unknown as OneAtlasClient;
}
