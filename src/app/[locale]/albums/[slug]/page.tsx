import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PhotoGrid } from "@/components/photo-grid";
import { Lightbox } from "@/components/light-box";
import {
  getAlbumSlugs,
  getAlbumWithPhotos,
} from "@/lib/contentful/services/album.service";
import { buildAlbumJsonLd } from "@/lib/seo/structured-data.util";

export const dynamicParams = false;

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAlbumSlugs();
  return slugs.length > 0 ? slugs.map((slug) => ({ slug })) : [{ slug: "_" }];
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
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const result = await getAlbumWithPhotos(slug);
  if (!result) notFound();

  const { data: album, photos } = result;
  const t = await getTranslations("album");

  const intlLocale = locale === "de" ? "de-AT" : "en-US";
  const dateStr = album.date
    ? new Intl.DateTimeFormat(intlLocale, {
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

      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-neutral-500">
        <ol className="flex items-center gap-2">
          <li>
            <Link
              href="/portfolio"
              className="hover:text-neutral-900 transition-colors"
            >
              {t("breadcrumb")}
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li className="text-neutral-900 font-medium" aria-current="page">
            {album.title}
          </li>
        </ol>
      </nav>

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
          {album.tags.length > 0 && <span>{album.tags.map((t) => t.label).join(" · ")}</span>}
        </div>
      </header>

      {photos.length > 0 ? (
        <>
          <PhotoGrid photos={photos} id="album-gallery" />
          <Lightbox galleryId="album-gallery" />
        </>
      ) : (
        <p className="text-neutral-400">{t("noPhotos")}</p>
      )}

      <div className="mt-16 pt-8 border-t border-neutral-100">
        <Link
          href="/portfolio"
          className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          {t("backToPortfolio")}
        </Link>
      </div>
    </main>
  );
}
