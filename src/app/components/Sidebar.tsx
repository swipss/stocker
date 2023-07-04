"use client";

import Link from "next/link";

interface SidebarProps {
  isSidebarOpen: boolean;
  links: {
    href: string;
    label: string;
  }[];
}

export default function Sidebar({ isSidebarOpen, links }: SidebarProps) {
  return (
    <aside
      id="default-sidebar"
      className={`fixed  top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full shadow-lg 
          lg:-translate-x-full
          
          ${isSidebarOpen ? "translate-x-0" : ""}`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-white">
        <ul className="space-y-2 font-medium">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="ml-3">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
