import type { Metadata } from "next";
import JsonLd from "@/components/seo/json-ld";
import PageSections from "@/components/sections/page-sections";
import { fetchPageMetadata } from "@/lib/cms";
import { servicesContent } from "@/lib/content";
import { buildLocalBusinessJsonLd, buildPageMetadata } from "@/lib/seo";

export const revalidate = 300;

const pageSlug = "services";
const pagePath = "/services";

export async function generateMetadata(): Promise<Metadata> {
  let pageMetadata = null;

  try {
    pageMetadata = await fetchPageMetadata(pageSlug);
  } catch (error) {
    console.error("Failed to load services metadata", error);
  }

  const fallbackTitle = servicesContent.intro.title;
  const title = pageMetadata?.title ?? fallbackTitle;

  return buildPageMetadata({
    title,
    description: pageMetadata?.description ?? servicesContent.intro.description,
    ogImageUrl: pageMetadata?.ogImageUrl,
    path: pagePath,
  });
}

export default async function ServicesPage() {
  let pageMetadata = null;

  try {
    pageMetadata = await fetchPageMetadata(pageSlug);
  } catch (error) {
    console.error("Failed to load services metadata", error);
  }

  const localBusinessJsonLd = pageMetadata?.includeLocalBusinessJsonLd
    ? buildLocalBusinessJsonLd({
        description:
          pageMetadata?.description ?? servicesContent.intro.description ?? undefined,
      })
    : null;

  return (
    <>
      {localBusinessJsonLd ? (
        <JsonLd data={localBusinessJsonLd} id="json-ld-local-business" />
      ) : null}
      <PageSections content={servicesContent} />
    </>
  );
}
