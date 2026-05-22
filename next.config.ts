import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "static.wixstatic.com" }],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async redirects() {
    return [
      { source: "/produtos-bronze-metal", destination: "/produtos", permanent: true },
      { source: "/catalogo-bronze-metal", destination: "/catalogos", permanent: true },
      { source: "/contato-bronze-metal", destination: "/contato", permanent: true },
      { source: "/aplicações-bronze-alumínio", destination: "/aplicacoes", permanent: true },
      { source: "/industrias-e-mercado-bronze-alumínio", destination: "/industrias", permanent: true },
      { source: "/prolitica-de-privacidade", destination: "/privacidade", permanent: true },
      { source: "/home-en", destination: "/en", permanent: true },
      { source: "/home-en/company", destination: "/en/about", permanent: true },
      { source: "/home-en/products", destination: "/en/products", permanent: true },
      { source: "/home-en/applications", destination: "/en/applications", permanent: true },
      { source: "/home-en/industries", destination: "/en/industries", permanent: true },
      { source: "/home-en/catalogs", destination: "/en/catalogs", permanent: true },
      { source: "/home-en/access-bronze-metal-catalogs", destination: "/en/catalogs", permanent: true },
      { source: "/home-en/contact", destination: "/en/contact", permanent: true },
      { source: "/home-en/aluminum-bronze-alloys", destination: "/en/products/ligas-de-bronze-aluminio", permanent: true },
      { source: "/home-en/nickel-aluminum-bronze-alloys", destination: "/en/products/ligas-de-bronze-aluminio-niquel", permanent: true },
      { source: "/home-en/aluminum-zinc-bronze-alloys", destination: "/en/products/ligas-bronze-aluminio-zinco", permanent: true },
      { source: "/home-en/beryllium-copper-alloys", destination: "/en/products/ligas-de-cobre-berilio", permanent: true },
      { source: "/home-en/copper-chromium-nickel-silicon-alloys", destination: "/en/products/ligas-de-cobre-cromo-niquel-silicio", permanent: true },
      { source: "/home-en/copper-chromium-zirconium-alloys", destination: "/en/products/ligas-de-cobre-cromo-zirconio", permanent: true },
      { source: "/home-en/copper-nickel-beryllium-alloys", destination: "/en/products/ligas-de-cobre-niquel-berilio", permanent: true },
      { source: "/home-en/molybdenum-alloys-tzm-en", destination: "/en/products/ligas-de-molibdenio", permanent: true },

      // Legacy alloy URLs (flat) → new nested structure
      { source: "/bm-863-sae430b-c86300", destination: "/produtos/ligas-de-bronze-aluminio/bm-863-sae430b-c86300", permanent: true },
      { source: "/bm-954-c95400-astmb505-b271", destination: "/produtos/ligas-de-bronze-aluminio/bm-954-c95400-astmb505-b271", permanent: true },
      { source: "/bm-300-c95900-astmb505", destination: "/produtos/ligas-de-bronze-aluminio/bm-300-c95900-astmb505", permanent: true },
      { source: "/bm-959-c95900-astmb505", destination: "/produtos/ligas-de-bronze-aluminio/bm-959-c95900-astmb505", permanent: true },
      { source: "/bm-380-ligasespeciais-de-alta-dureza", destination: "/produtos/ligas-de-bronze-aluminio/bm-380-ligasespeciais-de-alta-dureza", permanent: true },
      { source: "/bm-340-ligas-especiais-de-alta-dureza", destination: "/produtos/ligas-de-bronze-aluminio/bm-340-ligas-especiais-de-alta-dureza", permanent: true },
      { source: "/bm-955-c95500-astmb-150-mas-4640", destination: "/produtos/ligas-de-bronze-aluminio-niquel/bm-955-c95500-astmb-150-mas-4640", permanent: true },
      { source: "/bm-630-c63000-astmb-505-mas-4880", destination: "/produtos/ligas-de-bronze-aluminio-niquel/bm-630-c63000-astmb-505-mas-4880", permanent: true },
      { source: "/bm-280-ht-am-s4590-4881", destination: "/produtos/ligas-de-bronze-aluminio-niquel/bm-280-ht-am-s4590-4881", permanent: true },
      { source: "/bm-172-ht-c17200", destination: "/produtos/ligas-de-cobre-berilio/bm-172-ht-c17200", permanent: true },
      { source: "/bm-180-c18000", destination: "/produtos/ligas-de-cobre-cromo-niquel-silicio/bm-180-c18000", permanent: true },
      { source: "/bm-1815-c18150", destination: "/produtos/ligas-de-cobre-cromo-zirconio/bm-1815-c18150", permanent: true },
      { source: "/bm-1751-c17510", destination: "/produtos/ligas-de-cobre-niquel-berilio/bm-1751-c17510", permanent: true },
      { source: "/tzm-astmb387", destination: "/produtos/ligas-de-molibdenio/tzm-astmb387", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
