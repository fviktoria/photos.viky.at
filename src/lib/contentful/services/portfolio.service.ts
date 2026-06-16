import type { Entry } from 'contentful';
import { contentfulClient } from '../contentful.client';
import type { PageSkeleton } from '../interfaces/page.interface';
import type { PhotoSkeleton, ResolvedPhoto } from '../interfaces/photo.interface';
import type { AlbumSkeleton } from '../interfaces/album.interface';
import { toPhoto } from '../mappers/photo.mapper';

export async function getPortfolioPagePhotos(): Promise<ResolvedPhoto[]> {
  const res = await contentfulClient.getEntries<PageSkeleton>({
    content_type: 'portfolio_page',
    include: 2,
    limit: 1,
  });
  const page = res.items[0];
  if (!page) return [];
  const photos = (page.fields.photos ?? []) as unknown as Entry<PhotoSkeleton>[];
  return photos.filter((p) => 'fields' in p).map((p) => toPhoto(p));
}

export async function getAllTags(): Promise<string[]> {
  const [photosRes, albumsRes] = await Promise.all([
    contentfulClient.getEntries<PhotoSkeleton>({ content_type: 'portfolio_photo', limit: 1000 }),
    contentfulClient.getEntries<AlbumSkeleton>({ content_type: 'portfolio_album', limit: 1000 }),
  ]);
  const tags = new Set<string>();
  photosRes.items.forEach((p) => ((p.fields.tags as string[] | undefined) ?? []).forEach((t) => tags.add(t)));
  albumsRes.items.forEach((a) => ((a.fields.tags as string[] | undefined) ?? []).forEach((t) => tags.add(t)));
  return [...tags].sort();
}
