import { media } from "sanity-plugin-media";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { defineDocuments, defineLocations, presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { readRequiredSanityEnv, readRequiredSanityUrlEnv } from "./src/env";
import { schemaTypes } from "./src/schemaTypes";
import { deskStructure } from "./src/structure";

const previewUrl = readRequiredSanityUrlEnv("SANITY_STUDIO_SITE_PREVIEW_URL");
const projectId = readRequiredSanityEnv("SANITY_STUDIO_PROJECT_ID");
const dataset = readRequiredSanityEnv("SANITY_STUDIO_DATASET");

const singletonLocation = (title: string, href: string) =>
  defineLocations({
    select: {
      docTitle: "title",
    },
    resolve: (document) => ({
      locations: [
        {
          title: document?.docTitle || title,
          href,
        },
      ],
    }),
  });

export default defineConfig({
  name: "hotelreynard-studio",
  title: "Hotel Reynard Studio",
  projectId,
  dataset,
  plugins: [
    structureTool({ structure: deskStructure }),
    presentationTool({
      previewUrl: {
        initial: previewUrl,
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
      resolve: {
        mainDocuments: defineDocuments([
          { route: "/", type: "homePage" },
          { route: "/stay", type: "stayPage" },
          { route: "/restaurant", type: "restaurantPage" },
          { route: "/events", type: "eventsPage" },
          { route: "/private-events", type: "privateEventsPage" },
          { route: "/location", type: "locationPage" },
          {
            route: "/rooms/:slug",
            resolve: ({ params }) => ({
              filter: '_type == "room" && slug.current == $slug',
              params: { slug: params.slug },
            }),
          },
          {
            route: "/events/:slug",
            resolve: ({ params }) => ({
              filter: '_type == "event" && slug.current == $slug',
              params: { slug: params.slug },
            }),
          },
          {
            route: "/:slug",
            resolve: ({ params }) => ({
              filter: '_type == "page" && slug.current == $slug',
              params: { slug: params.slug },
            }),
          },
        ]),
        locations: {
          homePage: singletonLocation("Home", "/"),
          stayPage: singletonLocation("Stay", "/stay"),
          restaurantPage: singletonLocation("Restaurant", "/restaurant"),
          eventsPage: singletonLocation("Events", "/events"),
          privateEventsPage: singletonLocation("Private events", "/private-events"),
          locationPage: singletonLocation("Location", "/location"),
          room: defineLocations({
            select: {
              title: "title",
              slug: "slug.current",
            },
            resolve: (document) =>
              document?.slug
                ? {
                    locations: [
                      {
                        title: document.title || "Room",
                        href: `/rooms/${document.slug}`,
                      },
                    ],
                  }
                : null,
          }),
          event: defineLocations({
            select: {
              title: "title",
              slug: "slug.current",
            },
            resolve: (document) =>
              document?.slug
                ? {
                    locations: [
                      {
                        title: document.title || "Event",
                        href: `/events/${document.slug}`,
                      },
                    ],
                  }
                : null,
          }),
          page: defineLocations({
            select: {
              title: "title",
              slug: "slug.current",
            },
            resolve: (document) =>
              document?.slug
                ? {
                    locations: [
                      {
                        title: document.title || "Page",
                        href: `/${document.slug}`,
                      },
                    ],
                  }
                : null,
          }),
        },
      },
    }),
    media(),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
