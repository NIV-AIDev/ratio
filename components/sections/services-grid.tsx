import Container from "@/components/ui/container";
import Grid from "@/components/ui/grid";
import Section from "@/components/ui/section";

const services = [
  {
    title: "Service placeholder",
    description: "Short service descriptor placeholder.",
  },
  {
    title: "Service placeholder",
    description: "Short service descriptor placeholder.",
  },
  {
    title: "Service placeholder",
    description: "Short service descriptor placeholder.",
  },
];

export default function ServicesGrid() {
  return (
    <Section className="border-b border-zinc-200/60">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <p className="text-xs uppercase tracking-[0.4em] text-zinc-500">
            Services
          </p>
          <h2 className="text-2xl font-semibold uppercase tracking-[0.2em] text-zinc-900">
            Services grid placeholder
          </h2>
        </div>
        <Grid columns={3}>
          {services.map((service, index) => (
            <article
              key={`${service.title}-${index}`}
              className="flex h-full flex-col gap-4 border border-zinc-200/70 bg-white/70 p-6"
            >
              <div className="text-[11px] uppercase tracking-[0.3em] text-zinc-400">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-900">
                {service.title}
              </h3>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                {service.description}
              </p>
            </article>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
