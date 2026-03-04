"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/container";

type HeroSlide = {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  subtitle: string;
};

type ProcessStep = {
  title: string;
  body: string;
  image: string;
  imageAlt: string;
};

type JourneyCard = {
  title: string;
  body: string;
  href: string;
  image: string;
};

const luxuryEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const primaryButtonClass =
  "inline-flex items-center justify-center rounded-full bg-[#b6814b] px-7 py-3 text-[11px] uppercase tracking-[0.32em] text-[#1a1a18] transition duration-300 hover:-translate-y-0.5 hover:bg-[#9c6b3f]";

const secondaryButtonDarkClass =
  "inline-flex items-center justify-center rounded-full border border-white/50 px-6 py-3 text-[11px] uppercase tracking-[0.32em] text-white transition duration-300 hover:border-white";

const heroSlides: HeroSlide[] = [
  {
    image: "/images/placeholders/services/construction/h21.png",
    alt: "Construction specialists preparing a luxury residential site setup.",
    eyebrow: "THE RATIO",
    title: "Construction",
    subtitle: "Realised without compromise",
  },
  // {
  //   // TODO: Restore when multiple hero slides are needed again.
  //   image: "/images/placeholders/construction/process-02.jpg",
  //   alt: "Project managers coordinating construction delivery for high-end interiors.",
  //   eyebrow: "Construction Services",
  //   title: "Precision Delivery",
  //   subtitle: "From Vision to Reality",
  // },
  // {
  //   // TODO: Restore when multiple hero slides are needed again.
  //   image: "/images/placeholders/construction/process-03.jpg",
  //   alt: "Specialist trades delivering premium finishes for a luxury home project.",
  //   eyebrow: "Implementation",
  //   title: "Crafted Execution",
  //   subtitle: "Exceptional Standards",
  // },
];

const journeyCardAccents = [
  "from-[#e8d8be]/50 via-[#d6b88f]/30 to-transparent",
  "from-[#d6e0e8]/50 via-[#adc6d6]/30 to-transparent",
  "from-[#d8d6e8]/50 via-[#bab0da]/30 to-transparent",
];

const processSteps: ProcessStep[] = [
  {
    title: "Permissions",
    body: "Working in parallel with our interior design team, we manage planning, listed-building consent, and license-for-alterations workflows to keep complex projects moving without friction.",
    image: "/images/placeholders/services/construction/1.png",
    imageAlt: "Planning and permissions workflow overview with staged checkpoints.",
  },
  {
    title: "Site Set Up",
    body: "Once design packages are finalised, our construction team leads pre-start procedures including compliance, welfare provision, site office set-up, and insurance verification.",
    image: "/images/placeholders/services/construction/2.png",
    imageAlt: "Construction site preparation visuals representing mobilisation and pre-start setup.",
  },
  {
    title: "Procurement",
    body: "Experienced project managers align procurement with construction sequencing, securing specialist materials and trusted suppliers while protecting quality and programme certainty.",
    image: "/images/placeholders/services/construction/3.png",
    imageAlt: "Procurement planning visual showing material sourcing and sequencing paths.",
  },
  {
    title: "Construction",
    body: "Our construction division combines specialist trades, rigorous site standards, and meticulous quality control to deliver super-prime interiors exactly as designed.",
    image: "/images/placeholders/services/construction/4.jpg",
    imageAlt: "Active construction delivery scene representing specialist trades and site coordination.",
  },
  {
    title: "Completion",
    body: "At completion, both project and design teams run a full internal snagging review before client walk-through, ensuring every detail is resolved to the expected standard.",
    image: "/images/placeholders/services/construction/5.PNG",
    imageAlt: "Refined finish visual representing final checks and completion-stage review.",
  },
];

const journeyCards: JourneyCard[] = [
  {
    title: "Architecture",
    body: "Explore our architectural service from feasibility through planning and technical delivery.",
    href: "/services/architecture",
    image: "/images/placeholders/services/architecture/Arch2.jpg",
  },
  {
    title: "Interior Design",
    body: "Award-led interior direction with full detailing, procurement, and installation coordination.",
    href: "/services/interior-design",
    image: "/images/placeholders/services/interior-design/hero-placeholder.jpg",
  },
  {
    title: "Property Development",
    body: "Integrated development and delivery support for private clients and investment partners.",
    href: "/services/property-development",
    image: "/images/placeholders/services/property-development/m2.jpeg",
  },
];

const revealIn = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: luxuryEase },
  },
};

