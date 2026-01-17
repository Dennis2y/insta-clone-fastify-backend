import Fastify from "fastify";
import { databasePlugin } from "../../core/database/database.plugin";
import taggedRoutes from "./tagged.routes";

/**
 * Tagged module test
 * IMPORTANT: register DB plugin so app.db exists
 */
describe("GET /tagged/grid", () => {
  it("should return an array of tagged posts", async () => {
    const app = Fastify({ logger: false });

    // Register DB first, then routes
    app.register(databasePlugin);
    app.register(taggedRoutes);

    await app.ready();

    const res = await app.inject({ method: "GET", url: "/tagged/grid" });

    expect(res.statusCode).toBe(200);

    const body = res.json();
    expect(Array.isArray(body)).toBe(true);

    await app.close();
  });
});
