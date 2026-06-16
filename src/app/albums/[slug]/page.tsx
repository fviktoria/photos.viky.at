import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PhotoGrid } from "@/components/photo-grid";
import { Lightbox } from "@/components/light-box";
import { getAlbumSlugs, getAlbumWithPhotos } from "@/lib/contentful/services/album.service";
import { buildAlbumJsonLd } from "@/lib/seo/structured-data.util";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAlbumSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await getAlbumWithPhotos(slug);
  if (!result) return {};
  const { data: album, photos } = result;

  const coverUrl = album.cover ?? photos[0]?.image;
  const description = album.location?.toLowerCase().includes("vienna")
    ? album.description
    : `${album.description}${album.location ? ` – ${album.location}` : " – Vienna, Austria"}`;

  return {
    title: album.title,
    description,
    openGraph: {
      title: album.title,
      description,
      type: "article",
      ...(coverUrl && { images: [coverUrl] }),
    },
  };
}

export default async function AlbumPage({ params }: Props) {
  const { slug } = await params;
  const result = await getAlbumWithPhotos(slug);
  if (!result) notFound();

  const { data: album, photos } = result;

  const dateStr = album.date
    ? new Intl.DateTimeFormat("en-AT", {
        year: "numeric",
        month: "long",
      }).format(album.date)
    : "";

  const jsonLd = buildAlbumJsonLd(album, photos, slug);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-neutral-500">
        <ol className="flex items-center gap-2">
          <li>
            <Link
              href="/portfolio"
              className="hover:text-neutral-900 transition-colors"
            >
              Portfolio
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li className="text-neutral-900 font-medium" aria-current="page">
            {album.title}
          </li>
        </ol>
      </nav>

      {/* Album metadata */}
      <header className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          {album.title}
        </h1>
        <p className="text-neutral-600 text-lg max-w-2xl mb-5">
          {album.description}
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-neutral-500">
          {album.location && <span>{album.location}</span>}
          {dateStr && <span>{dateStr}</span>}
          {album.tags.length > 0 && <span>{album.tags.join(" · ")}</span>}
        </div>
      </header>

      {/* Contained photos */}
      {photos.length > 0 ? (
        <>
          <PhotoGrid photos={photos} id="album-gallery" />
          <Lightbox galleryId="album-gallery" />
        </>
      ) : (
        <p className="text-neutral-400">No photos in this album yet.</p>
      )}

      {/* Back link */}
      <div className="mt-16 pt-8 border-t border-neutral-100">
        <Link
          href="/portfolio"
          className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          ← Back to Portfolio
        </Link>
      </div>
    </main>
  );
}
