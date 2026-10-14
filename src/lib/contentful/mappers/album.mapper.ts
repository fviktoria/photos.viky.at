import type { Entry } from 'contentful';
import type { AlbumSkeleton, AlbumEntry } from '../interfaces/album.interface';
import type { TagSkeleton } from '../interfaces/tag.interface';
import { imageUrl } from '../utils/image.util';
import { toTag } from './tag.mapper';

export function toAlbum(entry: Entry<AlbumSkeleton>): AlbumEntry {
  const f = entry.fields;
  const tagEntries = (f.tagRefs as unknown as Entry<TagSkeleton>[] | undefined) ?? [];
  return {
    id: entry.sys.id,
    title: f.title as string,
    slug: f.slug as string,
    description: f.description as string,
    tags: tagEntries.filter((t) => 'fields' in (t as object)).map(toTag),
    location: f.location as string | undefined,
    date: f.date ? new Date(f.date as string) : undefined,
    cover: imageUrl(f.cover),
  };
}
