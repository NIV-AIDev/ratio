import type { Metadata } from "next";
import BlogIndexClient from "@/components/blog/BlogIndexClient";
import JsonLd from "@/components/seo/json-ld";
import { blogCategories, blogPosts } from "@/lib/blog/posts";
import { buildLocalBusinessJsonLd, buildPageMetadata, siteConfig } from "@/lib/seo";

const pageTitle = "Blog";
const pageDescription =
  "Practical guidance on architecture, interior design, construction delivery, planning, materials, budgets, and timelines for high-end residential projects.";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/blog",
});

const sortedPosts = [...blogPosts].sort((a, b) => b.publishedOn.localeCompare(a.publishedOn));
const sortedCategories = [...blogCategories].sort((a, b) => a.localeCompare(b));

export default function BlogPage() {
  const localBusinessJsonLd = buildLocalBusinessJsonLd({
    name: siteConfig.name,
    description: pageDescription,
  });

  return (
    <>
      <JsonLd data={localBusinessJsonLd} id="json-ld-local-business" />

      <section className="bg-[#f6f3ef] pb-16 pt-30 sm:pb-18 sm:pt-34">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#8c857d]">Blog</p>
          <h1 className="mt-6 max-w-4xl font-(--font-home-serif) text-4xl leading-[1.08] tracking-[0.04em] text-[#ab9468] sm:text-5xl lg:text-6xl">
            Journal notes on planning, design precision, and construction delivery.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#5c544d] sm:text-lg">{pageDescription}</p>
        </div>
      </section>

      <BlogIndexClient posts={sortedPosts} categories={sortedCategories} />
    </>
  );
}
