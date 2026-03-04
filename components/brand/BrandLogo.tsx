"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  variant?: "auto" | "light" | "dark";
  width?: number;
  priority?: boolean;
  className?: string;
};

const LOGO_SOURCES = {
  dark: "/images/brand/286.png",
  light: "/images/brand/y.png",
};

const LOGO_ASPECT_RATIOS = {
  dark: 353 / 706,
  light: 146 / 526,
} as const;

const LOGO_WIDTH_MULTIPLIER = {
  dark: 1.25,
  light: 1,
} as const;

export default function BrandLogo({
  variant = "auto",
  width,
  priority = false,
  className,
}: BrandLogoProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [autoVariant, setAutoVariant] = useState<"light" | "dark">("dark");
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 640px)");
    const update = () => setIsDesktop(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (variant !== "auto") {
      return;
    }

    const header = containerRef.current?.closest("header");
    if (!header) {
      return;
    }

    const resolveTheme = () =>
      header.getAttribute("data-theme") === "light" ? "light" : "dark";

    const syncTheme = () => {
      setAutoVariant(resolveTheme());
    };

    queueMicrotask(syncTheme);

    const observer = new MutationObserver(() => {
      setAutoVariant(resolveTheme());
    });

    observer.observe(header, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, [variant]);

  const resolvedVariant = variant === "auto" ? autoVariant : variant;
  const baseWidth = width ?? (isDesktop ? 272 : 206);
  const resolvedWidth = Math.round(baseWidth * LOGO_WIDTH_MULTIPLIER[resolvedVariant]);
  const resolvedHeight = Math.round(resolvedWidth * LOGO_ASPECT_RATIOS[resolvedVariant]);
  const src = resolvedVariant === "light" ? LOGO_SOURCES.light : LOGO_SOURCES.dark;

  return (
    <span ref={containerRef} className={cn("inline-flex items-center", className)}>
      <Image
        src={src}
        alt="The Ratio"
        width={resolvedWidth}
        height={resolvedHeight}
        priority={priority}
        className="h-auto"
      />
    </span>
  );
}
