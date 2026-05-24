/**
 * Post-build step for GitHub Pages.
 *
 * `next build` writes localized routes under PT-named directories
 * (e.g. `out/en/produtos/`). GitHub Pages cannot do server-side
 * rewrites, so we restructure `out/` here to match the public URLs:
 *
 *   1. Rename `out/<locale>/<pt-slug>/` to `out/<locale>/<localized-slug>/`
 *      for every (locale, route) pair where the slugs differ.
 *   2. Strip the default-locale prefix: move `out/pt/*` up to `out/*`.
 *   3. Emit meta-refresh stubs at `out/pt/...` so old prefixed links
 *      still land on the canonical URL.
 *   4. Emit meta-refresh stubs for the legacy Wix-era URLs we used
 *      to redirect via Cloudflare `_redirects`.
 *
 * Source of truth for localized slugs: `src/i18n/routing.ts`.
 */

import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, rename, rm, stat, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

import { routing } from "../src/i18n/routing";
import { legacyRedirects } from "./legacy-redirects";

const OUT_DIR = "out";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "/site-bronze";

type Locale = (typeof routing.locales)[number];
const defaultLocale = routing.defaultLocale as Locale;

function firstSegment(path: string): string {
  return path.replace(/^\/+/, "").split("/")[0] ?? "";
}

function stub(targetPath: string): string {
  const url = `${BASE_PATH}${targetPath}`;
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<title>Redirecting…</title>
<link rel="canonical" href="${url}">
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=${url}">
</head>
<body>
<p>Redirecting to <a href="${url}">${url}</a></p>
</body>
</html>
`;
}

async function writeStub(outRelPath: string, target: string) {
  const filePath = join(OUT_DIR, outRelPath, "index.html");
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, stub(target), "utf8");
}

async function renameDirIfExists(from: string, to: string) {
  if (!existsSync(from)) return;
  if (existsSync(to)) {
    throw new Error(`Refusing to rename ${from} → ${to}: destination exists`);
  }
  await rename(from, to);
}

async function moveDirContents(src: string, dest: string) {
  if (!existsSync(src)) return;
  await mkdir(dest, { recursive: true });
  const entries = await readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);
    if (existsSync(destPath)) {
      throw new Error(`Conflict moving ${srcPath} → ${destPath}: destination exists`);
    }
    await rename(srcPath, destPath);
  }
  await rm(src, { recursive: true, force: true });
}

/** Top-level routes only — nested routes ride along when we rename the parent dir. */
function topLevelRoutes(): string[] {
  return Object.keys(routing.pathnames).filter((p) => {
    if (p === "/") return false;
    return p.split("/").filter(Boolean).length === 1;
  });
}

/** Map of (locale, ptSlug) → localizedSlug, only where they differ. */
function localizedSlugMap(): Record<Locale, Array<{ pt: string; localized: string }>> {
  const result = {} as Record<Locale, Array<{ pt: string; localized: string }>>;
  for (const locale of routing.locales) {
    result[locale] = [];
  }
  for (const route of topLevelRoutes()) {
    const config = routing.pathnames[route as keyof typeof routing.pathnames];
    if (typeof config === "string") continue;
    const ptSlug = firstSegment(config[defaultLocale] ?? route);
    for (const locale of routing.locales) {
      if (locale === defaultLocale) continue;
      const localizedSlug = firstSegment(config[locale] ?? route);
      if (localizedSlug !== ptSlug) {
        result[locale].push({ pt: ptSlug, localized: localizedSlug });
      }
    }
  }
  return result;
}

async function step1_renameLocalizedDirs() {
  const map = localizedSlugMap();
  for (const locale of routing.locales) {
    if (locale === defaultLocale) continue;
    for (const { pt, localized } of map[locale]) {
      const from = join(OUT_DIR, locale, pt);
      const to = join(OUT_DIR, locale, localized);
      await renameDirIfExists(from, to);
      console.log(`  renamed ${from} → ${to}`);
    }
  }
}

async function step2_stripDefaultLocalePrefix() {
  const src = join(OUT_DIR, defaultLocale);
  if (!existsSync(src)) return;
  await moveDirContents(src, OUT_DIR);
  console.log(`  moved ${src}/* → ${OUT_DIR}/*`);
}

async function step3_emitCanonicalStubs() {
  // For each top-level route, write a /pt/<slug>/ stub pointing to /<slug>/.
  // Also write a /pt/ → / stub.
  await writeStub(defaultLocale, "/");
  for (const route of topLevelRoutes()) {
    const config = routing.pathnames[route as keyof typeof routing.pathnames];
    const ptSlug = typeof config === "string"
      ? firstSegment(config)
      : firstSegment(config[defaultLocale] ?? route);
    await writeStub(join(defaultLocale, ptSlug), `/${ptSlug}/`);
  }
  console.log(`  emitted ${topLevelRoutes().length + 1} canonical /pt/ stubs`);
}

async function step4_emitLegacyStubs() {
  for (const [from, to] of Object.entries(legacyRedirects)) {
    const cleanFrom = from.replace(/^\/+/, "").replace(/\/+$/, "");
    await writeStub(cleanFrom, to);
  }
  console.log(`  emitted ${Object.keys(legacyRedirects).length} legacy 301 stubs`);
}

/**
 * Walk all generated .html files and prepend basePath to absolute-rooted asset
 * references that Next does NOT auto-prefix in static export — namely public/
 * assets referenced as plain strings (next/image with unoptimized:true, hard-
 * coded <a href> to /catalogs/x.pdf, etc.).
 *
 * Only rewrites paths that match known public/ subdirectories to avoid mangling
 * unrelated content. Skips paths that already start with basePath.
 */
async function step5_prefixPublicAssets() {
  if (!BASE_PATH) return;
  const publicDirs = ["images", "catalogs"];
  const prefixPattern = new RegExp(
    `(["'(\\s])/(${publicDirs.join("|")})/`,
    "g",
  );
  let filesTouched = 0;
  let replacements = 0;
  async function walk(dir: string) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
      } else if (entry.isFile() && entry.name.endsWith(".html")) {
        const src = await readFile(full, "utf8");
        let count = 0;
        const out = src.replace(prefixPattern, (_m, lead, subdir) => {
          count++;
          return `${lead}${BASE_PATH}/${subdir}/`;
        });
        if (count > 0) {
          await writeFile(full, out, "utf8");
          filesTouched++;
          replacements += count;
        }
      }
    }
  }
  await walk(OUT_DIR);
  console.log(`  prefixed ${replacements} public-asset refs across ${filesTouched} html files`);
}

async function main() {
  if (!existsSync(OUT_DIR)) {
    throw new Error(`Output directory '${OUT_DIR}' not found — did 'next build' run?`);
  }
  console.log(`post-build: restructuring '${OUT_DIR}' for GitHub Pages (basePath=${BASE_PATH || "(none)"})`);
  await step1_renameLocalizedDirs();
  await step2_stripDefaultLocalePrefix();
  await step3_emitCanonicalStubs();
  await step4_emitLegacyStubs();
  await step5_prefixPublicAssets();
  console.log("post-build: done");
}

main().catch((err) => {
  console.error("post-build failed:", err);
  process.exit(1);
});
