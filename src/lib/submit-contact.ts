import { company } from "@/data/company";
import type { ContactValues, CatalogRequestValues } from "./contact-schema";

type Locale = "pt" | "en";

const labels = {
  pt: {
    subjectGeneral: "Contato pelo site",
    subjectCatalog: (name: string) => `Solicitação de catálogo — ${name}`,
    name: "Nome",
    email: "E-mail",
    phone: "Telefone",
    company: "Empresa",
    message: "Mensagem",
    sentFrom: "Enviado pelo site",
  },
  en: {
    subjectGeneral: "Contact from the website",
    subjectCatalog: (name: string) => `Catalog request — ${name}`,
    name: "Name",
    email: "Email",
    phone: "Phone",
    company: "Company",
    message: "Message",
    sentFrom: "Sent from the website",
  },
} as const;

function buildMailto(to: string, subject: string, body: string) {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function submitContactRequest(values: ContactValues, locale: Locale) {
  if (values.honeypot) return;
  const L = labels[locale];
  const body = [
    `${L.name}: ${values.name}`,
    `${L.email}: ${values.email}`,
    values.phone ? `${L.phone}: ${values.phone}` : null,
    values.company ? `${L.company}: ${values.company}` : null,
    "",
    `${L.message}:`,
    values.message,
    "",
    `— ${L.sentFrom}`,
  ]
    .filter(Boolean)
    .join("\n");
  window.location.href = buildMailto(company.email, L.subjectGeneral, body);
}

export function submitCatalogRequest(
  values: CatalogRequestValues,
  catalogName: string,
  locale: Locale,
) {
  if (values.honeypot) return;
  const L = labels[locale];
  const body = [
    `${L.name}: ${values.name}`,
    `${L.email}: ${values.email}`,
    "",
    locale === "pt"
      ? `Catálogo solicitado: ${catalogName}`
      : `Requested catalog: ${catalogName}`,
    "",
    `— ${L.sentFrom}`,
  ].join("\n");
  window.location.href = buildMailto(
    company.email,
    L.subjectCatalog(catalogName),
    body,
  );
}
