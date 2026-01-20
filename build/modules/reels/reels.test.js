"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const database_plugin_1 = __importDefault(require("../../core/database/database.plugin"));
const reels_routes_1 = __importDefault(require("./reels.routes"));
describe("GET /api/reels/grid", () => {
    it("should return reels grid with 200 and valid shape", async () => {
        const app = (0, fastify_1.default)();
        await app.register(database_plugin_1.default);
        await app.register(reels_routes_1.default, { prefix: "/api" });
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
