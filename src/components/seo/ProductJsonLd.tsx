import { company } from "@/data/company";
import type { Alloy, ProductFamily, PropertyRow } from "@/data/products";
import { JsonLd } from "./JsonLd";

const SITE_URL = "https://bronzemetal.com.br";

function propsToPropertyValues(rows: PropertyRow[] | undefined, loc: "pt" | "en") {
  return (rows ?? []).map((r) => ({
    "@type": "PropertyValue",
    name: r.label[loc],
    value: r.value,
    ...(r.unit ? { unitText: r.unit } : {}),
  }));
}

export function ProductJsonLd({
  alloy,
  family,
  loc,
  path,
  images,
}: {
  alloy: Alloy;
  family: ProductFamily;
  loc: "pt" | "en";
  path: string;
  images: string[];
}) {
  const imageUrls = (images.length > 0 ? images : alloy.image ? [alloy.image] : []).map(
    (src) => `${SITE_URL}${src}`,
  );
  const additionalProperty = [
    ...(alloy.composition ?? []).map((c) => ({
      "@type": "PropertyValue",
      name: c.element[loc],
      value: c.range,
    })),
    ...propsToPropertyValues(alloy.properties, loc),
    ...propsToPropertyValues(alloy.thermalElectrical, loc),
  ];

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: alloy.code,
        sku: alloy.code,
        description: alloy.description[loc],
        category: family.name[loc],
        url: `${SITE_URL}${path}`,
        ...(imageUrls.length > 0 ? { image: imageUrls } : {}),
        brand: { "@type": "Brand", name: company.name },
        manufacturer: { "@type": "Organization", name: company.name, url: SITE_URL },
        ...(additionalProperty.length > 0 ? { additionalProperty } : {}),
      }}
    />
  );
}
