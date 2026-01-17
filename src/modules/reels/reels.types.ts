import { z } from "zod";

/**
 * Reels = short videos.
 * We validate everything with Zod so bad DB data never reaches the API.
 */
export const reelSchema = z.object({
  id: z.number(),
  video_url: z.string().min(1),
  cover_image_url: z.string().min(1),
  caption: z.string().nullable().optional(),
  created_at: z.string(),
});

/** GET /reels/grid returns a list of reels */
export const reelsSchema = z.array(reelSchema);

export type Reel = z.infer<typeof reelSchema>;
