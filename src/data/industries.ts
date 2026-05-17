import type { Bilingual } from "./products";

export type Industry = {
  slug: string;
  name: Bilingual;
  summary: Bilingual;
  image: string;
};

export const industries: Industry[] = [
  {
    slug: "aeroespacial",
    name: { pt: "Aeroespacial", en: "Aerospace" },
    summary: {
      pt: "Componentes que operam sob ciclos térmicos e mecânicos severos.",
      en: "Components operating under severe thermal and mechanical cycles.",
    },
    image: "/images/industries/aeroespacial.jpg",
  },
  {
    slug: "offshore",
    name: { pt: "Offshore", en: "Offshore" },
    summary: {
      pt: "Resistência à corrosão marinha em campos de petróleo e gás.",
      en: "Marine corrosion resistance in oil and gas fields.",
    },
    image: "/images/industries/offshore.jpg",
  },
  {
    slug: "injecao-plastica",
    name: { pt: "Injeção plástica", en: "Plastic injection" },
    summary: {
      pt: "Moldes com alta troca térmica e vida útil prolongada.",
      en: "Molds with high heat exchange and extended service life.",
    },
    image: "/images/industries/injecao-plastica.jpg",
  },
  {
    slug: "defesa",
    name: { pt: "Defesa", en: "Defense" },
    summary: {
      pt: "Peças críticas com requisitos rigorosos de rastreabilidade.",
      en: "Critical parts with strict traceability requirements.",
    },
    image: "/images/industries/defesa.jpg",
  },
  {
    slug: "moldes",
    name: { pt: "Moldes e ferramentaria", en: "Tooling & molds" },
    summary: {
      pt: "Insertos, cavidades e eletrodos em ligas de alto desempenho.",
      en: "Inserts, cavities, and electrodes in high-performance alloys.",
    },
    image: "/images/industries/moldes.jpg",
  },
  {
    slug: "naval",
    name: { pt: "Naval", en: "Naval" },
    summary: {
      pt: "Hélices, eixos e mancais expostos a água salgada.",
      en: "Propellers, shafts, and bearings exposed to saltwater.",
    },
    image: "/images/industries/naval.jpg",
  },
  {
    slug: "energia",
    name: { pt: "Energia", en: "Energy" },
    summary: {
      pt: "Aplicações em geração térmica, hidrelétrica e nuclear.",
      en: "Applications in thermal, hydroelectric, and nuclear generation.",
    },
    image: "/images/industries/energia.jpg",
  },
  {
    slug: "automotiva",
    name: { pt: "Automotiva", en: "Automotive" },
    summary: {
      pt: "Buchas, mancais e contatos elétricos em sistemas críticos.",
      en: "Bushings, bearings, and electrical contacts in critical systems.",
    },
    image: "/images/industries/automotiva.jpg",
  },
];
