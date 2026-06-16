import type { Metadata } from "next";
import { PortfolioSection } from "@/components/portfolio-section";
import { getPortfolioPagePhotos, getAllTags } from "@/lib/content";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Photography portfolio by Viky – portraits, documentary, and event photography in Vienna, Austria.",
};

export default async function Portfolio() {
  const [photos, tags] = await Promise.all([getPortfolioPagePhotos(), getAllTags()]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-10">Portfolio</h1>
      <PortfolioSection photos={photos} tags={tags} />
    </main>
  );
}
