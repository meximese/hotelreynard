import { createClient } from "next-sanity";

const projectId =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-12-01";
const useCdn = process.env.NEXT_PUBLIC_SANITY_USE_CDN === "true";

function requireSanityConfig() {
  if (!projectId || !dataset) {
    throw new Error(
      "Missing Sanity project configuration for the site workspace.",
    );
  }

  return { projectId, dataset };
}

export function getSanityClient() {
  const { projectId: configuredProjectId, dataset: configuredDataset } =
    requireSanityConfig();

  return createClient({
    projectId: configuredProjectId,
    dataset: configuredDataset,
    apiVersion,
    useCdn,
    perspective: "published",
    stega: false,
  });
}

export const sanityReadToken = process.env.SANITY_API_READ_TOKEN;
