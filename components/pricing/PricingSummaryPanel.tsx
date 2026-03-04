"use client";

import Link from "next/link";
import {
  addOnConfig,
  projectTypeConfig,
  type PricingEstimate,
  type PricingInputs,
} from "@/lib/pricing/calculator";

const currencyFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

const specificationLabels = {
  standard: "Standard",
  premium: "Premium",
  luxury: "Luxury",
} as const;

const urgencyLabels = {
  flexible: "Flexible",
  normal: "Normal",
  urgent: "Urgent",
} as const;

type PricingSummaryPanelProps = {
  inputs: PricingInputs;
  estimate: PricingEstimate;
};

export default function PricingSummaryPanel({
  inputs,
  estimate,
}: PricingSummaryPanelProps) {
  const selectedProject = projectTypeConfig[inputs.projectType];
  const addOnLabels = inputs.addOns.map((item) => addOnConfig[item].label);

  return (
    <aside className="rounded-3xl border border-[#d7cab8] bg-white p-6 shadow-[0_18px_50px_rgba(37,28,12,0.12)] sm:p-8 lg:sticky lg:top-28">
      <p className="text-[11px] uppercase tracking-[0.32em] text-[#8c7a62]">Live estimate</p>
      <h2 className="mt-3 font-(--font-home-serif) text-3xl uppercase tracking-[0.08em] text-[#2b2620]">
        {currencyFormatter.format(estimate.costRange.min)} – {currencyFormatter.format(estimate.costRange.max)}
      </h2>
      <p className="mt-2 text-sm text-[#6d6255]">
        Indicative timeline: {estimate.timelineRangeWeeks.min}–{estimate.timelineRangeWeeks.max} weeks (
        {estimate.timelineRangeMonths.min}–{estimate.timelineRangeMonths.max} months)
      </p>

      <dl className="mt-6 space-y-4 border-t border-[#eee5d9] pt-6 text-sm text-[#5c544a]">
        <div className="flex items-start justify-between gap-4">
          <dt className="text-[#8e7a60]">Project type</dt>
          <dd className="text-right font-medium text-[#2f2922]">{selectedProject.label}</dd>
        </div>
        <div className="flex items-start justify-between gap-4">
          <dt className="text-[#8e7a60]">Property size</dt>
          <dd className="text-right font-medium text-[#2f2922]">{estimate.normalizedSizeSqm} sqm</dd>
        </div>
        <div className="flex items-start justify-between gap-4">
          <dt className="text-[#8e7a60]">Specification</dt>
          <dd className="text-right font-medium text-[#2f2922]">{specificationLabels[inputs.specificationLevel]}</dd>
        </div>
        <div className="flex items-start justify-between gap-4">
          <dt className="text-[#8e7a60]">Timeline urgency</dt>
          <dd className="text-right font-medium text-[#2f2922]">{urgencyLabels[inputs.timelineUrgency]}</dd>
        </div>
        <div className="flex items-start justify-between gap-4">
          <dt className="text-[#8e7a60]">Optional add-ons</dt>
          <dd className="text-right font-medium text-[#2f2922]">
            {addOnLabels.length > 0 ? addOnLabels.join(", ") : "None selected"}
          </dd>
        </div>
      </dl>

      <div className="mt-6 rounded-2xl border border-[#eadfce] bg-[#faf7f2] p-4 text-sm text-[#5f5548]">
        <p className="text-[11px] uppercase tracking-[0.26em] text-[#8e7a60]">Formula transparency</p>
        <p className="mt-2 leading-relaxed">
          ({estimate.normalizedSizeSqm} sqm × {currencyFormatter.format(estimate.breakdown.projectRatePerSqm)} ×
          {" "}
          {estimate.breakdown.specificationMultiplier.toFixed(2)} × {estimate.breakdown.urgencyMultiplier.toFixed(2)}) +
          add-ons
        </p>
        <p className="mt-3 leading-relaxed">
          Base build: {currencyFormatter.format(estimate.baseCost)} · Add-ons: {currencyFormatter.format(estimate.addOnsCost)}
        </p>
      </div>

      <Link
        href="/contact"
        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#ab9468] px-6 py-3 text-center text-[11px] uppercase tracking-[0.28em] text-white transition-colors hover:bg-[#967d51]"
      >
        Request a detailed quote
      </Link>

      <p className="mt-4 text-xs leading-relaxed text-[#7a6f61]">
        Estimates are budget guidance only, based on current assumptions and typical market delivery rates. A detailed
        scope review and site assessment is required for fixed pricing.
      </p>
    </aside>
  );
}
