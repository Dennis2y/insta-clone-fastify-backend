"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUploadUrls = listUploadUrls;
exports.shuffle = shuffle;
exports.splitIntoTabs = splitIntoTabs;
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const IMG_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
async function listUploadUrls() {
    const dir = path_1.default.join(process.cwd(), "public", "uploads");
    try {
        const files = await promises_1.default.readdir(dir);
        return files
            .filter((f) => IMG_EXT.has(path_1.default.extname(f).toLowerCase()))
            .sort((a, b) => a.localeCompare(b))
            .map((f) => `/uploads/${f}`);
    }
    catch {
        return [];
    }
}
// Deterministic shuffle (so it doesn't change every refresh)
function mulberry32(seed) {
    return function () {
        let t = (seed += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}
function shuffle(arr, seed = 12345) {
    const out = [...arr];
    const rand = mulberry32(seed);
    for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
}
function splitIntoTabs(urls) {
    if (urls.length === 0) {
        return { posts: [], reels: [], tagged: [], highlights: [] };
    }
    // Shuffle once, then slice into 4 unique groups
    const shuffled = shuffle(urls, 777);
    const size = Math.ceil(shuffled.length / 4);
    const posts = shuffled.slice(0, size);
    const reels = shuffled.slice(size, size * 2);
    const tagged = shuffled.slice(size * 2, size * 3);
    const highlights = shuffled.slice(size * 3);
    // If any group is empty (too few images), rotate so tabs still differ
    const fallback = shuffled;
    return {
        posts: posts.length ? posts : fallback.slice(0, Math.min(6, fallback.length)),
        reels: reels.length ? reels : fallback.slice(1).concat(fallback.slice(0, 1)).slice(0, Math.min(6, fallback.length)),
        tagged: tagged.length ? tagged : fallback.slice(2).concat(fallback.slice(0, 2)).slice(0, Math.min(6, fallback.length)),
        highlights: highlights.length ? highlights : fallback.slice(3).concat(fallback.slice(0, 3)).slice(0, Math.min(6, fallback.length)),
    };
}
