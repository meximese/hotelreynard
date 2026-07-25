import type {PortableTextBlock} from "@portabletext/types";
import type {Image, Slug} from "@sanity/types";

export interface SanityImage extends Image {
  alt?: string;
}

export interface GalleryImage extends SanityImage {
  fullWidth?: boolean;
  layout?: "center" | "wide" | "half";
}

export interface SanityDocumentIdentity {
  _id: string;
  _type: string;
}

export interface InternalLinkReference extends SanityDocumentIdentity {
  title?: string;
  slug?: Slug;
}

export interface SanityLink {
  linkType: "internal" | "relative" | "external";
  reference?: InternalLinkReference;
  href?: string;
  openInNewTab?: boolean;
}

export interface BookingButton {
  label?: string;
}

export interface NewsletterSignup {
  _type?: "newsletterSignup";
  showLabel?: boolean;
  thankYouMessage?: string;
  successRedirect?: SanityLink;
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
  link?: SanityLink;
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
  layout?: "imageLeft" | "imageRight" | "imageTop" | "imageBottom";
  displayMode?: "grid" | "vertical" | "custom" | "stickyScroll";
  textAlign?: "left" | "center" | "right";
  showGalleryHeader?: boolean;
  showGalleryProgress?: boolean;
  media?: SanityImage;
  images?: GalleryImage[];
  items?: string[];
  rooms?: Room[];
  content?: PortableTextBlock[];
  entries?: HoursEntry[];
  limit?: number;
  link?: SanityLink;
  bookingButton?: BookingButton;
  showLabel?: boolean;
  thankYouMessage?: string;
  successRedirect?: SanityLink;
}

export interface PageHero {
  enableContent?: boolean;
  media?: SanityImage;
  mobileMedia?: SanityImage;
  caption?: string;
  title?: string;
  body?: string;
  primaryLink?: SanityLink;
  secondaryLink?: SanityLink;
}

export interface GenericPage {
  _id: string;
  _type: string;
  hero?: PageHero;
  title: string;
  pageIntro?: PortableTextBlock[];
  slug: Slug;
  sections?: PageSection[];
}

export interface HomePageData extends SanityDocumentIdentity {
  hero?: PageHero;
  title: string;
  pageIntro?: PortableTextBlock[];
  sections?: PageSection[];
}

export interface EventsPageData extends SanityDocumentIdentity {
  hero?: PageHero;
  title: string;
  pageIntro?: PortableTextBlock[];
  sections?: PageSection[];
}
