import Image from "next/image";
import { getLocale } from "next-intl/server";
import { industries } from "@/data/industries";

export async function IndustryGrid() {
  const locale = (await getLocale()) as "pt" | "en";
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {industries.map((industry) => (
        <li
          key={industry.slug}
          className="surface-card overflow-hidden rounded-lg"
        >
          <div className="relative aspect-[3/2] bg-slate-100">
            <Image
              src={industry.image}
              alt={industry.name[locale]}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover img-cohesive"
            />
          </div>
          <div className="p-4">
            <h3 className="text-sm font-semibold text-ink">
              {industry.name[locale]}
            </h3>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              {industry.summary[locale]}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
