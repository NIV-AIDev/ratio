import Hero from "@/components/sections/hero";
import ProjectsGallery from "@/components/sections/projects-gallery";
import ServicesGrid from "@/components/sections/services-grid";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <ProjectsGallery />
    </>
  );
}
