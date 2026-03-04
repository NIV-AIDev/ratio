import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import ServiceCard3D, { ServiceCard3DProps } from "./ServiceCard3D";

type ServicesScrollerProps = {
  sectionTitle: string;
  sectionIntro?: string;
  services: ServiceCard3DProps[];
};

export default function ServicesScroller({
  sectionTitle,
  sectionIntro,
  services,
}: ServicesScrollerProps) {
  return (
    <Section className="bg-white py-24">
      <Container className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[#8c857d]">
              Services
            </p>
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[#1a1a18] sm:text-4xl">
              {sectionTitle}
            </h2>
          </div>
          {sectionIntro ? (
            <p className="max-w-lg text-sm text-[#5c544d]">{sectionIntro}</p>
          ) : null}
        </div>
      </Container>
      <div className="mt-10 overflow-x-auto">
        <div className="flex snap-x snap-mandatory gap-6 px-6 pb-6 sm:px-10">
          {services.map((service) => (
            <div key={service.title} className="snap-start">
              <ServiceCard3D {...service} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
