import type { Entry } from 'contentful';
import type { TagSkeleton, ResolvedTag } from '../interfaces/tag.interface';

export function toTag(entry: Entry<TagSkeleton>): ResolvedTag {
  return {
    id: entry.sys.id,
    slug: entry.fields.slug as string,
    label: entry.fields.label as string,
  };
}
