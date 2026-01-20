"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = highlightsRoutes;
const media_1 = require("../lib/media");
async function highlightsRoutes(app) {
    app.get("/highlights", async () => {
        const { images } = await (0, media_1.getUploads)();
        // pick some images as covers (fallback to demo covers)
        const covers = images.length > 0
            ? (0, media_1.pickEvery)(images, 0, 4, 8)
            : ["/uploads/demo-17.jpg", "/uploads/demo-18.jpg", "/uploads/demo-19.jpg", "/uploads/demo-20.jpg"];
        const titles = ["Trips", "Family", "Nature", "Work", "Friends", "Moments", "2026", "Stories"];
        return {
            ok: true,
            items: covers.slice(0, 8).map((cover, idx) => ({
                id: idx + 1,
                title: titles[idx] ?? `Highlight ${idx + 1}`,
                cover,
            })),
        };
    });
}
