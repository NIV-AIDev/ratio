"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import BrandLogo from "@/components/brand/BrandLogo";
import MenuToggle from "@/components/navigation/MenuToggle";
import SideMenu from "@/components/navigation/SideMenu";
import Container from "@/components/ui/container";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const theme = isScrolled ? "light" : "dark";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;

      setIsScrolled(currentScrollY > 16);
      if (isScrollingDown && currentScrollY > 120) {
        setIsHidden(true);
      } else if (!isScrollingDown || currentScrollY < 80) {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        data-theme={theme}
        className={cn(
          "sticky top-0 z-50 border-b transition-all duration-500 ease-out",
          isScrolled
            ? "border-[#e7e2dc] bg-[#f6f3ef]/90 backdrop-blur"
            : "border-transparent bg-[#f6f3ef]",
          isHidden ? "opacity-0 pointer-events-none" : "opacity-100",
        )}
      >
        <Container className="flex items-center justify-between py-5">
          <Link
            className="inline-flex items-center"
            href="/"
            onClick={() =>
              trackEvent({
                event: "navigation_click",
                label: "Home",
                href: "/",
              })
            }
          >
            <BrandLogo variant="auto" priority />
          </Link>
          <MenuToggle
            isOpen={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          />
        </Container>
      </header>
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
