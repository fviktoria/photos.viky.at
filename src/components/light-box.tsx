"use client";

import { FC, useEffect } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

interface Props {
  galleryId: string;
}

export const Lightbox: FC<Props> = ({ galleryId }) => {
  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: `#${galleryId}`,
      children: "a.photo-card",
      pswpModule: () => import("photoswipe"),
      showHideAnimationType: "zoom",
    });

    lightbox.on("uiRegister", () => {
      lightbox.pswp!.ui!.registerElement({
        name: "photo-caption",
        order: 9,
        isButton: false,
        appendTo: "wrapper",
        onInit(el, pswp) {
          el.classList.add("pswp__photo-caption");
          pswp.on("change", () => {
            const a = pswp.currSlide?.data?.element as
              | HTMLAnchorElement
              | undefined;
            if (!a) {
              el.innerHTML = "";
              return;
            }
            const title = a.dataset.pswpTitle ?? "";
            const description = a.dataset.pswpDescription ?? "";
            const location = a.dataset.pswpLocation ?? "";
            const date = a.dataset.pswpDate ?? "";
            const meta = [location, date].filter(Boolean).join(" · ");
            el.innerHTML = [
              title ? `<strong>${title}</strong>` : "",
              description ? `<p>${description}</p>` : "",
              meta ? `<small>${meta}</small>` : "",
            ]
              .filter(Boolean)
              .join("");
          });
        },
      });
    });

    lightbox.init();
    return () => lightbox.destroy();
  }, [galleryId]);

  return null;
};
