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
  slug: string;
  uns?: string;
  sae?: string;
  astm?: string[];
  ams?: string[];
  rwmaClass?: string;
  otherStandards?: string[];
  description: Bilingual;
  image: string;
  composition?: CompositionRow[];
  properties?: PropertyRow[];
  thermalElectrical?: PropertyRow[];
  formats?: BilingualList;
  applications?: BilingualList;
  processes?: BilingualList;
};

export type ProductFamily = {
  slug: string;
  name: Bilingual;
  summary: Bilingual;
  longDescription: Bilingual;
  characteristics: BilingualList;
  image: string;
  alloys: Alloy[];
  applications: BilingualList;
};

// Bilingual element helpers
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
  tin: { pt: "Estanho", en: "Tin" },
  lead: { pt: "Chumbo", en: "Lead" },
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
  thermal: { pt: "Condutividade térmica (20 °C)", en: "Thermal conductivity (20 °C)" },
  electrical: { pt: "Condutividade elétrica", en: "Electrical conductivity" },
};

const formats = {
  tarugo: { pt: "Tarugo", en: "Billet" },
  usinado: { pt: "Usinado", en: "Machined" },
  placa: { pt: "Placa", en: "Plate" },
  tubo: { pt: "Tubo", en: "Tube" },
  barra: { pt: "Barra", en: "Bar" },
};

const proc = {
  continuous: { pt: "Fundição contínua", en: "Continuous casting" },
  centrifugal: { pt: "Fundição centrífuga", en: "Centrifugal casting" },
  sand: { pt: "Fundição em areia", en: "Sand casting" },
  extrusion: { pt: "Extrusão", en: "Extrusion" },
  forging: { pt: "Forjamento", en: "Forging" },
  rolling: { pt: "Laminação", en: "Rolling" },
  powder: { pt: "Metalurgia do pó", en: "Powder metallurgy" },
};

const bi = (pt: string[], en: string[]): BilingualList => ({ pt, en });

