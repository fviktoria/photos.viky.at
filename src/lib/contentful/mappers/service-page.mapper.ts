import type { Entry } from 'contentful';
import type { ServicePageSkeleton, ResolvedServicePage } from '../interfaces/service-page.interface';
import type { PhotoSkeleton } from '../interfaces/photo.interface';
import { toPhoto } from './photo.mapper';

export function toServicePage(entry: Entry<ServicePageSkeleton>): ResolvedServicePage {
  const f = entry.fields;
  const photos = ((f.photos ?? []) as unknown as Entry<PhotoSkeleton>[])
    .filter((p) => 'fields' in p)
    .map((p) => toPhoto(p));

  return {
    id: entry.sys.id,
    slug: f.slug as string,
    seoTitle: f.seoTitle as string,
    headline: f.headline as string,
    tagline: (f.tagline as string | undefined) ?? undefined,
    bodyText: (f.bodyText as string | undefined) ?? undefined,
    ctaLabel: (f.ctaLabel as string | undefined) ?? undefined,
    photos,
  };
}
