# Hotel Reynard

Monorepo for the Hotel Reynard website and supporting content tooling.

The primary frontend in this repo is the Next.js app in [apps/web](/Users/vinh/dev/reynard/hotelreynard/apps/web). The repo also includes a Sanity Studio workspace and a shared email package.

## Workspaces

- `apps/web` - Next.js 16 App Router hotel site
- `apps/studio` - Sanity Studio for editorial content
- `packages/email` - shared React email templates used by app API routes

## Getting Started

Install dependencies from the repo root:

```bash
npm install
```

Run the Next.js app:

```bash
npm run dev --workspace=@hotelreynard/web
```

The web app runs at [http://localhost:3000](http://localhost:3000).

Run the web app and Sanity Studio together:

```bash
npm run dev
```

That starts:

- the Next.js app at [http://localhost:3000](http://localhost:3000)
- the Sanity Studio at [http://localhost:3333](http://localhost:3333)

## Useful Commands

```bash
# Next.js app
npm run dev --workspace=@hotelreynard/web
npm run build --workspace=@hotelreynard/web
npm run lint --workspace=@hotelreynard/web

# Sanity Studio
npm run dev --workspace=@hotelreynard/studio

# Email previews
npm run email:dev
```
