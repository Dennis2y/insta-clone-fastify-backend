import { Outlet, NavLink } from "react-router-dom";

export default function Profile() {
  return (
    <div className="max-w-3xl mx-auto">
      <nav className="flex gap-6 justify-center border-b border-gray-700 py-4 text-sm">
        <NavLink to="posts/grid" className={({ isActive }) =>
          isActive ? "font-semibold" : "text-gray-500"
        }>Posts</NavLink>

        <NavLink to="reels/grid" className={({ isActive }) =>
          isActive ? "font-semibold" : "text-gray-500"
        }>Reels</NavLink>

        <NavLink to="tagged/grid" className={({ isActive }) =>
          isActive ? "font-semibold" : "text-gray-500"
        }>Tagged</NavLink>

        <NavLink to="highlights/grid/1" className={({ isActive }) =>
          isActive ? "font-semibold" : "text-gray-500"
        }>Highlights</NavLink>
      </nav>

      <Outlet />
    </div>
  );
}
