import ReviewsCarousel from "@/components/reviews/ReviewsCarousel";
import ReviewsHero from "@/components/reviews/ReviewsHero";

export default function ReviewsPageContent() {
  return (
    <article className="bg-[#f6f3ef] text-[#1a1a18]">
      <ReviewsHero />
      <ReviewsCarousel />
    </article>
  );
}
