"use client";

import { useMemo, useState } from "react";
import BlogPostCard from "@/components/blog/BlogPostCard";
import type { BlogPost } from "@/lib/blog/posts";
import { cn } from "@/lib/utils";

type BlogIndexClientProps = {
  posts: BlogPost[];
  categories: string[];
};

const ALL_CATEGORY = "All";

export default function BlogIndexClient({ posts, categories }: BlogIndexClientProps) {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
  const [searchQuery, setSearchQuery] = useState("");

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = activeCategory === ALL_CATEGORY || post.category === activeCategory;

      const searchableContent = [
        post.title,
        post.excerpt,
        post.category,
        post.intro,
        post.searchTerms.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = normalizedQuery.length === 0 || searchableContent.includes(normalizedQuery);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, normalizedQuery, posts]);

  return (
    <section className="bg-[#f6f3ef] pb-24 sm:pb-28">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="rounded-[24px] border border-[#ddd3c6] bg-white/70 p-6 sm:p-8">
          <div className="flex flex-col gap-5">
            <label htmlFor="blog-search" className="text-[11px] uppercase tracking-[0.28em] text-[#8c857d]">
              Search articles
            </label>
            <input
              id="blog-search"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search architecture, budgeting, timelines..."
              className="w-full rounded-full border border-[#d8ccb9] bg-white px-5 py-3 text-sm text-[#3f3a35] outline-none transition focus:border-[#ab9468]"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {[ALL_CATEGORY, ...categories].map((category) => {
              const isActive = category === activeCategory;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.24em] transition",
                    isActive
                      ? "border-[#ab9468] bg-[#ab9468] text-white"
                      : "border-[#d7ccbc] bg-[#f8f3eb] text-[#7a6c5b] hover:border-[#bca889] hover:text-[#8a7759]",
                  )}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-8 text-[11px] uppercase tracking-[0.28em] text-[#8c857d]">
          {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
        </p>

        {filteredPosts.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-[22px] border border-dashed border-[#d8cdbd] bg-white p-8 text-center text-[#6a6259]">
            <p className="font-(--font-home-serif) text-2xl tracking-[0.03em] text-[#9d845c]">No matching articles</p>
            <p className="mt-3 text-sm leading-relaxed">
              Try a different keyword or clear filters to explore all planning and design guidance.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
