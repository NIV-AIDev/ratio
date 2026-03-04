import type { Metadata } from "next";
import SimplePageHero from "@/components/home/SimplePageHero";
import JsonLd from "@/components/seo/json-ld";
import { buildLocalBusinessJsonLd, buildPageMetadata, siteConfig } from "@/lib/seo";

const pageTitle = "Press & Insights | The Ratio";
const pageDescription =
  "Latest press, project features, and thought leadership from our interior design and property development studio.";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/press",
});

export default function PressPage() {
  const localBusinessJsonLd = buildLocalBusinessJsonLd({
    name: siteConfig.name,
    description: pageDescription,
  });

  return (
    <>
      <JsonLd data={localBusinessJsonLd} id="json-ld-local-business" />
      <SimplePageHero
        eyebrow="Press & Insights"
        title="News, stories, and market insight from the world of The Ratio."
        description={pageDescription}
      />
    </>
  );
}
