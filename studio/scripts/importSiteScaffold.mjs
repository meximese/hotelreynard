import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { pathToFileURL } from "node:url";
import ts from "typescript";
import { getCliClient } from "sanity/cli";

const scriptDir = path.dirname(new URL(import.meta.url).pathname);
const studioDir = path.resolve(scriptDir, "..");
const repoRoot = path.resolve(studioDir, "..", "..");
const studioEnvPath = path.join(studioDir, ".env.local");
const webEnvPath = path.join(repoRoot, "apps", "web", ".env.local");
const seedFilePath = path.join(studioDir, "src", "seed", "siteScaffold.ts");

loadEnvFile(studioEnvPath);
loadEnvFile(webEnvPath);

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset =
  process.env.SANITY_STUDIO_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET;
const writeToken = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN;

if (!projectId || !dataset) {
  throw new Error(
    `Missing Sanity configuration. Expected project and dataset env vars, checked ${studioEnvPath} and ${webEnvPath}.`,
  );
}

if (!writeToken) {
  throw new Error(
    `Missing SANITY_API_WRITE_TOKEN or SANITY_AUTH_TOKEN. Checked ${studioEnvPath} and ${webEnvPath}.`,
  );
}

const client = getCliClient({
  cwd: studioDir,
  projectId,
  dataset,
  apiVersion: "2026-07-01",
  useCdn: false,
  token: writeToken,
});

const { seedDocuments, seedImageManifest } = await importSeedModule(seedFilePath);
const documents = clone(seedDocuments);
const documentMap = new Map(documents.map((document) => [document._id, document]));
const orderedDocuments = sortDocumentsForImport(documents);

console.log(`Importing ${documents.length} documents into ${projectId}/${dataset}...`);

for (const manifestEntry of seedImageManifest) {
  const targetDocument = documentMap.get(manifestEntry.documentId);

  if (!targetDocument) {
    throw new Error(`Document ${manifestEntry.documentId} not found for image mapping ${manifestEntry.fieldPath}.`);
  }

  const absoluteAssetPath = path.join(repoRoot, manifestEntry.assetPath);

  if (!fs.existsSync(absoluteAssetPath)) {
    throw new Error(`Asset file not found: ${absoluteAssetPath}`);
  }

  const upload = await client.assets.upload(
    "image",
    fs.createReadStream(absoluteAssetPath),
    {
      filename: path.basename(absoluteAssetPath),
      title: manifestEntry.alt,
    },
  );

  setAtPath(targetDocument, manifestEntry.fieldPath, {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: upload._id,
    },
    alt: manifestEntry.alt,
  });

  console.log(`Uploaded ${manifestEntry.assetPath} -> ${manifestEntry.documentId}.${manifestEntry.fieldPath}`);
}

for (const document of orderedDocuments) {
  await client.createOrReplace(document);
  console.log(`Upserted ${document._type}:${document._id}`);
}

console.log("Site scaffold import complete.");

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const source = fs.readFileSync(filePath, "utf8");
  const lines = source.split(/\r?\n/);

  for (const line of lines) {
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

async function importSeedModule(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: filePath,
  });

  const tempFilePath = path.join(
    os.tmpdir(),
    `hotelreynard-site-scaffold-${Date.now()}-${Math.random().toString(36).slice(2)}.mjs`,
  );

  fs.writeFileSync(tempFilePath, transpiled.outputText, "utf8");

  try {
    return await import(pathToFileURL(tempFilePath).href);
  } finally {
    fs.unlinkSync(tempFilePath);
  }
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function setAtPath(target, fieldPath, value) {
  const tokens = parsePath(fieldPath);
  let current = target;

  for (let index = 0; index < tokens.length - 1; index += 1) {
    const token = tokens[index];
    const nextToken = tokens[index + 1];

    if (typeof token === "number") {
      if (!Array.isArray(current)) {
        throw new Error(`Expected array while walking ${fieldPath}`);
      }

      if (current[token] === undefined) {
        current[token] = typeof nextToken === "number" ? [] : {};
      }

      current = current[token];
      continue;
    }

    if (current[token] === undefined) {
      current[token] = typeof nextToken === "number" ? [] : {};
    }

    current = current[token];
  }

  const lastToken = tokens[tokens.length - 1];

  if (typeof lastToken === "number") {
    if (!Array.isArray(current)) {
      throw new Error(`Expected array before final token in ${fieldPath}`);
    }

    current[lastToken] = value;
    return;
  }

  current[lastToken] = value;
}

function parsePath(fieldPath) {
  return fieldPath
    .split(".")
    .flatMap((segment) => {
      const tokens = [];
      const matcher = /([^[\]]+)|\[(\d+)\]/g;
      let match;

      while ((match = matcher.exec(segment)) !== null) {
        if (match[1]) {
          tokens.push(match[1]);
        } else if (match[2]) {
          tokens.push(Number(match[2]));
        }
      }

      return tokens;
    });
}

function sortDocumentsForImport(documents) {
  const priority = {
    siteSettings: 1,
    room: 2,
    event: 3,
    page: 4,
    homePage: 5,
    stayPage: 6,
    restaurantPage: 7,
    eventsPage: 8,
    privateEventsPage: 9,
    locationPage: 10,
  };

  return [...documents].sort((left, right) => {
    const leftPriority = priority[left._type] || 100;
    const rightPriority = priority[right._type] || 100;

    if (leftPriority !== rightPriority) {
      return leftPriority - rightPriority;
    }

    return String(left._id).localeCompare(String(right._id));
  });
}
