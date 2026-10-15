import type { Document } from '@contentful/rich-text-types';
import { getContentfulClient } from '../contentful.client';
import type { ContentPageSkeleton } from '../interfaces/content-page.interface';

const LOCALE_MAP: Record<string, string> = {
  de: 'de-AT',
  en: 'en-US',
};

function toContentfulLocale(locale: string): string {
  return LOCALE_MAP[locale] ?? 'en-US';
}

export async function getAllPageParams(): Promise<{ locale: string; slug: string }[]> {
  const results = await Promise.all(
    Object.keys(LOCALE_MAP).map(async (locale) => {
      const res = await getContentfulClient().getEntries<ContentPageSkeleton>({
        content_type: 'page',
        locale: toContentfulLocale(locale),
        limit: 1000,
      });
      return res.items.map((item) => ({
        locale,
        slug: item.fields.slug as string,
      }));
    }),
  );
  return results.flat();
}

export async function getPage(
  slug: string,
  locale: string,
): Promise<{ title: string; textContent: Document | null } | null> {
  const res = await getContentfulClient().getEntries<ContentPageSkeleton>({
    content_type: 'page',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    'fields.slug': slug as any,
    locale: toContentfulLocale(locale),
    limit: 1,
  });
  const item = res.items[0];
  if (!item) return null;
  return {
    title: item.fields.title as string,
    textContent: (item.fields.textContent as Document) ?? null,
  };
}
