"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReviewEntry } from "./reviewsData";

type ReviewCardProps = {
  review: ReviewEntry;
  expanded?: boolean;
  onToggleExpand?: () => void;
  prefersReducedMotion?: boolean;
  variant?: "default" | "featured";
};

const primaryButtonClass =
  "inline-flex items-center justify-center rounded-full bg-[#b6814b] px-7 py-3 text-[11px] uppercase tracking-[0.32em] text-[#1a1a18] transition duration-300 hover:-translate-y-0.5 hover:bg-[#9c6b3f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b6814b]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f3ef]";

const platformAccentClass: Record<ReviewEntry["platform"], string> = {
  Google: "from-[#d6e0e8]/72 via-[#adc6d6]/44 to-transparent",
  Houzz: "from-[#e8d8be]/74 via-[#d6b88f]/45 to-transparent",
};

const hoverReflectionVariants = {
  rest: { opacity: 0, x: "-38%" },
  hover: {
    opacity: 0.62,
    x: "52%",
    transition: { duration: 0.62, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardHoverVariants = {
  rest: { y: 0 },
  hover: { y: -4 },
};

export default function ReviewCard({
  review,
  expanded = false,
  onToggleExpand,
  prefersReducedMotion = false,
  variant = "default",
}: ReviewCardProps) {
  const canToggleExpand = Boolean(onToggleExpand) && review.review.length > 220;
  const copy = canToggleExpand && !expanded ? `${review.review.slice(0, 220).trimEnd()}...` : review.review;
  const accentClass = platformAccentClass[review.platform];

  return (
    <motion.article
      variants={cardHoverVariants}
      initial="rest"
      whileHover={prefersReducedMotion ? undefined : "hover"}
      transition={{ duration: prefersReducedMotion ? 0.01 : 0.28, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative isolate h-full overflow-hidden border border-white/60 bg-[linear-gradient(145deg,rgba(255,255,255,0.76),rgba(255,255,255,0.34)_50%,rgba(232,221,208,0.5))] p-6 shadow-[0_30px_68px_rgba(40,30,18,0.18),inset_0_1px_0_rgba(255,255,255,0.74)] backdrop-blur-xl sm:p-7",
        variant === "featured"
          ? "rounded-[28px] border-[#f2e6d8] shadow-[0_34px_80px_rgba(40,30,18,0.24),inset_0_1px_0_rgba(255,255,255,0.8)]"
          : "rounded-[24px]",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute -top-16 left-1/2 h-40 w-[135%] -translate-x-1/2 rounded-full bg-linear-to-b blur-2xl transition duration-700 group-hover:scale-110",
          accentClass,
          variant === "featured" ? "opacity-90" : "opacity-72",
        )}
      />

      <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_18%_0%,rgba(255,255,255,0.78),transparent_52%),radial-gradient(circle_at_82%_100%,rgba(183,152,111,0.2),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-[1px] rounded-[inherit] border border-white/45" />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-y-14 left-[-70%] w-[64%] -translate-x-full rotate-[12deg] bg-linear-to-r from-transparent via-white/75 to-transparent opacity-0 blur-xl mix-blend-screen"
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
        transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.div
        aria-hidden
        variants={hoverReflectionVariants}
        className="pointer-events-none absolute -inset-y-12 left-[-64%] w-[58%] rotate-[12deg] bg-linear-to-r from-transparent via-white/90 to-transparent opacity-0 blur-lg mix-blend-screen"
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src={review.avatarSrc}
              alt={`Portrait placeholder for ${review.name}`}
              width={52}
              height={52}
              className="h-[52px] w-[52px] rounded-full border border-[#d5c9b6] object-cover"
            />
            <div>
              <p className="text-[11px] uppercase tracking-[0.26em] text-[#8a7963]">{review.dateLabel}</p>
              <h3 className="mt-1 text-[16px] font-semibold uppercase tracking-[0.08em] text-[#2c241b]">{review.name}</h3>
            </div>
          </div>

          <span className="rounded-full border border-[#e3d8c8] bg-white/45 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[#7a6b58] backdrop-blur-sm">
            {review.platform}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-1.5" aria-label={`${review.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, index) => (
            <span
              key={`${review.id}-star-${index}`}
              className={cn(
                "text-sm leading-none",
                index < review.rating ? "text-[#b6814b]" : "text-[#d8ccbd]",
              )}
              aria-hidden
            >
              ★
            </span>
          ))}
        </div>

        <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-[#8f7f6a]">
          {review.projectType} · {review.location}
        </p>

        <p className="mt-4 text-sm leading-relaxed text-[#453d34] sm:text-[15px]">{copy}</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {canToggleExpand ? (
            <button
              type="button"
              onClick={onToggleExpand}
              className="text-[11px] uppercase tracking-[0.28em] text-[#7b6b56] transition-colors hover:text-[#463a2c]"
            >
              {expanded ? "Less" : "More"}
            </button>
          ) : null}

          <Link href="/contact" className={primaryButtonClass}>
            Enquire now
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
