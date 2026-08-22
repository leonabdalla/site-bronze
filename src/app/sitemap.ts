import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { productFamilies } from "@/data/products";
import { industries } from "@/data/industries";

export const dynamic = "force-static";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bronzemetal.com.br";

const staticPaths: Record<(typeof routing.locales)[number], string[]> = {
  pt: ["", "/empresa", "/produtos", "/aplicacoes", "/industrias", "/catalogos", "/contato", "/privacidade", "/qualidade"],
  en: ["/en", "/en/about", "/en/products", "/en/applications", "/en/industries", "/en/catalogs", "/en/contact", "/en/privacy", "/en/qualidade"],
  es: ["/es", "/es/empresa", "/es/productos", "/es/aplicaciones", "/es/industrias", "/es/catalogos", "/es/contacto", "/es/privacidad", "/es/calidad"],
};

const prodPathPrefix: Record<(typeof routing.locales)[number], string> = {
  pt: "/produtos",
  en: "/en/products",
  es: "/es/productos",
};

const indPathPrefix: Record<(typeof routing.locales)[number], string> = {
  pt: "/industrias",
  en: "/en/industries",
  es: "/es/industrias",
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
        priority: path === "" || /^\/[a-z]{2}$/.test(path) ? 1 : 0.7,
      });
    }
  }

  for (const family of productFamilies) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${BASE_URL}${prodPathPrefix[locale]}/${family.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
      });
      for (const alloy of family.alloys) {
        entries.push({
          url: `${BASE_URL}${prodPathPrefix[locale]}/${family.slug}/${alloy.slug}`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.75,
        });
      }
    }
  }

  for (const industry of industries) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${BASE_URL}${indPathPrefix[locale]}/${industry.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
