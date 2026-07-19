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
  title,
  images,
}: {
  title?: string;
  images: GalleryImage[];
}) {
  return (
    <div aria-label={title || "Gallery"}>
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
