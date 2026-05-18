import type { Bilingual } from "./products";

export type Application = {
  slug: string;
  name: Bilingual;
  description: Bilingual;
  image: string;
  relatedFamilies: string[];
};

export const applications: Application[] = [
  {
    slug: "engrenagens-e-buchas",
    name: { pt: "Engrenagens e buchas", en: "Gears and bushings" },
    description: {
      pt: "Componentes de transmissão que combinam dureza e resistência ao desgaste. Engrenagens helicoidais, parafusos sem-fim e buchas de alta carga atendem indústrias siderúrgica, naval e de equipamentos pesados.",
      en: "Transmission components combining hardness and wear resistance. Helical gears, worm screws, and heavy-load bushings serve steel, marine, and heavy-equipment industries.",
    },
    image: "/images/industries/conformacao.jpg",
    relatedFamilies: [
      "ligas-de-bronze-aluminio",
      "ligas-de-bronze-aluminio-niquel",
    ],
  },
  {
    slug: "moldes-injecao",
    name: { pt: "Moldes de injeção", en: "Injection molds" },
    description: {
      pt: "Insertos e cavidades de molde com alta condutividade térmica resfriam o polímero mais rapidamente, encurtando o ciclo e estendendo a vida útil do ferramental.",
      en: "Mold inserts and cavities with high thermal conductivity cool the polymer faster, shortening cycle time and extending tooling life.",
    },
    image: "/images/industries/industria-plastica.jpg",
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
      pt: "Eletrodos de solda por resistência com longa vida útil, combinando condutividade elétrica elevada e resistência à compressão para linhas de alta cadência.",
      en: "Long-life resistance welding electrodes combining high electrical conductivity and compressive strength for high-cycle lines.",
    },
    image: "/images/industries/solda-por-resistencia.jpg",
    relatedFamilies: [
      "ligas-de-cobre-cromo-zirconio",
      "ligas-de-cobre-cromo-niquel-silicio",
    ],
  },
  {
    slug: "componentes-marinhos",
    name: { pt: "Componentes marinhos e offshore", en: "Marine & offshore components" },
    description: {
      pt: "Hélices, mancais, bombas, sedes de válvula e buchas que enfrentam corrosão por água salgada e cavitação em plataformas e embarcações.",
      en: "Propellers, bearings, pumps, valve seats, and bushings that face saltwater corrosion and cavitation on platforms and vessels.",
    },
    image: "/images/industries/offshore.jpg",
    relatedFamilies: [
      "ligas-de-bronze-aluminio",
      "ligas-de-bronze-aluminio-niquel",
    ],
  },
  {
    slug: "conectores-eletricos",
    name: { pt: "Conectores elétricos e contatos", en: "Electrical connectors & contacts" },
    description: {
      pt: "Contatos e conectores que exigem alta condutividade combinada com resistência mecânica e à fadiga, especialmente em conectores aeroespaciais e de defesa.",
      en: "Contacts and connectors that require high conductivity combined with mechanical and fatigue strength, especially in aerospace and defense connectors.",
    },
    image: "/images/industries/aeroespacial.jpg",
    relatedFamilies: ["ligas-de-cobre-berilio", "ligas-de-cobre-niquel-berilio"],
  },
  {
    slug: "componentes-alta-temperatura",
    name: { pt: "Componentes de alta temperatura", en: "High-temperature components" },
    description: {
      pt: "Peças para fornos, aeroespacial e geração térmica que operam acima de 1.000 °C, exigindo baixa expansão térmica e alta rigidez.",
      en: "Parts for furnaces, aerospace, and thermal generation operating above 1,000 °C, requiring low thermal expansion and high stiffness.",
    },
    image: "/images/industries/siderurgia.jpg",
    relatedFamilies: ["ligas-de-molibdenio"],
  },
];
