import { createDataAttribute, stegaClean } from "next-sanity";
import type { StudioPathLike } from "@sanity/client/csm";
import { studioUrl, visualEditingEnabled } from "./env";

export function getVisualEditingEnabled() {
  return visualEditingEnabled;
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
  if (!visualEditingEnabled) {
    return undefined;
  }

  return createDataAttribute({
    baseUrl: studioUrl!,
    id,
    type,
    path,
  }).toString();
}
