import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <section className="grid min-h-[60vh] place-items-center py-20">
      <Container className="max-w-xl text-center">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-bronze-500">
          404
        </span>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-3 text-slate-600">{t("lead")}</p>
        <div className="mt-6">
          <LinkButton href="/" variant="primary">
            {t("cta")}
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
