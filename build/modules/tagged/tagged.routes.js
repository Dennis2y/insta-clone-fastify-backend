"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taggedRoutes = async (fastify) => {
    fastify.get("/tagged/grid", async () => {
        return { ok: true, items: [] };
    });
};
exports.default = taggedRoutes;
