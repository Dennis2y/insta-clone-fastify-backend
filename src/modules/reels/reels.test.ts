import Fastify from "fastify"
import reelsRoutes from "./reels.routes"

describe("GET /reels/grid", () => {
  it("should return reels grid with 200", async () => {
    const app = Fastify()

    // minimal mock to satisfy types later (we'll expand when implementing reels)
    app.decorate("transactions", {
      posts: {
        getById: jest.fn(),
        getAll: jest.fn(),
        create: jest.fn(),
      },
      reels: {
        getGrid: jest.fn().mockReturnValue([]),
      },
    } as any)

    await app.register(reelsRoutes)

    const res = await app.inject({ method: "GET", url: "/reels/grid" })
    expect(res.statusCode).toBe(200)
    expect(res.json()).toEqual([])
  })
})
