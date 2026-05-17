export type Bilingual = { pt: string; en: string };
export type BilingualList = { pt: string[]; en: string[] };

export type AlloyProperties = {
  tensileMpa?: number;
  hardness?: string;
  thermalConductivityWmK?: number;
  meltingC?: [number, number];
};

export type Alloy = {
  code: string;
  uns?: string;
  sae?: string;
  astm?: string[];
  ams?: string[];
  description: Bilingual;
  properties?: AlloyProperties;
};

export type ProductFamily = {
  slug: string;
  name: Bilingual;
  summary: Bilingual;
  longDescription: Bilingual;
  image: string;
  alloys: Alloy[];
  applications: BilingualList;
};

export const productFamilies: ProductFamily[] = [
  {
    slug: "ligas-de-bronze-aluminio",
    name: {
      pt: "Ligas de bronze-alumínio",
      en: "Aluminum bronze alloys",
    },
    summary: {
      pt: "Alta resistência mecânica e ótima resposta à abrasão em meios marinhos e ácidos.",
      en: "High mechanical strength and strong abrasion response in marine and acidic environments.",
    },
    longDescription: {
      pt: "Família que combina alumínio com cobre para entregar tenacidade, dureza e resistência à corrosão. Indicada para componentes que trabalham sob carga, fricção e ambientes agressivos.",
      en: "A family combining aluminum with copper to deliver toughness, hardness, and corrosion resistance. Recommended for components working under load, friction, and aggressive environments.",
    },
    image: "/images/products/ligas-de-bronze-aluminio.jpg",
    alloys: [
      {
        code: "BM 863",
        uns: "C86300",
        sae: "SAE 430B",
        astm: ["ASTM B505"],
        description: {
          pt: "Manganês-bronze de alta resistência para engrenagens, parafusos sem-fim e buchas de alta carga.",
          en: "High-strength manganese bronze for gears, worm screws, and heavy-load bushings.",
        },
        properties: { tensileMpa: 820, hardness: "225 HB" },
      },
      {
        code: "BM 954",
        uns: "C95400",
        astm: ["ASTM B148"],
        description: {
          pt: "Bronze-alumínio com excelente equilíbrio entre dureza e usinabilidade para peças estruturais.",
          en: "Aluminum bronze with excellent balance between hardness and machinability for structural parts.",
        },
        properties: { tensileMpa: 620, hardness: "170 HB" },
      },
      {
        code: "BM 300",
        description: {
          pt: "Liga balanceada para buchas e mancais sob carga moderada.",
          en: "Balanced alloy for bushings and bearings under moderate load.",
        },
      },
      {
        code: "BM 959",
        description: {
          pt: "Variação com maior dureza para aplicações de elevada abrasão.",
          en: "Higher-hardness variant for severe abrasion service.",
        },
      },
      {
        code: "BM 340",
        description: {
          pt: "Liga de boa usinabilidade para componentes hidráulicos.",
          en: "Free-machining alloy for hydraulic components.",
        },
      },
      {
        code: "BM 380",
        description: {
          pt: "Indicada para guias, suportes e peças de transmissão.",
          en: "Suited for guides, supports, and transmission parts.",
        },
      },
    ],
    applications: {
      pt: [
        "Engrenagens e parafusos sem-fim",
        "Buchas e mancais de carga",
        "Componentes navais e offshore",
        "Bombas e válvulas",
      ],
      en: [
        "Gears and worm screws",
        "Load bushings and bearings",
        "Naval and offshore components",
        "Pumps and valves",
      ],
    },
  },
  {
    slug: "ligas-de-bronze-aluminio-niquel",
    name: {
      pt: "Ligas de bronze-alumínio-níquel",
      en: "Nickel-aluminum bronze alloys",
    },
    summary: {
      pt: "Desempenho superior em fadiga, cavitação e corrosão sob alta carga.",
      en: "Superior performance in fatigue, cavitation, and corrosion under high load.",
    },
    longDescription: {
      pt: "A adição de níquel eleva a resistência mecânica e a estabilidade em meios marinhos severos, mantendo boa usinabilidade.",
      en: "Adding nickel raises mechanical strength and stability in severe marine environments while preserving machinability.",
    },
    image: "/images/products/ligas-de-bronze-aluminio-niquel.jpg",
    alloys: [
      {
        code: "BM 955",
        uns: "C95500",
        astm: ["ASTM B148", "ASTM B271"],
        description: {
          pt: "Bronze-alumínio-níquel fundido com excelente tenacidade.",
          en: "Cast nickel-aluminum bronze with excellent toughness.",
        },
        properties: { tensileMpa: 690, hardness: "192 HB" },
      },
      {
        code: "BM 630",
        uns: "C63000",
        description: {
          pt: "Versão forjada com elevada resistência à fadiga.",
          en: "Wrought variant with high fatigue resistance.",
        },
        properties: { tensileMpa: 760 },
      },
      {
        code: "BM 280HT",
        ams: ["AMS 4590", "AMS 4881"],
        description: {
          pt: "Liga aeroespacial tratada para serviços de alta exigência.",
          en: "Aerospace-grade alloy, heat-treated for high-demand service.",
        },
      },
    ],
    applications: {
      pt: [
        "Componentes aeroespaciais",
        "Hélices e bombas marinhas",
        "Anéis de retenção e buchas estruturais",
        "Sedes de válvulas de alta pressão",
      ],
      en: [
        "Aerospace components",
        "Marine propellers and pumps",
        "Retention rings and structural bushings",
        "High-pressure valve seats",
      ],
    },
  },
  {
    slug: "ligas-bronze-aluminio-zinco",
    name: {
      pt: "Ligas de bronze-alumínio-zinco",
      en: "Aluminum-zinc bronze alloys",
    },
    summary: {
      pt: "Resistência ao desgaste com boa usinabilidade para peças de transmissão.",
      en: "Wear resistance with good machinability for transmission parts.",
    },
    longDescription: {
      pt: "Combina características das famílias de bronze-alumínio com zinco para reduzir custo e manter dureza em peças menos críticas.",
      en: "Combines aluminum bronze characteristics with zinc to reduce cost while preserving hardness for less-critical parts.",
    },
    image: "/images/products/ligas-bronze-aluminio-zinco.jpg",
    alloys: [
      {
        code: "BM 863",
        uns: "C86300",
        sae: "SAE 430B",
        description: {
          pt: "Versão econômica para componentes de uso geral em equipamentos industriais.",
          en: "Economical variant for general-use components in industrial equipment.",
        },
      },
    ],
    applications: {
      pt: ["Componentes de transmissão", "Buchas de equipamentos industriais"],
      en: ["Transmission components", "Industrial equipment bushings"],
    },
  },
  {
    slug: "ligas-de-cobre-berilio",
    name: {
      pt: "Ligas de cobre-berílio",
      en: "Beryllium copper alloys",
    },
    summary: {
      pt: "A maior resistência mecânica entre os cobres, com excelente condutividade.",
      en: "The highest mechanical strength among coppers, with excellent conductivity.",
    },
    longDescription: {
      pt: "Após tratamento térmico, atinge resistência comparável a aços de alto carbono mantendo condutividade elétrica e térmica elevadas.",
      en: "After heat treatment, reaches strength comparable to high-carbon steels while keeping high electrical and thermal conductivity.",
    },
    image: "/images/products/ligas-de-cobre-berilio.jpg",
    alloys: [
      {
        code: "BM 172HT",
        uns: "C17200",
        astm: ["ASTM B196"],
        description: {
          pt: "Liga endurecível por precipitação para moldes, conectores e ferramentas anti-faísca.",
          en: "Precipitation-hardenable alloy for molds, connectors, and non-sparking tools.",
        },
        properties: {
          tensileMpa: 1400,
          hardness: "RC 45",
          thermalConductivityWmK: 156,
        },
      },
    ],
    applications: {
      pt: [
        "Moldes para injeção plástica",
        "Conectores elétricos de alta confiabilidade",
        "Ferramentas anti-faísca para áreas explosivas",
        "Componentes aeroespaciais e de defesa",
      ],
      en: [
        "Plastic injection molds",
        "High-reliability electrical connectors",
        "Non-sparking tools for explosive areas",
        "Aerospace and defense components",
      ],
    },
  },
  {
    slug: "ligas-de-cobre-cromo-niquel-silicio",
    name: {
      pt: "Ligas de cobre-cromo-níquel-silício",
      en: "Copper-chromium-nickel-silicon alloys",
    },
    summary: {
      pt: "Alternativa ao cobre-berílio em moldes — alto desempenho térmico.",
      en: "An alternative to beryllium copper in molds — high thermal performance.",
    },
    longDescription: {
      pt: "Excelente condutividade térmica em moldes de injeção, com vida útil prolongada e ausência de berílio.",
      en: "Excellent thermal conductivity in injection molds, with extended service life and beryllium-free composition.",
    },
    image: "/images/products/ligas-de-cobre-cromo-niquel-silicio.jpg",
    alloys: [
      {
        code: "BM 180",
        uns: "C18000",
        description: {
          pt: "Liga endurecível por precipitação para insertos e cavidades de molde com alta dissipação térmica.",
          en: "Precipitation-hardenable alloy for mold inserts and cavities requiring high heat dissipation.",
        },
      },
    ],
    applications: {
      pt: ["Insertos de molde", "Cavidades de alta troca térmica", "Eletrodos de solda"],
      en: ["Mold inserts", "High heat-exchange cavities", "Welding electrodes"],
    },
  },
  {
    slug: "ligas-de-cobre-cromo-zirconio",
    name: {
      pt: "Ligas de cobre-cromo-zircônio",
      en: "Copper-chromium-zirconium alloys",
    },
    summary: {
      pt: "Condutividade elevada e estabilidade térmica para eletrodos e moldes.",
      en: "High conductivity and thermal stability for electrodes and molds.",
    },
    longDescription: {
      pt: "Equilíbrio entre dureza e condutividade em serviços de solda por resistência e moldes de alta produção.",
      en: "Balance between hardness and conductivity for resistance welding service and high-production molds.",
    },
    image: "/images/products/ligas-de-cobre-cromo-zirconio.jpg",
    alloys: [
      {
        code: "BM 1815",
        uns: "C18150",
        description: {
          pt: "Liga de cobre-cromo-zircônio para eletrodos de solda por resistência.",
          en: "Copper-chromium-zirconium alloy for resistance welding electrodes.",
        },
      },
    ],
    applications: {
      pt: ["Eletrodos de solda por resistência", "Insertos e cavidades de molde"],
      en: ["Resistance welding electrodes", "Mold inserts and cavities"],
    },
  },
  {
    slug: "ligas-de-cobre-niquel-berilio",
    name: {
      pt: "Ligas de cobre-níquel-berílio",
      en: "Copper-nickel-beryllium alloys",
    },
    summary: {
      pt: "Resistência mecânica com baixíssima fração de berílio.",
      en: "High strength with very low beryllium content.",
    },
    longDescription: {
      pt: "Combinação que mantém dureza e condutividade reduzindo o teor de berílio em aplicações sensíveis a regulação.",
      en: "A combination that holds hardness and conductivity while lowering beryllium content for regulation-sensitive applications.",
    },
    image: "/images/products/ligas-de-cobre-niquel-berilio.jpg",
    alloys: [
      {
        code: "BM 1751HT",
        uns: "C17510",
        description: {
          pt: "Liga endurecível com condutividade alta para conectores e contatos.",
          en: "Precipitation-hardenable alloy with high conductivity for connectors and contacts.",
        },
      },
    ],
    applications: {
      pt: ["Conectores elétricos", "Contatos e suportes para eletrônica de alta potência"],
      en: ["Electrical connectors", "Contacts and supports for high-power electronics"],
    },
  },
  {
    slug: "ligas-de-molibdenio",
    name: {
      pt: "Ligas de molibdênio",
      en: "Molybdenum alloys",
    },
    summary: {
      pt: "Estabilidade extrema em altas temperaturas e ambientes corrosivos.",
      en: "Extreme stability at high temperatures and corrosive environments.",
    },
    longDescription: {
      pt: "Liga refratária para componentes que operam acima de 1.000 °C, com baixa expansão térmica e alta rigidez.",
      en: "Refractory alloy for components operating above 1,000 °C, with low thermal expansion and high stiffness.",
    },
    image: "/images/products/ligas-de-molibdenio.jpg",
    alloys: [
      {
        code: "TZM",
        astm: ["ASTM B387"],
        description: {
          pt: "Liga titânio-zircônio-molibdênio para fornos, aeroespacial e elementos de alta temperatura.",
          en: "Titanium-zirconium-molybdenum alloy for furnaces, aerospace, and high-temperature elements.",
        },
        properties: { meltingC: [2550, 2620] },
      },
    ],
    applications: {
      pt: ["Componentes de alto-forno", "Elementos resistivos de alta temperatura", "Aeroespacial"],
      en: ["Furnace components", "High-temperature resistive elements", "Aerospace"],
    },
  },
];

export const productFamilyBySlug = new Map(
  productFamilies.map((f) => [f.slug, f] as const),
);
