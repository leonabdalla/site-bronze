import type { Bilingual } from "./products";

export type Industry = {
  slug: string;
  name: Bilingual;
  summary: Bilingual;
  image: string;
  relatedFamilies: string[];
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
    relatedFamilies: [
      "ligas-de-bronze-aluminio-niquel",
      "ligas-de-cobre-berilio",
      "ligas-de-molibdenio",
    ],
  },
  {
    slug: "siderurgia",
    name: { pt: "Siderurgia", en: "Steel industry" },
    summary: {
      pt: "Componentes para linhas de produção siderúrgica em alta temperatura.",
      en: "Components for steel production lines at high temperature.",
    },
    image: "/images/industries/siderurgia.jpg",
    relatedFamilies: ["ligas-de-bronze-aluminio", "ligas-de-molibdenio"],
  },
  {
    slug: "offshore",
    name: { pt: "Offshore", en: "Offshore" },
    summary: {
      pt: "Resistência à corrosão marinha em campos de petróleo e gás.",
      en: "Marine corrosion resistance in oil and gas fields.",
    },
    image: "/images/industries/offshore.jpg",
    relatedFamilies: [
      "ligas-de-bronze-aluminio-niquel",
      "ligas-de-cobre-berilio",
    ],
  },
  {
    slug: "manutencao",
    name: { pt: "Manutenção", en: "Maintenance" },
    summary: {
      pt: "Reposição e manutenção industrial de equipamentos rotativos.",
      en: "Industrial maintenance and replacement of rotating equipment.",
    },
    image: "/images/industries/manutencao.jpg",
    relatedFamilies: [
      "ligas-de-bronze-aluminio",
      "ligas-bronze-aluminio-zinco",
    ],
  },
  {
    slug: "solda-por-resistencia",
    name: { pt: "Solda por resistência", en: "Resistance welding" },
    summary: {
      pt: "Eletrodos e ferramentas para solda por resistência de alta cadência.",
      en: "Electrodes and tooling for high-cycle resistance welding.",
    },
    image: "/images/industries/solda-por-resistencia.jpg",
    relatedFamilies: [
      "ligas-de-cobre-cromo-zirconio",
      "ligas-de-cobre-cromo-niquel-silicio",
      "ligas-de-cobre-niquel-berilio",
    ],
  },
  {
    slug: "industria-plastica",
    name: { pt: "Indústria plástica", en: "Plastic industry" },
    summary: {
      pt: "Moldes e insertos com alta condutividade térmica.",
      en: "Molds and inserts with high thermal conductivity.",
    },
    image: "/images/industries/industria-plastica.jpg",
    relatedFamilies: [
      "ligas-de-cobre-berilio",
      "ligas-de-cobre-cromo-niquel-silicio",
      "ligas-de-cobre-niquel-berilio",
    ],
  },
  {
    slug: "conformacao",
    name: { pt: "Dobra e conformação de tubos", en: "Tube bending & forming" },
    summary: {
      pt: "Ferramental para dobra, expansão e conformação de tubos metálicos.",
      en: "Tooling for bending, expansion, and forming of metal tubing.",
    },
    image: "/images/industries/conformacao.jpg",
    relatedFamilies: [
      "ligas-de-bronze-aluminio",
      "ligas-de-bronze-aluminio-niquel",
    ],
  },
  {
    slug: "pistoes-injecao",
    name: { pt: "Pistões e injeção", en: "Pistons & injection" },
    summary: {
      pt: "Componentes para máquinas de fundição e injeção sob pressão.",
      en: "Components for die casting and pressure injection machines.",
    },
    image: "/images/industries/pistoes-injecao.jpg",
    relatedFamilies: [
      "ligas-de-cobre-berilio",
      "ligas-de-cobre-cromo-niquel-silicio",
      "ligas-de-bronze-aluminio-niquel",
    ],
  },
];

export const industryBySlug = new Map(
  industries.map((i) => [i.slug, i] as const),
);
