"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type MenuToggleProps = {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
};

export default function MenuToggle({ isOpen, onClick, className }: MenuToggleProps) {
  const prefersReducedMotion = useReducedMotion();
  const transition = {
    duration: prefersReducedMotion ? 0.01 : 0.45,
    ease: [0.22, 1, 0.36, 1],
  };

  return (
    <button
      type="button"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      onClick={onClick}
      className={cn(
        "group inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.45em] text-[#1a1a18]",
        className,
      )}
    >
      <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
      <span>{isOpen ? "CLOSE" : "MENU"}</span>
      <span className="relative h-4 w-6">
        <motion.span
          className="absolute left-0 top-1/2 h-px w-full bg-[#1a1a18]"
          animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
          transition={transition}
        />
        <motion.span
          className="absolute left-0 top-1/2 h-px w-full bg-[#1a1a18]"
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={transition}
        />
        <motion.span
          className="absolute left-0 top-1/2 h-px w-full bg-[#1a1a18]"
          animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
          transition={transition}
        />
      </span>
    </button>
  );
}
