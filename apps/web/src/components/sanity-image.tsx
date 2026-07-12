import Image, { getImageProps } from "next/image";
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

function getSanityImageProps({
  image,
  alt,
  width,
  height,
  className,
  sizes,
}: {
  image: SanityImage;
  alt?: string;
  width: number;
  height: number;
  className?: string;
  sizes: string;
}) {
  const dimensions = getImageDimensions(image.asset?._ref);
  const targetWidth = dimensions ? Math.min(width, dimensions.width) : width;
  const targetHeight = dimensions
    ? Math.round((targetWidth / dimensions.width) * dimensions.height)
    : height;
  const src = urlFor(image).width(targetWidth).fit("max").auto("format").url();

  return {
    src,
    width: targetWidth,
    height: targetHeight,
    alt: alt || image.alt || "",
    sizes,
    className,
  };
}

export function SanityImageView({
  image,
  mobileImage,
  alt,
  width = 1600,
  height = 1100,
  className,
  sizes = "100vw",
}: {
  image?: SanityImage;
  mobileImage?: SanityImage;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
}) {
  if (!image?.asset?._ref) {
    return null;
  }

  const desktopImageProps = getSanityImageProps({
    image,
    alt,
    width,
    height,
    className,
    sizes,
  });

  if (mobileImage?.asset?._ref) {
    const mobileImageProps = getSanityImageProps({
      image: mobileImage,
      alt,
      width,
      height,
      className,
      sizes,
    });
    const {
      props: { srcSet: mobileSrcSet },
    } = getImageProps(mobileImageProps);
    const { props: desktopProps } = getImageProps(desktopImageProps);

    return (
      <picture>
        <source media="(max-width: 900px)" srcSet={mobileSrcSet} />
        <img {...desktopProps} alt={desktopImageProps.alt} />
      </picture>
    );
  }

  return (
    <Image
      src={desktopImageProps.src}
      alt={desktopImageProps.alt}
      width={desktopImageProps.width}
      height={desktopImageProps.height}
      sizes={sizes}
      className={className}
    />
  );
}
