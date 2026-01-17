import type { Database } from "better-sqlite3"
import type { CreatePostDto } from "../../modules/posts/posts.types"

const createTransactionHelpers = (db: Database) => {
  const statements = {
    getPostById: db.prepare("SELECT * FROM posts WHERE id = ?"),
    getAllPosts: db.prepare("SELECT * FROM posts"),
    createPost: db.prepare(
      "INSERT INTO posts (img_url, caption) VALUES (@img_url, @caption) RETURNING *",
    ),
  }

  const posts = {
    getById: (id: number) => statements.getPostById.get(id),
    getAll: () => statements.getAllPosts.all(),
    create: (data: CreatePostDto) => statements.createPost.get(data),
  }

  return { posts }
}

export type TransactionHelpers = ReturnType<typeof createTransactionHelpers>
export { createTransactionHelpers }

/**
 * ============================================================
 * Day 3 - Tagged + Highlights transactions (DB helpers)
 * These helpers keep raw SQL out of the service layer.
 * ============================================================
 */

export function getTaggedGrid(db: any) {
  // Returns latest tagged posts first
  return db.prepare("SELECT * FROM tagged_posts ORDER BY id DESC").all();
}

export function getHighlights(db: any) {
  // Returns latest highlights first
  return db.prepare("SELECT * FROM highlights ORDER BY id DESC").all();
}

export function getHighlightById(db: any, id: number) {
  // Returns a single highlight by id (or undefined if not found)
  return db.prepare("SELECT * FROM highlights WHERE id = ?").get(id);
}

/**
 * ============================================================
 * Day 3 - Reels transactions (DB helpers)
 * ============================================================
 */
export function getReelsGrid(db: any) {
  // Latest reels first
  return db.prepare("SELECT * FROM reels ORDER BY id DESC").all();
}
