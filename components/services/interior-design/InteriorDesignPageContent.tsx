"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/container";

type JourneyCard = {
  title: string;
  description: string;
  href: string;
  imageSrc: string;
};

type ProcessStage = {
  label: string;
  title: string;
  body: string;
};

type InteriorGalleryResponse = {
  images?: string[];
};

const journeyCards: JourneyCard[] = [
  {
    title: "Architecture",
    description: "Explore our architectural service from feasibility through planning and technical delivery.",
    href: "/services/architecture",
    imageSrc: "/images/placeholders/services/architecture/Arch2.jpg",
  },
  {
    title: "Construction",
    description: "Discover how our construction team leads procurement, sequencing, and quality execution on site.",
    href: "/services/construction",
    imageSrc: "/images/placeholders/services/construction/h21.png",
  },
  {
    title: "Property Development",
    description: "View our development management approach from acquisition strategy through completed homes.",
    href: "/services/property-development",
    imageSrc: "/images/placeholders/services/property-development/m2.jpeg",
  },
];

const journeyCardAccents = [
  "from-[#e8d8be]/50 via-[#d6b88f]/30 to-transparent",
  "from-[#d6e0e8]/50 via-[#adc6d6]/30 to-transparent",
  "from-[#d8d6e8]/50 via-[#bab0da]/30 to-transparent",
];

const revealEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const processStages: ProcessStage[] = [
  {
    label: "Stage 01",
    title: "Brief & Concept",
    body: "We define lifestyle priorities, circulation intent, and spatial character, then translate them into a cohesive design narrative.",
  },
  {
    label: "Stage 02",
    title: "Creative Design",
    body: "Concept boards evolve into precise design intent drawings, elevations, and coordinated specifications for all critical elements.",
  },
  {
    label: "Stage 03",
    title: "Finishes",
    body: "Our team curates globally sourced finishes, fabrics, and bespoke pieces to ensure harmony across every room.",
  },
  {
    label: "Stage 04",
    title: "Project Delivery",
    body: "Complete after-care explanation and client assisted delivery ensured.",
  },
];

const revealUp = (prefersReducedMotion: boolean, delay = 0) => ({
  initial: { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.28 },
  transition: {
    duration: prefersReducedMotion ? 0.01 : 0.9,
    delay: prefersReducedMotion ? 0 : delay,
    ease: revealEase,
  },
});

const primaryButtonClass =
  "inline-flex items-center justify-center rounded-full bg-[#b6814b] px-7 py-3 text-[11px] uppercase tracking-[0.32em] text-[#1a1a18] transition duration-300 hover:-translate-y-0.5 hover:bg-[#9c6b3f]";

const secondaryButtonDarkClass =
  "inline-flex items-center justify-center rounded-full border border-white/50 px-6 py-3 text-[11px] uppercase tracking-[0.32em] text-white transition duration-300 hover:border-white";

const interiorGalleryFallbackImages = [
  "/images/placeholders/services/interior-design/Gal-ID/00.jpg",
  "/images/placeholders/services/interior-design/Gal-ID/01.png",
];

