import Link from "next/link";

const footerLinks = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Notes", href: "#" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200/70 bg-white/80">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <span className="uppercase tracking-[0.25em] text-zinc-400">
            Studio Ratio
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em]">
            Architecture & digital systems
          </span>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-col gap-3 text-xs uppercase tracking-[0.3em] sm:flex-row sm:items-center sm:gap-6">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <Link
                  className="transition-colors hover:text-zinc-700"
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
