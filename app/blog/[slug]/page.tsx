import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/json-ld";
import { blogPosts, formatBlogDate, getBlogPostBySlug } from "@/lib/blog/posts";
import { buildPageMetadata, siteConfig } from "@/lib/seo";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return buildPageMetadata({
      title: "Blog",
      description: "Insights from The Ratio.",
      path: "/blog",
    });
  }

  return buildPageMetadata({
    title: `${post.title} | Blog`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedOn,
    dateModified: post.publishedOn,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
  };

  return (
    <>
      <JsonLd data={articleJsonLd} id="json-ld-blog-post" />

      <article className="bg-[#f6f3ef] pb-24 pt-30 sm:pb-28 sm:pt-34">
        <div className="mx-auto w-full max-w-4xl px-6">
          <Link
            href="/blog"
            className="inline-flex border-b border-[#ab9468] pb-1 text-[11px] uppercase tracking-[0.24em] text-[#ab9468] transition-colors hover:text-[#8c744c]"
          >
            Back to Blog
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#8a8178]">
            <span className="rounded-full border border-[#d9ccb8] bg-[#f8f3eb] px-3 py-1 text-[#8e744e]">{post.category}</span>
            <span aria-hidden="true">•</span>
            <time dateTime={post.publishedOn}>{formatBlogDate(post.publishedOn)}</time>
            <span aria-hidden="true">•</span>
            <span>{post.readingTime}</span>
          </div>

          <h1 className="mt-6 font-(--font-home-serif) text-4xl leading-[1.1] tracking-[0.04em] text-[#ab9468] sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[#5c544d]">{post.intro}</p>

          <div className="mt-12 space-y-12 rounded-[24px] border border-[#ddd3c6] bg-white p-7 sm:p-10">
            {post.sections.map((section) => (
              <section key={section.heading} className="space-y-4">
                <h2 className="font-(--font-home-serif) text-3xl leading-tight tracking-[0.03em] text-[#9d845c]">
                  {section.heading}
                </h2>

                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-[15px] leading-relaxed text-[#4e4741] sm:text-base">
                    {paragraph}
                  </p>
                ))}

                {section.bullets ? (
                  <ul className="space-y-2 pt-1 text-[15px] leading-relaxed text-[#4e4741] sm:text-base">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5">
                        <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#b39161]" aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            <section className="border-t border-[#e8ddd0] pt-8">
              <h2 className="font-(--font-home-serif) text-2xl tracking-[0.03em] text-[#9d845c]">Key takeaway</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[#4e4741] sm:text-base">{post.conclusion}</p>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
