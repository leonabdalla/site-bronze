import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";

import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { applications } from "@/data/applications";
import { productFamilyBySlug } from "@/data/products";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "applications" });
  return { title: t("title") };
}

export default async function ApplicationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("applications");
  const tProducts = await getTranslations("products");
  const loc = (await getLocale()) as "pt" | "en";

  return (
    <>
      <section className="border-b border-slate-200 bg-paper-soft py-20">
        <Container className="max-w-3xl">
          <SectionEyebrow>{t("title")}</SectionEyebrow>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-5 text-lg text-slate-600 leading-relaxed">
            {t("lead")}
          </p>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <ul className="space-y-16 md:space-y-24">
            {applications.map((app, idx) => {
              const reverse = idx % 2 === 1;
              const counter = String(idx + 1).padStart(2, "0");
              return (
                <li
                  key={app.slug}
                  className="grid gap-8 md:grid-cols-2 md:items-center md:gap-14"
                >
                  <div
                    className={`relative aspect-[5/4] overflow-hidden rounded-2xl bg-slate-100 ${
                      reverse ? "md:order-2" : ""
                    }`}
                  >
                    <Image
                      src={app.image}
                      alt={app.name[loc]}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover img-cohesive transition-transform duration-500 hover:scale-[1.03]"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent"
                    />
                    <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-paper/95 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink shadow-sm backdrop-blur">
                      <span className="text-bronze-500">{counter}</span>
                      <span className="h-3 w-px bg-slate-300" aria-hidden />
                      <span>{t("title")}</span>
                    </div>
                  </div>

                  <div className={reverse ? "md:order-1" : ""}>
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-bronze-500">
                      {loc === "pt" ? "Aplicação" : "Application"} {counter}
                    </span>
                    <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                      {app.name[loc]}
                    </h2>
                    <p className="mt-4 text-base text-slate-600 leading-relaxed md:text-lg">
                      {app.description[loc]}
                    </p>
                    <div className="mt-6">
                      <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                        {tProducts("alloyHeading")}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {app.relatedFamilies.map((slug) => {
                          const family = productFamilyBySlug.get(slug);
                          if (!family) return null;
                          return (
                            <Link
                              key={slug}
                              href={{ pathname: "/produtos/[slug]", params: { slug } }}
                              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-paper px-3.5 py-1.5 text-xs font-medium text-ink transition-all hover:border-bronze-400 hover:bg-bronze-50 hover:text-bronze-700"
                            >
                              {family.name[loc]}
                              <ArrowUpRight size={12} aria-hidden />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>
    </>
  );
}
