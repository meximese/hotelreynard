import type { PortableTextBlock } from "@portabletext/types";
import type { Image, Slug } from "@sanity/types";

export interface SanityImage extends Image {
  alt?: string;
}

export interface SanityDocumentIdentity {
  _id: string;
  _type: string;
}

export interface Cta {
  label: string;
  href: string;
}

export interface Room {
  _id: string;
  _type?: string;
  title: string;
  slug: Slug;
  shortDescription?: string;
  body?: PortableTextBlock[];
  heroImage?: SanityImage;
  gallery?: SanityImage[];
  highlights?: string[];
  isPublicPageEnabled?: boolean;
}

export interface Event {
  _id: string;
  _type?: string;
  title: string;
  slug: Slug;
  summary?: string;
  venueType?: string;
  startDateTime?: string;
  body?: PortableTextBlock[];
  heroImage?: SanityImage;
  cta?: Cta;
}

export interface HoursEntry {
  label: string;
  hours: string;
}

export interface PageSection {
  _key?: string;
  _type: string;
  title?: string;
  eyebrow?: string;
  body?: string;
  quote?: string;
  attribution?: string;
  layout?: "imageLeft" | "imageRight";
  displayMode?: "rail" | "stickyScroll";
  media?: SanityImage;
  images?: SanityImage[];
  items?: string[];
  rooms?: Room[];
  content?: PortableTextBlock[];
  entries?: HoursEntry[];
  limit?: number;
  cta?: Cta;
  primaryCta?: Cta;
  secondaryCta?: Cta;
}

export interface PageHero {
  eyebrow?: string;
  title?: string;
  body?: string;
  media?: SanityImage;
  primaryCta?: Cta;
  secondaryCta?: Cta;
}

export interface GenericPage {
  _id: string;
  _type: string;
  hero?: PageHero;
  title: string;
  slug: Slug;
  sections?: PageSection[];
}

export interface HomePageData extends SanityDocumentIdentity {
  hero?: PageHero;
  title: string;
  intro: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  sections?: PageSection[];
}

export interface SingletonPageData extends SanityDocumentIdentity {
  hero?: PageHero;
  title: string;
  intro: string;
  sections?: PageSection[];
}
