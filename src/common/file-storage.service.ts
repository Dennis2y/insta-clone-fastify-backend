import fs from "fs";
import path from "path";
import crypto from "crypto";

function safeName(original: string) {
  const cleaned = original.replace(/[^a-zA-Z0-9._-]/g, "_");
  return cleaned.length > 120 ? cleaned.slice(0, 120) : cleaned;
}

export const fileStorageService = {
  async saveImage(buffer: Buffer, originalFilename: string) {
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    fs.mkdirSync(uploadsDir, { recursive: true });

    const ext = path.extname(originalFilename || "") || ".png";
    const base = path.basename(safeName(originalFilename || "image"), ext);
    const filename = `${base}-${crypto.randomUUID()}${ext}`;

    const fullPath = path.join(uploadsDir, filename);
    await fs.promises.writeFile(fullPath, buffer);

    // URL encoded so spaces/() work
    return `/uploads/${encodeURIComponent(filename)}`;
  },
};
