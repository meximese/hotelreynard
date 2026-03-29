import { sanityClient } from "sanity:client";
import type { PortableTextBlock } from "@portabletext/types";
import type { Image, Slug } from "@sanity/types";
import groq from "groq";
import type { EmailTemplateContent, ManagedEmailTemplateKey } from "@hotelreynard/email";

export async function getRooms(): Promise<Room[]> {
  return sanityClient.fetch(
    groq`*[_type == "room"] | order(title asc) {
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
    }`
  );
}

export async function getRoom(slug: string): Promise<Room | null> {
  return sanityClient.fetch(
    groq`*[_type == "room" && slug.current == $slug][0] {
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
    { slug }
  );
}

export async function getOffers(): Promise<Offer[]> {
  return sanityClient.fetch(
    groq`*[_type == "offer"] | order(title asc) {
      _id,
      _type,
      title,
      slug,
      description,
      heroImage,
      bookingCode
    }`
  );
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  return sanityClient.fetch(
    groq`*[_type == "page" && slug.current == $slug][0] {
      _id,
      _type,
      title,
      slug,
      body
    }`,
    { slug }
  );
}

export async function getEmailTemplateByKey(
  key: ManagedEmailTemplateKey,
): Promise<EmailTemplateContent | null> {
  return sanityClient.fetch(
    groq`*[_type == "emailTemplate" && key == $key] | order(_updatedAt desc)[0] {
      key,
      "title": emailTitle,
      subject,
      previewText,
      intro,
      body,
      outro
    }`,
    { key }
  );
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
