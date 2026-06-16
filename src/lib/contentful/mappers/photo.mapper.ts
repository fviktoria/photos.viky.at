import type { Entry } from 'contentful';
import type { PhotoSkeleton, ResolvedPhoto } from '../interfaces/photo.interface';
import type { AlbumSkeleton, AlbumEntry } from '../interfaces/album.interface';
import { imageUrl, imageDimensions } from '../utils/image.util';
import { toAlbum } from './album.mapper';

export function toPhoto(entry: Entry<PhotoSkeleton>, fallbackAlbum?: AlbumEntry): ResolvedPhoto {
  const f = entry.fields;
  const albumEntry =
    f.album && 'fields' in (f.album as object)
      ? toAlbum(f.album as Entry<AlbumSkeleton>)
      : fallbackAlbum;

  const { width, height } = imageDimensions(f.image);

  return {
    id: entry.sys.id,
    slug: f.slug as string,
    image: imageUrl(f.image) ?? '',
    width,
    height,
    description: (f.description as string | undefined) ?? albumEntry?.description,
    tags: [...(albumEntry?.tags ?? []), ...((f.tags as string[] | undefined) ?? [])],
    location: (f.location as string | undefined) ?? albumEntry?.location,
    date: f.date ? new Date(f.date as string) : albumEntry?.date,
    album: albumEntry?.slug,
    albumData: albumEntry,
  };
}
