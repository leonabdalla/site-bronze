export const company = {
  name: "Bronze Metal",
  foundedYear: 1980,
  email: "bronzemetal@bronzemetal.com.br",
  phone: "+55 11 5641-4361",
  phoneDisplay: "+55 (11) 5641-4361",
  whatsapp: {
    number: "5511945029980",
    display: "+55 (11) 94502-9980",
    href: "https://wa.me/5511945029980",
  },
  address: {
    street: "Rua Canto e Melo, 59",
    district: "Santo Amaro",
    city: "São Paulo",
    state: "SP",
    postalCode: "04756-100",
    country: { pt: "Brasil", en: "Brazil" },
  },
  certifications: ["ISO 9001"],
  social: {
    linkedin: "",
    instagram: "",
  },
} as const;

export type Company = typeof company;
