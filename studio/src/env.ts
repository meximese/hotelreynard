function requireEnv(name: string, value: string | undefined) {
  const trimmed = value?.trim();

  if (!trimmed) {
    throw new Error(`Missing required Sanity environment variable: ${name}`);
  }

  return trimmed;
}

function normalizeRequiredUrl(name: string, value: string | undefined) {
  const raw = requireEnv(name, value);

  let parsed: URL;

  try {
    parsed = new URL(raw);
  } catch {
    throw new Error(`Invalid URL in Sanity environment variable ${name}: ${raw}`);
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error(
      `Invalid protocol in Sanity environment variable ${name}: expected http or https, received ${parsed.protocol}`,
    );
  }

  if (parsed.search || parsed.hash) {
    throw new Error(
      `Invalid URL in Sanity environment variable ${name}: query strings and hashes are not supported`,
    );
  }

  parsed.pathname = parsed.pathname.replace(/\/+$/, "") || "/";

  return parsed.toString().replace(/\/$/, "");
}

export const studioProjectId = requireEnv(
  "SANITY_STUDIO_PROJECT_ID",
  process.env.SANITY_STUDIO_PROJECT_ID,
);

export const studioDataset = requireEnv(
  "SANITY_STUDIO_DATASET",
  process.env.SANITY_STUDIO_DATASET,
);

export const studioSitePreviewUrl = normalizeRequiredUrl(
  "SANITY_STUDIO_SITE_PREVIEW_URL",
  process.env.SANITY_STUDIO_SITE_PREVIEW_URL,
);
