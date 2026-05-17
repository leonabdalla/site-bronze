"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { X, CheckCircle2 } from "lucide-react";

import {
  catalogRequestSchema,
  type CatalogRequestValues,
} from "@/lib/contact-schema";
import { submitCatalogRequest } from "@/lib/submit-contact";
import { Button } from "@/components/ui/Button";

type Props = {
  open: boolean;
  onClose: () => void;
  catalogSlug: string;
  catalogName: string;
};

export function CatalogRequestDialog({
  open,
  onClose,
  catalogSlug,
  catalogName,
}: Props) {
  const t = useTranslations();
  const locale = useLocale() as "pt" | "en";
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CatalogRequestValues>({
    resolver: zodResolver(catalogRequestSchema),
    defaultValues: { name: "", email: "", catalog: catalogSlug, honeypot: "" },
  });

  useEffect(() => {
    if (open) {
      reset({ name: "", email: "", catalog: catalogSlug, honeypot: "" });
      setSubmitted(false);
    }
  }, [open, catalogSlug, reset]);

  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

  function onSubmit(values: CatalogRequestValues) {
    submitCatalogRequest(values, catalogName, locale);
    setSubmitted(true);
  }

  function errorMessage(key?: string) {
    if (!key) return null;
    if (key === "email") return t("contactForm.errors.email");
    return t("contactForm.errors.required");
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="catalog-dialog-title"
      className="fixed inset-0 z-50 grid place-items-center p-4"
    >
      <button
        type="button"
        aria-label={t("header.closeMenu")}
        onClick={onClose}
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
      />
      <div className="relative w-full max-w-md surface-card rounded-lg p-6">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-ink"
          aria-label={t("header.closeMenu")}
        >
          <X size={16} aria-hidden />
        </button>

        <h2
          id="catalog-dialog-title"
          className="text-lg font-semibold text-ink"
        >
          {t("catalogs.dialog.title", { name: catalogName })}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          {t("catalogs.dialog.description")}
        </p>

        {submitted ? (
          <div className="mt-5 flex items-start gap-3 rounded border border-slate-200 bg-slate-50 p-4">
            <CheckCircle2 className="mt-0.5 text-success" size={18} aria-hidden />
            <p className="text-sm text-ink leading-relaxed">
              {t("contactForm.success")}
            </p>
          </div>
        ) : (
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="mt-5 grid gap-4"
          >
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              {...register("honeypot")}
              className="hidden"
            />
            <input type="hidden" {...register("catalog")} />

            <label className="block">
              <span className="block text-xs font-mono uppercase tracking-[0.15em] text-slate-500">
                {t("contactForm.name")}
              </span>
              <input
                {...register("name")}
                autoComplete="name"
                placeholder={t("contactForm.namePlaceholder")}
                aria-invalid={!!errors.name}
                className="input mt-1.5"
              />
              {errors.name && (
                <span className="mt-1 block text-xs text-danger">
                  {errorMessage(errors.name.message)}
                </span>
              )}
            </label>

            <label className="block">
              <span className="block text-xs font-mono uppercase tracking-[0.15em] text-slate-500">
                {t("contactForm.email")}
              </span>
              <input
                {...register("email")}
                type="email"
                autoComplete="email"
                placeholder={t("contactForm.emailPlaceholder")}
                aria-invalid={!!errors.email}
                className="input mt-1.5"
              />
              {errors.email && (
                <span className="mt-1 block text-xs text-danger">
                  {errorMessage(errors.email.message)}
                </span>
              )}
            </label>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                disabled={isSubmitting}
              >
                {t("catalogs.dialog.cancel")}
              </Button>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {t("catalogs.dialog.submit")}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
