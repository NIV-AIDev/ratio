"use client";

import { useState } from "react";
import Container from "@/components/ui/container";
import Section from "@/components/ui/section";

export default function AreaLocator() {
  const [postcode, setPostcode] = useState("");
  const [message, setMessage] = useState("Enter a postcode to confirm coverage.");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(
      postcode.trim().length > 0
        ? `Coverage available for ${postcode.toUpperCase()}. Our team will confirm within 24 hours.`
        : "Enter a postcode to confirm coverage.",
    );
  };

  return (
    <Section className="bg-white py-24">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center">
        <div className="space-y-6">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#8c857d]">
            Service area
          </p>
          <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[#1a1a18] sm:text-4xl">
            Confirm whether we operate in your area.
          </h2>
          <p className="text-base leading-relaxed text-[#5c544d]">
            We take on a limited number of projects across Greater London and
            select counties. Share a postcode to confirm availability.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-[#e7e2dc] bg-[#f6f3ef] p-8"
        >
          <label className="text-[11px] uppercase tracking-[0.32em] text-[#8c857d]">
            Postcode lookup
            <input
              className="mt-3 w-full rounded-full border border-[#bdb5ac] bg-white px-4 py-3 text-sm text-[#1a1a18] focus:border-[#1a1a18] focus:outline-none"
              type="text"
              name="postcode"
              placeholder="SW1A 1AA"
              value={postcode}
              onChange={(event) => setPostcode(event.target.value)}
            />
          </label>
          <button
            type="submit"
            className="mt-4 w-full rounded-full bg-[#1a1a18] px-6 py-3 text-[11px] uppercase tracking-[0.32em] text-white transition hover:bg-black"
          >
            Check availability
          </button>
          <p className="mt-4 text-sm text-[#5c544d]">{message}</p>
        </form>
      </Container>
    </Section>
  );
}
