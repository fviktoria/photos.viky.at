import type { Entry } from 'contentful';
import { getContentfulClient } from '../contentful.client';
import type { HomePageSkeleton, HomePageContent } from '../interfaces/page.interface';
import type { PhotoSkeleton } from '../interfaces/photo.interface';
import type { AlbumSkeleton } from '../interfaces/album.interface';
import { toPhoto } from '../mappers/photo.mapper';

export async function getHomePage(): Promise<HomePageContent> {
  const res = await getContentfulClient().getEntries<HomePageSkeleton>({
    content_type: 'portfolio_page',
    include: 2,
    limit: 1,
  });
  const page = res.items[0];
  const photos = page
    ? ((page.fields.photos ?? []) as unknown as Entry<PhotoSkeleton>[])
        .filter((p) => 'fields' in p)
        .map((p) => toPhoto(p))
    : [];
  return {
    heroHeadline: (page?.fields.heroHeadline as string | undefined) ?? 'Viktoria Ferstl',
    heroTagline: (page?.fields.heroTagline as string | undefined) ?? 'Photographer based in Vienna — visual storytelling across Austria',
    heroDescription: (page?.fields.heroDescription as string | undefined) ?? 'Event photography, portrait photography and documentary photography in Vienna. Capturing honest moments and authentic stories.',
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
