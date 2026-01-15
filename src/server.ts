import Fastify from "fastify"
import databasePlugin from "./core/database/database.plugin"
import postsRoutes from "./modules/posts/posts.routes"

import reelsRoutes from "./modules/reels/reels.routes"
const fastify = Fastify({ logger: true })

fastify.get("/", async () => ({ hello: "world" }))

fastify.register(databasePlugin)
fastify.register(postsRoutes)

fastify.register(reelsRoutes)
const port = 3000

const start = async () => {
  try {
    await fastify.listen({ port })
    console.log(`🚀 Server listening on http://127.0.0.1:${port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
