"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { footerSocialLinks, SocialMediaIcon } from "@/components/navigation/social-media";

type MenuPanel161Props = {
  isOpen: boolean;
  onClose: () => void;
};

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Showroom", href: "/showroom" },
  { label: "Pricing", href: "/pricing" },
  { label: "Reviews", href: "/reviews" },
  { label: "BLOG", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function MenuPanel161({ isOpen, onClose }: MenuPanel161Props) {
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();
  const luxuryEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-70"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  duration: prefersReducedMotion ? 0.01 : 0.15,
                  ease: "easeOut",
                },
              },
              exit: {
                opacity: 0,
                transition: {
                  duration: prefersReducedMotion ? 0.01 : 0.15,
                  ease: "easeIn",
                },
              },
            }}
          />

          <motion.aside
            className="fixed left-0 top-0 flex h-screen w-full max-w-full flex-col overflow-y-auto border-r border-white/10 bg-[rgba(20,20,20,0.3)] px-10 pb-10 pt-24 text-white backdrop-blur-[20px] sm:max-w-lg md:px-16"
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
            variants={{
              hidden: { x: prefersReducedMotion ? 0 : "-100%" },
              visible: {
                x: 0,
                transition: {
                  duration: prefersReducedMotion ? 0.01 : 0.55,
                  ease: luxuryEase,
                },
              },
              exit: {
                x: prefersReducedMotion ? 0 : "-100%",
                transition: {
                  duration: prefersReducedMotion ? 0.01 : 0.45,
                  ease: luxuryEase,
                },
              },
            }}
          >
            <div className="relative flex h-full flex-col">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close side menu"
                className="absolute right-0 top-0 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/24 bg-black/25 text-white/78 transition-colors hover:border-[#d7bf96] hover:text-[#d7bf96]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                  <path
                    d="M6.7 5.3 12 10.6l5.3-5.3 1.4 1.4-5.3 5.3 5.3 5.3-1.4 1.4-5.3-5.3-5.3 5.3-1.4-1.4 5.3-5.3-5.3-5.3z"
                    fill="currentColor"
                  />
                </svg>
              </button>

              <nav aria-label="Primary" className="flex-1">
                <motion.ul
                  className="space-y-5"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: prefersReducedMotion ? 0 : 0.07,
                        delayChildren: prefersReducedMotion ? 0 : 0.12,
                      },
                    },
                    exit: {
                      transition: {
                        staggerChildren: prefersReducedMotion ? 0 : 0.04,
                        staggerDirection: -1,
                      },
                    },
                  }}
                >
                  {navLinks.map((link) => {
                    const targetPath = link.href.split("#")[0];
                    const isActive =
                      pathname === targetPath ||
                      (targetPath !== "/" && pathname.startsWith(`${targetPath}/`));

                    return (
                      <motion.li
                        key={link.label}
                        variants={{
                          hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 18 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                              duration: prefersReducedMotion ? 0.01 : 0.45,
                              ease: luxuryEase,
                            },
                          },
                          exit: {
                            opacity: 0,
                            y: prefersReducedMotion ? 0 : 12,
                            transition: {
                              duration: prefersReducedMotion ? 0.01 : 0.2,
                              ease: "easeIn",
                            },
                          },
                        }}
                      >
                        <Link
                          href={link.href}
                          onClick={onClose}
                          aria-current={isActive ? "page" : undefined}
                          className={`inline-block font-(--font-home-serif) text-[20px] uppercase tracking-widest transition-colors duration-500 ease-in-out md:text-[24px] ${
                            isActive ? "text-[#ab9468]" : "text-white hover:text-[#ab9468]"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </nav>

              <motion.div
                className="mt-12"
                variants={{
                  hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 8 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: prefersReducedMotion ? 0.01 : 0.4,
                      delay: prefersReducedMotion ? 0 : 0.4,
                    },
                  },
                  exit: {
                    opacity: 0,
                    transition: { duration: prefersReducedMotion ? 0.01 : 0.15 },
                  },
                }}
              >
                
                <div className="flex flex-wrap gap-3 text-[#6f7176]">
                  {footerSocialLinks.map((link) => (
                    <a
                      key={link.platform}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={link.platform}
                      className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/24 transition-colors hover:border-[#d7bf96] hover:text-[#d7bf96]"
                    >
                      <SocialMediaIcon platform={link.platform} className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </motion.div>

              <p className="mt-10 text-[11px] uppercase tracking-[0.28em] text-[#6f7176]">
                Your True Design & Build Partners
              </p>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
