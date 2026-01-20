"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reelsRoutes = async (fastify) => {
    fastify.get("/reels/grid", async () => {
        return { ok: true, items: [] };
    });
};
exports.default = reelsRoutes;
