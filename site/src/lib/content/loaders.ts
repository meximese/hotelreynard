import groq from "groq";
import {hasSanityConfig} from "@/lib/sanity/client";
import {DEFAULT_SANITY_REVALIDATE, sanityFetch} from "@/lib/sanity/fetch";
import type {Event, EventsPageData, GenericPage, HomePageData, Room} from "./types";

const linkProjection = groq`
  {
    linkType,
    href,
    openInNewTab,
    "reference": reference->{
      _id,
      _type,
      title,
      slug
    }
  }
`;

const pageSectionsProjection = groq`
  "sections": sections[]{
    ...,
    _type == "roomFeedBlock" => {
      ...,
      "rooms": rooms[]->{
        _id,
        _type,
        title,
        slug,
        shortDescription,
        heroImage,
        gallery,
        highlights,
        isPublicPageEnabled
      }
    },
    _type == "richTextBlock" => {
      ...,
      content
    },
    _type == "imageTextBlock" => {
      ...,
      "link": link${linkProjection}
    },
    _type == "inquiryBlock" => {
      ...,
      "link": link${linkProjection}
    },
    _type == "bookingEmbedBlock" => {
      ...,
      bookingButton
    },
    _type == "newsletterSignup" => {
      ...,
      "successRedirect": successRedirect${linkProjection}
    }
  }
`;

const pageHeroProjection = groq`
  hero{
    media,
    mobileMedia,
    caption,
    enableContent,
    title,
    body,
    "primaryLink": primaryLink${linkProjection},
    "secondaryLink": secondaryLink${linkProjection}
  }
`;

const HOME_PAGE_QUERY = groq`*[_type == "homePage"][0]{
  _id,
  _type,
  ${pageHeroProjection},
  title,
  pageIntro,
  ${pageSectionsProjection}
}`;

const FEATURED_ROOMS_QUERY = groq`*[_type == "room"] | order(sortOrder asc, title asc)[0...8]{
  _id,
  _type,
  title,
  slug,
  shortDescription,
  heroImage,
  gallery,
  highlights,
  isPublicPageEnabled
}`;

function emptyHomePage(): HomePageData {
  return {
    _id: "homePage",
    _type: "homePage",
    hero: undefined,
    title: "",
    pageIntro: [],
    sections: [],
  };
}

function emptyEventsPage(): EventsPageData {
  return {
    _id: "eventsPage",
    _type: "eventsPage",
    title: "",
    pageIntro: [],
    sections: [],
  };
}

export async function getHomePage(): Promise<HomePageData> {
  if (!hasSanityConfig()) {
    return emptyHomePage();
  }

  const data = await sanityFetch<HomePageData | null>({
    query: HOME_PAGE_QUERY,
    tags: ["homePage", "room", "event"],
    revalidate: DEFAULT_SANITY_REVALIDATE,
  });

  return data || emptyHomePage();
}

export async function getFeaturedRooms(): Promise<Room[]> {
  if (!hasSanityConfig()) {
    return [];
  }

  const data = await sanityFetch<Room[]>({
    query: FEATURED_ROOMS_QUERY,
    tags: ["room"],
    revalidate: DEFAULT_SANITY_REVALIDATE,
  });

  return data;
}

export async function getUpcomingEvents(limit = 6): Promise<Event[]> {
  if (!hasSanityConfig()) {
    return [];
  }

  const data = await sanityFetch<Event[]>({
    query: groq`*[_type == "event" && status == "scheduled"] | order(startDateTime asc)[0...$limit]{
      _id,
      _type,
      title,
      slug,
      summary,
      venueType,
      startDateTime,
      heroImage
    }`,
    params: {limit},
    tags: ["event"],
    revalidate: DEFAULT_SANITY_REVALIDATE,
  });

  return data;
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  if (!hasSanityConfig()) {
    return null;
  }

  return sanityFetch<Event | null>({
    query: groq`*[_type == "event" && slug.current == $slug][0]{
      _id,
      _type,
      title,
      slug,
      summary,
      venueType,
      startDateTime,
      "body": body.content,
      heroImage,
      "link": link${linkProjection}
    }`,
    params: {slug},
    tags: ["event", `event:${slug}`],
    revalidate: DEFAULT_SANITY_REVALIDATE,
  });
}

export async function getRoomBySlug(slug: string): Promise<Room | null> {
  if (!hasSanityConfig()) {
    return null;
  }

  return sanityFetch<Room | null>({
    query: groq`*[_type == "room" && slug.current == $slug][0]{
      _id,
      _type,
      title,
      slug,
      shortDescription,
      "body": body.content,
      heroImage,
      gallery,
      highlights,
      isPublicPageEnabled
    }`,
    params: {slug},
    tags: ["room", `room:${slug}`],
    revalidate: DEFAULT_SANITY_REVALIDATE,
  });
}

export async function getGenericPageBySlug(slug: string): Promise<GenericPage | null> {
  if (!hasSanityConfig()) {
    return null;
  }

  return sanityFetch<GenericPage | null>({
    query: groq`*[_type == "page" && slug.current == $slug][0]{
      _id,
      _type,
      ${pageHeroProjection},
      title,
      pageIntro,
      slug,
      ${pageSectionsProjection}
    }`,
    params: {slug},
    tags: ["page", `page:${slug}`],
    revalidate: DEFAULT_SANITY_REVALIDATE,
  });
}

export async function getEventsPageData(): Promise<EventsPageData> {
  if (!hasSanityConfig()) {
    return emptyEventsPage();
  }

  const data = await sanityFetch<EventsPageData | null>({
    query: groq`*[_type == "eventsPage"][0]{
      _id,
      _type,
      ${pageHeroProjection},
      title,
      pageIntro,
      ${pageSectionsProjection}
    }`,
    tags: ["eventsPage"],
    revalidate: DEFAULT_SANITY_REVALIDATE,
  });

  return data || emptyEventsPage();
}
