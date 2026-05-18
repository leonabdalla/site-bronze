"use client";

import Image from "next/image";
import { useState } from "react";
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
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {catalogs.map((catalog) => (
          <li
            key={catalog.slug}
            className="surface-card overflow-hidden rounded-lg flex flex-col"
          >
            <div className="relative aspect-[3/4] bg-slate-100">
              <Image
                src={catalog.cover}
                alt={catalog.name[locale]}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover img-cohesive"
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-lg font-semibold text-ink">
                {catalog.name[locale]}
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-1">
                {catalog.description[locale]}
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4 self-start"
                onClick={() => setOpenSlug(catalog.slug)}
              >
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
