"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/container";
import GlassReviewSlider from "@/components/reviews/GlassReviewSlider";
import { buildMixedReviewSlides } from "@/components/reviews/reviewSlides";
import { aboutFeaturedReviews, reviewCardData } from "@/lib/reviews";

const revealEase: [number, number, number, number] = [0.16, 1, 0.3, 1];
const HOUZZ_CREDENTIALS_URL =
  "https://www.houzz.co.uk/professionals/design-and-build/the-ratio-pfvwgb-pf~1740696796#credentials";

const primaryButtonClass =
  "inline-flex items-center justify-center rounded-full bg-[#b6814b] px-7 py-3 text-[11px] uppercase tracking-[0.32em] text-[#1a1a18] transition duration-300 hover:-translate-y-0.5 hover:bg-[#9c6b3f]";

type Accolade = {
  title: string;
  result: string;
  imageSrc: string;
  imageAlt: string;
};

type AccoladeYear = {
  year: string;
  accolades: Accolade[];
};

type JourneyCard = {
  title: string;
  body: string;
  href: string;
  imageSrc: string;
};

const accoladeTimeline: AccoladeYear[] = [
  {
    year: "2025",
    accolades: [
      {
        title: "Best Of Houzz 2025",
        result: "Powered By Houzz Pro",
        imageSrc: "/images/placeholders/about/best-of-houzz-service-2025.svg",
        imageAlt: "Best of Houzz Service 2025 badge",
      },
    ],
  },
  {
    year: "2024",
    accolades: [
      {
        title: "Best Of Houzz 2024",
        result: "Powered By Houzz Pro",
        imageSrc: "/images/placeholders/about/best-of-houzz-service-2024.svg",
        imageAlt: "Best of Houzz Service 2024 badge",
      },
      {
        title: "Houzz Badge",
        result: "2024",
        imageSrc: "/images/placeholders/about/houzz-badge-2024.svg",
        imageAlt: "Houzz badge 2024",
      },
    ],
  },
  {
    year: "2023",
    accolades: [
      {
        title: "Best Of Houzz 2023",
        result: "Powered By Houzz Pro",
        imageSrc: "/images/placeholders/about/best-of-houzz-service-2023.svg",
        imageAlt: "Best of Houzz Service 2023 badge",
      },
    ],
  },
  {
    accolades: [
      {
        title: "Best Of Houzz 2022",
        result: "Powered By Houzz Pro",
        imageSrc: "/images/placeholders/about/best-of-houzz-service-2022.svg",
        imageAlt: "Best of Houzz Service 2022 badge",
      },
    ],
    year: "2022",
  },
  {
    year: "2021",
    accolades: [
      {
        title: "Best Of Houzz 2021",
        result: "Powered By Houzz Pro",
        imageSrc: "/images/placeholders/about/best-of-houzz-service-2021.svg",
        imageAlt: "Best of Houzz Service 2021 badge",
      },
    ],
  },
];

const aboutReviewSlides = buildMixedReviewSlides({
  entries: reviewCardData,
  perPlatformLimit: 4,
  startWith: "house",
  fallbackReviews: aboutFeaturedReviews,
  fallbackIdPrefix: "about-fallback",
});

const journeyCardAccents = [
  "from-[#e8d8be]/50 via-[#d6b88f]/30 to-transparent",
  "from-[#d6e0e8]/50 via-[#adc6d6]/30 to-transparent",
  "from-[#d8d6e8]/50 via-[#bab0da]/30 to-transparent",
];

const journeyCards: JourneyCard[] = [
  {
    title: "Services",
    body: "Our award-winning design team guides every stage from concept through completion.",
    href: "/services",
    imageSrc: "/images/placeholders/services/architecture/Arch2.jpg",
  },
  {
    title: "Projects",
    body: "Explore our latest residences and development outcomes, delivered with architectural precision and refined detail.",
    href: "/projects",
    imageSrc: "/images/projects/the-bryant-project/the-bryant-project2.jpg",
  },
  {
    title: "Showroom",
    body: "Discover our curated showroom experience with signature materials, finishes, and spatial concepts in person.",
    href: "/showroom",
    imageSrc: "/images/placeholders/showroom/hero-editorial.jpg",
  },
];

