import type { Metadata } from "next";
import { Suspense } from "react";
import CalculatorWizard from "@/components/pricing/CalculatorWizard";
import JsonLd from "@/components/seo/json-ld";
import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import { buildLocalBusinessJsonLd, buildPageMetadata, siteConfig } from "@/lib/seo";

const pageTitle = "Pricing";
const pageDescription =
  "Use The Ratio pricing estimator to compare Extension, Loft Conversion, and Full House Renovation budgets with transparent UK 2026 ranges.";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/pricing",
});

export default function PricingPage() {
  const localBusinessJsonLd = buildLocalBusinessJsonLd({
    name: siteConfig.name,
    description: pageDescription,
  });

  return (
    <>
      <JsonLd data={localBusinessJsonLd} id="json-ld-local-business" />

      <Section className="relative overflow-hidden bg-[#f4eee6] pb-16 pt-28 sm:pb-20 sm:pt-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[linear-gradient(180deg,rgba(171,148,104,0.32),transparent)]" />
        <Container className="relative space-y-6">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#8a755b]">Pricing</p>
          <h1 className="max-w-5xl font-(--font-home-serif) text-4xl uppercase leading-tight tracking-[0.08em] text-[#1f1a15] sm:text-5xl lg:text-6xl">
            Multi-project cost estimator for extensions, loft conversions, and full house renovation.
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-[#5c5348] sm:text-lg">
            Start with project type, then complete a deterministic three-step flow tailored to your scope. Every output is
            generated from fixed UK 2026 cost tables and multiplier ranges — no runtime guessing.
          </p>
        </Container>
      </Section>

      <Suspense
        fallback={
          <Section className="bg-[#f6f2ec] py-16 sm:py-20">
            <Container>
              <div className="rounded-3xl border border-[#dfd4c4] bg-white p-6 sm:p-8">
                <p className="text-[11px] uppercase tracking-[0.32em] text-[#8a765c]">Loading estimator</p>
                <p className="mt-3 text-sm text-[#675c4f]">Preparing extension, loft, and renovation models...</p>
              </div>
            </Container>
          </Section>
        }
      >
        <CalculatorWizard />
      </Suspense>
    </>
  );
}
