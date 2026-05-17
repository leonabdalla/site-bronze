import { getTranslations, setRequestLocale } from "next-intl/server";

import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { CatalogList } from "@/components/marketing/CatalogList";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "catalogs" });
  return { title: t("title") };
}

export default async function CatalogsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("catalogs");

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
        <div className="mt-12">
          <CatalogList />
        </div>
      </Container>
    </section>
  );
}
