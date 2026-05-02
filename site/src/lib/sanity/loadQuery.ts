import type { QueryParams } from "sanity";
import { sanityClient, sanityReadToken } from "./client";

export async function loadQuery<QueryResponse>({
  query,
  params,
  visualEditingEnabled = false,
}: {
  query: string;
  params?: QueryParams;
  visualEditingEnabled?: boolean;
}) {
  if (visualEditingEnabled && !sanityReadToken) {
    throw new Error(
      "The `SANITY_API_READ_TOKEN` environment variable is required during Visual Editing.",
    );
  }

  const perspective = visualEditingEnabled ? "drafts" : "published";

  const { result, resultSourceMap } = await sanityClient.fetch<QueryResponse>(
    query,
    params ?? {},
    {
      filterResponse: false,
      perspective,
      resultSourceMap: visualEditingEnabled ? "withKeyArraySelector" : false,
      stega: visualEditingEnabled,
      ...(visualEditingEnabled ? { token: sanityReadToken } : {}),
      useCdn: !visualEditingEnabled,
    },
  );

  return {
    data: result,
    perspective,
    sourceMap: resultSourceMap,
  };
}
