import type { Metadata } from "next";
import { PortfolioSection } from "@/components/portfolio-section";
import { getPortfolioPagePhotos, getAllTags } from "@/lib/contentful/services/portfolio.service";

export const metadata: Metadata = {
  title: "Viky – Photographer Vienna",
  description:
    "Event photography, portrait photography, and documentary photography in Vienna, Austria. Visual storytelling by Viky.",
  openGraph: {
    title: "Viky – Photographer Vienna",
    description:
      "Event photography, portrait photography, and documentary photography in Vienna, Austria.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Viky Photography",
  url: "https://photos.viky.at",
  mainEntity: {
    "@type": "Person",
    name: "Viky",
    url: "https://photos.viky.at",
    jobTitle: "Photographer",
    description:
      "Photographer based in Vienna, Austria specialising in event photography, portrait photography, and documentary photography.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Vienna",
      addressCountry: "AT",
    },
  },
};

export default async function Home() {
  const [photos, tags] = await Promise.all([getPortfolioPagePhotos(), getAllTags()]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="pt-16 pb-12 sm:pt-20 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-4">
            Viky
          </h1>
          <p className="text-lg sm:text-xl text-neutral-600 mb-5">
            Photographer Vienna &mdash; visual storytelling across Austria
          </p>
          <p className="text-neutral-500 max-w-xl leading-relaxed">
            Event photography, portrait photography, and documentary photography
            in Vienna. Capturing honest moments and authentic stories.
          </p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <PortfolioSection photos={photos} tags={tags} />
      </section>
    </>
  );
}
