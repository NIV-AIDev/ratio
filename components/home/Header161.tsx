"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import BrandLogo from "@/components/brand/BrandLogo";
import MenuPanel161 from "@/components/home/MenuPanel161";

export default function Header161() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const forceLightTheme =
    pathname === "/about" ||
    pathname === "/service" ||
    pathname === "/services" ||
    pathname.startsWith("/projects") ||
    pathname.startsWith("/blog");
  const isLightTheme = isScrolled || forceLightTheme;
  const foregroundClass = isLightTheme ? "text-[#545960]" : "text-white";
  const hoverClass = "group-hover:text-[#ab9468]";

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const lineTransition = {
    duration: prefersReducedMotion ? 0.01 : 0.45,
    ease: [0.16, 1, 0.3, 1],
  };

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") {
      return;
    }

    event.preventDefault();
    setIsOpen(false);
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <>
      <header
        data-theme={isLightTheme ? "light" : "dark"}
        className="fixed inset-x-0 top-0 z-60 h-[86px] border-b transition-colors duration-300 ease-in-out"
        style={{
          borderColor: isLightTheme ? "rgba(112, 113, 115, 0.22)" : "transparent",
          backgroundColor: isLightTheme ? "rgba(246, 243, 239, 0.92)" : "transparent",
          backdropFilter: isLightTheme ? "blur(4px)" : "none",
        }}
      >
        <div className="mx-auto flex h-full w-full max-w-[1280px] items-center px-8 lg:px-12">
          <div className="w-[48px] sm:w-[120px] md:w-[220px] lg:w-[350px]">
            <button
              type="button"
              onClick={() => setIsOpen((current) => !current)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="group inline-flex items-center gap-4"
            >
              <span className="relative inline-flex h-[15px] w-[30px] flex-col justify-between">
                <motion.span
                  className={isLightTheme ? "block h-px w-full bg-[#545960]" : "block h-px w-full bg-white"}
                  animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  transition={lineTransition}
                />
                <motion.span
                  className={isLightTheme ? "block h-px w-full bg-[#545960]" : "block h-px w-full bg-white"}
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={lineTransition}
                />
                <motion.span
                  className={isLightTheme ? "block h-px w-full bg-[#545960]" : "block h-px w-full bg-white"}
                  animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  transition={lineTransition}
                />
              </span>
              <span
                className={`hidden text-base font-medium uppercase tracking-[0.16em] transition-colors duration-300 lg:inline ${foregroundClass} ${hoverClass}`}
              >
                {isOpen ? "Close" : "Menu"}
              </span>
            </button>
          </div>

          <div className="flex flex-1 justify-center">
            <Link
              href="/"
              aria-label="Home"
              onClick={handleLogoClick}
              className={`flex w-[206px] items-center justify-center sm:w-[272px] sm:translate-y-[6px] ${
                isScrolled ? "lg:pb-[2%]" : ""
              }`}
            >
              <BrandLogo variant={isLightTheme ? "dark" : "light"} priority />
            </Link>
          </div>

          <div className="flex w-[48px] justify-end sm:w-[120px] md:w-[220px] lg:w-[350px]">
            <Link
              href="/contact"
              className={`hidden text-base font-light uppercase tracking-widest transition-colors duration-300 hover:text-[#ab9468] md:inline ${foregroundClass}`}
            >
              Get In Touch
            </Link>
            <Link
              href="/contact"
              aria-label="Get in touch"
              className={`inline-flex h-8 w-8 items-center justify-center md:hidden ${foregroundClass}`}
            >
              +
            </Link>
          </div>
        </div>
      </header>

      <MenuPanel161 isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
