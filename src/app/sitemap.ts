import type { MetadataRoute } from "next";
import { getAlbumIds } from "@/lib/content";

export const dynamic = "force-static";

const SITE = "https://photos.viky.at";

export default function sitemap(): MetadataRoute.Sitemap {
  const albums = getAlbumIds().map((slug) => ({
    url: `${SITE}/albums/${slug}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  return [
    { url: SITE, lastModified: new Date(), priority: 1 },
    { url: `${SITE}/portfolio`, lastModified: new Date(), priority: 0.9 },
    ...albums,
    { url: `${SITE}/about`, lastModified: new Date(), priority: 0.5 },
    { url: `${SITE}/contact`, lastModified: new Date(), priority: 0.5 },
  ];
}
