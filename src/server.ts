import Fastify from "fastify";
import cors from "@fastify/cors";

import databasePlugin from "./core/database/database.plugin";

import postsRoutes from "./modules/posts/posts.routes";
import reelsRoutes from "./modules/reels/reels.routes";
import taggedRoutes from "./modules/tagged/tagged.routes";
import highlightsRoutes from "./modules/highlights/highlights.routes";

const fastify = Fastify({ logger: true });

/**
 * ✅ CORS MUST be registered before routes.
 *
 * Why:
 * - Your frontend dev server can run on 5173, 5174, etc.
 * - We allow ANY localhost/127.0.0.1 port in dev so CORS never blocks you.
 */
fastify.register(cors, {
  origin: (origin, cb) => {
    // Allow server-side calls (no Origin header), e.g. loaders running in Node
    if (!origin) return cb(null, true);

    // Allow any localhost/127.0.0.1 port
    const ok = /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);
    cb(null, ok);
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
});

/** Basic routes */
fastify.get("/", async () => ({ hello: "world" }));
fastify.get("/health", async () => ({ ok: true }));

/** DB plugin must be registered before route modules that query DB */
fastify.register(databasePlugin);

/**
 * ✅ Prefix all feature modules with /api
 * So backend routes are:
 *   /api/posts
 *   /api/reels/grid
 *   /api/tagged/grid
 *   /api/highlights
 */
fastify.register(postsRoutes, { prefix: "/api" });
fastify.register(reelsRoutes, { prefix: "/api" });
fastify.register(taggedRoutes, { prefix: "/api" });
fastify.register(highlightsRoutes, { prefix: "/api" });

const port = Number(process.env.PORT) || 3000;

const start = async () => {
  try {
    await fastify.listen({ port, host: "127.0.0.1" });
    console.log(`🚀 Server listening on http://127.0.0.1:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
