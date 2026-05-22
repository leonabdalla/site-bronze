import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { productFamilies } from "@/data/products";
import { ArrowUpRight } from "lucide-react";
import { toContentLocale } from "@/lib/locale";

export async function ProductGrid({ limit }: { limit?: number }) {
  const t = await getTranslations("products");
  const locale = toContentLocale(await getLocale());
  const list = typeof limit === "number" ? productFamilies.slice(0, limit) : productFamilies;
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((family) => (
        <li key={family.slug}>
          <Link
            href={{ pathname: "/produtos/[slug]", params: { slug: family.slug } }}
            className="surface-card group block h-full overflow-hidden rounded-lg"
          >
            <div className="relative aspect-[4/3] bg-slate-100">
              <Image
                src={family.image}
                alt={family.name[locale]}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bronze-500">
                {family.alloys.length}{" "}
                {locale === "pt" ? "ligas" : "alloys"}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-ink leading-snug">
                {family.name[locale]}
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {family.summary[locale]}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-ink transition-colors group-hover:text-bronze-500">
                {t("viewFamily")}
                <ArrowUpRight size={14} aria-hidden />
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

