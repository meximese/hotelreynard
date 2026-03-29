# Hotel Reynard Email Package

This workspace owns the React Email rendering layer for transactional emails.

## Preview scripts

- `npm run email:dev`
  Starts the React Email preview server at `http://localhost:3040` using the preview components in `packages/email/src/previews/`.

- `npm run email:preview`
  Renders sample HTML previews into `packages/email/.preview/`.

## Notes

- The preview server follows the React Email CLI workflow for monorepos.
- The generated HTML previews use code defaults and sample data, not live Sanity content.
- Transactional email copy can be overridden in Sanity using the `emailTemplate` document type.
