import type { Metadata } from "next";
import Home161 from "@/components/home/Home161";
import JsonLd from "@/components/seo/json-ld";
import { buildLocalBusinessJsonLd, buildPageMetadata, siteConfig } from "@/lib/seo";

const pageTitle = "The Ratio | Luxury Interior Design | Property Developer London";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description:
    "Luxury interior design and property development, creating timeless residences with refined craftsmanship.",
  path: "/",
});

export default function Home() {
  const localBusinessJsonLd = buildLocalBusinessJsonLd({
    name: siteConfig.name,
    description: metadata.description ?? siteConfig.description,
  });

  return (
    <>
      <JsonLd data={localBusinessJsonLd} id="json-ld-local-business" />
      <Home161 />
    </>
  );
}
