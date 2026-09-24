import { createClient } from "next-sanity";
import { studioUrl } from "./env";

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-07-01";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "";
export const useCdn = process.env.NEXT_PUBLIC_SANITY_USE_CDN === "true";
export const sanityReadToken = process.env.SANITY_API_READ_TOKEN;

export const sanityClient =
  projectId && dataset
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn,
        perspective: "published",
        stega: false,
      })
    : null;

export function hasSanityConfig() {
  return Boolean(sanityClient);
}

export function getSanityClient() {
  if (!projectId || !dataset) {
    throw new Error("Missing Sanity project configuration.");
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    perspective: "published",
    stega: false,
  });
}
