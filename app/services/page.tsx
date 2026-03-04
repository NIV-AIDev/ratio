import type { Metadata } from "next";
import JsonLd from "@/components/seo/json-ld";
import ServicesIntroHero from "@/components/services/ServicesIntroHero";
import ScrollStackServices from "@/components/services/ScrollStackServices";
import { buildLocalBusinessJsonLd, buildPageMetadata, siteConfig } from "@/lib/seo";

const pageTitle = "Services";
const pageDescription =
  "End-to-end residential construction, interiors, and development delivery for private clients across London. As an established construction company, we provide construction, architecture, interior design, and property development expertise through one integrated team.";

const services = [
  {
    label: "SERVICE 01",
    title: "Architecture",
    description:
      "Architect-led planning that turns the brief into a composed, buildable vision with planning clarity and elegant detailing.",
    bullets: [
      "Concept design and feasibility studies",
      "Planning submissions and approvals",
      "Technical coordination with consultants",
      "Material palettes and façade articulation",
    ],
    imageDesktop: "/images/placeholders/services/architecture/Arch2.jpg",
    imageMobile: "/images/placeholders/services/architecture/Arch2.jpg",
    cta: { label: "Learn More", href: "/services/architecture" },
    secondaryCta: { label: "View the process", href: "/about#process" },
  },
  {
    label: "SERVICE 02",
    title: "Construction",
    description:
      "Full-scope construction management with disciplined site leadership, risk control, and programme certainty.",
    bullets: [
      "Pre-construction cost planning",
      "Programme sequencing and logistics",
      "Specialist trade coordination",
      "Quality assurance and handover",
    ],
    imageDesktop: "/images/placeholders/services/construction/h21.png",
    imageMobile: "/images/placeholders/services/construction/h21.png",
    cta: { label: "Learn More", href: "/services/construction" },
    secondaryCta: { label: "Meet the team", href: "/about" },
  },
  {
    label: "SERVICE 03",
    title: "Interior Design",
    description:
      "Refined interior direction with an emphasis on craftsmanship, curated procurement, and spatial harmony.",
    bullets: [
      "Interior architecture and detailing",
      "Joinery, stone, and bespoke finishes",
      "Lighting, AV, and smart systems",
      "Furniture sourcing and styling",
    ],
    imageDesktop: "/images/placeholders/services/interior-design/hero-placeholder.jpg",
    imageMobile: "/images/placeholders/services/interior-design/hero-placeholder.jpg",
    cta: { label: "Learn More", href: "/services/interior-design" },
    secondaryCta: { label: "See recent work", href: "/projects" },
  },
  {
    label: "SERVICE 04",
    title: "Property Development",
    description:
      "End-to-end development oversight for private clients and investors seeking discreet, high-performance delivery.",
    bullets: [
      "Site acquisition support",
      "Design management and value engineering",
      "Procurement and contract strategy",
      "Delivery governance and reporting",
    ],
    imageDesktop: "/images/placeholders/services/property-development/m2.jpeg",
    imageMobile: "/images/placeholders/services/property-development/m2.jpeg",
    cta: { label: "Learn More", href: "/services/property-development" },
    secondaryCta: { label: "Discuss an opportunity", href: "/contact" },
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/services",
});

export default function ServicesPage() {
  const localBusinessJsonLd = buildLocalBusinessJsonLd({
    name: siteConfig.name,
    description: pageDescription,
  });

  return (
    <>
      <JsonLd data={localBusinessJsonLd} id="json-ld-local-business" />
      <ServicesIntroHero
        eyebrow="Services"
        title="Full-scope construction and interiors for private residences, backed by architecture and development expertise."
        description={pageDescription}
      />
      <ScrollStackServices services={services} />
    </>
  );
}
