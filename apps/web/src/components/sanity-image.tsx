import Image from "next/image";
import type { SanityImage } from "@/lib/content/types";
import { urlFor } from "@/lib/sanity/image";

function getImageDimensions(assetRef?: string) {
  if (!assetRef) {
    return null;
  }

  const match = assetRef.match(/-(\d+)x(\d+)-/);

  if (!match) {
    return null;
  }

  const width = Number(match[1]);
  const height = Number(match[2]);

  if (!width || !height) {
    return null;
  }

  return { width, height };
}

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

  const dimensions = getImageDimensions(image.asset._ref);
  const targetWidth = dimensions ? Math.min(width, dimensions.width) : width;
  const targetHeight = dimensions
    ? Math.round((targetWidth / dimensions.width) * dimensions.height)
    : height;
  const src = urlFor(image).width(targetWidth).fit("max").auto("format").url();

  return (
    <Image
      src={src}
      alt={alt || image.alt || ""}
      width={targetWidth}
      height={targetHeight}
      sizes={sizes}
      className={className}
    />
  );
}
