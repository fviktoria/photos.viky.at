import { FC } from "react";
import type { ResolvedPhoto } from "@/lib/contentful/interfaces/photo.interface";
import { PhotoCard } from "./photo-card";

interface Props {
  photos: ResolvedPhoto[];
  id?: string;
}

export const PhotoGrid: FC<Props> = ({ photos, id = "portfolio-gallery" }) => {
  return (
    <div
      id={id}
      className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4"
      style={{ columnGap: "1rem" }}
    >
      {photos.map((photo, index) => (
        <PhotoCard key={photo.id} photo={photo} priority={index < 6} />
      ))}
    </div>
  );
};
