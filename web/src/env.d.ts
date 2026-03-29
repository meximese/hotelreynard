/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

interface ImportMetaEnv {
  readonly PUBLIC_SANITY_STUDIO_URL?: string;
  readonly PUBLIC_SANITY_VISUAL_EDITING_ENABLED?: string;
  readonly PUBLIC_SANITY_PREVIEW_URL?: string;
  readonly PUBLIC_MEWS_CONFIGURATION_ID?: string;
  readonly PUBLIC_MEWS_API_URL?: string;
  readonly PUBLIC_MEWS_LANGUAGE_CODE?: string;
  readonly PUBLIC_MEWS_CURRENCY_CODE?: string;
  readonly SANITY_API_READ_TOKEN?: string;
  readonly RESEND_API_KEY?: string;
  readonly RESEND_FROM_EMAIL?: string;
  readonly RESEND_AUDIENCE_ID?: string;
  readonly CONTACT_TO_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
