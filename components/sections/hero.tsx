import Container from "@/components/ui/container";
import Section from "@/components/ui/section";

const featureTags = ["Spatial planning", "Material studies", "Prototype"];

export default function Hero() {
  return (
    <Section className="border-b border-zinc-200/60">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <p className="text-xs uppercase tracking-[0.4em] text-zinc-500">
            Ratio Interiors
          </p>
          <h1 className="text-4xl font-semibold uppercase tracking-[0.2em] text-zinc-900 sm:text-5xl">
            Hero headline placeholder
          </h1>
          <p className="max-w-2xl text-sm uppercase tracking-[0.2em] text-zinc-500">
            Supporting statement placeholder describing a future interior design
            offering.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.3em] text-zinc-400">
          {featureTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-zinc-200/70 px-4 py-2"
            >
              {tag}
            </span>
          ))}
        </div>
      </Container>
    </Section>
  );
}
