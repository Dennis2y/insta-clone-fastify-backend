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
