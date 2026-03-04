"use client";

import { RefObject, useEffect } from "react";

type UseRevealObserverOptions = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  staggerMs?: number;
};

const DEFAULT_THRESHOLD = 0.3;
const DEFAULT_ROOT_MARGIN = "0px 0px -10% 0px";
const DEFAULT_STAGGER_MS = 100;

export default function useRevealObserver(
  scopeRef: RefObject<HTMLElement | null>,
  options?: UseRevealObserverOptions,
) {
  const threshold = options?.threshold ?? DEFAULT_THRESHOLD;
  const rootMargin = options?.rootMargin ?? DEFAULT_ROOT_MARGIN;
  const once = options?.once ?? true;
  const staggerMs = options?.staggerMs ?? DEFAULT_STAGGER_MS;

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) {
      return;
    }

    const revealGroups = Array.from(scope.querySelectorAll<HTMLElement>(".reveal-group"));
    revealGroups.forEach((group) => {
      Array.from(group.children).forEach((child, index) => {
        if (!(child instanceof HTMLElement)) {
          return;
        }

        child.classList.add("reveal");
        child.style.setProperty("--reveal-delay", `${index * staggerMs}ms`);
      });
    });

    const revealNodes = Array.from(scope.querySelectorAll<HTMLElement>(".reveal"));
    if (revealNodes.length === 0) {
      return;
    }

    const shouldReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (shouldReduceMotion) {
      revealNodes.forEach((node) => {
        node.classList.add("active");
      });
      return;
    }

    revealNodes.forEach((node) => {
      if (!node.style.getPropertyValue("--reveal-delay")) {
        node.style.setProperty("--reveal-delay", "0ms");
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || entry.intersectionRatio < threshold) {
            return;
          }

          const target = entry.target as HTMLElement;
          target.classList.add("active");

          if (once) {
            observer.unobserve(target);
          }
        });
      },
      {
        threshold,
        rootMargin,
      },
    );

    revealNodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [once, rootMargin, scopeRef, staggerMs, threshold]);
}
