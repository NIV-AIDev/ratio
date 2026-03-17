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
  "the-durham-project-1",
  "the-croft-project",
  "the-fulwell-project",
  "the-pound-project-1",
  "the-rothchilds-project",
  "the-silverstone",
  "the-queens-gate-gardens",
  "ansty-manor",
  "the-sawley",
  "central-park-hotel",
  "ealing",
  "heath",
  "st-heliers",
  "the-denton",
  "st-elmo",
  "the-charlie",
  "the-claremont",
  "the-beachmont",
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
  galleryImages?: ProjectImage[];
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

const projectPlaceholderImages = [
  "/images/placeholders/projects/project-01.jpg",
  "/images/placeholders/projects/project-02.jpg",
  "/images/placeholders/projects/project-03.jpg",
  "/images/placeholders/projects/project-04.jpg",
  "/images/placeholders/projects/project-05.jpg",
  "/images/placeholders/projects/project-06.jpg",
] as const;

const slugToTitleCase = (slug: string) =>
  slug
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");

type GeneratedProjectEntryConfig = {
  slug: ProjectSlug;
  title?: string;
  order: number;
  location: string;
  summary: string;
  assets?: ProjectEntry["assets"];
  imageBuilder?: (fileName: string, alt: string, placeholderSrc: string) => ProjectImage;
  fileNames: string[];
};

const getFirstNumericToken = (fileName: string) => {
  const numericMatch = fileName.match(/\d+/);

  if (!numericMatch) {
    return Number.POSITIVE_INFINITY;
  }

  return Number.parseInt(numericMatch[0], 10);
};

const compareImageFileNames = (left: string, right: string) => {
  const leftNumericToken = getFirstNumericToken(left);
  const rightNumericToken = getFirstNumericToken(right);

  if (leftNumericToken !== rightNumericToken) {
    return leftNumericToken - rightNumericToken;
  }

  return left.localeCompare(right, undefined, { numeric: true, sensitivity: "base" });
};

const buildGeneratedProjectEntry = ({
  slug,
  title: providedTitle,
  order,
  location,
  summary,
  assets: providedAssets,
  imageBuilder: providedImageBuilder,
  fileNames,
}: GeneratedProjectEntryConfig): ProjectEntry => {
  const title = providedTitle ?? slugToTitleCase(slug);
  const imageBuilder =
    providedImageBuilder ??
    ((fileName: string, alt: string, placeholderSrc: string) =>
      buildProjectImage(slug, fileName, alt, placeholderSrc));
  const deduplicatedFileNames = Array.from(
    new Set(fileNames.map((fileName) => fileName.trim()).filter(Boolean)),
  );
  const safeFileNames =
    deduplicatedFileNames.length > 0 ? deduplicatedFileNames.sort(compareImageFileNames) : ["01.jpg"];

  const galleryImages = safeFileNames.map((fileName, index) =>
    imageBuilder(
      fileName,
      `${title} gallery image ${index + 1}`,
      projectPlaceholderImages[index % projectPlaceholderImages.length],
    ),
  );
  const getImage = (index: number) => galleryImages[index % galleryImages.length];

  const buildGeneratedImage = (index: number, label: string) =>
    ({
      ...getImage(index),
      alt: `${title} ${label}`,
    }) satisfies ProjectImage;

  return {
    slug,
    title,
    order,
    location,
    summary,
    assets: providedAssets ?? buildProjectAssets(slug),
    galleryImages,
    thumbnail: buildGeneratedImage(0, "thumbnail"),
    heroSlides: [
      buildGeneratedImage(0, "hero slide one"),
      buildGeneratedImage(1, "hero slide two"),
      buildGeneratedImage(2, "hero slide three"),
    ],
    splitImages: [
      buildGeneratedImage(3, "split gallery image left"),
      buildGeneratedImage(4, "split gallery image right"),
    ],
    fullBleedImages: [
      buildGeneratedImage(5, "full bleed image one"),
      buildGeneratedImage(6, "full bleed image two"),
    ],
  };
};

