import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { getSanityClient, sanityReadToken } from "@/lib/sanity/client";

export const { GET } = defineEnableDraftMode({
  client: getSanityClient().withConfig({ token: sanityReadToken }),
});
