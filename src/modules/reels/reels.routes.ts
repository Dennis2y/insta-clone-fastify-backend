import type { FastifyInstance } from "fastify";
import { reelsService } from "./reels.service";

/**
 * Routes layer:
 * - defines endpoints
 * - delegates to service
 */
export default async function reelsRoutes(fastify: FastifyInstance) {
  const service = reelsService(fastify);

  fastify.get("/reels/grid", async (_req, reply) => {
    const data = service.getGrid();
    return reply.code(200).send(data);
  });
}
