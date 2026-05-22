import type { Bilingual } from "./products";

export type Application = {
  slug: string;
  name: Bilingual;
  product: Bilingual;
  segment: Bilingual;
  description: Bilingual;
  image: string;
  relatedFamilies: string[];
};

export const applications: Application[] = [
  {
    slug: "engrenagem-de-maquina-bm954",
    name: { pt: "Engrenagem de máquina", en: "Machine gear" },
    product: { pt: "BM 954", en: "BM 954" },
    segment: { pt: "Manutenção industrial", en: "Industrial maintenance" },
    description: {
      pt: "Engrenagem de equipamento rotativo fundida em bronze-alumínio (C95400) — combinação de tenacidade e resistência ao desgaste para reposição em linhas industriais.",
      en: "Rotating-equipment gear cast in aluminum bronze (C95400) — toughness plus wear resistance for industrial line replacement.",
    },
    image: "/images/applications/bm954-machine-gear.jpg",
    relatedFamilies: ["ligas-de-bronze-aluminio"],
  },
  {
    slug: "wiper-die-bm954",
    name: { pt: "Wiper die (dobra de tubos)", en: "Wiper die (tube bending)" },
    product: { pt: "BM 954", en: "BM 954" },
    segment: { pt: "Ferramental de dobra", en: "Bending tooling" },
    description: {
      pt: "Wiper die em bronze-alumínio para dobra de tubos com paredes finas — superfície lisa que reduz marcas e prolonga a vida útil do ferramental.",
      en: "Aluminum bronze wiper die for thin-wall tube bending — smooth surface that reduces marks and extends tool life.",
    },
    image: "/images/applications/bm954-wiper-die.jpg",
    relatedFamilies: ["ligas-de-bronze-aluminio"],
  },
  {
    slug: "balde-18l-bm1751ht",
    name: { pt: "Balde de 18 L (molde de injeção)", en: "18 L bucket (injection mold)" },
    product: { pt: "BM 1751 HT", en: "BM 1751 HT" },
    segment: { pt: "Molde de injeção plástica", en: "Plastic injection mold" },
    description: {
      pt: "Inserto de molde para balde de 18 litros em cobre-níquel-berílio (C17510): alta condutividade térmica acelera o resfriamento e encurta o ciclo de injeção.",
      en: "Mold insert for 18-liter bucket in copper-nickel-beryllium (C17510): high thermal conductivity accelerates cooling and shortens the injection cycle.",
    },
    image: "/images/applications/bm1751ht-18l-bucket.jpg",
    relatedFamilies: ["ligas-de-cobre-niquel-berilio"],
  },
  {
    slug: "three-balls-mandrel-bm280ht",
    name: { pt: "Mandril de três esferas", en: "Three-ball mandrel" },
    product: { pt: "BM 280 HT", en: "BM 280 HT" },
    segment: { pt: "Ferramental de dobra", en: "Bending tooling" },
    description: {
      pt: "Mandril articulado de três esferas em bronze-alumínio-níquel (C63000 tratada) para dobra de tubos de raio curto sem colapso da seção.",
      en: "Three-ball articulated mandrel in nickel-aluminum bronze (heat-treated C63000) for tight-radius tube bending without section collapse.",
    },
    image: "/images/applications/bm280ht-three-balls-mandrel.jpg",
    relatedFamilies: ["ligas-de-bronze-aluminio-niquel"],
  },
  {
    slug: "deep-drawing-plate-bm380",
    name: { pt: "Placa e punção de embutimento profundo", en: "Deep-drawing plate and punch" },
    product: { pt: "BM 380", en: "BM 380" },
    segment: { pt: "Conformação de metais", en: "Metal forming" },
    description: {
      pt: "Placa e punção em bronze-alumínio de alta dureza para operações de embutimento profundo — resistência à abrasão sob carga severa.",
      en: "High-hardness aluminum bronze plate and punch for deep-drawing operations — abrasion resistance under severe loads.",
    },
    image: "/images/applications/bm380-deep-drawing-plate.jpg",
    relatedFamilies: ["ligas-de-bronze-aluminio"],
  },
  {
    slug: "plunger-tip-bm180",
    name: { pt: "Plunger tip (injeção de alumínio)", en: "Plunger tip (aluminum die casting)" },
    product: { pt: "BM 180", en: "BM 180" },
    segment: { pt: "Fundição sob pressão de alumínio", en: "Aluminum die casting" },
    description: {
      pt: "Plunger tip em cobre-cromo-níquel-silício (C18000) para máquinas de fundição sob pressão: condutividade térmica e resistência a alta temperatura.",
      en: "Plunger tip in copper-chromium-nickel-silicon (C18000) for die-casting machines: thermal conductivity and high-temperature strength.",
    },
    image: "/images/applications/bm180-plunger-tip.jpg",
    relatedFamilies: ["ligas-de-cobre-cromo-niquel-silicio"],
  },
  {
    slug: "carenagem-honda-bm172ht",
    name: { pt: "Molde de carenagem Honda", en: "Honda fairing mold" },
    product: { pt: "BM 172 HT", en: "BM 172 HT" },
    segment: { pt: "Molde de injeção plástica", en: "Plastic injection mold" },
    description: {
      pt: "Inserto de molde para carenagem em cobre-berílio (C17200) — refrigeração uniforme e acabamento superficial estável após milhares de ciclos.",
      en: "Mold insert for motorcycle fairing in beryllium copper (C17200) — uniform cooling and stable surface finish across thousands of cycles.",
    },
    image: "/images/applications/bm172ht-honda-fairing.jpg",
    relatedFamilies: ["ligas-de-cobre-berilio"],
  },
  {
    slug: "roller-slippers-bm954ht",
    name: { pt: "Patins de rolo (siderurgia)", en: "Roller slippers (steel industry)" },
    product: { pt: "BM 954 HT", en: "BM 954 HT" },
    segment: { pt: "Siderurgia", en: "Steel industry" },
    description: {
      pt: "Patins de rolos em bronze-alumínio tratado para mesas de lingotamento — operação contínua sob carga e temperatura elevadas.",
      en: "Heat-treated aluminum bronze roller slippers for casting tables — continuous operation under high load and temperature.",
    },
    image: "/images/applications/bm954ht-roller-slippers.jpg",
    relatedFamilies: ["ligas-de-bronze-aluminio"],
  },
  {
    slug: "eletrodos-solda-bm1815",
    name: { pt: "Eletrodos de solda (ponto e projeção)", en: "Welding electrodes (spot & projection)" },
    product: { pt: "BM 1815", en: "BM 1815" },
    segment: { pt: "Solda por resistência", en: "Resistance welding" },
    description: {
      pt: "Eletrodos em cobre-cromo-zircônio (C18150) para solda a ponto e por projeção: condutividade elétrica próxima do cobre puro e vida útil prolongada.",
      en: "Copper-chromium-zirconium (C18150) electrodes for spot and projection welding: electrical conductivity close to pure copper and extended service life.",
    },
    image: "/images/applications/bm1815-welding-electrodes.jpg",
    relatedFamilies: ["ligas-de-cobre-cromo-zirconio"],
  },
];
