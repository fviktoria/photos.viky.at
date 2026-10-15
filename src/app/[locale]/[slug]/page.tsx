import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { INLINES, MARKS } from "@contentful/rich-text-types";
import type { Options } from "@contentful/rich-text-react-renderer";
import { getAllPageParams, getPage } from "@/lib/contentful/services/content-page.service";

export async function generateStaticParams() {
  return getAllPageParams();
}

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = await getPage(slug, locale);
  if (!page) return {};
  return { title: page.title };
}

const renderOptions: Options = {
  renderMark: {
    [MARKS.BOLD]: (text) => (
      <strong className="font-medium text-neutral-900">{text}</strong>
    ),
  },
  renderNode: {
    [INLINES.HYPERLINK]: (node, children) => (
      <a
        href={node.data.uri as string}
        className="hover:text-neutral-900 transition-colors duration-150 underline underline-offset-2"
      >
        {children}
      </a>
    ),
  },
};

export default async function SlugPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const page = await getPage(slug, locale);
  if (!page) notFound();

  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-10">{page.title}</h1>
      {page.textContent && (
        <div className="text-neutral-700 leading-relaxed space-y-1 [&_p]:min-h-[1.5rem]">
          {documentToReactComponents(page.textContent, renderOptions)}
        </div>
      )}
    </main>
  );
}
