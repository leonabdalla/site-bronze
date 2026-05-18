import type { Bilingual } from "./products";

export type Catalog = {
  slug: string;
  name: Bilingual;
  description: Bilingual;
  cover: string;
  pdf: string;
};

export const catalogs: Catalog[] = [
  {
    slug: "pistao",
    name: { pt: "Pistão", en: "Piston" },
    description: {
      pt: "Ligas para pistões e componentes de motor.",
      en: "Alloys for pistons and engine components.",
    },
    cover: "/images/catalogs/pistao.jpg",
    pdf: "/catalogs/pistao.pdf",
  },
  {
    slug: "plastico",
    name: { pt: "Plástico", en: "Plastic" },
    description: {
      pt: "Ligas para moldes e ferramental de injeção plástica.",
      en: "Alloys for plastic injection molds and tooling.",
    },
    cover: "/images/catalogs/plastico.jpg",
    pdf: "/catalogs/plastico.pdf",
  },
  {
    slug: "solda",
    name: { pt: "Solda", en: "Welding" },
    description: {
      pt: "Ligas para eletrodos e equipamentos de solda.",
      en: "Alloys for welding electrodes and equipment.",
    },
    cover: "/images/catalogs/solda.jpg",
    pdf: "/catalogs/solda.pdf",
  },
  {
    slug: "metais",
    name: { pt: "Metais", en: "Metals" },
    description: {
      pt: "Visão geral das ligas Bronze Metal.",
      en: "Overview of Bronze Metal alloys.",
    },
    cover: "/images/catalogs/metais.jpg",
    pdf: "/catalogs/metais.pdf",
  },
  {
    slug: "manutencao",
    name: { pt: "Manutenção", en: "Maintenance" },
    description: {
      pt: "Ligas para manutenção industrial e reposição.",
      en: "Alloys for industrial maintenance and replacement parts.",
    },
    cover: "/images/catalogs/manutencao.jpg",
    pdf: "/catalogs/manutencao.pdf",
  },
  {
    slug: "geral",
    name: { pt: "Geral", en: "General" },
    description: {
      pt: "Catálogo geral com toda a linha.",
      en: "General catalog covering the full line.",
    },
    cover: "/images/catalogs/geral.jpg",
    pdf: "/catalogs/geral.pdf",
  },
  {
    slug: "aco",
    name: { pt: "Aço", en: "Steel" },
    description: {
      pt: "Ligas complementares para uso em conjunto com aços especiais.",
      en: "Complementary alloys for use alongside special steels.",
    },
    cover: "/images/catalogs/aco.jpg",
    pdf: "/catalogs/aco.pdf",
  },
];
