import groq from "groq";
import { hasSanityConfig, sanityClient } from "@/lib/sanity/client";
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

export async function getHomePage(): Promise<HomePageData> {
  if (!hasSanityConfig() || !sanityClient) {
    return fallbackHomePage;
  }

  const data = await sanityClient.fetch<HomePageData | null>(groq`*[_type == "homePage"][0]{
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
  }`);

  return data || fallbackHomePage;
}

export async function getFeaturedRooms(): Promise<Room[]> {
  if (!hasSanityConfig() || !sanityClient) {
    return fallbackRooms;
  }

  const data = await sanityClient.fetch<Room[]>(groq`*[_type == "room"] | order(sortOrder asc, title asc)[0...8]{
    _id,
    title,
    slug,
    shortDescription,
    heroImage,
    gallery,
    highlights,
    isPublicPageEnabled
  }`);

  return data.length ? data : fallbackRooms;
}

export async function getUpcomingEvents(): Promise<Event[]> {
  if (!hasSanityConfig() || !sanityClient) {
    return fallbackEvents;
  }

  const data = await sanityClient.fetch<Event[]>(groq`*[_type == "event" && status == "scheduled"] | order(startDateTime asc)[0...6]{
    _id,
    title,
    slug,
    summary,
    venueType,
    startDateTime,
    heroImage
  }`);

  return data.length ? data : fallbackEvents;
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  if (!hasSanityConfig() || !sanityClient) {
    return fallbackEvents.find((event) => event.slug.current === slug) || null;
  }

  return sanityClient.fetch<Event | null>(
    groq`*[_type == "event" && slug.current == $slug][0]{
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
    { slug },
  );
}

export async function getRoomBySlug(slug: string): Promise<Room | null> {
  if (!hasSanityConfig() || !sanityClient) {
    return fallbackRooms.find((room) => room.slug.current === slug) || null;
  }

  return sanityClient.fetch<Room | null>(
    groq`*[_type == "room" && slug.current == $slug][0]{
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
    { slug },
  );
}

export async function getGenericPageBySlug(slug: string): Promise<GenericPage | null> {
  if (!hasSanityConfig() || !sanityClient) {
    return null;
  }

  return sanityClient.fetch<GenericPage | null>(
    groq`*[_type == "page" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      ${pageSectionsProjection}
    }`,
    { slug },
  );
}

async function getSingletonPage(
  type: string,
  fallback: SingletonPageData,
): Promise<SingletonPageData> {
  if (!hasSanityConfig() || !sanityClient) {
    return fallback;
  }

  const data = await sanityClient.fetch<SingletonPageData | null>(
    groq`*[_type == $type][0]{
      title,
      intro,
      ${pageSectionsProjection}
    }`,
    { type },
  );

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
