"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTransition } from "react";

export const LanguageSwitch = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggle = () => {
    const next = locale === "de" ? "en" : "de";
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors duration-150 disabled:opacity-50"
      aria-label={locale === "de" ? "Switch to English" : "Auf Deutsch wechseln"}
    >
      {locale === "de" ? "EN" : "DE"}
    </button>
  );
};
