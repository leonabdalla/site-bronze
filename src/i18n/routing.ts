import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt", "en"],
  defaultLocale: "pt",
  localePrefix: { mode: "as-needed" },
  pathnames: {
    "/": "/",
    "/empresa": { pt: "/empresa", en: "/about" },
    "/produtos": { pt: "/produtos", en: "/products" },
    "/produtos/[slug]": {
      pt: "/produtos/[slug]",
      en: "/products/[slug]",
    },
    "/aplicacoes": { pt: "/aplicacoes", en: "/applications" },
    "/industrias": { pt: "/industrias", en: "/industries" },
    "/catalogos": { pt: "/catalogos", en: "/catalogs" },
    "/contato": { pt: "/contato", en: "/contact" },
    "/privacidade": { pt: "/privacidade", en: "/privacy" },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
