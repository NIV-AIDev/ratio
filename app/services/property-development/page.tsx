import type { Metadata } from "next";
import PropertyDevelopmentContent from "@/components/services/property-development/PropertyDevelopmentContent";
import JsonLd from "@/components/seo/json-ld";
import { buildLocalBusinessJsonLd, buildPageMetadata, siteConfig } from "@/lib/seo";

const pageTitle = "Property Development";
const pageDescription =
  "Strategic property development management spanning acquisition, design leadership, procurement, and delivery for private residential projects.";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/services/property-development",
});

export default function PropertyDevelopmentPage() {
  const localBusinessJsonLd = buildLocalBusinessJsonLd({
    name: siteConfig.name,
    description: pageDescription,
  });

  return (
    <>
      <JsonLd data={localBusinessJsonLd} id="json-ld-local-business" />
      <PropertyDevelopmentContent />
    </>
  );
}
