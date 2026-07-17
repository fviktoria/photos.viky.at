"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const Nav: FC = () => {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-100">
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between"
        aria-label="Site navigation"
      >
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-neutral-900 hover:text-neutral-600 transition-colors duration-150"
        >
          Photos • by Viky
        </Link>
        <a
          href="mailto:photos.viky@icloud.com"
          className="text-sm px-4 py-2 rounded-full border border-neutral-300 text-neutral-700 hover:border-neutral-900 hover:text-neutral-900 transition-colors duration-150"
        >
          Get in touch
        </a>
      </nav>
    </header>
  );
};
