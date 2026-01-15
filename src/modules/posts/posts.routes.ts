
import type { FastifyPluginAsync } from "fastify"
import { postsService } from "./posts.service"
import type { CreatePostDto } from "./posts.types"

const postsRoutes: FastifyPluginAsync = async (fastify) => {
  const service = postsService(fastify as any)

  fastify.post<{ Body: CreatePostDto }>("/posts", async (request, reply) => {
    const newPost = await service.create(request.body)
    return reply.code(201).send(newPost)
  })

  fastify.get("/posts", async (_request, reply) => {
    const posts = await (service as any).getAll()
    return reply.code(200).send(posts)
  })
}

export default postsRoutes
