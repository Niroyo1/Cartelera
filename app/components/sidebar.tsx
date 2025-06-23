"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFilm, FaCog } from "react-icons/fa";
import { useState } from "react";

const navItems = [
  { href: "/movies/top", icon: <FaFilm />, label: "TOP MOVIES" },
  { href: "/administration", icon: <FaCog />, label: "ADMIN" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside className={`bg-black border-r border-white flex flex-col items-center py-8 ${collapsed ? "w-16" : "w-48"}`}>
      <ul className="flex flex-col gap-4 w-full">
        {navItems.map(({ href, icon, label }) => {
          const isActive = pathname === href;
          return (
            <li key={href} className="w-full">
              <Link
                href={href}
                className={`rounded-lg px-3 py-2 w-full flex items-center gap-2 font-bold transition-colors 
                  hover:bg-zinc-100 hover:text-Violet`
                }
              >
                {icon}
                {!collapsed && label}
              </Link>
            </li>
          );
        })}
      </ul>
      <button
        className="mb-8 p-2 rounded hover:bg-sky-900 transition"
        onClick={() => setCollapsed((c) => !c)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <span className="text-2xl">&#9776;</span> : <span className="text-2xl">&larr;</span>}
      </button>
    </aside>
  );
}