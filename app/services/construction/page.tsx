import type { Metadata } from "next";
import ConstructionServicePage from "@/components/services/construction/ConstructionServicePage";
import JsonLd from "@/components/seo/json-ld";
import { buildLocalBusinessJsonLd, buildPageMetadata, siteConfig } from "@/lib/seo";

const pageTitle = "Construction";
const pageDescription =
  "Luxury residential construction and project management delivered through integrated planning, procurement, and specialist implementation.";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/services/construction",
});

export default function ConstructionPage() {
  const localBusinessJsonLd = buildLocalBusinessJsonLd({
    name: siteConfig.name,
    description: pageDescription,
  });

  return (
    <>
      <JsonLd data={localBusinessJsonLd} id="json-ld-local-business" />
      <ConstructionServicePage />
    </>
  );
}
