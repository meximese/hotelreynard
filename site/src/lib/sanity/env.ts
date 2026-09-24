function readEnv(name: string) {
  // Next.js only inlines public environment variables in client bundles when
  // they are referenced statically. Keep the lookup dynamic for callers while
  // making the public value available to browser code.
  const values: Record<string, string | undefined> = {
    NEXT_PUBLIC_SANITY_STUDIO_URL: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL,
  };
  const value = values[name]?.trim();
  return value ? value : null;
}

export const visualEditingEnabled =
  process.env.NEXT_PUBLIC_SANITY_VISUAL_EDITING_ENABLED === "true";

export function readRequiredSanityEnv(name: string) {
  const value = readEnv(name);

  if (!value) {
    throw new Error(`Missing required Sanity environment variable: ${name}`);
  }

  return value;
}

export function readRequiredSanityUrlEnv(name: string) {
  const value = readRequiredSanityEnv(name);

  let parsed: URL;

  try {
    parsed = new URL(value);
  } catch {
    throw new Error(`Invalid URL in Sanity environment variable ${name}: ${value}`);
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

export const studioUrl = visualEditingEnabled
  ? readRequiredSanityUrlEnv("NEXT_PUBLIC_SANITY_STUDIO_URL")
  : null;
