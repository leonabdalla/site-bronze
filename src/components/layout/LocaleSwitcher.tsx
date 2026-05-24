"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppPathname } from "@/i18n/routing";
import { useTransition } from "react";

type Variant = "dark" | "light";

const variantStyles: Record<Variant, { sep: string; active: string; inactive: string }> = {
  dark: {
    sep: "text-paper/30",
    active: "text-bronze-300",
    inactive: "text-paper/60 hover:text-paper transition-colors",
  },
  light: {
    sep: "text-slate-300",
    active: "text-bronze-600",
    inactive: "text-slate-600 hover:text-ink transition-colors",
  },
};

export function LocaleSwitcher({
  variant = "dark",
  size = "sm",
}: {
  variant?: Variant;
  size?: "sm" | "md";
} = {}) {
  const t = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname() as AppPathname;
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const styles = variantStyles[variant];
  const fontSize = size === "md" ? "text-xs" : "text-[10px]";

  function switchTo(next: string) {
    if (next === locale) return;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- params shape varies by route
        { pathname, params },
        { locale: next },
      );
    });
  }

  return (
    <div
      className={`flex items-center gap-1 font-mono ${fontSize} uppercase tracking-[0.15em]`}
      role="group"
      aria-label={t("switchLanguage")}
      aria-busy={isPending || undefined}
    >
      {routing.locales.map((code, i) => (
        <span key={code} className="flex items-center">
          {i > 0 && (
            <span aria-hidden className={`mx-1 ${styles.sep}`}>
              /
            </span>
          )}
          <button
            type="button"
            onClick={() => switchTo(code)}
            aria-current={code === locale ? "true" : undefined}
            className={code === locale ? styles.active : styles.inactive}
          >
            {code.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
