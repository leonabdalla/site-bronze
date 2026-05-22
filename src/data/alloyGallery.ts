import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(process.cwd(), "public", "images", "alloys");

const cache = new Map<string, string[]>();

export function getAlloyGallery(alloySlug: string): string[] {
  if (cache.has(alloySlug)) return cache.get(alloySlug)!;
  const dir = path.join(ROOT, alloySlug);
  let files: string[] = [];
  try {
    files = fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .sort();
  } catch {
    files = [];
  }
  const urls = files.map((f) => `/images/alloys/${alloySlug}/${f}`);
  cache.set(alloySlug, urls);
  return urls;
}
