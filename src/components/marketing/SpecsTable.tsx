import { getLocale, getTranslations } from "next-intl/server";
import type { Alloy } from "@/data/products";

export async function SpecsTable({ alloys }: { alloys: Alloy[] }) {
  const t = await getTranslations("products.specs");
  const locale = (await getLocale()) as "pt" | "en";

  const rows = alloys.map((a) => ({
    code: a.code,
    uns: a.uns,
    sae: a.sae,
    astm: a.astm?.join(", "),
    ams: a.ams?.join(", "),
    tensile:
      a.properties?.tensileMpa !== undefined
        ? `${a.properties.tensileMpa} MPa`
        : null,
    hardness: a.properties?.hardness,
    thermal:
      a.properties?.thermalConductivityWmK !== undefined
        ? `${a.properties.thermalConductivityWmK} W/m·K`
        : null,
    melting:
      a.properties?.meltingC !== undefined
        ? `${a.properties.meltingC[0]}–${a.properties.meltingC[1]} °C`
        : null,
    description: a.description[locale],
  }));

  const hasAny = (key: keyof (typeof rows)[number]) =>
    rows.some((r) => Boolean(r[key]));

  return (
    <div className="surface-card overflow-x-auto rounded-lg">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-[11px] font-mono uppercase tracking-[0.15em] text-slate-500">
          <tr>
            <th scope="col" className="px-4 py-3">
              {t("code")}
            </th>
            {hasAny("uns") && <th className="px-4 py-3" scope="col">{t("uns")}</th>}
            {hasAny("sae") && <th className="px-4 py-3" scope="col">{t("sae")}</th>}
            {hasAny("astm") && <th className="px-4 py-3" scope="col">{t("astm")}</th>}
            {hasAny("ams") && <th className="px-4 py-3" scope="col">{t("ams")}</th>}
            {hasAny("tensile") && <th className="px-4 py-3" scope="col">{t("tensile")}</th>}
            {hasAny("hardness") && <th className="px-4 py-3" scope="col">{t("hardness")}</th>}
            {hasAny("thermal") && <th className="px-4 py-3" scope="col">{t("thermal")}</th>}
            {hasAny("melting") && <th className="px-4 py-3" scope="col">{t("melting")}</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 font-mono text-sm">
          {rows.map((r) => (
            <tr key={r.code} className="hover:bg-slate-50/60">
              <th scope="row" className="whitespace-nowrap px-4 py-3 font-semibold text-ink">
                {r.code}
              </th>
              {hasAny("uns") && <td className="px-4 py-3 text-slate-700">{r.uns ?? "—"}</td>}
              {hasAny("sae") && <td className="px-4 py-3 text-slate-700">{r.sae ?? "—"}</td>}
              {hasAny("astm") && <td className="px-4 py-3 text-slate-700">{r.astm ?? "—"}</td>}
              {hasAny("ams") && <td className="px-4 py-3 text-slate-700">{r.ams ?? "—"}</td>}
              {hasAny("tensile") && <td className="px-4 py-3 text-slate-700">{r.tensile ?? "—"}</td>}
              {hasAny("hardness") && <td className="px-4 py-3 text-slate-700">{r.hardness ?? "—"}</td>}
              {hasAny("thermal") && <td className="px-4 py-3 text-slate-700">{r.thermal ?? "—"}</td>}
              {hasAny("melting") && <td className="px-4 py-3 text-slate-700">{r.melting ?? "—"}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
