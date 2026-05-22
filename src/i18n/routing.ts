import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt", "en", "es", "zh"],
  defaultLocale: "pt",
  localePrefix: { mode: "as-needed" },
  pathnames: {
    "/": "/",
    "/empresa": { pt: "/empresa", en: "/about", es: "/empresa", zh: "/empresa" },
    "/produtos": { pt: "/produtos", en: "/products", es: "/productos", zh: "/produtos" },
    "/produtos/[slug]": {
      pt: "/produtos/[slug]",
      en: "/products/[slug]",
      es: "/productos/[slug]",
      zh: "/produtos/[slug]",
    },
    "/produtos/[slug]/[alloy]": {
      pt: "/produtos/[slug]/[alloy]",
      en: "/products/[slug]/[alloy]",
      es: "/productos/[slug]/[alloy]",
      zh: "/produtos/[slug]/[alloy]",
    },
    "/aplicacoes": { pt: "/aplicacoes", en: "/applications", es: "/aplicaciones", zh: "/aplicacoes" },
    "/industrias": { pt: "/industrias", en: "/industries", es: "/industrias", zh: "/industrias" },
    "/industrias/[slug]": {
      pt: "/industrias/[slug]",
      en: "/industries/[slug]",
      es: "/industrias/[slug]",
      zh: "/industrias/[slug]",
    },
    "/catalogos": { pt: "/catalogos", en: "/catalogs", es: "/catalogos", zh: "/catalogos" },
    "/contato": { pt: "/contato", en: "/contact", es: "/contacto", zh: "/contato" },
    "/privacidade": { pt: "/privacidade", en: "/privacy", es: "/privacidad", zh: "/privacidade" },
    "/qualidade": { pt: "/qualidade", en: "/qualidade", es: "/calidad", zh: "/qualidade" },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
