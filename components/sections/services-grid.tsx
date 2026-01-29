import Container from "@/components/ui/container";
import Grid from "@/components/ui/grid";
import Section from "@/components/ui/section";
import type { Service } from "@/lib/cms";

type ServicesGridProps = {
  services?: Service[] | null;
  isLoading?: boolean;
};

export default function ServicesGrid({
  services,
  isLoading = false,
}: ServicesGridProps) {
  const showLoading = isLoading || services === undefined;
  const resolvedServices = services ?? [];
  const isEmpty = !showLoading && resolvedServices.length === 0;
  const content = showLoading
    ? Array.from({ length: 3 }, (_, index) => (
        <article
          key={`loading-service-${index}`}
          className="flex h-full flex-col gap-4 border border-zinc-200/70 bg-white/70 p-6"
        >
          <div className="text-[11px] uppercase tracking-[0.3em] text-zinc-400">
            {String(index + 1).padStart(2, "0")}
          </div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-900">
            Loading service
          </h3>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Loading summary
          </p>
        </article>
      ))
    : isEmpty
      ? [
          <p
            key="services-empty"
            className="col-span-full text-xs uppercase tracking-[0.2em] text-zinc-500"
          >
            No services available yet.
          </p>,
        ]
      : resolvedServices.map((service, index) => (
          <article
            key={service._id}
            className="flex h-full flex-col gap-4 border border-zinc-200/70 bg-white/70 p-6"
          >
            <div className="text-[11px] uppercase tracking-[0.3em] text-zinc-400">
              {String(index + 1).padStart(2, "0")}
            </div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-900">
              {service.title}
            </h3>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              {service.summary ?? "Summary pending."}
            </p>
          </article>
        ));

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
        <Grid columns={3}>{content}</Grid>
      </Container>
    </Section>
  );
}
