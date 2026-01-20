import type { FastifyPluginAsync } from "fastify";

const postsRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/posts", async () => {
    // If DB is available
    const rows = await fastify.transactions.posts.getAll();

    const items = (rows ?? []).map((r: any) => ({
      id: r.id,
      username: r.username ?? "webeet_user",
      caption: r.caption ?? "",
      img_url: r.img_url ?? "", // IMPORTANT: frontend expects img_url
      created_at: r.created_at ?? r.createdAt ?? null,
    }));

    return { ok: true, items };
  });
};

export default postsRoutes;
