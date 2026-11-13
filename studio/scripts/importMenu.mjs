import fs from "node:fs";
import path from "node:path";
import { getCliClient } from "sanity/cli";

const scriptsDir = path.dirname(new URL(import.meta.url).pathname);
const studioDir = path.resolve(scriptsDir, "..");
const fileIndex = process.argv.indexOf("--file");
const fileArgument = fileIndex >= 0 ? process.argv[fileIndex + 1] : undefined;

if (!fileArgument) {
  throw new Error(
    "Provide a menu JSON file with --file. Example: npm run menu:import -- --file src/seed/menus/lunch.json",
  );
}

const menuPath = path.resolve(studioDir, fileArgument);
const menu = JSON.parse(fs.readFileSync(menuPath, "utf8"));

if (menu._type !== "menu" || !menu._id) {
  throw new Error(`Expected ${menuPath} to contain a menu document with _type and _id.`);
}

loadEnvFile(path.join(studioDir, ".env.local"));

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN;

if (!projectId || !dataset || !token) {
  throw new Error(
    "Missing Sanity configuration. Set SANITY_STUDIO_PROJECT_ID, SANITY_STUDIO_DATASET, and SANITY_API_WRITE_TOKEN or SANITY_AUTH_TOKEN.",
  );
}

const client = getCliClient({
  cwd: studioDir,
  projectId,
  dataset,
  apiVersion: "2026-07-01",
  useCdn: false,
  token,
});

await client.createOrReplace(menu);
console.log(`Imported ${menu._type}:${menu._id} from ${fileArgument} into ${projectId}/${dataset}.`);

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const equalsIndex = trimmed.indexOf("=");

    if (equalsIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, equalsIndex).trim();
    const value = trimmed
      .slice(equalsIndex + 1)
      .trim()
      .replace(/\s+#.*$/, "")
      .replace(/^['"]|['"]$/g, "");

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}
