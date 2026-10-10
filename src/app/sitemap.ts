import type { MetadataRoute } from "next";
import { getAlbumSlugs } from "@/lib/contentful/services/album.service";
import { getAllServicePageSlugs } from "@/lib/contentful/services/service-page.service";

export const dynamic = "force-static";

const SITE = "https://photos.viky.at";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [albumSlugs, servicePageSlugs] = await Promise.all([
    getAlbumSlugs(),
    getAllServicePageSlugs(),
  ]);

  const albums = albumSlugs.map((slug) => ({
    url: `${SITE}/albums/${slug}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  const servicePages = servicePageSlugs.map((slug) => ({
    url: `${SITE}/${slug}`,
    lastModified: new Date(),
    priority: 0.9,
  }));

  return [
    { url: SITE, lastModified: new Date(), priority: 1 },
    { url: `${SITE}/portfolio`, lastModified: new Date(), priority: 0.9 },
    ...servicePages,
    ...albums,
    { url: `${SITE}/about`, lastModified: new Date(), priority: 0.5 },
    { url: `${SITE}/contact`, lastModified: new Date(), priority: 0.5 },
  ];
}
