import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

// ── Raw JSON shapes ──────────────────────────────────────────────────────────

export interface PhotoData {
  title: string;
  image: string;
  description?: string;
  tags: string[];
  location?: string;
  date?: string;
  album?: string;
}

export interface AlbumData {
  title: string;
  description: string;
  tags: string[];
  location?: string;
  date?: string;
  cover?: string;
}

// ── Parsed entries (dates coerced to Date) ───────────────────────────────────

export interface PhotoEntry extends Omit<PhotoData, 'date'> {
  id: string;
  date?: Date;
}

export interface AlbumEntry extends Omit<AlbumData, 'date'> {
  id: string;
  date?: Date;
}

// ── Resolved photo with album inheritance applied ────────────────────────────

export interface ResolvedPhoto {
  id: string;
  title: string;
  image: string;
  description: string | undefined;
  tags: string[];
  location: string | undefined;
  date: Date | undefined;
  album: string | undefined;
  albumData: AlbumEntry | undefined;
}

// ── Readers ──────────────────────────────────────────────────────────────────

const contentDir = join(process.cwd(), 'content');

function readJson<T>(filePath: string): T {
  return JSON.parse(readFileSync(filePath, 'utf-8')) as T;
}

export function getPhotos(): PhotoEntry[] {
  const dir = join(contentDir, 'photos');
  return readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((file) => {
      const raw = readJson<PhotoData>(join(dir, file));
      return { ...raw, id: file.replace('.json', ''), date: raw.date ? new Date(raw.date) : undefined };
    });
}

export function getAlbums(): AlbumEntry[] {
  const dir = join(contentDir, 'albums');
  return readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((file) => {
      const raw = readJson<AlbumData>(join(dir, file));
      return { ...raw, id: file.replace('.json', ''), date: raw.date ? new Date(raw.date) : undefined };
    });
}

export function getAlbumIds(): string[] {
  return readdirSync(join(contentDir, 'albums'))
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace('.json', ''));
}

// ── Inheritance ──────────────────────────────────────────────────────────────

function resolvePhoto(photo: PhotoEntry, albums: AlbumEntry[]): ResolvedPhoto {
  const albumData = photo.album ? albums.find((a) => a.id === photo.album) : undefined;
  return {
    id: photo.id,
    title: photo.title,
    image: photo.image,
    description: photo.description ?? albumData?.description,
    // album tags first, then photo-specific tags
    tags: [...(albumData?.tags ?? []), ...photo.tags],
    location: photo.location ?? albumData?.location,
    date: photo.date ?? albumData?.date,
    album: photo.album,
    albumData,
  };
}

// ── Public API ───────────────────────────────────────────────────────────────

export function getAllResolvedPhotos(): ResolvedPhoto[] {
  const albums = getAlbums();
  return getPhotos().map((p) => resolvePhoto(p, albums));
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  getPhotos().forEach((p) => p.tags.forEach((t) => tags.add(t)));
  getAlbums().forEach((a) => a.tags.forEach((t) => tags.add(t)));
  return [...tags].sort();
}

export function getAlbumWithPhotos(slug: string) {
  const albums = getAlbums();
  const album = albums.find((a) => a.id === slug);
  if (!album) return null;
  const photos = getPhotos()
    .filter((p) => p.album === slug)
    .map((p) => resolvePhoto(p, albums));
  return { data: album, photos };
}
