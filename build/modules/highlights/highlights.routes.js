"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = highlightsRoutes;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
async function highlightsRoutes(app) {
    app.get("/highlights", async () => {
        const uploadsDir = path_1.default.join(process.cwd(), "public", "uploads");
        let files = [];
        try {
            files = await promises_1.default.readdir(uploadsDir);
        }
        catch {
            files = [];
        }
        const images = files
            .filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f))
            .map((f) => `/uploads/${encodeURIComponent(f)}`);
        const covers = images.length > 0
            ? images.slice(0, 12)
            : ["/uploads/demo-17.jpg", "/uploads/demo-18.jpg", "/uploads/demo-19.jpg", "/uploads/demo-2.jpg"];
        const titles = ["Vacation", "Team", "Family", "Business", "Nature", "Moments", "Friends", "Work", "Travel", "Food", "Pets", "Life"];
        return {
            ok: true,
            items: covers.slice(0, 12).map((cover, idx) => ({
                id: idx + 1,
                title: titles[idx] ?? `Highlight ${idx + 1}`,
                cover,
            })),
        };
    });
}
