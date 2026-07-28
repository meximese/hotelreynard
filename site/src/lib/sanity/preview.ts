import { createDataAttribute, stegaClean } from "next-sanity";
import type { StudioPathLike } from "@sanity/client/csm";
import { getStudioUrl } from "./client";

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
  return createDataAttribute({
    baseUrl: getStudioUrl(),
    id,
    type,
    path,
  }).toString();
}
