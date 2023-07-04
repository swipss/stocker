"use client";

import Link from "next/link";
import Search from "./Search";
import { useState } from "react";
import Sidebar from "./Sidebar";

const links = [
  {
    href: "/market-news",
    label: "News",
  },
];

export default function NavBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <nav className="fixed z-50 w-full h-20 bg-white border-b">
      <div className="flex items-center justify-between h-full max-w-6xl px-4 m-auto lg:px-0">
        <Link href="/">
          <h1 className="text-2xl font-bold text-slate-900">Stocker</h1>
        </Link>
        <div className="hidden gap-2 text-sm lg:flex text-slate-500">
          {links.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
        <Search />
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden"
        >
          <svg
            fill="none"
            stroke="currentColor"
            className="w-6 h-6 text-gray-500 cursor-pointer"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
            ></path>
          </svg>
        </button>
        <Sidebar isSidebarOpen={isSidebarOpen} links={links} />
      </div>
    </nav>
  );
}
