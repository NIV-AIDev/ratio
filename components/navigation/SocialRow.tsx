import Link from "next/link";
import { extendedSocialLinks, SocialMediaIcon } from "@/components/navigation/social-media";
import { cn } from "@/lib/utils";

type SocialRowProps = {
  className?: string;
};

function IconGlyph({ platform }: { platform: (typeof extendedSocialLinks)[number]["platform"] }) {
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 text-[10px] uppercase tracking-widest text-white/70 transition group-hover:border-[#b6814b] group-hover:text-[#b6814b]">
      <SocialMediaIcon platform={platform} className="h-4 w-4" />
    </span>
  );
}

export default function SocialRow({ className }: SocialRowProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-4", className)}>
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 text-[10px] text-white/60">
        ◦
      </span>
      <div className="flex flex-wrap items-center gap-3">
        {extendedSocialLinks.map((link) => (
          <Link
            key={link.platform}
            href={link.href}
            className="group"
            aria-label={link.platform}
            target="_blank"
            rel="noreferrer"
          >
            <IconGlyph platform={link.platform} />
          </Link>
        ))}
      </div>
    </div>
  );
}
