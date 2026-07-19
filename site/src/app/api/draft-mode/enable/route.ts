import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { getSanityClient, hasSanityConfig, sanityReadToken } from "@/lib/sanity/client";

export async function GET(request: Request) {
  if (!hasSanityConfig() || !sanityReadToken) {
    return new Response("Missing Sanity preview configuration.", { status: 500 });
  }

  const { GET: enableDraftMode } = defineEnableDraftMode({
    client: getSanityClient().withConfig({ token: sanityReadToken }),
  });

  return enableDraftMode(request);
}
