import type { FastifyInstance } from "fastify"
import type { CreatePostDto } from "./posts.types"

export const postsService = (fastify: FastifyInstance) => {
  return {
    create: async (postData: CreatePostDto) => {
      fastify.log.info("Creating a new post")
      const post = fastify.transactions.posts.create(postData)
      return post
    },
  }
}
