"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import useRevealObserver from "@/components/animations/useRevealObserver";
import Container from "@/components/ui/container";

type ServicesIntroHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function ServicesIntroHero({
  eyebrow,
  title,
  description,
}: ServicesIntroHeroProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);

  useRevealObserver(sectionRef, {
    threshold: 0.3,
    rootMargin: "0px 0px -10% 0px",
    once: true,
    staggerMs: 100,
  });

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#f4f1ec] text-[#1a1a18]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(95% 80% at 0% 0%, rgba(188,149,104,0.16), rgba(188,149,104,0) 65%), radial-gradient(75% 65% at 100% 100%, rgba(150,166,185,0.14), rgba(150,166,185,0) 72%)",
        }}
        aria-hidden
      />

      <Container className="relative z-10 grid min-h-[76svh] gap-10 pb-16 pt-30 sm:min-h-[78svh] sm:pb-20 sm:pt-34 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:pb-24 lg:pt-36">
        <div className="reveal-group max-w-3xl space-y-6">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#8e8579]">
            {eyebrow}
          </p>

          <h1 className="text-4xl font-semibold tracking-[-0.02em] text-[#1a1a18] sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-[#574f47] sm:text-lg">
            {description}
          </p>

          <p className="max-w-2xl text-sm leading-relaxed text-[#6b635a] sm:text-base">
            From concept strategy to final handover, our construction-led team combines construction,
            architecture, interior design, and property development management into one seamless delivery model.
          </p>

          <div className="reveal-group flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.28em]">
            {[
              "Architecture + Planning",
              "Construction Delivery",
              "Interior Direction",
              "Development Oversight",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#d2c8bb] bg-[#faf8f4] px-4 py-2 text-[#6a5f52]"
                >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <aside className="reveal max-w-xl rounded-[26px] border border-[#dbd2c6] bg-[#f8f4ee] p-6 shadow-[0_22px_48px_rgba(60,43,26,0.1)] sm:p-8">
          <p className="text-[11px] uppercase tracking-[0.34em] text-[#8d816f]">What to expect</p>
          <h2 className="mt-4 text-2xl font-semibold tracking-[-0.01em] text-[#2b241d] sm:text-3xl">
            A measured route from brief to built reality.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#5a5045] sm:text-base">
            We structure every project with transparent milestones, clear reporting,
            and one accountable team so decisions stay fast and delivery stays composed.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-[#4f463c]">
            <div className="rounded-2xl border border-[#e2d9cd] bg-[#fdfbf8] px-4 py-3">
              Design, planning, and build sequencing aligned from day one.
            </div>
            <div className="rounded-2xl border border-[#e2d9cd] bg-[#fdfbf8] px-4 py-3">
              One integrated team, fewer handoff risks, stronger quality control.
            </div>
          </div>
        </aside>
      </Container>

      {!prefersReducedMotion ? (
        <motion.div
          className="pointer-events-none absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-[#7d7263]"
          animate={{ y: [0, 5, 0], opacity: [0.68, 1, 0.68] }}
          transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          aria-hidden
        >
          <span>Scroll</span>
          <span className="h-7 w-px bg-[#b9ac9a]/80" />
          <span className="h-2.5 w-2.5 rounded-full border border-[#a79986] bg-white/70" />
        </motion.div>
      ) : null}

      <Link
        href="#services-stack"
        className="absolute inset-x-0 bottom-0 z-10 block h-10"
        aria-label="Scroll to services"
      />
    </section>
  );
}
