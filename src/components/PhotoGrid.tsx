import type { ResolvedPhoto } from "@/lib/content";
import PhotoCard from "./PhotoCard";

interface Props {
  photos: ResolvedPhoto[];
  id?: string;
}

export default function PhotoGrid({ photos, id = "portfolio-gallery" }: Props) {
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
}
