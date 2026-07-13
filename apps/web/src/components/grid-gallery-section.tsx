"use client";

import { SanityImageView } from "@/components/sanity-image";
import type { GalleryImage } from "@/lib/content/types";

export function GridGallerySection({
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
          {eyebrow ? <span className="eyebrow">{eyebrow}</span> : <span />}
          {title ? <span className="eyebrow">{title}</span> : <span />}
        </div>
      ) : null}

      <div className="gallery-grid">
        {images.map((image, index) => (
          <div
            key={`${image.asset?._ref || "image"}-${index}`}
            className={`gallery-grid__item${image.fullWidth ? " gallery-grid__item--full" : ""}`}
          >
            <SanityImageView
              image={image}
              alt={image.alt || `${title || "Gallery"} image ${index + 1}`}
              width={1400}
              height={1100}
              sizes="(max-width: 767px) 100vw, 50vw"
              className="gallery-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
