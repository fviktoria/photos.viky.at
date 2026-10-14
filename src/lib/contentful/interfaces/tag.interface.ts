import type { EntryFieldTypes } from 'contentful';

export type TagSkeleton = {
  contentTypeId: 'portfolio_tag';
  fields: {
    slug: EntryFieldTypes.Symbol;
    label: EntryFieldTypes.Symbol;
  };
};

export interface ResolvedTag {
  id: string;
  slug: string;
  label: string;
}
