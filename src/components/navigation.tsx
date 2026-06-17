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
        <ul className="flex items-center gap-6 sm:gap-8" role="list">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm transition-colors duration-150 ${
                  isActive(href)
                    ? "text-neutral-900 font-medium"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
                aria-current={isActive(href) ? "page" : undefined}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
