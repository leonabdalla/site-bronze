"use client";

import Image from "next/image";
import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { catalogs } from "@/data/catalogs";
import { Button } from "@/components/ui/Button";
import { CatalogRequestDialog } from "./CatalogRequestDialog";

export function CatalogList() {
  const t = useTranslations("catalogs");
  const locale = useLocale() as "pt" | "en";
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const open = catalogs.find((c) => c.slug === openSlug);

  return (
    <>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {catalogs.map((catalog) => (
          <li
            key={catalog.slug}
            className="surface-card overflow-hidden rounded-lg flex flex-col"
          >
            <button
              type="button"
              onClick={() => setOpenSlug(catalog.slug)}
              className="group relative block aspect-[3/4] w-full overflow-hidden bg-slate-100 text-left"
              aria-label={catalog.name[locale]}
            >
              <Image
                src={catalog.cover}
                alt={catalog.name[locale]}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <div className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink/85 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.15em] text-paper backdrop-blur">
                <Lock size={10} aria-hidden />
                PDF
              </div>
            </button>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-lg font-semibold text-ink">
                {catalog.name[locale]}
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-1">
                {catalog.description[locale]}
              </p>
              <Button
                type="button"
                variant="primary"
                size="sm"
                className="mt-4 self-start"
                onClick={() => setOpenSlug(catalog.slug)}
              >
                <Mail size={14} aria-hidden />
                {t("requestButton")}
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <CatalogRequestDialog
        open={open !== undefined}
        onClose={() => setOpenSlug(null)}
        catalogSlug={open?.slug ?? ""}
        catalogName={open ? open.name[locale] : ""}
      />
    </>
  );
}
