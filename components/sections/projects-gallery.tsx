import Container from "@/components/ui/container";
import Grid from "@/components/ui/grid";
import Section from "@/components/ui/section";
import type { Project } from "@/lib/cms";

type ProjectsGalleryProps = {
  projects?: Project[] | null;
  isLoading?: boolean;
};

export default function ProjectsGallery({
  projects,
  isLoading = false,
}: ProjectsGalleryProps) {
  const showLoading = isLoading || projects === undefined;
  const resolvedProjects = projects ?? [];
  const isEmpty = !showLoading && resolvedProjects.length === 0;
  const content = showLoading
    ? Array.from({ length: 4 }, (_, index) => (
        <figure
          key={`loading-project-${index}`}
          className="flex flex-col gap-4 border border-zinc-200/70 bg-white/70 p-6"
        >
          <div className="aspect-4/3 w-full bg-zinc-100" />
          <figcaption className="text-xs uppercase tracking-[0.2em] text-zinc-600">
            Loading project
          </figcaption>
        </figure>
      ))
    : isEmpty
      ? [
          <p
            key="projects-empty"
            className="col-span-full text-xs uppercase tracking-[0.2em] text-zinc-500"
          >
            No projects available yet.
          </p>,
        ]
      : resolvedProjects.map((project) => (
          <figure
            key={project._id}
            className="flex flex-col gap-4 border border-zinc-200/70 bg-white/70 p-6"
          >
            <div className="aspect-4/3 w-full bg-zinc-100" />
            <figcaption className="text-xs uppercase tracking-[0.2em] text-zinc-600">
              {project.title}
            </figcaption>
          </figure>
        ));

  return (
    <Section>
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <p className="text-xs uppercase tracking-[0.4em] text-zinc-500">
            Projects
          </p>
          <h2 className="text-2xl font-semibold uppercase tracking-[0.2em] text-zinc-900">
            Projects gallery placeholder
          </h2>
        </div>
        <Grid columns={2} className="lg:grid-cols-2">
          {content}
        </Grid>
      </Container>
    </Section>
  );
}
