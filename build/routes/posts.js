"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
async function listUploadImages() {
    const dir = node_path_1.default.join(process.cwd(), "public", "uploads");
    let files = [];
    try {
        files = await promises_1.default.readdir(dir);
    }
    catch {
        return [];
    }
    return files
        .filter((f) => IMAGE_EXT.has(node_path_1.default.extname(f).toLowerCase()) && !f.startsWith("."))
        .sort()
        .map((f) => `/uploads/${encodeURIComponent(f)}`);
}
const postsRoutes = async (fastify) => {
    fastify.get("/api/posts", async () => {
        const rows = await fastify.transactions.posts.getAll();
        let items = (rows ?? []).map((r) => ({
            id: r.id,
            username: r.username ?? "webeet_user",
            caption: r.caption ?? "",
            img_url: r.img_url ?? "",
            created_at: r.created_at ?? r.createdAt ?? null,
        }));
        const hasAnyImage = items.some((p) => typeof p.img_url === "string" && p.img_url.trim().length > 0);
        if (!hasAnyImage) {
            const urls = await listUploadImages();
            items = urls.map((u, idx) => ({
                id: idx + 1,
                username: "webeet_user",
                caption: "",
                img_url: u,
                created_at: null,
            }));
        }
        return { ok: true, items };
    });
};
exports.default = postsRoutes;
