import { getTranslations, setRequestLocale } from "next-intl/server";

import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { ProductGrid } from "@/components/marketing/ProductGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });
  return { title: t("indexTitle") };
}

export default async function ProductsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("products");

  return (
    <section className="py-20">
      <Container>
        <header className="max-w-2xl">
          <SectionEyebrow>{t("indexTitle")}</SectionEyebrow>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            {t("indexTitle")}
          </h1>
          <p className="mt-5 text-lg text-slate-600 leading-relaxed">
            {t("indexLead")}
          </p>
        </header>
        <div className="mt-12">
          <ProductGrid />
        </div>
      </Container>
    </section>
  );
}
