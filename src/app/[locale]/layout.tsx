import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing.config";
import "@/styles/global.css";
import { Nav } from "@/components/navigation";
import { Footer } from "@/components/footer.component";

export const metadata: Metadata = {
  metadataBase: new URL("https://viktoriaferstl.at"),
  title: { default: "Viktoria Ferstl", template: "%s – Viktoria Ferstl" },
  description:
    "Photography portfolio by Viktoria Ferstl – Photographer Vienna, Austria. Event photography, portrait photography, documentary photography.",
  openGraph: {
    siteName: "Viktoria Ferstl",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  appleWebApp: { title: "Viktoria Ferstl" },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="bg-white text-neutral-900 antialiased flex flex-col min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <Nav />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
