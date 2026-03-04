"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Container from "@/components/ui/container";

type ServiceBlock = {
  id: string;
  eyebrow: string;
  title: string;
  body: string[];
  bullets: string[];
  imageSrc: string;
  imageAlt: string;
  tone: "light" | "dark";
};

type ProcessStep = {
  label: string;
  title: string;
  body: string;
  imageSrc: string;
};

type JourneyCard = {
  title: string;
  body: string;
  href: string;
  imageSrc: string;
};

const revealEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const primaryButtonClass =
  "inline-flex items-center justify-center rounded-full bg-[#b6814b] px-7 py-3 text-[11px] uppercase tracking-[0.32em] text-[#1a1a18] transition duration-300 hover:-translate-y-0.5 hover:bg-[#9c6b3f]";

const secondaryButtonDarkClass =
  "inline-flex items-center justify-center rounded-full border border-white/50 px-6 py-3 text-[11px] uppercase tracking-[0.32em] text-white transition duration-300 hover:border-white";

const secondaryButtonLightClass =
  "inline-flex items-center justify-center rounded-full border border-[#d1c5b5] px-6 py-3 text-[11px] uppercase tracking-[0.32em] text-[#ab9468] transition duration-300 hover:border-[#ab9468] hover:text-[#8c744c]";

const serviceBlocks: ServiceBlock[] = [
  {
    id: "feasibility-concept",
    eyebrow: "Stage 01",
    title: "Feasibility & Concept",
    body: [
      "We begin by testing potential through measured feasibility studies, context analysis, and early option mapping. This first phase ensures every ambition is grounded in planning reality, spatial logic, and delivery constraints.",
      "Concept proposals are then curated into a clear architectural narrative, balancing proportion, natural light, circulation, and long-term value. The output is a design direction with enough rigour to move confidently into approvals.",
    ],
    bullets: [
      "Feasibility diagnostics and site opportunities",
      "Concept layouts and massing studies",
      "Early design risk and constraint testing",
      "Budget-aware briefing for next stages",
    ],
    // TODO: replace with licensed architecture feasibility imagery.
    imageSrc: "/images/placeholders/services/architecture/r4.png",
    imageAlt: "Feasibility and concept development placeholder",
    tone: "light",
  },
  {
    id: "planning-approvals",
    eyebrow: "Stage 02",
    title: "Planning & Approvals",
    body: [
      "Our team manages planning strategy as a design discipline, not a late-stage compliance task. We coordinate documentation, authority dialogue, and consultant input to build persuasive submissions for complex residential contexts.",
      "Where heritage or sensitive planning conditions apply, we sequence approvals with care to protect programme certainty while preserving the design intent established in concept.",
    ],
    bullets: [
      "Planning strategy and submission programmes",
      "Consultant coordination and authority engagement",
      "Listed-building and conservation guidance",
      "Approval risk management and sequencing",
    ],
    // TODO: replace with licensed planning and approvals imagery.
    imageSrc: "/images/placeholders/services/architecture/planning.png",
    imageAlt: "Planning submissions and approvals placeholder",
    tone: "dark",
  },
  {
    id: "technical-coordination",
    eyebrow: "Stage 03",
    title: "Technical Design & Coordination",
    body: [
      "Once approvals are secured, we transform concept into a build-ready technical package. Drawings, details, specifications, and consultant interfaces are coordinated as one system so execution remains precise and predictable.",
      "This stage is where architectural quality is protected in the practical realities of procurement, sequencing, and specialist interfaces.",
    ],
    bullets: [
      "Technical drawings and construction packages",
      "Structural, MEP, and specialist integration",
      "Detail development for bespoke elements",
      "Tender support and contractor alignment",
    ],
    // TODO: replace with licensed technical coordination imagery.
    imageSrc: "/images/placeholders/services/architecture/technical.png",
    imageAlt: "Technical design and consultant coordination placeholder",
    tone: "light",
  },
  {
    id: "site-support-oversight",
    eyebrow: "Stage 04",
    title: "Site Support & Delivery Oversight",
    body: [
      "During construction, we remain actively involved to ensure built output reflects the approved design language and technical intent. Queries are resolved quickly, details are reviewed in context, and design quality is guarded through each milestone.",
      "Our oversight keeps communication clean between client, consultants, and site teams so delivery remains calm, accountable, and aligned with the original vision.",
    ],
    bullets: [
      "Site reviews and design clarifications",
      "Quality checkpoints and detail sign-off",
      "Consultant and contractor interface support",
      "Handover review aligned to design intent",
    ],
    // TODO: replace with licensed site oversight imagery.
    imageSrc: "/images/placeholders/services/architecture/oversight.png",
    imageAlt: "Site support and delivery oversight placeholder",
    tone: "dark",
  },
];

