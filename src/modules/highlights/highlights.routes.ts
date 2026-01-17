import type { FastifyInstance } from "fastify";
import { highlightsService } from "./highlights.service";

/**
 * Routes for highlights:
 * - GET /highlights
 * - GET /highlights/:id
 */
export default async function highlightsRoutes(fastify: FastifyInstance) {
  const service = highlightsService(fastify);

  fastify.get("/highlights", async (_req, reply) => {
    const data = service.getAll();
    return reply.code(200).send(data);
  });

  fastify.get("/highlights/:id", async (req, reply) => {
    // Fastify params are untyped here, so we coerce safely
    const idRaw = (req.params as any).id;
    const id = Number(idRaw);

    if (!Number.isFinite(id)) {
      return reply.code(400).send({ message: "Invalid id" });
    }

    const item = service.getById(id);
    if (!item) {
      return reply.code(404).send({ message: "Highlight not found" });
    }

    return reply.code(200).send(item);
  });
}
