import Fastify from "fastify";

import databasePlugin from "../../core/database/database.plugin";
import reelsRoutes from "./reels.routes";

describe("GET /api/reels/grid", () => {
  it("should return reels grid with 200 and valid shape", async () => {
    const app = Fastify();

    await app.register(databasePlugin);
    await app.register(reelsRoutes, { prefix: "/api" });

    const res = await app.inject({ method: "GET", url: "/api/reels/grid" });

    expect(res.statusCode).toBe(200);

    const data = res.json();

    expect(Array.isArray(data)).toBe(true);

    // If there are reels, validate shape of the first item
    if (data.length > 0) {
      const r = data[0];
      expect(r).toHaveProperty("id");
      expect(r).toHaveProperty("video_url");
      expect(r).toHaveProperty("cover_image_url");
      expect(r).toHaveProperty("caption");
      expect(r).toHaveProperty("created_at");
    }

    await app.close();
  });
});
