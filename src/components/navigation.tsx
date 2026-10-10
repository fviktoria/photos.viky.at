"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ServiceLink {
  href: string;
  label: string;
}

interface Props {
  serviceLinks?: ServiceLink[];
}

export const Nav: FC<Props> = ({ serviceLinks = [] }) => {
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
        {serviceLinks.length > 0 && (
          <ul className="hidden sm:flex items-center gap-6">
            {serviceLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-sm transition-colors duration-150 ${
                    isActive(href)
                      ? "text-neutral-900 font-medium"
                      : "text-neutral-500 hover:text-neutral-900"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        )}
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
