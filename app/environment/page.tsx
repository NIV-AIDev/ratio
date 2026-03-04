import type { Metadata } from "next";
import SimplePageHero from "@/components/home/SimplePageHero";
import JsonLd from "@/components/seo/json-ld";
import { buildLocalBusinessJsonLd, buildPageMetadata, siteConfig } from "@/lib/seo";

const pageTitle = "Environment | The Ratio";
const pageDescription =
  "Our sustainability commitments and environmentally conscious design principles across luxury residential projects.";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/environment",
});

export default function EnvironmentPage() {
  const localBusinessJsonLd = buildLocalBusinessJsonLd({
    name: siteConfig.name,
    description: pageDescription,
  });

  return (
    <>
      <JsonLd data={localBusinessJsonLd} id="json-ld-local-business" />
      <SimplePageHero
        eyebrow="Environment"
        title="Sustainable thinking embedded within timeless luxury design."
        description={pageDescription}
      />
    </>
  );
}
