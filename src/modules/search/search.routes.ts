import type { FastifyInstance } from "fastify";

export default async function searchRoutes(app: FastifyInstance) {
  // GET /api/search?q=...
  app.get("/search", async (req) => {
    const q = String((req.query as any)?.q ?? "").trim().toLowerCase();
    return { ok: true, items: [], q };
  });
}
