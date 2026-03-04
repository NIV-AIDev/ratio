import type { Metadata } from "next";
import ProjectsPageContent from "@/components/projects/ProjectsPageContent";
import JsonLd from "@/components/seo/json-ld";
import { buildLocalBusinessJsonLd, buildPageMetadata, siteConfig } from "@/lib/seo";

const pageTitle = "Projects";
const pageDescription =
  "Explore The Ratio project portfolio, from private residences to international developments, with editorial media and refined delivery detail.";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/projects",
});

export default function ProjectsPage() {
  const localBusinessJsonLd = buildLocalBusinessJsonLd({
    name: siteConfig.name,
    description: pageDescription,
  });

  return (
    <>
      <JsonLd data={localBusinessJsonLd} id="json-ld-local-business" />
      <ProjectsPageContent />
    </>
  );
}
