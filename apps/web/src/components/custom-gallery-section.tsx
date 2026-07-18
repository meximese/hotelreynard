"use client";

import { SanityImageView } from "@/components/sanity-image";
import type { GalleryImage } from "@/lib/content/types";

function getCustomGalleryLayout(image: GalleryImage) {
  if (image.fullWidth) {
    return "wide";
  }

  if (image.layout) {
    return image.layout;
  }

  return "center";
}

export function CustomGallerySection({
  eyebrow,
  title,
  images,
  showGalleryHeader = false,
}: {
  eyebrow?: string;
  title?: string;
  images: GalleryImage[];
  showGalleryHeader?: boolean;
}) {
  return (
    <div className="gallery-section" aria-label={title || "Gallery"}>
      {showGalleryHeader && (eyebrow || title) ? (
        <div className="gallery-section__head">
          {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
          {title ? <span className="gallery-section__title">{title}</span> : null}
        </div>
      ) : null}

      <div className="gallery-custom">
        {images.map((image, index) => {
          const layout = getCustomGalleryLayout(image);

          return (
            <div
              key={`${image.asset?._ref || "image"}-${index}`}
              className={`gallery-custom__item gallery-custom__item--${layout}`}
            >
              <SanityImageView
                image={image}
                alt={image.alt || `${title || "Gallery"} image ${index + 1}`}
                width={1600}
                height={1200}
                sizes={
                  layout === "wide"
                    ? "100vw"
                    : layout === "half"
                      ? "(max-width: 767px) 100vw, 50vw"
                      : "(max-width: 767px) 100vw, 50vw"
                }
                className="gallery-image"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