export const productFamilies: ProductFamily[] = [
  {
    slug: "ligas-de-bronze-aluminio",
    name: { pt: "Ligas de bronze-alumínio", en: "Aluminum bronze alloys" },
    summary: {
      pt: "Alta resistência ao desgaste e baixo coeficiente de atrito — ideal para aplicações de deslizamento sob carga.",
      en: "High wear resistance and low friction coefficient — ideal for sliding applications under load.",
    },
    longDescription: {
      pt: "Família de ligas de cobre com 9–14% de alumínio (com adição de ferro) que alcança resistência mecânica comparável a aços de médio carbono, com baixo coeficiente de atrito e excelente resistência ao desgaste — ideal para componentes de deslizamento sob carga.",
      en: "Family of copper alloys with 9–14% aluminum (plus iron) reaching mechanical strength comparable to medium-carbon steel, with a low friction coefficient and excellent wear resistance — ideal for sliding components under load.",
    },
    characteristics: bi(
      [
        "Alumínio 9–14% e ferro ~4% para reforço estrutural",
        "Resistência comparável ao aço de médio carbono",
        "Baixo coeficiente de atrito — excelente para deslizamento",
        "Alta resistência ao desgaste, abrasão e adesão",
        "Resistência à cavitação e à erosão",
        "Estabilidade térmica e à oxidação em temperaturas elevadas",
        "Baixa permeabilidade magnética",
        "Boa soldabilidade",
      ],
      [
        "9–14% aluminum and ~4% iron for structural reinforcement",
        "Strength comparable to medium-carbon steel",
        "Low friction coefficient — excellent for sliding service",
        "High wear, abrasion, and galling resistance",
        "Cavitation and erosion resistance",
        "Thermal and oxidation stability at elevated temperatures",
        "Low magnetic permeability",
        "Good weldability",
      ],
    ),
    image: "/images/products/ligas-de-bronze-aluminio.jpg",
    alloys: [
      {
        code: "BM 954",
        slug: "bm-954-c95400-astmb505-b271",
        uns: "C95400",
        astm: ["ASTM B505", "ASTM B271"],
        description: {
          pt: "Bronze-alumínio-ferro com excelente equilíbrio entre resistência à fadiga, desgaste e ductilidade — referência da família para peças estruturais e moldes.",
          en: "Aluminum-iron bronze with excellent balance between fatigue resistance, wear, and ductility — the family reference for structural parts and molds.",
        },
        image: "/images/alloys/bm-954.png",
        composition: [
          { element: el.copper, range: "Remainder" },
          { element: el.aluminum, range: "10.0–11.5%" },
          { element: el.iron, range: "3.0–5.0%" },
          { element: el.nickel, range: "máx. 1.5%" },
          { element: el.manganese, range: "máx. 0.5%" },
          { element: el.others, range: "máx. 0.5%" },
        ],
        properties: [
          { label: prop.tensile, value: "586–724", unit: "MPa" },
          { label: prop.yield, value: "221–296", unit: "MPa" },
          { label: prop.elongation, value: "12–14", unit: "%" },
          { label: prop.hardnessRockwellB, value: "88–92" },
          { label: prop.hardnessBrinell, value: "176–194" },
          { label: prop.compressive, value: "830–940", unit: "MPa" },
          { label: prop.density, value: "7.45", unit: "kg/dm³" },
        ],
        formats: bi(["Tarugo", "Tubo", "Usinado", "Placa"], ["Billet", "Tube", "Machined", "Plate"]),
        applications: bi(
          ["Porcas e sapatas de regulagem em siderurgia", "Engrenagens, cunhas, placas de desgaste, cremalheiras e blocos de freio", "Moldes para cavidades de sabão", "Ganchos, cestos e alargadores em ambientes corrosivos", "Componentes de moldes plásticos: réguas, gavetas, insertos, buchas", "Antirruga em conformação e dobra de tubos"],
          ["Steel-mill adjustment nuts and shoes", "Gears, wedges, wear plates, racks, and brake blocks", "Soap-mold cavities", "Hooks, baskets, and reamers for corrosive environments", "Plastic mold parts: rails, drawers, inserts, bushings", "Anti-wrinkle service in tube forming and bending"],
        ),
        processes: bi(["Fundição contínua", "Fundição centrífuga"], ["Continuous casting", "Centrifugal casting"]),
      },
      {
        code: "BM 959",
        slug: "bm-959-c95900-astmb505",
        uns: "C95900",
        astm: ["ASTM B505"],
        description: {
          pt: "Bronze de alto alumínio com perfil de resistência calibrado para deslizamento sob carga — aplicação principal em placas de deslize, além de operações de conformação de tubos e roletes de dobra sem impacto.",
          en: "High-aluminum bronze tuned for load-bearing sliding service — mainly used in slide plates, as well as tube-forming and non-impact bending roller operations.",
        },
        image: "/images/alloys/bm-959.png",
        composition: [
          { element: el.copper, range: "Remainder" },
          { element: el.aluminum, range: "12.0–14.0%" },
          { element: el.iron, range: "3.0–5.0%" },
          { element: el.manganese, range: "máx. 3.5%" },
          { element: el.nickel, range: "máx. 0.5%" },
          { element: el.others, range: "máx. 0.5%" },
        ],
        properties: [
          { label: prop.tensile, value: "517–724", unit: "MPa" },
          { label: prop.yield, value: "386–407", unit: "MPa" },
          { label: prop.elongation, value: "0.5–1.5", unit: "%" },
          { label: prop.hardnessRockwellC, value: "24–28" },
          { label: prop.hardnessBrinell, value: "250–272" },
          { label: prop.compressive, value: "1108–1230", unit: "MPa" },
          { label: prop.density, value: "7.20", unit: "kg/dm³" },
        ],
        formats: bi(["Tarugo", "Usinado", "Placa"], ["Billet", "Machined", "Plate"]),
        applications: bi(
          ["Placas de deslize", "Buchas-guia e placas de desgaste", "Anéis de desgaste em estampos e insertos", "Roletes formadores", "Operações de dobra e calandragem"],
          ["Slide plates", "Guide bushings and wear plates", "Wear rings in stamping dies and inserts", "Forming rollers", "Bending and rolling operations"],
        ),
        processes: bi(["Fundição contínua"], ["Continuous casting"]),
      },
      {
        code: "BM 380",
        slug: "bm-380-ligasespeciais-de-alta-dureza",
        description: {
          pt: "Liga especial de altíssima dureza (36–40 HRC) e resistência à compressão (até 1.579 MPa) para estampos de precisão e ferramental de embutimento profundo.",
          en: "Special ultra-hard alloy (36–40 HRC) with compressive strength up to 1,579 MPa for precision stamping dies and deep-drawing tooling.",
        },
        image: "/images/alloys/bm-380.png",
        composition: [
          { element: el.copper, range: "Remainder" },
          { element: el.aluminum, range: "14.0–16.0%" },
          { element: el.iron, range: "4.5–6.5%" },
          { element: el.cobalt, range: "máx. 3.0%" },
          { element: el.manganese, range: "máx. 3.0%" },
          { element: el.others, range: "máx. 0.5%" },
        ],
        properties: [
          { label: prop.tensile, value: "600–750", unit: "MPa" },
          { label: prop.yield, value: "500–600", unit: "MPa" },
          { label: prop.elongation, value: "0.0–0.2", unit: "%" },
          { label: prop.hardnessRockwellC, value: "36–40" },
          { label: prop.hardnessBrinell, value: "329–363" },
          { label: prop.compressive, value: "1351–1579", unit: "MPa" },
          { label: prop.density, value: "6.95", unit: "kg/dm³" },
        ],
        formats: bi(["Tarugo", "Usinado", "Placa"], ["Billet", "Machined", "Plate"]),
        applications: bi(
          ["Estampos de precisão e laminação", "Embutimento profundo", "Componentes de matriz e punções", "Roletes formadores", "Elimina deformações e respingos de solda em aço inox e carbono"],
          ["Precision stamping and lamination dies", "Deep drawing", "Die components and punch tools", "Forming rollers", "Eliminates deformation and weld spatter on stainless and carbon steel"],
        ),
        processes: bi(["Extrusão", "Forjamento"], ["Extrusion", "Forging"]),
      },
    ],
    applications: bi(
      ["Placas de deslize", "Engrenagens, buchas e mancais de carga", "Guias e roletes de conformação", "Componentes hidráulicos e industriais", "Aplicações de deslizamento sob carga elevada"],
      ["Slide plates", "Gears, load bushings, and bearings", "Guides and forming rollers", "Hydraulic and industrial components", "High-load sliding applications"],
    ),
  },
  {
    slug: "ligas-de-bronze-aluminio-niquel",
    name: { pt: "Ligas de bronze-alumínio-níquel", en: "Nickel-aluminum bronze alloys" },
    summary: {
      pt: "Desempenho superior em fadiga, cavitação e corrosão sob alta carga.",
      en: "Superior performance in fatigue, cavitation, and corrosion under high load.",
    },
    longDescription: {
      pt: "Família de ligas de cobre com alumínio (6–13%), níquel (até 7%) e ferro (até 7%) que cria uma camada de óxido de alumínio protetora — ideal para ambientes marinhos severos, biostática e resistente a fadiga corrosiva.",
      en: "Copper alloys with aluminum (6–13%), nickel (up to 7%), and iron (up to 7%) forming a protective aluminum-oxide barrier — ideal for severe marine environments, biostatic and resistant to corrosion fatigue.",
    },
    characteristics: bi(
      [
        "Alumínio 6–13%, ferro até 7%, níquel até 7%",
        "Camada de óxido de alumínio protege contra oxidação",
        "Excelente resistência à água do mar e ao SO₂",
        "Resistência à corrosão sob tensão por cloretos",
        "Biostática — inibe incrustação biológica",
        "Coloração dourada característica",
      ],
      [
        "6–13% aluminum, iron up to 7%, nickel up to 7%",
        "Aluminum-oxide barrier protects against oxidation",
        "Excellent seawater and SO₂ resistance",
        "Resists chloride stress-corrosion cracking",
        "Biostatic — inhibits marine fouling",
        "Distinctive golden color",
      ],
    ),
    image: "/images/products/ligas-de-bronze-aluminio-niquel.jpg",
    alloys: [
      {
        code: "BM 955",
        slug: "bm-955-c95500-astmb-150-mas-4640",
        uns: "C95500",
        astm: ["ASTM B150"],
        ams: ["AMS 4880"],
        description: {
          pt: "Bronze-alumínio-níquel forjado, centrifugado ou fundido de alta resistência mecânica e excelente desempenho em moldes para vidro, peças de aeronaves, engrenagens helicoidais e buchas de cargas elevadas.",
          en: "Forged, centrifugally cast, or cast nickel-aluminum bronze with high mechanical strength and excellent performance in glass molds, aircraft parts, helical gears, and high-load bushings.",
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
          { label: prop.hardnessBrinell, value: "176–194" },
          { label: prop.compressive, value: "980–1034", unit: "MPa" },
          { label: prop.density, value: "7.55", unit: "kg/dm³" },
        ],
        formats: bi(["Tarugo", "Tubo", "Usinado", "Placa"], ["Billet", "Tube", "Machined", "Plate"]),
        applications: bi(
          ["Peças de máquinas", "Moldes para vidro", "Mordentes e placas de desgaste", "Componentes de aeronaves", "Equipamentos de decapagem", "Guias de válvula e pistão", "Engrenagens helicoidais", "Buchas e trens de pouso", "Indústrias naval, plástica e siderúrgica"],
          ["Machine parts", "Glass molds", "Jaw components and wear plates", "Aircraft components", "Pickling equipment", "Valve guides and piston guides", "Helical gears", "Bushings and landing-gear parts", "Naval, plastic, and steel industries"],
        ),
        processes: bi(["Fundição contínua", "Fundição em areia", "Fundição centrífuga"], ["Continuous casting", "Sand casting", "Centrifugal casting"]),
      },
      {
        code: "BM 630",
        slug: "bm-630-c63000-astmb-505-mas-4880",
        uns: "C63000",
        astm: ["ASTM B505"],
        ams: ["AMS 4640"],
        otherStandards: ["MAS 4880"],
        description: {
          pt: "Bronze-alumínio-níquel extrudado com alta resistência à fadiga e a ambientes corrosivos, com propriedades antifaísca para áreas explosivas.",
          en: "Extruded nickel-aluminum bronze with high fatigue and corrosion resistance, plus non-sparking properties for explosive areas.",
        },
        image: "/images/alloys/bm-630.png",
        composition: [
          { element: el.copper, range: "Remainder" },
          { element: el.aluminum, range: "9.0–11.0%" },
          { element: el.iron, range: "2.0–4.0%" },
          { element: el.nickel, range: "4.0–5.5%" },
          { element: el.manganese, range: "máx. 1.5%" },
          { element: el.others, range: "máx. 0.5%" },
        ],
        properties: [
          { label: prop.tensile, value: "690–814", unit: "MPa" },
          { label: prop.yield, value: "340–517", unit: "MPa" },
          { label: prop.elongation, value: "10–18", unit: "%" },
          { label: prop.hardnessRockwellB, value: "96–100" },
          { label: prop.hardnessBrinell, value: "215–241" },
          { label: prop.compressive, value: "980–1034", unit: "MPa" },
          { label: prop.density, value: "7.55", unit: "kg/dm³" },
        ],
        formats: bi(["Tarugo", "Tubo", "Usinado", "Placa"], ["Billet", "Tube", "Machined", "Plate"]),
        applications: bi(
          ["Mancais para serviço pesado em ambientes corrosivos", "Buchas para aeronáutica", "Bombas e eixos marítimos", "Hélices e anéis de desgaste", "Engrenagens", "Ferramental para dobra de tubos", "Ferramentas antifaísca para áreas explosivas"],
          ["Heavy-duty bearings in corrosive environments", "Aircraft bushings", "Marine pumps and shafts", "Propellers and wear rings", "Gears", "Tube-bending tooling", "Spark-resistant safety tools for explosive atmospheres"],
        ),
        processes: bi(["Extrusão", "Forjamento"], ["Extrusion", "Forging"]),
      },
      {
        code: "BM 280HT",
        slug: "bm-280-ht-am-s4590-4881",
        ams: ["AMS 4590", "AMS 4881"],
        description: {
          pt: "Liga premium da família, tratada termicamente para serviços aeroespaciais e cargas elevadas em temperaturas mais altas.",
          en: "Premium family member, heat-treated for aerospace service and high loads at elevated temperatures.",
        },
        image: "/images/alloys/bm-280-ht.png",
        composition: [
          { element: el.copper, range: "Remainder" },
          { element: el.aluminum, range: "9.5–12.5%" },
          { element: el.iron, range: "4.0–6.0%" },
          { element: el.nickel, range: "4.0–6.0%" },
          { element: el.manganese, range: "máx. 1.5%" },
          { element: el.others, range: "máx. 0.5%" },
        ],
        properties: [
          { label: prop.tensile, value: "650–896", unit: "MPa" },
          { label: prop.yield, value: "400–724", unit: "MPa" },
          { label: prop.elongation, value: "4–10", unit: "%" },
          { label: prop.hardnessRockwellC, value: "26–30" },
          { label: prop.hardnessBrinell, value: "261–285" },
          { label: prop.compressive, value: "1034–1324", unit: "MPa" },
          { label: prop.density, value: "7.45", unit: "kg/dm³" },
        ],
        formats: bi(["Tarugo", "Tubo", "Usinado", "Placa"], ["Billet", "Tube", "Machined", "Plate"]),
        applications: bi(
          ["Mancais para trens de pouso aeroespaciais", "Buchas para cargas pesadas", "Roletes de conformação de tubos", "Componentes para moldes plásticos e de vidro", "Ferramental para dobra de tubos"],
          ["Aerospace landing-gear bearings", "Heavy-load bushings", "Tube-forming rollers", "Plastic and glass mold components", "Tube-bending tooling"],
        ),
        processes: bi(["Extrusão", "Forjamento"], ["Extrusion", "Forging"]),
      },
    ],
    applications: bi(
      ["Componentes aeroespaciais (trens de pouso, mancais)", "Hélices e bombas marinhas", "Anéis de retenção e buchas estruturais", "Sedes de válvulas de alta pressão", "Ferramentas antifaísca"],
      ["Aerospace components (landing gear, bearings)", "Marine propellers and pumps", "Retention rings and structural bushings", "High-pressure valve seats", "Non-sparking tools"],
    ),
  },
  {
    slug: "ligas-bronze-aluminio-zinco",
    name: { pt: "Ligas de bronze-alumínio-zinco", en: "Aluminum-zinc bronze alloys" },
    summary: {
      pt: "Eutéticos duros em matriz macia — atrito controlado e autolubrificação por desgaste seletivo.",
      en: "Hard eutectic particles in a soft matrix — controlled friction with self-lubricating selective wear.",
    },
    longDescription: {
      pt: "Liga de cobre-alumínio-zinco em que partículas eutéticas duras dispersas em uma matriz mais macia criam superfícies de baixo atrito e canais de lubrificação por desgaste controlado.",
      en: "Copper-aluminum-zinc alloy in which hard eutectic particles dispersed in a softer matrix create low-friction surfaces and lubrication channels through controlled wear.",
    },
    characteristics: bi(
      [
        "Partículas eutéticas duras em matriz mais macia",
        "Baixo coeficiente de atrito",
        "Desgaste seletivo cria canais de lubrificação",
        "Ponto de fusão e dureza superiores aos elementos base",
        "Resistência mecânica reforçada",
      ],
      [
        "Hard eutectic particles in softer matrix",
        "Low coefficient of friction",
        "Selective wear creates lubrication channels",
        "Melting point and hardness above base elements",
        "Reinforced mechanical strength",
      ],
    ),
    image: "/images/products/ligas-bronze-aluminio-zinco.jpg",
    alloys: [
      {
        code: "BM 863",
        slug: "bm-863-sae430b-c86300",
        uns: "C86300",
        sae: "SAE 430B",
        astm: ["ASTM B147-8C"],
        otherStandards: ["Ca86", "BS 140 HTB-3", "JIS CuZn25A15"],
        description: {
          pt: "Mesma especificação BM 863 da família de bronze-alumínio, classificada também como bronze-alumínio-zinco devido ao teor de 22–28% de zinco — combina dureza e resistência à corrosão.",
          en: "The same BM 863 specification as the aluminum bronze family, also classified as aluminum-zinc bronze due to its 22–28% zinc content — combines hardness and corrosion resistance.",
        },
        image: "/images/alloys/bm-863.png",
        composition: [
          { element: el.copper, range: "Remainder" },
          { element: el.zinc, range: "22.0–28.0%" },
          { element: el.aluminum, range: "5.0–7.5%" },
          { element: el.manganese, range: "2.5–5.0%" },
          { element: el.iron, range: "2.0–4.0%" },
          { element: el.nickel, range: "máx. 1.0%" },
          { element: el.tin, range: "máx. 0.2%" },
          { element: el.lead, range: "máx. 0.2%" },
          { element: el.others, range: "máx. 0.5%" },
        ],
        properties: [
          { label: prop.tensile, value: "760–820", unit: "MPa" },
          { label: prop.yield, value: "410–430", unit: "MPa" },
          { label: prop.elongation, value: "12–14", unit: "%" },
          { label: prop.hardnessRockwellB, value: "90–94" },
          { label: prop.hardnessBrinell, value: "184–204" },
          { label: prop.compressive, value: "415–670", unit: "MPa" },
          { label: prop.density, value: "7.85", unit: "kg/dm³" },
        ],
        formats: bi(
          ["Tarugo", "Tubo", "Usinado", "Placa"],
          ["Billet", "Tube", "Machined", "Plate"],
        ),
        applications: bi(
          ["Buchas e mancais", "Coroas", "Válvulas", "Porcas de prensa", "Componentes de trolley", "Cilindros hidráulicos", "Cames", "Suportes de alta resistência"],
          ["Bushings and bearings", "Crown gears", "Valves", "Press nuts", "Trolley components", "Hydraulic cylinders", "Cams", "High-strength supports"],
        ),
        processes: bi(["Forjamento", "Fundição centrífuga"], ["Forging", "Centrifugal casting"]),
      },
    ],
    applications: bi(
      ["Materiais para mancais e buchas", "Componentes resistentes ao desgaste em conjuntos mecânicos", "Aplicações automotivas, aeroespaciais, marítimas, militares, construção e eletrônica"],
      ["Bearing and bushing materials", "Wear-resistant components in mechanical assemblies", "Automotive, aerospace, marine, military, construction, and electronics applications"],
    ),
  },
  {
    slug: "ligas-de-cobre-berilio",
    name: { pt: "Ligas de cobre-berílio", en: "Beryllium copper alloys" },
    summary: {
      pt: "A maior resistência mecânica entre os cobres, com excelente condutividade térmica e elétrica.",
      en: "The highest mechanical strength among coppers, with excellent thermal and electrical conductivity.",
    },
    longDescription: {
      pt: "Após tratamento térmico, atinge resistência mecânica até 1.400 MPa mantendo condutividade térmica 3–5× superior ao aço-ferramenta. Excelente em moldes, conectores elétricos e ferramentas antifaísca.",
      en: "After heat treatment, reaches up to 1,400 MPa while keeping thermal conductivity 3–5× higher than tool steel. Excellent for molds, electrical connectors, and non-sparking tools.",
    },
    characteristics: bi(
      [
        "Resistência à tração até 1.400 MPa (200 ksi)",
        "Condutividade térmica 156 W/m·°K — 3–5× a do aço",
        "Não gera faíscas em atmosferas explosivas",
        "Excelente resistência à corrosão por água do mar",
        "Resiste à corrosão sob tensão por sulfetos e cloretos",
        "Excelente capacidade de conformação a quente",
      ],
      [
        "Tensile strength up to 1,400 MPa (200 ksi)",
        "Thermal conductivity 156 W/m·°K — 3–5× steel",
        "Non-sparking in explosive atmospheres",
        "Excellent seawater corrosion resistance",
        "Resists sulfide- and chloride-induced stress corrosion",
        "Excellent hot-forming capability",
      ],
    ),
    image: "/images/products/ligas-de-cobre-berilio.jpg",
    alloys: [
      {
        code: "BM 172HT",
        slug: "bm-172-ht-c17200",
        uns: "C17200",
        rwmaClass: "Class 4",
        description: {
          pt: "Liga de cobre-berílio endurecível por precipitação, atingindo até 1.380 MPa de tração com condutividade térmica de 156 W/m·°K — referência para moldes plásticos, conectores submarinos e ferramentas antifaísca.",
          en: "Precipitation-hardenable copper-beryllium reaching up to 1,380 MPa tensile strength with 156 W/m·°K thermal conductivity — the reference for plastic molds, subsea connectors, and non-sparking tools.",
        },
        image: "/images/alloys/bm-172-ht.png",
        composition: [
          { element: el.copper, range: "Remainder" },
          { element: el.beryllium, range: "1.8–2.0%" },
          { element: el.cobalt, range: "máx. 0.3%" },
          { element: el.nickel, range: "máx. 0.2%" },
          { element: el.iron, range: "máx. 0.1%" },
          { element: el.others, range: "máx. 0.5%" },
        ],
        properties: [
          { label: prop.tensile, value: "980–1380", unit: "MPa" },
          { label: prop.yield, value: "980–1000", unit: "MPa" },
          { label: prop.elongation, value: "4–5", unit: "%" },
          { label: prop.hardnessRockwellC, value: "38–42" },
          { label: prop.hardnessBrinell, value: "346–382" },
          { label: prop.density, value: "8.30", unit: "kg/dm³" },
        ],
        thermalElectrical: [
          { label: prop.electrical, value: "28–32", unit: "%IACS" },
          { label: prop.thermal, value: "150–156", unit: "W/m·K" },
        ],
        formats: bi(["Tarugo", "Usinado", "Placa"], ["Billet", "Machined", "Plate"]),
        applications: bi(
          ["Cavidades e insertos em moldes plásticos", "Anéis de gargalo e fundos de molde de sopro", "Pistões de injeção em fundição de alumínio", "Eletrodos de solda", "Componentes elétricos e eletrônicos", "Buchas e peças aeronáuticas", "Sistemas submarinos de telecomunicações", "Equipamentos de extração de petróleo"],
          ["Plastic mold cavities and inserts", "Blow-mold neck and bottom rings", "Aluminum die-casting injection pistons", "Welding electrodes", "Electrical and electronic components", "Bushings and aeronautical parts", "Subsea telecommunications systems", "Oil extraction equipment"],
        ),
        processes: bi(["Extrusão", "Forjamento"], ["Extrusion", "Forging"]),
      },
    ],
    applications: bi(
      ["Moldes plásticos (cavidades, insertos, anéis de gargalo)", "Conectores elétricos de alta confiabilidade", "Ferramentas antifaísca para áreas explosivas", "Componentes aeroespaciais e de defesa", "Sistemas RF e EMC"],
      ["Plastic molds (cavities, inserts, neck rings)", "High-reliability electrical connectors", "Non-sparking tools for explosive areas", "Aerospace and defense components", "RF and EMC systems"],
    ),
  },
  {
    slug: "ligas-de-cobre-cromo-niquel-silicio",
    name: { pt: "Ligas de cobre-cromo-níquel-silício", en: "Copper-chromium-nickel-silicon alloys" },
    summary: {
      pt: "Alternativa sem berílio para moldes e eletrodos — alto desempenho térmico e elétrico.",
      en: "Beryllium-free alternative for molds and electrodes — high thermal and electrical performance.",
    },
    longDescription: {
      pt: "Liga endurecível por precipitação que combina condutividade térmica (200–208 W/m·°K) com resistência mecânica, usada em moldes plásticos e porta-eletrodos onde o uso de berílio é restrito.",
      en: "Precipitation-hardenable alloy combining 200–208 W/m·°K thermal conductivity with mechanical strength, used in plastic molds and electrode holders where beryllium is restricted.",
    },
    characteristics: bi(
      [
        "RWMA Classe 3 — equilibra dureza e condutividade",
        "Sem berílio — atende restrições regulatórias",
        "Condutividade térmica 200–208 W/m·°K",
        "Condutividade elétrica 44–48% IACS",
        "Excelente desempenho em moldes plásticos",
      ],
      [
        "RWMA Class 3 — balances hardness and conductivity",
        "Beryllium-free — meets regulatory restrictions",
        "Thermal conductivity 200–208 W/m·°K",
        "Electrical conductivity 44–48% IACS",
        "Excellent performance in plastic molds",
      ],
    ),
    image: "/images/products/ligas-de-cobre-cromo-niquel-silicio.jpg",
    alloys: [
      {
        code: "BM 180",
        slug: "bm-180-c18000",
        uns: "C18000",
        rwmaClass: "Class 3",
        description: {
          pt: "Liga endurecível por precipitação para insertos e cavidades de molde com alta dissipação térmica e porta-eletrodos em solda por resistência. Aceita nitretação para reforçar a dureza superficial.",
          en: "Precipitation-hardenable alloy for mold inserts and cavities with high heat dissipation and for resistance welding electrode holders. Accepts nitriding to reinforce surface hardness.",
        },
        image: "/images/alloys/bm-180.png",
        composition: [
          { element: el.copper, range: "Remainder" },
          { element: el.chromium, range: "0.1–0.8%" },
          { element: el.nickel, range: "1.8–3.0%" },
          { element: el.silicon, range: "0.4–0.8%" },
          { element: el.iron, range: "máx. 0.2%" },
          { element: el.others, range: "máx. 0.5%" },
        ],
        properties: [
          { label: prop.tensile, value: "648–690", unit: "MPa" },
          { label: prop.yield, value: "496–517", unit: "MPa" },
          { label: prop.elongation, value: "9–13", unit: "%" },
          { label: prop.hardnessRockwellB, value: "92–96" },
          { label: prop.hardnessBrinell, value: "194–215" },
          { label: prop.density, value: "8.75", unit: "kg/dm³" },
        ],
        thermalElectrical: [
          { label: prop.electrical, value: "44–48", unit: "%IACS" },
          { label: prop.thermal, value: "200–208", unit: "W/m·K" },
        ],
        formats: bi(["Tarugo", "Usinado", "Placa"], ["Billet", "Machined", "Plate"]),
        applications: bi(
          ["Porta-eletrodos para solda", "Eletrodos de solda por projeção", "Cavidades de moldes plásticos", "Pistões de injeção de alumínio", "Cavidades de moldes de sabão"],
          ["Welding electrode holders", "Projection welding electrodes", "Plastic mold cavities", "Aluminum injection pistons", "Soap-mold cavities"],
        ),
        processes: bi(["Extrusão", "Forjamento"], ["Extrusion", "Forging"]),
      },
    ],
    applications: bi(
      ["Insertos e cavidades de molde com alta dissipação térmica", "Porta-eletrodos para solda por resistência", "Pistões de injeção de alumínio"],
      ["Mold inserts and cavities with high heat dissipation", "Resistance-welding electrode holders", "Aluminum injection pistons"],
    ),
  },
  {
    slug: "ligas-de-cobre-cromo-zirconio",
    name: { pt: "Ligas de cobre-cromo-zircônio", en: "Copper-chromium-zirconium alloys" },
    summary: {
      pt: "Condutividade elevada e estabilidade térmica até 500 °C para eletrodos e moldes de alta produção.",
      en: "High conductivity and thermal stability up to 500 °C for electrodes and high-volume molds.",
    },
    longDescription: {
      pt: "Liga CuCrZr endurecível por precipitação, RWMA Classe 2, que equilibra condutividade elétrica e térmica com resistência mecânica reforçada — referência em eletrodos de solda automotiva e moldes para fundição contínua.",
      en: "Precipitation-hardenable CuCrZr alloy (RWMA Class 2) balancing electrical and thermal conductivity with reinforced mechanical strength — the reference for automotive welding electrodes and continuous-casting molds.",
    },
    characteristics: bi(
      [
        "RWMA Classe 2 — alta condutividade e dureza",
        "Cromo 0,5–1,2% e zircônio 0,07–0,3%",
        "Condutividade térmica 312–320 W/m·°K",
        "Ductilidade preservada até 500 °C",
        "Resposta excelente ao endurecimento por precipitação",
      ],
      [
        "RWMA Class 2 — high conductivity and hardness",
        "0.5–1.2% chromium and 0.07–0.3% zirconium",
        "Thermal conductivity 312–320 W/m·°K",
        "Ductility preserved up to 500 °C",
        "Excellent precipitation-hardening response",
      ],
    ),
    image: "/images/products/ligas-de-cobre-cromo-zirconio.jpg",
    alloys: [
      {
        code: "BM 1815",
        slug: "bm-1815-c18150",
        uns: "C18150",
        rwmaClass: "Class 2",
        description: {
          pt: "Liga CuCrZr para eletrodos de solda por resistência e moldes de alta produção, com condutividade térmica acima de 312 W/m·K.",
          en: "CuCrZr alloy for resistance welding electrodes and high-volume molds, with thermal conductivity above 312 W/m·K.",
        },
        image: "/images/alloys/bm-1815.png",
        composition: [
          { element: el.copper, range: "Remainder" },
          { element: el.chromium, range: "0.5–1.5%" },
          { element: el.zirconium, range: "mín. 0.02%" },
          { element: el.others, range: "máx. 0.5%" },
        ],
        properties: [
          { label: prop.tensile, value: "440–520", unit: "MPa" },
          { label: prop.yield, value: "350–466", unit: "MPa" },
          { label: prop.elongation, value: "8–10", unit: "%" },
          { label: prop.hardnessRockwellB, value: "76–80" },
          { label: prop.hardnessBrinell, value: "139–149" },
          { label: prop.density, value: "8.90", unit: "kg/dm³" },
        ],
        thermalElectrical: [
          { label: prop.electrical, value: "78–82", unit: "%IACS" },
          { label: prop.thermal, value: "312–320", unit: "W/m·K" },
        ],
        formats: bi(["Tarugo", "Usinado", "Placa"], ["Billet", "Machined", "Plate"]),
        applications: bi(
          ["Porta-eletrodos", "Eletrodos e tampas de eletrodos automotivos", "Discos de solda de costura", "Braços robóticos de solda", "Moldes para fundição contínua", "Contatos elétricos, pinos e matrizes"],
          ["Electrode holders", "Automotive welding electrodes and caps", "Seam-welding discs", "Robotic welding arms", "Continuous-casting molds", "Electrical contacts, studs, and dies"],
        ),
        processes: bi(["Extrusão", "Forjamento"], ["Extrusion", "Forging"]),
      },
    ],
    applications: bi(
      ["Eletrodos de solda por resistência (automotiva)", "Braços robóticos de solda", "Moldes de fundição contínua", "Contatos elétricos e disjuntores"],
      ["Resistance welding electrodes (automotive)", "Robotic welding arms", "Continuous-casting molds", "Electrical contacts and breakers"],
    ),
  },
  {
    slug: "ligas-de-cobre-niquel-berilio",
    name: { pt: "Ligas de cobre-níquel-berílio", en: "Copper-nickel-beryllium alloys" },
    summary: {
      pt: "Alta resistência mecânica com baixa fração de berílio e condutividade superior ao CuNi2Be convencional.",
      en: "High mechanical strength with low beryllium content and conductivity above conventional CuNi2Be.",
    },
    longDescription: {
      pt: "Liga endurecível CuNiBe (0,2–0,6% Be) que atinge alta resistência mecânica entre os cobres tratados, com condutividade superior à CuNi2Be convencional — referência em eletrodos para solda de aço inox.",
      en: "Heat-treatable CuNiBe alloy (0.2–0.6% Be) reaching very high strength among heat-treated coppers, with conductivity above conventional CuNi2Be — the reference for stainless-steel welding electrodes.",
    },
    characteristics: bi(
      [
        "RWMA Classe 3 — alta resistência e condutividade",
        "Berílio reduzido (0,2–0,6%) e níquel 1,4–2,4%",
        "Condutividade térmica 252–260 W/m·°K",
        "Condutividade elétrica 58–62% IACS",
        "Resposta a tratamento térmico para máximo desempenho",
      ],
      [
        "RWMA Class 3 — high strength and conductivity",
        "Lower beryllium (0.2–0.6%) and 1.4–2.4% nickel",
        "Thermal conductivity 252–260 W/m·°K",
        "Electrical conductivity 58–62% IACS",
        "Heat-treatable for maximum performance",
      ],
    ),
    image: "/images/products/ligas-de-cobre-niquel-berilio.jpg",
    alloys: [
      {
        code: "BM 1751HT",
        slug: "bm-1751-c17510",
        uns: "C17510",
        rwmaClass: "Class 3",
        description: {
          pt: "Liga CuNiBe para eletrodos de solda por projeção e ponteamento, ferramental de molde plástico e componentes eletrônicos de alta potência.",
          en: "CuNiBe alloy for projection and spot welding electrodes, plastic-mold tooling, and high-power electronic components.",
        },
        image: "/images/products/ligas-de-cobre-niquel-berilio.jpg",
        composition: [
          { element: el.copper, range: "Remainder" },
          { element: el.beryllium, range: "0.2–0.6%" },
          { element: el.nickel, range: "1.4–2.4%" },
          { element: el.cobalt, range: "máx. 0.3%" },
          { element: el.others, range: "máx. 0.5%" },
        ],
        properties: [
          { label: prop.tensile, value: "795–915", unit: "MPa" },
          { label: prop.yield, value: "620–760", unit: "MPa" },
          { label: prop.elongation, value: "10–13", unit: "%" },
          { label: prop.hardnessRockwellB, value: "96–100" },
          { label: prop.hardnessBrinell, value: "215–241" },
          { label: prop.density, value: "8.75", unit: "kg/dm³" },
        ],
        thermalElectrical: [
          { label: prop.electrical, value: "58–62", unit: "%IACS" },
          { label: prop.thermal, value: "252–260", unit: "W/m·K" },
        ],
        formats: bi(["Tarugo", "Usinado", "Placa", "Fita"], ["Billet", "Machined", "Plate", "Strip"]),
        applications: bi(
          ["Equipamentos de solda por resistência", "Ferramental para moldes plásticos", "Eletrodos e porta-eletrodos", "Pistões de injeção", "Conectores, terminais e chaves"],
          ["Resistance welding equipment", "Plastic-mold tooling", "Electrodes and electrode holders", "Injection pistons", "Connectors, terminals, and switches"],
        ),
        processes: bi(["Laminação", "Extrusão", "Forjamento"], ["Rolling", "Extrusion", "Forging"]),
      },
    ],
    applications: bi(
      ["Eletrodos para solda por projeção e ponteamento", "Ferramental para moldes plásticos", "Conectores e contatos para eletrônica de alta potência"],
      ["Projection and spot welding electrodes", "Plastic-mold tooling", "Connectors and contacts for high-power electronics"],
    ),
  },
  {
    slug: "ligas-de-molibdenio",
    name: { pt: "Ligas de molibdênio", en: "Molybdenum alloys" },
    summary: {
      pt: "Estabilidade extrema em altas temperaturas (até 1.400 °C) e ambientes corrosivos.",
      en: "Extreme stability at high temperatures (up to 1,400 °C) and corrosive environments.",
    },
    longDescription: {
      pt: "Liga refratária Mo-Ti-Zr (TZM) com ponto de fusão de 2.623 °C, projetada para operar entre 700 °C e 1.400 °C em atmosferas não oxidantes, com grão refinado vs. molibdênio puro.",
      en: "Mo-Ti-Zr refractory alloy (TZM) with 2,623 °C melting point, designed to operate between 700 °C and 1,400 °C in non-oxidizing atmospheres, with refined grain vs. pure molybdenum.",
    },
    characteristics: bi(
      [
        "Composição: Mo (~99%), Ti (~0,5%), Zr (~0,1%)",
        "Faixa de operação 700–1.400 °C em ambientes não oxidantes",
        "Ponto de fusão 2.623 °C",
        "Estrutura de grão refinado — melhor soldabilidade",
        "Resistência a sais fluorados acima de 1.300 °C",
      ],
      [
        "Composition: Mo (~99%), Ti (~0.5%), Zr (~0.1%)",
        "Operating range 700–1,400 °C in non-oxidizing environments",
        "Melting point 2,623 °C",
        "Refined grain structure — better weldability",
        "Resistance to fluoride salts above 1,300 °C",
      ],
    ),
    image: "/images/products/ligas-de-molibdenio.jpg",
    alloys: [
      {
        code: "TZM",
        slug: "tzm-astmb387",
        astm: ["ASTM B387"],
        description: {
          pt: "Liga molibdênio-titânio-zircônio para ponteiras de câmara quente, componentes de fornos a vácuo, equipamentos de raio-X e estruturas aeroespaciais expostas a altas temperaturas.",
          en: "Molybdenum-titanium-zirconium alloy for hot-chamber casting tips, vacuum-furnace components, X-ray equipment, and aerospace structures exposed to high temperatures.",
        },
        image: "/images/alloys/tzm.jpg",
        composition: [
          { element: el.molybdenum, range: "Remainder" },
          { element: el.titanium, range: "máx. 0.5%" },
          { element: el.zirconium, range: "máx. 0.1%" },
          { element: el.others, range: "máx. 0.5%" },
        ],
        properties: [
          { label: prop.tensile, value: "750–800", unit: "MPa" },
          { label: prop.yield, value: "680–700", unit: "MPa" },
          { label: prop.elongation, value: "16–18", unit: "%" },
          { label: prop.hardnessRockwellB, value: "96–100" },
          { label: prop.hardnessBrinell, value: "215–241" },
          { label: prop.density, value: "10.25", unit: "kg/dm³" },
        ],
        thermalElectrical: [
          { label: prop.electrical, value: "28–32", unit: "%IACS" },
          { label: prop.thermal, value: "195–200", unit: "W/m·K" },
        ],
        formats: bi(["Tarugo", "Usinado"], ["Billet", "Machined"]),
        applications: bi(
          ["Ponteiras de câmara quente em fundição sob pressão", "Eletrodos para solda de contatos elétricos", "Serviço em alta temperatura até 1.400 °C", "Substituto do cobre-berílio onde se exige maior resistência à abrasão e condutividade térmica"],
          ["Hot-chamber die-casting tips", "Electrodes for welding electrical contacts", "High-temperature service up to 1,400 °C", "Substitute for beryllium copper where higher abrasion resistance and thermal conductivity are required"],
        ),
        processes: bi(["Metalurgia do pó"], ["Powder metallurgy"]),
      },
    ],
    applications: bi(
      ["Ponteiras de câmara quente em fundição sob pressão", "Operações em alta temperatura (até 1.400 °C)", "Alternativa ao cobre-berílio em aplicações que exigem maior abrasão e condutividade térmica"],
      ["Hot-chamber die-casting tips", "High-temperature operations (up to 1,400 °C)", "Alternative to beryllium copper where higher abrasion and thermal conductivity matter"],
    ),
  },
];

export const productFamilyBySlug = new Map(
  productFamilies.map((f) => [f.slug, f] as const),
);

export function alloyKey(familySlug: string, alloySlug: string) {
  return `${familySlug}/${alloySlug}`;
}

export const alloyBySlug = new Map(
  productFamilies.flatMap((f) =>
    f.alloys.map(
      (a) => [alloyKey(f.slug, a.slug), { family: f, alloy: a }] as const,
    ),
  ),
);
