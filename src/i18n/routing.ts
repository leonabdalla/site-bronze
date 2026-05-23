import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt", "en", "es"],
  defaultLocale: "pt",
  localePrefix: { mode: "as-needed" },
  pathnames: {
    "/": "/",
    "/empresa": { pt: "/empresa", en: "/about", es: "/empresa" },
    "/produtos": { pt: "/produtos", en: "/products", es: "/productos" },
    "/produtos/[slug]": {
      pt: "/produtos/[slug]",
      en: "/products/[slug]",
      es: "/productos/[slug]",
    },
    "/produtos/[slug]/[alloy]": {
      pt: "/produtos/[slug]/[alloy]",
      en: "/products/[slug]/[alloy]",
      es: "/productos/[slug]/[alloy]",
    },
    "/aplicacoes": { pt: "/aplicacoes", en: "/applications", es: "/aplicaciones" },
    "/industrias": { pt: "/industrias", en: "/industries", es: "/industrias" },
    "/industrias/[slug]": {
      pt: "/industrias/[slug]",
      en: "/industries/[slug]",
      es: "/industrias/[slug]",
    },
    "/catalogos": { pt: "/catalogos", en: "/catalogs", es: "/catalogos" },
    "/contato": { pt: "/contato", en: "/contact", es: "/contacto" },
    "/privacidade": { pt: "/privacidade", en: "/privacy", es: "/privacidad" },
    "/qualidade": { pt: "/qualidade", en: "/qualidade", es: "/calidad" },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
