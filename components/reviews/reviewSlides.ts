import type { GlassReviewSlide } from "@/components/reviews/GlassReviewSlider";
import type { UiReviewEntry } from "@/lib/reviews";

type ReviewFallbackEntry = {
  quote: string;
  author: string;
};

export type BuildMixedReviewSlidesOptions = {
  entries: UiReviewEntry[];
  minRating?: number;
  perPlatformLimit?: number;
  totalLimit?: number;
  startWith?: "google" | "house";
  fallbackReviews?: ReviewFallbackEntry[];
  fallbackIdPrefix?: string;
  fallbackSource?: GlassReviewSlide["source"];
};

const toGlassSlide = (review: UiReviewEntry): GlassReviewSlide => ({
  id: review.id,
  quote: review.review,
  name: review.name,
  source: review.platform === "Google" ? "Google" : "House",
});

const limitList = (reviews: UiReviewEntry[], perPlatformLimit?: number) => {
  if (typeof perPlatformLimit !== "number") {
    return reviews;
  }

  return reviews.slice(0, perPlatformLimit);
};

export function buildMixedReviewSlides({
  entries,
  minRating,
  perPlatformLimit,
  totalLimit,
  startWith = "google",
  fallbackReviews,
  fallbackIdPrefix = "fallback",
  fallbackSource = "House",
}: BuildMixedReviewSlidesOptions): GlassReviewSlide[] {
  const filteredEntries =
    typeof minRating === "number" ? entries.filter((review) => review.rating >= minRating) : entries;

  const googleReviews = limitList(
    filteredEntries.filter((review) => review.platform === "Google"),
    perPlatformLimit,
  );
  const houseReviews = limitList(
    filteredEntries.filter((review) => review.platform !== "Google"),
    perPlatformLimit,
  );

  const mixedReviews: UiReviewEntry[] = [];
  const maxLength = Math.max(googleReviews.length, houseReviews.length);

  for (let index = 0; index < maxLength; index += 1) {
    const google = googleReviews[index];
    const house = houseReviews[index];

    if (startWith === "house") {
      if (house) {
        mixedReviews.push(house);
      }

      if (google) {
        mixedReviews.push(google);
      }

      continue;
    }

    if (google) {
      mixedReviews.push(google);
    }

    if (house) {
      mixedReviews.push(house);
    }
  }

  const mappedSlides = mixedReviews.map(toGlassSlide);
  const slides =
    typeof totalLimit === "number" ? mappedSlides.slice(0, totalLimit) : mappedSlides;

  if (slides.length > 0) {
    return slides;
  }

  if (!fallbackReviews || fallbackReviews.length === 0) {
    return [];
  }

  return fallbackReviews.map((review, index) => ({
    id: `${fallbackIdPrefix}-${index + 1}`,
    quote: review.quote,
    name: review.author,
    source: fallbackSource,
  }));
}
