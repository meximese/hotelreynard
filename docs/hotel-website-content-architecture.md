# Hotel Website Content Architecture

This document captures the proposed content architecture for a fresh Hotel Reynard website build in this monorepo. It assumes:

- a new Next.js app
- a clean Sanity instance
- a reusable generic page builder for secondary/editorial pages
- structured, first-class content models for the hotel's core guest journeys
- `room` remains a first-class document type because it is the site's most important content entity and may become fully public or named later

## Core Principles

- `room` is a durable editorial content type now, not just a booking/inventory abstraction.
- The UX should not promise room selection if the booking engine cannot actually support that.
- Core hospitality pages should be purpose-built and structured.
- A generic page builder should still exist, but it should primarily support secondary/editorial pages.
- Booking configuration belongs at the property/site level, not the room level.

## Recommended Content Model

| Type | Kind | Route | Purpose | Notes |
|---|---|---:|---|---|
| `siteSettings` | singleton | none | global SEO, contact, social, booking widget config, footer, announcement | includes booking/widget config |
| `homePage` | singleton | `/` | homepage composition | structured sections |
| `stayPage` | singleton | `/stay` | hotel overview and stay landing | references rooms |
| `restaurantPage` | singleton | `/restaurant` | dining/bar overview | supports changing menu via CTA/PDF/external link |
| `eventsPage` | singleton | `/events` | public events landing page | references event feed |
| `privateEventsPage` | singleton | `/private-events` | private rental/event-space landing page | inquiry-first |
| `locationPage` | singleton | `/location` | destination and regional story | city + nature positioning |
| `room` | collection | optional `/rooms/[slug]` | room storytelling and reusable references | first-class core content type |
| `event` | collection | `/events/[slug]` | public event detail | restaurant + outdoor events |
| `page` | collection | `/:slug` | generic editorial pages | about, FAQ, press, accessibility, etc. |
| `offer` | optional collection | `/offers/[slug]` | packages/promotions | only if real operational need |
| `journalPost` | optional collection | `/journal/[slug]` | stories, guides, updates | only if a content program exists |
| `redirect` | optional collection | none | managed redirects | useful for relaunch and migrations |

## Room Strategy

Rooms should remain elevated to their own document type because:

- they are the most important content type on the site
- they may eventually be named and turned into pages
- they need to be referenceable from other page types
- they deserve their own photography, narrative, and metadata

### Room Modeling Principles

- `room` is a content type, not an inventory type
- `room` should be reusable across the CMS
- `room` may support public pages now or later
- `room` should not require room-specific booking logic in v1
- room messaging can emphasize individuality even if assignment is availability-based

### Recommended `room` Fields

Core identity:

- `title`
- `slug`
- `status`
- `publiclyNamed`
- `shortDescription`
- `body`

Visual/editorial:

- `heroImage`
- `gallery`
- `atmosphereTags`
- `highlights`
- `artisanFeatures`
- `amenities`
- `designNotes`

Operational/light factual:

- `occupancy`
- `bedType`
- `bathroomType`
- `accessibilityNotes`
- `petPolicy`
- `roomSize`
- `sortOrder`

Future-facing:

- `bookingLabel`
- `bookingCategoryKey`
- `isPublicPageEnabled`

### What To Avoid On `room`

- hard-coding Mews-specific assumptions unless operations confirms the mapping is real and stable
- forcing room-specific inventory logic into the content model
- assuming public room pages must exist on day one

## Recommended Sanity Object Types

These reusable objects should support both structured pages and flexible editorial pages.

| Object | Used In | Purpose |
|---|---|---|
| `seo` | most docs | title, description, OG image, noindex |
| `cta` | most docs | label, href, style, tracking key |
| `linkItem` | nav/footer | internal/external links |
| `imageBlock` | page builder | image, alt, caption, crop intent |
| `galleryBlock` | structured + generic | ordered image groups with optional captions |
| `richTextBlock` | page builder | portable text section |
| `heroBlock` | core pages | eyebrow, title, body, media, CTAs |
| `featureListBlock` | stay, restaurant, location | structured highlights |
| `testimonialBlock` | optional | press quotes / guest sentiment |
| `hoursBlock` | restaurant | service hours and notes |
| `inquiryBlock` | private events | form copy + contact method |
| `mapHighlightsBlock` | location | nearby places / travel times |
| `eventFeedBlock` | events page, home | upcoming events query config |
| `bookingEmbedBlock` | stay, home | widget launcher copy/config |
| `artisanFeature` | rooms, stay, journal | maker credits / local craft stories |

## Page Builder Strategy

The site should use two composition modes:

