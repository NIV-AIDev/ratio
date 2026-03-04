import type { Metadata } from "next";
import ReviewsPageContent from "@/components/reviews/ReviewsPageContent";
import JsonLd from "@/components/seo/json-ld";
import { buildLocalBusinessJsonLd, buildPageMetadata, siteConfig } from "@/lib/seo";

const pageTitle = "Reviews";
const pageDescription =
  "Read verified client reviews covering planning, construction, and interior delivery with The Ratio.";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/reviews",
});

export default function ReviewsPage() {
  const localBusinessJsonLd = buildLocalBusinessJsonLd({
    name: siteConfig.name,
    description: pageDescription,
  });

  return (
    <>
      <JsonLd data={localBusinessJsonLd} id="json-ld-local-business" />
      <ReviewsPageContent />
    </>
  );
}
