"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUploadImages = listUploadImages;
exports.pickUnique = pickUnique;
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = require("node:fs");
const UPLOADS_DIR = node_path_1.default.join(process.cwd(), "public", "uploads");
const ALLOWED_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
async function listUploadImages() {
    let files = [];
    try {
        files = await node_fs_1.promises.readdir(UPLOADS_DIR);
    }
    catch {
        return [];
    }
    const imgs = files
        .filter((f) => {
        const ext = node_path_1.default.extname(f).toLowerCase();
        if (!ALLOWED_EXT.has(ext))
            return false;
        if (f.includes(" (1)"))
            return false; // remove duplicate copies
        return true;
    })
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
        .map((f) => `/uploads/${f}`);
    return imgs;
}
function pickUnique(images, start, count) {
    if (!images.length || count <= 0)
        return [];
    const out = [];
    const seen = new Set();
    let i = 0;
    while (out.length < count && i < images.length * 2) {
        const idx = (start + i) % images.length;
        const img = images[idx];
        if (!seen.has(img)) {
            seen.add(img);
            out.push(img);
        }
        i++;
    }
    return out;
}
