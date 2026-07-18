type Reference = {
  _type: "reference";
  _ref: string;
};

type Slug = {
  _type: "slug";
  current: string;
};

type BlockSpan = {
  _type: "span";
  text: string;
  marks?: string[];
};

type PortableTextBlock = {
  _type: "block";
  style: string;
  markDefs: unknown[];
  children: BlockSpan[];
};

type ImageManifestEntry = {
  documentId: string;
  fieldPath: string;
  assetPath: string;
  alt: string;
};

function slug(current: string): Slug {
  return {
    _type: "slug",
    current,
  };
}

function ref(_ref: string): Reference {
  return {
    _type: "reference",
    _ref,
  };
}

function block(text: string): PortableTextBlock {
  return {
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        text,
      },
    ],
  };
}

function richTextBlock(paragraphs: string[]) {
  return {
    _type: "richTextBlock",
    content: paragraphs.map(block),
  };
}

function seo(metaTitle: string, metaDescription: string) {
  return {
    metaTitle,
    metaDescription,
    noIndex: false,
  };
}

function cta(label: string, href: string) {
  return { label, href };
}

const roomIds = {
  alder: "room-alder",
  cedar: "room-cedar",
  fir: "room-fir",
  hemlock: "room-hemlock",
  juniper: "room-juniper",
  maple: "room-maple",
  spruce: "room-spruce",
  willow: "room-willow",
} as const;

