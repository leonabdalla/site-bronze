import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { LinkButton } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { industries, industryBySlug } from "@/data/industries";
import { productFamilyBySlug } from "@/data/products";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    industries.map((industry) => ({ locale, slug: industry.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const industry = industryBySlug.get(slug);
  if (!industry) return {};
  const loc = locale as "pt" | "en";
  return {
    title: industry.name[loc],
    description: industry.summary[loc],
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const industry = industryBySlug.get(slug);
  if (!industry) notFound();
  const loc = (await getLocale()) as "pt" | "en";
  const tNav = await getTranslations("nav");
  const t = await getTranslations("products");

  const families = industry.relatedFamilies
    .map((s) => productFamilyBySlug.get(s))
    .filter((f): f is NonNullable<typeof f> => Boolean(f));

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-paper">
        <Image
          src={industry.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover img-cohesive"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/80 to-ink/40" />
        <Container className="relative grid min-h-[420px] items-center py-20">
          <nav
            className="font-mono text-[11px] uppercase tracking-[0.15em] text-paper/70"
            aria-label="Breadcrumb"
          >
            <Link href="/industrias" className="hover:text-paper">
              {tNav("industries")}
            </Link>
            <span aria-hidden> · </span>
            <span className="text-paper">{industry.name[loc]}</span>
          </nav>
          <div className="mt-4 max-w-2xl">
            <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
              {industry.name[loc]}
            </h1>
            <p className="mt-5 text-pretty text-base text-paper/85 md:text-lg">
              {industry.summary[loc]}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <header className="max-w-2xl">
            <SectionEyebrow>
              {loc === "pt" ? "Ligas indicadas" : "Recommended alloys"}
            </SectionEyebrow>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              {loc === "pt"
                ? "Famílias de ligas para este setor"
                : "Alloy families for this sector"}
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              {loc === "pt"
                ? "Selecionamos as famílias com melhor desempenho técnico e econômico para os componentes mais comuns deste mercado."
                : "We selected the families with the best technical and economic fit for the most common components in this market."}
            </p>
          </header>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {families.map((family) => (
              <li key={family.slug}>
                <Link
                  href={{ pathname: "/produtos/[slug]", params: { slug: family.slug } }}
                  className="surface-card group flex h-full flex-col overflow-hidden rounded-lg"
                >
                  <div className="relative aspect-[4/3] bg-slate-100">
                    <Image
                      src={family.image}
                      alt={family.name[loc]}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-ink leading-snug">
                      {family.name[loc]}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {family.summary[loc]}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-ink transition-colors group-hover:text-bronze-500">
                      {t("viewFamily")}
                      <ArrowUpRight size={14} aria-hidden />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-slate-200 bg-paper-soft py-20">
        <Container>
          <div className="surface-card rounded-2xl bg-ink p-10 text-paper md:p-14">
            <div className="grid gap-8 md:grid-cols-[2fr_1fr] md:items-end">
              <div>
                <SectionEyebrow>{tNav("contact")}</SectionEyebrow>
                <h2 className="mt-3 max-w-xl text-balance text-3xl font-semibold tracking-tight text-paper md:text-4xl">
                  {loc === "pt"
                    ? `Projetando para ${industry.name.pt.toLowerCase()}?`
                    : `Designing for the ${industry.name.en.toLowerCase()} sector?`}
                </h2>
                <p className="mt-4 max-w-xl text-pretty text-base text-paper/75">
                  {loc === "pt"
                    ? "Compartilhe especificações, prazos e quantidades. Nossa equipe responde com recomendação técnica e estimativa."
                    : "Share specifications, deadlines, and quantities. Our team responds with a technical recommendation and estimate."}
                </p>
              </div>
              <div className="flex md:justify-end">
                <LinkButton href={loc === "pt" ? "/contato" : "/en/contact"} variant="secondary" size="lg">
                  {loc === "pt" ? "Falar com engenharia" : "Talk to engineering"}
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
