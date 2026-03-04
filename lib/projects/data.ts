export const REQUIRED_PROJECT_IMAGE_FILES = [
  "hero-01.jpg",
  "hero-02.jpg",
  "hero-03.jpg",
  "split-left.jpg",
  "split-right.jpg",
  "full-bleed-01.jpg",
  "full-bleed-02.jpg",
] as const;

export const REQUIRED_PROJECT_VIDEO_DIRECTORY = "/public/videos/projects/<slug>/";

export const PROJECT_SLUGS = [
  "the-bryant-project",
  "the-durham-project-1",
  "the-croft-project",
  "the-fulwell-project",
  "the-pound-project-1",
  "the-rothchilds-project",
] as const;

export type ProjectSlug = (typeof PROJECT_SLUGS)[number];

export type ProjectImage = {
  src: string;
  alt: string;
  placeholderSrc?: string;
};

export type ProjectEntry = {
  slug: ProjectSlug;
  title: string;
  order: number;
  location: string;
  summary: string;
  heroSlides: [ProjectImage, ProjectImage, ProjectImage];
  thumbnail: ProjectImage;
  splitImages: [ProjectImage, ProjectImage];
  fullBleedImages: [ProjectImage, ProjectImage];
  assets: {
    imageDirectory: string;
    videoDirectory: string;
  };
};

export type ContinueJourneyCard = {
  title: string;
  href: string;
  description: string;
  ctaLabel: string;
  thumbnail: ProjectImage;
};

// TODO: set to false once final project imagery is uploaded to /public/images/projects/<slug>/.
const useProjectPlaceholders = false;

const buildProjectImage = (
  slug: ProjectSlug,
  fileName: string,
  alt: string,
  placeholderSrc: string,
): ProjectImage => ({
  // TODO: replace placeholder with final project imagery.
  // Expected file path: /public/images/projects/<slug>/<fileName>
  src: `/images/projects/${slug}/${fileName}`,
  alt,
  placeholderSrc,
});

const buildProjectAssets = (slug: ProjectSlug) => ({
  // TODO: populate this folder with final project imagery.
  imageDirectory: `/public/images/projects/${slug}/`,
  // TODO: add project videos to this folder if/when video modules are introduced.
  videoDirectory: `/public/videos/projects/${slug}/`,
});

const croftImageDirectoryUrl = "/images/projects/The%20Croft";

const buildCroftImage = (
  fileName: string,
  alt: string,
  placeholderSrc: string,
): ProjectImage => ({
  src: `${croftImageDirectoryUrl}/${encodeURIComponent(fileName)}`,
  alt,
  placeholderSrc,
});

export const resolveProjectImageSrc = (image: ProjectImage) => {
  if (useProjectPlaceholders && image.placeholderSrc) {
    return image.placeholderSrc;
  }

  return image.src;
};

