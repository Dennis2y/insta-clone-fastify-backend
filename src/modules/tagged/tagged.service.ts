import type { FastifyInstance } from "fastify";
import { taggedPostsSchema } from "./tagged.types";
import { getTaggedGrid } from "../../core/database/database.transactions";

/**
 * Service layer:
 * - contains "business logic"
 * - talks to the database via transactions helpers
 * - validates data with Zod before returning it
 */
export function taggedService(app: FastifyInstance) {
  return {
    getGrid() {
      // db is attached by the database plugin in server.ts
      const rows = getTaggedGrid((app as any).db);

      // runtime validation
      return taggedPostsSchema.parse(rows);
    },
  };
}