export const roomDocuments = [
  {
    _id: roomIds.alder,
    _type: "room",
    title: "Alder",
    slug: slug("alder"),
    status: "published",
    publiclyNamed: false,
    shortDescription:
      "A warm king room with a mellow palette, lounge seating, and an easy view toward the street and trees beyond.",
    body: richTextBlock([
      "Made for late arrivals, slow coffee, and one more round downstairs before bed. Alder is grounded, soft, and quietly tailored.",
      "The room layers Oregon-made ceramics, textured textiles, and a mix of vintage and custom pieces so it feels collected instead of staged.",
    ]),
    highlights: ["King bed", "Lounge chairs", "Back Porch Coffee", "Steven Smith teas"],
    artisanFeatures: [
      {
        _type: "artisanFeature",
        name: "Morrow Soft Goods",
        craft: "Textiles",
        description:
          "Layered bedding and woven accents from a Portland maker studio bring warmth without overcomplicating the room.",
      },
      {
        _type: "artisanFeature",
        name: "Clay Factor Ceramics",
        craft: "Ceramics",
        description:
          "Hand-thrown mugs and bedside dishes add a handmade rhythm to the room's daily rituals.",
      },
    ],
    occupancy: "Sleeps 2",
    bedType: "One king bed",
    bathroomType: "Walk-in shower",
    accessibilityNotes: "Best for guests comfortable with a standard main-building layout.",
    petPolicy: "Not pet friendly.",
    roomSize: "Approx. 300 sq ft",
    sortOrder: 1,
    bookingLabel: "Check availability",
    bookingCategoryKey: "standard-king",
    isPublicPageEnabled: true,
    seo: seo("Alder Room | Hotel Reynard", "A grounded king room layered with local craft and warm, collected detail."),
  },
  {
    _id: roomIds.cedar,
    _type: "room",
    title: "Cedar",
    slug: slug("cedar"),
    status: "published",
    publiclyNamed: false,
    shortDescription:
      "A bright second-floor room with a little more air, a little more light, and enough floor space to actually settle in.",
    body: richTextBlock([
      "Cedar leans brighter and breezier without losing its sense of intimacy. Morning light does a lot of the work here.",
      "This room is a good example of the hotel's approach: thoughtful materials, no wasted gestures, and a strong sense that someone really edited the experience.",
    ]),
    highlights: ["Queen bed", "Window seat", "Back Porch Coffee", "Steven Smith teas"],
    artisanFeatures: [
      {
        _type: "artisanFeature",
        name: "Columbia River Woodworks",
        craft: "Millwork",
        description:
          "A compact writing shelf and custom oak storage pieces keep the room functional without adding clutter.",
      },
    ],
    occupancy: "Sleeps 2",
    bedType: "One queen bed",
    bathroomType: "Walk-in shower",
    accessibilityNotes: "Second-floor room accessible by stairs.",
    petPolicy: "Not pet friendly.",
    roomSize: "Approx. 275 sq ft",
    sortOrder: 2,
    bookingLabel: "Check availability",
    bookingCategoryKey: "queen-room",
    isPublicPageEnabled: true,
    seo: seo("Cedar Room | Hotel Reynard", "A light-filled queen room with quiet detail and a bright second-floor feel."),
  },
  {
    _id: roomIds.fir,
    _type: "room",
    title: "Fir",
    slug: slug("fir"),
    status: "featured",
    publiclyNamed: false,
    shortDescription:
      "A corner king with layered textiles, deeper tones, and the kind of mood that makes staying in feel like a plan.",
    body: richTextBlock([
      "Fir turns down the volume. Richer woods, lower light, and a little extra room to linger make it one of the more atmospheric stays in the house.",
      "It is still playful, still gracious, still tied to the building's social energy downstairs. Just with a touch more shadow and softness.",
    ]),
    highlights: ["King bed", "Corner exposure", "Lounge seating", "Vinyl player"],
    artisanFeatures: [
      {
        _type: "artisanFeature",
        name: "Meyer Leather",
        craft: "Leatherwork",
        description:
          "Leather pulls and small stitched details bring a subtle tactile richness to the room.",
      },
      {
        _type: "artisanFeature",
        name: "Lantern Pressing",
        craft: "Printmaking",
        description:
          "Original prints sourced from local artists keep the walls feeling particular rather than decorative.",
      },
    ],
    occupancy: "Sleeps 2",
    bedType: "One king bed",
    bathroomType: "Shower and soaking tub",
    accessibilityNotes: "Second-floor room accessible by stairs.",
    petPolicy: "Pet friendly with advance notice.",
    roomSize: "Approx. 340 sq ft",
    sortOrder: 3,
    bookingLabel: "Check availability",
    bookingCategoryKey: "deluxe-king",
    isPublicPageEnabled: true,
    seo: seo("Fir Room | Hotel Reynard", "A moodier corner king room with artisan detail and a softer after-dark feel."),
  },
  {
    _id: roomIds.hemlock,
    _type: "room",
    title: "Hemlock",
    slug: slug("hemlock"),
    status: "published",
    publiclyNamed: false,
    shortDescription:
      "A flexible room with a little extra space and a welcoming layout for longer weekends or slower mornings.",
    body: richTextBlock([
      "Hemlock is easygoing in the best way. The layout gives guests room to unpack, stretch out, and actually inhabit the space.",
      "Materially, it keeps the same Reynard point of view: craft-forward, regionally rooted, and just polished enough.",
    ]),
    highlights: ["King bed", "Extra sitting area", "Tea service", "Locally made bath products"],
    artisanFeatures: [
      {
        _type: "artisanFeature",
        name: "Forest Glass Studio",
        craft: "Glass",
        description:
          "Handblown bedside vessels and bathroom accessories add small moments of color and transparency.",
      },
    ],
    occupancy: "Sleeps 2",
    bedType: "One king bed",
    bathroomType: "Walk-in shower",
    accessibilityNotes: "Main-building room with a straightforward layout.",
    petPolicy: "Not pet friendly.",
    roomSize: "Approx. 320 sq ft",
    sortOrder: 4,
    bookingLabel: "Check availability",
    bookingCategoryKey: "spacious-king",
    isPublicPageEnabled: true,
    seo: seo("Hemlock Room | Hotel Reynard", "A generous king room with a relaxed layout and local artisan touches."),
  },
  {
    _id: roomIds.juniper,
    _type: "room",
    title: "Juniper",
    slug: slug("juniper"),
    status: "featured",
    publiclyNamed: false,
    shortDescription:
      "One of the more playful rooms in the house, with strong morning light, custom pieces, and a little more graphic energy.",
    body: richTextBlock([
      "Juniper carries a sharper silhouette and a little more swing. It is still calm, but not sleepy.",
      "For guests who want the hotel to feel alive as much as restful, this one usually lands right.",
    ]),
    highlights: ["Queen bed", "Morning light", "Custom desk", "Portable speaker"],
    artisanFeatures: [
      {
        _type: "artisanFeature",
        name: "Northline Metal",
        craft: "Metalwork",
        description:
          "The room's lighting and hardware are all custom-fabricated by a small regional metal studio.",
      },
    ],
    occupancy: "Sleeps 2",
    bedType: "One queen bed",
    bathroomType: "Walk-in shower",
    accessibilityNotes: "Second-floor room accessible by stairs.",
    petPolicy: "Pet friendly with advance notice.",
    roomSize: "Approx. 260 sq ft",
    sortOrder: 5,
    bookingLabel: "Check availability",
    bookingCategoryKey: "queen-bright",
    isPublicPageEnabled: true,
    seo: seo("Juniper Room | Hotel Reynard", "A bright, design-forward queen room with custom regional craft details."),
  },
  {
    _id: roomIds.maple,
    _type: "room",
    title: "Maple",
    slug: slug("maple"),
    status: "published",
    publiclyNamed: false,
    shortDescription:
      "A softly layered room with a more residential feel, ideal for guests who want a quiet edge to the experience.",
    body: richTextBlock([
      "Maple leans a touch more domestic and tucked-away. Nothing fussy, just comfortable in a way that feels intentional.",
      "It is a room for reading, resetting, and coming downstairs only when you are good and ready.",
    ]),
    highlights: ["King bed", "Reading chair", "Soft daylight", "Oregon wool throws"],
    artisanFeatures: [
      {
        _type: "artisanFeature",
        name: "Cascade Wool Works",
        craft: "Textiles",
        description:
          "Thick wool blankets and woven runners bring quiet texture and a sense of seasonality to the room.",
      },
    ],
    occupancy: "Sleeps 2",
    bedType: "One king bed",
    bathroomType: "Walk-in shower",
    accessibilityNotes: "Standard room layout with good circulation around the bed.",
    petPolicy: "Not pet friendly.",
    roomSize: "Approx. 290 sq ft",
    sortOrder: 6,
    bookingLabel: "Check availability",
    bookingCategoryKey: "quiet-king",
    isPublicPageEnabled: true,
    seo: seo("Maple Room | Hotel Reynard", "A quiet king room with residential warmth and subtle local detailing."),
  },
  {
    _id: roomIds.spruce,
    _type: "room",
    title: "Spruce",
    slug: slug("spruce"),
    status: "published",
    publiclyNamed: false,
    shortDescription:
      "A compact room with a strong point of view, shaped for guests who care more about vibe than square footage.",
    body: richTextBlock([
      "Spruce proves the small rooms do not play small. The footprint is efficient, but the mood is full.",
      "It is a stay for dropping bags, heading out, and returning late to something intimate, handsome, and well-edited.",
    ]),
    highlights: ["Queen bed", "Compact footprint", "Built-in storage", "Craft cocktail glassware"],
    artisanFeatures: [
      {
        _type: "artisanFeature",
        name: "Timberline Joinery",
        craft: "Woodwork",
        description:
          "Built-ins and storage pieces were designed to keep the room efficient without feeling utilitarian.",
      },
    ],
    occupancy: "Sleeps 2",
    bedType: "One queen bed",
    bathroomType: "Walk-in shower",
    accessibilityNotes: "Best for guests comfortable with a compact room footprint.",
    petPolicy: "Not pet friendly.",
    roomSize: "Approx. 225 sq ft",
    sortOrder: 7,
    bookingLabel: "Check availability",
    bookingCategoryKey: "compact-queen",
    isPublicPageEnabled: true,
    seo: seo("Spruce Room | Hotel Reynard", "A compact but character-rich queen room designed around atmosphere and function."),
  },
  {
    _id: roomIds.willow,
    _type: "room",
    title: "Willow",
    slug: slug("willow"),
    status: "featured",
    publiclyNamed: false,
    shortDescription:
      "A top-floor room with the broadest sense of escape: higher light, calmer rhythm, and a little extra lift.",
    body: richTextBlock([
      "Willow is airy without feeling sparse. It is the room that most clearly pulls the outside world inward and slows everything down.",
      "If the hotel is about moving between town life and open-air adventure, Willow makes that transition feel especially complete.",
    ]),
    highlights: ["King bed", "Top-floor position", "Broader views", "Soaking tub"],
    artisanFeatures: [
      {
        _type: "artisanFeature",
        name: "Riverbend Textiles",
        craft: "Textiles",
        description:
          "The layered bedding and curtains were sourced to catch and soften the room's changing light across the day.",
      },
      {
        _type: "artisanFeature",
        name: "Eastbank Stoneware",
        craft: "Ceramics",
        description:
          "Bath-side ceramics and tea service pieces add texture and quiet color to the room's slower rituals.",
      },
    ],
    occupancy: "Sleeps 2",
    bedType: "One king bed",
    bathroomType: "Soaking tub and walk-in shower",
    accessibilityNotes: "Top-floor room accessible by stairs.",
    petPolicy: "Pet friendly with advance notice.",
    roomSize: "Approx. 350 sq ft",
    sortOrder: 8,
    bookingLabel: "Check availability",
    bookingCategoryKey: "top-floor-king",
    isPublicPageEnabled: true,
    seo: seo("Willow Room | Hotel Reynard", "A top-floor king room with broader light, a soaking tub, and a calmer rhythm."),
  },
];

