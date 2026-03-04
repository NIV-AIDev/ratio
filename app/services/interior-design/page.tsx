import type { Metadata } from "next";
import JsonLd from "@/components/seo/json-ld";
import InteriorDesignPageContent from "@/components/services/interior-design/InteriorDesignPageContent";
import { buildLocalBusinessJsonLd, buildPageMetadata, siteConfig } from "@/lib/seo";

const pageTitle = "Interior Design";
const pageDescription =
  "A complete interior architecture and design service for private residences, from concept through procurement and implementation.";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/services/interior-design",
});

export default function InteriorDesignPage() {
  const localBusinessJsonLd = buildLocalBusinessJsonLd({
    name: siteConfig.name,
    description: pageDescription,
  });

  return (
    <>
      <JsonLd data={localBusinessJsonLd} id="json-ld-local-business" />
      <InteriorDesignPageContent />
    </>
  );
}
