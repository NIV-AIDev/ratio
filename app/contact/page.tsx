import type { Metadata } from "next";
import ContactPageContent from "@/components/contact/ContactPageContent";
import JsonLd from "@/components/seo/json-ld";
import { buildLocalBusinessJsonLd, buildPageMetadata, siteConfig } from "@/lib/seo";

const pageTitle = "Contact";
const pageDescription =
  "Start your project conversation with The Ratio — share your scope and our team will respond with next steps.";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/contact",
});

export default function ContactPage() {
  const localBusinessJsonLd = buildLocalBusinessJsonLd({
    name: siteConfig.name,
    description: pageDescription,
  });

  return (
    <>
      <JsonLd data={localBusinessJsonLd} id="json-ld-local-business" />
      <ContactPageContent />
    </>
  );
}
