import type { ClientPerspective, QueryParams } from "@sanity/client";
import { draftMode } from "next/headers";
import { getSanityClient, hasSanityConfig, sanityReadToken, studioUrl, useCdn } from "./client";
import { getVisualEditingEnabled } from "./preview";

export const DEFAULT_SANITY_REVALIDATE = 120;

type SanityFetchOptions = {
  query: string;
  params?: QueryParams;
  tags?: string[];
  revalidate?: number | false;
  perspective?: Exclude<ClientPerspective, "raw">;
  stega?: boolean;
};

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags = [],
  revalidate = DEFAULT_SANITY_REVALIDATE,
  perspective,
  stega,
}: SanityFetchOptions): Promise<QueryResponse> {
  if (!hasSanityConfig()) {
    throw new Error("Missing Sanity project configuration.");
  }

  const draft = await draftMode();
  const canPreview = draft.isEnabled && getVisualEditingEnabled() && Boolean(sanityReadToken);
  const resolvedPerspective = perspective || (canPreview ? "drafts" : "published");
  const resolvedStega = stega ?? canPreview;
  const client = getSanityClient().withConfig({
    perspective: resolvedPerspective,
    stega: resolvedStega ? { studioUrl } : false,
    token: resolvedPerspective === "published" ? undefined : sanityReadToken,
    useCdn: resolvedPerspective === "published" ? useCdn : false,
  });

  return client.fetch<QueryResponse>(query, params, {
    cache: canPreview ? "no-store" : undefined,
    next: {
      revalidate: canPreview ? 0 : revalidate,
      tags: ["sanity", ...tags],
    },
  });
}
