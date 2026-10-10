import type { EntryFieldTypes } from 'contentful';
import type { PhotoSkeleton, ResolvedPhoto } from './photo.interface';

export type ServicePageSkeleton = {
  contentTypeId: 'service_page';
  fields: {
    slug: EntryFieldTypes.Symbol;
    seoTitle: EntryFieldTypes.Symbol;
    headline: EntryFieldTypes.Symbol;
    tagline: EntryFieldTypes.Symbol;
    bodyText: EntryFieldTypes.Text;
    ctaLabel: EntryFieldTypes.Symbol;
    photos: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<PhotoSkeleton>>;
  };
};

export interface ResolvedServicePage {
  id: string;
  slug: string;
  seoTitle: string;
  headline: string;
  tagline: string | undefined;
  bodyText: string | undefined;
  ctaLabel: string | undefined;
  photos: ResolvedPhoto[];
}
