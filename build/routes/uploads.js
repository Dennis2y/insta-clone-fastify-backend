"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = uploadsRoutes;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ALLOWED = new Set([".jpg", ".jpeg", ".png", ".webp"]);
function listUploads() {
    const dir = path_1.default.join(process.cwd(), "public", "uploads");
    if (!fs_1.default.existsSync(dir))
        return [];
    return fs_1.default
        .readdirSync(dir)
        .filter((f) => ALLOWED.has(path_1.default.extname(f).toLowerCase()))
        .sort()
        .map((f) => `/uploads/${f}`);
}
async function uploadsRoutes(app) {
    app.get("/uploads/list", async () => {
        return { ok: true, items: listUploads() };
    });
}
