import { getContentfulClient } from '../contentful.client';
import type { AlbumSkeleton, AlbumEntry } from '../interfaces/album.interface';
import type { PhotoSkeleton, ResolvedPhoto } from '../interfaces/photo.interface';
import { toAlbum } from '../mappers/album.mapper';
import { toPhoto } from '../mappers/photo.mapper';

export async function getAlbumSlugs(): Promise<string[]> {
  const res = await getContentfulClient().getEntries<AlbumSkeleton>({
    content_type: 'portfolio_album',
    limit: 1000,
  });
  return res.items.map((a) => a.fields.slug as string);
}

export async function getAlbumWithPhotos(
  slug: string,
): Promise<{ data: AlbumEntry; photos: ResolvedPhoto[] } | null> {
  const albumRes = await getContentfulClient().getEntries<AlbumSkeleton>({
    content_type: 'portfolio_album',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    'fields.slug': slug as any,
    limit: 1,
  });
  const albumRaw = albumRes.items[0];
  if (!albumRaw) return null;
  const album = toAlbum(albumRaw);

  const photosRes = await getContentfulClient().getEntries<PhotoSkeleton>({
    content_type: 'portfolio_photo',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    links_to_entry: albumRaw.sys.id as any,
    limit: 1000,
  });

  return { data: album, photos: photosRes.items.map((p) => toPhoto(p, album)) };
}
