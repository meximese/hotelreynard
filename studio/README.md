# Studio

Sanity Studio workspace for Hotel Reynard.

## Commands

```bash
npm run dev --workspace=@hotelreynard/studio
npm run build --workspace=@hotelreynard/studio
npm run seed:import --workspace=@hotelreynard/studio
```

Or from this folder:

```bash
npm run dev
npm run build
npm run seed:import
```

## Environment

Expected env vars:

- `SANITY_STUDIO_PROJECT_ID`
- `SANITY_STUDIO_DATASET`
- `SANITY_SITE_PREVIEW_URL`

CLI config lives in [sanity.cli.ts](/Users/vinh/dev/reynard/hotelreynard/studio/sanity.cli.ts).
Studio config lives in [sanity.config.ts](/Users/vinh/dev/reynard/hotelreynard/studio/sanity.config.ts).

## Structure

- [src/schemaTypes](/Users/vinh/dev/reynard/hotelreynard/studio/src/schemaTypes): schema registry, documents, and objects
- [src/structure](/Users/vinh/dev/reynard/hotelreynard/studio/src/structure): desk structure
- [scripts](/Users/vinh/dev/reynard/hotelreynard/studio/scripts): one-off studio scripts

## Notes

- Studio is currently on `sanity@6`.
- Presentation is configured in `sanity.config.ts`.
- Shared schema primitives live under `src/schemaTypes/objects`.
