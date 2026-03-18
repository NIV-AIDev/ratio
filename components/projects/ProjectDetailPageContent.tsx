"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Container from "@/components/ui/container";
import {
  resolveProjectImageSrc,
  type ContinueJourneyCard,
  type ProjectEntry,
  type ProjectImage,
} from "@/lib/projects/data";

type ProjectDetailPageContentProps = {
  project: ProjectEntry;
  continueJourneyCards: ContinueJourneyCard[];
};

const revealEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const primaryButtonClass =
  "inline-flex min-h-11 items-center justify-center rounded-full bg-[#b6814b] px-7 py-3 text-[11px] uppercase tracking-[0.32em] text-[#1a1a18] transition duration-300 hover:-translate-y-0.5 hover:bg-[#9c6b3f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b6814b]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#171310]";

const secondaryButtonClass =
  "inline-flex min-h-11 items-center justify-center rounded-full border border-white/55 px-6 py-3 text-[11px] uppercase tracking-[0.32em] text-white transition duration-300 hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#171310]";

const heritageButtonClass =
  "inline-flex min-h-11 items-center justify-center rounded-full border border-[#ab9468] px-7 py-3 text-[11px] font-medium uppercase tracking-[0.26em] text-[#ab9468] transition duration-300 hover:bg-[#ab9468] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ab9468]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#efefef]";

const journeyCardAccents = [
  "from-[#e8d8be]/50 via-[#d6b88f]/30 to-transparent",
  "from-[#d6e0e8]/50 via-[#adc6d6]/30 to-transparent",
  "from-[#d8d6e8]/50 via-[#bab0da]/30 to-transparent",
];

const sectionFiveCopyBySlug: Partial<Record<ProjectEntry["slug"], string>> = {
  "the-durham-project-1":
    "The Durham Project concentrated on restoring period character while introducing contemporary joinery, clean services integration, and a more fluid room-to-room sequence.",
  "the-croft-project":
    "The Croft Project prioritised warm family living, with a reworked kitchen core, tailored storage, and soft material transitions that keep each space calm and connected.",
  "the-fulwell-project":
    "At The Fulwell Project, we unlocked loft volume through precise planning, light-balanced zoning, and custom millwork that made compact areas feel highly resolved.",
  "the-pound-project-1":
    "The Pound Project balanced listed-building constraints with contemporary interior detailing, preserving architectural integrity while sharpening daily functionality.",
  "the-rothchilds-project":
    "For The Rothchilds Project, the design direction focused on layered natural materials, gallery-like spatial framing, and finely controlled transitions between formal and informal rooms.",
  "the-silverstone":
    "The Silverstone Project was led by clean architectural lines, restrained palettes, and precision-built detailing to create a crisp, modern residential atmosphere.",
  "the-queens-gate-gardens":
    "The Queens Gate Gardens scheme delivered a high-spec refurbishment with heritage-sensitive upgrades, improving comfort and flow without losing period identity.",
  "ansty-manor":
    "At Ansty Manor, our approach protected historic fabric while introducing bespoke modern comfort, including tailored joinery and carefully balanced lighting layers.",
  "the-sawley":
    "The Sawley Project streamlined circulation and day-to-day functionality, pairing durable finishes with elegant detailing suited to long-term private living.",
  "central-park-hotel":
    "Central Park Hotel focused on guest experience, combining hospitality-led planning, robust specification choices, and coordinated construction sequencing across key spaces.",
  ealing:
    "The Ealing project optimised family-first layouts, introducing practical storage, improved natural flow, and durable finishes that still read as refined.",
  heath:
    "At Heath, the concept centred on understated architectural rhythm, warm tactile materials, and disciplined detailing that elevates everyday use.",
  "st-heliers":
    "St Heliers was delivered as a tightly sequenced architecture-and-interiors package, ensuring concept intent remained intact through final installation.",
  "the-denton":
    "The Denton project refined proportion, sightlines, and light quality to create calm spaces with a stronger sense of depth and visual continuity.",
  "st-elmo":
    "St Elmo was shaped as a statement residence, with curated finishes, bold spatial composition, and controlled contrasts that give each room a distinctive identity.",
  "the-charlie":
    "The Charlie project solved compact planning challenges through bespoke joinery, efficient detailing, and selective material contrast to maximise perceived space.",
  "the-claremont":
    "At The Claremont, we layered timeless finishes with contemporary detailing to deliver a residence that feels current while remaining durable for long-term use.",
  "the-beachmont":
    "The Beachmont project focused on generous social zones, crafted material pairings, and exacting build quality to support both entertaining and day-to-day comfort.",
};

const extractImageFileName = (src: string) => {
  const segments = src.split(/[/\\]/);
  return decodeURIComponent(segments[segments.length - 1] ?? src);
};

const getLastNumericToken = (src: string) => {
  const numericTokens = extractImageFileName(src).match(/\d+/g);

  if (!numericTokens || numericTokens.length === 0) {
    return Number.POSITIVE_INFINITY;
  }

  return Number.parseInt(numericTokens[numericTokens.length - 1], 10);
};

const compareImageSourcesByNumericOrder = (leftSrc: string, rightSrc: string) => {
  const leftNumericToken = getLastNumericToken(leftSrc);
  const rightNumericToken = getLastNumericToken(rightSrc);

  if (leftNumericToken !== rightNumericToken) {
    return leftNumericToken - rightNumericToken;
  }

  return extractImageFileName(leftSrc).localeCompare(extractImageFileName(rightSrc), undefined, {
    numeric: true,
    sensitivity: "base",
  });
};

const dedupeProjectImages = (images: ProjectImage[]) => {
  const seen = new Set<string>();

  return images.filter((image) => {
    if (seen.has(image.src)) {
      return false;
    }

    seen.add(image.src);
    return true;
  });
};

