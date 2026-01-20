import type { FastifyInstance } from "fastify";
import fs from "fs/promises";
import path from "path";

export default async function highlightsRoutes(app: FastifyInstance) {
  app.get("/highlights", async () => {
    const uploadsDir = path.join(process.cwd(), "public", "uploads");

    let files: string[] = [];
    try {
      files = await fs.readdir(uploadsDir);
    } catch {
      files = [];
    }

    const images = files
      .filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f))
      .map((f) => `/uploads/${encodeURIComponent(f)}`);

    const covers =
      images.length > 0
        ? images.slice(0, 12)
        : ["/uploads/demo-17.jpg", "/uploads/demo-18.jpg", "/uploads/demo-19.jpg", "/uploads/demo-2.jpg"];

    const titles = ["Vacation", "Team", "Family", "Business", "Nature", "Moments", "Friends", "Work", "Travel", "Food", "Pets", "Life"];

    return {
      ok: true,
      items: covers.slice(0, 12).map((cover, idx) => ({
        id: idx + 1,
        title: titles[idx] ?? `Highlight ${idx + 1}`,
        cover,
      })),
    };
  });
}
