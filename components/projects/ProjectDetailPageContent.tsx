"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Container from "@/components/ui/container";
import {
  resolveProjectImageSrc,
  type ContinueJourneyCard,
  type ProjectEntry,
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

export default function ProjectDetailPageContent({
  project,
  continueJourneyCards,
}: ProjectDetailPageContentProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [activeDetailIndex, setActiveDetailIndex] = useState(0);
  const [activeSuiteIndex, setActiveSuiteIndex] = useState(0);

  const heroSectionRef = useRef<HTMLElement | null>(null);
  const splitSectionRef = useRef<HTMLElement | null>(null);
  const fullBleedOneRef = useRef<HTMLElement | null>(null);
  const suiteSectionRef = useRef<HTMLElement | null>(null);
  const splitTwoSectionRef = useRef<HTMLElement | null>(null);
  const fullBleedTwoRef = useRef<HTMLElement | null>(null);
  const heritageSectionRef = useRef<HTMLElement | null>(null);
  const journeyIntroSectionRef = useRef<HTMLElement | null>(null);
  const journeyCardsSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktop(mediaQuery.matches);
    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  const heroSlides = useMemo(() => project.heroSlides, [project.heroSlides]);
  const heroCount = heroSlides.length;

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

  const suiteSlides = useMemo(() => {
    const defaultFirstSlideImage = project.heroSlides[2] ?? project.heroSlides[0];
    const defaultSecondSlideImage =
      project.splitImages[1] ?? project.heroSlides[1] ?? project.heroSlides[0];

    if (project.slug === "the-croft-project") {
      return [
        {
          title: "The Kitchen",
          subtitle: "Suite",
          image: defaultSecondSlideImage,
        },
        {
          title: "Private Suite",
          subtitle: "Refined",
          image: defaultFirstSlideImage,
        },
      ];
    }

    if (project.slug === "the-fulwell-project") {
      return [
        {
          title: "Living Suite",
          subtitle: "Suite",
          image: defaultFirstSlideImage,
        },
        {
          title: "Private Suite",
          subtitle: "Refined",
          image: project.fullBleedImages[0] ?? defaultFirstSlideImage,
        },
      ];
    }

    if (project.slug === "the-pound-project-1") {
      return [
        {
          title: "Living Suite",
          subtitle: "Suite",
          image: defaultFirstSlideImage,
        },
        {
          title: "Private Suite",
          subtitle: "Refined",
          image: project.heroSlides[1] ?? defaultFirstSlideImage,
        },
      ];
    }

    const firstSlideTitle =
      project.slug === "the-bryant-project"
        ? "The Kitchen"
        : project.slug.startsWith("the-durham-project")
          ? "Private Suite"
          : "Living Suite";

    return [
      {
        title: firstSlideTitle,
        subtitle: firstSlideTitle === "Private Suite" ? "Refined" : "Suite",
        image: defaultSecondSlideImage,
      },
      {
        title: "Private Suite",
        subtitle: "Refined",
        image: defaultFirstSlideImage,
      },
    ];
  }, [project.fullBleedImages, project.heroSlides, project.slug, project.splitImages]);

  const fullBleedOneImage = useMemo(
    () =>
      project.slug === "the-fulwell-project"
        ? project.splitImages[1] ?? project.fullBleedImages[0] ?? project.heroSlides[0]
        : project.fullBleedImages[0] ?? project.heroSlides[0],
    [project.fullBleedImages, project.heroSlides, project.slug, project.splitImages],
  );

  const activeHero = heroSlides[activeHeroIndex] ?? heroSlides[0];
  const activeDetail = detailSlides[activeDetailIndex] ?? detailSlides[0];
  const activeSuite = suiteSlides[activeSuiteIndex] ?? suiteSlides[0];
  const revealDistance = isDesktop ? 20 : 12;
  const fadeUpInEase: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

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

  const { scrollYProgress: fullBleedTwoProgress } = useScroll({
    target: fullBleedTwoRef,
    offset: ["start end", "end start"],
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
  const fullBleedOneImageY = useTransform(fullBleedOneProgress, [0, 1], [12, -12]);

  const suiteSectionOpacity = useTransform(suiteProgress, [0, 0.22], [0.985, 1]);
  const suiteCopyOpacity = useTransform(suiteProgress, [0.12, 0.54], [0, 1]);
  const suiteCopyY = useTransform(suiteProgress, [0.12, 0.54], [revealDistance, 0]);

  const splitTwoSectionOpacity = useTransform(splitTwoProgress, [0, 0.24], [0.99, 1]);
  const splitTwoCopyOpacity = useTransform(splitTwoProgress, [0.12, 0.56], [0, 1]);
  const splitTwoCopyY = useTransform(splitTwoProgress, [0.12, 0.56], [revealDistance, 0]);

  const fullBleedTwoOpacity = useTransform(fullBleedTwoProgress, [0, 0.2], [0.985, 1]);
  const fullBleedTwoImageY = useTransform(fullBleedTwoProgress, [0, 1], [12, -12]);

  const heritageBlockOpacity = useTransform(heritageProgress, [0.08, 0.52], [0, 1]);
  const heritageBlockY = useTransform(heritageProgress, [0.08, 0.52], [revealDistance, 0]);

  const journeyIntroOpacity = useTransform(journeyIntroProgress, [0.08, 0.5], [1, 1]);
  const journeyIntroY = useTransform(journeyIntroProgress, [0.08, 0.5], [0, 0]);

  const journeyCardsOpacity = useTransform(journeyCardsProgress, [0.08, 0.5], [1, 1]);
  const journeyCardsY = useTransform(journeyCardsProgress, [0.08, 0.5], [0, 0]);

  const nextHero = () => {
    setActiveHeroIndex((current) => (current + 1) % heroCount);
  };

  const previousHero = () => {
    setActiveHeroIndex((current) => (current - 1 + heroCount) % heroCount);
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

  return (
    <article className="overflow-x-clip bg-[#f6f3ef] text-[#1a1a18]">
      <motion.section
        ref={heroSectionRef}
        className="relative h-svh min-h-[700px] overflow-hidden bg-black text-white sm:min-h-[760px]"
      >
        <div
          className="absolute inset-0 flex h-full w-full"
          style={{
            width: `${heroCount * 100}%`,
            transform: `translateX(-${activeHeroIndex * (100 / heroCount)}%)`,
            transition: heroTransition,
          }}
        >
          {heroSlides.map((slide, index) => (
            <div
              key={slide.src}
              className="relative h-full shrink-0"
              style={{ width: `${100 / heroCount}%` }}
            >
              {/* TODO: replace placeholder with final project imagery. */}
              <Image
                src={resolveProjectImageSrc(slide)}
                alt={slide.alt}
                fill
                priority={index === 0}
                quality={90}
                className="object-cover"
                sizes="100vw"
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-linear-to-b from-black/6 via-black/10 to-black/42" aria-hidden />

        <Container className="relative z-10 flex h-full items-end pb-[calc(4rem+env(safe-area-inset-bottom))] pt-30 sm:pt-34 lg:pb-18">
          <motion.div
            style={{
              opacity: prefersReducedMotion ? 1 : heroCopyOpacity,
              y: prefersReducedMotion ? 0 : heroCopyY,
            }}
            className="max-w-[930px]"
          >
          <motion.div
            key={activeHero.src}
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
              className="text-[12px] uppercase tracking-[0.18em] text-white/92 sm:text-[20px] sm:tracking-[0.1em]"
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

            <div className="flex items-center gap-2 pt-2" aria-label="Project hero slides">
              {heroSlides.map((slide, index) => {
                const isActive = activeHeroIndex === index;
                return (
                  <button
                    key={slide.src}
                    type="button"
                    onClick={() => setActiveHeroIndex(index)}
                    aria-label={`Show slide ${index + 1}`}
                    className="inline-flex h-8 w-8 items-center justify-center"
                  >
                    <span
                      className={`h-3 w-3 rotate-45 border transition-colors duration-300 ${
                        isActive
                          ? "border-[#ab9468] bg-[#ab9468]/30"
                          : "border-white/65 bg-transparent hover:border-white"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </motion.div>
          </motion.div>
        </Container>

        <button
          type="button"
          onClick={previousHero}
          aria-label="Show previous hero slide"
          className="absolute left-5 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/35 text-white/75 transition-colors hover:border-white hover:text-white lg:inline-flex"
        >
          <span aria-hidden>←</span>
        </button>
        <button
          type="button"
          onClick={nextHero}
          aria-label="Show next hero slide"
          className="absolute right-5 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/35 text-white/75 transition-colors hover:border-white hover:text-white lg:inline-flex"
        >
          <span aria-hidden>→</span>
        </button>
      </motion.section>

      <motion.section
        ref={splitSectionRef}
        className="bg-[#ece8e1]"
        style={{ opacity: prefersReducedMotion ? 1 : splitSectionOpacity }}
      >
        <div className="flex flex-col lg:min-h-[650px] lg:flex-row">
          <div className="relative h-[54svh] min-h-[380px] max-h-[560px] w-full overflow-hidden border-b border-t border-r border-white lg:h-[650px] lg:w-1/2">
            <div
              className="absolute inset-0 flex"
              style={{
                width: `${detailSlides.length * 100}%`,
                transform: `translateX(-${activeDetailIndex * (100 / detailSlides.length)}%)`,
                transition: heroTransition,
              }}
            >
              {detailSlides.map((slide, index) => {
                const media =
                  index === 0
                    ? project.splitImages[0] ?? project.heroSlides[0]
                    : project.splitImages[1] ?? project.heroSlides[1] ?? project.heroSlides[0];

                return (
                  <div
                    key={slide.title}
                    className="relative h-full shrink-0"
                    style={{ width: `${100 / detailSlides.length}%` }}
                  >
                    {/* TODO: replace placeholder with final project imagery. */}
                    <Image
                      src={resolveProjectImageSrc(media)}
                      alt={media.alt}
                      fill
                      quality={90}
                      className="object-cover"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-black/4" aria-hidden />
                  </div>
                );
              })}
            </div>
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
        className="relative h-[700px] overflow-hidden lg:h-[800px]"
        style={{ opacity: prefersReducedMotion ? 1 : fullBleedOneOpacity }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ y: prefersReducedMotion ? 0 : fullBleedOneImageY }}
        >
          {/* TODO: replace placeholder with final project imagery. */}
          <Image
            src={resolveProjectImageSrc(fullBleedOneImage)}
            alt={fullBleedOneImage.alt}
            fill
            quality={90}
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </motion.section>

      <motion.section
        ref={suiteSectionRef}
        className="relative h-svh min-h-[700px] overflow-hidden bg-black text-white sm:min-h-[760px]"
        style={{ opacity: prefersReducedMotion ? 1 : suiteSectionOpacity }}
      >
        <div
          className="absolute inset-0 flex h-full w-full"
          style={{
            width: `${suiteSlides.length * 100}%`,
            transform: `translateX(-${activeSuiteIndex * (100 / suiteSlides.length)}%)`,
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
              <Image
                src={resolveProjectImageSrc(slide.image)}
                alt={slide.image.alt}
                fill
                priority={index === 0}
                quality={90}
                className="object-cover"
                sizes="100vw"
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-black/12" aria-hidden />

        <Container className="relative z-10 flex h-full items-end pb-[calc(4rem+env(safe-area-inset-bottom))] pt-28 sm:pt-32 lg:pb-18">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.32, ease: revealEase }}
            className="space-y-4"
            style={{
              opacity: prefersReducedMotion ? 1 : suiteCopyOpacity,
              y: prefersReducedMotion ? 0 : suiteCopyY,
            }}
          >
            <h2 className="font-(--font-home-serif) text-[44px] uppercase tracking-[0.08em] sm:text-[52px] lg:text-[64px]">
              {activeSuite.title}
            </h2>
            <p className="text-[14px] uppercase tracking-[0.18em] text-[#ab9468]">
              {activeSuite.subtitle}
            </p>
          </motion.div>
        </Container>

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

      <motion.section
        ref={splitTwoSectionRef}
        className="bg-[#ece8e1]"
        style={{ opacity: prefersReducedMotion ? 1 : splitTwoSectionOpacity }}
      >
        <div className="flex min-h-[560px] flex-col lg:flex-row">
          <div className="relative h-[280px] w-full overflow-hidden border-b border-t border-r border-white lg:h-[560px] lg:w-1/2">
            {/* TODO: replace placeholder with final project imagery. */}
            <Image
              src={resolveProjectImageSrc(project.splitImages[1] ?? project.heroSlides[1] ?? project.heroSlides[0])}
              alt={(project.splitImages[1] ?? project.heroSlides[1] ?? project.heroSlides[0]).alt}
              fill
              quality={90}
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div className="flex h-[280px] w-full items-center border-b border-t border-white bg-[#efefef] px-8 lg:h-[560px] lg:w-1/2 lg:px-20">
            <motion.p
              className="max-w-[520px] text-base leading-relaxed text-[#afabab] sm:text-lg"
              style={{
                opacity: prefersReducedMotion ? 1 : splitTwoCopyOpacity,
                y: prefersReducedMotion ? 0 : splitTwoCopyY,
              }}
            >
              From early concept through final detailing, the project was orchestrated as a single integrated journey,
              with architecture and interiors calibrated to deliver long-term value and lived elegance.
            </motion.p>
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={fullBleedTwoRef}
        className="relative h-[700px] overflow-hidden lg:h-[800px]"
        style={{ opacity: prefersReducedMotion ? 1 : fullBleedTwoOpacity }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ y: prefersReducedMotion ? 0 : fullBleedTwoImageY }}
        >
          {/* TODO: replace placeholder with final project imagery. */}
          <Image
            src={resolveProjectImageSrc(project.fullBleedImages[1] ?? project.heroSlides[1] ?? project.heroSlides[0])}
            alt={(project.fullBleedImages[1] ?? project.heroSlides[1] ?? project.heroSlides[0]).alt}
            fill
            quality={90}
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </motion.section>

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
                  <div className="relative z-10 h-56 overflow-hidden sm:h-60">
                    {/* TODO: replace placeholder with final project imagery. */}
                    <Image
                      src={resolveProjectImageSrc(card.thumbnail)}
                      alt={card.thumbnail.alt}
                      fill
                      quality={90}
                      className="object-cover transition duration-700 group-hover:scale-[1.05]"
                      sizes="(min-width: 1280px) 30vw, (min-width: 768px) 48vw, 100vw"
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
    </article>
  );
}