const selectUniqueProjectImages = (
  images: ProjectImage[],
  preferredIndexes: number[],
  minimumCount = 2,
) => {
  const selected: ProjectImage[] = [];
  const selectedSources = new Set<string>();

  for (const index of preferredIndexes) {
    const image = images[index];

    if (!image || selectedSources.has(image.src)) {
      continue;
    }

    selected.push(image);
    selectedSources.add(image.src);

    if (selected.length >= minimumCount) {
      return selected;
    }
  }

  for (const image of images) {
    if (selectedSources.has(image.src)) {
      continue;
    }

    selected.push(image);
    selectedSources.add(image.src);

    if (selected.length >= minimumCount) {
      return selected;
    }
  }

  if (selected.length === 1) {
    selected.push(selected[0]);
  }

  return selected.length > 0 ? selected : [images[0], images[0]];
};

export default function ProjectDetailPageContent({
  project,
  continueJourneyCards,
}: ProjectDetailPageContentProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeDetailIndex, setActiveDetailIndex] = useState(0);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [shouldCenterGalleryThumbnails, setShouldCenterGalleryThumbnails] =
    useState(false);
  const [activeSuiteIndex, setActiveSuiteIndex] = useState(0);
  const [galleryAspectRatios, setGalleryAspectRatios] = useState<Record<string, number>>({});
  const [hasHeroScrollRevealStarted, setHasHeroScrollRevealStarted] = useState(
    () => typeof window !== "undefined" && window.scrollY > 8,
  );

  const heroSectionRef = useRef<HTMLElement | null>(null);
  const splitSectionRef = useRef<HTMLElement | null>(null);
  const fullBleedOneRef = useRef<HTMLElement | null>(null);
  const suiteSectionRef = useRef<HTMLElement | null>(null);
  const splitTwoSectionRef = useRef<HTMLElement | null>(null);
  const heritageSectionRef = useRef<HTMLElement | null>(null);
  const journeyIntroSectionRef = useRef<HTMLElement | null>(null);
  const journeyCardsSectionRef = useRef<HTMLElement | null>(null);
  const galleryThumbnailsTrackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktop(mediaQuery.matches);
    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  const isPoundProject = project.slug === "the-pound-project-1";

  const galleryImages = useMemo(() => {
    const sourceImages =
      project.galleryImages && project.galleryImages.length > 0
        ? project.galleryImages
        : [
            ...project.heroSlides,
            ...project.splitImages,
            ...project.fullBleedImages,
          ];

    const dedupedGalleryImages = dedupeProjectImages(sourceImages).sort((left, right) =>
      compareImageSourcesByNumericOrder(left.src, right.src),
    );

    if (!isPoundProject) {
      return dedupedGalleryImages;
    }

    const existingSources = new Set(dedupedGalleryImages.map((image) => image.src));
    const missingPreviousHeroImages = project.heroSlides
      .slice(0, 3)
      .filter((image) => !existingSources.has(image.src));

    if (missingPreviousHeroImages.length === 0) {
      return dedupedGalleryImages;
    }

    return [...dedupedGalleryImages, ...missingPreviousHeroImages].sort((left, right) =>
      compareImageSourcesByNumericOrder(left.src, right.src),
    );
  }, [
    isPoundProject,
    project.fullBleedImages,
    project.galleryImages,
    project.heroSlides,
    project.splitImages,
  ]);

  const safeGalleryImages = useMemo(() => {
    if (galleryImages.length > 0) {
      return galleryImages;
    }

    return [project.heroSlides[0]];
  }, [galleryImages, project.heroSlides]);

  const heroSlides = useMemo(
    () => safeGalleryImages.slice(0, Math.min(4, safeGalleryImages.length)),
    [safeGalleryImages],
  );
  const staticHeroImage = heroSlides[0] ?? safeGalleryImages[0];

  const detailMediaSlides = useMemo<[ProjectImage, ProjectImage]>(() => {
    const totalImages = safeGalleryImages.length;

    return [
      safeGalleryImages[1 % totalImages] ?? safeGalleryImages[0],
      safeGalleryImages[2 % totalImages] ?? safeGalleryImages[0],
    ];
  }, [safeGalleryImages]);
  const sectionTwoImage = detailMediaSlides[0] ?? safeGalleryImages[0];

  const splitTwoImage = useMemo(
    () => safeGalleryImages[3 % safeGalleryImages.length] ?? safeGalleryImages[0],
    [safeGalleryImages],
  );

  const sectionFourImages = useMemo(() => {
    const lastIndex = safeGalleryImages.length - 1;
    return selectUniqueProjectImages(safeGalleryImages, [
      Math.min(1, lastIndex),
      Math.min(3, lastIndex),
      Math.min(2, lastIndex),
      0,
    ]);
  }, [safeGalleryImages]);

  const sectionSixImages = useMemo(() => {
    const lastIndex = safeGalleryImages.length - 1;
    const sectionSixPrimaryIndex = isPoundProject ? Math.min(10, lastIndex) : Math.max(0, lastIndex - 1);
    return selectUniqueProjectImages(safeGalleryImages, [
      sectionSixPrimaryIndex,
      lastIndex,
      0,
    ]);
  }, [isPoundProject, safeGalleryImages]);

  const detailSlides = useMemo(
    () => [
      {
        title: "Project Brief",
        body:
          `${project.summary} The brief centred on preserving architectural character while delivering a modern private residential environment.`,
      },
      {
        title: "Design Direction",
        body:
          `Our team shaped a refined sequence of spaces around material quality, proportion, and bespoke detailing to align with ${project.location} super-prime expectations.`,
      },
    ],
    [project.location, project.summary],
  );

  const sectionFiveCopy = useMemo(() => {
    return (
      sectionFiveCopyBySlug[project.slug] ??
      `${project.title} was delivered through an integrated design-and-build process in ${project.location}, aligning architecture, interiors, and construction sequencing from concept through completion.`
    );
  }, [project.location, project.slug, project.title]);

  const firstSuiteTitle =
    project.slug === "the-croft-project"
      ? "The Kitchen"
      : project.slug.startsWith("the-durham-project")
        ? "Private Suite"
        : "Living Suite";

  const suiteSlides = useMemo(
    () => [
      {
        title: firstSuiteTitle,
        subtitle: firstSuiteTitle === "Private Suite" ? "Refined" : "Suite",
        image: sectionFourImages[0],
      },
      {
        title: "Private Suite",
        subtitle: "Refined",
        image: sectionFourImages[1],
      },
    ],
    [firstSuiteTitle, sectionFourImages],
  );

  const resolvedActiveGalleryIndex = activeGalleryIndex % safeGalleryImages.length;
  const resolvedActiveSuiteIndex = activeSuiteIndex % suiteSlides.length;

  const activeGalleryImage =
    safeGalleryImages[resolvedActiveGalleryIndex] ?? safeGalleryImages[0];
  const activeGalleryAspectRatio = galleryAspectRatios[activeGalleryImage.src] ?? 16 / 10;
  const galleryFrameAspectRatio = isPoundProject ? 16 / 10 : activeGalleryAspectRatio;
  const activeDetail = detailSlides[activeDetailIndex] ?? detailSlides[0];
  const revealDistance = isDesktop ? 20 : 12;
  const fadeUpInEase: [number, number, number, number] = [0.22, 0.61, 0.36, 1];
  const isStElmoProject = project.slug === "st-elmo";
  const shouldHideFourthAndSixthSections =
    project.slug === "ansty-manor" || project.slug === "the-silverstone";
  const stElmoResponsiveSizes =
    "(max-width: 768px) 100vw, (max-width: 1024px) 90vw, (max-width: 1400px) 80vw, 70vw";

  const heroTransition = prefersReducedMotion
    ? "transform 0.01s linear"
    : "transform 0.82s cubic-bezier(0.19, 1, 0.22, 1)";

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end start"],
  });

  const { scrollYProgress: splitProgress } = useScroll({
    target: splitSectionRef,
    offset: ["start 92%", "start 76%"],
  });

  const { scrollYProgress: fullBleedOneProgress } = useScroll({
    target: fullBleedOneRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: suiteProgress } = useScroll({
    target: suiteSectionRef,
    offset: ["start 92%", "start 76%"],
  });

  const { scrollYProgress: splitTwoProgress } = useScroll({
    target: splitTwoSectionRef,
    offset: ["start 94%", "start 80%"],
  });

  const { scrollYProgress: heritageProgress } = useScroll({
    target: heritageSectionRef,
    offset: ["start 96%", "start 82%"],
  });

  const { scrollYProgress: journeyIntroProgress } = useScroll({
    target: journeyIntroSectionRef,
    offset: ["start 96%", "start 84%"],
  });

  const { scrollYProgress: journeyCardsProgress } = useScroll({
    target: journeyCardsSectionRef,
    offset: ["start 96%", "start 84%"],
  });

  const heroCopyOpacity = useTransform(heroProgress, [0, 0.34], [1, 0.74]);
  const heroCopyY = useTransform(heroProgress, [0, 0.34], [0, revealDistance]);

  const splitSectionOpacity = useTransform(splitProgress, [0, 0.22], [0.985, 1]);
  const splitCopyOpacity = useTransform(splitProgress, [0.1, 0.56], [0, 1]);
  const splitCopyY = useTransform(splitProgress, [0.1, 0.56], [revealDistance, 0]);

  const fullBleedOneOpacity = useTransform(fullBleedOneProgress, [0, 0.2], [0.985, 1]);
  const fullBleedOneY = useTransform(fullBleedOneProgress, [0, 1], [10, -10]);

  const suiteSectionOpacity = useTransform(suiteProgress, [0, 0.22], [0.985, 1]);

  const splitTwoSectionOpacity = useTransform(splitTwoProgress, [0, 0.24], [0.99, 1]);
  const splitTwoCopyOpacity = useTransform(splitTwoProgress, [0.12, 0.56], [0, 1]);
  const splitTwoCopyY = useTransform(splitTwoProgress, [0.12, 0.56], [revealDistance, 0]);

  const heritageBlockOpacity = useTransform(heritageProgress, [0.08, 0.52], [0, 1]);
  const heritageBlockY = useTransform(heritageProgress, [0.08, 0.52], [revealDistance, 0]);

  const journeyIntroOpacity = useTransform(journeyIntroProgress, [0.08, 0.5], [1, 1]);
  const journeyIntroY = useTransform(journeyIntroProgress, [0.08, 0.5], [0, 0]);

  const journeyCardsOpacity = useTransform(journeyCardsProgress, [0.08, 0.5], [1, 1]);
  const journeyCardsY = useTransform(journeyCardsProgress, [0.08, 0.5], [0, 0]);

  const nextGalleryImage = () => {
    setActiveGalleryIndex((current) => (current + 1) % safeGalleryImages.length);
  };

  const previousGalleryImage = () => {
    setActiveGalleryIndex(
      (current) => (current - 1 + safeGalleryImages.length) % safeGalleryImages.length,
    );
  };

  const registerGalleryAspectRatio = (
    imageSrc: string,
    naturalWidth: number,
    naturalHeight: number,
  ) => {
    if (naturalWidth <= 0 || naturalHeight <= 0) {
      return;
    }

    const ratio = Math.round((naturalWidth / naturalHeight) * 1000) / 1000;

    if (!Number.isFinite(ratio) || ratio <= 0) {
      return;
    }

    setGalleryAspectRatios((current) => {
      if (current[imageSrc] === ratio) {
        return current;
      }

      return { ...current, [imageSrc]: ratio };
    });
  };

  const nextSuite = () => {
    setActiveSuiteIndex((current) => (current + 1) % suiteSlides.length);
  };

  const previousSuite = () => {
    setActiveSuiteIndex((current) => (current - 1 + suiteSlides.length) % suiteSlides.length);
  };

  useEffect(() => {
    if (prefersReducedMotion || detailSlides.length < 2) {
      return;
    }

    const detailInterval = window.setInterval(() => {
      setActiveDetailIndex((current) => (current + 1) % detailSlides.length);
    }, 5000);

    return () => window.clearInterval(detailInterval);
  }, [detailSlides.length, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || suiteSlides.length < 2) {
      return;
    }

    const suiteInterval = window.setInterval(() => {
      setActiveSuiteIndex((current) => (current + 1) % suiteSlides.length);
    }, 5000);

    return () => window.clearInterval(suiteInterval);
  }, [prefersReducedMotion, suiteSlides.length]);

  useEffect(() => {
    if (prefersReducedMotion || safeGalleryImages.length < 2 || isGalleryModalOpen) {
      return;
    }

    const galleryInterval = window.setInterval(() => {
      setActiveGalleryIndex((current) => (current + 1) % safeGalleryImages.length);
    }, 5200);

    return () => window.clearInterval(galleryInterval);
  }, [isGalleryModalOpen, prefersReducedMotion, safeGalleryImages.length]);

  useEffect(() => {
    if (!isGalleryModalOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsGalleryModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isGalleryModalOpen]);

  useEffect(() => {
    const thumbnailsTrack = galleryThumbnailsTrackRef.current;

    if (!thumbnailsTrack) {
      return;
    }

    const syncGalleryThumbnailAlignment = () => {
      const canCenterThumbnails =
        thumbnailsTrack.scrollWidth <= thumbnailsTrack.clientWidth + 1;
      setShouldCenterGalleryThumbnails(canCenterThumbnails);
    };

    syncGalleryThumbnailAlignment();
    window.addEventListener("resize", syncGalleryThumbnailAlignment);

    return () =>
      window.removeEventListener("resize", syncGalleryThumbnailAlignment);
  }, [safeGalleryImages.length]);

  useEffect(() => {
    const revealThreshold = 8;
    if (window.scrollY > revealThreshold) return;

    let rafId = 0;

    const onScroll = () => {
      if (rafId !== 0) {
        return;
      }

      rafId = window.requestAnimationFrame(() => {
        if (window.scrollY > revealThreshold) {
          setHasHeroScrollRevealStarted(true);
        }
        rafId = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <article className="overflow-x-clip bg-[#f6f3ef] text-[#1a1a18]">
      <motion.section
        ref={heroSectionRef}
        className={
          isStElmoProject
            ? "relative min-h-[520px] w-full overflow-hidden bg-[#111] text-white sm:min-h-[600px] lg:min-h-[680px]"
            : "relative h-[74svh] min-h-[460px] overflow-hidden bg-black text-white sm:h-svh sm:min-h-[760px]"
        }
        style={isStElmoProject ? { aspectRatio: "16 / 9" } : undefined}
      >
        <div
          className={`absolute inset-0 h-full w-full ${
            isPoundProject ? "object-cover" : ""
          }`}
          style={isPoundProject ? { objectFit: "cover" } : undefined}
        >
          <Image
            src={resolveProjectImageSrc(staticHeroImage)}
            alt={staticHeroImage.alt}
            fill
            priority
            quality={100}
            className={
              isPoundProject
                ? "object-center brightness-[1.04]"
                : "object-cover object-center brightness-[1.05]"
            }
            style={
              isPoundProject
                ? { objectFit: "inherit", objectPosition: "center 42%" }
                : undefined
            }
            sizes="(max-width: 640px) 100vw, 100vw"
          />
        </div>

      <motion.div
        className="absolute inset-0 bg-linear-to-b from-[#15120d]/0 via-[#18140f]/22 to-[#130f0b]/42"
        initial={false}
        animate={{ opacity: hasHeroScrollRevealStarted ? 1 : 0 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 0.65, ease: revealEase }}
        aria-hidden
      />

        <Container className="relative z-10 flex h-full items-end pb-[calc(4rem+env(safe-area-inset-bottom))] pt-30 sm:pt-34 lg:pb-18">
          <motion.div
            style={{
              opacity: hasHeroScrollRevealStarted
                ? prefersReducedMotion
                  ? 1
                  : heroCopyOpacity
                : 0,
              y: hasHeroScrollRevealStarted
                ? prefersReducedMotion
                  ? 0
                  : heroCopyY
                : 18,
            }}
            className={`max-w-[930px] ${hasHeroScrollRevealStarted ? "" : "pointer-events-none select-none"}`}
          >
          <motion.div
            key={`${project.slug}-hero-static`}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.65, ease: revealEase }}
            className="space-y-3 pb-3"
          >
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0.01 : 1,
                delay: prefersReducedMotion ? 0 : 0.2,
                ease: fadeUpInEase,
              }}
              className="text-[12px] uppercase tracking-[0.18em] text-white/92 sm:text-[20px] sm:tracking-widest"
            >
              Luxury Interior Design for a Grade II Listed Home
            </motion.p>
            <h1 className="font-(--font-home-serif) text-[44px] uppercase leading-[1.05] tracking-[0.08em] text-white sm:text-[56px] lg:text-[64px]">
              {project.title}, {project.location}
            </h1>
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0.01 : 1,
                delay: prefersReducedMotion ? 0 : 0.6,
                ease: fadeUpInEase,
              }}
              className="text-[14px] uppercase tracking-[0.14em] text-[#ab9468] sm:text-base"
            >
              Private Client
            </motion.p>
            <p className="max-w-3xl text-base leading-relaxed text-white/82">{project.summary}</p>

            <div className="flex flex-wrap items-center gap-3 pt-3 sm:gap-4">
              <Link href="/projects" className={secondaryButtonClass}>
                Back to projects
              </Link>
              <Link href="/contact" className={primaryButtonClass}>
                Start a project
              </Link>
            </div>
          </motion.div>
          </motion.div>
        </Container>
      </motion.section>

      <motion.section
        ref={splitSectionRef}
        className="bg-[#ece8e1]"
        style={{ opacity: prefersReducedMotion ? 1 : splitSectionOpacity }}
      >
        <div className="flex flex-col bg-[#efefef] lg:min-h-[650px] lg:flex-row">
          <div
            className={`relative h-[54svh] min-h-[380px] max-h-[560px] w-full overflow-hidden border-b border-t border-r border-white lg:h-[650px] lg:w-1/2 ${
              isStElmoProject ? "bg-[#111]" : ""
            }`}
            style={isStElmoProject ? { aspectRatio: "3 / 2" } : undefined}
          >
            {/* TODO: replace placeholder with final project imagery. */}
            <Image
              src={resolveProjectImageSrc(sectionTwoImage)}
              alt={sectionTwoImage.alt}
              fill
              quality={100}
              className="object-cover object-center brightness-[1.04]"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-black/2" aria-hidden />
          </div>

          <div className="relative w-full border-b border-white bg-[#efefef] px-8 py-12 lg:h-[650px] lg:w-1/2 lg:border-t lg:px-24 lg:py-20">
            <div className="pointer-events-none absolute inset-x-10 top-10 h-24 border border-[#e2dfda]" aria-hidden />
            <motion.div
              className="relative z-10 max-w-[540px] space-y-6 lg:flex lg:h-full lg:flex-col lg:justify-center lg:space-y-0 lg:gap-6"
              style={{
                opacity: prefersReducedMotion ? 1 : splitCopyOpacity,
                y: prefersReducedMotion ? 0 : splitCopyY,
              }}
            >
              <div className="rounded-[18px] border border-[#ded9d2] bg-white/60 p-6 sm:p-7">
                <p className="text-[12px] uppercase tracking-[0.2em] text-[#ab9468]">Project Dimensions</p>
                <dl className="mt-4 grid grid-cols-2 gap-y-3 text-[11px] uppercase tracking-[0.18em] text-[#8e8880]">
                  <dt>Date</dt>
                  <dd>{project.order === 1 ? "2020/21" : "2021/22"}</dd>
                  <dt>Location</dt>
                  <dd>{project.location}</dd>
                  <dt>Client</dt>
                  <dd>Private</dd>
                  <dt>Size</dt>
                  <dd>5,000 sq ft</dd>
                </dl>
              </div>

              <div className="rounded-[18px] border border-[#ded9d2] bg-white/75 p-6 sm:p-7">
                <h2 className="font-(--font-home-serif) text-[32px] uppercase tracking-[0.08em] text-[#ab9468] sm:text-[36px]">
                  {activeDetail.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#8f8a82]">{activeDetail.body}</p>
                <p className="mt-4 text-base leading-relaxed text-[#8f8a82]">
                  The design team coordinated planning requirements, construction delivery, and craftsmanship detailing to
                  ensure the completed interiors remained faithful to architectural context.
                </p>
              </div>
            </motion.div>

            <div className="mt-8 flex items-center justify-end gap-2 lg:absolute lg:bottom-8 lg:right-8 lg:mt-0">
              {detailSlides.map((slide, index) => {
                const isActive = activeDetailIndex === index;
                return (
                  <button
                    key={slide.title}
                    type="button"
                    onClick={() => setActiveDetailIndex(index)}
                    aria-label={`Show detail slide ${index + 1}`}
                    className="inline-flex h-8 w-8 items-center justify-center"
                  >
                    <span
                      className={`h-3 w-3 rotate-45 border ${
                        isActive ? "border-[#ab9468] bg-[#ab9468]/25" : "border-[#c7b9a5] bg-transparent"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={fullBleedOneRef}
        className="bg-[#efefef] py-14 sm:py-16 lg:py-20"
        style={{
          opacity: prefersReducedMotion ? 1 : fullBleedOneOpacity,
          y: prefersReducedMotion ? 0 : fullBleedOneY,
        }}
      >
        <Container className="max-w-[1180px]">
          <div className="space-y-5">
            <button
              type="button"
              onClick={() => setIsGalleryModalOpen(true)}
              className="group relative block w-full rounded-[22px] p-[1px] text-left transition-[transform,box-shadow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[0_28px_46px_rgba(33,24,12,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ab9468]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#efefef]"
              aria-label={`Open image ${resolvedActiveGalleryIndex + 1} in fullscreen`}
            >
              <span className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(135deg,rgba(255,255,255,0.82)_0%,rgba(219,199,165,0.72)_22%,rgba(157,125,84,0.78)_52%,rgba(238,228,209,0.76)_100%)] opacity-92 transition-opacity duration-700 group-hover:opacity-100" />
              <span className="pointer-events-none absolute -inset-2 rounded-[28px] bg-[radial-gradient(circle_at_20%_12%,rgba(255,255,255,0.45),transparent_42%),radial-gradient(circle_at_78%_92%,rgba(172,141,98,0.24),transparent_56%)] opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100" />
              <span className="relative block rounded-[22px] bg-[#f7f5f2]/95 p-2 shadow-[0_12px_26px_rgba(33,24,12,0.14),inset_0_1px_0_rgba(255,255,255,0.76)] transition-shadow duration-700 group-hover:shadow-[0_18px_34px_rgba(33,24,12,0.2),inset_0_1px_0_rgba(255,255,255,0.78)] sm:p-3">
                <motion.div
                  layout
                  className={`relative mx-auto w-full max-w-[1120px] overflow-hidden rounded-[16px] [perspective:1200px] [transform-style:preserve-3d] ${
                    isStElmoProject ? "bg-[#111]" : ""
                  }`}
                  style={{ aspectRatio: galleryFrameAspectRatio }}
                  transition={{ duration: prefersReducedMotion ? 0.01 : 0.65, ease: revealEase }}
                >
                  {safeGalleryImages.map((image, index) => {
                    const isActive = resolvedActiveGalleryIndex === index;
                    return (
                      <motion.div
                        key={image.src}
                        className="absolute inset-0"
                        style={isPoundProject ? { objectFit: "cover" } : undefined}
                        initial={false}
                        animate={
                          isActive
                            ? { opacity: 1, z: 0 }
                            : { opacity: 0, z: -72 }
                        }
                        transition={{
                          duration: prefersReducedMotion ? 0.01 : 1.06,
                          ease: revealEase,
                        }}
                      >
                        {/* TODO: replace placeholder with final project imagery. */}
                        <Image
                          src={resolveProjectImageSrc(image)}
                          alt={image.alt}
                          fill
                          quality={100}
                          className={isPoundProject ? "object-center" : "object-cover object-center"}
                          style={
                            isPoundProject
                              ? { objectFit: "inherit", objectPosition: "center 46%" }
                              : undefined
                          }
                          onLoadingComplete={(loadedImage) => {
                            registerGalleryAspectRatio(
                              image.src,
                              loadedImage.naturalWidth,
                              loadedImage.naturalHeight,
                            );
                          }}
                          sizes={
                            isStElmoProject
                              ? stElmoResponsiveSizes
                              : "(min-width: 1024px) 92vw, 100vw"
                          }
                          priority={index === 0}
                        />
                      </motion.div>
                    );
                  })}
                </motion.div>
              </span>
            </button>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-[11px] uppercase tracking-[0.26em] text-[#8f8679]">
                Gallery image {resolvedActiveGalleryIndex + 1} / {safeGalleryImages.length}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={previousGalleryImage}
                  aria-label="Show previous gallery image"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#cdbd9f] text-[#8f7a58] transition-colors duration-300 hover:border-[#ab9468] hover:text-[#ab9468]"
                >
                  <span aria-hidden>←</span>
                </button>
                <button
                  type="button"
                  onClick={nextGalleryImage}
                  aria-label="Show next gallery image"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#cdbd9f] text-[#8f7a58] transition-colors duration-300 hover:border-[#ab9468] hover:text-[#ab9468]"
                >
                  <span aria-hidden>→</span>
                </button>
              </div>
            </div>

            <div
              ref={galleryThumbnailsTrackRef}
              className={`flex gap-3 overflow-x-auto pb-1 ${
                shouldCenterGalleryThumbnails ? "justify-center" : ""
              }`}
            >
              {safeGalleryImages.map((image, index) => {
                const isActive = index === resolvedActiveGalleryIndex;
                return (
                  <button
                    key={`${image.src}-${index}`}
                    type="button"
                    onClick={() => setActiveGalleryIndex(index)}
                    className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border transition-all duration-300 sm:h-24 sm:w-[8.5rem] ${
                      isActive
                        ? "border-[#ab9468] ring-2 ring-[#ab9468]/35"
                        : "border-[#d4cec4] hover:border-[#b9ab96]"
                    }`}
                    aria-label={`Select gallery image ${index + 1}`}
                    aria-current={isActive}
                  >
                    <Image
                      src={resolveProjectImageSrc(image)}
                      alt={image.alt}
                      fill
                      quality={85}
                      className="object-cover object-center"
                      sizes="136px"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </Container>
      </motion.section>

      {!shouldHideFourthAndSixthSections && (
        <motion.section
          ref={suiteSectionRef}
          className={`relative h-[74svh] min-h-[460px] overflow-hidden text-white sm:h-svh sm:min-h-[760px] ${
            isStElmoProject ? "bg-[#111]" : "bg-black"
          }`}
          style={{ opacity: prefersReducedMotion ? 1 : suiteSectionOpacity }}
        >
          <div
            className="absolute inset-0 flex h-full w-full"
            style={{
              width: `${suiteSlides.length * 100}%`,
              transform: `translateX(-${
                resolvedActiveSuiteIndex * (100 / suiteSlides.length)
              }%)`,
              transition: heroTransition,
            }}
          >
            {suiteSlides.map((slide, index) => (
              <div
                key={`${slide.title}-${index}-${slide.image.src}`}
                className="relative h-full shrink-0"
                style={{ width: `${100 / suiteSlides.length}%` }}
              >
                {/* TODO: replace placeholder with final project imagery. */}
                {isStElmoProject ? (
                  <>
                    <Image
                      src={resolveProjectImageSrc(slide.image)}
                      alt=""
                      fill
                      aria-hidden
                      quality={90}
                      className="pointer-events-none object-cover object-center opacity-60"
                      sizes={stElmoResponsiveSizes}
                    />
                    <Image
                      src={resolveProjectImageSrc(slide.image)}
                      alt={slide.image.alt}
                      fill
                      priority={index === 0}
                      quality={90}
                      className="object-contain object-center"
                      style={{ objectFit: "contain", objectPosition: "center" }}
                      sizes={stElmoResponsiveSizes}
                    />
                  </>
                ) : (
                  <Image
                    src={resolveProjectImageSrc(slide.image)}
                    alt={slide.image.alt}
                    fill
                    priority={index === 0}
                    quality={100}
                    className="object-cover object-center"
                    style={
                      isPoundProject
                        ? { objectPosition: "center 45%" }
                        : undefined
                    }
                    sizes="100vw"
                  />
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={previousSuite}
            aria-label="Show previous suite slide"
            className="absolute left-5 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/35 text-white/75 transition-colors hover:border-white hover:text-white lg:inline-flex"
          >
            <span aria-hidden>←</span>
          </button>
          <button
            type="button"
            onClick={nextSuite}
            aria-label="Show next suite slide"
            className="absolute right-5 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/35 text-white/75 transition-colors hover:border-white hover:text-white lg:inline-flex"
          >
            <span aria-hidden>→</span>
          </button>
        </motion.section>
      )}

      <motion.section
        ref={splitTwoSectionRef}
        className="bg-[#ece8e1]"
        style={{ opacity: prefersReducedMotion ? 1 : splitTwoSectionOpacity }}
      >
        <div className="flex min-h-[560px] flex-col bg-[#efefef] lg:flex-row">
          <div
            className={`relative h-[280px] w-full overflow-hidden border-b border-t border-r border-white lg:h-[560px] lg:w-1/2 ${
              isStElmoProject ? "bg-[#111]" : ""
            }`}
            style={
              isStElmoProject
                ? { aspectRatio: "3 / 2", height: "auto" }
                : undefined
            }
          >
            {/* TODO: replace placeholder with final project imagery. */}
            {isStElmoProject ? (
              <>
                <Image
                  src={resolveProjectImageSrc(splitTwoImage)}
                  alt=""
                  fill
                  aria-hidden
                  quality={90}
                  className="pointer-events-none object-cover object-center opacity-60"
                  sizes={stElmoResponsiveSizes}
                />
                <Image
                  src={resolveProjectImageSrc(splitTwoImage)}
                  alt={splitTwoImage.alt}
                  fill
                  quality={90}
                  className="object-contain object-center brightness-[1.04]"
                  style={{ objectFit: "contain", objectPosition: "center" }}
                  sizes={stElmoResponsiveSizes}
                />
              </>
            ) : (
              <Image
                src={resolveProjectImageSrc(splitTwoImage)}
                alt={splitTwoImage.alt}
                fill
                quality={100}
                className="object-cover object-center brightness-[1.04]"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            )}
          </div>
          <div className="flex h-[280px] w-full items-center border-b border-t border-white bg-[#efefef] px-8 lg:h-[560px] lg:w-1/2 lg:px-20">
            <motion.p
              className="max-w-[520px] text-base leading-relaxed text-[#afabab] sm:text-lg"
              style={{
                opacity: prefersReducedMotion ? 1 : splitTwoCopyOpacity,
                y: prefersReducedMotion ? 0 : splitTwoCopyY,
              }}
            >
              {sectionFiveCopy}
            </motion.p>
          </div>
        </div>
      </motion.section>

      {!shouldHideFourthAndSixthSections && (
        <section
          className={`relative h-[74svh] min-h-[460px] overflow-hidden sm:h-svh sm:min-h-[700px] ${
            isStElmoProject ? "bg-[#111]" : "bg-[#171310]"
          }`}
        >
          <Image
            src={resolveProjectImageSrc(sectionSixImages[0])}
            alt={sectionSixImages[0].alt}
            fill
            quality={100}
            className="object-cover object-center"
            style={
              isPoundProject
                ? { objectPosition: "center 44%" }
                : undefined
            }
            sizes="100vw"
          />
        </section>
      )}

      <motion.section
        ref={heritageSectionRef}
        className="bg-[#efefef] py-20 sm:py-24"
      >
        <Container className="max-w-5xl">
          <motion.div
            className="space-y-6 text-center"
            style={{
              opacity: prefersReducedMotion ? 1 : heritageBlockOpacity,
              y: prefersReducedMotion ? 0 : heritageBlockY,
            }}
          >
            <motion.h2
              initial={prefersReducedMotion ? false : { opacity: 0, y: revealDistance }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: prefersReducedMotion ? 0.01 : 1,
                delay: prefersReducedMotion ? 0 : 0.025,
                ease: "easeInOut",
              }}
              className="font-(--font-home-serif) text-3xl uppercase tracking-[0.08em] text-[#ab9468] sm:text-[40px]"
            >
              Interior Designers for Heritage Homes
            </motion.h2>
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: revealDistance }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: prefersReducedMotion ? 0.01 : 1,
                delay: prefersReducedMotion ? 0 : 0.05,
                ease: "easeInOut",
              }}
              className="mx-auto max-w-3xl text-base leading-relaxed text-[#afabab]"
            >
              The Ratio specialises in crafting interiors for listed and landmark residences. Each project protects
              architectural heritage while elevating comfort, function, and identity for contemporary living.
            </motion.p>
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: revealDistance }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: prefersReducedMotion ? 0.01 : 1,
                delay: prefersReducedMotion ? 0 : 0.05,
                ease: "easeInOut",
              }}
              className="mx-auto max-w-3xl text-base leading-relaxed text-[#afabab]"
            >
              Arrange a consultation to explore how we can transform your property into a statement of enduring
              elegance and craftsmanship.
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: revealDistance }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: prefersReducedMotion ? 0.01 : 1,
                delay: prefersReducedMotion ? 0 : 0.075,
                ease: "easeInOut",
              }}
              className="pt-2"
            >
              <Link href="/contact" className={heritageButtonClass}>
                Contact Our Team Today
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </motion.section>

      <motion.section
        ref={journeyIntroSectionRef}
        className="bg-[#13110e] pt-14 text-white sm:pt-16"
        style={{
          opacity: prefersReducedMotion ? 1 : journeyIntroOpacity,
          y: prefersReducedMotion ? 0 : journeyIntroY,
        }}
      >
        <Container className="max-w-[1160px]">
          <motion.div
            className="mx-auto max-w-[760px] text-center"
          >
            <motion.h2
              initial={prefersReducedMotion ? false : { opacity: 0, y: revealDistance }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: prefersReducedMotion ? 0.01 : 1,
                delay: prefersReducedMotion ? 0 : 0.025,
                ease: "easeInOut",
              }}
              className="font-(--font-home-serif) text-[30px] leading-[1.2] uppercase tracking-widest text-white"
            >
              Continue Your Journey
            </motion.h2>
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: revealDistance }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: prefersReducedMotion ? 0.01 : 1,
                delay: prefersReducedMotion ? 0 : 0.05,
                ease: "easeInOut",
              }}
              className="mt-6 text-base leading-relaxed text-white/76"
            >
              Delve deeper into our client services and our latest projects.
            </motion.p>
          </motion.div>
        </Container>
      </motion.section>

      <motion.section
        ref={journeyCardsSectionRef}
        className="bg-[#13110e] pb-16 text-white sm:pb-20 lg:pb-24"
        style={{
          opacity: prefersReducedMotion ? 1 : journeyCardsOpacity,
          y: prefersReducedMotion ? 0 : journeyCardsY,
        }}
      >
        <Container className="max-w-[1160px] pt-12">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {continueJourneyCards.map((card, index) => (
              <motion.article
                key={`${project.slug}-${card.href}`}
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: revealDistance }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: -8,
                        scale: 1.012,
                        transition: { duration: 0.36, ease: revealEase },
                      }
                }
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: prefersReducedMotion ? 0.01 : 0.82,
                  delay: prefersReducedMotion ? 0 : index * 0.08,
                  ease: revealEase,
                }}
                className="group relative isolate overflow-hidden rounded-[22px] border border-white/16 bg-white/5"
              >
                <div
                  className={`pointer-events-none absolute -top-14 left-1/2 h-36 w-[130%] -translate-x-1/2 rounded-full bg-linear-to-b ${journeyCardAccents[index % journeyCardAccents.length]} blur-none transition duration-700 group-hover:scale-110`}
                />
                <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_18%_0%,rgba(255,255,255,0.24),transparent_52%),radial-gradient(circle_at_82%_100%,rgba(183,152,111,0.16),transparent_50%)]" />
                <div className="pointer-events-none absolute inset-[1px] rounded-[inherit] border border-white/24" />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-y-12 left-[-70%] w-[64%] -translate-x-full rotate-12 bg-linear-to-r from-transparent via-white/45 to-transparent opacity-0 blur-none transition duration-700 ease-out group-hover:translate-x-[280%] group-hover:opacity-45"
                />
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute -inset-y-12 left-[-70%] w-[64%] -translate-x-full rotate-12 bg-linear-to-r from-transparent via-white/45 to-transparent opacity-0 blur-none"
                  initial={prefersReducedMotion ? false : { x: "0%", opacity: 0 }}
                  whileInView={
                    prefersReducedMotion
                      ? undefined
                      : {
                          x: "280%",
                          opacity: [0, 0.45, 0],
                        }
                  }
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 1.2, ease: revealEase }}
                />

                <Link href={card.href} className="block" aria-label={card.title}>
                  <div
                    className={`relative z-10 overflow-hidden ${
                      isStElmoProject ? "aspect-[4/3] h-auto" : "h-56 sm:h-60"
                    }`}
                  >
                    {/* TODO: replace placeholder with final project imagery. */}
                    <Image
                      src={resolveProjectImageSrc(card.thumbnail)}
                      alt={card.thumbnail.alt}
                      fill
                      quality={90}
                      className="object-cover transition duration-700 group-hover:scale-[1.05]"
                      sizes={
                        isStElmoProject
                          ? stElmoResponsiveSizes
                          : "(min-width: 1280px) 30vw, (min-width: 768px) 48vw, 100vw"
                      }
                    />
                    <div
                      className="absolute inset-0 bg-linear-to-b from-black/8 via-black/12 to-black/36"
                      aria-hidden
                    />
                  </div>

                  <div className="relative z-10 space-y-4 p-7">
                    <h3 className="font-(--font-home-serif) text-[30px] leading-[1.2] uppercase tracking-[0.03em] text-white">
                      {card.title}
                    </h3>
                    <p className="text-base leading-relaxed text-white/74">{card.description}</p>
                    <span className="inline-flex border-b border-[#ab9468] pb-1 text-[11px] uppercase tracking-[0.24em] text-[#d8be94] transition-colors duration-300 group-hover:text-white">
                      {card.ctaLabel}
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </Container>
      </motion.section>

      <AnimatePresence>
        {isGalleryModalOpen ? (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/84 p-4 backdrop-blur-sm sm:p-8"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.28, ease: revealEase }}
            role="dialog"
            aria-modal="true"
            aria-label="Project gallery image lightbox"
            onClick={() => setIsGalleryModalOpen(false)}
          >
            <button
              type="button"
              onClick={() => setIsGalleryModalOpen(false)}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-black/35 text-white transition-colors hover:border-[#d6c4aa] hover:text-[#d6c4aa] sm:right-8 sm:top-8"
              aria-label="Close image"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                <path d="M6.7 5.3 12 10.6l5.3-5.3 1.4 1.4-5.3 5.3 5.3 5.3-1.4 1.4-5.3-5.3-5.3 5.3-1.4-1.4 5.3-5.3-5.3-5.3z" fill="currentColor" />
              </svg>
            </button>

            <div
              className="relative w-full max-w-6xl overflow-hidden rounded-[18px] border border-white/20 bg-black"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative h-[56svh] min-h-[320px] sm:h-[68svh]">
                <Image
                  src={resolveProjectImageSrc(activeGalleryImage)}
                  alt={activeGalleryImage.alt}
                  fill
                  className="object-contain object-center"
                  style={
                    isStElmoProject
                      ? { objectFit: "contain", objectPosition: "center" }
                      : undefined
                  }
                  sizes={isStElmoProject ? stElmoResponsiveSizes : "90vw"}
                  priority
                />
                <p className="absolute bottom-5 left-5 text-[10px] uppercase tracking-[0.32em] text-white/70 sm:bottom-7 sm:left-7">
                  Image {resolvedActiveGalleryIndex + 1} of {safeGalleryImages.length}
                </p>
              </div>

              {safeGalleryImages.length > 1 ? (
                <div className="absolute bottom-4 right-4 flex items-center gap-2 sm:bottom-6 sm:right-6">
                  <button
                    type="button"
                    onClick={previousGalleryImage}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-black/40 text-white transition-colors hover:border-[#d6c4aa] hover:text-[#d6c4aa]"
                    aria-label="Previous image"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                      <path d="M15.7 5.3a1 1 0 0 1 0 1.4L10.4 12l5.3 5.3a1 1 0 1 1-1.4 1.4l-6-6a1 1 0 0 1 0-1.4l6-6a1 1 0 0 1 1.4 0z" fill="currentColor" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={nextGalleryImage}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-black/40 text-white transition-colors hover:border-[#d6c4aa] hover:text-[#d6c4aa]"
                    aria-label="Next image"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                      <path d="M8.3 18.7a1 1 0 0 1 0-1.4l5.3-5.3-5.3-5.3a1 1 0 1 1 1.4-1.4l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 0 1-1.4 0z" fill="currentColor" />
                    </svg>
                  </button>
                </div>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}
