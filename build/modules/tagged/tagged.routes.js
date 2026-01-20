"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const TAG_USERS = ["@alice", "@bob", "@charlie", "@diana", "@eve", "@frank", "@grace", "@heidi"];
function pickTags(seed) {
    const count = seed % 3 === 0 ? 2 : 1; // mostly 1, sometimes 2
    const base = seed % TAG_USERS.length;
    const spots = [
        { x: 0.22, y: 0.22 },
        { x: 0.75, y: 0.28 },
        { x: 0.30, y: 0.75 },
        { x: 0.72, y: 0.78 },
    ];
    return Array.from({ length: count }).map((_, i) => ({
        name: TAG_USERS[(base + i) % TAG_USERS.length],
        ...spots[(seed + i) % spots.length],
    }));
}
const taggedRoutes = async (fastify) => {
    fastify.get("/tagged/grid", async () => {
        const uploadsDir = path_1.default.join(process.cwd(), "public", "uploads");
        let files = [];
        try {
            files = await promises_1.default.readdir(uploadsDir);
        }
        catch {
            files = [];
        }
        const imgs = files
            .filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f))
            .sort((a, b) => b.localeCompare(a))
            .slice(0, 24)
            .map((f) => `/uploads/${encodeURIComponent(f)}`);
        const fallback = ["/uploads/demo-13.jpg", "/uploads/demo-14.jpg", "/uploads/demo-15.jpg", "/uploads/demo-16.jpg"];
        const list = imgs.length ? imgs : fallback;
        const items = list.map((url, idx) => ({
            id: idx + 1,
            img_url: url, // IMPORTANT: frontend expects img_url
            tags: pickTags(idx + 11),
            caption: "",
        }));
        return { ok: true, items };
    });
};
exports.default = taggedRoutes;
