import {
  finishLevelOrder,
  finishWeightByLevel,
  renovationRegionMeta,
  ukRegionOrder,
  type FinishLevel,
  type UkRegion,
} from "@/lib/pricing/multipliers";
import {
  clampNumber,
  roundCurrency,
  type NumericRange,
  type PricingModelResult,
} from "@/lib/pricing/utils";

export type RenovationScope = "cosmetic" | "fullInternal" | "structuralHighSpec";

export type RenovationModelInput = {
  areaM2: number;
  scope: RenovationScope;
  location: UkRegion;
  finishLevel: FinishLevel;
};

export const renovationScopeOrder: RenovationScope[] = [
  "cosmetic",
  "fullInternal",
  "structuralHighSpec",
];

export const renovationScopeMeta: Record<
  RenovationScope,
  {
    label: string;
    description: string;
    factor: NumericRange;
  }
> = {
  cosmetic: {
    label: "Cosmetic only",
    description: "Finishes-led upgrades with limited structural intervention.",
    factor: { min: 0.8, max: 1 },
  },
  fullInternal: {
    label: "Full internal renovation",
    description: "Comprehensive internal strip-out and renewal.",
    factor: { min: 1, max: 1.3 },
  },
  structuralHighSpec: {
    label: "Structural + high spec",
    description: "Major structural works with premium integrated specification.",
    factor: { min: 1.3, max: 1.6 },
  },
};

export const renovationBaseCostPerM2: NumericRange = {
  min: 1200,
  max: 2800,
};

const areaBounds = {
  min: 45,
  max: 900,
};

const timelineBaseByScope: Record<RenovationScope, NumericRange> = {
  cosmetic: { min: 10, max: 18 },
  fullInternal: { min: 16, max: 28 },
  structuralHighSpec: { min: 24, max: 40 },
};

const finishTimelineOffset: Record<FinishLevel, number> = {
  basic: 0,
  mid: 2,
  high: 4,
};

const locationTimelineOffset: Record<UkRegion, number> = {
  londonSe: 1,
  restUk: 0,
};

export const renovationInputSchema = {
  areaM2: areaBounds,
  scopes: renovationScopeOrder,
  locations: ukRegionOrder,
  finishLevels: finishLevelOrder,
} as const;

const weightedRangeValue = (range: NumericRange, weight: number) =>
  range.min + (range.max - range.min) * weight;

export const calculateRenovationEstimate = (
  input: RenovationModelInput,
): PricingModelResult => {
  const safeArea = clampNumber(Math.round(input.areaM2), areaBounds.min, areaBounds.max);
  const scopeRange = renovationScopeMeta[input.scope].factor;
  const locationRange = renovationRegionMeta[input.location].factor;

  const minCost =
    renovationBaseCostPerM2.min * safeArea * scopeRange.min * locationRange.min;
  const maxCost =
    renovationBaseCostPerM2.max * safeArea * scopeRange.max * locationRange.max;

  const finishWeight = finishWeightByLevel[input.finishLevel];
  const typicalCost =
    weightedRangeValue(renovationBaseCostPerM2, finishWeight) *
    safeArea *
    weightedRangeValue(scopeRange, finishWeight) *
    weightedRangeValue(locationRange, 0.5);

  const areaTimelineOffset = Math.max(0, Math.floor((safeArea - 80) / 60));
  const scopeTimeline = timelineBaseByScope[input.scope];
  const timelineWeeks = {
    min: scopeTimeline.min + areaTimelineOffset,
    max:
      scopeTimeline.max +
      areaTimelineOffset +
      finishTimelineOffset[input.finishLevel] +
      locationTimelineOffset[input.location],
  };

  return {
    minCost: roundCurrency(minCost),
    maxCost: roundCurrency(maxCost),
    typicalCost: roundCurrency(clampNumber(typicalCost, minCost, maxCost)),
    timelineWeeks,
    assumptions: [
      "Formula: BaseCostPerM2 × Area × ScopeFactor × LocationFactor.",
      "Finish level influences the typical position within the calculated UK 2026 range.",
      `Area is clamped to ${areaBounds.min}–${areaBounds.max} m² for deterministic outputs.`,
      "Contingency guidance: allow 10% to 15% for opening-up and coordination risk.",
    ],
    exclusions: [
      "Major underpinning, basement works, and unforeseen latent defects.",
      "Professional fees, statutory approvals, and temporary relocation costs.",
      "Client-side FF&E, smart home specialist systems, and post-contract design changes.",
    ],
    formula:
      "RenovationCost = BaseCostPerM2 × Area × ScopeFactor × LocationFactor",
  };
};
