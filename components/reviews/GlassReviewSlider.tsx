"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type GlassReviewSlide = {
  id: string;
  quote: string;
  name: string;
  source: "House" | "Google";
};

type GlassReviewSliderProps = {
  reviews: GlassReviewSlide[];
  intervalMs?: number;
  className?: string;
  cardClassName?: string;
  excerptLength?: number;
  showControls?: boolean;
  showInlineArrows?: boolean;
};

const revealEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const hoverReflectionVariants = {
  rest: { opacity: 0, x: "-38%" },
  hover: {
    opacity: 0.62,
    x: "52%",
    transition: { duration: 0.62, ease: revealEase },
  },
};

const cardHoverVariants = {
  rest: { y: 0, scale: 1 },
  hover: { y: -4, scale: 1.01 },
};

const truncateQuote = (quote: string, maxLength: number) => {
  if (quote.length <= maxLength) {
    return quote;
  }

  return `${quote.slice(0, maxLength).trimEnd()}…`;
};

export default function GlassReviewSlider({
  reviews,
  intervalMs = 6500,
  className,
  cardClassName,
  excerptLength = 220,
  showControls = true,
  showInlineArrows = false,
}: GlassReviewSliderProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const safeActiveIndex = reviews.length > 0 ? activeIndex % reviews.length : 0;

  useEffect(() => {
    if (prefersReducedMotion || isPaused || reviews.length <= 1) {
      return;
    }

    const timerId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % reviews.length);
    }, intervalMs);

    return () => window.clearInterval(timerId);
  }, [intervalMs, isPaused, prefersReducedMotion, reviews.length]);

  if (reviews.length === 0) {
    return null;
  }

  const activeReview = reviews[safeActiveIndex];

  const goToSlide = (index: number) => setActiveIndex(index);
  const goToPrevious = () => setActiveIndex((current) => (current - 1 + reviews.length) % reviews.length);
  const goToNext = () => setActiveIndex((current) => (current + 1) % reviews.length);

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={activeReview.id}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 22 }}
          animate={{ opacity: 1, x: 0 }}
          exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -22 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.52, ease: revealEase }}
          drag={reviews.length > 1 && !prefersReducedMotion ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.16}
          onDragEnd={(_, info) => {
            if (Math.abs(info.offset.x) < 70 && Math.abs(info.velocity.x) < 320) {
              return;
            }

            if (info.offset.x < 0) {
              goToNext();
              return;
            }

            goToPrevious();
          }}
        >
          <motion.article
            variants={cardHoverVariants}
            initial="rest"
            whileHover={prefersReducedMotion ? undefined : "hover"}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.28, ease: revealEase }}
            className={cn(
              "group relative isolate overflow-hidden rounded-[24px] border border-white/60 bg-[linear-gradient(145deg,rgba(255,255,255,0.76),rgba(255,255,255,0.34)_50%,rgba(232,221,208,0.5))] p-6 shadow-[0_30px_68px_rgba(40,30,18,0.18),inset_0_1px_0_rgba(255,255,255,0.74)] backdrop-blur-xl sm:p-7",
              cardClassName,
            )}
          >
            <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-[135%] -translate-x-1/2 rounded-full bg-linear-to-b from-[#e8d8be]/74 via-[#d6b88f]/45 to-transparent blur-2xl transition duration-700 group-hover:scale-110" />
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_18%_0%,rgba(255,255,255,0.78),transparent_52%),radial-gradient(circle_at_82%_100%,rgba(183,152,111,0.2),transparent_50%)]" />
            <div className="pointer-events-none absolute inset-px rounded-[inherit] border border-white/45" />

            <motion.div
              aria-hidden
              className="pointer-events-none absolute -inset-y-14 left-[-70%] w-[64%] -translate-x-full rotate-12 bg-linear-to-r from-transparent via-white/75 to-transparent opacity-0 blur-xl mix-blend-screen"
              initial={prefersReducedMotion ? false : { x: "0%", opacity: 0 }}
              whileInView={
                prefersReducedMotion
                  ? undefined
                  : {
                      x: "280%",
                      opacity: [0, 0.8, 0],
                    }
              }
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1.25, ease: revealEase }}
            />

            <motion.div
              aria-hidden
              variants={hoverReflectionVariants}
              className="pointer-events-none absolute -inset-y-12 left-[-64%] w-[58%] rotate-12 bg-linear-to-r from-transparent via-white/90 to-transparent opacity-0 blur-lg mix-blend-screen"
            />

            <Link
              href="/reviews"
              className="relative z-10 block"
              aria-label={`Read more reviews by ${activeReview.name}`}
            >
              <span className="inline-flex rounded-full border border-[#d9ccb8] bg-white/45 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[#8e744e] backdrop-blur-sm">
                {activeReview.source}
              </span>
              <p className="mt-5 text-[16px] leading-relaxed text-[#453d34] sm:text-[17px]">
                &ldquo;{truncateQuote(activeReview.quote, excerptLength)}&rdquo;
              </p>
              <p className="mt-6 border-t border-[#d8cec0] pt-4 font-(--font-home-serif) text-[18px] uppercase tracking-[0.08em] text-[#ab9468]">
                {activeReview.name}
              </p>
            </Link>

            {showInlineArrows && reviews.length > 1 ? (
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: prefersReducedMotion ? 0.01 : 0.45, ease: revealEase }}
                className="absolute bottom-4 right-4 z-20 flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              >
                <button
                  type="button"
                  onClick={goToPrevious}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d5cab9] bg-white/70 text-[#6f634f] transition duration-300 hover:border-[#b6814b] hover:text-[#b6814b]"
                  aria-label="Previous review"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                    <path d="M15.7 5.3a1 1 0 0 1 0 1.4L10.4 12l5.3 5.3a1 1 0 1 1-1.4 1.4l-6-6a1 1 0 0 1 0-1.4l6-6a1 1 0 0 1 1.4 0z" fill="currentColor" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d5cab9] bg-white/70 text-[#6f634f] transition duration-300 hover:border-[#b6814b] hover:text-[#b6814b]"
                  aria-label="Next review"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                    <path d="M8.3 18.7a1 1 0 0 1 0-1.4l5.3-5.3-5.3-5.3a1 1 0 1 1 1.4-1.4l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 0 1-1.4 0z" fill="currentColor" />
                  </svg>
                </button>
              </motion.div>
            ) : null}
          </motion.article>
        </motion.div>
      </AnimatePresence>

      {showControls && reviews.length > 1 ? (
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {reviews.map((review, index) => (
              <button
                type="button"
                key={review.id}
                onClick={() => goToSlide(index)}
                aria-label={`Show review ${index + 1}`}
                aria-current={index === safeActiveIndex}
                className={
                  index === safeActiveIndex
                    ? "h-2.5 w-6 rounded-full bg-[#ab9468]"
                    : "h-2.5 w-2.5 rounded-full bg-[#cbc1b3] transition-colors hover:bg-[#bdaa8e]"
                }
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goToPrevious}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d5cab9] bg-white/70 text-[#6f634f] transition duration-300 hover:border-[#b6814b] hover:text-[#b6814b]"
              aria-label="Previous review"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                <path d="M15.7 5.3a1 1 0 0 1 0 1.4L10.4 12l5.3 5.3a1 1 0 1 1-1.4 1.4l-6-6a1 1 0 0 1 0-1.4l6-6a1 1 0 0 1 1.4 0z" fill="currentColor" />
              </svg>
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d5cab9] bg-white/70 text-[#6f634f] transition duration-300 hover:border-[#b6814b] hover:text-[#b6814b]"
              aria-label="Next review"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                <path d="M8.3 18.7a1 1 0 0 1 0-1.4l5.3-5.3-5.3-5.3a1 1 0 1 1 1.4-1.4l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 0 1-1.4 0z" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
