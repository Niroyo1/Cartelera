"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SearchBar from "./searchBar";

const navItems = [
  { href: "/movies", label: "MOVIES" },
  { href: "/shows", label: "TV SHOWS" },
  { href: "/administration", label: "ADMIN" },
];

export default function Header() {
  const pathname = usePathname();
  const [show, setShow] = useState(true);
  const lastScroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current <= 0) {
        setShow(true);
        lastScroll.current = 0;
        return;
      }
      if (current > lastScroll.current) {
        setShow(false); // scrolling down
      } else {
        setShow(true); // scrolling up
      }
      lastScroll.current = current;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-black transition-transform duration-300`}
      style={{
        borderBottomColor: 'var(--color-white)',
        transform: show ? "translateY(0)" : "translateY(-100%)",
      }}
    >
      <div className="mx-48 flex items-center justify-between h-16">
        {/* Título */}
        <h1 className="font-extrabold textDegraded text-xl">MiCartelera</h1>

        {/* Nav items */}
        <nav className="flex gap-4">
          {navItems.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`rounded-lg px-3 py-2 flex items-center gap-2 font-bold transition-colors
                  hover:bg-WhiteSmoke hover:textDegraded
                  ${isActive ? " textDegraded" : ""}
                `}
              >
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="degradedContainer">
          <SearchBar />
        </div>  
      </div>
    </header>
  );
}