import type { FastifyInstance } from "fastify";
import { getReelsGrid } from "../../core/database/database.transactions";
import { reelsSchema } from "./reels.types";

/**
 * Service layer:
 * - calls DB helpers
 * - validates output using Zod schemas
 */
export function reelsService(app: FastifyInstance) {
  return {
    getGrid() {
      // db is attached by database plugin
      const rows = getReelsGrid((app as any).db);
      return reelsSchema.parse(rows);
    },
  };
}
