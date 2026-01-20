"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postsRoutes = async (fastify) => {
    // Keep existing routes if you already had them elsewhere.
    // Minimal safe placeholder (remove if duplicates exist):
    fastify.get("/posts", async () => {
        return [];
    });
};
exports.default = postsRoutes;
