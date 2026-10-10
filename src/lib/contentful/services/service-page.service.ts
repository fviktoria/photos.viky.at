import { contentfulClient } from '../contentful.client';
import type { ServicePageSkeleton, ResolvedServicePage } from '../interfaces/service-page.interface';
import { toServicePage } from '../mappers/service-page.mapper';

export async function getAllServicePageSlugs(): Promise<string[]> {
  const res = await contentfulClient.getEntries<ServicePageSkeleton>({
    content_type: 'service_page',
    limit: 1000,
  });
  return res.items.map((e) => e.fields.slug as string);
}

export async function getServicePageBySlug(slug: string): Promise<ResolvedServicePage | null> {
  const res = await contentfulClient.getEntries<ServicePageSkeleton>({
    content_type: 'service_page',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    'fields.slug': slug as any,
    include: 2,
    limit: 1,
  });
  const entry = res.items[0];
  if (!entry) return null;
  return toServicePage(entry);
}

export async function getAllServicePages(): Promise<{ slug: string; headline: string }[]> {
  const res = await contentfulClient.getEntries<ServicePageSkeleton>({
    content_type: 'service_page',
    limit: 1000,
  });
  return res.items.map((e) => ({
    slug: e.fields.slug as string,
    headline: e.fields.headline as string,
  }));
}
