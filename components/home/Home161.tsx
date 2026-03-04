"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/container";
import GlassReviewSlider from "@/components/reviews/GlassReviewSlider";
import { buildMixedReviewSlides } from "@/components/reviews/reviewSlides";
import { blogPosts, formatBlogDate } from "@/lib/blog/posts";
import { reviewCardData } from "@/lib/reviews";

const services = [
  {
    title: "Architecture",
    description:
      "Architect-led planning and technical delivery for composed, buildable residential outcomes.",
    href: "/services/architecture",
    imageSrc: "/images/placeholders/services/architecture/Arch2.jpg",
  },
  {
    title: "Construction",
    description:
      "Disciplined site leadership and programme control to realise design intent without compromise.",
    href: "/services/construction",
    imageSrc: "/images/placeholders/services/construction/h21.png",
  },
  {
    title: "Interior Design",
    description:
      "Refined interior architecture, material curation, and detailing tailored to private lifestyles.",
    href: "/services/interior-design",
    imageSrc: "/images/placeholders/services/interior-design/hero-placeholder.jpg",
  },
  {
    title: "Property Development",
    description:
      "End-to-end development oversight from acquisition strategy through completed homes.",
    href: "/services/property-development",
    imageSrc: "/images/placeholders/services/property-development/m2.jpeg",
  },
];

const showroomFeature = {
  title: "The Ratio Showroom",
  description:
    "Step into an immersive editorial environment where materials, finishes, and craftsmanship are experienced in person before delivery.",
  href: "/showroom",
  imageSrc: "/images/placeholders/showroom/hero-editorial.jpg",
};

const HOME_SECTION_SPACING = "py-24 sm:py-28";

const homeTrustReviews = buildMixedReviewSlides({
  entries: reviewCardData,
  minRating: 4,
  totalLimit: 12,
  startWith: "google",
});

const journeyCards = [
  {
    title: "Our Design Services",
    description: "Our award-winning design team guides every stage from concept through completion.",
    href: "/services",
    cta: "Design Services",
    imageSrc: "/images/placeholders/services/architecture/Arch2.jpg",
  },
  {
    title: "Projects",
    description:
      "Explore our latest residences and development outcomes, delivered with architectural precision and refined detail.",
    href: "/projects",
    cta: "View Projects",
    imageSrc: "/images/projects/the-bryant-project/the-bryant-project2.jpg",
  },
  {
    title: "Showroom",
    description:
      "Discover our curated showroom experience with signature materials, finishes, and spatial concepts in person.",
    href: "/showroom",
    cta: "Visit Showroom",
    imageSrc: "/images/placeholders/showroom/hero-editorial.jpg",
  },
];

const latestProjects = [
  {
    title: "The Bryant Project",
    description:
      "A high-spec residential transformation balancing architectural structure with editorial interior detailing.",
    href: "/projects/the-bryant-project",
    imageSrc: "/images/projects/the-bryant-project/the-bryant-project11.jpg",
  },
  {
    title: "The Durham Project",
    description:
      "A layered family residence with bespoke joinery, controlled natural light, and precision sequencing.",
    href: "/projects/the-durham-project-1",
    imageSrc: "/images/projects/the-durham-project-1/the-durham-project15.jpg",
  },
  {
    title: "The Fulwell Project",
    description:
      "A contemporary residence calibrated for lifestyle-led planning, buildability, and highly tailored finishes.",
    href: "/projects/the-fulwell-project",
    imageSrc: "/images/projects/the-fulwell-project/Loft-conversion-london-the-ratio.jpg",
  },
];

const serviceCardAccents = [
  "from-[#e8d8be]/50 via-[#d6b88f]/30 to-transparent",
  "from-[#d6e0e8]/50 via-[#adc6d6]/30 to-transparent",
  "from-[#d8d6e8]/50 via-[#bab0da]/30 to-transparent",
  "from-[#e8d8be]/50 via-[#d6b88f]/30 to-transparent",
];

const blogCardAccents = [
  "from-[#e8d8be]/50 via-[#d6b88f]/30 to-transparent",
  "from-[#d6e0e8]/50 via-[#adc6d6]/30 to-transparent",
  "from-[#d8d6e8]/50 via-[#bab0da]/30 to-transparent",
];

