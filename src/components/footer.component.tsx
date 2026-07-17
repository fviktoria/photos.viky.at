import { FC } from "react";

export const Footer: FC = () => (
  <footer className="border-t border-neutral-100 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-neutral-400">
      <span>© 2026 Viktoria Ferstl</span>
      <a
        href="https://www.instagram.com/photos.viky.at"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-neutral-900 transition-colors duration-150"
      >
        @photos.viky.at
      </a>
      <a
        href="mailto:photos.viky@icloud.com"
        className="hover:text-neutral-900 transition-colors duration-150"
      >
        Get in touch
      </a>
    </div>
  </footer>
);
