import Fastify from "fastify"
import postsRoutes from "./posts.routes"

describe("POST /posts", () => {
  it("should create a post and return it with 201", async () => {
    const app = Fastify()

    const createdPost = {
      id: 1,
      img_url: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
      caption: "My first post from test!",
      created_at: "2025-06-18 16:50:00",
    }

    // Mock data layer (no DB in this test)
    app.decorate("transactions", {
      posts: {
        create: jest.fn().mockReturnValue(createdPost),
      },
    })

    await app.register(postsRoutes)

    const response = await app.inject({
      method: "POST",
      url: "/posts",
      payload: {
        img_url: createdPost.img_url,
        caption: createdPost.caption,
      },
    })

    // RED phase: will fail first (404) until route exists
    expect(response.statusCode).toBe(201)
    expect(response.json()).toEqual(createdPost)
    expect(app.transactions.posts.create).toHaveBeenCalledTimes(1)
  })
})