const generatedProjectEntries: ProjectEntry[] = [
  buildGeneratedProjectEntry({
    slug: "the-silverstone",
    order: 3,
    location: "London",
    summary: "A contemporary residential scheme balancing architectural clarity, crafted interiors, and delivery precision.",
    imageBuilder: (fileName, alt, placeholderSrc) =>
      buildProjectImage(
        "the-silverstone",
        fileName === "02.jpg"
          ? "021.jpg"
          : fileName === "03.jpg"
            ? "031.jpg"
            : fileName === "04.jpg"
              ? "041.jpg"
              : fileName === "06.jpg"
                ? "061.jpg"
                : fileName,
        alt,
        placeholderSrc,
      ),
    fileNames: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg"],
  }),
  buildGeneratedProjectEntry({
    slug: "the-queens-gate-gardens",
    order: 4,
    location: "London",
    summary: "A high-spec refurbishment coordinated across architecture, interiors, and build sequencing for seamless execution.",
    fileNames: [
      "01.jpeg",
      "02.jpeg",
      "03.jpeg",
      "04.jpg",
      "05.jpg",
      "06.png",
      "07.jpg",
      "08.png",
      "09.jpg",
      "10.jpg",
      "011.png",
      "012.jpg",
      "013.png",
      "014.jpg",
      "015.jpg",
      "016.png",
      "017.jpg",
      "018.jpg",
      "19.jpg",
      "020.jpg",
      "021.jpg",
      "022.jpg",
      "023.jpg",
      "024.jpg",
    ],
  }),
  buildGeneratedProjectEntry({
    slug: "ansty-manor",
    order: 5,
    location: "London",
    summary: "A heritage-led private residence project with refined planning, bespoke detailing, and controlled programme delivery.",
    fileNames: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpeg", "06.jpeg"],
  }),
  buildGeneratedProjectEntry({
    slug: "the-sawley",
    order: 7,
    location: "London",
    summary: "A residential transformation focused on proportion, material layering, and coordinated construction leadership.",
    fileNames: [
      "01.JPG",
      "02.jpg",
      "03.JPG",
      "04.jpg",
      "05.JPG",
      "06.jpg",
      "07.jpg",
      "08.PNG",
      "09.PNG",
      "010.PNG",
      "011.PNG",
      "013.PNG",
      "014.PNG",
      "015.PNG",
      "017.jpg",
      "018.jpg",
      "019.jpg",
    ],
  }),
  buildGeneratedProjectEntry({
    slug: "central-park-hotel",
    order: 8,
    location: "London",
    summary: "A hotel-focused redesign combining guest experience planning, architectural discipline, and premium interior delivery.",
    fileNames: [
      "01.jpg",
      "02.jpg",
      "03.jpg",
      "04.jpg",
      "05.jpg",
      "06.jpg",
      "central-park-hotel-exterior-126921b8.jpg",
    ],
  }),
  buildGeneratedProjectEntry({
    slug: "ealing",
    order: 19,
    location: "London",
    summary: "A design-and-build residential project with streamlined approvals, tailored spaces, and high-quality finishing.",
    fileNames: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"],
  }),
  buildGeneratedProjectEntry({
    slug: "heath",
    order: 10,
    location: "London",
    summary: "A private home project delivering modern planning logic with warm, enduring interior character.",
    fileNames: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"],
  }),
  buildGeneratedProjectEntry({
    slug: "st-heliers",
    order: 11,
    location: "London",
    summary: "A carefully sequenced residential commission integrating architecture, interiors, and construction oversight.",
    assets: {
      imageDirectory: "/public/images/projects/st-elmo/",
      videoDirectory: "/public/videos/projects/st-heliers/",
    },
    imageBuilder: (fileName, alt, placeholderSrc) =>
      buildProjectImage("st-elmo", fileName, alt, placeholderSrc),
    fileNames: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"],
  }),
  buildGeneratedProjectEntry({
    slug: "the-denton",
    order: 12,
    location: "London",
    summary: "A full-scope private residence programme shaped by bespoke detailing and coordinated delivery control.",
    fileNames: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg"],
  }),
  buildGeneratedProjectEntry({
    slug: "st-elmo",
    order: 14,
    location: "London",
    summary: "A premium residential project balancing contemporary function with calm, refined spatial composition.",
    fileNames: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"],
  }),
  buildGeneratedProjectEntry({
    slug: "the-charlie",
    order: 15,
    location: "London",
    summary: "A one-stop architecture and interiors project delivered with rigorous detailing and buildability focus.",
    fileNames: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"],
  }),
  buildGeneratedProjectEntry({
    slug: "the-claremont",
    order: 16,
    location: "London",
    summary: "A high-end residential scheme developed through integrated design direction and construction management.",
    fileNames: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "Z62_3614.jpg"],
  }),
  buildGeneratedProjectEntry({
    slug: "the-beachmont",
    order: 17,
    location: "London",
    summary: "A compact but highly resolved project combining architectural intent, interior craft, and delivery certainty.",
    fileNames: ["01.jpg", "02.jpg", "03.jpg"],
  }),
];

