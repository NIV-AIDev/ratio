"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import ServicePanel from "@/components/services/ServicePanel";

export type ServicePanelItem = {
  label: string;
  title: string;
  description: string;
  bullets: string[];
  imageDesktop: string;
  imageMobile: string;
  cta: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
};

type ScrollStackServicesProps = {
  services: ServicePanelItem[];
};

type ServicePanelWithProgressProps = {
  item: ServicePanelItem;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
};

function ServicePanelWithProgress({
  item,
  index,
  total,
  scrollYProgress,
}: ServicePanelWithProgressProps) {
  const stackSpan = total;
  const start = index / stackSpan;
  const end = (index + 1) / stackSpan;
  const progress = useTransform(scrollYProgress, [start, end], [0, 1]);

  return (
    <ServicePanel
      item={item}
      index={index}
      total={total}
      progress={progress}
    />
  );
}

export default function ScrollStackServices({ services }: ScrollStackServicesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "smooth";

    return () => {
      root.style.scrollBehavior = previousScrollBehavior;
    };
  }, [prefersReducedMotion]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: prefersReducedMotion ? 1000 : 108,
    damping: prefersReducedMotion ? 1000 : 28,
    mass: 0.46,
    restDelta: 0.00045,
  });

  return (
    <section id="services-stack" className="relative isolate overflow-hidden bg-[#0f0d0b]" aria-label="Services">
      <div
        ref={containerRef}
        className="relative"
        style={{ height: `${services.length * 100}vh` }}
      >
        {services.map((service, index) => (
          <ServicePanelWithProgress
            key={service.title}
            item={service}
            index={index}
            total={services.length}
            scrollYProgress={smoothScrollProgress}
          />
        ))}
      </div>
    </section>
  );
}
