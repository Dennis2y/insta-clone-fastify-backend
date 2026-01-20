"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUploads = getUploads;
exports.pickEvery = pickEvery;
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const UPLOADS_DIR = node_path_1.default.join(process.cwd(), "public", "uploads");
const IMG_RE = /\.(png|jpe?g|webp)$/i;
const VID_RE = /\.(mp4|mov|webm)$/i;
function asPublicUrl(filename) {
    // Encode each filename so spaces/() work in browser URLs
    return `/uploads/${encodeURIComponent(filename)}`;
}
async function getUploads() {
    let files = [];
    try {
        files = await promises_1.default.readdir(UPLOADS_DIR);
    }
    catch {
        files = [];
    }
    const images = files.filter((f) => IMG_RE.test(f)).map(asPublicUrl);
    const videos = files.filter((f) => VID_RE.test(f)).map(asPublicUrl);
    return { images, videos };
}
function pickEvery(arr, start, step, max) {
    const out = [];
    for (let i = start; i < arr.length && out.length < max; i += step)
        out.push(arr[i]);
    return out;
}
