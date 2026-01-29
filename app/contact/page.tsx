import type { Metadata } from "next";
import JsonLd from "@/components/seo/json-ld";
import ContactFormSection from "@/components/sections/contact-form";
import PageSections from "@/components/sections/page-sections";
import { fetchPageMetadata } from "@/lib/cms";
import { contactContent } from "@/lib/content";
import { buildLocalBusinessJsonLd, buildPageMetadata } from "@/lib/seo";

export const revalidate = 300;

const pageSlug = "contact";
const pagePath = "/contact";

export async function generateMetadata(): Promise<Metadata> {
  let pageMetadata = null;

  try {
    pageMetadata = await fetchPageMetadata(pageSlug);
  } catch (error) {
    console.error("Failed to load contact metadata", error);
  }

  const fallbackTitle = contactContent.intro.title;
  const title = pageMetadata?.title ?? fallbackTitle;

  return buildPageMetadata({
    title,
    description: pageMetadata?.description ?? contactContent.intro.description,
    ogImageUrl: pageMetadata?.ogImageUrl,
    path: pagePath,
  });
}

export default async function ContactPage() {
  let pageMetadata = null;

  try {
    pageMetadata = await fetchPageMetadata(pageSlug);
  } catch (error) {
    console.error("Failed to load contact metadata", error);
  }

  const localBusinessJsonLd = pageMetadata?.includeLocalBusinessJsonLd
    ? buildLocalBusinessJsonLd({
        description:
          pageMetadata?.description ?? contactContent.intro.description ?? undefined,
      })
    : null;

  return (
    <>
      {localBusinessJsonLd ? (
        <JsonLd data={localBusinessJsonLd} id="json-ld-local-business" />
      ) : null}
      <PageSections content={contactContent} />
      <ContactFormSection />
    </>
  );
}
