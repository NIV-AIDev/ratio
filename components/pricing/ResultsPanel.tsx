"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  formatTimelineWithMonths,
  projectTypeMeta,
  type PricingModelResult,
  type ProjectType,
} from "@/lib/pricing";
import { trackEvent } from "@/lib/analytics";

const currencyFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

type ResultsPanelProps = {
  projectType: ProjectType | null;
  estimate: PricingModelResult | null;
  selectionRows: Array<{ label: string; value: string }>;
};

const buildPricingConsultationPrefill = ({
  projectType,
  selectionRows,
  estimate,
}: {
  projectType: ProjectType;
  selectionRows: Array<{ label: string; value: string }>;
  estimate: PricingModelResult;
}) => {
  const timeline = formatTimelineWithMonths(estimate.timelineWeeks);
  const lines = [
    "Hello The Ratio team,",
    "",
    "I would like a detailed consultation based on my pricing estimator results.",
    `Project model: ${projectTypeMeta[projectType].label}`,
    ...selectionRows.map((row) => `${row.label}: ${row.value}`),
    `Estimated range: ${currencyFormatter.format(estimate.minCost)} - ${currencyFormatter.format(estimate.maxCost)}`,
    `Typical project cost: ${currencyFormatter.format(estimate.typicalCost)}`,
    `Timeline: ${timeline.weeks.min}-${timeline.weeks.max} weeks (${timeline.months.min}-${timeline.months.max} months)`,
    "",
    "Please provide a tailored, itemised breakdown for my property and goals.",
  ];

  return lines.join("\n");
};

