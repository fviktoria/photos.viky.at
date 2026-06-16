import type { Entry } from 'contentful';
import type { AlbumSkeleton, AlbumEntry } from '../interfaces/album.interface';
import { imageUrl } from '../utils/image.util';

export function toAlbum(entry: Entry<AlbumSkeleton>): AlbumEntry {
  const f = entry.fields;
  return {
    id: entry.sys.id,
    title: f.title as string,
    slug: f.slug as string,
    description: f.description as string,
    tags: (f.tags as string[] | undefined) ?? [],
    location: f.location as string | undefined,
    date: f.date ? new Date(f.date as string) : undefined,
    cover: imageUrl(f.cover),
  };
}
