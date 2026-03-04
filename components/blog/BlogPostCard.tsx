"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { BlogPost } from "@/lib/blog/posts";
import { formatBlogDate } from "@/lib/blog/posts";
import { cn } from "@/lib/utils";

type BlogPostCardProps = {
  post: BlogPost;
};

const hoverReflectionVariants = {
  rest: { opacity: 0, x: "-38%" },
  hover: {
    opacity: 0.62,
    x: "52%",
    transition: { duration: 0.62, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardHoverVariants = {
  rest: { y: 0, scale: 1 },
  hover: { y: -4, scale: 1.01 },
};

const accentByCategory = (category: string) => {
  const normalized = category.trim().toLowerCase();

  if (normalized.includes("planning")) {
    return "from-[#d6e0e8]/72 via-[#adc6d6]/42 to-transparent";
  }

  if (normalized.includes("construction")) {
    return "from-[#d8d6e8]/72 via-[#bab0da]/42 to-transparent";
  }

  return "from-[#e8d8be]/74 via-[#d6b88f]/45 to-transparent";
};

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const accentClass = accentByCategory(post.category);

  return (
    <motion.article
      variants={cardHoverVariants}
      initial="rest"
      whileHover={prefersReducedMotion ? undefined : "hover"}
      transition={{ duration: prefersReducedMotion ? 0.01 : 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="group relative isolate flex h-full flex-col overflow-hidden rounded-[24px] border border-white/60 bg-[linear-gradient(145deg,rgba(255,255,255,0.76),rgba(255,255,255,0.34)_50%,rgba(232,221,208,0.5))] p-6 shadow-[0_30px_68px_rgba(40,30,18,0.18),inset_0_1px_0_rgba(255,255,255,0.74)] backdrop-blur-xl sm:p-7"
    >
      <div
        className={cn(
          "pointer-events-none absolute -top-16 left-1/2 h-40 w-[135%] -translate-x-1/2 rounded-full bg-linear-to-b blur-2xl transition duration-700 group-hover:scale-110",
          accentClass,
        )}
      />

      <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_18%_0%,rgba(255,255,255,0.78),transparent_52%),radial-gradient(circle_at_82%_100%,rgba(183,152,111,0.2),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-[1px] rounded-[inherit] border border-white/45" />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-y-14 left-[-70%] w-[64%] -translate-x-full rotate-[12deg] bg-linear-to-r from-transparent via-white/75 to-transparent opacity-0 blur-xl mix-blend-screen"
        initial={prefersReducedMotion ? false : { x: "0%", opacity: 0 }}
        whileInView={
          prefersReducedMotion
            ? undefined
            : {
                x: "280%",
                opacity: [0, 0.8, 0],
              }
        }
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.div
        aria-hidden
        variants={hoverReflectionVariants}
        className="pointer-events-none absolute -inset-y-12 left-[-64%] w-[58%] rotate-[12deg] bg-linear-to-r from-transparent via-white/90 to-transparent opacity-0 blur-lg mix-blend-screen"
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#8a8178]">
          <span className="rounded-full border border-[#d9ccb8] bg-white/45 px-3 py-1 text-[#8e744e] backdrop-blur-sm">
            {post.category}
          </span>
          <span aria-hidden="true">•</span>
          <time dateTime={post.publishedOn}>{formatBlogDate(post.publishedOn)}</time>
          <span aria-hidden="true">•</span>
          <span>{post.readingTime}</span>
        </div>

        <h2 className="mt-5 font-(--font-home-serif) text-[1.65rem] leading-tight tracking-[0.03em] text-[#ab9468] transition-colors duration-300 motion-safe:group-hover:text-[#8f774f]">
          {post.title}
        </h2>

        <p className="mt-4 flex-1 text-[15px] leading-relaxed text-[#5c544d]">{post.excerpt}</p>

        <Link
          href={`/blog/${post.slug}`}
          className="mt-7 inline-flex w-fit border-b border-[#ab9468] pb-1 text-[11px] uppercase tracking-[0.24em] text-[#ab9468] transition-colors duration-300 hover:text-[#8c744c]"
        >
          Read article
        </Link>
      </div>
    </motion.article>
  );
}
