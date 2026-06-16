import type { EntryFieldTypes } from 'contentful';
import type { PhotoSkeleton } from './photo.interface';

export type PageSkeleton = {
  contentTypeId: 'portfolio_page';
  fields: {
    title: EntryFieldTypes.Symbol;
    photos: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<PhotoSkeleton>>;
  };
};
