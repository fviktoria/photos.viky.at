import { FC } from "react";
import { getTranslations } from "next-intl/server";
import { LanguageSwitch } from "@/components/language-switch.component";

export const Footer: FC = async () => {
  const t = await getTranslations("footer");

  return (
    <footer className="border-t border-neutral-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-neutral-400">
        <span>{t("copyright")}</span>
        <a
          href="https://www.instagram.com/viktoriaferstl.at"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-neutral-900 transition-colors duration-150"
        >
          @viktoriaferstl.at
        </a>
        <a
          href="mailto:viktoriaferstl.foto@icloud.com"
          className="hover:text-neutral-900 transition-colors duration-150"
        >
          {t("getInTouch")}
        </a>
        <LanguageSwitch />
      </div>
    </footer>
  );
};
