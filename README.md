# Hotel Reynard

Monorepo for the Hotel Reynard website and supporting content tooling.

The primary frontend in this repo is the Next.js app in [site](/Users/vinh/dev/reynard/hotelreynard/site). The repo also includes a Sanity Studio workspace and a shared email package.

## Workspaces

- `site` - Next.js 16 App Router hotel site
- `studio` - Sanity Studio for editorial content
- `packages/email` - shared React email templates used by app API routes

## Getting Started

Install dependencies from the repo root:

```bash
npm install
```

Run the Next.js app:

```bash
npm run dev --workspace=@hotelreynard/site
```

The web app runs at [http://localhost:3000](http://localhost:3000).

Run the web app and Sanity Studio together:

```bash
npm run dev
```

That starts:

- the Next.js app at [http://localhost:3000](http://localhost:3000)
- the Sanity Studio at [http://localhost:3333](http://localhost:3333)

## Environment Templates

- [site/.env.example](/Users/vinh/dev/reynard/hotelreynard/site/.env.example) defines frontend Sanity env vars.
- [studio/.env.example](/Users/vinh/dev/reynard/hotelreynard/studio/.env.example) defines Studio Presentation env vars.

The important split is:

- `NEXT_PUBLIC_SANITY_STUDIO_URL` = the Studio origin
- `SANITY_SITE_PREVIEW_URL` = the site origin that Presentation opens

## Useful Commands

```bash
# Next.js app
npm run dev --workspace=@hotelreynard/site
npm run build --workspace=@hotelreynard/site
npm run lint --workspace=@hotelreynard/site

# Sanity Studio
npm run dev --workspace=@hotelreynard/studio

# Email previews
npm run email:dev
```

## Workspace Notes

- `site` is the active frontend.
- `studio` is the active Sanity workspace used alongside `site`.
- `packages/email` contains the shared email templates used by site API routes.

## NOTE:

The archived Reynard wordmark morph lives in [site/src/components/archive/reynard-wordmark-morph](/Users/vinh/dev/reynard/hotelreynard/site/src/components/archive/reynard-wordmark-morph) with source SVGs in [site/public/archive/reynard-wordmark-morph](/Users/vinh/dev/reynard/hotelreynard/site/public/archive/reynard-wordmark-morph).
