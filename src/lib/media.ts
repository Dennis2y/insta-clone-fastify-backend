import fs from "node:fs/promises";
import path from "node:path";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

const IMG_RE = /\.(png|jpe?g|webp)$/i;
const VID_RE = /\.(mp4|mov|webm)$/i;

function asPublicUrl(filename: string) {
  // Encode each filename so spaces/() work in browser URLs
  return `/uploads/${encodeURIComponent(filename)}`;
}

export async function getUploads() {
  let files: string[] = [];
  try {
    files = await fs.readdir(UPLOADS_DIR);
  } catch {
    files = [];
  }

  const images = files.filter((f) => IMG_RE.test(f)).map(asPublicUrl);
  const videos = files.filter((f) => VID_RE.test(f)).map(asPublicUrl);

  return { images, videos };
}

export function pickEvery<T>(arr: T[], start: number, step: number, max: number) {
  const out: T[] = [];
  for (let i = start; i < arr.length && out.length < max; i += step) out.push(arr[i]);
  return out;
}
