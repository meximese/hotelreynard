import {cleanStegaString} from "@/lib/sanity/preview";
import type {SanityLink} from "./types";

export function resolveSanityLinkHref(link?: SanityLink | null): string | undefined {
  if (!link) {
    return undefined;
  }

  if ((link.linkType === "relative" || link.linkType === "external") && link.href) {
    return cleanStegaString(link.href);
  }

  if (link.linkType === "internal" && link.reference) {
    const reference = link.reference;

    if (reference._type === "homePage") {
      return "/";
    }

    if (reference._type === "eventsPage") {
      return "/events";
    }

    if (reference.slug?.current) {
      if (reference._type === "event") {
        return `/events/${cleanStegaString(reference.slug.current)}`;
      }

      if (reference._type === "room") {
        return `/rooms/${cleanStegaString(reference.slug.current)}`;
      }

      return `/${cleanStegaString(reference.slug.current)}`;
    }
  }

  return undefined;
}