1. Structured section systems for core hospitality pages
2. A generic flexible page builder for secondary/editorial pages

Core pages should still use arrays of allowed sections, but with a narrower allowed set per page type.

Examples:

- `homePage.sections`: `heroBlock`, `featureListBlock`, `galleryBlock`, `eventFeedBlock`, `bookingEmbedBlock`, `mapHighlightsBlock`
- `stayPage.sections`: `heroBlock`, `galleryBlock`, `featureListBlock`, `bookingEmbedBlock`, `richTextBlock`, room reference modules
- `restaurantPage.sections`: `heroBlock`, `hoursBlock`, `galleryBlock`, `featureListBlock`, `eventFeedBlock`, `richTextBlock`
- `page.sections`: broader section set for flexible editorial use

This approach preserves flexibility while keeping the most important pages coherent.

## Schema Matrix By Surface

| Surface | Structured Fields | Flexible Sections | Collections Referenced |
|---|---|---|---|
| `homePage` | hero, intro, primary CTAs, featured galleries | yes, constrained | rooms, events, generic pages |
| `stayPage` | booking intro, amenities, policies, highlights | yes, constrained | rooms |
| `restaurantPage` | hours, reservation CTA, menu CTA, service notes | yes, constrained | events |
| `eventsPage` | intro, filter labels, archive settings | light | events |
| `privateEventsPage` | inquiry CTA, venue facts, package notes | yes | none |
| `locationPage` | address, map link, travel notes, nearby highlights | yes | rooms, optional journal/guides |
| `page` | title, slug, SEO | yes, broadest | optional references |
| `event` | schedule, venue, CTA, status, summary | limited | maybe related pages |

## Event Schema Recommendation

| Field | Type | Notes |
|---|---|---|
| `title` | string | required |
| `slug` | slug | required |
| `eventType` | enum | `public`, or more specific subtypes if needed |
| `venueType` | enum | `restaurant`, `outdoorSpace`, `fullProperty` |
| `startDateTime` | datetime | required |
| `endDateTime` | datetime | optional |
| `timezone` | string | default local timezone |
| `summary` | text | card copy |
| `body` | portable text | detail page |
| `heroImage` | image | strong recommended field |
| `gallery` | images | optional |
| `cta` | object | ticket / RSVP / reserve |
| `status` | enum | `scheduled`, `soldOut`, `cancelled`, `past` |
| `featured` | boolean | for home/events landing |
| `seo` | object | standard |

## Stay Page Recommendation

The stay experience should be modeled as a structured singleton that references `room` documents instead of collapsing all room content into one monolithic blob.

Suggested fields:

- `title`
- `hero`
- `intro`
- `gallery`
- `featuredRooms`
- `amenities`
- `policies`
- `booking`
- `artisanFeatures`
- `seo`

## Restaurant Page Recommendation

Keep restaurant modeling editorially strong but operationally light.

Suggested fields:

- `hero`
- `intro`
- `hours`
- `reservationCta`
- `menuCta`
- `gallery`
- `serviceHighlights`
- `privateDiningNote`
- `seo`

Avoid item-level structured menu maintenance unless the team explicitly wants that workflow.

## IA / Route Matrix

| Route | Content Source | Notes |
|---|---|---|
| `/` | `homePage` | key brand entry and conversion pathways |
| `/stay` | `stayPage` | stay overview and room collection entry point |
| `/restaurant` | `restaurantPage` | dining/bar |
| `/events` | `eventsPage` + `event` feed | upcoming + archive |
| `/events/[slug]` | `event` | event detail |
| `/private-events` | `privateEventsPage` | rental/event space journey |
| `/location` | `locationPage` | destination value prop |
| `/rooms/[slug]` | `room` | optional now, easy to enable later |
| `/:slug` | `page` | generic editorial pages |
| optional `/offers/[slug]` | `offer` | only if activated |
| optional `/journal/[slug]` | `journalPost` | only if content program exists |

## Room URL Options

There are three reasonable rollout options:

1. `room` docs exist, but no public room route in v1
2. `room` docs have public routes, but booking remains property-level
3. public room routes are controlled by a flag such as `isPublicPageEnabled`

The strongest long-term option is usually `2` or `3`, since rooms are the emotional center of the property.

## Next.js App Map

For a fresh app, use explicit typed routes instead of over-relying on a generic catch-all pattern.