export const eventDocuments = [
  {
    _id: "event-courtyard-supper-series",
    _type: "event",
    title: "Courtyard Supper Series",
    slug: slug("courtyard-supper-series"),
    eventType: "dinner",
    venueType: "outdoorSpace",
    startDateTime: "2026-08-06T18:00:00-07:00",
    endDateTime: "2026-08-06T21:00:00-07:00",
    summary:
      "A long-table outdoor dinner with changing menus, local bottles, and a roomful of people who are happy to stay late.",
    body: richTextBlock([
      "The courtyard was built for this kind of evening. Shared tables, changing menus, good pours, and the sort of pace that turns dinner into the rest of the night.",
      "Each installment highlights producers, winemakers, or visiting cooks from around the region.",
    ]),
    cta: cta("Reserve your seat", "/events/courtyard-supper-series"),
    status: "scheduled",
    featured: true,
    seo: seo("Courtyard Supper Series | Hotel Reynard", "A long-table outdoor dinner series at Hotel Reynard."),
  },
  {
    _id: "event-listening-hour",
    _type: "event",
    title: "Listening Hour",
    slug: slug("listening-hour"),
    eventType: "music",
    venueType: "restaurant",
    startDateTime: "2026-08-13T19:00:00-07:00",
    endDateTime: "2026-08-13T21:00:00-07:00",
    summary:
      "Vinyl, cocktails, and a softer start to the night in the bar and dining room.",
    body: richTextBlock([
      "Not a concert. Not background music. More like a bar with excellent taste and nowhere urgent to be.",
      "Expect rotating selectors, a changing list, and a room that gets better as the evening goes on.",
    ]),
    cta: cta("View details", "/events/listening-hour"),
    status: "scheduled",
    featured: true,
    seo: seo("Listening Hour | Hotel Reynard", "A recurring vinyl-and-cocktails evening in the Reynard bar."),
  },
  {
    _id: "event-maker-brunch-market",
    _type: "event",
    title: "Maker Brunch Market",
    slug: slug("maker-brunch-market"),
    eventType: "public",
    venueType: "fullProperty",
    startDateTime: "2026-08-23T10:00:00-07:00",
    endDateTime: "2026-08-23T14:00:00-07:00",
    summary:
      "A daytime gathering of local makers, brunch service, coffee, bottles, and a little wandering through the property.",
    body: richTextBlock([
      "The hotel already celebrates regional craft in the rooms. This market brings that same point of view into public view.",
      "Browse small-batch ceramics, textiles, pantry goods, and prints while the restaurant rolls out a more leisurely brunch service.",
    ]),
    cta: cta("See what's coming", "/events/maker-brunch-market"),
    status: "scheduled",
    featured: false,
    seo: seo("Maker Brunch Market | Hotel Reynard", "A brunch and local-maker market across the Hotel Reynard property."),
  },
];