export const projectsData: ProjectEntry[] = [
  {
    slug: "the-bryant-project",
    title: "The Bryant Project",
    order: 1,
    location: "London",
    summary: "A high-spec residential transformation balancing architectural structure with editorial interior detailing.",
    assets: buildProjectAssets("the-bryant-project"),
    thumbnail: buildProjectImage(
      "the-bryant-project",
      "the-bryant-project2.jpg",
      "The Bryant Project thumbnail",
      "/images/placeholders/projects/project-01.jpg",
    ),
    heroSlides: [
      buildProjectImage("the-bryant-project", "the-bryant-project2.jpg", "The Bryant Project hero slide one", "/images/placeholders/projects/project-01.jpg"),
      buildProjectImage("the-bryant-project", "the-bryant-project3.jpg", "The Bryant Project hero slide two", "/images/placeholders/projects/project-02.jpg"),
      buildProjectImage("the-bryant-project", "the-bryant-project4.jpg", "The Bryant Project hero slide three", "/images/placeholders/projects/project-03.jpg"),
    ],
    splitImages: [
      buildProjectImage("the-bryant-project", "the-bryant-project1.jpg", "The Bryant Project split gallery image left", "/images/placeholders/projects/project-02.jpg"),
      buildProjectImage("the-bryant-project", "the-bryant-project5.jpg", "The Bryant Project split gallery image right", "/images/placeholders/projects/project-03.jpg"),
    ],
    fullBleedImages: [
      buildProjectImage("the-bryant-project", "the-bryant-project6.jpg", "The Bryant Project full bleed image one", "/images/placeholders/projects/project-04.jpg"),
      buildProjectImage("the-bryant-project", "the-bryant-project2.jpg", "The Bryant Project full bleed image two", "/images/placeholders/projects/project-05.jpg"),
    ],
  },
  {
    slug: "the-durham-project-1",
    title: "The Durham Project",
    order: 2,
    location: "London",
    summary: "A layered family residence with bespoke joinery, controlled natural light, and precision sequencing.",
    assets: buildProjectAssets("the-durham-project-1"),
    thumbnail: buildProjectImage(
      "the-durham-project-1",
      "the-durham-project15.jpg",
      "The Durham Project thumbnail",
      "/images/placeholders/projects/project-02.jpg",
    ),
    heroSlides: [
      buildProjectImage("the-durham-project-1", "the-durham-project15.jpg", "The Durham Project hero slide one", "/images/placeholders/projects/project-02.jpg"),
      buildProjectImage("the-durham-project-1", "the-durham-project18.jpg", "The Durham Project hero slide two", "/images/placeholders/projects/project-03.jpg"),
      buildProjectImage("the-durham-project-1", "the-durham-project1.jpg", "The Durham Project hero slide three", "/images/placeholders/projects/project-04.jpg"),
    ],
    splitImages: [
      buildProjectImage("the-durham-project-1", "the-durham-project3.jpg", "The Durham Project split gallery image left", "/images/placeholders/projects/project-03.jpg"),
      buildProjectImage("the-durham-project-1", "the-durham-project7.jpg", "The Durham Project split gallery image right", "/images/placeholders/projects/project-04.jpg"),
    ],
    fullBleedImages: [
      buildProjectImage("the-durham-project-1", "the-durham-project20.jpg", "The Durham Project full bleed image one", "/images/placeholders/projects/project-05.jpg"),
      buildProjectImage("the-durham-project-1", "the-durham-project11.jpg", "The Durham Project full bleed image two", "/images/placeholders/projects/project-06.jpg"),
    ],
  },
  {
    slug: "the-croft-project",
    title: "The Croft Project",
    order: 3,
    location: "London",
    summary: "A tailored private residence balancing warm material layering, refined lighting, and contemporary spatial flow.",
    assets: {
      imageDirectory: "/public/images/projects/The Croft/",
      videoDirectory: "/public/videos/projects/the-croft-project/",
    },
    thumbnail: buildCroftImage(
      "Photo 12-10-2024, 15 44 16 (1).jpg",
      "The Croft Project thumbnail",
      "/images/placeholders/projects/project-03.jpg",
    ),
    heroSlides: [
      buildCroftImage("Photo 12-10-2024, 15 44 16 (11).jpg", "The Croft Project hero slide one", "/images/placeholders/projects/project-03.jpg"),
      buildCroftImage("Photo 12-10-2024, 15 44 16 (1).jpg", "The Croft Project hero slide two", "/images/placeholders/projects/project-04.jpg"),
      buildCroftImage("Photo 12-10-2024, 15 44 16 (2).jpg", "The Croft Project hero slide three", "/images/placeholders/projects/project-05.jpg"),
    ],
    splitImages: [
      buildCroftImage("Photo 12-10-2024, 15 44 16 (3).jpg", "The Croft Project split gallery image left", "/images/placeholders/projects/project-04.jpg"),
      buildCroftImage("Photo 12-10-2024, 15 44 16 (4).jpg", "The Croft Project split gallery image right", "/images/placeholders/projects/project-05.jpg"),
    ],
    fullBleedImages: [
      buildCroftImage("Photo 12-10-2024, 15 44 16 (8).jpg", "The Croft Project full bleed image one", "/images/placeholders/projects/project-06.jpg"),
      buildCroftImage("Photo 12-10-2024, 15 44 16 (9).jpg", "The Croft Project full bleed image two", "/images/placeholders/projects/project-01.jpg"),
    ],
  },
  {
    slug: "the-fulwell-project",
    title: "The Fulwell Project",
    order: 4,
    location: "London",
    summary: "A contemporary residence calibrated for lifestyle-led planning, buildability, and highly tailored finishes.",
    assets: buildProjectAssets("the-fulwell-project"),
    thumbnail: buildProjectImage(
      "the-fulwell-project",
      "Loft-conversion-london-the-ratio.jpg",
      "The Fulwell Project thumbnail",
      "/images/placeholders/projects/project-04.jpg",
    ),
    heroSlides: [
      buildProjectImage("the-fulwell-project", "Loft-conversion-london-the-ratio.jpg", "The Fulwell Project hero slide one", "/images/placeholders/projects/project-04.jpg"),
      buildProjectImage("the-fulwell-project", "1.jpg", "The Fulwell Project hero slide two", "/images/placeholders/projects/project-05.jpg"),
      buildProjectImage("the-fulwell-project", "Untitled1.jpg", "The Fulwell Project hero slide three", "/images/placeholders/projects/project-06.jpg"),
    ],
    splitImages: [
      buildProjectImage("the-fulwell-project", "1.jpg", "The Fulwell Project split gallery image left", "/images/placeholders/projects/project-05.jpg"),
      buildProjectImage("the-fulwell-project", "loft-conversion-london-fulwell-project.jpg", "The Fulwell Project split gallery image right", "/images/placeholders/projects/project-06.jpg"),
    ],
    fullBleedImages: [
      buildProjectImage("the-fulwell-project", "Loft-conversion-london-the-ratio.jpg", "The Fulwell Project full bleed image one", "/images/placeholders/projects/project-01.jpg"),
      buildProjectImage("the-fulwell-project", "Untitled1.jpg", "The Fulwell Project full bleed image two", "/images/placeholders/projects/project-02.jpg"),
    ],
  },
  {
    slug: "the-pound-project-1",
    title: "The Pound Project",
    order: 5,
    location: "London",
    summary: "A meticulously coordinated project with restrained luxury detailing and programme-led execution.",
    assets: buildProjectAssets("the-pound-project-1"),
    thumbnail: buildProjectImage(
      "the-pound-project-1",
      "10.jpg",
      "The Pound Project thumbnail",
      "/images/placeholders/projects/project-05.jpg",
    ),
    heroSlides: [
      buildProjectImage("the-pound-project-1", "14a.jpg", "The Pound Project hero slide one", "/images/placeholders/projects/project-05.jpg"),
      buildProjectImage("the-pound-project-1", "12a.jpg", "The Pound Project hero slide two", "/images/placeholders/projects/project-06.jpg"),
      buildProjectImage("the-pound-project-1", "9a.jpg", "The Pound Project hero slide three", "/images/placeholders/projects/project-01.jpg"),
    ],
    splitImages: [
      buildProjectImage("the-pound-project-1", "6.jpg", "The Pound Project split gallery image left", "/images/placeholders/projects/project-06.jpg"),
      buildProjectImage("the-pound-project-1", "9.jpg", "The Pound Project split gallery image right", "/images/placeholders/projects/project-01.jpg"),
    ],
    fullBleedImages: [
      buildProjectImage("the-pound-project-1", "8.jpg", "The Pound Project full bleed image one", "/images/placeholders/projects/project-02.jpg"),
      buildProjectImage("the-pound-project-1", "10.jpg", "The Pound Project full bleed image two", "/images/placeholders/projects/project-03.jpg"),
    ],
  },
  {
    slug: "the-rothchilds-project",
    title: "The Rothchilds Project",
    order: 6,
    location: "London",
    summary: "A landmark private commission bringing together architecture, interiors, and delivery into one cohesive statement.",
    assets: buildProjectAssets("the-rothchilds-project"),
    thumbnail: buildProjectImage(
      "the-rothchilds-project",
      "1.jpg",
      "The Rothchilds Project thumbnail",
      "/images/placeholders/projects/project-06.jpg",
    ),
    heroSlides: [
      buildProjectImage("the-rothchilds-project", "1.jpg", "The Rothchilds Project hero slide one", "/images/placeholders/projects/project-06.jpg"),
      buildProjectImage("the-rothchilds-project", "4.jpg", "The Rothchilds Project hero slide two", "/images/placeholders/projects/project-01.jpg"),
      buildProjectImage("the-rothchilds-project", "8.jpg", "The Rothchilds Project hero slide three", "/images/placeholders/projects/project-02.jpg"),
    ],
    splitImages: [
      buildProjectImage("the-rothchilds-project", "3.jpg", "The Rothchilds Project split gallery image left", "/images/placeholders/projects/project-01.jpg"),
      buildProjectImage("the-rothchilds-project", "2.jpg", "The Rothchilds Project split gallery image right", "/images/placeholders/projects/project-02.jpg"),
    ],
    fullBleedImages: [
      buildProjectImage("the-rothchilds-project", "6.jpg", "The Rothchilds Project full bleed image one", "/images/placeholders/projects/project-03.jpg"),
      buildProjectImage("the-rothchilds-project", "11.jpg", "The Rothchilds Project full bleed image two", "/images/placeholders/projects/project-04.jpg"),
    ],
  },
];

