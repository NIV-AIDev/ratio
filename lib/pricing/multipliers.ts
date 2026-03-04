import type { NumericRange } from "@/lib/pricing/utils";

export type ProjectType = "extension" | "loftConversion" | "fullHouseRenovation";

export type UkRegion = "londonSe" | "restUk";

export type FinishLevel = "basic" | "mid" | "high";

export const projectTypeOrder: ProjectType[] = [
  "extension",
  "loftConversion",
  "fullHouseRenovation",
];

export const projectTypeMeta: Record<
  ProjectType,
  {
    label: string;
    shortLabel: string;
    description: string;
  }
> = {
  extension: {
    label: "Extension",
    shortLabel: "Extension",
    description: "Estimate rear, side, and wraparound extension scenarios.",
  },
  loftConversion: {
    label: "Loft conversion",
    shortLabel: "Loft",
    description: "Model Velux, dormer, hip-to-gable, and mansard options.",
  },
  fullHouseRenovation: {
    label: "Full house renovation",
    shortLabel: "Renovation",
    description: "Plan cosmetic through structural high-spec renovation budgets.",
  },
};

export const ukRegionOrder: UkRegion[] = ["londonSe", "restUk"];

export const ukRegionMeta: Record<UkRegion, { label: string; factor: NumericRange }> = {
  londonSe: {
    label: "London / South East",
    factor: { min: 1.15, max: 1.3 },
  },
  restUk: {
    label: "Rest of UK",
    factor: { min: 1, max: 1 },
  },
};

export const renovationRegionMeta: Record<UkRegion, { label: string; factor: NumericRange }> = {
  londonSe: {
    label: "London / South East",
    factor: { min: 1.2, max: 1.3 },
  },
  restUk: {
    label: "Rest of UK",
    factor: { min: 1, max: 1 },
  },
};

export const finishLevelOrder: FinishLevel[] = ["basic", "mid", "high"];

export const loftFinishMeta: Record<FinishLevel, { label: string; factor: NumericRange }> = {
  basic: {
    label: "Basic",
    factor: { min: 1, max: 1 },
  },
  mid: {
    label: "Mid",
    factor: { min: 1.15, max: 1.3 },
  },
  high: {
    label: "High",
    factor: { min: 1.4, max: 1.6 },
  },
};

export const finishWeightByLevel: Record<FinishLevel, number> = {
  basic: 0.2,
  mid: 0.5,
  high: 0.85,
};
