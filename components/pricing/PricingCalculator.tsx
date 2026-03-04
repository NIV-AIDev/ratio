"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState, type ReactNode } from "react";
import PricingOptionCard from "@/components/pricing/PricingOptionCard";
import PricingSummaryPanel from "@/components/pricing/PricingSummaryPanel";
import {
  addOnConfig,
  addOnOrder,
  calculatePricingEstimate,
  defaultPricingInputs,
  normalizeSizeToSqm,
  projectTypeConfig,
  projectTypeOrder,
  sizeLimits,
  specificationLevelOrder,
  sqmToBedrooms,
  timelineUrgencyOrder,
  type AddOnKey,
  type PricingInputs,
  type ProjectType,
  type SizeMode,
  type SpecificationLevel,
  type TimelineUrgency,
} from "@/lib/pricing/calculator";
import { cn } from "@/lib/utils";

const stepLabels = ["Project", "Scale", "Specification", "Timeline", "Add-ons"];

const specificationMeta: Record<SpecificationLevel, { title: string; description: string }> = {
  standard: {
    title: "Standard",
    description: "Balanced finishes and high-quality essentials.",
  },
  premium: {
    title: "Premium",
    description: "Enhanced detailing, curated materials, and elevated systems.",
  },
  luxury: {
    title: "Luxury",
    description: "Fully bespoke detailing and top-tier craftsmanship.",
  },
};

