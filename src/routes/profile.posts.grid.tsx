import { useLoaderData } from "react-router-dom";

export async function loader() {
  const res = await fetch("http://127.0.0.1:3000/api/posts");
  return res.json();
}

export default function ProfilePostsGrid() {
  const posts = useLoaderData() as { id: number; image: string }[];

  return (
    <div className="grid grid-cols-3 gap-1 p-4">
      {posts.map((post) => (
        <div key={post.id} className="aspect-square overflow-hidden">
          <img
            src={`http://127.0.0.1:3000/uploads/${post.image}`}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
      ))}
    </div>
  );
}