export default function InteriorDesignPageContent() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [galleryImages, setGalleryImages] = useState<string[]>(interiorGalleryFallbackImages);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

  const safeGalleryImages = useMemo(
    () => (galleryImages.length > 0 ? galleryImages : interiorGalleryFallbackImages),
    [galleryImages],
  );

  const resolvedActiveGalleryIndex = activeGalleryIndex % safeGalleryImages.length;
  const activeGalleryImage =
    safeGalleryImages[resolvedActiveGalleryIndex] ?? safeGalleryImages[0];

  const nextGalleryImage = () => {
    setActiveGalleryIndex((current) => (current + 1) % safeGalleryImages.length);
  };

  const previousGalleryImage = () => {
    setActiveGalleryIndex(
      (current) => (current - 1 + safeGalleryImages.length) % safeGalleryImages.length,
    );
  };

  useEffect(() => {
    let isCancelled = false;

    const loadGalleryImages = async () => {
      try {
        const response = await fetch("/api/interior-design-gallery", { cache: "no-store" });

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as InteriorGalleryResponse;
        const loadedImages =
          payload?.images?.filter((imagePath) => typeof imagePath === "string" && imagePath.length > 0) ?? [];

        if (isCancelled || loadedImages.length === 0) {
          return;
        }

        setGalleryImages(loadedImages);
      } catch {
        // Keep fallback gallery images when image loading fails.
      }
    };

    void loadGalleryImages();

    return () => {
      isCancelled = true;
    };
  }, []);

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

  return (
    <>
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
            poster="/images/placeholders/services/interior-design/hero-placeholder.jpg"
            preload="metadata"
            aria-label="Interior design hero video"
          >
            <source src="/videos/services/interior-design/int.m4v" type="video/mp4" />
          </video>
        </motion.div>
      </section>

      <section className="relative min-h-[92svh] overflow-hidden bg-[#0f0d0b] text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            // TODO: replace with licensed hero image or film still.
            backgroundImage:
              "url('/images/placeholders/services/interior-design/hero-placeholder.jpg')",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-linear-to-b from-black/35 via-black/55 to-black/82"
          aria-hidden
        />

        <Container className="relative z-10 grid min-h-[92svh] gap-8 pb-[calc(4rem+env(safe-area-inset-bottom))] pt-32 sm:pt-36 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end lg:pb-20">
          <motion.div {...revealUp(prefersReducedMotion, 0.06)} className="max-w-3xl space-y-7">
            <p className="text-[11px] uppercase tracking-[0.4em] text-white/80">THE RATIO</p>
            <h1 className="font-(--font-home-serif) text-4xl uppercase tracking-[0.08em] sm:text-5xl lg:text-7xl">
              Interior Design
            </h1>
            <p className="text-sm uppercase tracking-[0.28em] text-[#d6c4aa] sm:text-base">The vision brought to life</p>
            <p className="max-w-2xl text-base leading-relaxed text-white/82 sm:text-lg">
              We shape refined interior environments through spatial planning, detailed material curation, and
              implementation-ready design packages tailored to your lifestyle.
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
            {...revealUp(prefersReducedMotion, 0.14)}
            className="max-w-sm rounded-[22px] border border-white/24 bg-white/10 p-5 shadow-[0_20px_55px_rgba(0,0,0,0.28)] supports-backdrop-filter:bg-white/6 supports-backdrop-filter:backdrop-blur-md sm:p-6"
          >
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/65">Design clarity</p>
            <h2 className="mt-4 font-(--font-home-serif) text-2xl uppercase tracking-[0.06em] text-[#d9c7ab]">
              Cohesive by design
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/78">
              From concept to specification, we coordinate every interior layer so finishes, joinery, and lighting feel
              intentional and complete.
            </p>
          </motion.aside>
        </Container>
      </section>

      <section className="bg-[#f6f3ef] py-20 sm:py-24 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center">
          <motion.div {...revealUp(prefersReducedMotion)} className="space-y-7">
            <h2 className="font-(--font-home-serif) text-3xl uppercase tracking-[0.11em] text-[#ab9468] sm:text-4xl md:text-[42px] md:leading-[1.08]">
              Interior Design &amp; Architecture
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-[#545960] sm:text-lg">
              We have spent years refining our interior design process so each project achieves extraordinary detail and
              composure. From spatial planning and architectural detailing to finishes, lighting, and bespoke joinery,
              every decision is intentional.
            </p>
            <p className="max-w-2xl text-base leading-relaxed text-[#545960] sm:text-lg">
              Clients are closely involved from concept through delivery. Our team translates personal taste into
              complete environments, balancing expressive design with practical day-to-day living.
            </p>
            <p className="text-[11px] uppercase tracking-[0.34em] text-[#8e8579]">Awards</p>
          </motion.div>

          <motion.div
            {...revealUp(prefersReducedMotion, 0.08)}
            className="overflow-hidden rounded-[30px] border border-[#ddd5cb] bg-white"
          >
            <video
              className="aspect-4/5 w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
              controls
              playsInline
              preload="metadata"
              poster="/images/services/hero.jpg"
              aria-label="Interior design and architecture feature video"
            >
              <source src="/videos/services/interior-design/hero.mp4" type="video/mp4" />
            </video>
          </motion.div>
        </Container>
      </section>

      <section className="bg-[#efefea] py-16 sm:py-20 lg:py-24">
        <Container className="max-w-[1180px]">
          <motion.div {...revealUp(prefersReducedMotion)} className="space-y-4 text-center">
            <p className="text-[11px] uppercase tracking-[0.34em] text-[#8b7a63]">Interior gallery</p>
            <h2 className="font-(--font-home-serif) text-3xl uppercase tracking-[0.09em] text-[#ab9468] sm:text-5xl">
              Spatial storytelling
            </h2>
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-[#5a544c] sm:text-lg">
              Explore our interior design references from macro composition through crafted details.
            </p>
          </motion.div>

          <motion.div {...revealUp(prefersReducedMotion, 0.06)} className="mt-10 space-y-5">
            <button
              type="button"
              onClick={() => setIsGalleryModalOpen(true)}
              className="group block w-full rounded-[20px] border border-[#d7d2ca] bg-[#f7f5f2] p-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ab9468]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#efefea] sm:p-3"
              aria-label={`Open image ${resolvedActiveGalleryIndex + 1} in fullscreen`}
            >
              <div className="relative h-[54svh] min-h-[340px] overflow-hidden rounded-[16px] bg-[#ebe6df] [perspective:1200px] [transform-style:preserve-3d] sm:h-[62svh] lg:h-[72svh]">
                {safeGalleryImages.map((imagePath, index) => {
                  const isActive = resolvedActiveGalleryIndex === index;
                  return (
                    <motion.div
                      key={imagePath}
                      className="absolute inset-0"
                      initial={false}
                      animate={
                        isActive
                          ? { opacity: 1, scale: 1.01, z: 0, filter: "blur(0px)" }
                          : { opacity: 0, scale: 0.95, z: -72, filter: "blur(0.8px)" }
                      }
                      transition={{
                        duration: prefersReducedMotion ? 0.01 : 1.06,
                        ease: revealEase,
                      }}
                    >
                      <Image
                        src={imagePath}
                        alt={`Interior design gallery image ${index + 1}`}
                        fill
                        quality={90}
                        className="object-contain object-center"
                        sizes="(min-width: 1024px) 92vw, 100vw"
                        priority={index === 0}
                      />
                    </motion.div>
                  );
                })}
              </div>
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

            <div className="flex gap-3 overflow-x-auto pb-1">
              {safeGalleryImages.map((imagePath, index) => {
                const isActive = index === resolvedActiveGalleryIndex;
                return (
                  <button
                    key={`${imagePath}-${index}`}
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
                      src={imagePath}
                      alt={`Interior design thumbnail ${index + 1}`}
                      fill
                      quality={85}
                      className="object-cover object-center"
                      sizes="136px"
                    />
                  </button>
                );
              })}
            </div>
          </motion.div>
        </Container>
      </section>

      <section className="bg-[#100f0d] py-20 text-white sm:py-24 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
          <motion.div {...revealUp(prefersReducedMotion)} className="space-y-6">
            <h2 className="font-(--font-home-serif) text-3xl uppercase tracking-[0.12em] text-[#ab9468] sm:text-4xl">
              The Process
            </h2>
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/70">
              For those in search of a tailored 360° service
            </p>
            <p className="max-w-md text-base leading-relaxed text-white/75">
              We deliver a complete residential service covering interior architecture, planning, project leadership,
              construction coordination, and styling.
            </p>
            <Link
              href="/services/interior-design"
              className="inline-flex items-center justify-center rounded-full bg-[#ab9468] px-6 py-3 text-[11px] uppercase tracking-[0.32em] text-[#1a1a18] transition duration-300 hover:bg-[#977f55]"
            >
              Start a project
            </Link>
          </motion.div>

          <div className="space-y-7">
            {processStages.map((stage, index) => (
              <motion.article
                key={stage.title}
                {...revealUp(prefersReducedMotion, index * 0.08)}
                className="rounded-[22px] border border-white/15 bg-white/3 p-6 sm:p-7"
              >
                <p className="text-[11px] uppercase tracking-[0.32em] text-white/55">{stage.label}</p>
                <h3 className="mt-4 font-(--font-home-serif) text-2xl uppercase tracking-widest text-[#ab9468] sm:text-[30px] sm:leading-[1.2]">
                  {stage.title}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-white/72">{stage.body}</p>
              </motion.article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#f3efea] py-20 sm:py-24 lg:py-28">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
          <motion.div
            {...revealUp(prefersReducedMotion)}
            className="overflow-hidden rounded-[30px] border border-[#d9d0c4]"
          >
            <div
              className="aspect-16/10 bg-cover bg-center transition-transform duration-700 ease-out hover:scale-[1.03]"
              style={{
                // TODO: replace with licensed implementation-stage photography.
                backgroundImage:
                  "url('/images/placeholders/services/interior-design/process.png')",
              }}
              role="img"
              aria-label="Procurement and implementation"
            />
          </motion.div>

          <motion.div {...revealUp(prefersReducedMotion, 0.08)} className="space-y-6">
            <h2 className="font-(--font-home-serif) text-3xl uppercase tracking-widest text-[#ab9468] sm:text-4xl">
              Procurement and implementation
            </h2>
            <p className="text-base leading-relaxed text-[#545960] sm:text-lg">
              Execution is a defining part of our service. We coordinate trusted specialist makers and site teams,
              maintaining design integrity through procurement, sequencing, and on-site quality control.
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="bg-[#11100e] py-16 text-white sm:py-20 lg:py-24">
        <Container>
          <motion.div
            {...revealUp(prefersReducedMotion, 0.06)}
            className="rounded-[26px] border border-white/14 bg-white/4 px-6 py-10 text-center sm:px-10 sm:py-12"
          >
            <p className="text-[11px] uppercase tracking-[0.36em] text-white/62">Finalise your brief</p>
            <h2 className="mt-4 font-(--font-home-serif) text-3xl uppercase tracking-[0.09em] text-[#d3bc98] sm:text-5xl">
              Ready to shape your interior design project?
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/76 sm:text-lg">
              Share your space requirements, lifestyle priorities, and timeline. We will respond with the right next
              steps for a tailored interior design scope.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#b6814b] px-7 py-3 text-[11px] uppercase tracking-[0.32em] text-[#1a1a18] transition duration-300 hover:-translate-y-0.5 hover:bg-[#9c6b3f]"
              >
                Start a project
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-full border border-white/50 px-6 py-3 text-[11px] uppercase tracking-[0.32em] text-white transition duration-300 hover:border-white"
              >
                View projects
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      <section className="bg-[#13110e] py-18 text-white sm:py-24">
        <Container className="max-w-[1160px]">
          <motion.div {...revealUp(prefersReducedMotion)} className="mx-auto max-w-[760px] text-center">
            <h2 className="font-(--font-home-serif) text-[30px] leading-[1.2] uppercase tracking-widest text-white">
              Continue your journey
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/76">
              Explore our other client services to shape your project with one integrated team.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {journeyCards.map((card, index) => (
              <motion.article
                key={card.title}
                {...revealUp(prefersReducedMotion, index * 0.08)}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: -8,
                        scale: 1.012,
                        transition: { duration: 0.36, ease: revealEase },
                      }
                }
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

                <Link href={card.href} className="block" aria-label={card.title}>
                  <div className="relative z-10 h-56 overflow-hidden sm:h-60">
                    <Image
                      src={card.imageSrc}
                      alt={`${card.title} service image`}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-[1.05]"
                      sizes="(min-width: 1280px) 30vw, (min-width: 768px) 48vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/30 to-black/72" aria-hidden />
                  </div>
                  <div className="relative z-10 space-y-4 p-7">
                    <h3 className="font-(--font-home-serif) text-[30px] leading-[1.2] uppercase tracking-[0.03em] text-white">
                      {card.title}
                    </h3>
                    <p className="text-base leading-relaxed text-white/74">{card.description}</p>
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
            aria-label="Interior design gallery image lightbox"
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
                  src={activeGalleryImage}
                  alt={`Interior design gallery image ${resolvedActiveGalleryIndex + 1}`}
                  fill
                  className="object-contain object-center"
                  sizes="90vw"
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
    </>
  );
}
