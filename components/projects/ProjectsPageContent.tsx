"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/container";
import { getOrderedProjects, resolveProjectImageSrc } from "@/lib/projects/data";

const luxuryEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const projectCardAccents = [
  "from-[#f5e9da]/85 via-[#dec6a8]/45 to-transparent",
  "from-[#e6ecf2]/85 via-[#c4d1df]/45 to-transparent",
  "from-[#ece6f3]/85 via-[#d1c4e2]/45 to-transparent",
];

const primaryButtonClass =
  "inline-flex items-center justify-center rounded-full bg-[#b6814b] px-7 py-3 text-[11px] uppercase tracking-[0.32em] text-[#1a1a18] transition duration-300 hover:-translate-y-0.5 hover:bg-[#9c6b3f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b6814b]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f3ef]";

export default function ProjectsPageContent() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const projects = getOrderedProjects();

  const revealUp = (delay = 0, duration = 1, y = 12) => ({
    initial: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.28 },
    transition: {
      duration: prefersReducedMotion ? 0.01 : duration,
      delay: prefersReducedMotion ? 0 : delay,
      ease: luxuryEase,
    },
  });

  const revealFadeIn = (delay = 0) => ({
    initial: prefersReducedMotion ? { opacity: 1 } : { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, amount: 0.18 },
    transition: {
      duration: prefersReducedMotion ? 0.01 : 0.75,
      delay: prefersReducedMotion ? 0 : delay,
      ease: "easeInOut",
    },
  });

  return (
    <article className="overflow-x-clip bg-[#f6f3ef] text-[#1a1a18]">
      <section className="bg-white pb-14 pt-30 sm:pb-16 sm:pt-34 lg:pb-20 lg:pt-38">
        <Container className="max-w-5xl">
          <motion.h1
            {...revealUp(0.02, 1, 14)}
            className="text-center font-(--font-home-serif) text-3xl uppercase leading-tight tracking-[0.08em] text-[#ab9468] sm:text-4xl lg:text-5xl"
          >
            Selected Projects
          </motion.h1>

          <motion.div
            {...revealUp(0.06, 1, 14)}
            className="mx-auto mt-7 max-w-4xl space-y-5 text-center text-[15px] leading-relaxed text-[#3f3932] sm:text-base"
          >
            <p>
              At The Ratio, we operate at the intersection of architecture, construction, and interior design, delivering highly considered spaces from concept to completion.
              From luxury residential developments and complex construction management to bespoke architectural and interior design, we oversee every stage of the process—ensuring clarity, control, and design integrity throughout.
              Our fully integrated, one-stop studio approach allows each discipline to work in harmony, enabling us to push creative and technical boundaries while maintaining absolute precision in execution. Every decision is guided by purpose, proportion, and detail, where compromise is not an option. 
              Approaching each project with the same level of rigour, craft, and architectural intent.
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="bg-white pb-16 sm:pb-20 lg:pb-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <motion.article
                key={project.slug}
                {...revealFadeIn(Math.min(index, 8) * 0.08)}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: -8,
                        scale: 1.012,
                        transition: { duration: 0.36, ease: luxuryEase },
                      }
                }
                className="group relative isolate overflow-hidden rounded-[22px] border border-[#ded3c5] bg-white"
              >
                <div
                  className={`pointer-events-none absolute -top-14 left-1/2 h-36 w-[130%] -translate-x-1/2 rounded-full bg-linear-to-b ${projectCardAccents[index % projectCardAccents.length]} blur-none transition duration-700 group-hover:scale-110`}
                />
                <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_18%_0%,rgba(255,255,255,0.45),transparent_52%),radial-gradient(circle_at_82%_100%,rgba(171,148,104,0.12),transparent_50%)]" />
                <div className="pointer-events-none absolute inset-px rounded-[inherit] border border-white/55" />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-y-12 left-[-70%] w-[64%] -translate-x-full rotate-12 bg-linear-to-r from-transparent via-white/70 to-transparent opacity-0 blur-none transition duration-700 ease-out group-hover:translate-x-[280%] group-hover:opacity-45"
                />
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute -inset-y-12 left-[-70%] w-[64%] -translate-x-full rotate-12 bg-linear-to-r from-transparent via-white/70 to-transparent opacity-0 blur-none"
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
                  transition={{ duration: 1.2, ease: luxuryEase }}
                />

                <Link
                  href={`/projects/${project.slug}`}
                  className="relative z-10 block"
                  aria-label={`View ${project.title}`}
                >
                  <div className="relative h-[420px] overflow-hidden bg-black sm:h-[480px]">
                    <Image
                      src={resolveProjectImageSrc(project.thumbnail)}
                      alt={project.thumbnail.alt}
                      fill
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:scale-[1.02]"
                      sizes="(min-width: 1280px) 30vw, (min-width: 768px) 47vw, 100vw"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-black/6 transition-opacity duration-500 group-hover:opacity-12" />
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/36 via-black/10 to-transparent" aria-hidden />
                  </div>

                  <div className="space-y-4 p-6">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-[#8c7c66]">{project.location}</p>
                    <h2 className="font-(--font-home-serif) text-2xl uppercase tracking-[0.08em] text-[#2f2820] transition-colors duration-500 group-hover:text-[#ab9468]">
                      {project.title}
                    </h2>
                    <span
                      className="block h-px w-10 bg-[#b9a98f] transition-all duration-500 group-hover:w-16 group-hover:bg-[#ab9468]"
                      aria-hidden
                    />
                    <p className="text-sm leading-relaxed text-[#554c40] sm:text-[15px]">{project.summary}</p>
                    <span className="inline-flex border-b border-[#ab9468] pb-1 text-[11px] uppercase tracking-[0.24em] text-[#9f8458] transition-colors duration-300 group-hover:text-[#7f6540]">
                      View project
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white pb-[calc(4rem+env(safe-area-inset-bottom))] pt-4 sm:pt-6 lg:pt-8">
        <Container className="max-w-4xl text-center">
          <motion.h2
            {...revealUp(0.02, 1, 12)}
            className="font-(--font-home-serif) text-3xl uppercase tracking-[0.08em] text-[#ab9468] sm:text-4xl lg:text-5xl"
          >
            Start your project
          </motion.h2>
          <motion.p
            {...revealUp(0.06, 1, 12)}
            className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-[#4a4137] sm:text-lg"
          >
            Contact our team to discuss your brief and project timeline.
          </motion.p>
          <motion.div {...revealUp(0.1, 0.85, 10)} className="mt-8 flex justify-center">
            <Link href="/contact" className={primaryButtonClass}>
              Get in touch
            </Link>
          </motion.div>
        </Container>
      </section>
    </article>
  );
}
