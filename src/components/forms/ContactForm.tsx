"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";

import { contactSchema, type ContactValues } from "@/lib/contact-schema";
import { submitContactRequest } from "@/lib/submit-contact";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const t = useTranslations("contactForm");
  const locale = useLocale() as "pt" | "en";
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
      honeypot: "",
    },
  });

  function onSubmit(values: ContactValues) {
    submitContactRequest(values, locale);
    setSubmitted(true);
  }

  function errorMessage(key?: string) {
    if (!key) return null;
    if (key === "email") return t("errors.email");
    if (key === "minMessage") return t("errors.minMessage");
    return t("errors.required");
  }

  if (submitted) {
    return (
      <div className="surface-card flex items-start gap-3 rounded-lg p-6">
        <CheckCircle2 className="mt-0.5 text-success" size={20} aria-hidden />
        <p className="text-sm text-ink leading-relaxed">{t("success")}</p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-5"
      aria-busy={isSubmitting || undefined}
    >
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        {...register("honeypot")}
        className="hidden"
      />

      <Field label={t("name")} error={errorMessage(errors.name?.message)}>
        <input
          {...register("name")}
          autoComplete="name"
          placeholder={t("namePlaceholder")}
          aria-invalid={!!errors.name}
          className="input"
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("email")} error={errorMessage(errors.email?.message)}>
          <input
            {...register("email")}
            type="email"
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            aria-invalid={!!errors.email}
            className="input"
          />
        </Field>

        <Field label={t("phone")}>
          <input
            {...register("phone")}
            type="tel"
            autoComplete="tel"
            placeholder={t("phonePlaceholder")}
            className="input"
          />
        </Field>
      </div>

      <Field label={t("company")}>
        <input
          {...register("company")}
          autoComplete="organization"
          placeholder={t("companyPlaceholder")}
          className="input"
        />
      </Field>

      <Field label={t("message")} error={errorMessage(errors.message?.message)}>
        <textarea
          {...register("message")}
          placeholder={t("messagePlaceholder")}
          rows={6}
          aria-invalid={!!errors.message}
          className="input resize-y min-h-[140px]"
        />
      </Field>

      <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
        {isSubmitting ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | null;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-mono uppercase tracking-[0.15em] text-slate-500">
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
      {error && (
        <span className="mt-1 block text-xs text-danger" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}
