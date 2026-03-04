"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Container from "@/components/ui/container";

const revealEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const primaryButtonClass =
  "inline-flex items-center justify-center rounded-full bg-[#b6814b] px-7 py-3 text-[11px] uppercase tracking-[0.32em] text-[#1a1a18] transition duration-300 hover:-translate-y-0.5 hover:bg-[#9c6b3f]";

const secondaryButtonDarkClass =
  "inline-flex items-center justify-center rounded-full border border-white/50 px-6 py-3 text-[11px] uppercase tracking-[0.32em] text-white transition duration-300 hover:border-white";

const journeyCards = [
  {
    title: "Interior Design",
    body: "Explore our full-spectrum interior architecture and detailing service for private residences.",
    href: "/services/interior-design",
    imageSrc: "/images/placeholders/services/interior-design/hero-placeholder.jpg",
  },
  {
    title: "Projects",
    body: "View recently delivered homes and development outcomes across our portfolio.",
    href: "/projects",
    imageSrc: "/images/projects/the-bryant-project/the-bryant-project2.jpg",
  },
  {
    title: "Construction",
    body: "Discover how our site leadership and project management protect programme and quality.",
    href: "/services/construction",
    imageSrc: "/images/placeholders/services/construction/h21.png",
  },
];

const journeyCardAccents = [
  "from-[#e8d8be]/50 via-[#d6b88f]/30 to-transparent",
  "from-[#d6e0e8]/50 via-[#adc6d6]/30 to-transparent",
  "from-[#d8d6e8]/50 via-[#bab0da]/30 to-transparent",
];

const developmentProcessSlides = [
  {
    src: "/images/placeholders/services/property-development/one.jpg",
    alt: "Early-stage development strategy workshop",
  },
  {
    src: "/images/placeholders/services/property-development/two.jpg",
    alt: "Design review during concept development",
  },
  {
    src: "/images/placeholders/services/property-development/three.jpg",
    alt: "Planning and consultant coordination session",
  },
  {
    src: "/images/placeholders/services/property-development/four.jpeg",
    alt: "On-site quality and programme review",
  },
  {
    src: "/images/placeholders/services/property-development/five.jpg",
    alt: "Final detailing and handover preparation",
  },
];

