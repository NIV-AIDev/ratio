import type { Metadata } from "next";
import JsonLd from "@/components/seo/json-ld";
import ArchitectureServicePage from "@/components/services/architecture/ArchitectureServicePage";
import { buildLocalBusinessJsonLd, buildPageMetadata, siteConfig } from "@/lib/seo";

const pageTitle = "Architecture";
const pageDescription =
  "Architecture services for private residences, from feasibility and planning approvals to technical coordination and delivery oversight.";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/services/architecture",
});

export default function ArchitecturePage() {
  const localBusinessJsonLd = buildLocalBusinessJsonLd({
    name: siteConfig.name,
    description: pageDescription,
  });

  return (
    <>
      <JsonLd data={localBusinessJsonLd} id="json-ld-local-business" />
      <ArchitectureServicePage />
    </>
  );
}
