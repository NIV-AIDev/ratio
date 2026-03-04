import { reviewCardData, type UiReviewEntry, type UiReviewPlatform } from "@/lib/reviews";

export type ReviewPlatform = UiReviewPlatform;
export type ReviewEntry = UiReviewEntry;

export const reviewsData: ReviewEntry[] = reviewCardData;
