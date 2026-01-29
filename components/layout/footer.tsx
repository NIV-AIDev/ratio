import Link from "next/link";
import Container from "@/components/ui/container";

const footerLinks = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Careers", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200/60 bg-white">
      <Container className="flex flex-col gap-6 py-8 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-[0.35em] text-zinc-400">
            Ratio Interiors
          </span>
          <span className="text-[11px] uppercase tracking-[0.25em]">
            Placeholder studio footer copy.
          </span>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-col gap-3 text-xs uppercase tracking-[0.35em] sm:flex-row sm:items-center sm:gap-6">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <Link
                  className="transition-colors hover:text-zinc-800"
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
