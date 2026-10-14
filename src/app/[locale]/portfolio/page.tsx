import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PortfolioSection } from "@/components/portfolio-section";
import {
  getHomePage,
  getAllTags,
} from "@/lib/contentful/services/portfolio.service";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portfolio" });
  return {
    title: t("title"),
    description:
      "Photography portfolio by Viktoria Ferstl – portraits, documentary, and event photography in Vienna, Austria.",
  };
}

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function Portfolio({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("portfolio");
  const [{ photos }, tags] = await Promise.all([
    getHomePage(locale),
    getAllTags(locale),
  ]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-10">{t("title")}</h1>
      <PortfolioSection photos={photos} tags={tags} />
    </main>
  );
}