```text
site/
  src/app/
    (marketing)/
      page.tsx
      stay/page.tsx
      restaurant/page.tsx
      events/page.tsx
      events/[slug]/page.tsx
      private-events/page.tsx
      location/page.tsx
      rooms/[slug]/page.tsx
      [slug]/page.tsx
    api/
      draft-mode/
      revalidate/
      contact/
  src/features/
    page-builder/
    booking/
    events/
    stay/
    restaurant/
    location/
    rooms/
  src/lib/
    sanity/
      client.ts
      queries/
      loaders/
      fragments/
      live.ts
  src/components/
    blocks/
    ui/
```

If the frontend starts with BaseUI and Phosphor Icons:

- keep BaseUI wrappers in `src/components/ui/`
- keep section/block rendering separate from design-system implementation details
- avoid coupling Sanity schema names directly to specific UI library components

## Sanity Studio Map

```text
studio/
  src/schemaTypes/
    documents/
      siteSettings.ts
      homePage.ts
      stayPage.ts
      restaurantPage.ts
      eventsPage.ts
      privateEventsPage.ts
      locationPage.ts
      room.ts
      page.ts
      event.ts
      redirect.ts
      offer.ts
      journalPost.ts
    objects/
      seo.ts
      cta.ts
      heroBlock.ts
      imageBlock.ts
      galleryBlock.ts
      featureListBlock.ts
      bookingEmbedBlock.ts
      eventFeedBlock.ts
      hoursBlock.ts
      inquiryBlock.ts
      artisanFeature.ts
```

Recommended desk structure:

- Site Settings
- Core Pages
- Rooms
- Events
- Editorial Pages
- Optional Marketing
- Shared Objects / Taxonomy
- Redirects

## Query / Data Loading Matrix

| Loader | Returns | Used By |
|---|---|---|
| `getSiteSettings()` | nav/footer/booking config | layout |
| `getHomePage()` | home page payload | `/` |
| `getStayPage()` | stay content | `/stay` |
| `getRestaurantPage()` | restaurant content | `/restaurant` |
| `getEventsPage()` | events landing content | `/events` |
| `getUpcomingEvents()` | event card list | home, events |
| `getEventBySlug(slug)` | event detail | `/events/[slug]` |
| `getPrivateEventsPage()` | rental content | `/private-events` |
| `getLocationPage()` | destination content | `/location` |
| `getRoomBySlug(slug)` | room detail | `/rooms/[slug]` if enabled |
| `getFeaturedRooms()` | curated room list | home, stay, location |
| `getGenericPageBySlug(slug)` | generic content | `/:slug` |

Avoid a single giant content loader file. Split queries by domain.

## Room Reference Matrix

| Source Type | Can Reference `room`? | Why |
|---|---|---|
| `homePage` | yes | featured rooms |
| `stayPage` | yes | full collection or curated subset |
| `locationPage` | yes | tie place to stay experience |
| `page` | yes | editorial stories, press, packages |
| `journalPost` | yes | artisan/design stories |
| `offer` | yes | future room-based offers |
| `event` | usually no | normally unnecessary |

## Authoring Workflow Matrix

| Editor Need | Best Model |
|---|---|
| Update homepage seasonally | `homePage` singleton with ordered sections |
| Add a new room story/gallery | `room` document |
| Turn a room public later | enable room route / `isPublicPageEnabled` |
| Add a new concert/dinner/pop-up | `event` document |
| Change booking CTA/widget config | `siteSettings.booking` |
| Publish a press/about/FAQ page | generic `page` |
| Update restaurant menu/hours positioning | `restaurantPage` |
| Update event-space rental copy | `privateEventsPage` |

## Editorial Rules

- Only core landing pages get singleton status.
- Generic pages cannot override reserved slugs such as `stay`, `restaurant`, `events`, `private-events`, `location`, and `rooms`.
- Events must have `startDateTime`, `venueType`, and `status`.
- Booking configuration lives globally.
- Rooms are editorial first, booking/inventory second.
- Core landing pages get constrained section systems, not unlimited block chaos.

## V1 vs V2 Rollout

### V1

- `siteSettings`
- `homePage`
- `stayPage`
- `restaurantPage`
- `eventsPage`
- `privateEventsPage`
- `locationPage`
- `room`
- `page`
- `event`
- shared objects
- optional redirects

### V2

- `offer`
- `journalPost`
- artisan as a first-class reusable document if needed
- richer destination guide taxonomy
- press entries
- more advanced room/package relationships
- more advanced event filtering/search

## Summary

The right compromise is:

- keep `room` as a first-class collection
- keep `page` as a generic page-builder collection
- keep core hospitality destinations as structured singletons
- make room routing optional or flaggable
- keep booking logic global and property-level unless the product changes later

This preserves future flexibility without forcing the launch UX to pretend guests can choose inventory in a way the booking stack does not actually support.
