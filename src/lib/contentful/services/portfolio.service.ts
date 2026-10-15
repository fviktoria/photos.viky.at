import type { Entry } from 'contentful';
import { getContentfulClient } from '../contentful.client';
import type { HomePageSkeleton, HomePageContent } from '../interfaces/page.interface';
import type { PhotoSkeleton, ResolvedPhoto } from '../interfaces/photo.interface';
import type { TagSkeleton, ResolvedTag } from '../interfaces/tag.interface';
import { toPhoto } from '../mappers/photo.mapper';
import { toTag } from '../mappers/tag.mapper';

function toContentfulLocale(locale: string): string {
  if (locale === 'en') return 'en-US';
  return 'de-AT';
}

export async function getHomePage(locale = 'de'): Promise<HomePageContent> {
  const contentfulLocale = toContentfulLocale(locale);

  const [pageRes, heroRes] = await Promise.all([
    getContentfulClient().getEntries<HomePageSkeleton>({ content_type: 'portfolio_page', include: 1, limit: 1 }),
    contentfulLocale !== 'en-US'
      ? getContentfulClient().getEntries<HomePageSkeleton>({ content_type: 'portfolio_page', locale: contentfulLocale, limit: 1 })
      : Promise.resolve(null),
  ]);

  const page = pageRes.items[0];
  const heroPage = heroRes?.items[0] ?? page;

  // Extract ordered photo IDs from the page, then fetch photos directly so
  // tagRefs are at depth 1 and guaranteed to resolve with include: 1.
  const photoIds = page
    ? ((page.fields.photos ?? []) as unknown as { sys: { id: string } }[]).map((p) => p.sys.id)
    : [];

  let photos: ResolvedPhoto[] = [];
  if (photoIds.length > 0) {
    const photosRes = await getContentfulClient().getEntries<PhotoSkeleton>({
      content_type: 'portfolio_photo',
      'sys.id[in]': photoIds.join(',') as unknown as string[],
      include: 1,
      limit: 1000,
    });
    const byId = new Map(photosRes.items.map((p) => [p.sys.id, p as unknown as Entry<PhotoSkeleton>]));
    photos = photoIds
      .map((id) => byId.get(id))
      .filter((p): p is Entry<PhotoSkeleton> => p !== undefined)
      .map((p) => toPhoto(p))
      .reverse();
  }

  return {
    heroHeadline: (heroPage?.fields.heroHeadline as string | undefined) ?? 'Viktoria Ferstl',
    heroTagline: (heroPage?.fields.heroTagline as string | undefined) ?? 'Photographer based in Vienna — visual storytelling across Austria',
    heroDescription: (heroPage?.fields.heroDescription as string | undefined) ?? 'Event photography, portrait photography and documentary photography in Vienna. Capturing honest moments and authentic stories.',
    photos,
  };
}

export async function getAllTags(locale = 'de'): Promise<ResolvedTag[]> {
  const contentfulLocale = toContentfulLocale(locale);
  const res = await getContentfulClient().getEntries<TagSkeleton>({
    content_type: 'portfolio_tag',
    locale: contentfulLocale,
    limit: 100,
  });
  return res.items.map(toTag);
}
