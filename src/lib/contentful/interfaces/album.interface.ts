import type { EntryFieldTypes } from 'contentful';

export type AlbumSkeleton = {
  contentTypeId: 'portfolio_album';
  fields: {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.Text;
    tags: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
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
  tags: string[];
  location: string | undefined;
  date: Date | undefined;
  cover: string | undefined;
}