const journeyCardAccents = [
  "from-[#e8d8be]/50 via-[#d6b88f]/30 to-transparent",
  "from-[#d6e0e8]/50 via-[#adc6d6]/30 to-transparent",
  "from-[#d8d6e8]/50 via-[#bab0da]/30 to-transparent",
];

const homeBlogHighlights = [...blogPosts]
  .sort((a, b) => b.publishedOn.localeCompare(a.publishedOn))
  .slice(0, 3)
  .map((post, index) => ({
    ...post,
    href: `/blog/${post.slug}`,
    accent: blogCardAccents[index % blogCardAccents.length],
  }));

export default function Home161() {
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const activeProject = latestProjects[activeProjectIndex];
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroCopyOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const heroCopyY = useTransform(scrollYProgress, [0, 0.35], [0, 40]);
  const heroBackgroundScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.12]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveProjectIndex((current) => (current + 1) % latestProjects.length);
    }, 7200);

    return () => window.clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <>
      <section ref={heroRef} className="relative min-h-svh overflow-hidden bg-[#0d0d0d] text-white">
        <motion.div
          className="absolute inset-0"
          style={{
            scale: prefersReducedMotion ? 1.04 : heroBackgroundScale,
          }}
          transition={{
            duration: prefersReducedMotion ? 0.01 : 0.3,
          }}
        >
          <video
            className="h-full w-full object-cover"
            autoPlay={!Boolean(prefersReducedMotion)}
            muted
            loop
            playsInline
            controls={Boolean(prefersReducedMotion)}
            poster=""
            preload="metadata"
            aria-label="The Ratio homepage hero video"
          >
            <source src="/videos/services/shared/main.m4v" type="video/mp4" />
          </video>
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,8,8,0.12),rgba(8,8,8,0.34))]" />

        <Container className="relative z-10 flex min-h-svh flex-col items-center justify-end pb-24 pt-32 text-center sm:pb-28">
          <motion.div
            style={{
              opacity: prefersReducedMotion ? 1 : heroCopyOpacity,
              y: prefersReducedMotion ? 0 : heroCopyY,
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.75, delay: 0.1 }}
              className="text-[11px] uppercase tracking-[0.4em] text-white/80"
            >
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.9, delay: 0.2 }}
              className="mt-6 font-(--font-home-serif) text-4xl uppercase tracking-[0.14em] sm:text-5xl lg:text-6xl"
            >
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.8, delay: 0.35 }}
              className="mt-8"
            >
              <Link
                href="/projects"
                className="inline-flex items-center border-b border-[#ab9468] pb-1 text-[16px] uppercase tracking-widest text-[#ab9468] transition-colors hover:text-[#c8ae7a]"
              >
                Discover Our Projects
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      <section className={`bg-white ${HOME_SECTION_SPACING}`}>
        <Container className="max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="font-(--font-home-serif) text-3xl uppercase leading-tight tracking-widest text-[#ab9468] sm:text-4xl lg:text-5xl"
          >
            Established Construction Company for Architecture, Interior Design &amp; Property Development
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.95, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-[#545960] sm:text-lg"
          >
            As an established construction company, The Ratio delivers construction, architecture, interior design, and
            property development through one accountable team. Our name is derived from the Golden Ratio (phi), which
            reflects our commitment to proportion, balance, and precision in every project. From first brief through
            final handover, we align design intent with disciplined delivery to create residences of enduring quality.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10"
          >
            <Link
              href="/about"
              className="inline-flex rounded-full border border-[#d1c5b5] px-7 py-3 text-[11px] uppercase tracking-[0.32em] text-[#ab9468] transition-colors hover:border-[#ab9468] hover:text-[#8c744c]"
            >
              About The Ratio
            </Link>
          </motion.div>
        </Container>
      </section>

      <section className={`bg-[#f3efea] ${HOME_SECTION_SPACING}`}>
        <Container className="grid gap-14 lg:grid-cols-2 lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 46 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.32 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.95, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-(--font-home-serif) text-3xl uppercase leading-tight tracking-widest text-[#ab9468] sm:text-4xl">
              Trusted | Respected | Honoured
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#545960] sm:text-lg">
              We are proud to have built a global community sharing our passion for design. Our work has been recognised
              through multiple design awards.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 46 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.32 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.95, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:justify-self-end"
          >
            <GlassReviewSlider
              reviews={homeTrustReviews}
              className="w-full max-w-[520px]"
              cardClassName="min-h-[250px] !shadow-none border-[#ddd5cb] !bg-white/80"
              excerptLength={185}
              showControls={false}
              showInlineArrows
            />
          </motion.div>
        </Container>
      </section>

      <section className={`relative overflow-hidden ${HOME_SECTION_SPACING}`}>
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/images/placeholders/services/property-development/hero-desktop.svg"
            alt=""
            fill
            className="hidden object-cover md:block"
            sizes="100vw"
            aria-hidden
          />
          <Image
            src="/images/placeholders/services/property-development/hero-mobile.svg"
            alt=""
            fill
            className="object-cover md:hidden"
            sizes="100vw"
            aria-hidden
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,9,8,0.62),rgba(10,9,8,0.78)_52%,rgba(10,9,8,0.88))]" />
        </div>

        <Container className="relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-center font-(--font-home-serif) text-3xl uppercase tracking-[0.12em] text-[#d9c09b] sm:text-4xl"
          >
           Services
          </motion.h2>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: -8,
                        scale: 1.012,
                        transition: { duration: 0.36, ease: [0.16, 1, 0.3, 1] },
                      }
                }
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: prefersReducedMotion ? 0.01 : 0.85,
                  delay: prefersReducedMotion ? 0 : index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative isolate overflow-hidden rounded-[28px] border border-white/24 bg-white/9 shadow-[0_22px_48px_rgba(3,8,16,0.26)] backdrop-blur-xl"
              >
                <div
                  className={`pointer-events-none absolute -top-14 left-1/2 h-36 w-[130%] -translate-x-1/2 rounded-full bg-linear-to-b ${serviceCardAccents[index % serviceCardAccents.length]} blur-2xl transition duration-700 group-hover:scale-110`}
                />
                <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_18%_0%,rgba(255,255,255,0.24),transparent_52%),radial-gradient(circle_at_82%_100%,rgba(183,152,111,0.16),transparent_50%)]" />
                <div className="pointer-events-none absolute inset-[1px] rounded-[inherit] border border-white/24" />

                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute -inset-y-12 left-[-70%] w-[64%] -translate-x-full rotate-12 bg-linear-to-r from-transparent via-white/45 to-transparent opacity-0 blur-xl md:hidden"
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
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                />

                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-y-12 left-[-70%] hidden w-[64%] -translate-x-full rotate-12 bg-linear-to-r from-transparent via-white/45 to-transparent opacity-0 blur-xl transition duration-700 ease-out group-hover:translate-x-[280%] group-hover:opacity-75 md:block"
                />

                <Link href={service.href} className="block" aria-label={service.title}>
                  <div className="relative z-10 h-60 w-full overflow-hidden">
                    <Image
                      src={service.imageSrc}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/45 to-black/80" />
                  </div>
                  <div className="relative z-10 space-y-4 p-8">
                    <h3 className="font-(--font-home-serif) text-2xl uppercase tracking-[0.08em] text-[#dfc6a2]">
                      {service.title}
                    </h3>
                    <p className="text-base leading-relaxed text-white/78">{service.description}</p>
                    <span className="inline-flex border-b border-[#d9c09b] pb-1 text-[11px] uppercase tracking-[0.24em] text-[#d9c09b] transition-colors group-hover:text-[#f1dbba]">
                      {service.title}
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </Container>
      </section>

      <section id="latest-projects" className={`bg-[#f3efea] ${HOME_SECTION_SPACING}`}>
        <Container>
          <motion.h2
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-center font-(--font-home-serif) text-3xl uppercase tracking-[0.12em] text-[#ab9468] sm:text-4xl"
          >
            Our Latest Projects
          </motion.h2>
        </Container>

        <motion.article
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 overflow-hidden border-y border-[#1f1914] bg-[#120f0d]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.title}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -16 }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="relative min-h-[420px] sm:min-h-[520px] lg:min-h-[620px]"
            >
              <Image
                src={activeProject.imageSrc}
                alt={activeProject.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,7,6,0.14),rgba(8,7,6,0.55)_52%,rgba(8,7,6,0.9))]" aria-hidden />

              <motion.div
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0.01 : 0.62, delay: prefersReducedMotion ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 mx-auto flex min-h-[420px] w-full max-w-6xl flex-col justify-end space-y-5 px-6 pb-10 sm:min-h-[520px] sm:px-8 sm:pb-12 lg:min-h-[620px] lg:px-10 lg:pb-14"
              >
                <p className="text-[11px] uppercase tracking-[0.34em] text-white/72">Featured project</p>
                <h3 className="max-w-3xl font-(--font-home-serif) text-3xl uppercase tracking-[0.08em] text-[#e5cfad] sm:text-4xl lg:text-5xl">
                  {activeProject.title}
                </h3>
                <p className="max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">{activeProject.description}</p>
                <Link
                  href={activeProject.href}
                  className="inline-flex w-fit border-b border-[#ddc4a0] pb-1 text-[11px] uppercase tracking-[0.28em] text-[#ddc4a0] transition-colors hover:text-[#f2dfc5]"
                >
                  Step Inside
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.article>

        <Container>
          <div className="mt-7 flex items-center justify-center gap-3">
            {latestProjects.map((project, index) => (
              <button
                type="button"
                key={project.title}
                onClick={() => setActiveProjectIndex(index)}
                aria-label={`Show project ${index + 1}: ${project.title}`}
                aria-current={activeProjectIndex === index}
                className={
                  activeProjectIndex === index
                    ? "h-2.5 w-2.5 rounded-full bg-[#ab9468]"
                    : "h-2.5 w-2.5 rounded-full bg-[#cbc1b3] transition-colors hover:bg-[#bdaa8e]"
                }
              />
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/projects"
              className="inline-flex rounded-full border border-[#d1c5b5] px-8 py-3 text-[11px] uppercase tracking-[0.32em] text-[#ab9468] transition-colors hover:border-[#ab9468] hover:text-[#8c744c]"
            >
              View All
            </Link>
          </div>
        </Container>
      </section>

      <section id="showroom" className={`bg-[#f3efea] `}>
        <Container>
          <motion.h2
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-center font-(--font-home-serif) text-3xl uppercase tracking-[0.12em] text-[#ab9468] sm:text-4xl"
          >
            Showroom
          </motion.h2>
        </Container>

        <motion.article
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 overflow-hidden border-y border-[#1f1914] bg-[#120f0d]"
        >
          <Link href={showroomFeature.href} className="group relative block min-h-[420px] sm:min-h-[520px] lg:min-h-[620px]" aria-label="Visit the showroom">
            <Image
              src={showroomFeature.imageSrc}
              alt="Editorial view of The Ratio showroom"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,7,6,0.16),rgba(8,7,6,0.58)_52%,rgba(8,7,6,0.9))]" aria-hidden />

            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.62, delay: prefersReducedMotion ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 mx-auto flex min-h-[420px] w-full max-w-6xl flex-col justify-end space-y-5 px-6 pb-10 sm:min-h-[520px] sm:px-8 sm:pb-12 lg:min-h-[620px] lg:px-10 lg:pb-14"
            >
              <p className="text-[11px] uppercase tracking-[0.34em] text-white/72">The Ratio Showroom</p>
              <h3 className="max-w-3xl font-(--font-home-serif) text-3xl uppercase tracking-[0.08em] text-[#e5cfad] sm:text-4xl lg:text-5xl">
                {showroomFeature.title}
              </h3>
              <p className="max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">{showroomFeature.description}</p>
              <span className="inline-flex w-fit border-b border-[#ddc4a0] pb-1 text-[11px] uppercase tracking-[0.28em] text-[#ddc4a0] transition-colors group-hover:text-[#f2dfc5]">
                Visit the Showroom
              </span>
            </motion.div>
          </Link>
        </motion.article>
      </section>

      <section className={`relative overflow-hidden bg-[#101317] text-white ${HOME_SECTION_SPACING}`}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(232,216,190,0.2),transparent_58%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(170,187,209,0.16),transparent_58%)]" />
        <Container>
          <motion.h2
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative text-center font-(--font-home-serif) text-3xl uppercase tracking-[0.12em] text-[#e6d0ad] sm:text-4xl"
          >
            From the Blog
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.82, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto mt-6 max-w-3xl text-center text-base leading-relaxed text-white/72 sm:text-lg"
          >
            Editorial insights on planning, materials, and design delivery for luxury residential projects.
          </motion.p>

          <div className="relative mt-12 grid gap-6 lg:grid-cols-3">
            {homeBlogHighlights.map((item, index) => (
              <motion.article
                key={item.slug}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: -8,
                        scale: 1.012,
                        transition: { duration: 0.36, ease: [0.16, 1, 0.3, 1] },
                      }
                }
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: prefersReducedMotion ? 0.01 : 0.85,
                  delay: prefersReducedMotion ? 0 : index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative overflow-hidden rounded-[28px] border border-white/24 bg-white/9 p-7 shadow-[0_22px_48px_rgba(3,8,16,0.26)] backdrop-blur-xl"
              >
                <div className={`pointer-events-none absolute -top-14 left-1/2 h-36 w-[130%] -translate-x-1/2 rounded-full bg-linear-to-b ${item.accent} blur-2xl transition duration-700 group-hover:scale-110`} />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-y-12 left-[-70%] hidden w-[64%] -translate-x-full rotate-12 bg-linear-to-r from-transparent via-white/45 to-transparent opacity-0 blur-xl transition duration-700 ease-out group-hover:translate-x-[280%] group-hover:opacity-75 md:block"
                />

                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute -inset-y-12 left-[-70%] w-[64%] -translate-x-full rotate-12 bg-linear-to-r from-transparent via-white/45 to-transparent opacity-0 blur-xl md:hidden"
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
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                />

                <div className="relative">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-white/70">
                    {item.category} · {formatBlogDate(item.publishedOn)}
                  </p>
                  <h3 className="mt-5 font-(--font-home-serif) text-2xl leading-tight tracking-[0.06em] text-[#f0dfc5] transition-colors duration-300 group-hover:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/76 sm:text-[15px]">{item.excerpt}</p>

                  <Link
                    href={item.href}
                    className="mt-7 inline-flex items-center gap-3 border-b border-[#dbc39e] pb-1 text-[11px] uppercase tracking-[0.24em] text-[#dbc39e] transition-colors hover:text-[#f0dfc5]"
                  >
                    Read article
                    <span className="h-px w-8 bg-current" aria-hidden />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#13110e] py-18 text-white sm:py-24">
        <Container className="max-w-[1160px]">
          <motion.h2
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.88, ease: [0.16, 1, 0.3, 1] }}
            className="text-center font-(--font-home-serif) text-[30px] leading-[1.2] uppercase tracking-widest text-white"
          >
            Continue Your Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.82, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-6 max-w-[760px] text-center text-base leading-relaxed text-white/76"
          >
            Delve deeper into our client services, landmark projects, and sustainability commitments.
          </motion.p>

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
                        transition: { duration: 0.36, ease: [0.16, 1, 0.3, 1] },
                      }
                }
                viewport={{ once: true, amount: 0.22 }}
                transition={{
                  duration: prefersReducedMotion ? 0.01 : 0.82,
                  delay: prefersReducedMotion ? 0 : index * 0.07,
                  ease: [0.16, 1, 0.3, 1],
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
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                />

                <Link href={item.href} aria-label={item.title} className="block">
                  <div className="relative z-10 h-56 overflow-hidden sm:h-60">
                    {/* TODO: replace with licensed Ratio CTA imagery. */}
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-[1.05]"
                      sizes="(min-width: 1280px) 30vw, (min-width: 768px) 48vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/30 to-black/72" aria-hidden />
                  </div>
                  <div className="relative z-10 space-y-4 p-7">
                    <h3 className="font-(--font-home-serif) text-[30px] leading-[1.2] uppercase tracking-[0.03em] text-white">
                      {item.title}
                    </h3>
                    <p className="text-base leading-relaxed text-white/74">{item.description}</p>
                    <span className="inline-flex border-b border-[#ab9468] pb-1 text-[11px] uppercase tracking-[0.24em] text-[#d8be94] transition-colors duration-300 group-hover:text-white">
                      {item.cta}
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
