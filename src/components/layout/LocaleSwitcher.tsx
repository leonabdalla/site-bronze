"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppPathname } from "@/i18n/routing";
import { useTransition } from "react";

export function LocaleSwitcher() {
  const t = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname() as AppPathname;
  const params = useParams();
  const [isPending, startTransition] = useTransition();

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
      className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.15em]"
      role="group"
      aria-label={t("switchLanguage")}
      aria-busy={isPending || undefined}
    >
      {routing.locales.map((code, i) => (
        <span key={code} className="flex items-center">
          {i > 0 && (
            <span aria-hidden className="mx-1 text-paper/30">
              /
            </span>
          )}
          <button
            type="button"
            onClick={() => switchTo(code)}
            aria-current={code === locale ? "true" : undefined}
            className={
              code === locale
                ? "text-bronze-300"
                : "text-paper/60 hover:text-paper transition-colors"
            }
          >
            {code === "pt" ? "PT" : "EN"}
          </button>
        </span>
      ))}
    </div>
  );
}
