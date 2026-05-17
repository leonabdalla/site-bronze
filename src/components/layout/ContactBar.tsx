import { Mail, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { company } from "@/data/company";
import { Container } from "@/components/ui/Container";
import { LocaleSwitcher } from "./LocaleSwitcher";

export async function ContactBar() {
  const t = await getTranslations("header");
  return (
    <div className="hidden border-b border-slate-200 bg-ink text-paper md:block">
      <Container className="flex h-10 items-center justify-between text-xs">
        <div className="flex items-center gap-6">
          <a
            href={`tel:${company.phone.replace(/\s|-/g, "")}`}
            className="inline-flex items-center gap-2 text-paper/80 hover:text-paper transition-colors"
            aria-label={t("callUs")}
          >
            <Phone size={14} aria-hidden />
            <span className="font-mono">{company.phoneDisplay}</span>
          </a>
          <a
            href={`mailto:${company.email}`}
            className="inline-flex items-center gap-2 text-paper/80 hover:text-paper transition-colors"
            aria-label={t("emailUs")}
          >
            <Mail size={14} aria-hidden />
            <span>{company.email}</span>
          </a>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={company.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-paper/80 hover:text-paper transition-colors"
          >
            <svg
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.967-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 22a10 10 0 1 1 4.97-1.31L12 22z" />
            </svg>
            <span>{t("whatsapp")}</span>
          </a>
          <LocaleSwitcher />
        </div>
      </Container>
    </div>
  );
}
