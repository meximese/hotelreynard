"use client";

import { SanityImageView } from "@/components/sanity-image";
import { BuiText } from "@/components/ui/typography";
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
          {eyebrow ? <BuiText as="span" variant="eyebrow" className="eyebrow">{eyebrow}</BuiText> : null}
          {title ? <BuiText as="span" className="gallery-section__title">{title}</BuiText> : null}
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
