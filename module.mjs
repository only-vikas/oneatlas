// @ts-check
import { appRoot } from "@prisma/composer";
import { postgres, dataContract } from "@prisma/composer-prisma-cloud/orm";
import oneatlasContractJson from "./src/prisma/contract.json" with { type: "json" };
import oneatlasService from "./service.mjs";

export default appRoot("oneatlas", ({ provision }) => {
  const database = provision(
    postgres({
      name: "database",
      contract: dataContract(oneatlasContractJson),
      config: "./prisma.config.ts",
    })
  );
  provision(oneatlasService, { deps: { db: database } });
});
