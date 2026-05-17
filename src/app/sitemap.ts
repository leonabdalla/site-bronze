import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { productFamilies } from "@/data/products";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://site-bronze.vercel.app";

const staticPaths: Record<"pt" | "en", string[]> = {
  pt: ["", "/empresa", "/produtos", "/aplicacoes", "/industrias", "/catalogos", "/contato", "/privacidade"],
  en: ["/en", "/en/about", "/en/products", "/en/applications", "/en/industries", "/en/catalogs", "/en/contact", "/en/privacy"],
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of staticPaths[locale]) {
      entries.push({
        url: `${BASE_URL}${path}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: path === "" || path === "/en" ? 1 : 0.7,
      });
    }
  }

  for (const family of productFamilies) {
    entries.push({
      url: `${BASE_URL}/produtos/${family.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
    entries.push({
      url: `${BASE_URL}/en/products/${family.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  return entries;
}
