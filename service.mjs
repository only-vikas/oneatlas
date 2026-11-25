// @ts-check
import nextjs from "@prisma/composer/nextjs";
import { compute } from "@prisma/composer-prisma-cloud";
import { postgres, dataContract } from "@prisma/composer-prisma-cloud/orm";
import oneatlasContractJson from "./src/prisma/contract.json" with { type: "json" };

export default compute({
  name: "oneatlas",
  deps: { db: postgres(dataContract(oneatlasContractJson)) },
  build: nextjs({ module: import.meta.url, appDir: "." }),
});
