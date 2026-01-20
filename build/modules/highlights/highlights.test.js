"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const database_plugin_1 = require("../../core/database/database.plugin");
const highlights_routes_1 = __importDefault(require("./highlights.routes"));
/**
 * Highlights module tests
 * IMPORTANT: register DB plugin so app.db exists + tables are created
 */
describe("Highlights", () => {
    it("GET /highlights should return an array", async () => {
        const app = (0, fastify_1.default)({ logger: false });
        app.register(database_plugin_1.databasePlugin);
        app.register(highlights_routes_1.default);
        await app.ready();
        const res = await app.inject({ method: "GET", url: "/highlights" });
        expect(res.statusCode).toBe(200);
        const body = res.json();
        expect(Array.isArray(body)).toBe(true);
        await app.close();
    });
    it("GET /highlights/:id should return a highlight or 404", async () => {
        const app = (0, fastify_1.default)({ logger: false });
        app.register(database_plugin_1.databasePlugin);
        app.register(highlights_routes_1.default);
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
