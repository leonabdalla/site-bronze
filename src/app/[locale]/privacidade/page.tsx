import { getTranslations, setRequestLocale } from "next-intl/server";

import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return { title: t("title") };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");
  const loc = locale as "pt" | "en";

  return (
    <section className="py-20">
      <Container className="max-w-3xl">
        <SectionEyebrow>{t("title")}</SectionEyebrow>
        <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-5 text-lg text-slate-600 leading-relaxed">
          {t("lead")}
        </p>

        <div className="prose prose-slate mt-10 max-w-none text-slate-700 leading-relaxed">
          <h2 className="mt-8 text-xl font-semibold text-ink">
            {loc === "pt" ? "Dados coletados" : "Data we collect"}
          </h2>
          <p>
            {loc === "pt"
              ? "Coletamos apenas dados informados voluntariamente pelo usuário no formulário de contato (nome, e-mail, telefone, empresa e mensagem) e métricas anônimas de uso via Vercel Analytics, sem cookies de rastreamento."
              : "We only collect data voluntarily provided through our contact form (name, email, phone, company, message) and anonymous usage metrics via Vercel Analytics, without tracking cookies."}
          </p>
          <h2 className="mt-8 text-xl font-semibold text-ink">
            {loc === "pt" ? "Uso dos dados" : "How we use it"}
          </h2>
          <p>
            {loc === "pt"
              ? "Utilizamos os dados exclusivamente para responder a solicitações comerciais e técnicas. Não vendemos nem compartilhamos dados pessoais com terceiros."
              : "We use this data exclusively to respond to commercial and technical inquiries. We do not sell or share personal data with third parties."}
          </p>
          <h2 className="mt-8 text-xl font-semibold text-ink">
            {loc === "pt" ? "Seus direitos (LGPD)" : "Your rights"}
          </h2>
          <p>
            {loc === "pt"
              ? "Você pode solicitar acesso, correção ou exclusão dos seus dados a qualquer momento entrando em contato pelo e-mail informado em nossa página de contato."
              : "You can request access, correction, or deletion of your data at any time by reaching out via the email on our contact page."}
          </p>
        </div>
      </Container>
    </section>
  );
}
