"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.highlightsSchema = exports.highlightSchema = void 0;
const zod_1 = require("zod");
/**
 * A Highlight is a named collection (story-like feature).
 * Minimal fields for this training project.
 */
exports.highlightSchema = zod_1.z.object({
    id: zod_1.z.number(),
    cover_image_url: zod_1.z.string().min(1),
    title: zod_1.z.string().min(1),
    created_at: zod_1.z.string(),
});
/** List endpoint returns an array */
exports.highlightsSchema = zod_1.z.array(exports.highlightSchema);
