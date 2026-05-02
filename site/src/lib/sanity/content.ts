import type { PortableTextBlock } from "@portabletext/types";
import type { Image, Slug } from "@sanity/types";
import type {
  EmailTemplateContent,
  ManagedEmailTemplateKey,
} from "@hotelreynard/email";
import groq from "groq";
import { loadQuery } from "./loadQuery";

export async function getRooms(
  { visualEditingEnabled = false }: { visualEditingEnabled?: boolean } = {},
): Promise<Room[]> {
  const { data } = await loadQuery<Room[]>({
    query: groq`*[_type == "room"] | order(title asc) {
      _id,
      _type,
      title,
      slug,
      description,
      heroImage,
      gallery,
      amenities[]->{
        _id,
        _type,
        title,
        icon,
        description
      },
      mewsRoomCategoryId
    }`,
    visualEditingEnabled,
  });

  return data;
}

export async function getRoom(
  slug: string,
  { visualEditingEnabled = false }: { visualEditingEnabled?: boolean } = {},
): Promise<Room | null> {
  const { data } = await loadQuery<Room | null>({
    query: groq`*[_type == "room" && slug.current == $slug][0] {
      _id,
      _type,
      title,
      slug,
      description,
      heroImage,
      gallery,
      amenities[]->{
        _id,
        _type,
        title,
        icon,
        description
      },
      mewsRoomCategoryId
    }`,
    params: { slug },
    visualEditingEnabled,
  });

  return data;
}

export async function getOffers(
  { visualEditingEnabled = false }: { visualEditingEnabled?: boolean } = {},
): Promise<Offer[]> {
  const { data } = await loadQuery<Offer[]>({
    query: groq`*[_type == "offer"] | order(title asc) {
      _id,
      _type,
      title,
      slug,
      description,
      heroImage,
      bookingCode
    }`,
    visualEditingEnabled,
  });

  return data;
}

export async function getPageBySlug(
  slug: string,
  { visualEditingEnabled = false }: { visualEditingEnabled?: boolean } = {},
): Promise<Page | null> {
  const { data } = await loadQuery<Page | null>({
    query: groq`*[_type == "page" && slug.current == $slug][0] {
      _id,
      _type,
      title,
      slug,
      body
    }`,
    params: { slug },
    visualEditingEnabled,
  });

  return data;
}

export async function getEmailTemplateByKey(
  key: ManagedEmailTemplateKey,
): Promise<EmailTemplateContent | null> {
  const { data } = await loadQuery<EmailTemplateContent | null>({
    query: groq`*[_type == "emailTemplate" && key == $key] | order(_updatedAt desc)[0] {
      key,
      "title": emailTitle,
      subject,
      previewText,
      intro,
      body,
      outro
    }`,
    params: { key },
  });

  return data;
}

export interface ContentSchemaDocument {
  _id: string;
  _type: string;
}

export interface SanityImageAsset extends Image {
  alt?: string;
}

export interface Amenity extends ContentSchemaDocument {
  _type: "amenity";
  title: string;
  icon?: string;
  description?: string;
}

export interface Room extends ContentSchemaDocument {
  _type: "room";
  title: string;
  slug: Slug;
  description?: string;
  heroImage?: SanityImageAsset;
  gallery?: SanityImageAsset[];
  amenities?: Amenity[];
  mewsRoomCategoryId?: string;
}

export interface Offer extends ContentSchemaDocument {
  _type: "offer";
  title: string;
  slug: Slug;
  description?: string;
  heroImage?: SanityImageAsset;
  bookingCode?: string;
}

export interface Page extends ContentSchemaDocument {
  _type: "page";
  title: string;
  slug: Slug;
  body?: PortableTextBlock[];
}
