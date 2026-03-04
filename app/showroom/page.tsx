import type { Metadata } from "next";
import JsonLd from "@/components/seo/json-ld";
import ShowroomPage from "@/components/showroom/ShowroomPage";
import { buildLocalBusinessJsonLd, buildPageMetadata, siteConfig } from "@/lib/seo";

const pageTitle = "Showroom";
const pageDescription =
  "An immersive physical showroom experience where materials, finishes, lighting, and craftsmanship are explored in person.";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/showroom",
});

export default function ShowroomRoutePage() {
  const localBusinessJsonLd = buildLocalBusinessJsonLd({
    name: siteConfig.name,
    description: pageDescription,
  });

  return (
    <>
      <JsonLd data={localBusinessJsonLd} id="json-ld-local-business" />
      <ShowroomPage />
    </>
  );
}
