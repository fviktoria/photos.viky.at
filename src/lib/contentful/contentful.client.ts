import { createClient } from 'contentful';

let _client: ReturnType<typeof createClient> | null = null;

export function getContentfulClient(): ReturnType<typeof createClient> {
  if (!_client) {
    _client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID!,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
    });
  }
  return _client;
}
