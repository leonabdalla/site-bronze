"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Menu, X, ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { productFamilies } from "@/data/products";
import { toContentLocale, type Locale } from "@/lib/locale";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function MobileNav() {
  const t = useTranslations();
  const locale = toContentLocale(useLocale() as Locale);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const drawer = (
    <div
      className="fixed inset-0 z-[100] md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label={t("header.openMenu")}
    >
      <button
        type="button"
        aria-label={t("header.closeMenu")}
        className="absolute inset-0 bg-ink/60"
        onClick={() => setOpen(false)}
      />
      <div className="absolute right-0 top-0 h-full w-[90%] max-w-sm overflow-y-auto bg-paper p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">
            Bronze Metal
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t("header.closeMenu")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200"
          >
            <X size={18} aria-hidden />
          </button>
        </div>
        <nav className="mt-8 flex flex-col gap-1">
          {[
            { key: "home", href: "/" as const },
            { key: "company", href: "/empresa" as const },
            { key: "applications", href: "/aplicacoes" as const },
            { key: "industries", href: "/industrias" as const },
            { key: "catalogs", href: "/catalogos" as const },
            { key: "contact", href: "/contato" as const },
          ].map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="flex items-center justify-between rounded-md py-3 text-lg font-medium text-ink hover:text-bronze-500"
              onClick={() => setOpen(false)}
            >
              {t(`nav.${item.key as "home" | "company" | "applications" | "industries" | "catalogs" | "contact"}`)}
              <ChevronRight size={16} aria-hidden />
            </Link>
          ))}
        </nav>
        <div className="mt-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
            {t("nav.products")}
          </div>
          <div className="mt-2 flex flex-col">
            {productFamilies.map((f) => (
              <Link
                key={f.slug}
                href={{ pathname: "/produtos/[slug]", params: { slug: f.slug } }}
                className="border-t border-slate-200 py-3 text-sm text-ink hover:text-bronze-500"
                onClick={() => setOpen(false)}
              >
                {f.name[locale]}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8 border-t border-slate-200 pt-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
            {t("header.switchLanguage")}
          </div>
          <div className="mt-3">
            <LocaleSwitcher variant="light" size="md" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t("header.openMenu")}
        className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-paper text-ink"
      >
        <Menu size={18} aria-hidden />
      </button>

      {open && mounted && createPortal(drawer, document.body)}
    </>
  );
}
