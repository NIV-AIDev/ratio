import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type ServiceCard3DProps = {
  title: string;
  description: string;
  imageSrc: string;
  href?: string;
  ctaLabel?: string;
  className?: string;
};

export default function ServiceCard3D({
  title,
  description,
  imageSrc,
  href,
  ctaLabel = "View service",
  className,
}: ServiceCard3DProps) {
  const cardContent = (
    <div
      className={cn(
        "relative h-full overflow-hidden rounded-3xl border border-[#e7e2dc] bg-[#f6f3ef] shadow-[0_35px_70px_-55px_rgba(0,0,0,0.6)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:shadow-[0_45px_90px_-50px_rgba(0,0,0,0.7)] group-hover:transform-[translateY(-8px)_rotateX(7deg)_rotateY(-7deg)]",
        className,
      )}
    >
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(min-width: 640px) 320px, 280px"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/6 via-black/24 to-black/58" />
      </div>
      <div className="relative z-10 flex h-full flex-col justify-end gap-3 p-6 text-white">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-white/80">{description}</p>
        <span className="text-[11px] uppercase tracking-[0.3em] text-white/70">
          {ctaLabel}
        </span>
      </div>
    </div>
  );

  return (
    <div className="group w-[280px] shrink-0 sm:w-[320px]" style={{ perspective: "1200px" }}>
      {href ? (
        <Link href={href} className="block h-full">
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </div>
  );
}
