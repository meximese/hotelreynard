/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

interface ImportMetaEnv {
  readonly PUBLIC_MEWS_CONFIGURATION_ID?: string;
  readonly PUBLIC_MEWS_API_URL?: string;
  readonly PUBLIC_MEWS_LANGUAGE_CODE?: string;
  readonly PUBLIC_MEWS_CURRENCY_CODE?: string;
  readonly RESEND_API_KEY?: string;
  readonly RESEND_FROM_EMAIL?: string;
  readonly RESEND_AUDIENCE_ID?: string;
  readonly CONTACT_TO_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
