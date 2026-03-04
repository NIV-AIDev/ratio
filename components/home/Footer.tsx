"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { footerSocialLinks, SocialMediaIcon } from "@/components/navigation/social-media";
import Container from "@/components/ui/container";

const footerLinks = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Showroom", href: "/showroom" },
  { label: "BLOG", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];

const mobileFooterTabs = [
  { key: "company", label: "Company" },
  { key: "contact", label: "Contact" },
  { key: "social", label: "Social" },
] as const;

type MobileFooterTab = (typeof mobileFooterTabs)[number]["key"];

export default function Footer() {
  const [activeMobileTab, setActiveMobileTab] = useState<MobileFooterTab | null>(null);
  const mobileAccordionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!activeMobileTab) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!mobileAccordionRef.current) {
        return;
      }

      if (!mobileAccordionRef.current.contains(event.target as Node)) {
        setActiveMobileTab(null);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [activeMobileTab]);

  const renderMobileTabContent = (tabKey: MobileFooterTab) => {
    if (tabKey === "company") {
      return (
        <nav aria-label="Mobile footer company links" className="space-y-3 text-[11px] uppercase tracking-[0.26em] text-[#a9a097]">
          {footerLinks.map((link) => (
            <Link key={link.label} className="block transition-colors hover:text-white" href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      );
    }

    if (tabKey === "contact") {
      return (
        <div className="space-y-3 text-[11px] uppercase tracking-[0.24em] text-[#a9a097]">
          <a className="block transition-colors hover:text-white" href="tel:+447983996669">
            +44 7983 996669
          </a>
          <a className="block break-all transition-colors hover:text-white" href="mailto:Info@theratio.co.uk">
            Info@theratio.co.uk
          </a>
        </div>
      );
    }

    return (
      <div className="flex flex-wrap gap-3 text-[#a9a097]">
        {footerSocialLinks.map((link) => (
          <a
            key={link.platform}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            aria-label={link.platform}
            className="group inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-white/20 transition-colors hover:border-[#d8be94] hover:text-[#d8be94]"
          >
            <SocialMediaIcon platform={link.platform} className="h-full w-full scale-[1.2]" />
          </a>
        ))}
      </div>
    );
  };

  return (
    <footer className="bg-[#151515] text-[#d8d2c8]">
      <Container className="py-18">
        <div className="grid gap-12 border-b border-white/15 pb-12 md:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr]">
          <div className="space-y-6">
            <Link href="/" aria-label="Home" className="inline-flex">
              <Image
                src="/images/brand/y.png"
                alt="The Ratio"
                width={314}
                height={85}
                className="h-auto w-[210px] sm:w-[260px]"
              />
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-[#b2b2b2] sm:text-base">
              Luxury interior design studio and property developer delivering globally across private residences and
              super-prime addresses.
            </p>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#8e8f92]">
              The Ratio, Unit 9 Shield Drive Brentford TW8 9EX
            </p>

            <div ref={mobileAccordionRef} className="relative md:hidden">
              <div className="space-y-2">
                {mobileFooterTabs.map((tab) => {
                  const isActive = activeMobileTab === tab.key;

                  return (
                    <div
                      key={tab.key}
                      className="overflow-hidden rounded-2xl border border-white/16 bg-[#1b1a18]/70"
                    >
                      <button
                        type="button"
                        onClick={() => setActiveMobileTab((current) => (current === tab.key ? null : tab.key))}
                        className={
                          isActive
                            ? "flex w-full items-center justify-between px-4 py-3 text-[10px] uppercase tracking-[0.26em] text-[#d8be94]"
                            : "flex w-full items-center justify-between px-4 py-3 text-[10px] uppercase tracking-[0.26em] text-[#a39c92] transition-colors hover:text-white"
                        }
                        aria-expanded={isActive}
                        aria-controls={`footer-mobile-panel-${tab.key}`}
                      >
                        <span>{tab.label}</span>
                        <span
                          className={
                            isActive
                              ? "text-[#d8be94] transition-transform duration-300"
                              : "text-[#8f887f] transition-transform duration-300"
                          }
                          style={{ transform: `rotate(${isActive ? 180 : 0}deg)` }}
                          aria-hidden
                        >
                          ▾
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isActive ? (
                          <motion.div
                            id={`footer-mobile-panel-${tab.key}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden border-t border-white/12"
                          >
                            <div className="px-4 py-4">{renderMobileTabContent(tab.key)}</div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="hidden space-y-4 text-[11px] uppercase tracking-[0.28em] text-[#8e8f92] md:block">
            <p className="text-[#c3b39a]">Company</p>
            <nav aria-label="Footer company links" className="space-y-3">
              {footerLinks.map((link) => (
                <Link key={link.label} className="block transition-colors hover:text-white" href={link.href}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden space-y-4 text-[11px] uppercase tracking-[0.28em] text-[#8e8f92] md:block">
            <p className="text-[#c3b39a]">Contact</p>
            <div className="space-y-3">
              <a className="block transition-colors hover:text-white" href="tel:+447983996669">
                +44 7983 996669
              </a>
              <a className="block break-all transition-colors hover:text-white" href="mailto:Info@theratio.co.uk">
                Info@theratio.co.uk
              </a>
            </div>
            <div className="pt-2">
              <p className="text-[#c3b39a]">Social</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {footerSocialLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.platform}
                    className="group inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-white/20 transition-colors hover:border-[#d8be94] hover:text-[#d8be94]"
                  >
                    <SocialMediaIcon platform={link.platform} className="h-full w-full scale-[1.2]" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-8 text-[11px] uppercase tracking-[0.24em] text-[#76797e] sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 The Ratio.</span>
          <div className="flex flex-wrap gap-5">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
