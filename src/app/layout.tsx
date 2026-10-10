import type { Metadata } from "next";
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
    locale: "en_AT",
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
  appleWebApp: {
    title: "Viktoria Ferstl",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-neutral-900 antialiased flex flex-col min-h-screen">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
