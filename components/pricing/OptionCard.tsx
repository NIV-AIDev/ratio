"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type OptionCardProps = {
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
  mediaSrc?: string;
  mediaAlt?: string;
  icon?: ReactNode;
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
  hover: { y: -4, scale: 1.01 },
};

export default function OptionCard({
  title,
  description,
  selected,
  onSelect,
  mediaSrc,
  mediaAlt,
  icon,
}: OptionCardProps) {
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
      transition={{ duration: prefersReducedMotion ? 0.01 : 0.24, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative isolate overflow-hidden rounded-[24px] border bg-[linear-gradient(145deg,rgba(255,255,255,0.76),rgba(255,255,255,0.34)_50%,rgba(232,221,208,0.5))] text-left shadow-[0_24px_56px_rgba(40,30,18,0.14),inset_0_1px_0_rgba(255,255,255,0.74)] backdrop-blur-xl transition-shadow duration-300",
        selected
          ? "border-[#ab9468]/75 shadow-[0_30px_70px_rgba(110,86,44,0.24),inset_0_1px_0_rgba(255,255,255,0.82)]"
          : "border-white/60 hover:border-[#cdb89d]",
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

      {mediaSrc ? (
        <div className="relative z-10 h-40 w-full overflow-hidden">
          {/* TODO: replace with licensed Ratio imagery. */}
          <Image
            src={mediaSrc}
            alt={mediaAlt ?? title}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/15 to-transparent" />
          <div className="absolute bottom-3 left-3 text-white">
            <p className="font-(--font-home-serif) text-lg uppercase tracking-[0.08em]">{title}</p>
          </div>
        </div>
      ) : null}

      <div className={cn("relative z-10 space-y-3 p-4", mediaSrc ? "pt-4" : "pt-5")}>
        {!mediaSrc ? (
          <div className="flex items-center gap-3">
            {icon ? (
              <span
                className={cn(
                  "inline-flex h-10 w-10 items-center justify-center rounded-full border bg-white/42 backdrop-blur-sm transition-all duration-300 [&>svg]:h-6 [&>svg]:w-6",
                  selected
                    ? "scale-[1.03] border-[#ab9468] bg-[#ab9468] text-white"
                    : "border-[#d9ccb8] bg-[#f6f0e8] text-[#8e7a60] group-hover:scale-[1.03] group-hover:border-[#ab9468] group-hover:text-[#ab9468]",
                )}
              >
                {icon}
              </span>
            ) : null}
            <p className="font-(--font-home-serif) text-xl uppercase tracking-[0.06em] text-[#2f2b27]">{title}</p>
          </div>
        ) : null}

        <p className="text-sm leading-relaxed text-[#61574a]">{description}</p>

        <span
          className={cn(
            "block h-px w-14 transition-all duration-300",
            selected ? "w-24 bg-[#ab9468]" : "bg-[#ccbda7] group-hover:w-24",
          )}
        />
      </div>
    </motion.button>
  );
}
