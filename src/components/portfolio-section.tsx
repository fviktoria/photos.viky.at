"use client";

import { FC, useState } from "react";
import type { ResolvedPhoto } from "@/lib/contentful/interfaces/photo.interface";
import type { ResolvedTag } from "@/lib/contentful/interfaces/tag.interface";
import { PhotoGrid } from "./photo-grid";
import { TagFilter } from "./tag-filter";
import { Lightbox } from "./light-box";

const GALLERY_ID = "portfolio-gallery";

interface Props {
  photos: ResolvedPhoto[];
  tags: ResolvedTag[];
}

export const PortfolioSection: FC<Props> = ({ photos, tags }) => {
  const [activeTag, setActiveTag] = useState("all");

  const usedTagIds = new Set(photos.flatMap((p) => p.tags.map((t) => t.id)));
  const visibleTags = tags.filter((t) => usedTagIds.has(t.id));

  const filtered =
    activeTag === "all"
      ? photos
      : photos.filter((p) => p.tags.some((t) => t.id === activeTag));

  return (
    <section aria-label="Photography portfolio">
      {visibleTags.length > 0 && (
        <TagFilter
          tags={visibleTags}
          activeTag={activeTag}
          onFilter={setActiveTag}
        />
      )}
      <PhotoGrid photos={filtered} id={GALLERY_ID} />
      <Lightbox galleryId={GALLERY_ID} />
    </section>
  );
};
