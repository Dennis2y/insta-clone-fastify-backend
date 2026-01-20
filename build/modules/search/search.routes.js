"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = searchRoutes;
async function searchRoutes(app) {
    // GET /api/search?q=...
    app.get("/search", async (req) => {
        const q = String(req.query?.q ?? "").trim().toLowerCase();
        return { ok: true, items: [], q };
    });
}
