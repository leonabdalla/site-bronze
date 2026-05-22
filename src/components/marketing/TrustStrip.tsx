import { Wrench } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { company } from "@/data/company";
import { YearsStamp } from "./YearsStamp";
import { IsoStamp } from "./IsoStamp";
import { toContentLocale } from "@/lib/locale";

export async function TrustStrip() {
  const t = await getTranslations("home.trust");
  const locale = toContentLocale(await getLocale());
  const yearsActive = new Date().getFullYear() - company.foundedYear;
  return (
    <div className="surface-card grid grid-cols-1 overflow-hidden rounded-2xl bg-paper sm:grid-cols-3">
      <Card
        media={<IsoStamp locale={locale} size={84} />}
        title={t("iso")}
        sub={t("isoSub")}
      />
      <Card
        media={<YearsStamp locale={locale} size={84} />}
        title={t("years", { years: yearsActive })}
        sub={t("yearsSub", { since: company.foundedYear })}
      />
      <Card
        media={
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-bronze-50 text-bronze-500">
            <Wrench size={28} aria-hidden strokeWidth={1.5} />
          </div>
        }
        title={t("support")}
        sub={t("supportSub")}
      />
    </div>
  );
}

function Card({
  media,
  title,
  sub,
}: {
  media: React.ReactNode;
  title: string;
  sub: string;
}) {
  return (
    <div className="flex items-center gap-5 border-slate-200 p-6 not-last:border-b sm:not-last:border-b-0 sm:not-last:border-r md:p-7">
      <span aria-hidden className="shrink-0">{media}</span>
      <div className="min-w-0">
        <div className="text-base font-semibold text-ink leading-tight">{title}</div>
        <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-slate-500">
          {sub}
        </div>
      </div>
    </div>
  );
}

