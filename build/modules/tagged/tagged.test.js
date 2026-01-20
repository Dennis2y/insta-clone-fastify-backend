"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const database_plugin_1 = require("../../core/database/database.plugin");
const tagged_routes_1 = __importDefault(require("./tagged.routes"));
/**
 * Tagged module test
 * IMPORTANT: register DB plugin so app.db exists
 */
describe("GET /tagged/grid", () => {
    it("should return an array of tagged posts", async () => {
        const app = (0, fastify_1.default)({ logger: false });
        // Register DB first, then routes
        app.register(database_plugin_1.databasePlugin);
        app.register(tagged_routes_1.default);
        await app.ready();
        const res = await app.inject({ method: "GET", url: "/tagged/grid" });
        expect(res.statusCode).toBe(200);
        const body = res.json();
        expect(Array.isArray(body)).toBe(true);
        await app.close();
    });
});