export default function AboutPage161() {
  const prefersReducedMotion = useReducedMotion();

  const reveal = (delay = 0, y = 28, amount = 0.25) => ({
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount },
    transition: {
      duration: prefersReducedMotion ? 0.01 : 0.85,
      delay: prefersReducedMotion ? 0 : delay,
      ease: revealEase,
    },
  });

  const slowReveal = (delay = 0, y = 34, amount = 0.4) => ({
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount },
    transition: {
      duration: prefersReducedMotion ? 0.01 : 1.2,
      delay: prefersReducedMotion ? 0 : delay,
      ease: revealEase,
    },
  });

  return (
    <article className="bg-[#f6f3ef] text-[#1a1a18]">
      <section className="pt-[126px] sm:pt-[150px] lg:pt-[164px]">
        <Container className="max-w-[1024px] pb-18 text-center sm:pb-24">
          <motion.p {...reveal(0, 18, 0.5)} className="text-[11px] uppercase tracking-[0.4em] text-[#8e857a]">
            About
          </motion.p>

          <motion.h1
            {...reveal(0.05, 26, 0.45)}
            className="mt-6 font-(--font-home-serif) text-[30px] leading-[1.2] uppercase tracking-widest text-[#ab9468]"
          >
            About The Ratio
          </motion.h1>

          <motion.div
            {...reveal(0.1, 24, 0.4)}
            className="mx-auto mt-8 max-w-[860px] space-y-6 text-left text-base leading-relaxed text-[#4f4a44]"
          >
            <p>
              The Ratio is an established construction company delivering construction, architecture, interior design,
              and property development for private residential clients. We started the company after years in
              construction, where we repeatedly saw projects delayed by fragmented teams managing separate phases.
            </p>
            <p>
              When multiple parties were involved across design, delivery, and handover, friction and coordination gaps
              created delays, delivery risk, and avoidable complexity. We founded The Ratio to close that gap with one
              integrated, bespoke service from start to finish, always shaped around each client&apos;s needs, necessities,
              aspirations, and dreams. Our name is derived from the Golden Ratio (phi), and it reflects our commitment
              to proportion, balance, and precision in every home.
            </p>
          </motion.div>

          <motion.div
            {...reveal(0.16, 20, 0.4)}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5"
          >
            <Link
              href="/services/architecture"
              className={primaryButtonClass}
            >
              Architecture
            </Link>
            <Link
              href="/services/construction"
              className={primaryButtonClass}
            >
              Construction
            </Link>
            <Link
              href="/services/interior-design"
              className={primaryButtonClass}
            >
              Interior Design
            </Link>
            <Link
              href="/services/property-development"
              className={primaryButtonClass}
            >
              Property Development
            </Link>
          </motion.div>
        </Container>
      </section>

      <section className="border-y border-[#e4dbcf] bg-white/70 py-18 sm:py-24">
        <Container className="max-w-[1160px]">
          <motion.div {...reveal(0, 24, 0.55)} className="mx-auto max-w-[860px] text-center">
            <p className="text-[11px] uppercase tracking-[0.35em] text-[#8e857a]">Recognition & Accolades</p>
            <h2 className="mt-4 font-(--font-home-serif) text-[30px] leading-[1.2] uppercase tracking-widest text-[#ab9468]">
              Dedicated to the truly exceptional
            </h2>
            <p className="mx-auto mt-6 max-w-[700px] text-base leading-relaxed text-[#4f4a44]">
              Our team has been recognised globally through multiple international awards and shortlist placements for
              super-prime residential design and development delivery.
            </p>
          </motion.div>

          <div className="mt-12 space-y-14 sm:mt-14 sm:space-y-16">
            {accoladeTimeline.map((entry, index) => (
              <motion.article
                key={entry.year}
                {...reveal(index * 0.03, 24, 0.2)}
                className="border-t border-[#ebe2d7] pt-10 first:border-t-0 first:pt-0"
              >
                <div className="grid gap-7 md:grid-cols-[minmax(0,1.1fr)_86px_minmax(0,1fr)] md:items-start md:gap-8">
                  <div className="space-y-5 md:pt-2">
                    {entry.accolades.map((accolade) => (
                      <a
                        key={`${entry.year}-${accolade.title}`}
                        href={HOUZZ_CREDENTIALS_URL}
                        className="block space-y-1 transition-opacity duration-300 hover:opacity-75"
                      >
                        <p className="font-(--font-home-serif) text-xl uppercase leading-tight tracking-[0.08em] text-[#ab9468] sm:text-2xl">
                          {accolade.title}
                        </p>
                        <p className="text-[11px] uppercase tracking-[0.28em] text-[#7e756a]">{accolade.result}</p>
                      </a>
                    ))}
                  </div>

                  <div className="order-first flex justify-start md:order-0 md:justify-center">
                    <div className="inline-flex min-h-11 items-center justify-center border border-[#d7c8b2] px-5 text-[11px] uppercase tracking-[0.35em] text-[#7a7268]">
                      {entry.year}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-2">
                    {entry.accolades.map((accolade) => (
                      <a
                        key={`${entry.year}-${accolade.title}`}
                        href={HOUZZ_CREDENTIALS_URL}
                        className="overflow-hidden rounded-[16px] border border-[#e3d8ca] bg-[#f5efe7]"
                      >
                        <div className="relative aspect-4/3 w-full">
                          <Image
                            src={accolade.imageSrc}
                            alt={accolade.imageAlt}
                            fill
                            className="object-cover"
                            sizes="(min-width: 1024px) 240px, 50vw"
                          />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-[#f3eee6] py-18 sm:py-24">
        <div className="pointer-events-none absolute -left-14 top-10 h-56 w-56 rounded-full bg-white/55 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -right-16 bottom-8 h-64 w-64 rounded-full bg-[#d9c8af]/50 blur-3xl" aria-hidden />

        <Container className="relative z-10 max-w-[1160px]">
          <motion.div {...reveal(0, 22, 0.5)} className="mx-auto max-w-[820px] text-center">
            <p className="text-[11px] uppercase tracking-[0.35em] text-[#8e857a]">Client Reviews</p>
            <h2 className="mt-4 font-(--font-home-serif) text-[30px] leading-[1.2] uppercase tracking-widest text-[#ab9468]">
              Refined spaces, trusted outcomes
            </h2>
            <p className="mx-auto mt-6 max-w-[700px] text-base leading-relaxed text-[#4f4a44]">
              A curated selection of client feedback that reflects our design philosophy, delivery discipline, and
              attention to detail.
            </p>
          </motion.div>

          <motion.div {...reveal(0.08, 24, 0.28)} className="mx-auto mt-12 flex justify-center">
            <GlassReviewSlider
              reviews={aboutReviewSlides}
              className="w-full max-w-[520px]"
              cardClassName="min-h-[250px] !shadow-none border-[#ddd5cb] !bg-white/80"
              excerptLength={185}
              showControls={false}
              showInlineArrows
            />
          </motion.div>
        </Container>
      </section>

      <section className="bg-[#14120f] py-18 text-white sm:py-24">
        <Container className="max-w-[1160px]">
          <div className="grid gap-9 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
            <div>
              <motion.p {...slowReveal(0, 30, 0.45)} className="text-[11px] uppercase tracking-[0.35em] text-white/56">
                Our Services
              </motion.p>
              <motion.h2
                {...slowReveal(0.08, 34, 0.45)}
                className="mt-4 font-(--font-home-serif) text-[30px] uppercase leading-[1.2] tracking-widest text-[#e3cfad]"
              >
                A complete design & build ecosystem
              </motion.h2>
              <motion.p {...slowReveal(0.18, 30, 0.42)} className="mt-6 max-w-[760px] text-base leading-relaxed text-white/78">
                We provide integrated construction, architecture, interior design, and property development delivery,
                alongside furnishing and procurement. Every phase is managed by one expert team to maintain quality,
                efficiency, and design continuity from the earliest brief through final styling. As an established
                construction company, we also lead pre-construction planning, on-site coordination, and technical
                execution so design intent is protected through build.
              </motion.p>
            </div>

            <motion.div {...slowReveal(0.26, 24, 0.42)} className="lg:justify-self-end">
              <Link
                href="/services"
                className={primaryButtonClass}
              >
                Explore Services
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="bg-[#f6f3ef] py-18 sm:py-24">
        <Container className="max-w-[1160px]">
          <div className="grid gap-9 lg:grid-cols-[340px_minmax(0,1fr)] lg:items-end">
            <motion.div {...slowReveal(0.1, 30, 0.45)} className="order-2 lg:order-1">
              <Link
                href="/projects"
                className={primaryButtonClass}
              >
                View Projects
              </Link>
            </motion.div>

            <div className="order-1 lg:order-2">
              <motion.p {...slowReveal(0, 30, 0.45)} className="text-[11px] uppercase tracking-[0.35em] text-[#8e857a]">
                Our Projects
              </motion.p>
              <motion.h2
                {...slowReveal(0.08, 34, 0.45)}
                className="mt-4 font-(--font-home-serif) text-[30px] uppercase leading-[1.2] tracking-widest text-[#ab9468]"
              >
                Crafted residences with enduring character
              </motion.h2>
              <motion.p {...slowReveal(0.18, 30, 0.42)} className="mt-6 max-w-[760px] text-base leading-relaxed text-[#4f4a44]">
                Our portfolio spans super-prime homes and full-scale refurbishments where construction, architecture,
                and interiors are resolved as a single vision. Each project showcases our commitment to timeless beauty
                and meticulous execution. Alongside construction, architecture, and interiors, our teams manage
                sequencing, specialist trades, and quality control from start to handover. The result is a complete
                service model where design, construction, and development leadership stay fully aligned.
              </motion.p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#13110e] py-18 text-white sm:py-24">
        <Container className="max-w-[1160px]">
          <motion.div {...reveal(0, 22, 0.45)} className="mx-auto max-w-[760px] text-center">
            <h2 className="font-(--font-home-serif) text-[30px] leading-[1.2] uppercase tracking-widest text-white">
              Continue your journey
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/76">
              Delve deeper into our other client services.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {journeyCards.map((card, index) => (
              <motion.article
                key={card.title}
                {...reveal(index * 0.07, 24, 0.2)}
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

                <Link href={card.href} aria-label={card.title} className="block">
                  <div className="relative z-10 h-56 overflow-hidden sm:h-60">
                    {/* TODO: Replace with licensed imagery for this About journey card. */}
                    <Image
                      src={card.imageSrc}
                      alt={`${card.title} placeholder image`}
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

      <section className="border-t border-[#2b2721] bg-[#100d0a] py-18 text-white sm:py-22">
        <Container className="max-w-[980px] text-center">
          <motion.p {...slowReveal(0, 26, 0.5)} className="text-[11px] uppercase tracking-[0.35em] text-white/56">
            Get In Touch
          </motion.p>
          <motion.h2
            {...slowReveal(0.08, 30, 0.45)}
            className="mt-4 font-(--font-home-serif) text-[30px] uppercase leading-[1.2] tracking-widest text-[#e3cfad]"
          >
            Let&apos;s shape your next chapter
          </motion.h2>
          <motion.p {...slowReveal(0.16, 26, 0.4)} className="mx-auto mt-6 max-w-[700px] text-base leading-relaxed text-white/76">
            Whether you are planning a complete transformation or refining an existing space, our team is ready to
            advise, design, and deliver with precision.
          </motion.p>
          <motion.div {...slowReveal(0.24, 20, 0.4)} className="mt-10">
            <Link
              href="/contact"
              className={primaryButtonClass}
            >
              Start Your Project
            </Link>
          </motion.div>
        </Container>
      </section>
    </article>
  );
}
