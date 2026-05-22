"use client";

import { useId, useRef, useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { productFamilies } from "@/data/products";
import { toContentLocale, type Locale } from "@/lib/locale";

export function ProductsMenu() {
  const t = useTranslations("nav");
  const locale = toContentLocale(useLocale() as Locale);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onEsc);
    return () => {
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 text-sm font-medium text-ink hover:text-bronze-500 transition-colors"
      >
        {t("products")}
        <ChevronDown size={14} aria-hidden className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <div
        id={id}
        role="menu"
        hidden={!open}
        className="absolute left-1/2 top-full z-30 w-[420px] -translate-x-1/2 pt-2"
      >
        <div className="surface-card grid grid-cols-1 gap-1 rounded-md p-2 sm:grid-cols-2">
          {productFamilies.map((f) => (
            <Link
              key={f.slug}
              role="menuitem"
              href={{ pathname: "/produtos/[slug]", params: { slug: f.slug } }}
              className="block rounded px-3 py-2 text-sm text-ink hover:bg-slate-100"
              onClick={() => setOpen(false)}
            >
              <span className="block font-medium">{f.name[locale]}</span>
              <span className="block text-xs text-slate-500">{f.summary[locale]}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

