import { createImageUrlBuilder } from "@sanity/image-url";
import type { Image } from "@sanity/types";
import { getSanityClient } from "./client";

export function urlFor(source: Image) {
  return createImageUrlBuilder(getSanityClient()).image(source);
}
