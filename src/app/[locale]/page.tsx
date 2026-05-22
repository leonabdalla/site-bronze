import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { LinkButton } from "@/components/ui/Button";
import { HeroCarousel } from "@/components/marketing/HeroCarousel";
import { ProductGrid } from "@/components/marketing/ProductGrid";
import { IndustryGrid } from "@/components/marketing/IndustryGrid";
import { TrustStrip } from "@/components/marketing/TrustStrip";
import { toContentLocale } from "@/lib/locale";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tNav = await getTranslations("nav");
  const tLocale = toContentLocale(await getLocale());

  const slides = [
    {
      eyebrow: t("hero.eyebrow"),
      title: t("hero.title"),
      body: t("hero.subtitle"),
      image: "/images/hero/company-hero.jpg",
    },
    {
      eyebrow: tLocale === "pt" ? "Engenharia metalúrgica" : "Metallurgical engineering",
      title:
        tLocale === "pt"
          ? "Especificação correta para cada projeto."
          : "The right specification for every project.",
      body:
        tLocale === "pt"
          ? "Equipe técnica orienta a escolha da liga, do tratamento e da geometria — antes da primeira peça."
          : "Our technical team guides alloy, treatment, and geometry choices — before the first part.",
      image: "/images/products/ligas-de-bronze-aluminio.jpg",
    },
    {
      eyebrow: tLocale === "pt" ? "Cadeia internacional" : "International supply",
      title:
        tLocale === "pt"
          ? "Materiais selecionados em escala global."
          : "Materials sourced from a global supply chain.",
      body:
        tLocale === "pt"
          ? "Trabalhamos com produtos internacionais para entregar a melhor relação preço × qualidade em cada especificação."
          : "We work with international products to deliver the best price-to-quality ratio for every spec.",
      image: "/images/hero/global-sourcing.jpg",
    },
  ];

  return (
    <>
      <HeroCarousel slides={slides} />

      <Container className="-mt-14 mb-16 relative z-10">
        <TrustStrip />
      </Container>

      <section className="py-24">
        <Container>
          <header className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <SectionEyebrow>{t("productsSection.eyebrow")}</SectionEyebrow>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                {t("productsSection.title")}
              </h2>
            </div>
            <Link
              href="/produtos"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-bronze-500"
            >
              {t("productsSection.viewAll")}
              <ArrowRight size={14} aria-hidden />
            </Link>
          </header>
          <ProductGrid />
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-paper-soft py-24">
        <Container>
          <header className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <SectionEyebrow>{t("industriesSection.eyebrow")}</SectionEyebrow>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                {t("industriesSection.title")}
              </h2>
            </div>
            <Link
              href="/industrias"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-bronze-500"
            >
              {t("industriesSection.viewAll")}
              <ArrowRight size={14} aria-hidden />
            </Link>
          </header>
          <IndustryGrid />
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="rounded-2xl bg-ink p-10 text-paper shadow-[var(--shadow-card)] md:p-14">
            <div className="grid gap-8 md:grid-cols-[2fr_1fr] md:items-end">
              <div>
                <SectionEyebrow>{tNav("contact")}</SectionEyebrow>
                <h2 className="mt-3 max-w-xl text-balance text-3xl font-semibold tracking-tight text-paper md:text-4xl">
                  {t("cta.title")}
                </h2>
                <p className="mt-4 max-w-xl text-pretty text-base text-paper/75">
                  {t("cta.subtitle")}
                </p>
              </div>
              <div className="flex md:justify-end">
                <LinkButton href={tLocale === "pt" ? "/contato" : "/en/contact"} variant="secondary" size="lg">
                  {t("cta.button")}
                  <ArrowRight size={16} aria-hidden />
                </LinkButton>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

