"use client";

import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/container";

const revealEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ReviewsHero() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <section className="relative overflow-hidden bg-[#f4eee6] pb-14 pt-28 sm:pb-18 sm:pt-32 lg:pb-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-60 bg-[linear-gradient(180deg,rgba(171,148,104,0.28),transparent)]" />

      <Container className="relative">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.75, ease: revealEase }}
          className="max-w-4xl"
        >
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#8a755b]">Client feedback</p>
          <h1 className="mt-4 font-(--font-home-serif) text-4xl uppercase tracking-[0.08em] text-[#1f1a15] sm:text-5xl lg:text-6xl">
            Reviews
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#5c5348] sm:text-lg">
            At The Ratio, most new projects come through recommendation. Explore verified testimonials below
            to see how clients describe our planning clarity, construction quality, and delivery experience.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
