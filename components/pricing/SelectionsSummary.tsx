"use client";

import { useMemo, useState } from "react";
import {
  buildSelectionRows,
  isProjectComplete,
  type PricingWizardSelections,
} from "@/lib/pricing";
import { cn } from "@/lib/utils";

type SelectionsSummaryProps = {
  selections: PricingWizardSelections;
  onReset: () => void;
};

function SelectionRows({ selections }: { selections: PricingWizardSelections }) {
  const rows = buildSelectionRows(selections);

  if (rows.length === 0) {
    return <p className="text-sm text-[#675b4e]">Choose a project type to begin your estimate.</p>;
  }

  return (
    <dl className="space-y-3 text-sm">
      {rows.map((row) => (
        <div key={row.label} className="flex items-start justify-between gap-3">
          <dt className="uppercase tracking-[0.22em] text-[#8b775d]">{row.label}</dt>
          <dd className="text-right font-medium text-[#2f2922]">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function SelectionsSummary({ selections, onReset }: SelectionsSummaryProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const selectedCount = useMemo(() => {
    const rows = buildSelectionRows(selections);
    return rows.filter((row) => row.value !== "Not selected").length;
  }, [selections]);

  const isComplete = isProjectComplete(selections);

  return (
    <div className="space-y-3 lg:space-y-0">
      <button
        type="button"
        onClick={() => setIsMobileOpen((current) => !current)}
        className="flex w-full items-center justify-between rounded-2xl border border-[#dbcdb9] bg-white/75 px-4 py-3 text-left shadow-[0_10px_24px_rgba(84,60,28,0.11)] supports-backdrop-filter:bg-white/50 lg:hidden"
        aria-expanded={isMobileOpen}
        aria-controls="pricing-selections-mobile"
      >
        <span className="text-[11px] uppercase tracking-[0.28em] text-[#8b775d]">Your selections</span>
        <span className="font-(--font-home-serif) text-lg uppercase tracking-[0.08em] text-[#2f2922]">
          {String(selectedCount).padStart(2, "0")}
        </span>
      </button>

      <aside
        id="pricing-selections-mobile"
        className={cn(
          "overflow-hidden rounded-2xl border border-[#d8c8b3] bg-white/85 p-4 shadow-[0_14px_30px_rgba(77,51,18,0.11)] transition-all duration-300 supports-backdrop-filter:bg-white/60 lg:hidden",
          isMobileOpen ? "max-h-[560px] opacity-100" : "max-h-0 border-transparent p-0 opacity-0",
        )}
      >
        <SelectionRows selections={selections} />
        <button
          type="button"
          onClick={onReset}
          className="mt-5 inline-flex border-b border-[#ab9468] pb-1 text-[11px] uppercase tracking-[0.28em] text-[#8a765b]"
        >
          Reset
        </button>
      </aside>

      <aside className="hidden rounded-3xl border border-[#d7cab7] bg-white/80 p-6 shadow-[0_18px_46px_rgba(46,30,8,0.12)] supports-backdrop-filter:bg-white/58 supports-backdrop-filter:backdrop-blur-md lg:sticky lg:top-28 lg:block">
        <p className="text-[11px] uppercase tracking-[0.32em] text-[#8b775d]">Your selections</p>
        <p className="mt-3 font-(--font-home-serif) text-3xl uppercase tracking-[0.08em] text-[#2f2922]">
          {String(selectedCount).padStart(2, "0")}
        </p>

        <div className="mt-5 border-t border-[#ece2d5] pt-5">
          <SelectionRows selections={selections} />
        </div>

        <button
          type="button"
          onClick={onReset}
          className="mt-6 inline-flex border-b border-[#ab9468] pb-1 text-[11px] uppercase tracking-[0.28em] text-[#8a765b]"
        >
          Reset
        </button>

        <p className="mt-5 text-xs leading-relaxed text-[#6d6254]">
          {isComplete
            ? "Selections complete. Review estimated range, timeline, inclusions, and exclusions below."
            : "Complete all project steps to reveal your matched estimated range and timeline."}
        </p>
      </aside>
    </div>
  );
}