export const singletonDocuments = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    siteTitle: "Hotel Reynard",
    announcement: "Bookings are now open for late-summer and fall stays.",
    booking: {
      widgetProvider: "booking-widget",
      widgetConfigurationId: "hotel-reynard-placeholder",
      defaultCtaLabel: "Check availability",
    },
    seo: seo(
      "Hotel Reynard",
      "A room-forward boutique hotel with a destination restaurant and event courtyard at the gateway between city and nature.",
    ),
  },
  {
    _id: "homePage",
    _type: "homePage",
    title: "Hotel Reynard",
    intro:
      "You can check in. You can head for the river. You can chase trailheads. You can come back dusty. You can clean up. You can order another round. You can eat late. You can sleep hard. You can do it all again tomorrow.",
    primaryCta: cta("Plan your stay", "/stay"),
    secondaryCta: cta("Explore the restaurant", "/restaurant"),
    featuredRooms: [ref(roomIds.fir), ref(roomIds.juniper), ref(roomIds.willow)],
    sections: [
      {
        _type: "heroBlock",
        eyebrow: "Hotel + Restaurant",
        title: "A boutique stay above a place you'll want to linger.",
        body:
          "Eight distinct rooms sit above a bar and dining room built for real appetite. The setting makes the pitch even better: close enough to the city, close enough to the outdoors, and easy to slip between the two.",
        primaryCta: cta("Check availability", "/stay"),
        secondaryCta: cta("See upcoming events", "/events"),
      },
      {
        _type: "featureListBlock",
        title: "At Hotel Reynard you can",
        items: [
          "Sleep in a room shaped by local artisans",
          "Start with coffee and end with nightcaps downstairs",
          "Head out for hikes, river time, and long scenic drives",
          "Come back for seasonal menus and a lively bar",
          "Catch public events in the courtyard and restaurant",
        ],
      },
      {
        _type: "galleryBlock",
        displayMode: "grid",
        title: "Property Atmosphere",
      },
      {
        _type: "bookingEmbedBlock",
        title: "Stay first. Pick the exact room later, maybe.",
        body:
          "The rooms are all different. The experience is consistent. Book for the property, the pace, and the point of view.",
        cta: cta("Open booking widget", "/stay"),
      },
      {
        _type: "eventFeedBlock",
        title: "What's on next",
        limit: 3,
      },
      richTextBlock([
        "The best hospitality sites do not just list amenities. They show you the rhythm of a place. Hotel Reynard should feel social without feeling busy, design-minded without feeling precious, and rooted in Oregon without flattening that into cliché.",
      ]),
    ],
    seo: seo(
      "Hotel Reynard | Boutique Hotel and Restaurant",
      "Eight individually designed rooms, a destination restaurant, a lively bar, and an event courtyard at the gateway between city and nature.",
    ),
  },
  {
    _id: "stayPage",
    _type: "stayPage",
    title: "Stay",
    intro:
      "The rooms are individually composed, the pace is unhurried, and the assignment is based on availability rather than guest selection. What you are really booking is the full Reynard experience: a strong room, a very good meal downstairs, and a location that opens up from there.",
    featuredRooms: roomDocuments.map((room) => ref(room._id)),
    sections: [
      {
        _type: "heroBlock",
        eyebrow: "The Lodge",
        title: "At the hotel you can bunk, hang, snack, sleep, sip, eat.",
        body:
          "Warm yourself by the bar, disappear upstairs, and wake up ready for river time, mountain time, town time, or another slow morning with no plan at all.",
        primaryCta: cta("Check availability", "/stay"),
        secondaryCta: cta("View the rooms", "/rooms/willow"),
      },
      {
        _type: "featureListBlock",
        title: "What defines the rooms",
        items: [
          "Eight different layouts and moods",
          "Locally made textiles, ceramics, and furniture accents",
          "Back Porch Coffee and Steven Smith Teas in every room",
          "A balance of quiet retreat and downstairs energy",
          "Thoughtful details that reward staying in as much as going out",
        ],
      },
      {
        _type: "galleryBlock",
        displayMode: "grid",
        title: "Rooms + Details",
      },
      richTextBlock([
        "These are not rooms designed to fade into the background. They are meant to hold a point of view, reward repeat stays, and make the hotel feel more personal than generic.",
        "Some guests will come for the restaurant and stay because the rooms are better than expected. Others will book for the room and end up downstairs long after dinner. Both are correct.",
      ]),
      {
        _type: "bookingEmbedBlock",
        title: "How booking works",
        body:
          "Guests book into the property rather than choosing an exact room. That keeps the booking flow simple while giving the team flexibility to place guests well.",
        cta: cta("Open booking widget", "/stay"),
      },
    ],
    seo: seo(
      "Stay at Hotel Reynard",
      "Eight distinct guest rooms with local artisan detail, layered comfort, and a strong sense of place.",
    ),
  },
  {
    _id: "restaurantPage",
    _type: "restaurantPage",
    title: "Restaurant",
    intro:
      "Open for aperitifs, dinner, and whatever happens after. The menu changes, the bar stays lively, and the room is meant to be as much of a draw as the hotel upstairs.",
    sections: [
      {
        _type: "heroBlock",
        eyebrow: "Bar + Dining",
        title: "A restaurant likely to become a town favorite.",
        body:
          "Seasonal food, strong pours, a little ceremony, and enough warmth to make the building feel switched on from the moment service begins.",
        primaryCta: cta("Book a table", "/restaurant"),
        secondaryCta: cta("See upcoming events", "/events"),
      },
      {
        _type: "hoursBlock",
        entries: [
          { label: "Bar", hours: "Daily, 4pm-late" },
          { label: "Dinner", hours: "Wednesday-Sunday, 5pm-10pm" },
          { label: "Brunch", hours: "Saturday-Sunday, 9am-2pm" },
        ],
      },
      {
        _type: "featureListBlock",
        title: "Downstairs you can",
        items: [
          "Meet friends for a late table",
          "Settle in at the bar for nightcaps",
          "Catch a guest chef dinner or listening session",
          "Work through a changing menu built around the season",
          "Turn a quick drink into the rest of the evening",
        ],
      },
      {
        _type: "galleryBlock",
        displayMode: "grid",
        title: "The Restaurant",
      },
      richTextBlock([
        "The restaurant should not read as a hotel afterthought. It is one of the main reasons to come here in the first place.",
        "Menus can change often. The CMS should support that editorially without turning the team into full-time menu-data managers.",
      ]),
      {
        _type: "eventFeedBlock",
        title: "Dining events + public programs",
        limit: 4,
      },
    ],
    seo: seo(
      "Restaurant at Hotel Reynard",
      "A destination dining room and bar with a changing menu, strong drinks, and regular public events.",
    ),
  },
  {
    _id: "eventsPage",
    _type: "eventsPage",
    title: "Events",
    intro:
      "Public events happen in the courtyard and in the restaurant. Some nights are louder, some softer, some built around food, some built around music, but all of them should feel like a natural extension of the property.",
    sections: [
      {
        _type: "heroBlock",
        eyebrow: "Public Events",
        title: "Come by even if you are not staying the night.",
        body:
          "Supper series, listening sessions, maker markets, guest pours, visiting cooks, and whatever else makes sense for the room and the season.",
        primaryCta: cta("Browse events", "/events"),
        secondaryCta: cta("Host something private", "/private-events"),
      },
      {
        _type: "eventFeedBlock",
        title: "Upcoming events",
        limit: 6,
      },
      richTextBlock([
        "Programming should support the restaurant, animate the courtyard, and give locals a reason to come back often enough that the property becomes part of their regular rhythm.",
      ]),
    ],
    seo: seo(
      "Events at Hotel Reynard",
      "Public dinners, music, markets, and seasonal programming across the restaurant and courtyard.",
    ),
  },
  {
    _id: "privateEventsPage",
    _type: "privateEventsPage",
    title: "Private Events",
    intro:
      "Big or small, indoor or outdoor, you have options. The courtyard brings fresh air and a little drama; the restaurant brings warmth, food, and a reason to stay late.",
    sections: [
      {
        _type: "heroBlock",
        eyebrow: "Private Events",
        title: "Your big day, in a more woodsy Oregon way.",
        body:
          "The property can host celebrations that feel social, grounded, and a little transportive without requiring guests to disappear into the middle of nowhere.",
        primaryCta: cta("Start an inquiry", "/private-events"),
        secondaryCta: cta("See public events", "/events"),
      },
      {
        _type: "featureListBlock",
        title: "Big or small, indoor or outdoor",
        items: [
          "Courtyard gatherings with room to spread out",
          "Restaurant buyouts and private dinners",
          "Wedding weekends that balance celebration and stay",
          "Corporate off-sites with a stronger point of view",
          "Events that move easily between drinks, dinner, and downtime",
        ],
      },
      {
        _type: "galleryBlock",
        displayMode: "grid",
        title: "The Event Space",
      },
      {
        _type: "inquiryBlock",
        title: "Tell us about your big day",
        body:
          "Wax poetic about your wedding dreams, your celebration plans, or the gathering you are trying to pull off. Tell us what matters and we will help shape the rest.",
        cta: cta("Start your inquiry", "/private-events"),
      },
      richTextBlock([
        "Want to talk it out? Tell us about the mood, the scale, the season, and the questions you need answered. This should feel collaborative from the very first touchpoint.",
      ]),
    ],
    seo: seo(
      "Private Events at Hotel Reynard",
      "Courtyard celebrations, private dinners, and wedding weekends with a warm, Oregon-forward point of view.",
    ),
  },
  {
    _id: "locationPage",
    _type: "locationPage",
    title: "Location",
    intro:
      "You can hike. You can bike. You can float. You can fish. You can drive out to waterfalls. You can come back for dinner. You can walk to one more drink. The point is not choosing city or nature. The point is having both within reach.",
    sections: [
      {
        _type: "heroBlock",
        eyebrow: "Gateway",
        title: "A place that sits between town energy and open-air escape.",
        body:
          "Hotel Reynard should sell its location as hard as it sells its rooms: a natural jumping-off point for the Columbia River Gorge and an easy return to food, drinks, and a real bed.",
        primaryCta: cta("Plan your stay", "/stay"),
        secondaryCta: cta("Explore events", "/events"),
      },
      {
        _type: "featureListBlock",
        title: "Nearby you can",
        items: [
          "Head into the Gorge for hiking and waterfall stops",
          "Float or paddle when the weather turns generous",
          "Cycle scenic roads and trail networks",
          "Spend the day outdoors and come back dressed for dinner",
          "Use the hotel as a base rather than a destination in isolation",
        ],
      },
      {
        _type: "galleryBlock",
        displayMode: "grid",
        title: "The Region",
      },
      richTextBlock([
        "The strongest version of this story is not just proximity. It is rhythm. Guests can wake up, go big outside, and return to a place that still feels social and switched on.",
      ]),
    ],
    seo: seo(
      "Location | Hotel Reynard",
      "A boutique hotel and restaurant positioned between town life and Columbia Gorge adventure.",
    ),
  },
];

