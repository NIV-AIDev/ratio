import type { Metadata } from "next";
import AboutPage161 from "@/components/about/AboutPage161";
import JsonLd from "@/components/seo/json-ld";
import { buildLocalBusinessJsonLd, buildPageMetadata, siteConfig } from "@/lib/seo";

const pageTitle = "About The Ratio";
const pageDescription =
  "The Ratio is a luxury interior design studio and super-prime property developer delivering globally across private residences and landmark addresses.";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/about",
});

export default function AboutPage() {
  const localBusinessJsonLd = buildLocalBusinessJsonLd({
    name: siteConfig.name,
    description: pageDescription,
  });

  return (
    <>
      <JsonLd data={localBusinessJsonLd} id="json-ld-local-business" />
      <AboutPage161 />
    </>
  );
}
