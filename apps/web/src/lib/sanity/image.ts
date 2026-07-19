import { createImageUrlBuilder } from "@sanity/image-url";
import type { Image } from "@sanity/types";
import { sanityClient } from "./client";

const builder = sanityClient ? createImageUrlBuilder(sanityClient) : null;

export function urlFor(source: Image) {
  if (!builder) {
    throw new Error("Sanity image builder is unavailable without project configuration.");
  }

  return builder.image(source);
}
