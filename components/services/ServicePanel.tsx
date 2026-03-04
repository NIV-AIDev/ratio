"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { MotionValue } from "framer-motion";
import useRevealObserver from "@/components/animations/useRevealObserver";
import Container from "@/components/ui/container";
import type { ServicePanelItem } from "@/components/services/ScrollStackServices";

type ServicePanelProps = {
  item: ServicePanelItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
};

export default function ServicePanel({
  item,
  index,
  total,
  progress,
}: ServicePanelProps) {
  const prefersReducedMotion = useReducedMotion();
  const panelRef = useRef<HTMLElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useRevealObserver(panelRef, {
    threshold: 0.3,
    rootMargin: "0px 0px -10% 0px",
    once: true,
    staggerMs: 100,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 640px)");
    const update = () => setIsDesktop(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  const imageScaleMax = isDesktop ? 1.075 : 1.04;
  const imageUrl = isDesktop ? item.imageDesktop : item.imageMobile;
  const isLastPanel = index === total - 1;
  const initialOpacity = 1;
  const panelZIndex = total - index;
  const easedProgress = useSpring(progress, {
    stiffness: prefersReducedMotion ? 1000 : 140,
    damping: prefersReducedMotion ? 1000 : 27,
    mass: 0.36,
    restDelta: 0.0004,
  });

  const opacity = useTransform(easedProgress, [0, 0.2, 0.82, 1], [initialOpacity, 1, 1, isLastPanel ? 1 : 0]);
  const panelPointerEvents = useTransform(opacity, [0, 0.05, 1], ["none", "auto", "auto"]);
  const imageScale = useTransform(easedProgress, [0, 0.54, 1], [imageScaleMax, 1.02, 1]);
  const imageY = useTransform(easedProgress, [0, 1], [isDesktop ? -16 : -8, 0]);
  const overlayOpacity = useTransform(easedProgress, [0, 0.38, 1], [0.86, 0.64, 0.72]);
  const cueOpacity = useTransform(easedProgress, [0, 0.35], [1, 0]);

  return (
    <motion.section
      ref={panelRef}
      className="group/service sticky top-0 h-svh w-full overflow-hidden"
      style={{ opacity, zIndex: panelZIndex, pointerEvents: panelPointerEvents }}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url(${imageUrl})`,
          scale: prefersReducedMotion ? 1 : imageScale,
          y: prefersReducedMotion ? 0 : imageY,
        }}
      />
      <motion.div
        className="absolute inset-0 bg-linear-to-b from-black/40 via-black/70 to-black/90"
        style={{ opacity: overlayOpacity }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_20%_35%,rgba(214,186,145,0.16),transparent_70%),radial-gradient(72%_62%_at_78%_80%,rgba(85,93,112,0.2),transparent_74%)] opacity-85 transition-opacity duration-700 group-hover/service:opacity-100"
        aria-hidden
      />
      <Container className="relative z-10 flex h-full items-center pb-[calc(5rem+env(safe-area-inset-bottom))] pt-20 sm:items-end sm:pb-20 sm:pt-28">
        <div className="reveal-group max-w-xl space-y-6 text-white drop-shadow-[0_16px_40px_rgba(0,0,0,0.55)]">
          <div className="space-y-4">
            <p className="text-[11px] uppercase tracking-[0.45em] text-white/70">
              {item.label}
            </p>
            <h2 className="font-(--font-home-serif) text-4xl uppercase tracking-[0.08em] text-white sm:text-5xl lg:text-6xl">
              {item.title}
            </h2>
            <p className="text-base leading-relaxed text-white/80">
              {item.description}
            </p>
          </div>
          <ul className="reveal-group space-y-2 text-sm text-white/75">
            {item.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3">
                <span
                  className="mt-2 h-1.5 w-1.5 rounded-full bg-[#b6814b]"
                  aria-hidden
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={item.cta.href}
              className="group/cta inline-flex items-center justify-center gap-3 rounded-full border border-white/40 bg-white/94 px-6 py-3 text-[11px] uppercase tracking-[0.32em] text-[#6f5c3f] shadow-[0_12px_35px_rgba(0,0,0,0.2)] transition duration-500 hover:border-[#d6bd94] hover:bg-[#cdb188] hover:text-[#1f1810] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8be94]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0d0b]"
              style={{ clipPath: "polygon(5% 0, 95% 0, 100% 50%, 95% 100%, 5% 100%, 0 50%)" }}
            >
              <span>{item.cta.label}</span>
              <span
                aria-hidden
                className="text-base leading-none transition-transform duration-500 group-hover/cta:translate-x-1"
              >
                ›
              </span>
            </Link>
          </div>
        </div>
      </Container>
      {index === 0 && !prefersReducedMotion ? (
        <motion.div
          className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-white/70"
          style={{ opacity: cueOpacity }}
          aria-hidden
        >
          <span>Scroll</span>
          <span className="h-6 w-px bg-white/40" />
          <span className="h-2 w-2 rounded-full border border-white/50" />
        </motion.div>
      ) : null}
    </motion.section>
  );
}