const journeyCardAccents = [
  "from-[#e8d8be]/50 via-[#d6b88f]/30 to-transparent",
  "from-[#d6e0e8]/50 via-[#adc6d6]/30 to-transparent",
  "from-[#d8d6e8]/50 via-[#bab0da]/30 to-transparent",
];

const journeyCards: JourneyCard[] = [
  {
    title: "Construction",
    body: "Discover how our site leadership and project management protect programme, detail, and delivery quality.",
    href: "/services/construction",
    imageSrc: "/images/placeholders/services/construction/h21.png",
  },
  {
    title: "Interior Design",
    body: "Explore our full-spectrum interior architecture and detailing service for private residences.",
    href: "/services/interior-design",
    imageSrc: "/images/placeholders/services/interior-design/hero-placeholder.jpg",
  },
  {
    title: "Property Development",
    body: "View our development management approach from acquisition strategy through completed homes.",
    href: "/services/property-development",
    imageSrc: "/images/placeholders/services/property-development/m2.jpeg",
  },
];

const processSteps: ProcessStep[] = [
  {
    label: "01",
    title: "Brief Calibration",
    body: "We align aspirations, constraints, and budget parameters into a clear architectural brief that guides every decision that follows.",
    imageSrc: "/images/placeholders/services/architecture/plan.png",
  },
  {
    label: "02",
    title: "Options & Direction",
    body: "Concept options are tested and refined into a preferred direction with balanced spatial performance, aesthetics, and planning viability.",
    imageSrc: "/images/placeholders/services/architecture/Arch_hero.jpg",
  },
  {
    label: "03",
    title: "Planning Set",
    body: "Submission packs are assembled with consultant coordination and strategic authority engagement to secure approvals with confidence.",
    imageSrc: "/images/placeholders/services/architecture/planning.png",
  },
  {
    label: "04",
    title: "Technical Package",
    body: "Detailed technical information is coordinated across architecture and engineering partners, ready for procurement and site execution.",
    imageSrc: "/images/placeholders/services/architecture/technical.png",
  },
  {
    label: "05",
    title: "Construction Support",
    body: "We support site delivery through design clarifications, review cycles, and quality checkpoints that preserve design intent.",
    imageSrc: "/images/placeholders/services/architecture/oversight.png",
  },
];

const reveal = (prefersReducedMotion: boolean, delay = 0, amount = 0.3) => ({
  initial: { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount },
  transition: {
    duration: prefersReducedMotion ? 0.01 : 0.86,
    delay: prefersReducedMotion ? 0 : delay,
    ease: revealEase,
  },
});

