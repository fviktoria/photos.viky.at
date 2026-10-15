import { FC } from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LanguageSwitch } from "@/components/language-switch.component";

export const Footer: FC = async () => {
  const t = await getTranslations("footer");

  return (
    <footer className="border-t border-neutral-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex justify-between text-sm text-neutral-400">
        <div className="flex flex-col gap-1">
          <span>{t("copyright")}</span>
          <Link
            href={`/${t("imprintSlug")}`}
            className="hover:text-neutral-900 transition-colors duration-150"
          >
            {t("imprint")}
          </Link>
        </div>
        <div className="flex flex-col items-end gap-1">
          <a
            href="https://www.instagram.com/viktoriaferstl.at"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-900 transition-colors duration-150"
          >
            Instagram
          </a>
          <a
            href="mailto:hallo@viktoriaferstl.at"
            className="hover:text-neutral-900 transition-colors duration-150"
          >
            {t("getInTouch")}
          </a>
          <div className="mt-8">
            <LanguageSwitch />
          </div>
        </div>
      </div>
    </footer>
  );
};
