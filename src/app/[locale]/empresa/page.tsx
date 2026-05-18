import { getTranslations, setRequestLocale } from "next-intl/server";
import { ShieldCheck, Award, Building2, Factory } from "lucide-react";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { company } from "@/data/company";

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
            <dl className="mt-8 grid grid-cols-2 gap-6">
              <Stat icon={<Award size={16} />} label={t("title")} value={`${yearsActive}+`} suffix={locale === "pt" ? "anos" : "years"} />
              <Stat icon={<ShieldCheck size={16} />} label="ISO 9001" value="✓" suffix={locale === "pt" ? "certificado" : "certified"} />
            </dl>
          </div>
          <div className="relative aspect-[5/4] overflow-hidden rounded-xl">
            <Image
              src="/images/hero/main.jpg"
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
              <Award size={22} />
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
          <div>
            <SectionEyebrow>{t("capabilitiesTitle")}</SectionEyebrow>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-paper md:text-4xl">
              {t("capabilitiesTitle")}
            </h2>
          </div>
          <p className="text-pretty text-base text-paper/80 leading-relaxed md:text-lg">
            {t("capabilities")}
          </p>
        </Container>
      </section>
    </>
  );
}

function Stat({
  icon,
  label,
  value,
  suffix,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  suffix: string;
}) {
  return (
    <div className="surface-card rounded-lg p-5">
      <span className="text-bronze-500" aria-hidden>
        {icon}
      </span>
      <div className="mt-3 font-mono text-3xl font-semibold text-ink">
        {value}{" "}
        <span className="text-sm font-medium text-slate-500">{suffix}</span>
      </div>
      <span className="sr-only">{label}</span>
    </div>
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
