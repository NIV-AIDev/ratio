import reviewsJson from "@/data/reviews.json";

export type ReviewSource = "google" | "houzz";

export type CanonicalReview = {
  source: ReviewSource;
  author: string;
  rating: number;
  text: string;
  date: string;
};

type RawReview = {
  source: string;
  author: string;
  rating: number;
  text: string;
  date: string;
};

export type UiReviewPlatform = "Google" | "Houzz";

export type UiReviewEntry = {
  id: string;
  name: string;
  dateIso: string;
  dateLabel: string;
  location: string;
  projectType: string;
  rating: number;
  platform: UiReviewPlatform;
  avatarSrc: string;
  review: string;
};

export type AboutReviewEntry = {
  quote: string;
  author: string;
  project: string;
};

const SOURCE_LABEL: Record<ReviewSource, UiReviewPlatform> = {
  google: "Google",
  houzz: "Houzz",
};

const avatarSources = [
  "/images/placeholders/reviews/avatar-01.svg",
  "/images/placeholders/reviews/avatar-02.svg",
  "/images/placeholders/reviews/avatar-03.svg",
  "/images/placeholders/reviews/avatar-04.svg",
  "/images/placeholders/reviews/avatar-05.svg",
  "/images/placeholders/reviews/avatar-06.svg",
];

const normalizeWhitespace = (value: string) => value.replace(/\s+/g, " ").trim();

const toApproximateIsoDate = (rawDate: string, fallbackIndex: number) => {
  const cleanedDate = rawDate.replace(/^Edited\s+/i, "").trim();
  const absoluteTimestamp = Date.parse(cleanedDate);

  if (!Number.isNaN(absoluteTimestamp)) {
    return new Date(absoluteTimestamp).toISOString().slice(0, 10);
  }

  const relativeMatch = cleanedDate.match(/^(a|\d+)\s+(day|week|month|year)s?\s+ago$/i);
  if (relativeMatch) {
    const amount = relativeMatch[1].toLowerCase() === "a" ? 1 : Number(relativeMatch[1]);
    const unit = relativeMatch[2].toLowerCase();
    const date = new Date();

    if (unit === "day") {
      date.setDate(date.getDate() - amount);
    } else if (unit === "week") {
      date.setDate(date.getDate() - amount * 7);
    } else if (unit === "month") {
      date.setMonth(date.getMonth() - amount);
    } else {
      date.setFullYear(date.getFullYear() - amount);
    }

    return date.toISOString().slice(0, 10);
  }

  const fallbackDate = new Date();
  fallbackDate.setDate(fallbackDate.getDate() - fallbackIndex);
  return fallbackDate.toISOString().slice(0, 10);
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const canonicalReviews: CanonicalReview[] = (reviewsJson as RawReview[])
  .filter((review) => review.source === "google" || review.source === "houzz")
  .map((review) => ({
    source: review.source as ReviewSource,
    author: normalizeWhitespace(review.author),
    rating: review.rating,
    text: normalizeWhitespace(review.text),
    date: normalizeWhitespace(review.date),
  }));

export const reviewCardData: UiReviewEntry[] = canonicalReviews.map((review, index) => {
  const platform = SOURCE_LABEL[review.source];

  return {
    id: `${review.source}-${slugify(review.author)}-${index + 1}`,
    name: review.author,
    dateIso: toApproximateIsoDate(review.date, index),
    dateLabel: review.date,
    location: review.date,
    projectType: `${platform} review`,
    rating: review.rating,
    platform,
    avatarSrc: avatarSources[index % avatarSources.length],
    review: review.text,
  };
});

export const aboutFeaturedReviews: AboutReviewEntry[] = canonicalReviews.slice(0, 3).map((review) => ({
  quote: review.text,
  author: review.author,
  project: `${SOURCE_LABEL[review.source]} · ${review.date}`,
}));
