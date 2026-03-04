import type { Metadata } from "next";
import PrivacyPageContent from "@/components/privacy/PrivacyPageContent";
import JsonLd from "@/components/seo/json-ld";
import { buildLocalBusinessJsonLd, buildPageMetadata, siteConfig } from "@/lib/seo";

const pageTitle = "Privacy Policy";
const pageDescription =
  "How The Ratio collects, stores, and uses personal data submitted through this website.";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/privacy",
});

export default function PrivacyPage() {
  const localBusinessJsonLd = buildLocalBusinessJsonLd({
    name: siteConfig.name,
    description: pageDescription,
  });

  return (
    <>
      <JsonLd data={localBusinessJsonLd} id="json-ld-local-business" />
      <PrivacyPageContent />
    </>
  );
}
