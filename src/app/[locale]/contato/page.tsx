import { getTranslations, setRequestLocale } from "next-intl/server";
import { MapPin, Phone, Clock } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { ContactForm } from "@/components/forms/ContactForm";
import { company } from "@/data/company";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const loc = locale as "pt" | "en";

  return (
    <section className="py-20">
      <Container>
        <header className="max-w-2xl">
          <SectionEyebrow>{t("title")}</SectionEyebrow>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-5 text-lg text-slate-600 leading-relaxed">
            {t("lead")}
          </p>
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <ContactForm />

          <aside className="flex flex-col gap-8">
            <ContactBlock
              icon={<Phone size={16} />}
              title={t("channelsTitle")}
              items={[
                { label: company.phoneDisplay, href: `tel:${company.phone.replace(/\s|-/g, "")}` },
                { label: company.email, href: `mailto:${company.email}` },
                { label: `WhatsApp ${company.whatsapp.display}`, href: company.whatsapp.href },
              ]}
            />
            <ContactBlock
              icon={<MapPin size={16} />}
              title={t("addressTitle")}
              items={[
                {
                  label: `${company.address.street}, ${company.address.district}, ${company.address.city} — ${company.address.state}, ${company.address.postalCode}, ${company.address.country[loc]}`,
                  href: `https://maps.google.com/?q=${encodeURIComponent(
                    `${company.address.street}, ${company.address.city}`,
                  )}`,
                },
              ]}
            />
            <div className="surface-card flex items-center gap-3 rounded-lg p-5">
              <Clock size={16} aria-hidden className="text-bronze-500" />
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-slate-500">
                  {t("hoursTitle")}
                </div>
                <div className="mt-1 text-sm text-ink">{t("hours")}</div>
              </div>
            </div>
            <div className="surface-card overflow-hidden rounded-lg">
              <iframe
                title={t("addressTitle")}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  `${company.address.street}, ${company.address.city}, ${company.address.state}`,
                )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                className="h-72 w-full border-0"
                loading="lazy"
              />
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}

function ContactBlock({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">
        <span className="text-bronze-500" aria-hidden>
          {icon}
        </span>
        {title}
      </h2>
      <ul className="mt-3 flex flex-col gap-2 text-sm">
        {items.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-ink hover:text-bronze-500"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
