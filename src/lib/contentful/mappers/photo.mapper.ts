import type { Entry } from 'contentful';
import type { PhotoSkeleton, ResolvedPhoto } from '../interfaces/photo.interface';
import type { AlbumSkeleton, AlbumEntry } from '../interfaces/album.interface';
import type { TagSkeleton } from '../interfaces/tag.interface';
import { imageUrl, imageDimensions } from '../utils/image.util';
import { toAlbum } from './album.mapper';
import { toTag } from './tag.mapper';

export function toPhoto(entry: Entry<PhotoSkeleton>, fallbackAlbum?: AlbumEntry): ResolvedPhoto {
  const f = entry.fields;
  const albumEntry =
    f.album && 'fields' in (f.album as object)
      ? toAlbum(f.album as Entry<AlbumSkeleton>)
      : fallbackAlbum;

  const { width, height } = imageDimensions(f.image);

  const tagEntries = (f.tagRefs as unknown as Entry<TagSkeleton>[] | undefined) ?? [];
  const photoTags = tagEntries.filter((t) => 'fields' in (t as object)).map(toTag);
  const tags = [...(albumEntry?.tags ?? []), ...photoTags];

  return {
    id: entry.sys.id,
    slug: f.slug as string,
    image: imageUrl(f.image) ?? '',
    width,
    height,
    description: (f.description as string | undefined) ?? albumEntry?.description,
    tags,
    location: (f.location as string | undefined) ?? albumEntry?.location,
    date: f.date ? new Date(f.date as string) : albumEntry?.date,
    album: albumEntry?.slug,
    albumData: albumEntry,
  };
}
