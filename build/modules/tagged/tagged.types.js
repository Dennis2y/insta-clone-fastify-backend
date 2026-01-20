"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taggedPostsSchema = exports.taggedPostSchema = void 0;
const zod_1 = require("zod");
/**
 * A "tagged post" is like a post, but includes who tagged you.
 * NOTE: created_at is returned as a string from SQLite in this project.
 */
exports.taggedPostSchema = zod_1.z.object({
    id: zod_1.z.number(),
    img_url: zod_1.z.string().min(1),
    caption: zod_1.z.string().nullable().optional(),
    created_at: zod_1.z.string(),
    tagged_by: zod_1.z.string().min(1),
});
/** Grid endpoint returns an array of tagged posts */
exports.taggedPostsSchema = zod_1.z.array(exports.taggedPostSchema);
