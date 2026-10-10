import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllServicePageSlugs,
  getServicePageBySlug,
} from "@/lib/contentful/services/service-page.service";
import { ServicePage } from "@/components/service-page.component";

const RESERVED_SLUGS = new Set(["about", "contact", "portfolio", "albums"]);

export async function generateStaticParams() {
  const slugs = await getAllServicePageSlugs();
  return slugs
    .filter((slug) => !RESERVED_SLUGS.has(slug))
    .map((slug) => ({ serviceSlug: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}): Promise<Metadata> {
  const { serviceSlug } = await params;
  const page = await getServicePageBySlug(serviceSlug);
  if (!page) return {};
  return {
    title: page.seoTitle,
    description: page.tagline,
    openGraph: {
      title: page.seoTitle,
      description: page.tagline,
    },
  };
}

export default async function ServicePageRoute({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}) {
  const { serviceSlug } = await params;
  const page = await getServicePageBySlug(serviceSlug);
  if (!page) notFound();
  return <ServicePage page={page} />;
}
