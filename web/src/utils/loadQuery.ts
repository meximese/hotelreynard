import type { QueryParams } from "sanity";
import { sanityClient } from "sanity:client";
const token = import.meta.env.SANITY_API_READ_TOKEN;

export async function loadQuery<QueryResponse>({
  query,
  params,
  visualEditingEnabled = false,
}: {
  query: string;
  params?: QueryParams;
  visualEditingEnabled?: boolean;
}) {
  // When preview mode is on, switch to drafts + stega so Presentation can
  // connect overlays to the rendered content in the iframe.
  if (visualEditingEnabled && !token) {
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
      ...(visualEditingEnabled ? { token } : {}),
      useCdn: !visualEditingEnabled,
    },
  );

  return {
    data: result,
    perspective,
    sourceMap: resultSourceMap,
  };
}
