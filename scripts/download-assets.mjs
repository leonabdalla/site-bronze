#!/usr/bin/env node
/**
 * Mirror images from the live Wix CDN into public/images/.
 * Run: `npm run assets:fetch` (idempotent; pass --force to refetch).
 *
 * Uses Wix image transforms (/v1/fill/...) to request larger, higher-quality
 * versions than the bare CDN URL serves at default sizes.
 */

import { createWriteStream } from "node:fs";
import { mkdir, stat, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { createHash } from "node:crypto";
import { Readable } from "node:stream";

const WIX = "https://static.wixstatic.com/media";

// Helper: build a Wix transform URL at a given width with high quality.
// Wix requires `fit` (or `fill`) with both w_ and h_, plus the trailing
// filename must include the ~mv2 marker.
const hd = (id, ext, w = 1200, h, q = 90) => {
  const height = h ?? Math.round(w * 1.2);
  return `${WIX}/${id}~mv2.${ext}/v1/fit/w_${w},h_${height},al_c,q_${q}/${id}~mv2.${ext}`;
};

const hero = (id, ext) =>
  `${WIX}/${id}~mv2.${ext}/v1/fit/w_2400,h_1200,al_c,q_85/${id}~mv2.${ext}`;

const ASSETS = [
  // Brand (logo handled by SVG component; keep ISO + 45-years stamps high-res)
  { src: hd("66fb6f_10ff0d054d4d40f09f34cf1d99f340f2", "jpg", 600, 600), to: "public/images/brand/iso-9001.jpg" },
  { src: hd("66fb6f_f060c81813be4b60961fb70619d6ca17", "jpg", 600, 600), to: "public/images/brand/45-years.jpg" },

  // Hero (wide, larger crop)
  { src: hero("66fb6f_a0cc96988c114ca5975abef7d1106da0", "jpg"), to: "public/images/hero/main.jpg" },

  // Product family covers
  { src: hd("66fb6f_ccf57c9c50894c8292568782f6a93b18", "png", 1000), to: "public/images/products/ligas-de-bronze-aluminio.png" },
  { src: hd("66fb6f_0e5e85bb6d204ded95a558c92bdea199", "png", 1000), to: "public/images/products/ligas-de-bronze-aluminio-niquel.png" },
  { src: hd("66fb6f_e67c8f773e7444128180fbc17d25515f", "jpg", 1000), to: "public/images/products/ligas-bronze-aluminio-zinco.jpg" },
  { src: hd("66fb6f_bc6ed1db06c74330b8e15082428bdf0c", "png", 1000), to: "public/images/products/ligas-de-cobre-berilio.png" },
  { src: hd("66fb6f_9d4d9eb93d3c42b99336cfd7bb431b09", "jpg", 1000), to: "public/images/products/ligas-de-cobre-cromo-niquel-silicio.jpg" },
  { src: hd("66fb6f_2f41e8e4a823458c9a8297224afbc70b", "png", 1000), to: "public/images/products/ligas-de-cobre-cromo-zirconio.png" },
  { src: hd("66fb6f_8aaf330db036487eaa81035ba848054c", "jpg", 1000), to: "public/images/products/ligas-de-cobre-niquel-berilio.jpg" },
  { src: hd("66fb6f_bbd5977d793f409791cba5aeab16edba", "jpg", 1000), to: "public/images/products/ligas-de-molibdenio.jpg" },

  // Industries
  { src: hd("66fb6f_2a1f7af8df944bb2ae1412fb1d49db05", "jpg", 1200), to: "public/images/industries/aeroespacial.jpg" },
  { src: hd("66fb6f_a97ac93fee1c4206b9aee277c5beacfa", "jpg", 1200), to: "public/images/industries/siderurgia.jpg" },
  { src: hd("66fb6f_2865492e42734b2799d9146a8df3a283", "jpeg", 1200), to: "public/images/industries/offshore.jpg" },
  { src: hd("66fb6f_553b196887b048ad9580b1f29318b7d2", "jpg", 1200), to: "public/images/industries/manutencao.jpg" },
  { src: hd("66fb6f_42e80ef499f040f7b000edafa20f4ad8", "jpg", 1200), to: "public/images/industries/solda-por-resistencia.jpg" },
  { src: hd("66fb6f_b8496d09fa75430d949bca271572ede4", "jpg", 1200), to: "public/images/industries/industria-plastica.jpg" },
  { src: hd("66fb6f_9e5bb8e59c1949d6bbd730ae40f08c44", "jpg", 1200), to: "public/images/industries/conformacao.jpg" },
  { src: hd("66fb6f_d37bf7857e56458fa237c896eada6473", "jpeg", 1200), to: "public/images/industries/pistoes-injecao.jpg" },

  // Catalogs (3:4 portrait, high res)
  { src: hd("66fb6f_2e509b8f2490494da73cb11efa3fc5ec", "jpg", 1200, 1600), to: "public/images/catalogs/pistao.jpg" },
  { src: hd("66fb6f_8d4699fe32b7456bac468c6539076c2d", "jpg", 1200, 1600), to: "public/images/catalogs/plastico.jpg" },
  { src: hd("66fb6f_6df248f6e3354fdb9c0b37c6b47df16e", "jpg", 1200, 1600), to: "public/images/catalogs/solda.jpg" },
  { src: hd("66fb6f_e01fc79e434a40ad8c74c2653a2d53f1", "jpg", 1200, 1600), to: "public/images/catalogs/metais.jpg" },
  { src: hd("66fb6f_b95a0afb1f5f4021a4f3f2a3c6a4c23c", "jpg", 1200, 1600), to: "public/images/catalogs/manutencao.jpg" },
  { src: hd("66fb6f_b5efba8e2aad4f3da5d5759fd2fc1fc8", "jpg", 1200, 1600), to: "public/images/catalogs/geral.jpg" },
  { src: hd("66fb6f_f87982a59c204c8fac51d69777a8e707", "jpg", 1200, 1600), to: "public/images/catalogs/aco.jpg" },

  // Per-alloy hero images (from each alloy's live-site page)
  { src: hd("66fb6f_30cc635b8c0049dfa0246b0992771f90", "png", 1000), to: "public/images/alloys/bm-863.png" },
  { src: hd("66fb6f_a15dad29b91841bd8a021048b4b68443", "png", 1000), to: "public/images/alloys/bm-954.png" },
  { src: hd("66fb6f_3f6dc84782dd42ec8ebe4ed2bb89eb87", "png", 1000), to: "public/images/alloys/bm-300.png" },
  { src: hd("66fb6f_416953ce103f46799071977f379c482e", "png", 1000), to: "public/images/alloys/bm-959.png" },
  { src: hd("66fb6f_ffff56e20440400d847e423acd250fb2", "png", 1000), to: "public/images/alloys/bm-380.png" },
  { src: hd("66fb6f_9addd2306a98466883d8315a5bce0439", "png", 1000), to: "public/images/alloys/bm-340.png" },
  { src: hd("66fb6f_34a1cff54ee74505b15be5247c055bd0", "png", 1000), to: "public/images/alloys/bm-630.png" },
  { src: hd("66fb6f_26521c8b8e6b42c3868cb1b0ff795f99", "png", 1000), to: "public/images/alloys/bm-955.png" },
  { src: hd("66fb6f_39b6e2ee4e7a435bb05a6855df14d7c2", "png", 1000), to: "public/images/alloys/bm-280-ht.png" },
  { src: hd("66fb6f_6f9d545dc38f49218a8587289782bbc3", "png", 1000), to: "public/images/alloys/bm-172-ht.png" },
  { src: hd("66fb6f_613b71e3bda442d9a899fa433e60e6f7", "png", 1000), to: "public/images/alloys/bm-180.png" },
  { src: hd("66fb6f_2183d5a688494f549f34c66052c80454", "png", 1000), to: "public/images/alloys/bm-1815.png" },
  { src: hd("66fb6f_bce7e25108b64122bcb936909bf4b9b5", "jpg", 1000), to: "public/images/alloys/tzm.jpg" },

  // Format types (used on alloy pages) — tarugo image inaccessible from CDN; usinado + placa only
  { src: hd("66fb6f_7cc3e3abe2ed4854a094ad5beaeb6ca3", "jpg", 600, 600), to: "public/images/formats/usinado.jpg" },
  { src: hd("66fb6f_9e359b80ef9644f794cecb69b6984c4b", "png", 600, 600), to: "public/images/formats/placa.png" },
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

function stripTransform(src) {
  return src.replace(/\/v1\/(fit|fill|crop)\/[^/]+\/[^/]+$/, "");
}

async function download(src, to) {
  const out = resolve(process.cwd(), to);
  if (!FORCE && (await exists(out))) {
    return { src, to, skipped: true };
  }
  await mkdir(dirname(out), { recursive: true });
  let res = await fetch(src);
  if (!res.ok && (res.status === 400 || res.status === 403)) {
    // Some Wix originals reject transforms; retry without
    const bare = stripTransform(src);
    if (bare !== src) {
      res = await fetch(bare);
      if (res.ok) src = bare;
    }
  }
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
  const manifest = [];
  let ok = 0;
  let skip = 0;
  let fail = 0;
  for (const a of ASSETS) {
    try {
      const result = await download(a.src, a.to);
      manifest.push(result);
      if (result.skipped) {
        skip++;
        console.log(`skip  ${a.to}`);
      } else {
        ok++;
        console.log(`ok    ${a.to}`);
      }
    } catch (err) {
      fail++;
      console.error(`fail  ${a.to}  ${err.message}`);
    }
  }
  await writeFile(
    resolve(process.cwd(), "public/images/manifest.json"),
    JSON.stringify({ generatedAt: new Date().toISOString(), assets: manifest }, null, 2),
  );
  console.log(`\nDone: ${ok} downloaded, ${skip} skipped, ${fail} failed`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
