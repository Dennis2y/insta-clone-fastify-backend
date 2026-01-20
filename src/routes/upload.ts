import type { FastifyInstance } from "fastify";
import fs from "node:fs";
import path from "node:path";
import { pipeline } from "node:stream/promises";

export default async function uploadRoutes(app: FastifyInstance) {
  // POST /api/upload  (multipart form-data)
  app.post("/upload", async (req, reply) => {
    const file = await req.file();
    if (!file) {
      return reply.code(400).send({ ok: false, error: "No file received. Use multipart field name: file" });
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    fs.mkdirSync(uploadsDir, { recursive: true });

    const safeOriginal = (file.filename || "upload")
      .replace(/[^\w.\-() ]+/g, "_")
      .slice(0, 120);

    const ext = path.extname(safeOriginal) || "";
    const base = path.basename(safeOriginal, ext);
    const filename = `${base}-${Date.now()}${ext}`;

    const fullPath = path.join(uploadsDir, filename);
    await pipeline(file.file, fs.createWriteStream(fullPath));

    // IMPORTANT: return URL-encoded filename so spaces/() work in browser
    const url = `/uploads/${encodeURIComponent(filename)}`;

    return { ok: true, url, filename };
  });
}
