import type { FastifyPluginAsync } from "fastify"

const reelsRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/reels/grid", async (_req, reply) => {
    const reels = (fastify as any).transactions?.reels?.getGrid?.() ?? []
    return reply.code(200).send(reels)
  })
}

export default reelsRoutes
