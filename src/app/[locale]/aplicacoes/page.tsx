import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { applications } from "@/data/applications";
import { productFamilyBySlug } from "@/data/products";
import { Link } from "@/i18n/navigation";
import { Placeholder } from "@/components/ui/Placeholder";

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
  const loc = (await getLocale()) as "pt" | "en";

  return (
    <section className="py-20">
      <Container>
        <header className="max-w-2xl">
          <SectionEyebrow>{t("title")}</SectionEyebrow>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-5 text-lg text-slate-600 leading-relaxed">
            {t("lead")}
          </p>
        </header>

        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {applications.map((app) => (
            <li key={app.slug} className="surface-card overflow-hidden rounded-lg">
              <Placeholder seed={`app-${app.slug}`} className="aspect-[16/9]" />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-ink">
                  {app.name[loc]}
                </h2>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {app.description[loc]}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {app.relatedFamilies.map((slug) => {
                    const family = productFamilyBySlug.get(slug);
                    if (!family) return null;
                    return (
                      <Link
                        key={slug}
                        href={{ pathname: "/produtos/[slug]", params: { slug } }}
                        className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-xs font-mono uppercase tracking-[0.1em] text-slate-700 hover:border-bronze-400 hover:text-bronze-500"
                      >
                        {family.name[loc]}
                        <ArrowUpRight size={11} aria-hidden />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
