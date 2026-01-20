"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = postsRoutes;
const uploads_1 = require("../lib/uploads");
async function postsRoutes(app) {
    app.get("/posts", async () => {
        const { images } = await (0, uploads_1.listUploads)();
        const imgs = images.length > 0
            ? images
            : ["/uploads/demo-1.jpg", "/uploads/demo-2.jpg", "/uploads/demo-3.jpg"];
        return {
            ok: true,
            items: imgs.slice(0, 30).map((url, idx) => ({
                id: idx + 1,
                username: "webeet_user",
                caption: `Post ${idx + 1}`,
                imageUrl: url,
            })),
        };
    });
}
