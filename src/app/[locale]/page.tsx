import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PortfolioSection } from "@/components/portfolio-section";
import {
  getHomePage,
  getAllTags,
} from "@/lib/contentful/services/portfolio.service";
import { homePageJsonLd } from "@/lib/seo/structured-data.util";

export const metadata: Metadata = {
  title: "Viktoria Ferstl – Photographer Vienna",
  description:
    "Event photography, portrait photography, and documentary photography in Vienna, Austria. Visual storytelling by Viktoria Ferstl.",
  openGraph: {
    title: "Viktoria Ferstl – Photographer Vienna",
    description:
      "Event photography, portrait photography, and documentary photography in Vienna, Austria.",
  },
};

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [homePage, tags] = await Promise.all([
    getHomePage(locale),
    getAllTags(),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageJsonLd) }}
      />
      <section className="pt-16 pb-12 sm:pt-20 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-4">
            {homePage.heroHeadline}
          </h1>
          <p className="text-lg sm:text-xl text-neutral-600 mb-5">
            {homePage.heroTagline}
          </p>
          <p className="text-neutral-500 max-w-xl leading-relaxed">
            {homePage.heroDescription}
          </p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <PortfolioSection photos={homePage.photos} tags={tags} />
      </section>
    </>
  );
}
