import type { Bilingual } from "./products";

export type Application = {
  slug: string;
  name: Bilingual;
  description: Bilingual;
  relatedFamilies: string[];
};

export const applications: Application[] = [
  {
    slug: "engrenagens-e-buchas",
    name: { pt: "Engrenagens e buchas", en: "Gears and bushings" },
    description: {
      pt: "Componentes de transmissão que combinam dureza e resistência ao desgaste.",
      en: "Transmission components combining hardness and wear resistance.",
    },
    relatedFamilies: ["ligas-de-bronze-aluminio", "ligas-de-bronze-aluminio-niquel"],
  },
  {
    slug: "moldes-injecao",
    name: { pt: "Moldes de injeção", en: "Injection molds" },
    description: {
      pt: "Insertos e cavidades para resfriamento eficiente do polímero.",
      en: "Inserts and cavities for efficient polymer cooling.",
    },
    relatedFamilies: [
      "ligas-de-cobre-berilio",
      "ligas-de-cobre-cromo-niquel-silicio",
      "ligas-de-cobre-cromo-zirconio",
    ],
  },
  {
    slug: "eletrodos-de-solda",
    name: { pt: "Eletrodos de solda", en: "Welding electrodes" },
    description: {
      pt: "Eletrodos de solda por resistência com vida útil prolongada.",
      en: "Resistance welding electrodes with extended service life.",
    },
    relatedFamilies: [
      "ligas-de-cobre-cromo-zirconio",
      "ligas-de-cobre-cromo-niquel-silicio",
    ],
  },
  {
    slug: "componentes-marinhos",
    name: { pt: "Componentes marinhos", en: "Marine components" },
    description: {
      pt: "Hélices, mancais e bombas em ambiente salino.",
      en: "Propellers, bearings, and pumps in saline environments.",
    },
    relatedFamilies: [
      "ligas-de-bronze-aluminio",
      "ligas-de-bronze-aluminio-niquel",
    ],
  },
  {
    slug: "conectores-eletricos",
    name: { pt: "Conectores elétricos", en: "Electrical connectors" },
    description: {
      pt: "Contatos e conectores que exigem alta condutividade e fadiga elevada.",
      en: "Contacts and connectors requiring high conductivity and fatigue life.",
    },
    relatedFamilies: ["ligas-de-cobre-berilio", "ligas-de-cobre-niquel-berilio"],
  },
  {
    slug: "componentes-alta-temperatura",
    name: { pt: "Componentes de alta temperatura", en: "High-temperature components" },
    description: {
      pt: "Peças para fornos, aeroespacial e geração térmica acima de 1.000 °C.",
      en: "Parts for furnaces, aerospace, and thermal generation above 1,000 °C.",
    },
    relatedFamilies: ["ligas-de-molibdenio"],
  },
];
