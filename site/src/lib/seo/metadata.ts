import type {Metadata} from "next";
import type {SeoSettings} from "@/lib/content/types";

export function metadataForSeo(seo?: SeoSettings): Metadata {
  return {
    robots: {
      index: seo?.noIndex !== true,
      follow: true,
    },
  };
}
