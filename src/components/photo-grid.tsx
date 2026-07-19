"use client";

import Masonry from "react-masonry-css";
import type { ResolvedPhoto } from "@/lib/contentful/interfaces/photo.interface";
import { PhotoCard } from "./photo-card";

interface Props {
  photos: ResolvedPhoto[];
  id?: string;
}

const breakpointCols = {
  default: 4,
  1280: 3,
  1024: 2,
  640: 1,
};

export const PhotoGrid = ({ photos, id = "portfolio-gallery" }: Props) => {
  return (
    <Masonry
      id={id}
      breakpointCols={breakpointCols}
      className="masonry-grid"
      columnClassName="masonry-grid-column"
    >
      {photos.map((photo, index) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          priority={index < 6}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        />
      ))}
    </Masonry>
  );
};
