// Loading environment variables from .env files
// https://docs.astro.build/en/guides/configuring-astro/#environment-variables
import { loadEnv } from "vite";
const {
  PUBLIC_SANITY_STUDIO_PROJECT_ID,
  PUBLIC_SANITY_STUDIO_DATASET,
  PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_DATASET,
  PUBLIC_SANITY_API_VERSION,
  PUBLIC_SANITY_STUDIO_URL,
  PUBLIC_SANITY_USE_CDN,
} = loadEnv(import.meta.env.MODE, process.cwd(), "");
import { defineConfig } from "astro/config";

// Different environments use different variables
const projectId = PUBLIC_SANITY_STUDIO_PROJECT_ID || PUBLIC_SANITY_PROJECT_ID;
const dataset = PUBLIC_SANITY_STUDIO_DATASET || PUBLIC_SANITY_DATASET;
const apiVersion = PUBLIC_SANITY_API_VERSION || "2025-12-01";
const useCdn = PUBLIC_SANITY_USE_CDN === "true";
const studioUrl = PUBLIC_SANITY_STUDIO_URL || "http://localhost:3333";

import sanity from "@sanity/astro";
import react from "@astrojs/react";

// Change this depending on your hosting provider (Vercel, Netlify etc)
// https://docs.astro.build/en/guides/server-side-rendering/#adding-an-adapter
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  // Hybrid+adapter is required to support embedded Sanity Studio
  output: "hybrid",
  vite: {
    resolve: {
      alias: [
        // Sanity Visual Editing currently pulls `react/compiler-runtime` in a way
        // that doesn't hydrate cleanly in Vite dev for this app. Pointing it at
        // `react-compiler-runtime` gives the ESM export shape Sanity expects.
        {
          find: "react/compiler-runtime",
          replacement: "react-compiler-runtime",
        },
        // Some Sanity runtime packages default-import lodash subpath modules.
        // Redirect those to lodash-es so Vite can consume them as ESM in dev.
        {
          find: /^lodash\/(.*)\.js$/,
          replacement: "lodash-es/$1.js",
        },
      ],
    },
  },
  adapter: vercel({
    runtime: "nodejs20.x",
  }),
  integrations: [
    sanity({
      projectId,
      dataset,
      stega: {
        studioUrl,
      },
      useCdn: useCdn,
      apiVersion,
    }),
    react(), // Required for Sanity Studio
  ],
});
