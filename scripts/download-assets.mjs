#!/usr/bin/env node
/**
 * One-shot asset mirror script. Populate ASSETS below with the source URLs
 * from the live site, then run `npm run assets:fetch`. Files land under
 * public/images/ with stable slugs matching src/data/*.ts.
 *
 * Until real URLs are added, this script is a no-op. The site renders
 * gradient placeholders (Placeholder component) for any missing image.
 */

import { createWriteStream } from "node:fs";
import { mkdir, stat, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { createHash } from "node:crypto";
import { Readable } from "node:stream";

// EDIT THIS LIST to mirror real image URLs from the live site.
// Each entry: { src: "https://...", to: "public/images/.../<slug>.jpg" }
const ASSETS = [
  // Example:
  // { src: "https://static.wixstatic.com/media/example.jpg", to: "public/images/products/ligas-de-bronze-aluminio.jpg" },
];

const FORCE = process.argv.includes("--force");

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function download(src, to) {
  const out = resolve(process.cwd(), to);
  if (!FORCE && (await exists(out))) {
    return { src, to, skipped: true };
  }
  await mkdir(dirname(out), { recursive: true });
  const res = await fetch(src);
  if (!res.ok || !res.body) {
    throw new Error(`Fetch failed (${res.status}): ${src}`);
  }
  const hash = createHash("sha256");
  await new Promise((resolveStream, reject) => {
    const fileStream = createWriteStream(out);
    const source = Readable.fromWeb(res.body);
    source.on("data", (chunk) => hash.update(chunk));
    source.on("error", reject);
    fileStream.on("error", reject);
    fileStream.on("finish", resolveStream);
    source.pipe(fileStream);
  });
  return { src, to, sha256: hash.digest("hex") };
}

async function main() {
  if (ASSETS.length === 0) {
    console.log("No assets configured. Add URLs to ASSETS in scripts/download-assets.mjs.");
    return;
  }
  const manifest = [];
  for (const a of ASSETS) {
    try {
      const result = await download(a.src, a.to);
      manifest.push(result);
      console.log(result.skipped ? `skip  ${a.to}` : `ok    ${a.to}`);
    } catch (err) {
      console.error(`fail  ${a.to}  ${err.message}`);
    }
  }
  await writeFile(
    resolve(process.cwd(), "public/images/manifest.json"),
    JSON.stringify({ generatedAt: new Date().toISOString(), assets: manifest }, null, 2),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
