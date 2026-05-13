# Hotel Reynard

Monorepo for the Hotel Reynard website and supporting content tooling.

The primary frontend in this repo is the Next.js app in [site](/Users/vinh/dev/reynard/hotelreynard/site). The repo also includes a Sanity Studio workspace, a shared email package, and an older Astro site that appears to be retained for reference.

## Workspaces

- `site` - Next.js 16 App Router marketing site
- `studio` - Sanity Studio for editorial content
- `packages/email` - shared React email templates used by site API routes
- `web` - legacy Astro site

## Getting Started

Install dependencies from the repo root:

```bash
npm install
```

Run the Next.js site:

```bash
npm run dev --workspace=site
```

The site runs at [http://localhost:3000](http://localhost:3000).

Run the site and Sanity Studio together:

```bash
npm run dev
```

That starts:

- the Next.js site at [http://localhost:3000](http://localhost:3000)
- the Sanity Studio at [http://localhost:3333](http://localhost:3333)

## Next.js Site

See the workspace README for full setup details:

- [site/README.md](/Users/vinh/dev/reynard/hotelreynard/site/README.md)

## Useful Commands

```bash
# Next.js site
npm run dev --workspace=site
npm run build --workspace=site
npm run lint --workspace=site

# Sanity Studio
npm run dev --workspace=studio

# Email previews
npm run email:dev
```
