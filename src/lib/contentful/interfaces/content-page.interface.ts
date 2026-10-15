import type { EntryFieldTypes, EntrySkeletonType } from 'contentful';

export type ContentPageSkeleton = EntrySkeletonType & {
  contentTypeId: 'page';
  fields: {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    textContent: EntryFieldTypes.RichText;
  };
};
