import Container from "@/components/ui/container";
import Section from "@/components/ui/section";

type SimplePageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function SimplePageHero({
  eyebrow,
  title,
  description,
}: SimplePageHeroProps) {
  return (
    <Section className="bg-[#f6f3ef] py-24">
      <Container className="space-y-6">
        <p className="text-[11px] uppercase tracking-[0.4em] text-[#8c857d]">
          {eyebrow}
        </p>
        <h1 className="text-4xl font-semibold tracking-[-0.02em] text-[#1a1a18] sm:text-5xl">
          {title}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-[#5c544d]">
          {description}
        </p>
      </Container>
    </Section>
  );
}
