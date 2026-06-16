import type { AlbumEntry } from "@/lib/contentful/interfaces/album.interface";
import type { ResolvedPhoto } from "@/lib/contentful/interfaces/photo.interface";

const SITE_URL = "https://photos.viky.at";

export const homePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Viky Photography",
  url: SITE_URL,
  mainEntity: {
    "@type": "Person",
    name: "Viky",
    url: SITE_URL,
    jobTitle: "Photographer",
    description:
      "Photographer based in Vienna, Austria specialising in event photography, portrait photography, and documentary photography.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Vienna",
      addressCountry: "AT",
    },
  },
};

export function buildAlbumJsonLd(album: AlbumEntry, photos: ResolvedPhoto[], slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: album.title,
    description: album.description,
    url: `${SITE_URL}/albums/${slug}`,
    creator: { "@type": "Person", name: "Viky", url: SITE_URL },
    ...(album.date && { dateCreated: album.date.toISOString().split("T")[0] }),
    ...(album.location && {
      contentLocation: { "@type": "Place", name: album.location },
    }),
    hasPart: photos.map((p) => ({
      "@type": "Photograph",
      name: p.slug,
      ...(p.description && { description: p.description }),
      contentUrl: p.image,
      creator: { "@type": "Person", name: "Viky", url: SITE_URL },
      ...(p.date && { dateCreated: p.date.toISOString().split("T")[0] }),
      ...(p.location && {
        contentLocation: { "@type": "Place", name: p.location },
      }),
    })),
  };
}
