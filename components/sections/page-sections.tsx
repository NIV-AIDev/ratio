import type { PageContent, SectionContent } from "@/lib/content";
import SectionGrid from "./section-grid";
import SectionHeading from "./section-heading";
import SectionShell from "./section-shell";

const renderSection = (section: SectionContent) => (
  <SectionShell key={section.id} id={section.id}>
    <SectionHeading
      label={section.label}
      title={section.title}
      description={section.description}
      as="h2"
    />
    {section.items && section.items.length > 0 ? (
      <SectionGrid items={section.items} columns={section.columns} />
    ) : null}
  </SectionShell>
);

export default function PageSections({ content }: { content: PageContent }) {
  return (
    <>
      <SectionShell id={content.intro.id}>
        <SectionHeading
          label={content.intro.label}
          title={content.intro.title}
          description={content.intro.description}
          as="h1"
        />
      </SectionShell>
      {content.sections.map((section) => renderSection(section))}
    </>
  );
}
