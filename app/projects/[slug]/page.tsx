import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetailPageContent from "@/components/projects/ProjectDetailPageContent";
import JsonLd from "@/components/seo/json-ld";
import {
  getContinueJourneyCards,
  getOrderedProjects,
  getProjectBySlug,
} from "@/lib/projects/data";
import { buildPageMetadata, siteConfig } from "@/lib/seo";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getOrderedProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return buildPageMetadata({
      title: "Projects",
      description: "Explore selected projects from The Ratio.",
      path: "/projects",
    });
  }

  return buildPageMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: `${siteConfig.url}/projects/${project.slug}`,
    inLanguage: "en-GB",
    about: "Residential architecture, interior design, and construction delivery.",
  };

  return (
    <>
      <JsonLd data={projectJsonLd} id={`json-ld-project-${project.slug}`} />
      <ProjectDetailPageContent
        project={project}
        continueJourneyCards={getContinueJourneyCards(project.slug)}
      />
    </>
  );
}
