import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("title"),
    description:
      "Get in touch with Viktoria Ferstl, photographer based in Vienna, Austria.",
  };
}

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function Contact({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contact");

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-6">{t("title")}</h1>
      <p className="text-neutral-600 max-w-xl leading-relaxed">{t("comingSoon")}</p>
    </main>
  );
}
