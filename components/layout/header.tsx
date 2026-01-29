"use client";

import Link from "next/link";
import Container from "@/components/ui/container";
import { trackEvent } from "@/lib/analytics";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  return (
    <header className="border-b border-zinc-200/60 bg-white">
      <Container className="flex flex-col gap-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center justify-between">
          <Link
            className="text-sm font-semibold uppercase tracking-[0.4em] text-zinc-900"
            href="/"
          >
            Ratio Interiors
          </Link>
          <span className="text-xs uppercase tracking-[0.3em] text-zinc-400 sm:hidden">
            Menu
          </span>
        </div>
        <nav aria-label="Primary">
          <ul className="flex flex-col gap-3 text-xs uppercase tracking-[0.35em] text-zinc-500 sm:flex-row sm:items-center sm:gap-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  className="transition-colors hover:text-zinc-900"
                  href={link.href}
                  onClick={() =>
                    trackEvent({
                      event: "navigation_click",
                      label: link.label,
                      href: link.href,
                    })
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
