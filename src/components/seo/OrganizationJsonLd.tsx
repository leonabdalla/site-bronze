import { company } from "@/data/company";
import { JsonLd } from "./JsonLd";

const SITE_URL = "https://bronzemetal.com.br";

export function OrganizationJsonLd() {
  const sameAs = Object.values(company.social).filter(Boolean);

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: company.name,
        url: SITE_URL,
        logo: `${SITE_URL}/images/brand/logo.png`,
        foundingDate: String(company.foundedYear),
        email: company.email,
        telephone: company.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: `${company.address.street} - ${company.address.district}`,
          addressLocality: company.address.city,
          addressRegion: company.address.state,
          postalCode: company.address.postalCode,
          addressCountry: "BR",
        },
        ...(sameAs.length > 0 ? { sameAs } : {}),
      }}
    />
  );
}
