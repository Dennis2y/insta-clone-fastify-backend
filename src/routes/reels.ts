import type { FastifyInstance } from "fastify";
import { listUploads } from "../lib/uploads";

export default async function reelsRoutes(app: FastifyInstance) {
  app.get("/reels/grid", async () => {
    const { images, videos } = await listUploads();

    // If videos exist, return videoUrl (frontend will play them).
    if (videos.length > 0) {
      return {
        ok: true,
        items: videos.slice(0, 12).map((videoUrl, idx) => ({
          id: idx + 1,
          videoUrl,
          posterUrl: images[idx] ?? images[0] ?? "/uploads/demo-1.jpg",
          durationSec: 8 + (idx % 12),
        })),
      };
    }

    // No videos -> show posters only (still looks like reels)
    const posters =
      images.length > 0 ? images.slice(0, 12) : ["/uploads/demo-1.jpg", "/uploads/demo-2.jpg"];

    return {
      ok: true,
      items: posters.map((posterUrl, idx) => ({
        id: idx + 1,
        videoUrl: "",
        posterUrl,
        durationSec: 10 + (idx % 20),
      })),
    };
  });
}
