import type { EntryFieldTypes } from 'contentful';
import type { AlbumSkeleton, AlbumEntry } from './album.interface';

export type PhotoSkeleton = {
  contentTypeId: 'portfolio_photo';
  fields: {
    slug: EntryFieldTypes.Symbol;
    image: EntryFieldTypes.AssetLink;
    description: EntryFieldTypes.Text;
    tags: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    location: EntryFieldTypes.Symbol;
    date: EntryFieldTypes.Date;
    album: EntryFieldTypes.EntryLink<AlbumSkeleton>;
  };
};

export interface ResolvedPhoto {
  id: string;
  slug: string;
  image: string;
  width: number | undefined;
  height: number | undefined;
  description: string | undefined;
  tags: string[];
  location: string | undefined;
  date: Date | undefined;
  album: string | undefined;
  albumData: AlbumEntry | undefined;
}
