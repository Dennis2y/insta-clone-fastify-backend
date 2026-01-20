"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadsRoutes = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const uploadsRoutes = async (fastify) => {
    fastify.get("/uploads/grid", async () => {
        const dir = path_1.default.join(process.cwd(), "public", "uploads");
        let files = [];
        try {
            files = await promises_1.default.readdir(dir);
        }
        catch {
            // folder doesn't exist yet -> return empty
            return [];
        }
        const images = files
            .filter((f) => /\.(png|jpe?g|gif|webp)$/i.test(f))
            .map((f, idx) => ({ id: idx + 1, image: `/uploads/${f}` }));
        return images;
    });
};
exports.uploadsRoutes = uploadsRoutes;
