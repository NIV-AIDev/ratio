"use client";

import { useMemo, useState, type ChangeEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/container";
import ReviewCard from "./ReviewCard";
import { reviewsData, type ReviewEntry, type ReviewPlatform } from "./reviewsData";

type SortMode = "recent" | "oldest" | "rating";

const revealEase: [number, number, number, number] = [0.16, 1, 0.3, 1];
const INITIAL_VISIBLE_COUNT = 10;
const LOAD_STEP = 6;

const platformOptions: Array<"All" | ReviewPlatform> = ["All", "Google", "Houzz"];

const sortLabelByMode: Record<SortMode, string> = {
  recent: "Recent first",
  oldest: "Oldest first",
  rating: "Highest rating",
};

const sortReviews = (items: ReviewEntry[], mode: SortMode) => {
  const cloned = [...items];

  if (mode === "rating") {
    cloned.sort((a, b) => {
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      return new Date(b.dateIso).getTime() - new Date(a.dateIso).getTime();
    });
    return cloned;
  }

  cloned.sort((a, b) => {
    const delta = new Date(b.dateIso).getTime() - new Date(a.dateIso).getTime();
    return mode === "recent" ? delta : -delta;
  });

  return cloned;
};

export default function ReviewsCarousel() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [platformFilter, setPlatformFilter] = useState<"All" | ReviewPlatform>("All");
  const [sortMode, setSortMode] = useState<SortMode>("recent");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [expandedById, setExpandedById] = useState<Record<string, boolean>>({});

  const sortedBase = useMemo(() => sortReviews(reviewsData, sortMode), [sortMode]);

  const featuredReview = sortedBase[0] ?? null;

  const filteredReviews = useMemo(() => {
    const withoutFeatured = sortedBase.slice(1);
    if (platformFilter === "All") {
      return withoutFeatured;
    }
    return withoutFeatured.filter((review) => review.platform === platformFilter);
  }, [platformFilter, sortedBase]);

  const visibleReviews = filteredReviews.slice(0, visibleCount);
  const hasMoreReviews = visibleCount < filteredReviews.length;

  const handleLoadMore = () => {
    setVisibleCount((current) => Math.min(current + LOAD_STEP, filteredReviews.length));
  };

  const handlePlatformChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPlatformFilter(event.target.value as "All" | ReviewPlatform);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortMode(event.target.value as SortMode);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const toggleExpanded = (reviewId: string) => {
    setExpandedById((current) => ({
      ...current,
      [reviewId]: !current[reviewId],
    }));
  };

  return (
    <>
      <section className="relative overflow-hidden bg-[#f6f3ef] pb-8 sm:pb-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(232,216,190,0.22),transparent_58%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(170,187,209,0.16),transparent_58%)]" />
        <Container>
          {featuredReview ? (
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.28 }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.7, ease: revealEase }}
            >
              <ReviewCard
                review={featuredReview}
                expanded={Boolean(expandedById[featuredReview.id])}
                onToggleExpand={() => toggleExpanded(featuredReview.id)}
                prefersReducedMotion={prefersReducedMotion}
                variant="featured"
              />
            </motion.div>
          ) : null}
        </Container>
      </section>

      <section className="relative overflow-hidden bg-[#f6f3ef] pb-8 sm:pb-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_18%,rgba(222,207,186,0.24),transparent_45%)]" />
        <Container>
          <div className="rounded-[24px] border border-white/60 bg-[linear-gradient(145deg,rgba(255,255,255,0.74),rgba(255,255,255,0.36)_52%,rgba(233,224,213,0.44))] px-4 py-5 shadow-[0_20px_42px_rgba(56,40,22,0.12),inset_0_1px_0_rgba(255,255,255,0.72)] backdrop-blur-xl sm:px-6 sm:py-6">
            <h2 className="text-[11px] uppercase tracking-[0.34em] text-[#7c6c57]">Filter feed:</h2>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <label className="text-[11px] uppercase tracking-[0.26em] text-[#8a7a65]">
                Review platform
                <select
                  value={platformFilter}
                  onChange={handlePlatformChange}
                  className="mt-2 w-full rounded-full border border-[#d8ccbb] bg-white/72 px-4 py-3 text-[11px] uppercase tracking-[0.22em] text-[#3d342b] backdrop-blur-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b6814b]/45"
                >
                  {platformOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="text-[11px] uppercase tracking-[0.26em] text-[#8a7a65]">
                Sort by
                <select
                  value={sortMode}
                  onChange={handleSortChange}
                  className="mt-2 w-full rounded-full border border-[#d8ccbb] bg-white/72 px-4 py-3 text-[11px] uppercase tracking-[0.22em] text-[#3d342b] backdrop-blur-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b6814b]/45"
                >
                  <option value="recent">{sortLabelByMode.recent}</option>
                  <option value="oldest">{sortLabelByMode.oldest}</option>
                  <option value="rating">{sortLabelByMode.rating}</option>
                </select>
              </label>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-[#f6f3ef] pb-18 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(183,152,111,0.18),transparent_42%)]" />
        <Container>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${platformFilter}-${sortMode}`}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -14 }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.32, ease: revealEase }}
              className="grid gap-8 md:grid-cols-2"
            >
              {visibleReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: prefersReducedMotion ? 0.01 : 0.6,
                    ease: revealEase,
                    delay: prefersReducedMotion ? 0 : Math.min(index, 6) * 0.05,
                  }}
                >
                  <ReviewCard
                    review={review}
                    expanded={Boolean(expandedById[review.id])}
                    onToggleExpand={() => toggleExpanded(review.id)}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {visibleReviews.length === 0 ? (
            <div className="mt-8 rounded-[2px] border border-[#ddd3c3] bg-white p-6">
              <p className="text-sm text-[#5d5244]">No reviews match this filter yet.</p>
            </div>
          ) : null}

          {hasMoreReviews ? (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={handleLoadMore}
                className="inline-flex items-center justify-center rounded-full bg-[#b6814b] px-7 py-3 text-[11px] uppercase tracking-[0.32em] text-[#1a1a18] transition duration-300 hover:-translate-y-0.5 hover:bg-[#9c6b3f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b6814b]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f3ef]"
              >
                Load more
              </button>
            </div>
          ) : null}
        </Container>
      </section>
    </>
  );
}
