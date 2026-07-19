import fs from "node:fs";
import path from "node:path";
import { getCliClient } from "sanity/cli";

const scriptDir = path.dirname(new URL(import.meta.url).pathname);
const studioDir = path.resolve(scriptDir, "..");
const repoRoot = path.resolve(studioDir, "..", "..");

for (const envPath of [
  path.join(studioDir, ".env.local"),
  path.join(repoRoot, "apps", "web", ".env.local"),
]) {
  loadEnvFile(envPath);
}

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID;
const dataset =
  process.env.SANITY_STUDIO_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET;
const writeToken = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN;

if (!projectId || !dataset || !writeToken) {
  throw new Error("Missing Sanity project, dataset, or write token.");
}

const client = getCliClient({
  cwd: studioDir,
  projectId,
  dataset,
  apiVersion: "2026-07-01",
  useCdn: false,
  token: writeToken,
});

const homePage = await client.fetch(`*[_type == "homePage"][0]{
  hero,
  title,
  intro,
  sections,
  seo
}`);

if (!homePage) {
  throw new Error("Home page document not found.");
}

await client
  .patch("stayPage")
  .set({
    hero: clone(homePage.hero),
    title: homePage.title,
    intro: homePage.intro,
    sections: clone(homePage.sections || []),
    seo: clone(homePage.seo),
  })
  .commit();

console.log("Duplicated home page content onto stayPage.");

function clone(value) {
  if (value === undefined) {
    return undefined;
  }

  return JSON.parse(JSON.stringify(value));
}

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const source = fs.readFileSync(filePath, "utf8");

  for (const line of source.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const equalsIndex = trimmed.indexOf("=");

    if (equalsIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, equalsIndex).trim();
    const rawValue = trimmed.slice(equalsIndex + 1).trim();
    const value = rawValue.replace(/\s+#.*$/, "").replace(/^['"]|['"]$/g, "");

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}
