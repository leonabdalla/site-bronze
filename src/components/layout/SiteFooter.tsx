import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { company } from "@/data/company";
import { productFamilies } from "@/data/products";
import { ShieldCheck } from "lucide-react";
import { Logo } from "@/components/marketing/Logo";

export async function SiteFooter() {
  const t = await getTranslations();
  const locale = (await getLocale()) as "pt" | "en";
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-slate-200 bg-ink text-paper">
      <Container className="grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4 flex flex-col gap-6">
          <Logo className="h-12 w-auto" variant="dark" />
          <p className="text-sm text-paper/70 max-w-sm">
            {t("metadata.tagline")}.
          </p>
          <div className="flex items-center gap-3 text-xs">
            <ShieldCheck size={16} aria-hidden className="text-bronze-300" />
            <span className="font-mono uppercase tracking-[0.15em] text-paper/70">
              {t("footer.iso")}
            </span>
          </div>
        </div>

        <div className="md:col-span-3">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/50">
            {t("footer.siteMap")}
          </h3>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            <li>
              <Link href="/" className="text-paper/80 hover:text-paper">
                {t("nav.home")}
              </Link>
            </li>
            <li>
              <Link href="/empresa" className="text-paper/80 hover:text-paper">
                {t("nav.company")}
              </Link>
            </li>
            <li>
              <Link href="/produtos" className="text-paper/80 hover:text-paper">
                {t("nav.products")}
              </Link>
            </li>
            <li>
              <Link href="/aplicacoes" className="text-paper/80 hover:text-paper">
                {t("nav.applications")}
              </Link>
            </li>
            <li>
              <Link href="/industrias" className="text-paper/80 hover:text-paper">
                {t("nav.industries")}
              </Link>
            </li>
            <li>
              <Link href="/catalogos" className="text-paper/80 hover:text-paper">
                {t("nav.catalogs")}
              </Link>
            </li>
            <li>
              <Link href="/contato" className="text-paper/80 hover:text-paper">
                {t("nav.contact")}
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/50">
            {t("nav.products")}
          </h3>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            {productFamilies.slice(0, 6).map((f) => (
              <li key={f.slug}>
                <Link
                  href={{ pathname: "/produtos/[slug]", params: { slug: f.slug } }}
                  className="text-paper/80 hover:text-paper"
                >
                  {f.name[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/50">
            {t("footer.address")}
          </h3>
          <address className="mt-4 not-italic text-sm text-paper/80 leading-relaxed">
            {company.address.street}
            <br />
            {company.address.district}
            <br />
            {company.address.city} — {company.address.state}
            <br />
            <span className="font-mono">{company.address.postalCode}</span>
            <br />
            {company.address.country[locale]}
          </address>
        </div>
      </Container>

      <div className="border-t border-paper/10">
        <Container className="flex flex-col items-start justify-between gap-4 py-6 text-xs text-paper/60 md:flex-row md:items-center">
          <span>
            © {year} {company.name}. {t("footer.rights")}
          </span>
          <Link href="/privacidade" className="hover:text-paper">
            {t("footer.legal")}
          </Link>
        </Container>
      </div>
    </footer>
  );
}
