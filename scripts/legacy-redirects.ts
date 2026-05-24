/**
 * Legacy URL redirects (Wix-era and old flat alloy URLs).
 *
 * Keys are the source paths (without trailing slash).
 * Values are the target paths (with trailing slash, host-relative,
 *   excluding any basePath — the post-build script prepends it).
 *
 * Previously lived in public/_redirects when hosted on Cloudflare.
 */
export const legacyRedirects: Record<string, string> = {
  // Legacy Wix top-level (PT)
  "/produtos-bronze-metal": "/produtos/",
  "/catalogo-bronze-metal": "/catalogos/",
  "/contato-bronze-metal": "/contato/",
  "/aplicações-bronze-alumínio": "/aplicacoes/",
  "/industrias-e-mercado-bronze-alumínio": "/industrias/",
  "/prolitica-de-privacidade": "/privacidade/",

  // Legacy Wix EN
  "/home-en": "/en/",
  "/home-en/company": "/en/about/",
  "/home-en/products": "/en/products/",
  "/home-en/applications": "/en/applications/",
  "/home-en/industries": "/en/industries/",
  "/home-en/catalogs": "/en/catalogs/",
  "/home-en/access-bronze-metal-catalogs": "/en/catalogs/",
  "/home-en/contact": "/en/contact/",
  "/home-en/aluminum-bronze-alloys": "/en/products/ligas-de-bronze-aluminio/",
  "/home-en/nickel-aluminum-bronze-alloys": "/en/products/ligas-de-bronze-aluminio-niquel/",
  "/home-en/aluminum-zinc-bronze-alloys": "/en/products/ligas-bronze-aluminio-zinco/",
  "/home-en/beryllium-copper-alloys": "/en/products/ligas-de-cobre-berilio/",
  "/home-en/copper-chromium-nickel-silicon-alloys": "/en/products/ligas-de-cobre-cromo-niquel-silicio/",
  "/home-en/copper-chromium-zirconium-alloys": "/en/products/ligas-de-cobre-cromo-zirconio/",
  "/home-en/copper-nickel-beryllium-alloys": "/en/products/ligas-de-cobre-niquel-berilio/",
  "/home-en/molybdenum-alloys-tzm-en": "/en/products/ligas-de-molibdenio/",

  // Legacy flat alloy URLs
  "/bm-863-sae430b-c86300": "/produtos/ligas-de-bronze-aluminio/bm-863-sae430b-c86300/",
  "/bm-954-c95400-astmb505-b271": "/produtos/ligas-de-bronze-aluminio/bm-954-c95400-astmb505-b271/",
  "/bm-300-c95900-astmb505": "/produtos/ligas-de-bronze-aluminio/bm-300-c95900-astmb505/",
  "/bm-959-c95900-astmb505": "/produtos/ligas-de-bronze-aluminio/bm-959-c95900-astmb505/",
  "/bm-380-ligasespeciais-de-alta-dureza": "/produtos/ligas-de-bronze-aluminio/bm-380-ligasespeciais-de-alta-dureza/",
  "/bm-340-ligas-especiais-de-alta-dureza": "/produtos/ligas-de-bronze-aluminio/bm-340-ligas-especiais-de-alta-dureza/",
  "/bm-955-c95500-astmb-150-mas-4640": "/produtos/ligas-de-bronze-aluminio-niquel/bm-955-c95500-astmb-150-mas-4640/",
  "/bm-630-c63000-astmb-505-mas-4880": "/produtos/ligas-de-bronze-aluminio-niquel/bm-630-c63000-astmb-505-mas-4880/",
  "/bm-280-ht-am-s4590-4881": "/produtos/ligas-de-bronze-aluminio-niquel/bm-280-ht-am-s4590-4881/",
  "/bm-172-ht-c17200": "/produtos/ligas-de-cobre-berilio/bm-172-ht-c17200/",
  "/bm-180-c18000": "/produtos/ligas-de-cobre-cromo-niquel-silicio/bm-180-c18000/",
  "/bm-1815-c18150": "/produtos/ligas-de-cobre-cromo-zirconio/bm-1815-c18150/",
  "/bm-1751-c17510": "/produtos/ligas-de-cobre-niquel-berilio/bm-1751-c17510/",
  "/tzm-astmb387": "/produtos/ligas-de-molibdenio/tzm-astmb387/",
};
