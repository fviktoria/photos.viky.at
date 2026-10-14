import { createClient, type ContentfulClientApi, type EntrySkeletonType } from 'contentful';

let _client: ContentfulClientApi<EntrySkeletonType> | null = null;

export function getContentfulClient(): ContentfulClientApi<EntrySkeletonType> {
  if (!_client) {
    _client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID!,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
    });
  }
  return _client;
}
