import type { FastifyInstance } from "fastify";
import { getUploads } from "../lib/media";

export default async function searchRoutes(app: FastifyInstance) {
  app.get("/search", async (req) => {
    const qRaw = (req.query as any)?.q ?? "";
    const q = String(qRaw).trim().toLowerCase();

    const { images, videos } = await getUploads();

    // fake users with avatars from your uploaded images
    const avatarPool = images.length ? images.slice(0, 12) : ["/uploads/demo-1.jpg", "/uploads/demo-2.jpg", "/uploads/demo-3.jpg"];
    const users = [
      { username: "alice", name: "Alice", avatar: avatarPool[0] },
      { username: "bob", name: "Bob", avatar: avatarPool[1] ?? avatarPool[0] },
      { username: "charlie", name: "Charlie", avatar: avatarPool[2] ?? avatarPool[0] },
      { username: "diana", name: "Diana", avatar: avatarPool[3] ?? avatarPool[0] },
      { username: "eve", name: "Eve", avatar: avatarPool[4] ?? avatarPool[0] },
      { username: "frank", name: "Frank", avatar: avatarPool[5] ?? avatarPool[0] },
      { username: "grace", name: "Grace", avatar: avatarPool[6] ?? avatarPool[0] },
      { username: "heidi", name: "Heidi", avatar: avatarPool[7] ?? avatarPool[0] },
    ];

    const usersFiltered =
      q.length === 0
        ? users
        : users.filter((u) => u.username.toLowerCase().includes(q) || u.name.toLowerCase().includes(q));

    // posts based on images (caption = filename)
    const posts = images.slice(0, 60).map((url, idx) => {
      const filename = decodeURIComponent(url.split("/").pop() || `post-${idx + 1}`);
      return {
        id: idx + 1,
        username: "webeet_user",
        caption: filename.replace(/[-_]/g, " "),
        imageUrl: url,
      };
    });

    const postsFiltered =
      q.length === 0 ? posts : posts.filter((p) => p.caption.toLowerCase().includes(q) || p.username.toLowerCase().includes(q));

    // reels based on videos
    const reels = videos.slice(0, 30).map((url, idx) => ({
      id: idx + 1,
      videoUrl: url,
      posterUrl: images[idx] ?? "/uploads/demo-1.jpg",
    }));

    const reelsFiltered =
      q.length === 0
        ? reels
        : reels.filter((r) => decodeURIComponent(r.videoUrl).toLowerCase().includes(q));

    return {
      ok: true,
      query: qRaw,
      users: usersFiltered,
      posts: postsFiltered,
      reels: reelsFiltered,
    };
  });
}
