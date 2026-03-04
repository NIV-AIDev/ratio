import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type NavLinksProps = {
  onNavigate?: () => void;
  className?: string;
  listVariants?: Variants;
  itemVariants?: {
    hidden: { opacity: number; y: number };
    visible: { opacity: number; y: number; transition: { duration: number; ease: number[] } };
    exit: { opacity: number; transition: { duration: number } };
  };
};

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Process", href: "/about#process" },
  { label: "Contact", href: "/contact" },
];

export default function NavLinks({
  onNavigate,
  className,
  listVariants,
  itemVariants,
}: NavLinksProps) {
  const pathname = usePathname();

  return (
    <motion.ul
      className={cn("space-y-6 sm:space-y-7", className)}
      variants={listVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {navLinks.map((link) => {
        const targetPath = link.href.split("#")[0];
        const isServicesLink = targetPath === "/services";
        const isActive = isServicesLink
          ? pathname === "/services" || pathname.startsWith("/services/")
          : pathname === targetPath;
        return (
          <motion.li key={link.label} variants={itemVariants}>
            <Link
              href={link.href}
              onClick={onNavigate}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "group inline-flex items-center gap-4 py-1 text-white/85 transition hover:text-[#b6814b]",
                isActive && "text-[#b6814b]",
              )}
            >
              <span
                className={cn(
                  "h-px w-8 bg-white/30 transition group-hover:bg-[#b6814b]",
                  isActive && "bg-[#b6814b]",
                )}
              />
              <span>{link.label}</span>
            </Link>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
