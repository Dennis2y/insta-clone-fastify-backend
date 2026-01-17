import { z } from "zod";

/**
 * A Highlight is a named collection (story-like feature).
 * Minimal fields for this training project.
 */
export const highlightSchema = z.object({
  id: z.number(),
  cover_image_url: z.string().min(1),
  title: z.string().min(1),
  created_at: z.string(),
});

/** List endpoint returns an array */
export const highlightsSchema = z.array(highlightSchema);

export type Highlight = z.infer<typeof highlightSchema>;
