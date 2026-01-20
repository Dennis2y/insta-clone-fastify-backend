import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import fs from "fs/promises";
import path from "path";

type UploadGridItem = { id: number; image: string };

const uploadsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.get("/uploads/grid", async () => {
    const dir = path.join(process.cwd(), "public", "uploads");

    let files: string[] = [];
    try {
      files = await fs.readdir(dir);
    } catch {
      // folder doesn't exist yet -> return empty
      return [] satisfies UploadGridItem[];
    }

    const images = files
      .filter((f) => /\.(png|jpe?g|gif|webp)$/i.test(f))
      .map((f, idx) => ({ id: idx + 1, image: `/uploads/${f}` }));

    return images satisfies UploadGridItem[];
  });
};

export { uploadsRoutes };
