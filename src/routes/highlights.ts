import type { FastifyInstance } from "fastify";
import { getUploads, pickEvery } from "../lib/media";

export default async function highlightsRoutes(app: FastifyInstance) {
  app.get("/highlights", async () => {
    const { images } = await getUploads();

    // pick some images as covers (fallback to demo covers)
    const covers =
      images.length > 0
        ? pickEvery(images, 0, 4, 8)
        : ["/uploads/demo-17.jpg", "/uploads/demo-18.jpg", "/uploads/demo-19.jpg", "/uploads/demo-20.jpg"];

    const titles = ["Trips", "Family", "Nature", "Work", "Friends", "Moments", "2026", "Stories"];

    return {
      ok: true,
      items: covers.slice(0, 8).map((cover, idx) => ({
        id: idx + 1,
        title: titles[idx] ?? `Highlight ${idx + 1}`,
        cover,
      })),
    };
  });
}
