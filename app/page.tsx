import Hero from "@/components/sections/hero";
import ProjectsGallery from "@/components/sections/projects-gallery";
import ServicesGrid from "@/components/sections/services-grid";
import { fetchProjects, fetchServices } from "@/lib/cms";
import { Suspense } from "react";

export const revalidate = 300;

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

export default function Home() {
  return (
    <>
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
