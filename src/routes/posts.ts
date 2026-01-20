import type { FastifyPluginAsync } from "fastify";
import fs from "node:fs/promises";
import path from "node:path";

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

async function listUploadImages(): Promise<string[]> {
  const dir = path.join(process.cwd(), "public", "uploads");
  let files: string[] = [];
  try {
    files = await fs.readdir(dir);
  } catch {
    return [];
  }

  return files
    .filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()) && !f.startsWith("."))
    .sort()
    .map((f) => `/uploads/${encodeURIComponent(f)}`);
}

const postsRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/api/posts", async () => {
    const rows = await fastify.transactions.posts.getAll();

    let items = (rows ?? []).map((r: any) => ({
      id: r.id,
      username: r.username ?? "webeet_user",
      caption: r.caption ?? "",
      img_url: r.img_url ?? "",
      created_at: r.created_at ?? r.createdAt ?? null,
    }));

    const hasAnyImage = items.some((p: any) => typeof p.img_url === "string" && p.img_url.trim().length > 0);

    if (!hasAnyImage) {
      const urls = await listUploadImages();
      items = urls.map((u, idx) => ({
        id: idx + 1,
        username: "webeet_user",
        caption: "",
        img_url: u,
        created_at: null,
      }));
    }

    return { ok: true, items };
  });
};

export default postsRoutes;
