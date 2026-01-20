import path from "path";
import fs from "fs/promises";

const IMG_RE = /\.(png|jpe?g|gif|webp)$/i;
const VID_RE = /\.(mp4|webm|mov)$/i;

const REPO_ROOT = process.cwd();
export const UPLOADS_DIR = path.join(REPO_ROOT, "public", "uploads");

export async function listUploads() {
  let files: string[] = [];
  try {
    files = await fs.readdir(UPLOADS_DIR);
  } catch {
    files = [];
  }
  const images = files.filter((f) => IMG_RE.test(f)).map((f) => `/uploads/${f}`);
  const videos = files.filter((f) => VID_RE.test(f)).map((f) => `/uploads/${f}`);
  return { images, videos };
}

export function pickEvery<T>(arr: T[], start: number, step: number, max: number) {
  const out: T[] = [];
  for (let i = start; i < arr.length && out.length < max; i += step) out.push(arr[i]);
  return out;
}
