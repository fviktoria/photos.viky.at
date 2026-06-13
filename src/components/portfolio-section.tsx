"use client";

import { FC, useState } from "react";
import type { ResolvedPhoto } from "@/lib/content";
import { PhotoGrid } from "./photo-grid";
import { TagFilter } from "./tag-filter";
import { Lightbox } from "./light-box";

const GALLERY_ID = "portfolio-gallery";

interface Props {
  photos: ResolvedPhoto[];
  tags: string[];
}

export const PortfolioSection: FC<Props> = ({ photos, tags }) => {
  const [activeTag, setActiveTag] = useState("all");

  const filtered =
    activeTag === "all"
      ? photos
      : photos.filter((p) => p.tags.includes(activeTag));

  return (
    <section aria-label="Photography portfolio">
      {tags.length > 0 && (
        <TagFilter tags={tags} activeTag={activeTag} onFilter={setActiveTag} />
      )}
      <PhotoGrid photos={filtered} id={GALLERY_ID} />
      <Lightbox galleryId={GALLERY_ID} />
    </section>
  );
};
