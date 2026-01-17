import type { FastifyInstance } from "fastify";
import { taggedService } from "./tagged.service";

/**
 * Routes layer:
 * - defines HTTP endpoints
 * - uses the service layer
 */
export default async function taggedRoutes(fastify: FastifyInstance) {
  const service = taggedService(fastify);

  fastify.get("/tagged/grid", async (_req, reply) => {
    const data = service.getGrid();
    return reply.code(200).send(data);
  });
}
