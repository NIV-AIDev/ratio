import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/container";
import Section from "@/components/ui/section";

type SpecialisedServiceProps = {
  title: string;
  body: string;
  imageSrc: string;
  cta: { label: string; href: string };
};

export default function SpecialisedService({
  title,
  body,
  imageSrc,
  cta,
}: SpecialisedServiceProps) {
  return (
    <Section className="bg-[#f6f3ef] py-24">
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-4/3 overflow-hidden rounded-3xl">
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-br from-black/10 via-black/30 to-black/60" />
        </div>
        <div className="space-y-6">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#8c857d]">
            Signature service
          </p>
          <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[#1a1a18] sm:text-4xl">
            {title}
          </h2>
          <p className="text-base leading-relaxed text-[#5c544d]">{body}</p>
          <Link
            className="inline-flex rounded-full bg-[#b6814b] px-6 py-3 text-[11px] uppercase tracking-[0.32em] text-[#1a1a18] transition duration-300 hover:bg-[#9c6b3f]"
            href={cta.href}
          >
            {cta.label}
          </Link>
        </div>
      </Container>
    </Section>
  );
}
