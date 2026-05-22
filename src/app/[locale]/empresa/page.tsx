import Image from "next/image";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { ShieldCheck, Building2, Factory, ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { YearsStamp } from "@/components/marketing/YearsStamp";
import { IsoStamp } from "@/components/marketing/IsoStamp";
import { Link } from "@/i18n/navigation";
import { company } from "@/data/company";
import { toContentLocale } from "@/lib/locale";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "company" });
  return { title: t("title") };
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("company");
  const tTrust = await getTranslations("home.trust");
  const loc = toContentLocale(await getLocale());
  const yearsActive = new Date().getFullYear() - company.foundedYear;

  return (
    <>
      <section className="border-b border-slate-200 bg-paper-soft py-20">
        <Container className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <SectionEyebrow>{t("title")}</SectionEyebrow>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-ink md:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-600 leading-relaxed">
              {t("lead")}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <YearsStamp locale={loc} size={132} />
              <IsoStamp locale={loc} size={132} />
            </div>
          </div>
          <div className="relative aspect-[5/4] overflow-hidden rounded-xl">
            <Image
              src="/images/hero/company-hero.jpg"
              alt={t("title")}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover img-cohesive"
            />
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="grid gap-12 md:grid-cols-3">
          <ValueBlock
            icon={<Factory size={22} />}
            title={t("missionTitle")}
            body={t("mission")}
          />
          <ValueBlock
            icon={<Building2 size={22} />}
            title={t("visionTitle")}
            body={t("vision")}
          />
          <div>
            <span className="text-bronze-500" aria-hidden>
              <ShieldCheck size={22} />
            </span>
            <h2 className="mt-4 text-lg font-semibold text-ink">
              {t("valuesTitle")}
            </h2>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-slate-700">
              {t.raw("values").map((v: string) => (
                <li key={v} className="flex items-start gap-2">
                  <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze-400" />
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="border-t border-slate-200 bg-ink py-20 text-paper">
        <Container className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-center">
          <div className="flex flex-col gap-6">
            <SectionEyebrow>{tTrust("iso")}</SectionEyebrow>
            <a
              href={loc === "en" ? "/en/qualidade" : "/qualidade"}
              className="surface-card flex items-center gap-5 rounded-2xl bg-paper p-6 text-ink md:max-w-md hover:border-bronze-400"
            >
              <IsoStamp locale={loc} size={84} />
              <div className="flex-1">
                <div className="text-base font-semibold leading-tight">
                  {tTrust("iso")}
                </div>
                <div className="mt-1 text-sm text-slate-600 leading-relaxed">
                  {tTrust("isoSub")}
                </div>
              </div>
              <ArrowUpRight size={16} aria-hidden className="text-bronze-500" />
            </a>
            <div className="surface-card flex items-center gap-5 rounded-2xl bg-paper p-6 text-ink md:max-w-md">
              <YearsStamp locale={loc} size={84} />
              <div>
                <div className="text-base font-semibold leading-tight">
                  {tTrust("years", { years: yearsActive })}
                </div>
                <div className="mt-1 text-sm text-slate-600 leading-relaxed">
                  {tTrust("yearsSub", { since: company.foundedYear })}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-paper md:text-4xl">
              {t("capabilitiesTitle")}
            </h2>
            <p className="mt-5 text-pretty text-base text-paper/80 leading-relaxed md:text-lg">
              {t("capabilities")}
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}

function ValueBlock({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div>
      <span className="text-bronze-500" aria-hidden>
        {icon}
      </span>
      <h2 className="mt-4 text-lg font-semibold text-ink">{title}</h2>
      <p className="mt-3 text-sm text-slate-600 leading-relaxed">{body}</p>
    </div>
  );
}
