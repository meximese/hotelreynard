# Hotel Reynard Site

Next.js 16 App Router site for Hotel Reynard.

This workspace contains the public-facing marketing site, newsletter signup flow, contact capture handlers, Sanity-powered content queries, and the Mews booking widget integration.

## Stack

- Next.js 16
- React 19
- TypeScript
- Sanity via `next-sanity`
- Resend for contact capture
- Mews Distributor widget

## Features

- Custom single-page landing experience with animated wordmark and poster-style layout
- Sanity-backed content utilities for rooms, offers, pages, and managed email templates
- Newsletter signup endpoint at `/api/subscribe`
- Contact capture endpoint at `/api/contact`
- Draft mode endpoints for Sanity visual editing
- Mews booking widget loader

## Project Structure

```text
site/
  src/app/                  App Router pages, layout, API routes
  src/components/           UI and client components
  src/lib/sanity/           Sanity client, queries, preview helpers
  public/                   Fonts, images, SVG assets
  env.template              Example environment variables
```

## Getting Started

From the repo root:

```bash
npm install
npm run dev --workspace=site
```

Or from this directory:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Environment Variables

Copy [env.template](/Users/vinh/dev/reynard/hotelreynard/site/env.template) to `.env.local` or `.env` in `site/` and fill in the values you need.

### Sanity

Required for the site to boot:

```env
NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID=
NEXT_PUBLIC_SANITY_STUDIO_DATASET=
```

Optional:

```env
NEXT_PUBLIC_SANITY_API_VERSION=2025-12-01
NEXT_PUBLIC_SANITY_USE_CDN=false
NEXT_PUBLIC_SANITY_VISUAL_EDITING_ENABLED=false
NEXT_PUBLIC_SANITY_STUDIO_URL=
SANITY_API_READ_TOKEN=
SANITY_STUDIO_PREVIEW_URL=
```

`SANITY_API_READ_TOKEN` is required when using draft mode / visual editing.

### Resend

Required to capture newsletter and contact form submissions:

```env
RESEND_API_KEY=
RESEND_SEGMENT_ID=
```

This setup only creates or updates contacts in Resend. The site does not send outbound emails.

### Mews

The booking widget is enabled only when a configuration ID is present.

```env
NEXT_PUBLIC_MEWS_API_URL=
NEXT_PUBLIC_MEWS_CLIENT_NAME=
NEXT_PUBLIC_MEWS_HOTEL_ID=
NEXT_PUBLIC_MEWS_CONFIGURATION_ID=
NEXT_PUBLIC_MEWS_LANGUAGE_CODE=en-US
NEXT_PUBLIC_MEWS_CULTURE_CODE=
NEXT_PUBLIC_MEWS_CURRENCY_CODE=USD
```

If `NEXT_PUBLIC_MEWS_CONFIGURATION_ID` is not set, the booking button stays disabled.

## Sanity Content

The site queries these document types from Sanity:

- `room`
- `offer`
- `page`
- `emailTemplate`
- `amenity`

Core query helpers live in [src/lib/sanity/content.ts](/Users/vinh/dev/reynard/hotelreynard/site/src/lib/sanity/content.ts).

## Related Workspaces

- [../studio](/Users/vinh/dev/reynard/hotelreynard/studio) for content editing
- [../packages/email](/Users/vinh/dev/reynard/hotelreynard/packages/email) for the shared email templates used by API routes