export const pageDocuments = [
  {
    _id: "page-about",
    _type: "page",
    title: "About",
    slug: slug("about"),
    sections: [
      {
        _type: "heroBlock",
        eyebrow: "About",
        title: "A small hotel with a strong downstairs pulse.",
        body:
          "Hotel Reynard is built around the idea that a stay can feel both restorative and social. The rooms carry personality. The restaurant draws its own crowd. The whole place should feel alive.",
      },
      richTextBlock([
        "This is not a giant resort with a hundred room categories and a long list of interchangeable amenities. It is a smaller, more specific kind of stay.",
        "The building is meant to reward guests who care about hospitality, design, food, and access to the landscape around them.",
      ]),
    ],
    seo: seo("About Hotel Reynard", "Learn about the point of view behind Hotel Reynard."),
  },
  {
    _id: "page-faq",
    _type: "page",
    title: "FAQ",
    slug: slug("faq"),
    sections: [
      {
        _type: "heroBlock",
        eyebrow: "FAQ",
        title: "The practical stuff",
        body:
          "A flexible page for the answers people ask before booking, before arriving, or before inviting the whole group.",
      },
      {
        _type: "featureListBlock",
        title: "Common questions",
        items: [
          "Can I choose a specific room?",
          "Are any rooms pet friendly?",
          "Is the restaurant open to the public?",
          "Do you host weddings and private events?",
          "What should we do nearby?",
        ],
      },
      richTextBlock([
        "The eventual content here can become more operational, but the scaffold should already make room for booking expectations, accessibility notes, dining questions, and event-space policies.",
      ]),
    ],
    seo: seo("FAQ | Hotel Reynard", "Common questions about staying, dining, and gathering at Hotel Reynard."),
  },
  {
    _id: "page-groups",
    _type: "page",
    title: "Group Stays",
    slug: slug("group-stays"),
    sections: [
      {
        _type: "heroBlock",
        eyebrow: "Groups",
        title: "Bring the whole floor into the picture.",
        body:
          "With only eight rooms, partial and full-property stays can feel unusually intimate, whether the occasion is celebratory, strategic, or somewhere in between.",
      },
      {
        _type: "featureListBlock",
        title: "Good fit for",
        items: [
          "Wedding weekends",
          "Creative retreats",
          "Small brand off-sites",
          "Family takeovers",
          "Friends who want a base with a bar downstairs",
        ],
      },
      richTextBlock([
        "Group-stay content should connect naturally to the private-events story without becoming the same page. Rooms, food, and gathering space all matter here.",
      ]),
    ],
    seo: seo("Group Stays | Hotel Reynard", "A flexible editorial page for small group stays and full-property takeovers."),
  },
];

