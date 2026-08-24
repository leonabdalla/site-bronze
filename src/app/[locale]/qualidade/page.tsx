import Image from "next/image";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { Check, Download, ShieldCheck } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { IsoStamp } from "@/components/marketing/IsoStamp";
import { toContentLocale } from "@/lib/locale";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "iso" });
  return { title: t("title") };
}

export default async function IsoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("iso");
  const loc = toContentLocale(await getLocale());

  return (
    <>
      <section className="border-b border-slate-200 bg-paper-soft py-20">
        <Container className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div>
            <SectionEyebrow>{t("title")}</SectionEyebrow>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-ink md:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-600 leading-relaxed">
              {t("lead")}
            </p>
            <div className="mt-8">
              <IsoStamp locale={loc} size={132} />
            </div>
          </div>
          <div className="surface-card relative aspect-[4/5] overflow-hidden rounded-xl border border-slate-200 bg-paper">
            <Image
              src="/images/brand/iso-certificate-preview.jpg"
              alt={`${t("title")} — ${t("downloadTitle")}`}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-contain p-6"
            />
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-2xl font-semibold text-ink md:text-3xl">
              {t("whatTitle")}
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed md:text-lg">
              {t("what")}
            </p>

            <h3 className="mt-12 text-lg font-semibold text-ink">
              {t("principlesTitle")}
            </h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {t.raw("principles").map((p: string) => (
                <li
                  key={p}
                  className="surface-card flex items-start gap-3 rounded-lg p-4 text-sm text-slate-700"
                >
                  <Check size={16} aria-hidden className="mt-0.5 shrink-0 text-bronze-500" />
                  {p}
                </li>
              ))}
            </ul>

            <h3 className="mt-12 text-lg font-semibold text-ink">
              {t("benefitsTitle")}
            </h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {t.raw("benefits").map((b: string) => (
                <li
                  key={b}
                  className="flex items-start gap-3 text-sm text-slate-700"
                >
                  <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze-400" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <aside className="sticky top-28 self-start rounded-2xl bg-ink p-8 text-paper shadow-[var(--shadow-card)] md:p-10">
            <div className="flex items-center gap-3">
              <ShieldCheck size={22} aria-hidden className="text-bronze-300" />
              <h2 className="text-lg font-semibold">{t("downloadTitle")}</h2>
            </div>
            <p className="mt-4 text-sm text-paper/75 leading-relaxed">
              {t("downloadLead")}
            </p>
            <a
              href={
                locale === "pt"
                  ? "/catalogs/iso-9001-certificate-pt.pdf"
                  : "/catalogs/iso-9001-certificate-en.pdf"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-sm font-medium text-ink hover:bg-paper/90"
            >
              <Download size={14} aria-hidden />
              {t("downloadButton")}
            </a>
          </aside>
        </Container>
      </section>
    </>
  );
}
