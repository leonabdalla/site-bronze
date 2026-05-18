"use client";

import Image from "next/image";
import { useState } from "react";
import { Download, Mail } from "lucide-react";
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
            <a
              href={catalog.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-[3/4] overflow-hidden bg-slate-100"
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
                className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-ink/85 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.15em] text-paper backdrop-blur">
                PDF
              </div>
            </a>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-lg font-semibold text-ink">
                {catalog.name[locale]}
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-1">
                {catalog.description[locale]}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={catalog.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex h-9 items-center gap-2 rounded-full bg-ink px-4 text-xs font-medium text-paper hover:bg-ink-soft transition-colors"
                >
                  <Download size={14} aria-hidden />
                  {locale === "pt" ? "Baixar PDF" : "Download PDF"}
                </a>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setOpenSlug(catalog.slug)}
                >
                  <Mail size={14} aria-hidden />
                  {t("requestButton")}
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <CatalogRequestDialog
        open={open !== undefined}
        onClose={() => setOpenSlug(null)}
        catalogSlug={open?.slug ?? ""}
        catalogName={open ? open.name[locale] : ""}
        catalogPdf={open?.pdf ?? ""}
      />
    </>
  );
}
