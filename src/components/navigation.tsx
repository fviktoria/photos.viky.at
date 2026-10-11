"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitch } from "@/components/language-switch.component";

export const Nav: FC = () => {
  const t = useTranslations("nav");
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
          Viktoria Ferstl
        </Link>
        <div className="flex items-center gap-4">
          <LanguageSwitch />
          <a
            href="mailto:viktoriaferstl.foto@icloud.com"
            className="text-sm px-4 py-2 rounded-full border border-neutral-300 text-neutral-700 hover:border-neutral-900 hover:text-neutral-900 transition-colors duration-150"
          >
            {t("getInTouch")}
          </a>
        </div>
      </nav>
    </header>
  );
};
