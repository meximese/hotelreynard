import { createClient } from "next-sanity";

const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-07-01";
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "";

export const sanityClient =
  projectId && dataset
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: process.env.NODE_ENV === "production",
      })
    : null;

export function hasSanityConfig() {
  return Boolean(sanityClient);
}
