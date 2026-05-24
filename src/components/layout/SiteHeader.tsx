import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { ContactBar } from "./ContactBar";
import { ProductsMenu } from "./ProductsMenu";
import { MobileNav } from "./MobileNav";
import { Logo } from "@/components/marketing/Logo";

export async function SiteHeader() {
  const t = await getTranslations("nav");
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-paper/85 backdrop-blur supports-[backdrop-filter]:bg-paper/70">
      <ContactBar />
      <Container className="flex h-16 items-center justify-between gap-6 md:h-20">
        <Link
          href="/"
          className="inline-flex items-center gap-3 text-ink"
          aria-label="Bronze Metal"
        >
          <Logo height={56} priority className="md:hidden" />
          <Logo height={80} priority className="hidden md:block" />
          <span className="sr-only">Bronze Metal</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7" aria-label="Primary">
          <Link href="/empresa" className="text-sm font-medium text-ink hover:text-bronze-500 transition-colors">
            {t("company")}
          </Link>
          <ProductsMenu />
          <Link href="/aplicacoes" className="text-sm font-medium text-ink hover:text-bronze-500 transition-colors">
            {t("applications")}
          </Link>
          <Link href="/industrias" className="text-sm font-medium text-ink hover:text-bronze-500 transition-colors">
            {t("industries")}
          </Link>
          <Link href="/catalogos" className="text-sm font-medium text-ink hover:text-bronze-500 transition-colors">
            {t("catalogs")}
          </Link>
          <Link
            href="/contato"
            className="inline-flex h-9 items-center rounded-full bg-ink px-5 text-sm font-medium text-paper hover:bg-ink-soft transition-colors"
          >
            {t("contact")}
          </Link>
        </nav>

        <MobileNav />
      </Container>
    </header>
  );
}
