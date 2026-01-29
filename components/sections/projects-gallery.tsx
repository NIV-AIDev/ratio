import Container from "@/components/ui/container";
import Grid from "@/components/ui/grid";
import Section from "@/components/ui/section";

const projects = [
  "Project placeholder",
  "Project placeholder",
  "Project placeholder",
  "Project placeholder",
];

export default function ProjectsGallery() {
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
          {projects.map((project, index) => (
            <figure
              key={`${project}-${index}`}
              className="flex flex-col gap-4 border border-zinc-200/70 bg-white/70 p-6"
            >
              <div className="aspect-4/3 w-full bg-zinc-100" />
              <figcaption className="text-xs uppercase tracking-[0.2em] text-zinc-600">
                {project}
              </figcaption>
            </figure>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
