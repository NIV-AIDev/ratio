"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import NavLinks from "@/components/navigation/NavLinks";
import SocialRow from "@/components/navigation/SocialRow";
import { cn } from "@/lib/utils";

type SideMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
};

export default function SideMenu({ isOpen, onClose, className }: SideMenuProps) {
  const prefersReducedMotion = useReducedMotion();
  const luxuryEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: prefersReducedMotion ? 0.01 : 0.3, ease: luxuryEase },
    },
    exit: { opacity: 0, transition: { duration: prefersReducedMotion ? 0.01 : 0.2 } },
  };

  const panelVariants = {
    hidden: { x: prefersReducedMotion ? 0 : "-100%" },
    visible: {
      x: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.8,
        ease: luxuryEase,
      },
    },
    exit: {
      x: prefersReducedMotion ? 0 : "-100%",
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.55,
        ease: luxuryEase,
      },
    },
  };

  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
        delayChildren: prefersReducedMotion ? 0 : 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.5,
        ease: luxuryEase,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: prefersReducedMotion ? 0.01 : 0.2 },
    },
  };

  const socialVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.45,
        delay: prefersReducedMotion ? 0 : 0.5,
        ease: luxuryEase,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: prefersReducedMotion ? 0.01 : 0.2 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className={cn("fixed inset-0 z-50", className)}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-black/55 backdrop-blur-lg"
            variants={overlayVariants}
            onClick={onClose}
            aria-label="Close menu"
          />
          <motion.aside
            className="relative flex h-full w-full flex-col bg-[#0a0908]/88 px-8 pb-[calc(4rem+env(safe-area-inset-bottom))] pt-18 text-white backdrop-blur-2xl sm:w-[68vw] sm:px-16 sm:pt-20 lg:px-20"
            variants={panelVariants}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div className="pointer-events-none absolute left-0 top-[calc(50%+3.5rem+env(safe-area-inset-bottom))] -translate-x-1/2 -translate-y-1/2 -rotate-90 text-[11px] uppercase tracking-[0.32em] text-white/40 sm:top-1/2">
              Your true design & build partners
            </div>
            <div className="flex h-full flex-col gap-12">
              <div className="flex flex-1 flex-col justify-center gap-10 pt-4 sm:-mt-4">
                <p className="text-[11px] uppercase tracking-[0.45em] text-white/60">Menu</p>
                <NavLinks
                  onNavigate={onClose}
                  listVariants={listVariants}
                  itemVariants={itemVariants}
                  className="text-2xl uppercase leading-[1.1] tracking-[0.3em] sm:text-4xl"
                />
              </div>
              <motion.div
                className="space-y-6"
                variants={socialVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <SocialRow />
              </motion.div>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
