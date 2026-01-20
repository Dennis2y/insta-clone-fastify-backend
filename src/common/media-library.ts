import path from "node:path";
import { promises as fs } from "node:fs";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

const ALLOWED_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

export async function listUploadImages(): Promise<string[]> {
  let files: string[] = [];
  try {
    files = await fs.readdir(UPLOADS_DIR);
  } catch {
    return [];
  }

  const imgs = files
    .filter((f) => {
      const ext = path.extname(f).toLowerCase();
      if (!ALLOWED_EXT.has(ext)) return false;
      if (f.includes(" (1)")) return false; // remove duplicate copies
      return true;
    })
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((f) => `/uploads/${f}`);

  return imgs;
}

export function pickUnique(images: string[], start: number, count: number): string[] {
  if (!images.length || count <= 0) return [];

  const out: string[] = [];
  const seen = new Set<string>();

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
