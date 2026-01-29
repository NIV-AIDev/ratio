import type { Metadata } from "next";
import JsonLd from "@/components/seo/json-ld";
import Hero from "@/components/sections/hero";
import ProjectsGallery from "@/components/sections/projects-gallery";
import ServicesGrid from "@/components/sections/services-grid";
import {
  fetchPageMetadata,
  fetchProjects,
  fetchServices,
} from "@/lib/cms";
import { buildLocalBusinessJsonLd, buildPageMetadata, siteConfig } from "@/lib/seo";
import { Suspense } from "react";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  let pageMetadata = null;

  try {
    pageMetadata = await fetchPageMetadata("home");
  } catch (error) {
    console.error("Failed to load home metadata", error);
  }

  const title = pageMetadata?.title ?? siteConfig.name;

  return buildPageMetadata({
    title,
    description: pageMetadata?.description,
    ogImageUrl: pageMetadata?.ogImageUrl,
    path: "/",
  });
}

async function ServicesSection() {
  let services = null;

  try {
    services = await fetchServices();
  } catch (error) {
    console.error("Failed to load services", error);
  }

  return <ServicesGrid services={services} />;
}

async function ProjectsSection() {
  let projects = null;

  try {
    projects = await fetchProjects();
  } catch (error) {
    console.error("Failed to load projects", error);
  }

  return <ProjectsGallery projects={projects} />;
}

export default async function Home() {
  let pageMetadata = null;

  try {
    pageMetadata = await fetchPageMetadata("home");
  } catch (error) {
    console.error("Failed to load home metadata", error);
  }

  const localBusinessJsonLd = pageMetadata?.includeLocalBusinessJsonLd
    ? buildLocalBusinessJsonLd({
        description: pageMetadata?.description ?? undefined,
      })
    : null;

  return (
    <>
      {localBusinessJsonLd ? (
        <JsonLd data={localBusinessJsonLd} id="json-ld-local-business" />
      ) : null}
      <Hero />
      <Suspense fallback={<ServicesGrid isLoading />}>
        <ServicesSection />
      </Suspense>
      <Suspense fallback={<ProjectsGallery isLoading />}>
        <ProjectsSection />
      </Suspense>
    </>
  );
}
