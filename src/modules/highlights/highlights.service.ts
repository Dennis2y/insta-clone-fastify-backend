import type { FastifyInstance } from "fastify";
import { highlightSchema, highlightsSchema } from "./highlights.types";
import {
  getHighlightById,
  getHighlights,
} from "../../core/database/database.transactions";

/**
 * Service layer for highlights:
 * - getAll: list highlights
 * - getById: fetch one highlight by id
 * - validates with Zod
 */
export function highlightsService(app: FastifyInstance) {
  return {
    getAll() {
      const rows = getHighlights((app as any).db);
      return highlightsSchema.parse(rows);
    },

    getById(id: number) {
      const row = getHighlightById((app as any).db, id);
      if (!row) return null;
      return highlightSchema.parse(row);
    },
  };
}
