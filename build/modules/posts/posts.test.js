"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const posts_routes_1 = __importDefault(require("./posts.routes"));
describe("POST /posts", () => {
    it("should create a post and return it with 201", async () => {
        const app = (0, fastify_1.default)();
        const createdPost = {
            id: 1,
            img_url: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
            caption: "My first post from test!",
            created_at: "2025-06-18 16:50:00",
        };
        // Mock data layer (no DB in this test)
        app.decorate("transactions", {
            posts: {
                getAll: jest.fn(),
                getById: jest.fn(),
                create: jest.fn().mockReturnValue(createdPost),
            },
        });
        await app.register(posts_routes_1.default);
        const response = await app.inject({
            method: "POST",
            url: "/posts",
            payload: {
                img_url: createdPost.img_url,
                caption: createdPost.caption,
            },
        });
        // RED phase: will fail first (404) until route exists
        expect(response.statusCode).toBe(201);
        expect(response.json()).toEqual(createdPost);
        expect(app.transactions.posts.create).toHaveBeenCalledTimes(1);
    });
});