export const getOrderedProjects = () =>
  [...projectsData].sort((left, right) => left.order - right.order);

export const getProjectBySlug = (slug: string) =>
  projectsData.find((project) => project.slug === slug);

const nonProjectJourneyCards: ContinueJourneyCard[] = [
  {
    title: "Showroom",
    href: "/showroom",
    description: "Continue exploring curated project materials and design references.",
    ctaLabel: "Visit showroom",
    thumbnail: {
      src: "/images/placeholders/showroom/hero-editorial.jpg",
      alt: "Editorial hero view of The Ratio showroom.",
    },
  },
  {
    title: "Reviews",
    href: "/reviews",
    description: "Read client feedback and project experience insights.",
    ctaLabel: "Read reviews",
    thumbnail: {
      src: "/images/placeholders/continue-journey/reviews-fluid.svg",
      alt: "Fluid abstract visual for reviews journey card.",
    },
  },
  {
    title: "Blog",
    href: "/blog",
    description: "Explore journal content on architecture, interiors, and delivery.",
    ctaLabel: "Explore blog",
    thumbnail: {
      src: "/images/placeholders/continue-journey/blog-fluid.svg",
      alt: "Fluid editorial visual for blog journey card.",
    },
  },
];

export const getContinueJourneyCards = (
  currentSlug: ProjectSlug,
): ContinueJourneyCard[] => {
  const orderedProjects = getOrderedProjects();
  const currentIndex = orderedProjects.findIndex(
    (project) => project.slug === currentSlug,
  );

  if (currentIndex === -1) {
    return [];
  }

  if (currentIndex === orderedProjects.length - 1) {
    return nonProjectJourneyCards;
  }

  const cards: ContinueJourneyCard[] = [];

  for (let offset = 1; cards.length < 3 && offset < orderedProjects.length + 3; offset += 1) {
    const candidate = orderedProjects[(currentIndex + offset) % orderedProjects.length];
    if (!candidate || candidate.slug === currentSlug) {
      continue;
    }

    cards.push({
      title: candidate.title,
      href: `/projects/${candidate.slug}`,
      description: candidate.summary,
      ctaLabel: "View project",
      thumbnail: candidate.heroSlides[0] ?? candidate.thumbnail,
    });
  }

  return cards;
};
