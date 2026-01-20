"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileStorageService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
function safeName(original) {
    const cleaned = original.replace(/[^a-zA-Z0-9._-]/g, "_");
    return cleaned.length > 120 ? cleaned.slice(0, 120) : cleaned;
}
exports.fileStorageService = {
    async saveImage(buffer, originalFilename) {
        const uploadsDir = path_1.default.join(process.cwd(), "public", "uploads");
        fs_1.default.mkdirSync(uploadsDir, { recursive: true });
        const ext = path_1.default.extname(originalFilename || "") || ".png";
        const base = path_1.default.basename(safeName(originalFilename || "image"), ext);
        const filename = `${base}-${crypto_1.default.randomUUID()}${ext}`;
        const fullPath = path_1.default.join(uploadsDir, filename);
        await fs_1.default.promises.writeFile(fullPath, buffer);
        // URL encoded so spaces/() work
        return `/uploads/${encodeURIComponent(filename)}`;
    },
};
