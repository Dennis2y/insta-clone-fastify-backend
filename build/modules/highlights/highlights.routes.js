"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const highlightsRoutes = async (fastify) => {
    fastify.get("/highlights/grid/:id", async (req) => {
        const { id } = req.params;
        return { ok: true, id, items: [] };
    });
};
exports.default = highlightsRoutes;
