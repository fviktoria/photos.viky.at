import type { EntryFieldTypes } from 'contentful';
import type { PhotoSkeleton } from './photo.interface';
import type { ResolvedPhoto } from './photo.interface';

export type HomePageSkeleton = {
  contentTypeId: 'portfolio_page';
  fields: {
    title: EntryFieldTypes.Symbol;
    heroHeadline: EntryFieldTypes.Symbol;
    heroTagline: EntryFieldTypes.Symbol;
    heroDescription: EntryFieldTypes.Text;
    photos: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<PhotoSkeleton>>;
  };
};

export interface HomePageContent {
  heroHeadline: string;
  heroTagline: string;
  heroDescription: string;
  photos: ResolvedPhoto[];
}
