import type { Event, HomePageData, Room, SingletonPageData } from "./types";

export const fallbackRooms: Room[] = [
  {
    _id: "room-1",
    title: "Corner Room",
    slug: { _type: "slug", current: "corner-room" },
    shortDescription:
      "Morning light, layered textures, and an intimate layout designed for slow starts.",
    highlights: ["King bed", "Deep soaking tub", "Locally crafted ceramics"],
    isPublicPageEnabled: true,
  },
  {
    _id: "room-2",
    title: "Courtyard Room",
    slug: { _type: "slug", current: "courtyard-room" },
    shortDescription:
      "A quieter retreat with warm woods, artisan lighting, and views toward the garden edge.",
    highlights: ["Queen bed", "Shower room", "Custom millwork"],
    isPublicPageEnabled: true,
  },
  {
    _id: "room-3",
    title: "Top Floor Room",
    slug: { _type: "slug", current: "top-floor-room" },
    shortDescription:
      "A more expansive room with a little extra drama and a strong sense of place.",
    highlights: ["King bed", "Lounge seating", "Regional textiles"],
    isPublicPageEnabled: true,
  },
];

export const fallbackEvents: Event[] = [
  {
    _id: "event-1",
    title: "Guest Chef Supper",
    slug: { _type: "slug", current: "guest-chef-supper" },
    summary: "A seasonal dinner in the tavern highlighting growers and winemakers from the region.",
    venueType: "restaurant",
    startDateTime: "2026-08-14T18:30:00-07:00",
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "A one-night dinner built around peak-season produce, regional wine, and a long-table atmosphere.",
          },
        ],
        markDefs: [],
        style: "normal",
      },
    ],
    cta: {
      label: "Reserve A Seat",
      href: "/events",
    },
  },
  {
    _id: "event-2",
    title: "Garden Listening Session",
    slug: { _type: "slug", current: "garden-listening-session" },
    summary: "An outdoor evening of vinyl, cocktails, and small plates in the event courtyard.",
    venueType: "outdoorSpace",
    startDateTime: "2026-08-28T19:00:00-07:00",
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "A casual outdoor program that shows how public events can activate the property beyond overnight stays.",
          },
        ],
        markDefs: [],
        style: "normal",
      },
    ],
    cta: {
      label: "View Details",
      href: "/events",
    },
  },
];

export const fallbackHomePage: HomePageData = {
  title: "Hotel Reynard",
  intro:
    "A small hotel above a destination restaurant at the edge of city life and open-air adventure.",
  primaryCta: {
    label: "Plan Your Stay",
    href: "/stay",
  },
  secondaryCta: {
    label: "Explore The Restaurant",
    href: "/restaurant",
  },
  featuredRooms: fallbackRooms,
  upcomingEvents: fallbackEvents,
  sections: [],
};

export const fallbackStayPage: SingletonPageData = {
  title: "Eight distinct rooms, one booking journey.",
  intro:
    "Each room should carry its own mood, material palette, and local story. The content model treats them as first-class documents now, even while booking remains property-level.",
  sections: [],
};

export const fallbackRestaurantPage: SingletonPageData = {
  title: "A destination dining room with a bar that keeps the building alive.",
  intro:
    "This route is ready for a structured restaurant page in Sanity: hours, reservation CTA, menu CTA, gallery, and event tie-ins without forcing item-level menu maintenance.",
  sections: [],
};

export const fallbackEventsPage: SingletonPageData = {
  title: "Public programming across the restaurant and outdoor event space.",
  intro:
    "Events are modeled as a real collection with schedule, venue, status, and CTA fields so the website can evolve beyond static promotional copy.",
  sections: [],
};

export const fallbackPrivateEventsPage: SingletonPageData = {
  title: "An inquiry-led path for outdoor gatherings and hospitality-driven rentals.",
  intro:
    "This page is reserved for event-space storytelling, venue details, and lead capture. It stays separate from the public events feed because the user journey is different.",
  sections: [],
};

export const fallbackLocationPage: SingletonPageData = {
  title: "A gateway between town and the landscape beyond it.",
  intro:
    "The location story deserves its own page and schema because it is one of the strongest conversion levers for this property. This route is where the city-plus-nature positioning will live.",
  sections: [],
};
