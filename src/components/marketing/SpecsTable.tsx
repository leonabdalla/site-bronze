import { getLocale, getTranslations } from "next-intl/server";
import type { Alloy } from "@/data/products";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";

export async function SpecsTable({
  alloys,
  familySlug,
}: {
  alloys: Alloy[];
  familySlug: string;
}) {
  const t = await getTranslations("products.specs");
  const loc = (await getLocale()) as "pt" | "en";

  const hasUns = alloys.some((a) => a.uns);
  const hasSae = alloys.some((a) => a.sae);
  const hasAstm = alloys.some((a) => a.astm && a.astm.length > 0);
  const hasAms = alloys.some((a) => a.ams && a.ams.length > 0);

  return (
    <div className="surface-card overflow-x-auto rounded-lg">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-[11px] font-mono uppercase tracking-[0.15em] text-slate-500">
          <tr>
            <th scope="col" className="px-4 py-3">
              {t("code")}
            </th>
            {hasUns && <th className="px-4 py-3" scope="col">{t("uns")}</th>}
            {hasSae && <th className="px-4 py-3" scope="col">{t("sae")}</th>}
            {hasAstm && <th className="px-4 py-3" scope="col">{t("astm")}</th>}
            {hasAms && <th className="px-4 py-3" scope="col">{t("ams")}</th>}
            <th className="px-4 py-3 text-right" scope="col">
              {loc === "pt" ? "Detalhes" : "Details"}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 font-mono text-sm">
          {alloys.map((a) => (
            <tr key={a.code} className="hover:bg-slate-50/60">
              <th
                scope="row"
                className="whitespace-nowrap px-4 py-3 font-semibold text-ink"
              >
                {a.code}
              </th>
              {hasUns && (
                <td className="px-4 py-3 text-slate-700">{a.uns ?? "—"}</td>
              )}
              {hasSae && (
                <td className="px-4 py-3 text-slate-700">{a.sae ?? "—"}</td>
              )}
              {hasAstm && (
                <td className="px-4 py-3 text-slate-700">
                  {a.astm?.join(", ") ?? "—"}
                </td>
              )}
              {hasAms && (
                <td className="px-4 py-3 text-slate-700">
                  {a.ams?.join(", ") ?? "—"}
                </td>
              )}
              <td className="px-4 py-3 text-right">
                <Link
                  href={{
                    pathname: "/produtos/[slug]/[alloy]",
                    params: { slug: familySlug, alloy: a.slug },
                  }}
                  className="inline-flex items-center gap-1 text-xs font-medium text-ink transition-colors hover:text-bronze-500"
                >
                  {loc === "pt" ? "Ver" : "View"}
                  <ArrowUpRight size={12} aria-hidden />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
