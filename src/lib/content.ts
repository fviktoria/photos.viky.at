import { createClient } from 'contentful';
import type { Asset, Entry, EntryFieldTypes } from 'contentful';

// ── Contentful skeletons ─────────────────────────────────────────────────────

type AlbumSkeleton = {
  contentTypeId: 'portfolio_album';
  fields: {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.Text;
    tags: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    location: EntryFieldTypes.Symbol;
    date: EntryFieldTypes.Date;
    cover: EntryFieldTypes.AssetLink;
  };
};

type PhotoSkeleton = {
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

type PageSkeleton = {
  contentTypeId: 'portfolio_page';
  fields: {
    title: EntryFieldTypes.Symbol;
    photos: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<PhotoSkeleton>>;
  };
};

// ── App-facing types ─────────────────────────────────────────────────────────

export interface AlbumEntry {
  id: string;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  location: string | undefined;
  date: Date | undefined;
  cover: string | undefined;
}

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

// ── Client ───────────────────────────────────────────────────────────────────

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

// ── Helpers ──────────────────────────────────────────────────────────────────

function imageUrl(asset: unknown): string | undefined {
  const url = (asset as Asset | undefined)?.fields?.file?.url;
  return typeof url === 'string' ? `https:${url}` : undefined;
}

function imageDimensions(asset: unknown): { width: number | undefined; height: number | undefined } {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const img = ((asset as Asset | undefined)?.fields?.file as any)?.details?.image;
  return {
    width: typeof img?.width === 'number' ? img.width : undefined,
    height: typeof img?.height === 'number' ? img.height : undefined,
  };
}

function toAlbum(entry: Entry<AlbumSkeleton>): AlbumEntry {
  const f = entry.fields;
  return {
    id: entry.sys.id,
    title: f.title as string,
    slug: f.slug as string,
    description: f.description as string,
    tags: (f.tags as string[] | undefined) ?? [],
    location: f.location as string | undefined,
    date: f.date ? new Date(f.date as string) : undefined,
    cover: imageUrl(f.cover),
  };
}

function toPhoto(entry: Entry<PhotoSkeleton>, fallbackAlbum?: AlbumEntry): ResolvedPhoto {
  const f = entry.fields;
  const albumEntry =
    f.album && 'fields' in (f.album as object)
      ? toAlbum(f.album as Entry<AlbumSkeleton>)
      : fallbackAlbum;

  const { width, height } = imageDimensions(f.image);

  return {
    id: entry.sys.id,
    slug: f.slug as string,
    image: imageUrl(f.image) ?? '',
    width,
    height,
    description: (f.description as string | undefined) ?? albumEntry?.description,
    tags: [...(albumEntry?.tags ?? []), ...((f.tags as string[] | undefined) ?? [])],
    location: (f.location as string | undefined) ?? albumEntry?.location,
    date: f.date ? new Date(f.date as string) : albumEntry?.date,
    album: albumEntry?.slug,
    albumData: albumEntry,
  };
}

// ── Public API ───────────────────────────────────────────────────────────────

export async function getPortfolioPagePhotos(): Promise<ResolvedPhoto[]> {
  const res = await client.getEntries<PageSkeleton>({
    content_type: 'portfolio_page',
    include: 2,
    limit: 1,
  });
  const page = res.items[0];
  if (!page) return [];
  const photos = (page.fields.photos ?? []) as unknown as Entry<PhotoSkeleton>[];
  return photos.filter((p) => 'fields' in p).map((p) => toPhoto(p));
}

export async function getAllTags(): Promise<string[]> {
  const [photosRes, albumsRes] = await Promise.all([
    client.getEntries<PhotoSkeleton>({ content_type: 'portfolio_photo', limit: 1000 }),
    client.getEntries<AlbumSkeleton>({ content_type: 'portfolio_album', limit: 1000 }),
  ]);
  const tags = new Set<string>();
  photosRes.items.forEach((p) => ((p.fields.tags as string[] | undefined) ?? []).forEach((t) => tags.add(t)));
  albumsRes.items.forEach((a) => ((a.fields.tags as string[] | undefined) ?? []).forEach((t) => tags.add(t)));
  return [...tags].sort();
}

export async function getAlbumSlugs(): Promise<string[]> {
  const res = await client.getEntries<AlbumSkeleton>({
    content_type: 'portfolio_album',
    limit: 1000,
  });
  return res.items.map((a) => a.fields.slug as string);
}

export async function getAlbumWithPhotos(
  slug: string,
): Promise<{ data: AlbumEntry; photos: ResolvedPhoto[] } | null> {
  const albumRes = await client.getEntries<AlbumSkeleton>({
    content_type: 'portfolio_album',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    'fields.slug': slug as any,
    limit: 1,
  });
  const albumRaw = albumRes.items[0];
  if (!albumRaw) return null;
  const album = toAlbum(albumRaw);

  const photosRes = await client.getEntries<PhotoSkeleton>({
    content_type: 'portfolio_photo',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    links_to_entry: albumRaw.sys.id as any,
    limit: 1000,
  });

  return { data: album, photos: photosRes.items.map((p) => toPhoto(p, album)) };
}
