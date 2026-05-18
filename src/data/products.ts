export type Bilingual = { pt: string; en: string };
export type BilingualList = { pt: string[]; en: string[] };

export type CompositionRow = {
  element: Bilingual;
  range: string; // e.g. "10.0–11.5%" or "Remainder"
};

export type PropertyRow = {
  label: Bilingual;
  value: string;
  unit?: string;
};

export type Alloy = {
  code: string;
  slug: string; // URL slug used by /produtos/[family]/[alloy]
  uns?: string;
  sae?: string;
  astm?: string[];
  ams?: string[];
  description: Bilingual;
  image: string;
  composition?: CompositionRow[];
  properties?: PropertyRow[];
  applications?: BilingualList;
  processes?: BilingualList;
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

// Bilingual element helpers (used in composition rows)
const el = {
  copper: { pt: "Cobre", en: "Copper" },
  aluminum: { pt: "Alumínio", en: "Aluminum" },
  nickel: { pt: "Níquel", en: "Nickel" },
  iron: { pt: "Ferro", en: "Iron" },
  manganese: { pt: "Manganês", en: "Manganese" },
  silicon: { pt: "Silício", en: "Silicon" },
  beryllium: { pt: "Berílio", en: "Beryllium" },
  cobalt: { pt: "Cobalto", en: "Cobalt" },
  chromium: { pt: "Cromo", en: "Chromium" },
  zinc: { pt: "Zinco", en: "Zinc" },
  zirconium: { pt: "Zircônio", en: "Zirconium" },
  molybdenum: { pt: "Molibdênio", en: "Molybdenum" },
  titanium: { pt: "Titânio", en: "Titanium" },
  carbon: { pt: "Carbono", en: "Carbon" },
  others: { pt: "Outros", en: "Others" },
};

const prop = {
  tensile: { pt: "Resistência à tração", en: "Tensile strength" },
  yield: { pt: "Limite de escoamento", en: "Yield strength" },
  elongation: { pt: "Alongamento", en: "Elongation" },
  hardnessBrinell: { pt: "Dureza Brinell", en: "Brinell hardness" },
  hardnessRockwellB: { pt: "Dureza Rockwell B", en: "Rockwell B hardness" },
  hardnessRockwellC: { pt: "Dureza Rockwell C", en: "Rockwell C hardness" },
  compressive: { pt: "Resistência à compressão", en: "Compressive strength" },
  density: { pt: "Densidade", en: "Density" },
  thermal: { pt: "Condutividade térmica", en: "Thermal conductivity" },
  electrical: { pt: "Condutividade elétrica", en: "Electrical conductivity" },
  melting: { pt: "Faixa de fusão", en: "Melting range" },
};

export const productFamilies: ProductFamily[] = [
  {
    slug: "ligas-de-bronze-aluminio",
    name: { pt: "Ligas de bronze-alumínio", en: "Aluminum bronze alloys" },
    summary: {
      pt: "Alta resistência mecânica e ótima resposta à abrasão em meios marinhos e ácidos.",
      en: "High mechanical strength and strong abrasion response in marine and acidic environments.",
    },
    longDescription: {
      pt: "Família que combina alumínio com cobre para entregar tenacidade, dureza e resistência à corrosão. Indicada para componentes que trabalham sob carga, fricção e ambientes agressivos.",
      en: "A family combining aluminum with copper to deliver toughness, hardness, and corrosion resistance. Recommended for components working under load, friction, and aggressive environments.",
    },
    image: "/images/products/ligas-de-bronze-aluminio.png",
    alloys: [
      {
        code: "BM 863",
        slug: "bm-863-sae430b-c86300",
        uns: "C86300",
        sae: "SAE 430B",
        astm: ["ASTM B505"],
        description: {
          pt: "Manganês-bronze de alta resistência para engrenagens, parafusos sem-fim e buchas de alta carga.",
          en: "High-strength manganese bronze for gears, worm screws, and heavy-load bushings.",
        },
        image: "/images/alloys/bm-863.png",
        properties: [
          { label: prop.tensile, value: "820", unit: "MPa" },
          { label: prop.hardnessBrinell, value: "225 HB" },
        ],
      },
      {
        code: "BM 954",
        slug: "bm-954-c95400-astmb505-b271",
        uns: "C95400",
        astm: ["ASTM B148", "ASTM B271", "ASTM B505"],
        description: {
          pt: "Bronze-alumínio com excelente equilíbrio entre dureza e usinabilidade para peças estruturais.",
          en: "Aluminum bronze with excellent balance between hardness and machinability for structural parts.",
        },
        image: "/images/alloys/bm-954.png",
        properties: [
          { label: prop.tensile, value: "620", unit: "MPa" },
          { label: prop.hardnessBrinell, value: "170 HB" },
        ],
      },
      {
        code: "BM 300",
        slug: "bm-300-c95900-astmb505",
        uns: "C95900",
        astm: ["ASTM B505"],
        description: {
          pt: "Liga balanceada para buchas e mancais sob carga moderada.",
          en: "Balanced alloy for bushings and bearings under moderate load.",
        },
        image: "/images/alloys/bm-300.png",
      },
      {
        code: "BM 959",
        slug: "bm-959-c95900-astmb505",
        uns: "C95900",
        astm: ["ASTM B505"],
        description: {
          pt: "Variação com maior dureza para aplicações de elevada abrasão.",
          en: "Higher-hardness variant for severe abrasion service.",
        },
        image: "/images/alloys/bm-959.png",
      },
      {
        code: "BM 340",
        slug: "bm-340-ligas-especiais-de-alta-dureza",
        description: {
          pt: "Liga especial de alta dureza para componentes hidráulicos.",
          en: "Special high-hardness alloy for hydraulic components.",
        },
        image: "/images/alloys/bm-340.png",
      },
      {
        code: "BM 380",
        slug: "bm-380-ligasespeciais-de-alta-dureza",
        description: {
          pt: "Liga especial para guias, suportes e peças de transmissão de alta carga.",
          en: "Special alloy for guides, supports, and high-load transmission parts.",
        },
        image: "/images/alloys/bm-380.png",
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
    name: { pt: "Ligas de bronze-alumínio-níquel", en: "Nickel-aluminum bronze alloys" },
    summary: {
      pt: "Desempenho superior em fadiga, cavitação e corrosão sob alta carga.",
      en: "Superior performance in fatigue, cavitation, and corrosion under high load.",
    },
    longDescription: {
      pt: "A adição de níquel eleva a resistência mecânica e a estabilidade em meios marinhos severos, mantendo boa usinabilidade.",
      en: "Adding nickel raises mechanical strength and stability in severe marine environments while preserving machinability.",
    },
    image: "/images/products/ligas-de-bronze-aluminio-niquel.png",
    alloys: [
      {
        code: "BM 955",
        slug: "bm-955-c95500-astmb-150-mas-4640",
        uns: "C95500",
        astm: ["ASTM B150"],
        ams: ["MAS 4640", "AMS 4880"],
        description: {
          pt: "Bronze-alumínio-níquel fundido de alta resistência mecânica, com excelente desempenho em moldes para vidro, peças de aeronaves, engrenagens helicoidais e buchas de cargas elevadas.",
          en: "High-strength cast nickel-aluminum bronze with excellent performance in glass molds, aircraft parts, helical gears, and high-load bushings.",
        },
        image: "/images/alloys/bm-955.png",
        composition: [
          { element: el.copper, range: "Remainder" },
          { element: el.aluminum, range: "10.0–11.5%" },
          { element: el.nickel, range: "3.0–5.5%" },
          { element: el.iron, range: "3.0–5.0%" },
          { element: el.manganese, range: "máx. 3.5%" },
          { element: el.others, range: "máx. 0.5%" },
        ],
        properties: [
          { label: prop.tensile, value: "620–725", unit: "MPa" },
          { label: prop.yield, value: "275–296", unit: "MPa" },
          { label: prop.elongation, value: "10–14", unit: "%" },
          { label: prop.hardnessRockwellB, value: "88–92" },
          { label: prop.compressive, value: "980–1034", unit: "MPa" },
          { label: prop.density, value: "7.55", unit: "kg/dm³" },
        ],
        applications: {
          pt: [
            "Peças de máquinas",
            "Moldes para vidro",
            "Mordentes e placas de desgaste",
            "Componentes de aeronaves",
            "Equipamentos de decapagem",
            "Guias de válvula e pistão",
            "Engrenagens helicoidais",
            "Buchas e trens de pouso",
            "Indústrias naval, plástica e siderúrgica",
          ],
          en: [
            "Machine parts",
            "Glass molds",
            "Jaw components and wear plates",
            "Aircraft components",
            "Pickling equipment",
            "Valve guides and piston guides",
            "Helical gears",
            "Bushings and landing-gear parts",
            "Naval, plastic, and steel industries",
          ],
        },
        processes: {
          pt: ["Fundição contínua", "Fundição em areia", "Fundição centrífuga"],
          en: ["Continuous casting", "Sand casting", "Centrifugal casting"],
        },
      },
      {
        code: "BM 630",
        slug: "bm-630-c63000-astmb-505-mas-4880",
        uns: "C63000",
        astm: ["ASTM B505"],
        ams: ["MAS 4880"],
        description: {
          pt: "Versão forjada com elevada resistência à fadiga e excelente desempenho dinâmico.",
          en: "Wrought variant with high fatigue resistance and excellent dynamic performance.",
        },
        image: "/images/alloys/bm-630.png",
        properties: [{ label: prop.tensile, value: "760", unit: "MPa" }],
      },
      {
        code: "BM 280HT",
        slug: "bm-280-ht-am-s4590-4881",
        ams: ["AMS 4590", "AMS 4881"],
        description: {
          pt: "Liga aeroespacial tratada termicamente para serviços de altíssima exigência.",
          en: "Aerospace-grade alloy, heat-treated for highest-demand service.",
        },
        image: "/images/alloys/bm-280-ht.png",
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
    name: { pt: "Ligas de bronze-alumínio-zinco", en: "Aluminum-zinc bronze alloys" },
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
        slug: "bm-863-sae430b-c86300",
        uns: "C86300",
        sae: "SAE 430B",
        astm: ["ASTM B505"],
        description: {
          pt: "Versão econômica para componentes de uso geral em equipamentos industriais.",
          en: "Economical variant for general-use components in industrial equipment.",
        },
        image: "/images/alloys/bm-863.png",
      },
    ],
    applications: {
      pt: ["Componentes de transmissão", "Buchas de equipamentos industriais"],
      en: ["Transmission components", "Industrial equipment bushings"],
    },
  },
  {
    slug: "ligas-de-cobre-berilio",
    name: { pt: "Ligas de cobre-berílio", en: "Beryllium copper alloys" },
    summary: {
      pt: "A maior resistência mecânica entre os cobres, com excelente condutividade.",
      en: "The highest mechanical strength among coppers, with excellent conductivity.",
    },
    longDescription: {
      pt: "Após tratamento térmico, atinge resistência comparável a aços de alto carbono mantendo condutividade elétrica e térmica elevadas.",
      en: "After heat treatment, reaches strength comparable to high-carbon steels while keeping high electrical and thermal conductivity.",
    },
    image: "/images/products/ligas-de-cobre-berilio.png",
    alloys: [
      {
        code: "BM 172HT",
        slug: "bm-172-ht-c17200",
        uns: "C17200",
        astm: ["ASTM B196"],
        description: {
          pt: "Liga endurecível por precipitação para moldes, conectores e ferramentas anti-faísca.",
          en: "Precipitation-hardenable alloy for molds, connectors, and non-sparking tools.",
        },
        image: "/images/alloys/bm-172-ht.png",
        properties: [
          { label: prop.tensile, value: "1400", unit: "MPa" },
          { label: prop.hardnessRockwellC, value: "RC 45" },
          { label: prop.thermal, value: "156", unit: "W/m·K" },
        ],
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
    name: { pt: "Ligas de cobre-cromo-níquel-silício", en: "Copper-chromium-nickel-silicon alloys" },
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
        slug: "bm-180-c18000",
        uns: "C18000",
        description: {
          pt: "Liga endurecível por precipitação para insertos e cavidades de molde com alta dissipação térmica.",
          en: "Precipitation-hardenable alloy for mold inserts and cavities requiring high heat dissipation.",
        },
        image: "/images/alloys/bm-180.png",
      },
    ],
    applications: {
      pt: ["Insertos de molde", "Cavidades de alta troca térmica", "Eletrodos de solda"],
      en: ["Mold inserts", "High heat-exchange cavities", "Welding electrodes"],
    },
  },
  {
    slug: "ligas-de-cobre-cromo-zirconio",
    name: { pt: "Ligas de cobre-cromo-zircônio", en: "Copper-chromium-zirconium alloys" },
    summary: {
      pt: "Condutividade elevada e estabilidade térmica para eletrodos e moldes.",
      en: "High conductivity and thermal stability for electrodes and molds.",
    },
    longDescription: {
      pt: "Equilíbrio entre dureza e condutividade em serviços de solda por resistência e moldes de alta produção.",
      en: "Balance between hardness and conductivity for resistance welding service and high-production molds.",
    },
    image: "/images/products/ligas-de-cobre-cromo-zirconio.png",
    alloys: [
      {
        code: "BM 1815",
        slug: "bm-1815-c18150",
        uns: "C18150",
        description: {
          pt: "Liga de cobre-cromo-zircônio para eletrodos de solda por resistência.",
          en: "Copper-chromium-zirconium alloy for resistance welding electrodes.",
        },
        image: "/images/alloys/bm-1815.png",
      },
    ],
    applications: {
      pt: ["Eletrodos de solda por resistência", "Insertos e cavidades de molde"],
      en: ["Resistance welding electrodes", "Mold inserts and cavities"],
    },
  },
  {
    slug: "ligas-de-cobre-niquel-berilio",
    name: { pt: "Ligas de cobre-níquel-berílio", en: "Copper-nickel-beryllium alloys" },
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
        slug: "bm-1751-c17510",
        uns: "C17510",
        description: {
          pt: "Liga endurecível com condutividade alta para conectores e contatos.",
          en: "Precipitation-hardenable alloy with high conductivity for connectors and contacts.",
        },
        image: "/images/products/ligas-de-cobre-niquel-berilio.jpg",
      },
    ],
    applications: {
      pt: ["Conectores elétricos", "Contatos e suportes para eletrônica de alta potência"],
      en: ["Electrical connectors", "Contacts and supports for high-power electronics"],
    },
  },
  {
    slug: "ligas-de-molibdenio",
    name: { pt: "Ligas de molibdênio", en: "Molybdenum alloys" },
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
        slug: "tzm-astmb387",
        astm: ["ASTM B387"],
        description: {
          pt: "Liga titânio-zircônio-molibdênio para fornos, aeroespacial e elementos de alta temperatura.",
          en: "Titanium-zirconium-molybdenum alloy for furnaces, aerospace, and high-temperature elements.",
        },
        image: "/images/alloys/tzm.jpg",
        composition: [
          { element: el.molybdenum, range: "~99.0%" },
          { element: el.titanium, range: "0.50%" },
          { element: el.zirconium, range: "0.08%" },
          { element: el.carbon, range: "0.02%" },
        ],
        properties: [{ label: prop.melting, value: "2550–2620", unit: "°C" }],
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

export const alloyBySlug = new Map(
  productFamilies.flatMap((f) =>
    f.alloys.map((a) => [a.slug, { family: f, alloy: a }] as const),
  ),
);
