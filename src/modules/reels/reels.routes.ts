import type { FastifyPluginAsync } from "fastify";
import fs from "fs";
import path from "path";

const reelsRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/reels/grid", async () => {
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    let files: string[] = [];
    try {
      files = fs.readdirSync(uploadsDir);
    } catch {
      files = [];
    }

    const mp4s = files
      .filter((f) => f.toLowerCase().endsWith(".mp4"))
      .sort((a, b) => b.localeCompare(a)); // newest-ish by name

    const items = mp4s.map((f, idx) => ({
      id: idx + 1,
      videoUrl: `/uploads/${encodeURIComponent(f)}`,
      // poster optional (you can add later); keep empty string so UI still renders video
      posterUrl: "",
      durationSec: 0,
    }));

    return { ok: true, items };
  });
};

export default reelsRoutes;
