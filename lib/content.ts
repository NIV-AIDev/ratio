export type SectionItem = {
  id: string;
  title: string;
  description?: string;
  meta?: string;
};

export type SectionContent = {
  id: string;
  label?: string;
  title: string;
  description?: string;
  items?: SectionItem[];
  columns?: 2 | 3;
};

export type PageContent = {
  intro: SectionContent;
  sections: SectionContent[];
};

const sectionDescription = "Short summary supplied by the CMS.";
const itemDescription = "Item details supplied by the CMS.";

const makeItems = (prefix: string, count: number): SectionItem[] =>
  Array.from({ length: count }, (_, index) => ({
    id: `${prefix}-${index + 1}`,
    title: `Item ${index + 1}`,
    description: itemDescription,
  }));

export const homeContent: PageContent = {
  intro: {
    id: "home-intro",
    label: "Home",
    title: "Primary headline",
    description: sectionDescription,
  },
  sections: [
    {
      id: "home-section-a",
      label: "Section",
      title: "Modular focus area",
      description: sectionDescription,
      items: makeItems("home-focus", 3),
      columns: 3,
    },
    {
      id: "home-section-b",
      label: "Section",
      title: "Featured collection",
      description: sectionDescription,
      items: makeItems("home-feature", 2),
      columns: 2,
    },
  ],
};

export const aboutContent: PageContent = {
  intro: {
    id: "about-intro",
    label: "About",
    title: "Studio overview",
    description: sectionDescription,
  },
  sections: [
    {
      id: "about-section-a",
      label: "Section",
      title: "Principles",
      description: sectionDescription,
      items: makeItems("about-principle", 3),
      columns: 3,
    },
    {
      id: "about-section-b",
      label: "Section",
      title: "Team structure",
      description: sectionDescription,
      items: makeItems("about-team", 2),
      columns: 2,
    },
  ],
};

export const servicesContent: PageContent = {
  intro: {
    id: "services-intro",
    label: "Services",
    title: "Capabilities overview",
    description: sectionDescription,
  },
  sections: [
    {
      id: "services-section-a",
      label: "Section",
      title: "Service grouping",
      description: sectionDescription,
      items: makeItems("services-group", 3),
      columns: 3,
    },
    {
      id: "services-section-b",
      label: "Section",
      title: "Engagement modes",
      description: sectionDescription,
      items: makeItems("services-mode", 2),
      columns: 2,
    },
  ],
};

export const projectsContent: PageContent = {
  intro: {
    id: "projects-intro",
    label: "Projects",
    title: "Project index",
    description: sectionDescription,
  },
  sections: [
    {
      id: "projects-section-a",
      label: "Section",
      title: "Selected work",
      description: sectionDescription,
      items: makeItems("projects-selected", 3),
      columns: 3,
    },
    {
      id: "projects-section-b",
      label: "Section",
      title: "Archive",
      description: sectionDescription,
      items: makeItems("projects-archive", 2),
      columns: 2,
    },
  ],
};

export const contactContent: PageContent = {
  intro: {
    id: "contact-intro",
    label: "Contact",
    title: "Contact overview",
    description: sectionDescription,
  },
  sections: [
    {
      id: "contact-section-a",
      label: "Section",
      title: "Contact channels",
      description: sectionDescription,
      items: makeItems("contact-channel", 3),
      columns: 3,
    },
    {
      id: "contact-section-b",
      label: "Section",
      title: "Locations",
      description: sectionDescription,
      items: makeItems("contact-location", 2),
      columns: 2,
    },
  ],
};
