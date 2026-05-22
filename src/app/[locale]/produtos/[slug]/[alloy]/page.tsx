import Image from "next/image";
import { ArrowRight, Check, ArrowUpRight } from "lucide-react";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { LinkButton } from "@/components/ui/Button";
import { AlloyGallery } from "@/components/marketing/AlloyGallery";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { alloyBySlug, alloyKey, productFamilies, type PropertyRow } from "@/data/products";
import { getAlloyGallery } from "@/data/alloyGallery";
import { toContentLocale } from "@/lib/locale";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    productFamilies.flatMap((family) =>
      family.alloys.map((alloy) => ({
        locale,
        slug: family.slug,
        alloy: alloy.slug,
      })),
    ),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string; alloy: string }>;
}) {
  const { locale, slug, alloy } = await params;
  const entry = alloyBySlug.get(alloyKey(slug, alloy));
  if (!entry) return {};
  const loc = toContentLocale(locale);
  return {
    title: `${entry.alloy.code} · ${entry.family.name[loc]}`,
    description: entry.alloy.description[loc],
  };
}

export default async function AlloyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string; alloy: string }>;
}) {
  const { locale, slug, alloy } = await params;
  setRequestLocale(locale);
  const entry = alloyBySlug.get(alloyKey(slug, alloy));
  if (!entry) notFound();
  const { family, alloy: alloyData } = entry;
  const loc = toContentLocale(await getLocale());
  const t = await getTranslations("products");
  const tNav = await getTranslations("nav");

  const standards = [
    alloyData.uns && `UNS ${alloyData.uns}`,
    alloyData.sae,
    ...(alloyData.astm ?? []),
    ...(alloyData.ams ?? []),
    alloyData.rwmaClass && `RWMA ${alloyData.rwmaClass}`,
    ...(alloyData.otherStandards ?? []),
  ].filter(Boolean) as string[];

  const otherAlloys = family.alloys.filter((a) => a.slug !== alloyData.slug);
  const gallery = getAlloyGallery(alloyData.slug);

  return (
    <>
      <section className="border-b border-slate-200 bg-paper-soft py-16 md:py-20">
        <Container>
          <nav className="font-mono text-[11px] uppercase tracking-[0.15em] text-slate-500" aria-label="Breadcrumb">
            <Link href="/produtos" className="hover:text-ink">
              {tNav("products")}
            </Link>
            <span aria-hidden> · </span>
            <Link
              href={{ pathname: "/produtos/[slug]", params: { slug: family.slug } }}
              className="hover:text-ink"
            >
              {family.name[loc]}
            </Link>
            <span aria-hidden> · </span>
            <span className="text-ink">{alloyData.code}</span>
          </nav>

          <div className="mt-6 grid gap-12 md:grid-cols-[1.1fr_1fr] md:items-center">
            <div>
              <h1 className="text-balance text-4xl font-semibold tracking-tight text-ink md:text-5xl">
                <span className="font-mono">{alloyData.code}</span>
              </h1>
              {standards.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-slate-600">
                  {standards.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center rounded-full border border-slate-300 bg-paper px-3 py-1"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
              <p className="mt-5 text-lg text-slate-600 leading-relaxed">
                {alloyData.description[loc]}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <LinkButton href={loc === "pt" ? "/contato" : "/en/contact"} variant="primary">
                  {t("askForDatasheet")}
                  <ArrowRight size={16} aria-hidden />
                </LinkButton>
              </div>
            </div>
            {gallery.length > 0 ? (
              <AlloyGallery images={gallery} alt={alloyData.code} />
            ) : alloyData.image ? (
              <div className="relative aspect-[5/4] overflow-hidden rounded-xl bg-white">
                <Image
                  src={alloyData.image}
                  alt={alloyData.code}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-contain p-8"
                  priority
                />
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      {(alloyData.composition || alloyData.properties) && (
        <section className="py-20">
          <Container className="grid gap-12 lg:grid-cols-2">
            {alloyData.composition && (
              <div>
                <SectionEyebrow>
                  {loc === "pt" ? "Composição química" : "Chemical composition"}
                </SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold text-ink">
                  {loc === "pt" ? "Composição química" : "Chemical composition"}
                </h2>
                <DataTable
                  rows={alloyData.composition.map((row) => ({
                    label: row.element[loc],
                    value: row.range,
                  }))}
                />
              </div>
            )}

            {alloyData.properties && (
              <div>
                <SectionEyebrow>
                  {loc === "pt" ? "Propriedades mecânicas" : "Mechanical properties"}
                </SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold text-ink">
                  {loc === "pt" ? "Propriedades mecânicas" : "Mechanical properties"}
                </h2>
                <PropertyTable rows={alloyData.properties} loc={loc} />
                <p className="mt-3 text-xs text-slate-500 leading-relaxed">
                  {loc === "pt"
                    ? "Valores informativos. Variam conforme processo de fabricação, geometria e dimensional."
                    : "Informational values. Vary by manufacturing process, geometry, and dimensions."}
                </p>
              </div>
            )}
          </Container>
        </section>
      )}

      {(alloyData.thermalElectrical || alloyData.formats) && (
        <section className="border-t border-slate-200 bg-paper-soft py-20">
          <Container className="grid gap-12 lg:grid-cols-2">
            {alloyData.thermalElectrical && (
              <div>
                <SectionEyebrow>
                  {loc === "pt" ? "Térmicas e elétricas" : "Thermal & electrical"}
                </SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold text-ink">
                  {loc === "pt" ? "Propriedades térmicas e elétricas" : "Thermal & electrical properties"}
                </h2>
                <PropertyTable rows={alloyData.thermalElectrical} loc={loc} />
              </div>
            )}

            {alloyData.formats && (
              <div>
                <SectionEyebrow>
                  {loc === "pt" ? "Formatos disponíveis" : "Available formats"}
                </SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold text-ink">
                  {loc === "pt" ? "Formatos" : "Formats"}
                </h2>
                <div className="mt-5 flex flex-wrap gap-2">
                  {alloyData.formats[loc].map((fmt) => (
                    <span
                      key={fmt}
                      className="inline-flex items-center rounded-full border border-slate-300 bg-paper px-4 py-2 text-sm font-medium text-ink"
                    >
                      {fmt}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </Container>
        </section>
      )}

      {(alloyData.applications || alloyData.processes) && (
        <section className="py-20">
          <Container className="grid gap-12 md:grid-cols-[1.3fr_1fr]">
            {alloyData.applications && (
              <div>
                <SectionEyebrow>{t("applicationsHeading")}</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold text-ink">
                  {t("applicationsHeading")}
                </h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {alloyData.applications[loc].map((app) => (
                    <li key={app} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-bronze-100 text-bronze-700">
                        <Check size={12} aria-hidden />
                      </span>
                      {app}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {alloyData.processes && (
              <div>
                <SectionEyebrow>
                  {loc === "pt" ? "Processos" : "Manufacturing"}
                </SectionEyebrow>
                <h2 className="mt-3 text-2xl font-semibold text-ink">
                  {loc === "pt" ? "Processos de fabricação" : "Manufacturing processes"}
                </h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {alloyData.processes[loc].map((p) => (
                    <li
                      key={p}
                      className="surface-card rounded-lg px-4 py-3 text-sm text-ink"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Container>
        </section>
      )}

      {otherAlloys.length > 0 && (
        <section className="border-t border-slate-200 bg-paper-soft py-20">
          <Container>
            <SectionEyebrow>
              {loc === "pt" ? "Outras ligas da família" : "Other alloys in this family"}
            </SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold text-ink">
              {family.name[loc]}
            </h2>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {otherAlloys.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={{
                      pathname: "/produtos/[slug]/[alloy]",
                      params: { slug: family.slug, alloy: a.slug },
                    }}
                    className="surface-card group flex items-center justify-between rounded-lg p-5"
                  >
                    <div>
                      <div className="font-mono text-base font-semibold text-ink">
                        {a.code}
                      </div>
                      <p className="mt-1 text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {a.description[loc]}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={16}
                      aria-hidden
                      className="shrink-0 text-slate-400 transition-colors group-hover:text-bronze-500"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}

function DataTable({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <div className="surface-card mt-5 overflow-hidden rounded-lg">
      <table className="min-w-full text-left text-sm">
        <tbody className="divide-y divide-slate-200">
          {rows.map((r) => (
            <tr key={r.label} className="hover:bg-slate-50/60">
              <th scope="row" className="w-1/2 px-4 py-3 font-medium text-ink">
                {r.label}
              </th>
              <td className="px-4 py-3 font-mono text-slate-700">{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PropertyTable({
  rows,
  loc,
}: {
  rows: PropertyRow[];
  loc: "pt" | "en";
}) {
  return (
    <DataTable
      rows={rows.map((r) => ({
        label: r.label[loc],
        value: r.unit ? `${r.value} ${r.unit}` : r.value,
      }))}
    />
  );
}
