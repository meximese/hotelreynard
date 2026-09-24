import { SanityImageView } from "@/components/sanity-image";
import type { GalleryImage } from "@/lib/content/types";

export function VerticalGallerySection({
  title,
  images,
}: {
  title?: string;
  images: GalleryImage[];
}) {
  return (
    <div aria-label={title || "Gallery"}>
      <div className="gallery-vertical">
        {images.map((image, index) => (
          <div
            key={`${image.asset?._ref || "image"}-${index}`}
            className={`gallery-vertical__item${image.fullWidth ? " gallery-vertical__item--full" : ""}`}
          >
            <SanityImageView
              image={image}
              alt={image.alt || `${title || "Gallery"} image ${index + 1}`}
              width={1400}
              height={1100}
              sizes={image.fullWidth ? "100vw" : "(max-width: 767px) 100vw, 50vw"}
              className="gallery-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
