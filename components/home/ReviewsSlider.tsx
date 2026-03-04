"use client";

import { useEffect, useState } from "react";
import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import { cn } from "@/lib/utils";

type Review = {
  quote: string;
  name: string;
  role?: string;
};

type ReviewsSliderProps = {
  reviews: Review[];
  intervalMs?: number;
};

export default function ReviewsSlider({
  reviews,
  intervalMs = 9000,
}: ReviewsSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (reviews.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % reviews.length);
    }, intervalMs);

    return () => window.clearInterval(interval);
  }, [intervalMs, reviews.length]);

  return (
    <Section className="bg-[#f6f3ef] py-24">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#8c857d]">
            Client reviews
          </p>
          <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[#1a1a18] sm:text-4xl">
            Discreet, trusted delivery for discerning clients.
          </h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
          <div
            key={`review-${activeIndex}`}
            className="rounded-3xl border border-[#e7e2dc] bg-white p-10 shadow-[0_40px_90px_-65px_rgba(0,0,0,0.6)] motion-safe:animate-[reviewFade_700ms_ease-out]"
            aria-live="polite"
          >
            <p className="text-xl leading-relaxed text-[#1a1a18]">
              “{reviews[activeIndex]?.quote}”
            </p>
            <div className="mt-6 text-[11px] uppercase tracking-[0.32em] text-[#8c857d]">
              {reviews[activeIndex]?.name}
              {reviews[activeIndex]?.role ? ` • ${reviews[activeIndex]?.role}` : ""}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {reviews.map((review, index) => (
              <button
                key={review.name}
                type="button"
                className={cn(
                  "rounded-2xl border px-6 py-4 text-left text-sm transition",
                  index === activeIndex
                    ? "border-[#1a1a18] bg-[#1a1a18] text-white"
                    : "border-[#e7e2dc] bg-white text-[#5c544d] hover:border-[#bdb5ac]",
                )}
                onClick={() => setActiveIndex(index)}
              >
                <p className="text-[11px] uppercase tracking-[0.3em] text-current/70">
                  {review.name}
                </p>
                <p className="mt-2 text-sm text-current/80">{review.quote}</p>
              </button>
            ))}
          </div>
        </div>
      </Container>
      <style jsx global>{`
        @keyframes reviewFade {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Section>
  );
}
