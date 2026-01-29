import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteConfig = {
  name: "Ratio",
  description: "Architecture-led digital practice.",
  url: siteUrl,
  ogImage: new URL("/og-image.jpg", siteUrl).toString(),
};

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
};

type BuildPageMetadataArgs = {
  title: string;
  description?: string | null;
  ogImageUrl?: string | null;
  path?: string;
};

const resolveOgImageUrl = (ogImageUrl?: string | null) => {
  if (!ogImageUrl) {
    return siteConfig.ogImage;
  }

  return ogImageUrl.startsWith("http")
    ? ogImageUrl
    : new URL(ogImageUrl, siteConfig.url).toString();
};

export const buildPageMetadata = ({
  title,
  description,
  ogImageUrl,
  path = "/",
}: BuildPageMetadataArgs): Metadata => {
  const resolvedDescription = description ?? siteConfig.description;
  const resolvedImage = resolveOgImageUrl(ogImageUrl);
  const resolvedPath = path.startsWith("/") ? path : `/${path}`;
  const resolvedUrl = new URL(resolvedPath, siteConfig.url).toString();

  return {
    title,
    description: resolvedDescription,
    openGraph: {
      type: "website",
      url: resolvedUrl,
      title,
      description: resolvedDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: resolvedImage,
          width: 1200,
          height: 630,
          alt: `${title} Open Graph`,
        },
      ],
    },
  };
};

type LocalBusinessOverrides = {
  name?: string | null;
  description?: string | null;
  url?: string | null;
};

export const buildLocalBusinessJsonLd = (
  overrides: LocalBusinessOverrides = {},
) => ({
  ...localBusinessJsonLd,
  ...(overrides.name ? { name: overrides.name } : {}),
  ...(overrides.description ? { description: overrides.description } : {}),
  ...(overrides.url ? { url: overrides.url } : {}),
});
