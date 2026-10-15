"use client";

import { useMemo, useSyncExternalStore } from "react";
import type { ResolvedPhoto } from "@/lib/contentful/interfaces/photo.interface";
import { PhotoCard } from "./photo-card";

interface Props {
  photos: ResolvedPhoto[];
  id?: string;
}

const breakpoints = [
  { minWidth: 1280, columns: 4 },
  { minWidth: 1024, columns: 3 },
  { minWidth: 640, columns: 2 },
  { minWidth: 0, columns: 1 },
];

function getColumnCount() {
  if (typeof window === "undefined") return 4;
  return breakpoints.find((bp) => window.innerWidth >= bp.minWidth)!.columns;
}

function subscribeToResize(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function distributeToColumns(
  photos: ResolvedPhoto[],
  numColumns: number,
): ResolvedPhoto[][] {
  const cols: ResolvedPhoto[][] = Array.from({ length: numColumns }, () => []);
  const heights = new Array(numColumns).fill(0);

  for (const photo of photos) {
    const shortestCol = heights.indexOf(Math.min(...heights));
    cols[shortestCol].push(photo);
    const aspectRatio =
      photo.width && photo.height ? photo.height / photo.width : 1;
    heights[shortestCol] += aspectRatio;
  }

  return cols;
}

export const PhotoGrid = ({ photos, id = "portfolio-gallery" }: Props) => {
  const numColumns = useSyncExternalStore(
    subscribeToResize,
    getColumnCount,
    () => 4,
  );
  const cols = useMemo(
    () => distributeToColumns(photos, numColumns),
    [photos, numColumns],
  );

  return (
    <div id={id} className="photo-grid flex gap-4">
      {cols.map((colPhotos, colIndex) => (
        <div
          key={colIndex}
          className="photo-grid-column flex flex-col flex-1 gap-4 min-w-0"
        >
          {colPhotos.map((photo, index) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              priority={colIndex < 2 && index === 0}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            />
          ))}
        </div>
      ))}
    </div>
  );
};
