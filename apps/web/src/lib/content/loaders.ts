import groq from "groq";
import { hasSanityConfig } from "@/lib/sanity/client";
import { DEFAULT_SANITY_REVALIDATE, sanityFetch } from "@/lib/sanity/fetch";
import {
  fallbackEvents,
  fallbackEventsPage,
  fallbackHomePage,
  fallbackLocationPage,
  fallbackPrivateEventsPage,
  fallbackRestaurantPage,
  fallbackRooms,
  fallbackStayPage,
} from "./fallback";
import type { Event, GenericPage, HomePageData, Room, SingletonPageData } from "./types";

const pageSectionsProjection = groq`
  "sections": sections[]{
    ...,
    _type == "richTextBlock" => {
      ...,
      content
    }
  }
`;

const HOME_PAGE_QUERY = groq`*[_type == "homePage"][0]{
  title,
  intro,
  primaryCta,
  secondaryCta,
  "featuredRooms": featuredRooms[]->{
    _id,
    title,
    slug,
    shortDescription,
    heroImage,
    gallery,
    highlights,
    isPublicPageEnabled
  },
  "upcomingEvents": *[_type == "event" && status == "scheduled"] | order(startDateTime asc)[0...3]{
    _id,
    title,
    slug,
    summary,
    venueType,
    startDateTime,
    heroImage
  },
  ${pageSectionsProjection}
}`;

const FEATURED_ROOMS_QUERY = groq`*[_type == "room"] | order(sortOrder asc, title asc)[0...8]{
  _id,
  title,
  slug,
  shortDescription,
  heroImage,
  gallery,
  highlights,
  isPublicPageEnabled
}`;

const UPCOMING_EVENTS_QUERY = groq`*[_type == "event" && status == "scheduled"] | order(startDateTime asc)[0...6]{
  _id,
  title,
  slug,
  summary,
  venueType,
  startDateTime,
  heroImage
}`;

export async function getHomePage(): Promise<HomePageData> {
  if (!hasSanityConfig()) {
    return fallbackHomePage;
  }

  const data = await sanityFetch<HomePageData | null>({
    query: HOME_PAGE_QUERY,
    tags: ["homePage", "room", "event"],
    revalidate: DEFAULT_SANITY_REVALIDATE,
  });

  return data || fallbackHomePage;
}

export async function getFeaturedRooms(): Promise<Room[]> {
  if (!hasSanityConfig()) {
    return fallbackRooms;
  }

  const data = await sanityFetch<Room[]>({
    query: FEATURED_ROOMS_QUERY,
    tags: ["room"],
    revalidate: DEFAULT_SANITY_REVALIDATE,
  });

  return data.length ? data : fallbackRooms;
}

export async function getUpcomingEvents(): Promise<Event[]> {
  if (!hasSanityConfig()) {
    return fallbackEvents;
  }

  const data = await sanityFetch<Event[]>({
    query: UPCOMING_EVENTS_QUERY,
    tags: ["event"],
    revalidate: DEFAULT_SANITY_REVALIDATE,
  });

  return data.length ? data : fallbackEvents;
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  if (!hasSanityConfig()) {
    return fallbackEvents.find((event) => event.slug.current === slug) || null;
  }

  return sanityFetch<Event | null>({
    query: groq`*[_type == "event" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      summary,
      venueType,
      startDateTime,
      "body": body.content,
      heroImage,
      cta
    }`,
    params: { slug },
    tags: ["event", `event:${slug}`],
    revalidate: DEFAULT_SANITY_REVALIDATE,
  });
}

export async function getRoomBySlug(slug: string): Promise<Room | null> {
  if (!hasSanityConfig()) {
    return fallbackRooms.find((room) => room.slug.current === slug) || null;
  }

  return sanityFetch<Room | null>({
    query: groq`*[_type == "room" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      shortDescription,
      "body": body.content,
      heroImage,
      gallery,
      highlights,
      isPublicPageEnabled
    }`,
    params: { slug },
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
      title,
      slug,
      ${pageSectionsProjection}
    }`,
    params: { slug },
    tags: ["page", `page:${slug}`],
    revalidate: DEFAULT_SANITY_REVALIDATE,
  });
}

async function getSingletonPage(
  type: string,
  fallback: SingletonPageData,
): Promise<SingletonPageData> {
  if (!hasSanityConfig()) {
    return fallback;
  }

  const data = await sanityFetch<SingletonPageData | null>({
    query: groq`*[_type == $type][0]{
      title,
      intro,
      ${pageSectionsProjection}
    }`,
    params: { type },
    tags: [type],
    revalidate: DEFAULT_SANITY_REVALIDATE,
  });

  return data || fallback;
}

export function getStayPage() {
  return getSingletonPage("stayPage", fallbackStayPage);
}

export function getRestaurantPage() {
  return getSingletonPage("restaurantPage", fallbackRestaurantPage);
}

export function getEventsPageData() {
  return getSingletonPage("eventsPage", fallbackEventsPage);
}

export function getPrivateEventsPage() {
  return getSingletonPage("privateEventsPage", fallbackPrivateEventsPage);
}

export function getLocationPage() {
  return getSingletonPage("locationPage", fallbackLocationPage);
}
