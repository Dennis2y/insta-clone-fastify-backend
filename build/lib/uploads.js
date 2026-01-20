"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPLOADS_DIR = void 0;
exports.listUploads = listUploads;
exports.pickEvery = pickEvery;
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const IMG_RE = /\.(png|jpe?g|gif|webp)$/i;
const VID_RE = /\.(mp4|webm|mov)$/i;
const REPO_ROOT = process.cwd();
exports.UPLOADS_DIR = path_1.default.join(REPO_ROOT, "public", "uploads");
async function listUploads() {
    let files = [];
    try {
        files = await promises_1.default.readdir(exports.UPLOADS_DIR);
    }
    catch {
        files = [];
    }
    const images = files.filter((f) => IMG_RE.test(f)).map((f) => `/uploads/${f}`);
    const videos = files.filter((f) => VID_RE.test(f)).map((f) => `/uploads/${f}`);
    return { images, videos };
}
function pickEvery(arr, start, step, max) {
    const out = [];
    for (let i = start; i < arr.length && out.length < max; i += step)
        out.push(arr[i]);
    return out;
}
