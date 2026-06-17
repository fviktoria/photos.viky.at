import type { Metadata } from "next";
import "@/styles/global.css";
import { Nav } from "@/components/navigation";
import { Footer } from "@/components/footer.component";

export const metadata: Metadata = {
  metadataBase: new URL("https://photos.viky.at"),
  title: { default: "Viky Photography", template: "%s – Viky Photography" },
  description:
    "Photography portfolio by Viky – Photographer Vienna, Austria. Event photography, portrait photography, documentary photography.",
  openGraph: {
    siteName: "Viky Photography",
    locale: "en_AT",
    type: "website",
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
