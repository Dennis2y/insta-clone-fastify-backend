import { z } from "zod";

/**
 * A "tagged post" is like a post, but includes who tagged you.
 * NOTE: created_at is returned as a string from SQLite in this project.
 */
export const taggedPostSchema = z.object({
  id: z.number(),
  img_url: z.string().min(1),
  caption: z.string().nullable().optional(),
  created_at: z.string(),
  tagged_by: z.string().min(1),
});

/** Grid endpoint returns an array of tagged posts */
export const taggedPostsSchema = z.array(taggedPostSchema);

export type TaggedPost = z.infer<typeof taggedPostSchema>;
