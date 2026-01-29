import type { Metadata } from "next";
import JsonLd from "@/components/seo/json-ld";
import PageSections from "@/components/sections/page-sections";
import { fetchPageMetadata } from "@/lib/cms";
import { aboutContent } from "@/lib/content";
import { buildLocalBusinessJsonLd, buildPageMetadata } from "@/lib/seo";

export const revalidate = 300;

const pageSlug = "about";
const pagePath = "/about";

export async function generateMetadata(): Promise<Metadata> {
  let pageMetadata = null;

  try {
    pageMetadata = await fetchPageMetadata(pageSlug);
  } catch (error) {
    console.error("Failed to load about metadata", error);
  }

  const fallbackTitle = aboutContent.intro.title;
  const title = pageMetadata?.title ?? fallbackTitle;

  return buildPageMetadata({
    title,
    description: pageMetadata?.description ?? aboutContent.intro.description,
    ogImageUrl: pageMetadata?.ogImageUrl,
    path: pagePath,
  });
}

export default async function AboutPage() {
  let pageMetadata = null;

  try {
    pageMetadata = await fetchPageMetadata(pageSlug);
  } catch (error) {
    console.error("Failed to load about metadata", error);
  }

  const localBusinessJsonLd = pageMetadata?.includeLocalBusinessJsonLd
    ? buildLocalBusinessJsonLd({
        description:
          pageMetadata?.description ?? aboutContent.intro.description ?? undefined,
      })
    : null;

  return (
    <>
      {localBusinessJsonLd ? (
        <JsonLd data={localBusinessJsonLd} id="json-ld-local-business" />
      ) : null}
      <PageSections content={aboutContent} />
    </>
  );
}
