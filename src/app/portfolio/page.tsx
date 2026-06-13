import type { Metadata } from "next";
import PortfolioSection from "@/components/PortfolioSection";
import { getAllResolvedPhotos, getAllTags } from "@/lib/content";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Photography portfolio by Viky – portraits, documentary, and event photography in Vienna, Austria.",
};

export default function Portfolio() {
  const photos = getAllResolvedPhotos();
  const tags = getAllTags();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-10">Portfolio</h1>
      <PortfolioSection photos={photos} tags={tags} />
    </main>
  );
}
