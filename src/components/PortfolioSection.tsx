"use client";

import { useState } from "react";
import type { ResolvedPhoto } from "@/lib/content";
import PhotoGrid from "./PhotoGrid";
import TagFilter from "./TagFilter";
import Lightbox from "./Lightbox";

const GALLERY_ID = "portfolio-gallery";

interface Props {
  photos: ResolvedPhoto[];
  tags: string[];
}

export default function PortfolioSection({ photos, tags }: Props) {
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
}
