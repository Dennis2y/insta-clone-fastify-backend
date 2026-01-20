"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reelsSchema = exports.reelSchema = void 0;
const zod_1 = require("zod");
/**
 * Reels = short videos.
 * We validate everything with Zod so bad DB data never reaches the API.
 */
exports.reelSchema = zod_1.z.object({
    id: zod_1.z.number(),
    video_url: zod_1.z.string().min(1),
    cover_image_url: zod_1.z.string().min(1),
    caption: zod_1.z.string().nullable().optional(),
    created_at: zod_1.z.string(),
});
/** GET /reels/grid returns a list of reels */
exports.reelsSchema = zod_1.z.array(exports.reelSchema);
