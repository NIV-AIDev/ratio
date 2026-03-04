import Link from "next/link";
import Container from "@/components/ui/container";
import Section from "@/components/ui/section";

type AboutSectionProps = {
  eyebrow: string;
  title: string;
  intro: string;
  body: string;
  cta: { label: string; href: string };
};

export default function AboutSection({
  eyebrow,
  title,
  intro,
  body,
  cta,
}: AboutSectionProps) {
  return (
    <Section className="bg-[#f6f3ef] py-24">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
        <div className="space-y-6">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#8c857d]">
            {eyebrow}
          </p>
          <h2 className="text-4xl font-semibold tracking-[-0.02em] text-[#1a1a18]">
            {title}
          </h2>
          <p className="text-lg text-[#5c544d]">{intro}</p>
        </div>
        <div className="space-y-6 text-[#5c544d]">
          <p className="text-base leading-relaxed">{body}</p>
          <Link
            className="inline-flex items-center rounded-full border border-[#bdb5ac] px-6 py-3 text-[11px] uppercase tracking-[0.32em] text-[#1a1a18] transition-all duration-300 hover:border-[#1a1a18]"
            href={cta.href}
          >
            {cta.label}
          </Link>
        </div>
      </Container>
    </Section>
  );
}
