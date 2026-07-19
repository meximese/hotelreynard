# Hotel Reynard

Monorepo for the Hotel Reynard website and supporting content tooling.

The primary frontend in this repo is the Next.js app in [apps/web](/Users/vinh/dev/reynard/hotelreynard/apps/web). The repo also includes a Sanity Studio workspace and a shared email package.

Legacy work from the retired `/site` app is being folded into `apps/web`. If you need to reference saved motion experiments during that cleanup, the archived Reynard wordmark morph now lives in [apps/web/src/components/archive/reynard-wordmark-morph](/Users/vinh/dev/reynard/hotelreynard/apps/web/src/components/archive/reynard-wordmark-morph) with source SVGs in [apps/web/public/archive/reynard-wordmark-morph](/Users/vinh/dev/reynard/hotelreynard/apps/web/public/archive/reynard-wordmark-morph).

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

## Migration Notes

- `apps/web` is the active frontend. Do not add new product code to the legacy `/site` app.
- `apps/studio` is the active Sanity workspace used alongside `apps/web`.
- After deleting `/site`, run `npm install` from the repo root once to refresh [package-lock.json](/Users/vinh/dev/reynard/hotelreynard/package-lock.json) and remove the old workspace entries.
