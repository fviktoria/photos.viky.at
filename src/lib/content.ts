import { getCollection, getEntry } from 'astro:content';
import type { AlbumData, PhotoData } from '../content.config';

// 2.1: Resolved photo type with inherited metadata applied
export interface ResolvedPhoto {
  id: string;
  title: string;
  image: string;
  description: string | undefined;
  tags: string[];
  location: string | undefined;
  date: Date | undefined;
  album: string | undefined;
  albumData: AlbumData | undefined;
}

// 2.1: Apply album metadata inheritance to a single photo
export async function resolvePhotoInheritance(
  id: string,
  data: PhotoData,
): Promise<ResolvedPhoto> {
  let albumData: AlbumData | undefined;

  if (data.album) {
    const entry = await getEntry('albums', data.album);
    albumData = entry?.data;
  }

  return {
    id,
    title: data.title,
    image: data.image,
    // description, location, date fall back to album values when absent
    description: data.description ?? albumData?.description,
    // tags are merged: album tags first, then photo-specific tags
    tags: [...(albumData?.tags ?? []), ...data.tags],
    location: data.location ?? albumData?.location,
    date: data.date ?? albumData?.date,
    album: data.album,
    albumData,
  };
}

// 2.2: Aggregate all unique tags from photos and albums
export async function getAllTags(): Promise<string[]> {
  const [photos, albums] = await Promise.all([
    getCollection('photos'),
    getCollection('albums'),
  ]);

  const tags = new Set<string>();
  for (const p of photos) p.data.tags.forEach((t) => tags.add(t));
  for (const a of albums) a.data.tags.forEach((t) => tags.add(t));

  return [...tags].sort();
}

// 2.3: Fetch photos by tag, respecting inheritance rules
export async function getPhotosByTag(tag: string): Promise<ResolvedPhoto[]> {
  const photos = await getCollection('photos');
  const resolved = await Promise.all(
    photos.map((p) => resolvePhotoInheritance(p.id, p.data)),
  );
  return resolved.filter((p) => p.tags.includes(tag));
}

// 2.4: Fetch album with all contained photos
export async function getAlbumWithPhotos(slug: string) {
  const albumEntry = await getEntry('albums', slug);
  if (!albumEntry) return null;

  const photos = await getCollection('photos');
  const contained = photos.filter((p) => p.data.album === slug);
  const resolvedPhotos = await Promise.all(
    contained.map((p) => resolvePhotoInheritance(p.id, p.data)),
  );

  return {
    id: albumEntry.id,
    data: albumEntry.data,
    photos: resolvedPhotos,
  };
}

// Convenience: all photos with inheritance applied
export async function getAllResolvedPhotos(): Promise<ResolvedPhoto[]> {
  const photos = await getCollection('photos');
  return Promise.all(photos.map((p) => resolvePhotoInheritance(p.id, p.data)));
}
