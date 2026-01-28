import Link from "next/link";

const navLinks = [
  { label: "Overview", href: "#" },
  { label: "Services", href: "#" },
  { label: "Projects", href: "#" },
  { label: "Contact", href: "#" },
];

export default function SiteHeader() {
  return (
    <header className="border-b border-zinc-200/70 bg-white/80">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center justify-between">
          <Link
            className="text-sm font-semibold uppercase tracking-[0.35em] text-zinc-900"
            href="/"
          >
            Ratio
          </Link>
          <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 sm:hidden">
            Navigation
          </span>
        </div>
        <nav aria-label="Primary">
          <ul className="flex flex-col gap-3 text-xs uppercase tracking-[0.3em] text-zinc-600 sm:flex-row sm:items-center sm:gap-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  className="transition-colors hover:text-zinc-900"
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