const urgencyMeta: Record<TimelineUrgency, { title: string; description: string }> = {
  flexible: {
    title: "Flexible",
    description: "Best value and wider programming flexibility.",
  },
  normal: {
    title: "Normal",
    description: "Typical pace for full design and delivery coordination.",
  },
  urgent: {
    title: "Urgent",
    description: "Accelerated programme with priority resources.",
  },
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const projectTypeIcons: Record<ProjectType, ReactNode> = {
  architecture: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <path d="M3 18h18M6 18V9l6-4 6 4v9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 18v-4h4v4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  interior: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <path d="M4 16h16M6 16V9h12v7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 12h6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  construction: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <path d="M3 18h18M5 18V8h6v10M13 18v-6h6v6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 11h2M7 14h2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  development: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <path d="M4 19h16M7 19V5h10v14" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 9h4M10 12h4M10 15h4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
};

export default function PricingCalculator() {
  const prefersReducedMotion = useReducedMotion();
  const [inputs, setInputs] = useState<PricingInputs>(defaultPricingInputs);
  const [sizeDraft, setSizeDraft] = useState(String(defaultPricingInputs.propertySize));
  const [sizeError, setSizeError] = useState<string | null>(null);

  const estimate = useMemo(() => calculatePricingEstimate(inputs), [inputs]);
  const limits = sizeLimits[inputs.sizeMode];

  const completionScore = [
    Boolean(inputs.projectType),
    sizeError === null && sizeDraft.trim() !== "",
    Boolean(inputs.specificationLevel),
    Boolean(inputs.timelineUrgency),
    true,
  ].filter(Boolean).length;
  const completionPercent = Math.round((completionScore / stepLabels.length) * 100);

  const updateInputs = (updates: Partial<PricingInputs>) => {
    setInputs((current) => ({ ...current, ...updates }));
  };

  const handleSizeModeChange = (nextMode: SizeMode) => {
    if (nextMode === inputs.sizeMode) {
      return;
    }

    const currentSqm = normalizeSizeToSqm(inputs.sizeMode, inputs.propertySize);
    const nextRawValue = nextMode === "sqm" ? Math.round(currentSqm) : sqmToBedrooms(currentSqm);
    const nextLimits = sizeLimits[nextMode];
    const nextValue = clamp(nextRawValue, nextLimits.min, nextLimits.max);

    updateInputs({ sizeMode: nextMode, propertySize: nextValue });
    setSizeDraft(String(nextValue));
    setSizeError(null);
  };

  const commitSizeValue = (value: number) => {
    const safeValue = clamp(Math.round(value), limits.min, limits.max);
    updateInputs({ propertySize: safeValue });
    setSizeDraft(String(safeValue));
    setSizeError(null);
  };

  const handleSizeInputChange = (nextDraft: string) => {
    setSizeDraft(nextDraft);

    if (nextDraft.trim() === "") {
      setSizeError(`Enter a value between ${limits.min} and ${limits.max}.`);
      return;
    }

    const nextValue = Number(nextDraft);
    if (!Number.isFinite(nextValue)) {
      setSizeError("Enter numbers only.");
      return;
    }

    if (nextValue < limits.min || nextValue > limits.max) {
      setSizeError(`Use a value between ${limits.min} and ${limits.max}.`);
      return;
    }

    setSizeError(null);
    updateInputs({ propertySize: Math.round(nextValue) });
  };

  const handleAddOnToggle = (addOnKey: AddOnKey) => {
    const exists = inputs.addOns.includes(addOnKey);
    if (exists) {
      updateInputs({ addOns: inputs.addOns.filter((item) => item !== addOnKey) });
      return;
    }

    updateInputs({ addOns: [...inputs.addOns, addOnKey] });
  };

  return (
    <section className="relative overflow-hidden bg-[#f6f2ec] py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(171,148,104,0.22),transparent_72%)]" />

      <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 lg:grid-cols-[1.3fr_0.9fr] lg:items-start">
        <div className="space-y-8">
          <div className="rounded-3xl border border-[#decfb9] bg-white p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#8f7c63]">Estimator progress</p>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#8f7c63]">{completionPercent}% complete</p>
            </div>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#ede2d3]">
              <motion.div
                className="h-full rounded-full bg-[#ab9468]"
                initial={{ width: 0 }}
                animate={{ width: `${completionPercent}%` }}
                transition={{ duration: prefersReducedMotion ? 0.01 : 0.35, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-5">
              {stepLabels.map((step, index) => {
                const stepActive = index < completionScore;
                return (
                  <div
                    key={step}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-center text-[10px] uppercase tracking-[0.24em]",
                      stepActive
                        ? "border-[#ab9468] bg-[#f5efe6] text-[#7f6946]"
                        : "border-[#e8dfd3] bg-[#faf8f5] text-[#a29179]",
                    )}
                  >
                    {step}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-[#e2d4c2] bg-white p-6 sm:p-8">
            <p className="text-[11px] uppercase tracking-[0.32em] text-[#8f7c63]">01 · Project type</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {projectTypeOrder.map((projectType) => (
                <PricingOptionCard
                  key={projectType}
                  title={projectTypeConfig[projectType].label}
                  description={projectTypeConfig[projectType].description}
                  icon={projectTypeIcons[projectType]}
                  selected={inputs.projectType === projectType}
                  onSelect={() => updateInputs({ projectType })}
                />
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[#e2d4c2] bg-white p-6 sm:p-8">
            <p className="text-[11px] uppercase tracking-[0.32em] text-[#8f7c63]">02 · Property size</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {([
                { key: "sqm", label: "Square metres" },
                { key: "bedrooms", label: "Bedrooms" },
              ] as const).map((item) => (
                <button
                  type="button"
                  key={item.key}
                  onClick={() => handleSizeModeChange(item.key)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.24em] transition-colors",
                    inputs.sizeMode === item.key
                      ? "border-[#ab9468] bg-[#ab9468] text-white"
                      : "border-[#dcccba] bg-[#f8f4ee] text-[#7b6951] hover:border-[#ab9468]",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-[190px_1fr] sm:items-center">
              <label className="space-y-2" htmlFor="property-size">
                <span className="block text-[11px] uppercase tracking-[0.24em] text-[#947e63]">
                  {inputs.sizeMode === "sqm" ? "Size (sqm)" : "Bedrooms"}
                </span>
                <input
                  id="property-size"
                  type="number"
                  min={limits.min}
                  max={limits.max}
                  value={sizeDraft}
                  onChange={(event) => handleSizeInputChange(event.target.value)}
                  onBlur={() => commitSizeValue(Number(sizeDraft) || limits.min)}
                  className="w-full rounded-xl border border-[#dbcdb8] bg-[#faf7f2] px-4 py-3 text-lg font-medium text-[#2f2922] outline-none transition-colors focus:border-[#ab9468]"
                />
              </label>

              <div className="space-y-2">
                <input
                  type="range"
                  min={limits.min}
                  max={limits.max}
                  value={inputs.propertySize}
                  onChange={(event) => commitSizeValue(Number(event.target.value))}
                  className="w-full accent-[#ab9468]"
                />
                <p className="text-xs text-[#726656]">
                  Range {limits.min}–{limits.max}. {inputs.sizeMode === "sqm" ? "Approx." : "Equivalent to"}{" "}
                  {inputs.sizeMode === "sqm"
                    ? `${sqmToBedrooms(inputs.propertySize)} bedrooms`
                    : `${estimate.normalizedSizeSqm} sqm`}
                  .
                </p>
              </div>
            </div>
            {sizeError ? <p className="mt-3 text-sm text-[#a0473e]">{sizeError}</p> : null}
          </div>

          <div className="rounded-3xl border border-[#e2d4c2] bg-white p-6 sm:p-8">
            <p className="text-[11px] uppercase tracking-[0.32em] text-[#8f7c63]">03 · Specification level</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {specificationLevelOrder.map((level) => (
                <PricingOptionCard
                  key={level}
                  title={specificationMeta[level].title}
                  description={specificationMeta[level].description}
                  icon={<span className="font-(--font-home-serif) text-sm">{level.slice(0, 1).toUpperCase()}</span>}
                  selected={inputs.specificationLevel === level}
                  onSelect={() => updateInputs({ specificationLevel: level })}
                />
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[#e2d4c2] bg-white p-6 sm:p-8">
            <p className="text-[11px] uppercase tracking-[0.32em] text-[#8f7c63]">04 · Timeline urgency</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {timelineUrgencyOrder.map((urgency) => (
                <PricingOptionCard
                  key={urgency}
                  title={urgencyMeta[urgency].title}
                  description={urgencyMeta[urgency].description}
                  icon={<TimelineIcon urgency={urgency} />}
                  selected={inputs.timelineUrgency === urgency}
                  onSelect={() => updateInputs({ timelineUrgency: urgency })}
                />
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[#e2d4c2] bg-white p-6 sm:p-8">
            <p className="text-[11px] uppercase tracking-[0.32em] text-[#8f7c63]">05 · Optional add-ons</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {addOnOrder.map((addOnKey) => {
                const isSelected = inputs.addOns.includes(addOnKey);
                const addOn = addOnConfig[addOnKey];
                return (
                  <motion.button
                    type="button"
                    key={addOnKey}
                    onClick={() => handleAddOnToggle(addOnKey)}
                    whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
                    transition={{ duration: prefersReducedMotion ? 0.01 : 0.24, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      "rounded-2xl border px-5 py-5 text-left transition-colors duration-300",
                      isSelected
                        ? "border-[#ab9468] bg-[#f9f3e8]"
                        : "border-[#dfd2c0] bg-[#fcfaf7] hover:border-[#b99d73]",
                    )}
                    aria-pressed={isSelected}
                  >
                    <p className="font-(--font-home-serif) text-xl uppercase tracking-[0.06em] text-[#2f2922]">
                      {addOn.label}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[#665b4f]">{addOn.description}</p>
                    <p className="mt-4 text-[11px] uppercase tracking-[0.24em] text-[#8f7c63]">
                      +GBP {addOn.flatFee.toLocaleString("en-GB")} · +{addOn.timelineWeeks} weeks
                    </p>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        <PricingSummaryPanel inputs={inputs} estimate={estimate} />
      </div>
    </section>
  );
}

type TimelineIconProps = {
  urgency: TimelineUrgency;
};

function TimelineIcon({ urgency }: TimelineIconProps) {
  if (urgency === "urgent") {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
        <path d="M12 3v9l5 3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }

  if (urgency === "flexible") {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
        <path d="M5 12a7 7 0 1 0 2-4.9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 5v3h3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8v5l3 2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
