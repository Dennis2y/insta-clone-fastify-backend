import type { FastifyInstance } from "fastify";

import postsRoutes from "./posts";
import reelsRoutes from "./reels";
import taggedRoutes from "./tagged";
import highlightsRoutes from "./highlights";
import searchRoutes from "./search";
import uploadRoutes from "./upload";

export async function registerRoutes(app: FastifyInstance) {
  await app.register(postsRoutes, { prefix: "/api" });
  await app.register(reelsRoutes, { prefix: "/api" });
  await app.register(taggedRoutes, { prefix: "/api" });
  await app.register(highlightsRoutes, { prefix: "/api" });
  await app.register(searchRoutes, { prefix: "/api" });
  await app.register(uploadRoutes, { prefix: "/api" });
}
