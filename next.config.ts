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
      { source: "/home-en/contact", destination: "/en/contact", permanent: true },
      { source: "/home-en/aluminum-bronze-alloys", destination: "/en/products/ligas-de-bronze-aluminio", permanent: true },
      { source: "/home-en/nickel-aluminum-bronze-alloys", destination: "/en/products/ligas-de-bronze-aluminio-niquel", permanent: true },
      { source: "/home-en/aluminum-zinc-bronze-alloys", destination: "/en/products/ligas-bronze-aluminio-zinco", permanent: true },
      { source: "/home-en/beryllium-copper-alloys", destination: "/en/products/ligas-de-cobre-berilio", permanent: true },
      { source: "/home-en/copper-chromium-nickel-silicon-alloys", destination: "/en/products/ligas-de-cobre-cromo-niquel-silicio", permanent: true },
      { source: "/home-en/copper-chromium-zirconium-alloys", destination: "/en/products/ligas-de-cobre-cromo-zirconio", permanent: true },
      { source: "/home-en/copper-nickel-beryllium-alloys", destination: "/en/products/ligas-de-cobre-niquel-berilio", permanent: true },
      { source: "/home-en/molybdenum-alloys-tzm-en", destination: "/en/products/ligas-de-molibdenio", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