export const seedDocuments = [
  ...singletonDocuments,
  ...roomDocuments,
  ...eventDocuments,
  ...pageDocuments,
];

export const seedImageManifest: ImageManifestEntry[] = [
  {
    documentId: "homePage",
    fieldPath: "sections[0].media",
    assetPath: "assets/pexels-ahmetcotur-19075308.jpg",
    alt: "Guests gathered outdoors near a forested hotel setting.",
  },
  {
    documentId: "homePage",
    fieldPath: "sections[2].images[0]",
    assetPath: "assets/pexels-luis-zambrano-3782493-16436966.jpg",
    alt: "A moody hospitality interior with warm lighting.",
  },
  {
    documentId: "homePage",
    fieldPath: "sections[2].images[1]",
    assetPath: "assets/pexels-vince-37964089.jpg",
    alt: "A scenic outdoor destination image for regional atmosphere.",
  },
  {
    documentId: "stayPage",
    fieldPath: "sections[0].media",
    assetPath: "assets/pexels-ahmetcotur-19075430.jpg",
    alt: "A quiet interior scene suitable for room storytelling.",
  },
  {
    documentId: "stayPage",
    fieldPath: "sections[2].images[0]",
    assetPath: "assets/pexels-thisispav-29350088.jpg",
    alt: "A detail-rich image evoking boutique room atmosphere.",
  },
  {
    documentId: "restaurantPage",
    fieldPath: "sections[0].media",
    assetPath: "assets/pexels-rahle-rabia-688134264-17948645.jpg",
    alt: "A restaurant or dining-adjacent hospitality scene.",
  },
  {
    documentId: "restaurantPage",
    fieldPath: "sections[3].images[0]",
    assetPath: "assets/pexels-leticia-alvares-1805702-31145160.jpg",
    alt: "Food-and-drink atmosphere imagery for the restaurant page.",
  },
  {
    documentId: "eventsPage",
    fieldPath: "sections[0].media",
    assetPath: "assets/pexels-vince-37964089.jpg",
    alt: "Outdoor gathering imagery for public events.",
  },
  {
    documentId: "privateEventsPage",
    fieldPath: "sections[0].media",
    assetPath: "assets/pexels-ahmetcotur-19075308.jpg",
    alt: "Large outdoor lawn or event-ready setting.",
  },
  {
    documentId: "privateEventsPage",
    fieldPath: "sections[2].images[0]",
    assetPath: "assets/pexels-ahmetcotur-19075430.jpg",
    alt: "Hospitality-focused outdoor event imagery.",
  },
  {
    documentId: "locationPage",
    fieldPath: "sections[0].media",
    assetPath: "assets/pexels-vince-37964089.jpg",
    alt: "Scenic landscape imagery for the region and destination story.",
  },
  {
    documentId: "locationPage",
    fieldPath: "sections[2].images[0]",
    assetPath: "assets/pexels-luis-zambrano-3782493-16436966.jpg",
    alt: "A destination image that supports the city-and-nature positioning.",
  },
  {
    documentId: roomIds.fir,
    fieldPath: "heroImage",
    assetPath: "assets/pexels-thisispav-29350088.jpg",
    alt: "Moody boutique room atmosphere for Fir.",
  },
  {
    documentId: roomIds.juniper,
    fieldPath: "heroImage",
    assetPath: "assets/pexels-leticia-alvares-1805702-31145160.jpg",
    alt: "Bright, design-forward room atmosphere for Juniper.",
  },
  {
    documentId: roomIds.willow,
    fieldPath: "heroImage",
    assetPath: "assets/pexels-ahmetcotur-19075430.jpg",
    alt: "Airy upper-floor room atmosphere for Willow.",
  },
  {
    documentId: "event-courtyard-supper-series",
    fieldPath: "heroImage",
    assetPath: "assets/pexels-ahmetcotur-19075308.jpg",
    alt: "Outdoor dinner setting for the Courtyard Supper Series.",
  },
  {
    documentId: "event-listening-hour",
    fieldPath: "heroImage",
    assetPath: "assets/pexels-rahle-rabia-688134264-17948645.jpg",
    alt: "Low-lit bar or listening-session atmosphere.",
  },
];
