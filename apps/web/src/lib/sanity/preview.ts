import { createDataAttribute, stegaClean } from "next-sanity";
import type { StudioPathLike } from "@sanity/client/csm";

export function getVisualEditingEnabled() {
  return process.env.NEXT_PUBLIC_SANITY_VISUAL_EDITING_ENABLED === "true";
}

export function cleanStegaString(value: string) {
  return stegaClean(value);
}

export function createSanityDataAttribute({
  id,
  type,
  path,
}: {
  id: string;
  type: string;
  path: StudioPathLike;
}) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ||
    process.env.SANITY_STUDIO_PREVIEW_URL ||
    "http://localhost:4321";

  return createDataAttribute({
    baseUrl,
    id,
    type,
    path,
  }).toString();
}
