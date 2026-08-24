import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { LinkButton } from "@/components/ui/Button";
import { SpecsTable } from "@/components/marketing/SpecsTable";
import { Sparkles } from "lucide-react";
import { productFamilies, productFamilyBySlug } from "@/data/products";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { toContentLocale } from "@/lib/locale";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    productFamilies.map((f) => ({ locale, slug: f.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const family = productFamilyBySlug.get(slug);
  if (!family) return {};
  const loc = toContentLocale(locale);
  return {
    title: family.name[loc],
    description: family.summary[loc],
  };
}

export default async function ProductFamilyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const family = productFamilyBySlug.get(slug);
  if (!family) notFound();

  const loc = toContentLocale(await getLocale());
  const t = await getTranslations("products");
  const tNav = await getTranslations("nav");

  return (
    <>
      <section className="border-b border-slate-200 bg-paper-soft py-16 md:py-20">
        <Container className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div>
            <nav className="font-mono text-[11px] uppercase tracking-[0.15em] text-slate-500" aria-label="Breadcrumb">
              <Link href="/produtos" className="hover:text-ink">
                {tNav("products")}
              </Link>
              <span aria-hidden> · </span>
              <span className="text-ink">{family.name[loc]}</span>
            </nav>
            <h1
              className={
                family.alloys.length > 1
                  ? "mt-4 flex flex-col font-mono text-2xl font-semibold tracking-tight text-bronze-600 md:text-3xl"
                  : "mt-4 text-balance font-mono text-4xl font-semibold tracking-tight text-bronze-600 md:text-5xl"
              }
            >
              {family.alloys.length > 1
                ? family.alloys.map((a) => <span key={a.code}>{a.code}</span>)
                : family.alloys[0].code}
            </h1>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed">
              {family.longDescription[loc]}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <LinkButton href={loc === "pt" ? "/contato" : "/en/contact"} variant="primary">
                {t("askForDatasheet")}
                <ArrowRight size={16} aria-hidden />
              </LinkButton>
            </div>
          </div>
          <div className="relative aspect-[5/4] overflow-hidden rounded-xl bg-white">
            <Image
              src={family.image}
              alt={family.name[loc]}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-contain p-8"
              priority
            />
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <div className="flex flex-col gap-10">
            <div>
              <SectionEyebrow>
                <Sparkles size={11} aria-hidden /> {loc === "pt" ? "Características" : "Characteristics"}
              </SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold text-ink">
                {loc === "pt" ? "Características da família" : "Family characteristics"}
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {family.characteristics[loc].map((c) => (
                  <li key={c} className="flex items-start gap-3 text-sm text-slate-700">
                    <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze-400" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <SectionEyebrow>{t("applicationsHeading")}</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold text-ink">
                {t("applicationsHeading")}
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {family.applications[loc].map((app) => (
                  <li key={app} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-bronze-100 text-bronze-700">
                      <Check size={12} aria-hidden />
                    </span>
                    {app}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <SectionEyebrow>{t("alloyHeading")}</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold text-ink">
              {t("alloyHeading")}
            </h2>
            <ul className="mt-5 grid gap-3">
              {family.alloys.map((alloy) => (
                <li key={alloy.code} className="surface-card rounded-lg p-5">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-mono text-base font-semibold text-ink">
                      {alloy.code}
                    </span>
                    {alloy.uns && (
                      <span className="font-mono text-xs text-slate-500">
                        UNS {alloy.uns}
                      </span>
                    )}
                    {alloy.sae && (
                      <span className="font-mono text-xs text-slate-500">
                        {alloy.sae}
                      </span>
                    )}
                    {alloy.astm?.map((a) => (
                      <span key={a} className="font-mono text-xs text-slate-500">
                        {a}
                      </span>
                    ))}
                    {alloy.ams?.map((a) => (
                      <span key={a} className="font-mono text-xs text-slate-500">
                        {a}
                      </span>
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {alloy.description[loc]}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="border-t border-slate-200 bg-paper-soft py-20">
        <Container>
          <SectionEyebrow>{t("propertiesHeading")}</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-semibold text-ink">
            {t("propertiesHeading")}
          </h2>
          <div className="mt-7">
            <SpecsTable alloys={family.alloys} familySlug={family.slug} />
          </div>
        </Container>
      </section>
    </>
  );
}