export default function ConstructionServicePage() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeProcessSlide, setActiveProcessSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const featureVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 7000);

    return () => window.clearInterval(interval);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveProcessSlide((current) => (current + 1) % processSteps.length);
    }, 7200);

    return () => window.clearInterval(interval);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const video = featureVideoRef.current;
    if (!video) {
      return;
    }

    video.muted = true;
    const playPromise = video.play();

    if (playPromise) {
      playPromise
        .then(() => {
          setIsVideoPlaying(true);
          setIsVideoMuted(video.muted);
        })
        .catch(() => {
          setIsVideoPlaying(false);
        });
    }
  }, [prefersReducedMotion]);

  const toggleVideoPlayback = async () => {
    const video = featureVideoRef.current;
    if (!video) {
      return;
    }

    if (video.paused) {
      try {
        await video.play();
        setIsVideoPlaying(true);
      } catch {
        setIsVideoPlaying(false);
      }
      return;
    }

    video.pause();
    setIsVideoPlaying(false);
  };

  const restartVideo = async () => {
    const video = featureVideoRef.current;
    if (!video) {
      return;
    }

    video.currentTime = 0;
    try {
      await video.play();
      setIsVideoPlaying(true);
    } catch {
      setIsVideoPlaying(false);
    }
  };

  const toggleVideoMute = () => {
    const video = featureVideoRef.current;
    if (!video) {
      return;
    }

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsVideoMuted(nextMuted);
  };

  const goToPreviousProcessSlide = () => {
    setActiveProcessSlide((current) =>
      current === 0 ? processSteps.length - 1 : current - 1,
    );
  };

  const goToNextProcessSlide = () => {
    setActiveProcessSlide((current) => (current + 1) % processSteps.length);
  };

  return (
    <article className="bg-[#f6f3ef] text-[#1a1a18]">
      <section className="relative h-[100svh] min-h-[100svh] w-full overflow-hidden bg-[#0e0d0b] text-white">
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{
            duration: prefersReducedMotion ? 0.01 : 0.82,
            ease: luxuryEase,
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
            poster="/images/placeholders/services/construction/h21.png"
            preload="metadata"
            aria-label="Construction hero video"
          >
            <source src="/videos/services/shared/hero-updated.m4v" type="video/mp4" />
          </video>
        </motion.div>
      </section>

      <section className="relative min-h-svh overflow-hidden bg-[#0e0d0b] text-white">
        {heroSlides.map((slide, index) => (
          <motion.div
            key={slide.title}
            className="absolute inset-0"
            animate={{ opacity: activeSlide === index ? 1 : 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 1.2, ease: luxuryEase }}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-linear-to-b from-black/35 via-black/55 to-black/82" aria-hidden />

        <Container className="relative z-10 grid min-h-svh gap-8 pb-[calc(4rem+env(safe-area-inset-bottom))] pt-32 sm:pt-36 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end lg:pb-20">
          <motion.div
            key={activeSlide}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.85, ease: luxuryEase }}
            className="max-w-3xl space-y-7"
          >
            <p className="text-[11px] uppercase tracking-[0.4em] text-white/70">
              {heroSlides[activeSlide]?.eyebrow}
            </p>
            <h1 className="font-(--font-home-serif) text-4xl uppercase tracking-[0.08em] sm:text-5xl lg:text-7xl">
              {heroSlides[activeSlide]?.title}
            </h1>
            <p className="text-sm uppercase tracking-[0.28em] text-[#d6c4aa] sm:text-base">
              {heroSlides[activeSlide]?.subtitle}
            </p>

            <p className="max-w-2xl text-base leading-relaxed text-white/82 sm:text-lg">
              Our construction team leads programme, procurement, and specialist delivery with disciplined site
              management, safeguarding design intent from first mobilisation to final handover.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Link href="/contact" className={primaryButtonClass}>
                Start a project
              </Link>
              <Link href="/projects" className={secondaryButtonDarkClass}>
                View projects
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-3 sm:mt-12" aria-label="Hero slide controls">
              {heroSlides.map((slide, index) => {
                const isActive = activeSlide === index;
                return (
                  <button
                    key={slide.title}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Show slide ${index + 1}`}
                    aria-pressed={isActive}
                    className="group"
                  >
                    <svg className="h-8 w-8" viewBox="-5 -5 110 110" aria-hidden>
                      <polygon
                        points="50,0 90,50 50,100 10,50"
                        className={`transition-colors duration-300 ${
                          isActive
                            ? "fill-[#d6c4aa]/20 stroke-[#d6c4aa]"
                            : "fill-transparent stroke-white/45 group-hover:stroke-white/80"
                        }`}
                      />
                      <polygon
                        points="50,0 90,50 50,100 10,50"
                        className={`transition-colors duration-300 ${
                          isActive ? "fill-none stroke-[#d6c4aa]" : "fill-none stroke-white/40"
                        }`}
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="7"
                        className={`transition-colors duration-300 ${
                          isActive ? "fill-[#d6c4aa]" : "fill-white/25"
                        }`}
                      />
                    </svg>
                  </button>
                );
              })}
            </div>
          </motion.div>

          <motion.aside
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.85, delay: prefersReducedMotion ? 0 : 0.1, ease: luxuryEase }}
            className="max-w-sm rounded-[22px] border border-white/24 bg-white/10 p-5 shadow-[0_20px_55px_rgba(0,0,0,0.28)] supports-backdrop-filter:bg-white/6 supports-backdrop-filter:backdrop-blur-md sm:p-6"
          >
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/65">Site certainty</p>
            <h2 className="mt-4 font-(--font-home-serif) text-2xl uppercase tracking-[0.06em] text-[#d9c7ab]">
              Precision in delivery
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/78">
              We coordinate specialist trades, quality checkpoints, and programme-critical milestones so complex
              residential projects progress clearly and calmly.
            </p>
          </motion.aside>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-[#15120f] py-16 text-white sm:py-20 lg:py-24">
        <Image
          src="/images/placeholders/construction/hero-poster.jpg"
          alt="Luxury construction project texture"
          fill
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/55 via-black/70 to-black/75" aria-hidden />

        <Container>
          <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center">
            <motion.div
              variants={revealIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px" }}
              className="max-w-4xl space-y-7"
            >
              <h2 className="font-(--font-home-serif) text-3xl uppercase tracking-[0.05em] sm:text-5xl">
                From Vision to Reality
              </h2>
              <p className="max-w-4xl text-base leading-relaxed text-white/80 sm:text-lg">
                At The Ratio, our in-house construction and project teams deliver bespoke residential schemes
                across London&apos;s most demanding addresses. From heritage modernisation to intricate new-build
                execution, each programme is led as one integrated system.
              </p>
              <p className="max-w-4xl text-base leading-relaxed text-white/80 sm:text-lg">
                We combine premium material strategy, specialist trades, and rigorous site standards so every layer of
                design intent is protected through construction.
              </p>
              <p className="max-w-4xl text-base leading-relaxed text-white/80 sm:text-lg">
                The result is a client journey that feels clear and controlled from first concept to final handover.
              </p>
            </motion.div>

            <motion.div
              variants={revealIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px" }}
              className="overflow-hidden rounded-[20px] border border-white/20 bg-black/40 shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
            >
              <div className="relative aspect-4/3 bg-black">
                <video
                  ref={featureVideoRef}
                  // TODO: Replace with final licensed feature film.
                  src="/videos/placeholders/construction/cons.mp4"
                  poster="/images/placeholders/construction/hero-poster.jpg"
                  className="h-full w-full object-cover"
                  autoPlay={!prefersReducedMotion}
                  loop={!prefersReducedMotion}
                  muted
                  playsInline
                  preload="metadata"
                />

                <div className="absolute bottom-0 left-0 right-0 flex items-center gap-2 bg-linear-to-t from-black/85 via-black/55 to-transparent p-3 sm:p-4">
                  <button
                    type="button"
                    onClick={toggleVideoPlayback}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/35 bg-black/45 text-white transition-colors hover:border-[#d4bc9b] hover:text-[#d4bc9b]"
                    aria-label={isVideoPlaying ? "Pause feature video" : "Play feature video"}
                  >
                    {isVideoPlaying ? (
                      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                        <path d="M8 5h3v14H8zm5 0h3v14h-3z" fill="currentColor" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                        <path d="M8 5v14l11-7z" fill="currentColor" />
                      </svg>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={restartVideo}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/35 bg-black/45 text-white transition-colors hover:border-[#d4bc9b] hover:text-[#d4bc9b]"
                    aria-label="Restart feature video"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                      <path
                        d="M12 5a7 7 0 1 1-6.1 3.6H3l2.9-3L8.8 8H6.9A5.4 5.4 0 1 0 12 6.6V5z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={toggleVideoMute}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/35 bg-black/45 text-white transition-colors hover:border-[#d4bc9b] hover:text-[#d4bc9b]"
                    aria-label={isVideoMuted ? "Unmute feature video" : "Mute feature video"}
                  >
                    {isVideoMuted ? (
                      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                        <path d="M14 4 9 9H5v6h4l5 5V4zm3 6.6L19.4 13 17 15.4l-1.4-1.4 2.4-2.4-2.4-2.4L17 7.8l2.4 2.4L21.8 7.8 23.2 9.2l-2.4 2.4 2.4 2.4-1.4 1.4-2.4-2.4-2.4 2.4-1.4-1.4 2.4-2.4-2.4-2.4L17 9.2z" fill="currentColor" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                        <path d="M14 4 9 9H5v6h4l5 5V4zm2.2 4.4 1.4-1.4A8 8 0 0 1 20 12a8 8 0 0 1-2.4 5.6l-1.4-1.4A6 6 0 0 0 18 12a6 6 0 0 0-1.8-3.6zm2.8-2.8 1.4-1.4A12 12 0 0 1 24 12a12 12 0 0 1-3.6 8.4L19 19A10 10 0 0 0 22 12a10 10 0 0 0-3-6.4z" fill="currentColor" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="bg-[#eeebe6] py-14 sm:py-18 lg:py-20">
        <Container>
          <motion.div
            variants={revealIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px" }}
            className="mx-auto max-w-4xl space-y-5 text-center"
          >
            <h2 className="font-(--font-home-serif) text-3xl uppercase tracking-[0.05em] text-[#ab9468] sm:text-5xl">
              The Process
            </h2>
            <p className="text-[12px] uppercase tracking-[0.32em] text-[#6f6354]">For those who value rarity</p>
            <p className="text-base leading-relaxed text-[#4f4942] sm:text-lg">
              Every phase is tailored to project brief, site conditions, and completion strategy. Our implementation
              team stays accountable for sequencing, quality assurance, and communication from pre-start to handover.
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="bg-[#eeebe6] pb-16 sm:pb-20 lg:pb-24">
        <Container>
          <div className="grid items-end gap-8 xl:grid-cols-[1.05fr_0.95fr_0.72fr]">
            <motion.div
              variants={revealIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-8% 0px" }}
              className="relative overflow-hidden rounded-[2px] bg-black shadow-[0_25px_50px_rgba(0,0,0,0.18)]"
            >
              <div className="relative h-[310px] sm:h-[420px] lg:h-[520px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={processSteps[activeProcessSlide]?.image}
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -24 }}
                    transition={{ duration: prefersReducedMotion ? 0.01 : 0.55, ease: luxuryEase }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={processSteps[activeProcessSlide]?.image}
                      alt={processSteps[activeProcessSlide]?.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1280px) 39vw, (min-width: 768px) 58vw, 100vw"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-center bg-[#f0ece6] py-4 sm:py-5">
                <div className="flex items-center justify-center gap-2 sm:gap-3" aria-label="Process slide controls">
                  <button
                    type="button"
                    onClick={goToPreviousProcessSlide}
                    aria-label="Show previous process stage"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#b8ad9b] text-[#6f6354] transition-colors hover:border-[#ab9468] hover:text-[#ab9468]"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                      <path d="M15.7 5.3a1 1 0 0 1 0 1.4L10.4 12l5.3 5.3a1 1 0 1 1-1.4 1.4l-6-6a1 1 0 0 1 0-1.4l6-6a1 1 0 0 1 1.4 0z" fill="currentColor" />
                    </svg>
                  </button>

                  <div className="flex flex-wrap items-center justify-center gap-2.5">
                  {processSteps.map((step, index) => {
                    const isActive = activeProcessSlide === index;
                    return (
                      <button
                        key={step.title}
                        type="button"
                        onClick={() => setActiveProcessSlide(index)}
                        className="group"
                        aria-label={`Show process stage ${index + 1}: ${step.title}`}
                        aria-pressed={isActive}
                      >
                        <svg className="h-9 w-9" viewBox="-5 -5 110 110" aria-hidden>
                          <polygon
                            points="50,0 90,50 50,100 10,50"
                            className={`transition-colors duration-300 ${
                              isActive
                                ? "fill-[#ab9468]/20 stroke-[#ab9468]"
                                : "fill-transparent stroke-[#a4947c]/70 group-hover:stroke-[#ab9468]"
                            }`}
                          />
                          <polygon
                            points="50,0 90,50 50,100 10,50"
                            className={`transition-colors duration-300 ${
                              isActive ? "fill-none stroke-[#ab9468]" : "fill-none stroke-[#b8ad9b]/80"
                            }`}
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="7"
                            className={`transition-colors duration-300 ${
                              isActive ? "fill-[#ab9468]" : "fill-[#ab9468]/25"
                            }`}
                          />
                        </svg>
                      </button>
                    );
                  })}
                  </div>

                  <button
                    type="button"
                    onClick={goToNextProcessSlide}
                    aria-label="Show next process stage"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#b8ad9b] text-[#6f6354] transition-colors hover:border-[#ab9468] hover:text-[#ab9468]"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                      <path d="M8.3 18.7a1 1 0 0 1 0-1.4l5.3-5.3-5.3-5.3a1 1 0 1 1 1.4-1.4l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 0 1-1.4 0z" fill="currentColor" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>

            <div className="rounded-[2px] bg-[#e9e4dd] p-6 sm:p-7 lg:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={processSteps[activeProcessSlide]?.title}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -16 }}
                  transition={{ duration: prefersReducedMotion ? 0.01 : 0.45, ease: luxuryEase }}
                  className="space-y-5"
                >
                  <p className="text-[11px] uppercase tracking-[0.34em] text-[#8a7b67]">
                    Stage {String(activeProcessSlide + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-(--font-home-serif) text-2xl uppercase tracking-[0.06em] text-[#ab9468] sm:text-3xl">
                    {processSteps[activeProcessSlide]?.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#4f4942] sm:text-base">
                    {processSteps[activeProcessSlide]?.body}
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full bg-[#ab9468] px-6 py-3 text-[11px] uppercase tracking-[0.3em] text-[#1a1a18] transition duration-300 hover:bg-[#8f784e]"
                  >
                    Start a project
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative hidden min-h-[280px] overflow-hidden rounded-[2px] bg-black shadow-[0_25px_50px_rgba(0,0,0,0.2)] xl:block">
              <AnimatePresence mode="wait">
                <motion.div
                  key={processSteps[activeProcessSlide]?.image}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -24 }}
                  transition={{ duration: prefersReducedMotion ? 0.01 : 0.55, ease: luxuryEase }}
                  className="absolute inset-0"
                >
                  <Image
                    src={processSteps[activeProcessSlide]?.image}
                    alt={processSteps[activeProcessSlide]?.imageAlt}
                    fill
                    className="object-cover"
                    sizes="22vw"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#11100e] py-16 text-white sm:py-20 lg:py-24">
        <Container>
          <motion.div
            variants={revealIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px" }}
            className="rounded-[26px] border border-white/14 bg-white/4 px-6 py-10 text-center sm:px-10 sm:py-12"
          >
            <p className="text-[11px] uppercase tracking-[0.36em] text-white/62">Finalise your brief</p>
            <h2 className="mt-4 font-(--font-home-serif) text-3xl uppercase tracking-[0.09em] text-[#d3bc98] sm:text-5xl">
              Ready to deliver your construction project?
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/76 sm:text-lg">
              Share your programme priorities, site constraints, and delivery timeline. We will respond with next steps
              for a tailored construction and implementation scope.
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
          <motion.div
            variants={revealIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px" }}
            className="mx-auto max-w-[760px] text-center"
          >
            <h2 className="font-(--font-home-serif) text-[30px] leading-[1.2] uppercase tracking-widest text-white">
              Continue Your Journey
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/76">
              Delve deeper into our other client services.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {journeyCards.map((card, index) => (
              <motion.article
                key={card.title}
                variants={revealIn}
                initial="hidden"
                whileInView="visible"
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: -8,
                        scale: 1.012,
                        transition: { duration: 0.36, ease: luxuryEase },
                      }
                }
                viewport={{ once: true, margin: "-5% 0px" }}
                transition={{ delay: prefersReducedMotion ? 0 : index * 0.08 }}
                className="group relative isolate overflow-hidden rounded-[22px] border border-white/16 bg-white/5"
              >
                <div
                  className={`pointer-events-none absolute -top-14 left-1/2 h-36 w-[130%] -translate-x-1/2 rounded-full bg-linear-to-b ${journeyCardAccents[index % journeyCardAccents.length]} blur-2xl transition duration-700 group-hover:scale-110`}
                />
                <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_18%_0%,rgba(255,255,255,0.24),transparent_52%),radial-gradient(circle_at_82%_100%,rgba(183,152,111,0.16),transparent_50%)]" />
                <div className="pointer-events-none absolute inset-px rounded-[inherit] border border-white/24" />
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
                  transition={{ duration: 1.2, ease: luxuryEase }}
                />

                <Link href={card.href} aria-label={card.title} className="block">
                  <div className="relative z-10 h-56 overflow-hidden sm:h-60">
                    <Image
                      src={card.image}
                      alt={`Placeholder image for ${card.title}.`}
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
                    <p className="text-base leading-relaxed text-white/74">{card.body}</p>
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
