import type { FC } from "react";
import Link from "next/link";
import type { ResolvedServicePage } from "@/lib/contentful/interfaces/service-page.interface";
import { PhotoGrid } from "./photo-grid";
import { Lightbox } from "./light-box";

const GALLERY_ID = "service-gallery";

interface Props {
  page: ResolvedServicePage;
}

export const ServicePage: FC<Props> = ({ page }) => {
  return (
    <>
      <section className="pt-16 pb-12 sm:pt-20 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-4">
            {page.headline}
          </h1>
          {page.tagline && (
            <p className="text-lg sm:text-xl text-neutral-600 mb-5">
              {page.tagline}
            </p>
          )}
          {page.bodyText && (
            <p className="text-neutral-500 max-w-xl leading-relaxed">
              {page.bodyText}
            </p>
          )}
          {page.ctaLabel && (
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-block px-6 py-3 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-700 transition-colors duration-150"
              >
                {page.ctaLabel}
              </Link>
            </div>
          )}
        </div>
      </section>
      {page.photos.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
          <PhotoGrid photos={page.photos} id={GALLERY_ID} />
          <Lightbox galleryId={GALLERY_ID} />
        </section>
      )}
    </>
  );
};
