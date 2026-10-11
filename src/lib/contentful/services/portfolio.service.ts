import type { Entry } from 'contentful';
import { getContentfulClient } from '../contentful.client';
import type { HomePageSkeleton, HomePageContent } from '../interfaces/page.interface';
import type { PhotoSkeleton } from '../interfaces/photo.interface';
import type { AlbumSkeleton } from '../interfaces/album.interface';
import { toPhoto } from '../mappers/photo.mapper';

function toContentfulLocale(locale: string): string {
  if (locale === 'en') return 'en-US';
  return 'de-AT';
}

export async function getHomePage(locale = 'de'): Promise<HomePageContent> {
  const contentfulLocale = toContentfulLocale(locale);

  const [pageRes, heroRes] = await Promise.all([
    getContentfulClient().getEntries<HomePageSkeleton>({ content_type: 'portfolio_page', include: 2, limit: 1 }),
    contentfulLocale !== 'en-US'
      ? getContentfulClient().getEntries<HomePageSkeleton>({ content_type: 'portfolio_page', locale: contentfulLocale, limit: 1 })
      : Promise.resolve(null),
  ]);

  const page = pageRes.items[0];
  const heroPage = heroRes?.items[0] ?? page;
  const photos = page
    ? ((page.fields.photos ?? []) as unknown as Entry<PhotoSkeleton>[])
        .filter((p) => 'fields' in p)
        .map((p) => toPhoto(p))
    : [];

  return {
    heroHeadline: (heroPage?.fields.heroHeadline as string | undefined) ?? 'Viktoria Ferstl',
    heroTagline: (heroPage?.fields.heroTagline as string | undefined) ?? 'Photographer based in Vienna — visual storytelling across Austria',
    heroDescription: (heroPage?.fields.heroDescription as string | undefined) ?? 'Event photography, portrait photography and documentary photography in Vienna. Capturing honest moments and authentic stories.',
    photos,
  };
}

export async function getAllTags(): Promise<string[]> {
  const [photosRes, albumsRes] = await Promise.all([
    getContentfulClient().getEntries<PhotoSkeleton>({ content_type: 'portfolio_photo', limit: 1000 }),
    getContentfulClient().getEntries<AlbumSkeleton>({ content_type: 'portfolio_album', limit: 1000 }),
  ]);
  const tags = new Set<string>();
  photosRes.items.forEach((p) => ((p.fields.tags as string[] | undefined) ?? []).forEach((t) => tags.add(t)));
  albumsRes.items.forEach((a) => ((a.fields.tags as string[] | undefined) ?? []).forEach((t) => tags.add(t)));
  return [...tags].sort();
}
