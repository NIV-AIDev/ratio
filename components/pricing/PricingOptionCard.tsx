"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type PricingOptionCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  selected: boolean;
  onSelect: () => void;
  className?: string;
};

const hoverReflectionVariants = {
  rest: { opacity: 0, x: "-38%" },
  hover: {
    opacity: 0.58,
    x: "52%",
    transition: { duration: 0.62, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardHoverVariants = {
  rest: { y: 0, scale: 1 },
  hover: { y: -3, scale: 1.008 },
};

export default function PricingOptionCard({
  title,
  description,
  icon,
  selected,
  onSelect,
  className,
}: PricingOptionCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.button
      variants={cardHoverVariants}
      initial="rest"
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      whileHover={prefersReducedMotion ? undefined : "hover"}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
      transition={{ duration: prefersReducedMotion ? 0.01 : 0.24, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative isolate w-full overflow-hidden rounded-[24px] border bg-[linear-gradient(145deg,rgba(255,255,255,0.76),rgba(255,255,255,0.34)_50%,rgba(232,221,208,0.5))] px-5 py-5 text-left shadow-[0_20px_44px_rgba(40,30,18,0.12),inset_0_1px_0_rgba(255,255,255,0.74)] backdrop-blur-xl transition-colors duration-300",
        selected
          ? "border-[#ab9468]/75 shadow-[0_28px_64px_rgba(110,86,44,0.22),inset_0_1px_0_rgba(255,255,255,0.82)]"
          : "border-white/60 hover:border-[#c9b193]",
        className,
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute -top-16 left-1/2 h-40 w-[135%] -translate-x-1/2 rounded-full bg-linear-to-b blur-2xl transition duration-700 group-hover:scale-110",
          selected
            ? "from-[#e7cfa8]/75 via-[#c7aa81]/48 to-transparent opacity-88"
            : "from-[#e8d8be]/68 via-[#d6b88f]/38 to-transparent opacity-66",
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
                opacity: [0, 0.78, 0],
              }
        }
        viewport={{ once: false, amount: 0.35 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.div
        aria-hidden
        variants={hoverReflectionVariants}
        className="pointer-events-none absolute -inset-y-12 left-[-64%] w-[58%] rotate-[12deg] bg-linear-to-r from-transparent via-white/90 to-transparent opacity-0 blur-lg mix-blend-screen"
      />

      <div className="relative z-10 flex items-start gap-4">
        <span
          className={cn(
            "mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full border bg-white/42 backdrop-blur-sm transition-colors duration-300",
            selected
              ? "border-[#ab9468] bg-[#ab9468] text-white"
              : "border-[#d8c9b6] bg-[#f6f1ea] text-[#8e7860] group-hover:border-[#ab9468] group-hover:text-[#ab9468]",
          )}
        >
          {icon}
        </span>
        <div className="space-y-1">
          <p className="font-(--font-home-serif) text-xl uppercase tracking-[0.06em] text-[#2f2b27]">{title}</p>
          <p className="text-sm leading-relaxed text-[#675d52]">{description}</p>
        </div>
      </div>
    </motion.button>
  );
}