export default function ResultsPanel({
  projectType,
  estimate,
  selectionRows,
}: ResultsPanelProps) {
  const prefersReducedMotion = useReducedMotion();
  const handleDetailedQuoteClick = () => {
    if (!projectType) {
      return;
    }

    trackEvent({
      event: "pricing_results_cta_click",
      cta: "get_detailed_quote",
      href: "/contact",
      projectType,
    });
  };

  if (!estimate || !projectType) {
    return (
      <section className="rounded-3xl border border-[#dfd3c2] bg-white p-6 sm:p-8">
        <h3 className="font-(--font-home-serif) text-3xl uppercase tracking-[0.08em] text-[#2f281f]">
          Results preview
        </h3>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#675c4f]">
          Complete project type plus steps 01-03 to reveal estimated range, typical cost, and timeline.
        </p>
        <ul className="mt-6 grid gap-3 text-sm text-[#665b4f] sm:grid-cols-4">
          <li className="rounded-xl border border-[#e7ddd0] bg-[#fcfaf7] p-3">00 · Project type</li>
          <li className="rounded-xl border border-[#e7ddd0] bg-[#fcfaf7] p-3">01 · Project input</li>
          <li className="rounded-xl border border-[#e7ddd0] bg-[#fcfaf7] p-3">02 · Size + location</li>
          <li className="rounded-xl border border-[#e7ddd0] bg-[#fcfaf7] p-3">03 · Finish level</li>
        </ul>
      </section>
    );
  }

  const timeline = formatTimelineWithMonths(estimate.timelineWeeks);
  const pricingConsultationPrefill = buildPricingConsultationPrefill({
    projectType,
    selectionRows,
    estimate,
  });
  const pricingConsultationHref = {
    pathname: "/contact",
    query: {
      source: "pricing",
      prefill: pricingConsultationPrefill,
    },
  };
  const panelAnimation = prefersReducedMotion
    ? { initial: { opacity: 1, y: 0, scale: 1 }, whileInView: { opacity: 1, y: 0, scale: 1 } }
    : {
        initial: { opacity: 0, y: 10, scale: 1 },
        whileInView: { opacity: 1, y: 0, scale: 1.02 },
      };

  return (
    <section className="space-y-8">
      <motion.section
        initial={panelAnimation.initial}
        whileInView={panelAnimation.whileInView}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-3xl border border-[#d8cab6] bg-white/90 p-6 shadow-[0_18px_46px_rgba(46,30,8,0.12)] supports-backdrop-filter:bg-white/65 supports-backdrop-filter:backdrop-blur-md sm:p-8"
      >
        <h3 className="font-(--font-home-serif) text-3xl uppercase tracking-[0.08em] text-[#2f281f]">
          Estimated project cost
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[#675c4f]">
          Model: {projectTypeMeta[projectType].label}
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#e4d8c8] bg-[#faf6ef] p-4 sm:p-5">
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#8a755b]">Estimated range</p>
            <p className="mt-2 font-(--font-home-serif) text-3xl uppercase tracking-[0.08em] text-[#2d261f]">
              {currencyFormatter.format(estimate.minCost)} – {currencyFormatter.format(estimate.maxCost)}
            </p>
          </div>

          <div className="rounded-2xl border border-[#e4d8c8] bg-[#faf6ef] p-4 sm:p-5">
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#8a755b]">Typical project cost</p>
            <p className="mt-2 font-(--font-home-serif) text-3xl uppercase tracking-[0.08em] text-[#2d261f]">
              {currencyFormatter.format(estimate.typicalCost)}
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm text-[#64594c]">
          Timeline: {timeline.weeks.min}–{timeline.weeks.max} weeks ({timeline.months.min}–{timeline.months.max} months)
        </p>

        <div className="mt-6 rounded-2xl border border-[#e4d8c8] bg-[#fbf7f0] p-4 sm:p-5">
          <p className="text-[10px] uppercase tracking-[0.24em] text-[#8a755b]">Indicative estimate</p>
          <p className="mt-2 text-sm leading-relaxed text-[#5f5548]">
            This figure is an approximate estimate based on your selections.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#5f5548]">
            For a precise, itemised cost breakdown with guidance on layout strategy, approvals, finishes, structure,
            and site constraints, speak with our team for a tailored review.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Link
              href={pricingConsultationHref}
              onClick={handleDetailedQuoteClick}
              className="inline-flex items-center justify-center rounded-full bg-[#ab9468] px-6 py-3 text-center text-[11px] uppercase tracking-[0.28em] text-white transition-colors hover:bg-[#967d51] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ab9468]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fbf7f0]"
            >
              Get a detailed quote
            </Link>
          </div>
        </div>

        <dl className="mt-6 grid gap-3 border-t border-[#eadfce] pt-5 text-sm text-[#62574a] sm:grid-cols-2">
          {selectionRows.map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-3 rounded-xl border border-[#ebe3d7] bg-[#fffdfa] px-3 py-2">
              <dt className="text-[10px] uppercase tracking-[0.24em] text-[#8a755b]">{row.label}</dt>
              <dd className="font-medium text-[#2f281f]">{row.value}</dd>
            </div>
          ))}
        </dl>
      </motion.section>

      <motion.section
        initial={panelAnimation.initial}
        whileInView={panelAnimation.whileInView}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 0.45, ease: [0.22, 1, 0.36, 1], delay: prefersReducedMotion ? 0 : 0.05 }}
        className="rounded-3xl border border-[#d8cab6] bg-white/90 p-6 shadow-[0_18px_46px_rgba(46,30,8,0.12)] supports-backdrop-filter:bg-white/65 supports-backdrop-filter:backdrop-blur-md sm:p-8"
      >
        <h3 className="font-(--font-home-serif) text-2xl uppercase tracking-[0.08em] text-[#2f281f]">What’s included</h3>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[#5f5447]">
          {estimate.assumptions.map((item) => (
            <li key={item} className="rounded-xl border border-[#ece3d7] bg-[#fbf8f2] px-4 py-3">
              {item}
            </li>
          ))}
        </ul>
      </motion.section>

      <motion.div
        initial={panelAnimation.initial}
        whileInView={panelAnimation.whileInView}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 0.5, ease: [0.22, 1, 0.36, 1], delay: prefersReducedMotion ? 0 : 0.1 }}
        className="rounded-3xl border border-[#ddcfbb] bg-[#fbf8f3] p-6 sm:p-8"
      >
        <h3 className="font-(--font-home-serif) text-2xl uppercase tracking-[0.08em] text-[#2e271f]">What’s not included</h3>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[#5f5447]">
          {estimate.exclusions.map((item) => (
            <li key={item} className="rounded-xl border border-[#e8dbc7] bg-white px-4 py-3">
              {item}
            </li>
          ))}
        </ul>

        <p className="mt-5 rounded-xl border border-[#eadfce] bg-[#f7f1e8] px-4 py-3 text-xs leading-relaxed text-[#6f6254]">
          Example costs only — this is not a formal quote. Final budgets depend on measured surveys, planning constraints, structural information, and detailed specification.
        </p>
      </motion.div>
      <p className="text-xs text-[#7a6f61]">
        Formula reference: <span className="font-mono text-[11px] text-[#6a5943]">{estimate.formula}</span>
      </p>
    </section>
  );
}