export default function ArchitectureServicePage() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const heroRef = useRef<HTMLElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [activeProcessIndex, setActiveProcessIndex] = useState(0);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroImageScale = useTransform(heroProgress, [0, 1], [1.03, 1.12]);
  const heroImageY = useTransform(heroProgress, [0, 1], [0, 26]);
  const heroCopyY = useTransform(heroProgress, [0, 1], [0, 34]);
  const heroCopyOpacity = useTransform(heroProgress, [0, 0.72], [1, 0.24]);

  const goToProcessSlide = (index: number) => {
    const slider = sliderRef.current;
    if (!slider) {
      return;
    }

    const target = slider.children.item(index) as HTMLElement | null;
    if (!target) {
      return;
    }

    const left = target.offsetLeft - slider.offsetLeft;
    slider.scrollTo({ left, behavior: prefersReducedMotion ? "auto" : "smooth" });
    setActiveProcessIndex(index);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) {
      return;
    }

    const handleScroll = () => {
      const firstSlide = slider.children.item(0) as HTMLElement | null;
      if (!firstSlide) {
        return;
      }

      const computedGap = Number.parseFloat(window.getComputedStyle(slider).columnGap || "0");
      const track = firstSlide.offsetWidth + computedGap;
      if (!track) {
        return;
      }

      const nextIndex = Math.round(slider.scrollLeft / track);
      const boundedIndex = Math.max(0, Math.min(processSteps.length - 1, nextIndex));
      setActiveProcessIndex(boundedIndex);
    };

    slider.addEventListener("scroll", handleScroll, { passive: true });
    return () => slider.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      const nextIndex = (activeProcessIndex + 1) % processSteps.length;
      goToProcessSlide(nextIndex);
    }, 6800);

    return () => window.clearInterval(interval);
  }, [activeProcessIndex, prefersReducedMotion]);

  const currentProcess = useMemo(
    () => processSteps[activeProcessIndex] ?? processSteps[0],
    [activeProcessIndex],
  );

  return (
    <article className="bg-[#f6f3ef] text-[#1a1a18]">
      <section className="relative h-[100svh] min-h-[100svh] w-full overflow-hidden bg-[#0f0d0b] text-white">
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{
            duration: prefersReducedMotion ? 0.01 : 0.82,
            ease: revealEase,
          }}
          className="absolute inset-0"
        >
          <video
            className="h-full w-full object-cover"
            autoPlay={!prefersReducedMotion}
            muted
            loop
            playsInline
            controls={prefersReducedMotion}
            poster="/images/placeholders/services/architecture/Arch2.jpg"
            preload="metadata"
            aria-label="Architecture hero video"
          >
            <source src="/videos/services/architecture/Arc.m4v" type="video/mp4" />
          </video>
        </motion.div>
      </section>

      <section ref={heroRef} className="relative min-h-svh overflow-hidden bg-[#0f0d0b] text-white">
        <motion.div
          className="absolute inset-0"
          style={{
            scale: prefersReducedMotion ? 1.03 : heroImageScale,
            y: prefersReducedMotion ? 0 : heroImageY,
          }}
        >
          {/* TODO: replace with licensed architecture hero photography/film stills. */}
          <Image
            src="/images/placeholders/services/architecture/Arch2.jpg"
            alt="Architecture hero placeholder"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/60 to-black/82" aria-hidden />

        <Container className="relative z-10 grid min-h-svh gap-8 pb-[calc(4rem+env(safe-area-inset-bottom))] pt-32 sm:pt-36 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end lg:pb-20">
          <motion.div
            {...reveal(prefersReducedMotion, 0.05, 0.38)}
            style={{
              y: prefersReducedMotion ? 0 : heroCopyY,
              opacity: prefersReducedMotion ? 1 : heroCopyOpacity,
            }}
            className="max-w-3xl space-y-7"
          >
            <p className="text-[11px] uppercase tracking-[0.4em] text-white/74">THE RATIO</p>
            <h1 className="font-(--font-home-serif) text-4xl uppercase tracking-[0.08em] sm:text-5xl lg:text-7xl">
              Architecture
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-white/82 sm:text-lg">
              Architectural direction for private residences — from first feasibility to delivery oversight — shaped with
              planning intelligence, technical precision, and calm project leadership.
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Link href="/contact" className={primaryButtonClass}>
                Start a project
              </Link>
              <Link href="/projects" className={secondaryButtonDarkClass}>
                View projects
              </Link>
            </div>
          </motion.div>

          <motion.aside
            {...reveal(prefersReducedMotion, 0.15, 0.42)}
            className="max-w-sm rounded-[22px] border border-white/24 bg-white/10 p-5 shadow-[0_20px_55px_rgba(0,0,0,0.28)] supports-backdrop-filter:bg-white/6 supports-backdrop-filter:backdrop-blur-md sm:p-6"
          >
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/65">Project clarity</p>
            <h2 className="mt-4 font-(--font-home-serif) text-2xl uppercase tracking-[0.06em] text-[#d9c7ab]">
              Design-led certainty
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/78">
              We align planning path, consultant input, and technical detail early so your programme moves forward with
              confidence.
            </p>
          </motion.aside>
        </Container>
      </section>

      {serviceBlocks.map((block, index) => {
        const isDark = block.tone === "dark";
        return (
          <section
            key={block.id}
            id={block.id}
            className={isDark ? "bg-[#13100d] py-16 text-white sm:py-20 lg:py-24" : "bg-[#f6f3ef] py-16 sm:py-20 lg:py-24"}
          >
            <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
              <motion.div
                {...reveal(prefersReducedMotion, index * 0.04, 0.24)}
                className={isDark ? "space-y-6" : "space-y-6"}
              >
                <p
                  className={
                    isDark
                      ? "text-[11px] uppercase tracking-[0.34em] text-white/60"
                      : "text-[11px] uppercase tracking-[0.34em] text-[#8b7a63]"
                  }
                >
                  {block.eyebrow}
                </p>
                <h2
                  className={
                    isDark
                      ? "font-(--font-home-serif) text-3xl uppercase tracking-[0.09em] text-[#d3bc98] sm:text-5xl"
                      : "font-(--font-home-serif) text-3xl uppercase tracking-[0.09em] text-[#ab9468] sm:text-5xl"
                  }
                >
                  {block.title}
                </h2>

                <div className={isDark ? "space-y-4 text-white/76" : "space-y-4 text-[#545047]"}>
                  {block.body.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-relaxed sm:text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <ul className={isDark ? "space-y-3 text-sm text-white/74" : "space-y-3 text-sm text-[#5d564d]"}>
                  {block.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#b6814b]" aria-hidden />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                {...reveal(prefersReducedMotion, 0.08 + index * 0.04, 0.24)}
                className={
                  isDark
                    ? "overflow-hidden rounded-[24px] border border-white/14 bg-white/3"
                    : "overflow-hidden rounded-[24px] border border-[#ddd3c6] bg-white"
                }
              >
                <div className="relative min-h-[320px] sm:min-h-[400px]">
                  <Image
                    src={block.imageSrc}
                    alt={block.imageAlt}
                    fill
                    className="object-cover transition duration-700 hover:scale-[1.03]"
                    sizes="(min-width: 1024px) 45vw, 100vw"
                  />
                  <div
                    className={
                      isDark
                        ? "absolute inset-0 bg-linear-to-b from-black/20 via-black/22 to-black/55"
                        : "absolute inset-0 bg-linear-to-b from-black/10 via-black/20 to-black/40"
                    }
                    aria-hidden
                  />
                </div>
              </motion.div>
            </Container>
          </section>
        );
      })}

      <section id="process" className="bg-[#eeebe6] py-16 sm:py-20 lg:py-24">
        <Container className="space-y-9">
          <motion.div {...reveal(prefersReducedMotion, 0.03, 0.35)} className="max-w-3xl space-y-5">
            <p className="text-[11px] uppercase tracking-[0.34em] text-[#8b7a63]">The Process</p>
            <h2 className="font-(--font-home-serif) text-3xl uppercase tracking-[0.09em] text-[#ab9468] sm:text-5xl">
              A premium end-to-end pathway
            </h2>
            <p className="text-base leading-relaxed text-[#534c44] sm:text-lg">
              Every architecture commission follows a deliberate sequence with clear stage outputs, disciplined
              coordination, and transparent communication.
            </p>
          </motion.div>

          <motion.div
            {...reveal(prefersReducedMotion, 0.06, 0.24)}
            className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.46fr)]"
          >
            <div className="min-w-0 space-y-5">
              <div
                ref={sliderRef}
                className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                aria-label="Architecture process slider"
              >
                {processSteps.map((step, index) => {
                  const isActive = index === activeProcessIndex;
                  return (
                    <article
                      key={step.title}
                      className={
                        isActive
                          ? "group min-w-[84%] snap-start overflow-hidden rounded-[24px] border border-[#d7cab8] bg-white shadow-[0_18px_42px_rgba(66,45,13,0.14)] sm:min-w-[64%] lg:min-w-[48%]"
                          : "group min-w-[84%] snap-start overflow-hidden rounded-[24px] border border-[#ddd3c5] bg-white/82 sm:min-w-[64%] lg:min-w-[48%]"
                      }
                    >
                      <div className="relative h-52 text-[#E8DFCF] sm:h-56">
                        <Image
                          src={step.imageSrc}
                          alt={`${step.title} process stage placeholder`}
                          fill
                          className="object-cover transition duration-700 group-hover:scale-[1.03]"
                          sizes="(min-width: 1024px) 32vw, (min-width: 640px) 56vw, 88vw"
                        />
                        <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/20 to-black/45" aria-hidden />
                      </div>
                      <div className="space-y-4 p-6">
                        <p className="text-[11px] uppercase tracking-[0.32em] text-[#8b7a63]">Stage {step.label}</p>
                        <h3 className="font-(--font-home-serif) text-2xl uppercase tracking-[0.08em] text-[#ab9468]">
                          {step.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-[#555047] sm:text-base">{step.body}</p>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-3" aria-label="Process controls">
                <button
                  type="button"
                  onClick={() => goToProcessSlide(activeProcessIndex === 0 ? processSteps.length - 1 : activeProcessIndex - 1)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#b8ad9b] text-[#6f6354] transition-colors hover:border-[#ab9468] hover:text-[#ab9468]"
                  aria-label="Show previous process stage"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                    <path d="M15.7 5.3a1 1 0 0 1 0 1.4L10.4 12l5.3 5.3a1 1 0 1 1-1.4 1.4l-6-6a1 1 0 0 1 0-1.4l6-6a1 1 0 0 1 1.4 0z" fill="currentColor" />
                  </svg>
                </button>

                <div className="flex flex-wrap items-center gap-2.5">
                  {processSteps.map((step, index) => {
                    const isActive = index === activeProcessIndex;
                    return (
                      <button
                        key={step.title}
                        type="button"
                        onClick={() => goToProcessSlide(index)}
                        aria-label={`Show process stage ${index + 1}: ${step.title}`}
                        aria-current={isActive}
                        className={
                          isActive
                            ? "h-2.5 w-2.5 rounded-full bg-[#ab9468]"
                            : "h-2.5 w-2.5 rounded-full bg-[#cbc1b3] transition-colors hover:bg-[#bdaa8e]"
                        }
                      />
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => goToProcessSlide((activeProcessIndex + 1) % processSteps.length)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#b8ad9b] text-[#6f6354] transition-colors hover:border-[#ab9468] hover:text-[#ab9468]"
                  aria-label="Show next process stage"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                    <path d="M8.3 18.7a1 1 0 0 1 0-1.4l5.3-5.3-5.3-5.3a1 1 0 1 1 1.4-1.4l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 0 1-1.4 0z" fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>

            <aside className="rounded-[24px] border border-[#d8ccba] bg-white/86 p-6 shadow-[0_16px_40px_rgba(55,36,9,0.12)] supports-backdrop-filter:bg-white/68 supports-backdrop-filter:backdrop-blur-sm sm:p-7">
              <p className="text-[11px] uppercase tracking-[0.32em] text-[#8b7a63]">
                Active stage · {currentProcess.label}
              </p>
              <h3 className="mt-4 font-(--font-home-serif) text-2xl uppercase tracking-[0.08em] text-[#ab9468] sm:text-3xl">
                {currentProcess.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[#555047] sm:text-base">{currentProcess.body}</p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link href="/contact" className={primaryButtonClass}>
                  Start a project
                </Link>
                <Link href="/services/construction" className={secondaryButtonLightClass}>
                  Delivery partner
                </Link>
              </div>
            </aside>
          </motion.div>
        </Container>
      </section>

      <section className="bg-[#11100e] py-16 text-white sm:py-20 lg:py-24">
        <Container>
          <motion.div
            {...reveal(prefersReducedMotion, 0.06, 0.34)}
            className="rounded-[26px] border border-white/14 bg-white/4 px-6 py-10 text-center sm:px-10 sm:py-12"
          >
            <p className="text-[11px] uppercase tracking-[0.36em] text-white/62">Finalise your brief</p>
            <h2 className="mt-4 font-(--font-home-serif) text-3xl uppercase tracking-[0.09em] text-[#d3bc98] sm:text-5xl">
              Ready to shape your architecture project?
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/76 sm:text-lg">
              Share your property context, programme priorities, and timeline. We will respond with next steps for a
              tailored architectural scope.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link href="/contact" className={primaryButtonClass}>
                Start a project
              </Link>
              <Link href="/projects" className={secondaryButtonDarkClass}>
                View projects
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      <section className="bg-[#13110e] py-18 text-white sm:py-24">
        <Container className="max-w-[1160px]">
          <motion.div
            {...reveal(prefersReducedMotion, 0.03, 0.32)}
            className="mx-auto max-w-[760px] text-center"
          >
            <h2 className="font-(--font-home-serif) text-[30px] leading-[1.2] uppercase tracking-widest text-white">
              Continue your journey
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/76">
              Explore our other client services to shape your project with one integrated team.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {journeyCards.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
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
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: prefersReducedMotion ? 0.01 : 0.82,
                  delay: prefersReducedMotion ? 0 : index * 0.08,
                  ease: revealEase,
                }}
                className="group relative isolate overflow-hidden rounded-[22px] border border-white/16 bg-white/5"
              >
                <div
                  className={`pointer-events-none absolute -top-14 left-1/2 h-36 w-[130%] -translate-x-1/2 rounded-full bg-linear-to-b ${journeyCardAccents[index % journeyCardAccents.length]} blur-2xl transition duration-700 group-hover:scale-110`}
                />
                <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_18%_0%,rgba(255,255,255,0.24),transparent_52%),radial-gradient(circle_at_82%_100%,rgba(183,152,111,0.16),transparent_50%)]" />
                <div className="pointer-events-none absolute inset-[1px] rounded-[inherit] border border-white/24" />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-y-12 left-[-70%] w-[64%] -translate-x-full rotate-12 bg-linear-to-r from-transparent via-white/45 to-transparent opacity-0 blur-xl transition duration-700 ease-out group-hover:translate-x-[280%] group-hover:opacity-75"
                />
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute -inset-y-12 left-[-70%] w-[64%] -translate-x-full rotate-12 bg-linear-to-r from-transparent via-white/45 to-transparent opacity-0 blur-xl"
                  initial={prefersReducedMotion ? false : { x: "0%", opacity: 0 }}
                  whileInView={
                    prefersReducedMotion
                      ? undefined
                      : {
                          x: "280%",
                          opacity: [0, 0.75, 0],
                        }
                  }
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 1.2, ease: revealEase }}
                />

                <Link href={item.href} className="block" aria-label={item.title}>
                  <div className="relative z-10 h-56 overflow-hidden sm:h-60">
                    <Image
                      src={item.imageSrc}
                      alt={`${item.title} service image`}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                      sizes="(min-width: 1280px) 30vw, (min-width: 768px) 48vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/30 to-black/72" aria-hidden />
                  </div>
                  <div className="relative z-10 space-y-4 p-7">
                    <h3 className="font-(--font-home-serif) text-[30px] leading-[1.2] uppercase tracking-[0.03em] text-white">
                      {item.title}
                    </h3>
                    <p className="text-base leading-relaxed text-white/74">{item.body}</p>
                    <span className="inline-flex border-b border-[#ab9468] pb-1 text-[11px] uppercase tracking-[0.24em] text-[#d8be94] transition-colors duration-300 group-hover:text-white">
                      Discover more
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </Container>
      </section>
    </article>
  );
}
