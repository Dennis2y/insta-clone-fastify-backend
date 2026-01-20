"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = uploadRoutes;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const promises_1 = require("node:stream/promises");
async function uploadRoutes(app) {
    // POST /api/upload  (multipart form-data)
    app.post("/upload", async (req, reply) => {
        const file = await req.file();
        if (!file) {
            return reply.code(400).send({ ok: false, error: "No file received. Use multipart field name: file" });
        }
        const uploadsDir = node_path_1.default.join(process.cwd(), "public", "uploads");
        node_fs_1.default.mkdirSync(uploadsDir, { recursive: true });
        const safeOriginal = (file.filename || "upload")
            .replace(/[^\w.\-() ]+/g, "_")
            .slice(0, 120);
        const ext = node_path_1.default.extname(safeOriginal) || "";
        const base = node_path_1.default.basename(safeOriginal, ext);
        const filename = `${base}-${Date.now()}${ext}`;
        const fullPath = node_path_1.default.join(uploadsDir, filename);
        await (0, promises_1.pipeline)(file.file, node_fs_1.default.createWriteStream(fullPath));
        // IMPORTANT: return URL-encoded filename so spaces/() work in browser
        const url = `/uploads/${encodeURIComponent(filename)}`;
        return { ok: true, url, filename };
    });
}
