import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getLocale } from "next-intl/server";
import { industries } from "@/data/industries";
import { Link } from "@/i18n/navigation";
import { toContentLocale } from "@/lib/locale";

export async function IndustryGrid() {
  const locale = toContentLocale(await getLocale());
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {industries.map((industry) => (
        <li key={industry.slug}>
          <Link
            href={{ pathname: "/industrias/[slug]", params: { slug: industry.slug } }}
            className="surface-card group block h-full overflow-hidden rounded-lg"
          >
            <div className="relative aspect-[3/2] bg-slate-100">
              <Image
                src={industry.image}
                alt={industry.name[locale]}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover img-cohesive transition-transform duration-300 group-hover:scale-105"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent opacity-90"
              />
              <div className="absolute inset-x-4 bottom-3 flex items-center justify-between text-paper">
                <h3 className="text-sm font-semibold drop-shadow-sm">
                  {industry.name[locale]}
                </h3>
                <ArrowUpRight size={14} aria-hidden className="opacity-80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
            <div className="p-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                {industry.summary[locale]}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

