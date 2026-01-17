import Fastify from "fastify";
import { databasePlugin } from "../../core/database/database.plugin";
import highlightsRoutes from "./highlights.routes";

/**
 * Highlights module tests
 * IMPORTANT: register DB plugin so app.db exists + tables are created
 */
describe("Highlights", () => {
  it("GET /highlights should return an array", async () => {
    const app = Fastify({ logger: false });

    app.register(databasePlugin);
    app.register(highlightsRoutes);

    await app.ready();

    const res = await app.inject({ method: "GET", url: "/highlights" });

    expect(res.statusCode).toBe(200);

    const body = res.json();
    expect(Array.isArray(body)).toBe(true);

    await app.close();
  });

  it("GET /highlights/:id should return a highlight or 404", async () => {
    const app = Fastify({ logger: false });

    app.register(databasePlugin);
    app.register(highlightsRoutes);

    await app.ready();

    const res = await app.inject({ method: "GET", url: "/highlights/1" });

    expect([200, 404]).toContain(res.statusCode);

    if (res.statusCode === 200) {
      const body = res.json();
      expect(body).toHaveProperty("id");
      expect(body).toHaveProperty("title");
      expect(body).toHaveProperty("cover_image_url");
    }

    await app.close();
  });
});
