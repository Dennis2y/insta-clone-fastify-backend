import type { FastifyInstance } from "fastify";
import fs from "fs";
import path from "path";

const ALLOWED = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function listUploads(): string[] {
  const dir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => ALLOWED.has(path.extname(f).toLowerCase()))
    .sort()
    .map((f) => `/uploads/${f}`);
}

export default async function uploadsRoutes(app: FastifyInstance) {
  app.get("/uploads/list", async () => {
    return { ok: true, items: listUploads() };
  });
}
