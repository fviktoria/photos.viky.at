import type { EntryFieldTypes } from 'contentful';
import type { TagSkeleton, ResolvedTag } from './tag.interface';

export type AlbumSkeleton = {
  contentTypeId: 'portfolio_album';
  fields: {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.Text;
    tagRefs: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TagSkeleton>>;
    location: EntryFieldTypes.Symbol;
    date: EntryFieldTypes.Date;
    cover: EntryFieldTypes.AssetLink;
  };
};

export interface AlbumEntry {
  id: string;
  title: string;
  slug: string;
  description: string;
  tags: ResolvedTag[];
  location: string | undefined;
  date: Date | undefined;
  cover: string | undefined;
}
