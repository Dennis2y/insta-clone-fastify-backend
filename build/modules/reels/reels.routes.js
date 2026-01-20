"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const reelsRoutes = async (fastify) => {
    fastify.get("/reels/grid", async () => {
        const uploadsDir = path_1.default.join(process.cwd(), "public", "uploads");
        let files = [];
        try {
            files = fs_1.default.readdirSync(uploadsDir);
        }
        catch {
            files = [];
        }
        const mp4s = files
            .filter((f) => f.toLowerCase().endsWith(".mp4"))
            .sort((a, b) => b.localeCompare(a)); // newest-ish by name
        const items = mp4s.map((f, idx) => ({
            id: idx + 1,
            videoUrl: `/uploads/${encodeURIComponent(f)}`,
            // poster optional (you can add later); keep empty string so UI still renders video
            posterUrl: "",
            durationSec: 0,
        }));
        return { ok: true, items };
    });
};
exports.default = reelsRoutes;
