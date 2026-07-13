"use client";

import { SanityImageView } from "@/components/sanity-image";
import type { SanityImage } from "@/lib/content/types";

export function VerticalGallerySection({
  eyebrow,
  title,
  images,
  showGalleryHeader = false,
}: {
  eyebrow?: string;
  title?: string;
  images: SanityImage[];
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

      <div className="gallery-vertical">
        {images.map((image, index) => (
          <div key={`${image.asset?._ref || "image"}-${index}`} className="gallery-vertical__item">
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