export const resolveProjectImageSrc = (image: ProjectImage) => {
  if (useProjectPlaceholders && image.placeholderSrc) {
    return image.placeholderSrc;
  }

  return image.src;
};

export const projectsData: ProjectEntry[] = [
  buildGeneratedProjectEntry({
    slug: "the-durham-project-1",
    title: "The Durham Project",
    order: 13,
    location: "London",
    summary: "A layered family residence with bespoke joinery, controlled natural light, and precision sequencing.",
    fileNames: [
      "01.jpg",
      "02.jpg",
      "03.jpg",
      "04.jpg",
      "05.jpg",
      "06.jpg",
      "07.jpg",
      "08.jpg",
      "09.jpg",
    ],
  }),
  buildGeneratedProjectEntry({
    slug: "the-croft-project",
    order: 6,
    location: "London",
    summary: "A tailored private residence balancing warm material layering, refined lighting, and contemporary spatial flow.",
    assets: {
      imageDirectory: "/public/images/projects/The Croft/",
      videoDirectory: "/public/videos/projects/the-croft-project/",
    },
    imageBuilder: buildCroftImage,
    fileNames: [
      "01.jpeg",
      "02.jpeg",
      "03.jpeg",
      "04.jpeg",
      "05.jpeg",
      "07.jpeg",
      "08.jpeg",
      "09.jpeg",
      "010.jpeg",
      "011.jpeg",
      "IMG_1074.jpeg",
      "IMG_2359.jpeg",
    ],
  }),
  {
    slug: "the-fulwell-project",
    title: "The Fulwell Project",
    order: 18,
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
  buildGeneratedProjectEntry({
    slug: "the-pound-project-1",
    order: 1,
    location: "London",
    summary: "A meticulously coordinated project with restrained luxury detailing and programme-led execution.",
    title: "The Pound Project",
    fileNames: [
      "01.jpg",
      "02.jpg",
      "03.jpg",
      "04.jpg",
      "05.jpg",
      "06.jpg",
      "07.jpg",
      "08.jpg",
      "09.jpg",
      "010.jpg",
      "011.jpg",
      "012.jpg",
      "013.jpg",
      "6.jpg",
      "6 (2).jpg",
    ],
  }),
  buildGeneratedProjectEntry({
    slug: "the-rothchilds-project",
    order: 9,
    location: "London",
    summary: "A landmark private commission bringing together architecture, interiors, and delivery into one cohesive statement.",
    title: "The Rothchilds Project",
    fileNames: [
      "1.jpg",
      "2.jpg",
      "3.jpg",
      "4.jpg",
      "5.jpg",
      "6.jpg",
      "7.jpg",
      "8.jpg",
      "9.jpg",
      "11.jpg",
      "12.jpg",
      "13.jpg",
      "14.jpg",
      "15.jpg",
    ],
  }),
  ...generatedProjectEntries,
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
