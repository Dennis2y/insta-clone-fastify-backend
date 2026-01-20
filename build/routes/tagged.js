"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = taggedRoutes;
const media_1 = require("../lib/media");
async function taggedRoutes(app) {
    app.get("/tagged/grid", async () => {
        const { images } = await (0, media_1.getUploads)();
        const imgs = images.length > 0
            ? (0, media_1.pickEvery)(images, 2, 3, 24)
            : ["/uploads/demo-13.jpg", "/uploads/demo-14.jpg", "/uploads/demo-15.jpg", "/uploads/demo-16.jpg"];
        return {
            ok: true,
            items: imgs.map((url, idx) => ({
                id: idx + 1,
                username: "webeet_user",
                taggedBy: idx % 2 === 0 ? "@alice" : "@bob",
                caption: `Tagged ${idx + 1}`,
                imageUrl: url,
            })),
        };
    });
}
