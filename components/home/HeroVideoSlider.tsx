"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export type HeroVideoSlide = {
  videoSrc: string;
  posterSrc: string;
  title: string;
  subtitle?: string;
};

type HeroVideoSliderProps = {
  slides: HeroVideoSlide[];
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  intervalMs?: number;
  headingAs?: "h1" | "h2";
  id?: string;
  className?: string;
  scrollMotion?: boolean;
};

export default function HeroVideoSlider({
  slides,
  primaryCta,
  secondaryCta,
  intervalMs = 7000,
  headingAs = "h1",
  id,
  className,
  scrollMotion = false,
}: HeroVideoSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const HeadingTag = headingAs;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 640px)");
    const update = () => setIsDesktop(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, intervalMs);

    return () => window.clearInterval(interval);
  }, [intervalMs, slides.length]);

  const activeSlide = slides[activeIndex];
  const enableScrollMotion = scrollMotion && !prefersReducedMotion;
  const titleFadeEnd = isDesktop ? 0.35 : 0.45;
  const subtitleFadeEnd = isDesktop ? 0.28 : 0.4;
  const ctaFadeEnd = isDesktop ? 0.22 : 0.34;
  const titleShift = isDesktop ? -24 : -16;
  const subtitleShift = isDesktop ? -18 : -12;
  const ctaShift = isDesktop ? -12 : -8;

  const titleOpacity = useTransform(
    scrollYProgress,
    [0, titleFadeEnd, 1],
    [1, enableScrollMotion ? 0 : 1, enableScrollMotion ? 0 : 1],
  );
  const titleY = useTransform(
    scrollYProgress,
    [0, titleFadeEnd, 1],
    [0, enableScrollMotion ? titleShift : 0, enableScrollMotion ? titleShift : 0],
  );
  const subtitleOpacity = useTransform(
    scrollYProgress,
    [0, subtitleFadeEnd, 1],
    [1, enableScrollMotion ? 0 : 1, enableScrollMotion ? 0 : 1],
  );
  const subtitleY = useTransform(
    scrollYProgress,
    [0, subtitleFadeEnd, 1],
    [0, enableScrollMotion ? subtitleShift : 0, enableScrollMotion ? subtitleShift : 0],
  );
  const ctaOpacity = useTransform(
    scrollYProgress,
    [0, ctaFadeEnd, 1],
    [1, enableScrollMotion ? 0 : 1, enableScrollMotion ? 0 : 1],
  );
  const ctaY = useTransform(
    scrollYProgress,
    [0, ctaFadeEnd, 1],
    [0, enableScrollMotion ? ctaShift : 0, enableScrollMotion ? ctaShift : 0],
  );

  if (!activeSlide) {
    return null;
  }

  return (
    <section
      id={id}
      ref={containerRef}
      className={cn(
        "relative flex min-h-screen items-center overflow-hidden bg-[#0f0f0d] text-white",
        className,
      )}
    >
      <div className="absolute inset-0">
        <video
          key={activeSlide.videoSrc}
          className="h-full w-full object-cover motion-safe:animate-[heroFade_900ms_ease-out]"
          autoPlay
          muted
          loop
          playsInline
          poster={activeSlide.posterSrc}
          aria-label={activeSlide.title}
        >
          <source src={activeSlide.videoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-to-b from-black/65 via-black/35 to-black/70" />
      </div>

      <div className="relative z-10 w-full">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-24">
          <div
            key={`hero-copy-${activeIndex}`}
            className="max-w-3xl motion-safe:animate-[heroFade_900ms_ease-out]"
          >
            <p className="text-[11px] uppercase tracking-[0.4em] text-white/70">
              The Ratio
            </p>
            <motion.span style={{ opacity: titleOpacity, y: titleY }}>
              <HeadingTag className="mt-6 text-4xl font-semibold tracking-[-0.02em] text-white sm:text-6xl">
                {activeSlide.title}
              </HeadingTag>
            </motion.span>
            {activeSlide.subtitle ? (
              <motion.p
                className="mt-6 text-base text-white/80 sm:text-lg"
                style={{ opacity: subtitleOpacity, y: subtitleY }}
              >
                {activeSlide.subtitle}
              </motion.p>
            ) : null}
            <motion.div className="mt-8 flex flex-wrap gap-4" style={{ opacity: ctaOpacity, y: ctaY }}>
              <Link
                className="rounded-full bg-[#b6814b] px-6 py-3 text-[11px] uppercase tracking-[0.32em] text-[#1a1a18] transition duration-300 hover:bg-[#9c6b3f]"
                href={primaryCta.href}
              >
                {primaryCta.label}
              </Link>
              {secondaryCta ? (
                <Link
                  className="rounded-full border border-white/50 px-6 py-3 text-[11px] uppercase tracking-[0.32em] text-white transition duration-300 hover:border-white"
                  href={secondaryCta.href}
                >
                  {secondaryCta.label}
                </Link>
              ) : null}
            </motion.div>
          </div>
          <div className="flex items-center gap-3">
            {slides.map((slide, index) => (
              <button
                key={`${slide.title}-${index}`}
                type="button"
                className={cn(
                  "h-2.5 w-2.5 rounded-full border border-white/50 transition-all duration-300",
                  index === activeIndex ? "bg-white" : "bg-transparent",
                )}
                aria-label={`Show slide ${index + 1}`}
                aria-pressed={index === activeIndex}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes heroFade {
          0% {
            opacity: 0;
            transform: translateY(12px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
