import Image from "next/image";
import type { SanityImage } from "@/lib/content/types";
import { urlFor } from "@/lib/sanity/image";

export function SanityImageView({
  image,
  alt,
  width = 1600,
  height = 1100,
  className,
  sizes = "100vw",
}: {
  image?: SanityImage;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
}) {
  if (!image?.asset?._ref) {
    return null;
  }

  const src = urlFor(image).width(width).height(height).fit("crop").auto("format").url();

  return (
    <Image
      src={src}
      alt={alt || image.alt || ""}
      width={width}
      height={height}
      sizes={sizes}
      className={className}
    />
  );
}
