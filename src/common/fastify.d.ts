import "fastify"

declare module "fastify" {
  interface FastifyInstance {
    transactions: {
      posts: {
        create: (input: any) => any
      }
    }
  }
}
