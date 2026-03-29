import type { PortableTextBlock } from "@portabletext/types";

export const managedEmailTemplateKeys = [
  "contact-auto-reply",
  "contact-internal-inquiry",
] as const;

export type ManagedEmailTemplateKey = (typeof managedEmailTemplateKeys)[number];

export interface EmailTemplateContent {
  key: ManagedEmailTemplateKey;
  title: string;
  subject: string;
  previewText: string;
  intro?: string;
  body?: PortableTextBlock[];
  outro?: string;
}

export interface ContactEmailTokens {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  contactReason: string;
  message: string;
  hotelName?: string;
}
