import type { ResolvedPhoto } from "@/lib/content";

interface Props {
  photo: ResolvedPhoto;
}

export default function PhotoCard({ photo }: Props) {
  const descExcerpt = photo.description
    ? photo.description.slice(0, 60).trimEnd()
    : "";
  const alt = [photo.title, photo.location, descExcerpt]
    .filter(Boolean)
    .join(" – ");

  const dateStr = photo.date
    ? new Intl.DateTimeFormat("en-AT", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(photo.date)
    : "";

  return (
    <a
      href={photo.image}
      className="photo-card block mb-4 break-inside-avoid overflow-hidden rounded-sm group cursor-zoom-in"
      data-tags={photo.tags.join(",")}
      data-pswp-title={photo.title}
      data-pswp-description={photo.description ?? ""}
      data-pswp-location={photo.location ?? ""}
      data-pswp-date={dateStr}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo.image}
        alt={alt}
        decoding="async"
        className="w-full h-auto block transition-opacity duration-200 group-hover:opacity-90"
      />
    </a>
  );
}
