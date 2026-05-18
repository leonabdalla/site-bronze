#!/usr/bin/env node
/**
 * Mirror real product/industry/brand images from the live Wix CDN into
 * public/images/. Run once: `npm run assets:fetch`. Re-runnable; pass
 * --force to refetch existing files.
 *
 * Assumes the operator has rights to use the company's existing imagery
 * (this rebuild is being made for/with the company).
 */

import { createWriteStream } from "node:fs";
import { mkdir, stat, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { createHash } from "node:crypto";
import { Readable } from "node:stream";

const WIX = "https://static.wixstatic.com/media";

const ASSETS = [
  // Brand
  { src: `${WIX}/66fb6f_492d226bde6e4e409d3afafd9ac11ce4~mv2.jpg`, to: "public/images/brand/logo.jpg" },
  { src: `${WIX}/66fb6f_10ff0d054d4d40f09f34cf1d99f340f2~mv2.jpg`, to: "public/images/brand/iso-9001.jpg" },
  { src: `${WIX}/66fb6f_f060c81813be4b60961fb70619d6ca17~mv2.jpg`, to: "public/images/brand/45-years.jpg" },

  // Hero
  { src: `${WIX}/66fb6f_a0cc96988c114ca5975abef7d1106da0~mv2.jpg`, to: "public/images/hero/main.jpg" },

  // Product families (8) — matched by alt text on the live homepage
  { src: `${WIX}/66fb6f_ccf57c9c50894c8292568782f6a93b18~mv2.png`, to: "public/images/products/ligas-de-bronze-aluminio.png" },
  { src: `${WIX}/66fb6f_0e5e85bb6d204ded95a558c92bdea199~mv2.png`, to: "public/images/products/ligas-de-bronze-aluminio-niquel.png" },
  { src: `${WIX}/66fb6f_e67c8f773e7444128180fbc17d25515f~mv2.jpg`, to: "public/images/products/ligas-bronze-aluminio-zinco.jpg" },
  { src: `${WIX}/66fb6f_bc6ed1db06c74330b8e15082428bdf0c~mv2.png`, to: "public/images/products/ligas-de-cobre-berilio.png" },
  { src: `${WIX}/66fb6f_9d4d9eb93d3c42b99336cfd7bb431b09~mv2.jpg`, to: "public/images/products/ligas-de-cobre-cromo-niquel-silicio.jpg" },
  { src: `${WIX}/66fb6f_2f41e8e4a823458c9a8297224afbc70b~mv2.png`, to: "public/images/products/ligas-de-cobre-cromo-zirconio.png" },
  { src: `${WIX}/66fb6f_8aaf330db036487eaa81035ba848054c~mv2.jpg`, to: "public/images/products/ligas-de-cobre-niquel-berilio.jpg" },
  { src: `${WIX}/66fb6f_bbd5977d793f409791cba5aeab16edba~mv2.jpg`, to: "public/images/products/ligas-de-molibdenio.jpg" },

  // Industries (8) — matched to live site sectors
  { src: `${WIX}/66fb6f_2a1f7af8df944bb2ae1412fb1d49db05~mv2.jpg`, to: "public/images/industries/aeroespacial.jpg" },
  { src: `${WIX}/66fb6f_a97ac93fee1c4206b9aee277c5beacfa~mv2.jpg`, to: "public/images/industries/siderurgia.jpg" },
  { src: `${WIX}/66fb6f_2865492e42734b2799d9146a8df3a283~mv2.jpeg`, to: "public/images/industries/offshore.jpg" },
  { src: `${WIX}/66fb6f_553b196887b048ad9580b1f29318b7d2~mv2.jpg`, to: "public/images/industries/manutencao.jpg" },
  { src: `${WIX}/66fb6f_42e80ef499f040f7b000edafa20f4ad8~mv2.jpg`, to: "public/images/industries/solda-por-resistencia.jpg" },
  { src: `${WIX}/66fb6f_b8496d09fa75430d949bca271572ede4~mv2.jpg`, to: "public/images/industries/industria-plastica.jpg" },
  { src: `${WIX}/66fb6f_9e5bb8e59c1949d6bbd730ae40f08c44~mv2.jpg`, to: "public/images/industries/conformacao.jpg" },
  { src: `${WIX}/66fb6f_d37bf7857e56458fa237c896eada6473~mv2.jpeg`, to: "public/images/industries/pistoes-injecao.jpg" },

  // Catalogs (7)
  { src: `${WIX}/66fb6f_2e509b8f2490494da73cb11efa3fc5ec~mv2.jpg`, to: "public/images/catalogs/pistao.jpg" },
  { src: `${WIX}/66fb6f_8d4699fe32b7456bac468c6539076c2d~mv2.jpg`, to: "public/images/catalogs/plastico.jpg" },
  { src: `${WIX}/66fb6f_6df248f6e3354fdb9c0b37c6b47df16e~mv2.jpg`, to: "public/images/catalogs/solda.jpg" },
  { src: `${WIX}/66fb6f_e01fc79e434a40ad8c74c2653a2d53f1~mv2.jpg`, to: "public/images/catalogs/metais.jpg" },
  { src: `${WIX}/66fb6f_b95a0afb1f5f4021a4f3f2a3c6a4c23c~mv2.jpg`, to: "public/images/catalogs/manutencao.jpg" },
  { src: `${WIX}/66fb6f_b5efba8e2aad4f3da5d5759fd2fc1fc8~mv2.jpg`, to: "public/images/catalogs/geral.jpg" },
  { src: `${WIX}/66fb6f_f87982a59c204c8fac51d69777a8e707~mv2.jpg`, to: "public/images/catalogs/aco.jpg" },
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
    console.log("No assets configured.");
    return;
  }
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