export default function PropertyDevelopmentContent() {
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const [activeProcessSlide, setActiveProcessSlide] = useState(0);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.14]);
  const heroImageOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.62]);
  const heroCopyY = useTransform(scrollYProgress, [0, 1], [0, 42]);
  const heroCopyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.12]);
  const processSlideCount = developmentProcessSlides.length;

  const goToPreviousProcessSlide = () => {
    setActiveProcessSlide((prev) => (prev - 1 + processSlideCount) % processSlideCount);
  };

  const goToNextProcessSlide = () => {
    setActiveProcessSlide((prev) => (prev + 1) % processSlideCount);
  };

  return (
    <>
      <section className="relative h-[100svh] min-h-[100svh] w-full overflow-hidden bg-[#0d0c0a] text-white">
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
            autoPlay={!Boolean(prefersReducedMotion)}
            muted
            loop
            playsInline
            controls={Boolean(prefersReducedMotion)}
            poster="/images/placeholders/services/property-development/m2.jpeg"
            preload="metadata"
            aria-label="Property development hero video"
          >
                <source src="/videos/services/shared/hero-updated.m4v" type="video/mp4" />
          </video>
        </motion.div>
      </section>

      <section ref={heroRef} className="relative min-h-[94svh] overflow-hidden bg-[#0d0c0a] text-white">
        <motion.div
          className="absolute inset-0"
          style={{
            scale: prefersReducedMotion ? 1.04 : heroImageScale,
            opacity: prefersReducedMotion ? 1 : heroImageOpacity,
          }}
        >
          {/* TODO: Replace with licensed Unsplash/Pexels/Pixabay hero photography. */}
          <Image
            src="/images/placeholders/services/property-development/m2.jpeg"
            alt="Property development hero placeholder"
            fill
            priority
            className="hidden object-cover md:block"
            sizes="100vw"
          />
          {/* TODO: Replace with licensed Unsplash/Pexels/Pixabay mobile hero photography. */}
          <Image
            // src="/images/placeholders/services/property-development/hero-mobile.svg"
            src="/images/placeholders/services/property-development/m2.jpeg"
            alt="Property development hero mobile placeholder"
            fill
            priority
            className="object-cover md:hidden"
            sizes="100vw"
          />
        </motion.div>

        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(9,8,7,0.22),rgba(9,8,7,0.62)_50%,rgba(9,8,7,0.88))]" />

        <Container className="relative z-10 grid min-h-[94svh] gap-8 pb-[calc(4rem+env(safe-area-inset-bottom))] pt-28 sm:pt-32 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end lg:pb-20">
          <motion.div
            style={{
              y: prefersReducedMotion ? 0 : heroCopyY,
              opacity: prefersReducedMotion ? 1 : heroCopyOpacity,
            }}
            className="max-w-3xl space-y-7"
          >
            <p className="text-[11px] uppercase tracking-[0.42em] text-white/72">THE RATIO</p>
            <h1 className="font-(--font-home-serif) text-4xl uppercase tracking-[0.08em] text-white sm:text-5xl lg:text-7xl">
              Property Development
            </h1>
            <p className="text-sm uppercase tracking-[0.28em] text-[#d6c4aa] sm:text-base">Award-winning homes of exceptional detail</p>
            <p className="max-w-2xl text-base leading-relaxed text-white/82 sm:text-lg">
              Award-winning homes of exceptional detail.
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
            initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.82, delay: prefersReducedMotion ? 0 : 0.1, ease: revealEase }}
            className="max-w-sm rounded-[22px] border border-white/24 bg-white/10 p-5 shadow-[0_20px_55px_rgba(0,0,0,0.28)] supports-backdrop-filter:bg-white/6 supports-backdrop-filter:backdrop-blur-md sm:p-6"
          >
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/65">Development certainty</p>
            <h2 className="mt-4 font-(--font-home-serif) text-2xl uppercase tracking-[0.06em] text-[#d9c7ab]">
              Aligned end-to-end
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/78">
              We align acquisition strategy, design direction, and delivery management so each decision protects value,
              programme, and finished quality.
            </p>
          </motion.aside>
        </Container>
      </section>

      <section className="bg-[#13110e] py-16 sm:py-20">
        <Container className="max-w-5xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.65 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.85, ease: revealEase }}
            className="font-(--font-home-serif) text-3xl uppercase tracking-[0.12em] text-[#d8be94] sm:text-4xl lg:text-5xl"
          >
            “Award-Winning Homes of Exceptional Detail”
          </motion.h2>
        </Container>
      </section>

      <section className="bg-[#f6f3ef] py-16 sm:py-20 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.24 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.9, ease: revealEase }}
            className="space-y-7"
          >
            <p className="text-[11px] uppercase tracking-[0.36em] text-[#8e857a]">Our Approach</p>
            <h2 className="font-(--font-home-serif) text-3xl uppercase leading-tight tracking-[0.11em] text-[#1b1814] sm:text-4xl">
              Development management from acquisition to delivery.
            </h2>
            <p className="text-base leading-relaxed text-[#5a534c] sm:text-lg">
              The Ratio works as an independent development manager and delivery partner for private clients and
              investors. We align site strategy, design intelligence, programme control, and commercial oversight to protect
              design ambition from start to finish.
            </p>
            <p className="text-base leading-relaxed text-[#5a534c] sm:text-lg">
              Our in-house team leads architecture, interior direction, and project execution with one coordinated vision,
              ensuring every decision serves long-term value and daily lifestyle quality.
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-full bg-[#b6814b] px-7 py-3 text-[11px] uppercase tracking-[0.32em] text-[#1a1a18] transition duration-300 hover:-translate-y-0.5 hover:bg-[#9c6b3f]"
            >
              See our latest projects
            </Link>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.24 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.9, delay: prefersReducedMotion ? 0 : 0.08, ease: revealEase }}
            className="overflow-hidden rounded-[28px] border border-[#e4dbd0] bg-white"
          >
            <div className="relative h-[280px] w-full sm:h-[340px]">
              {/* TODO: Replace with licensed Unsplash/Pexels/Pixabay approach imagery. */}
              <Image
                src="/images/placeholders/services/property-development/sisu.png"
                alt="Approach section placeholder"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 34vw, 100vw"
              />
            </div>
            <div className="space-y-4 p-8">
              <p className="text-[11px] uppercase tracking-[0.32em] text-[#8e857a]">Core disciplines</p>
              <ul className="space-y-3 text-sm leading-relaxed text-[#5a534c]">
                <li>Site sourcing and opportunity modelling</li>
                <li>Planning coordination and consultant management</li>
                <li>Procurement, contracts, and delivery governance</li>
                <li>Design quality control through handover</li>
              </ul>
            </div>
          </motion.aside>
        </Container>
      </section>

      <section className="bg-[#0f0d0b] py-16 text-white sm:py-20 lg:py-24">
        <Container className="space-y-10 sm:space-y-12">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.88, ease: revealEase }}
            className="max-w-3xl space-y-5"
          >
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/62">Development manager process</p>
            <h2 className="font-(--font-home-serif) text-3xl uppercase tracking-[0.11em] text-white sm:text-4xl">
              A structured path to exceptional residences.
            </h2>
            <p className="text-base leading-relaxed text-white/76 sm:text-lg">
              Our process combines precise due diligence, bold design leadership, and disciplined programme management to
              move each development from opportunity to completed home.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.92, ease: revealEase }}
            className="grid gap-8 rounded-[28px] border border-white/14 bg-white/4 p-7 sm:p-10 lg:grid-cols-[0.95fr_1.05fr]"
          >
            <div className="relative min-h-[240px] overflow-hidden rounded-[20px] sm:min-h-[320px]">
              {developmentProcessSlides.map((slide, index) => (
                <motion.div
                  key={slide.src}
                  className="absolute inset-0"
                  initial={false}
                  animate={{
                    opacity: activeProcessSlide === index ? 1 : 0,
                    scale: activeProcessSlide === index ? 1 : 1.035,
                  }}
                  transition={{ duration: prefersReducedMotion ? 0.01 : 0.5, ease: revealEase }}
                  aria-hidden={activeProcessSlide !== index}
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    priority={index === 0}
                  />
                </motion.div>
              ))}

              <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between bg-linear-to-t from-black/70 via-black/35 to-transparent px-4 pb-4 pt-12 sm:px-5 sm:pb-5">
                <div className="flex items-center gap-2">
                  {developmentProcessSlides.map((slide, index) => (
                    <button
                      key={`${slide.src}-dot`}
                      type="button"
                      onClick={() => setActiveProcessSlide(index)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        activeProcessSlide === index ? "w-6 bg-white" : "w-2.5 bg-white/45 hover:bg-white/75"
                      }`}
                      aria-label={`Show process image ${index + 1}`}
                      aria-current={activeProcessSlide === index}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={goToPreviousProcessSlide}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/45 bg-black/25 text-xs text-white transition-colors duration-300 hover:border-white hover:bg-black/45"
                    aria-label="Show previous process image"
                  >
                    <span aria-hidden>&lt;</span>
                  </button>
                  <button
                    type="button"
                    onClick={goToNextProcessSlide}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/45 bg-black/25 text-xs text-white transition-colors duration-300 hover:border-white hover:bg-black/45"
                    aria-label="Show next process image"
                  >
                    <span aria-hidden>&gt;</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-7">
              <article className="space-y-3 border-b border-white/12 pb-6">
                <h3 className="text-lg uppercase tracking-[0.12em] text-white/94">Discovering and unlocking exceptional sites</h3>
                <p className="text-sm leading-relaxed text-white/72 sm:text-base">
                  We identify underleveraged opportunities in sought-after neighbourhoods, then shape planning and design
                  strategy to unlock maximum potential without compromising quality.
                </p>
              </article>
              <article className="space-y-3 border-b border-white/12 pb-6">
                <h3 className="text-lg uppercase tracking-[0.12em] text-white/94">Architecture and interior design</h3>
                <p className="text-sm leading-relaxed text-white/72 sm:text-base">
                  Our award-focused design team leads architecture and interiors as one continuous system, balancing
                  spatial performance, craftsmanship, and material expression.
                </p>
              </article>
              <article className="space-y-3 border-b border-white/12 pb-6">
                <h3 className="text-lg uppercase tracking-[0.12em] text-white/94">Branding and sales strategy</h3>
                <p className="text-sm leading-relaxed text-white/72 sm:text-base">
                  We position each development with a distinct narrative and collaborate with trusted sales partners to
                  reach the right audience and optimise realised value.
                </p>
              </article>
              <article className="space-y-3">
                <h3 className="text-lg uppercase tracking-[0.12em] text-white/94">Construction and project management</h3>
                <p className="text-sm leading-relaxed text-white/72 sm:text-base">
                  Through rigorous site governance, procurement control, and quality assurance, we deliver to programme and
                  budget while preserving design integrity.
                </p>
              </article>
            </div>
          </motion.div>
        </Container>
      </section>

      <section className="bg-[#11100e] py-16 text-white sm:py-20 lg:py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.32 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.82, ease: revealEase }}
            className="rounded-[26px] border border-white/14 bg-white/4 px-6 py-10 text-center sm:px-10 sm:py-12"
          >
            <p className="text-[11px] uppercase tracking-[0.36em] text-white/62">Finalise your brief</p>
            <h2 className="mt-4 font-(--font-home-serif) text-3xl uppercase tracking-[0.09em] text-[#d3bc98] sm:text-5xl">
              Ready to shape your property development project?
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/76 sm:text-lg">
              Share your acquisition context, investment objectives, and timeline. We will respond with the next steps
              for a tailored development management scope.
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
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.32 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.85, ease: revealEase }}
            className="mx-auto max-w-[760px] text-center"
          >
            <h2 className="font-(--font-home-serif) text-[30px] leading-[1.2] uppercase tracking-widest text-white">
              Continue your journey
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/76">
              Delve deeper into our wider client services, landmark projects, and delivery philosophy.
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
    </>
  );
}
