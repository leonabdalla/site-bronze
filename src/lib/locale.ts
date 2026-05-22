export type Locale = "pt" | "en" | "es" | "zh";
export type ContentLocale = "pt" | "en";

const CONTENT_FALLBACK: Record<Locale, ContentLocale> = {
  pt: "pt",
  en: "en",
  es: "pt",
  zh: "en",
};

export function toContentLocale(locale: string): ContentLocale {
  return CONTENT_FALLBACK[(locale as Locale) ?? "pt"] ?? "pt";
}
