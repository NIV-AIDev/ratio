import {
  finishLevelOrder,
  loftFinishMeta,
  ukRegionMeta,
  ukRegionOrder,
  type FinishLevel,
  type UkRegion,
} from "@/lib/pricing/multipliers";
import {
  clampNumber,
  multiplyRanges,
  roundCurrency,
  type NumericRange,
  type PricingModelResult,
} from "@/lib/pricing/utils";

export type LoftType = "velux" | "dormer" | "hipToGable" | "mansard";

export type LoftModelInput = {
  loftType: LoftType;
  sizeM2: number;
  location: UkRegion;
  finishLevel: FinishLevel;
};

export const loftTypeOrder: LoftType[] = ["velux", "dormer", "hipToGable", "mansard"];

export const loftTypeMeta: Record<LoftType, { label: string; description: string; factor: NumericRange }> = {
  velux: {
    label: "Velux",
    description: "Rooflight-led conversion with minimal external envelope changes.",
    factor: { min: 0.9, max: 1.1 },
  },
  dormer: {
    label: "Dormer",
    description: "Rear/side dormer adding usable floor area and headroom.",
    factor: { min: 1.2, max: 1.4 },
  },
  hipToGable: {
    label: "Hip-to-gable",
    description: "Reconfigure hipped roof to gable for substantial floor gain.",
    factor: { min: 1.3, max: 1.5 },
  },
  mansard: {
    label: "Mansard",
    description: "High-complexity full-volume roof transformation.",
    factor: { min: 1.4, max: 1.6 },
  },
};

export const loftBaseCostPerM2: NumericRange = {
  min: 1200,
  max: 2500,
};

const loftSizeBounds = {
  min: 18,
  max: 140,
};

const loftTimelineBase: Record<LoftType, NumericRange> = {
  velux: { min: 6, max: 10 },
  dormer: { min: 9, max: 14 },
  hipToGable: { min: 10, max: 16 },
  mansard: { min: 12, max: 20 },
};

const finishTimelineOffset: Record<FinishLevel, number> = {
  basic: 0,
  mid: 1,
  high: 3,
};

const locationTimelineOffset: Record<UkRegion, number> = {
  londonSe: 1,
  restUk: 0,
};

export const loftInputSchema = {
  loftTypes: loftTypeOrder,
  sizeM2: loftSizeBounds,
  locations: ukRegionOrder,
  finishLevels: finishLevelOrder,
} as const;

const computeTypicalFactor = (range: NumericRange, weight = 0.5) =>
  range.min + (range.max - range.min) * weight;

export const calculateLoftEstimate = (input: LoftModelInput): PricingModelResult => {
  const safeSize = clampNumber(Math.round(input.sizeM2), loftSizeBounds.min, loftSizeBounds.max);
  const typeRange = loftTypeMeta[input.loftType].factor;
  const locationRange = ukRegionMeta[input.location].factor;
  const finishRange = loftFinishMeta[input.finishLevel].factor;

  const blendedRange = multiplyRanges(loftBaseCostPerM2, typeRange, locationRange, finishRange);

  const typicalUnitRate =
    computeTypicalFactor(loftBaseCostPerM2, 0.45) *
    computeTypicalFactor(typeRange, 0.5) *
    computeTypicalFactor(locationRange, 0.5) *
    computeTypicalFactor(finishRange, 0.5);

  const minCost = roundCurrency(blendedRange.min * safeSize);
  const maxCost = roundCurrency(blendedRange.max * safeSize);
  const typicalCost = roundCurrency(typicalUnitRate * safeSize);

  const sizeTimelineOffset = Math.max(0, Math.floor((safeSize - 20) / 20));
  const baseTimeline = loftTimelineBase[input.loftType];
  const timelineWeeks = {
    min: baseTimeline.min + sizeTimelineOffset + locationTimelineOffset[input.location],
    max:
      baseTimeline.max +
      sizeTimelineOffset +
      finishTimelineOffset[input.finishLevel] +
      locationTimelineOffset[input.location],
  };

  return {
    minCost,
    maxCost,
    typicalCost: clampNumber(typicalCost, minCost, maxCost),
    timelineWeeks,
    assumptions: [
      "Formula: BaseCostPerM2 × SizeM2 × TypeFactor × LocationFactor × FinishFactor.",
      `Size is clamped to ${loftSizeBounds.min}–${loftSizeBounds.max} m² for stable forecasting.`,
      "Includes core loft shell works, insulation, staircase integration, and standard electrics/plumbing allowances.",
      "Contingency guidance: allow 10% to 15% for unknowns and opening-up risk.",
    ],
    exclusions: [
      "Planning, party wall, and building control statutory fees.",
      "Specialist heritage constraints, complex steel redesign after opening-up, and abnormal structural defects.",
      "Loose furniture, premium AV, and non-fixed dressing packages.",
    ],
    formula:
      "LoftCost = BaseCostPerM2 × SizeM2 × TypeFactor × LocationFactor × FinishFactor",
  };
};
