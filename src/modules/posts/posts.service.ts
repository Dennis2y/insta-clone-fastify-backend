import type { FastifyInstance } from "fastify"
import type { CreatePostDto } from "./posts.types"

export const postsService = (fastify: FastifyInstance) => {
  return {
    create: async (postData: CreatePostDto) => {
      fastify.log.info("Creating a new post")
      return fastify.transactions.posts.create(postData)
    },
    getAll: async () => {
      fastify.log.info("Getting all posts")
      return fastify.transactions.posts.getAll()
    },
  }
}
