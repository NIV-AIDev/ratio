export type ProjectType = "architecture" | "interior" | "construction" | "development";
export type SizeMode = "sqm" | "bedrooms";
export type SpecificationLevel = "standard" | "premium" | "luxury";
export type TimelineUrgency = "flexible" | "normal" | "urgent";

export const projectTypeConfig: Record<
  ProjectType,
  {
    label: string;
    description: string;
    baseRatePerSqm: number;
    baseTimelineWeeks: number;
  }
> = {
  architecture: {
    label: "Architecture",
    description: "Concept-to-technical design and planning support.",
    baseRatePerSqm: 1250,
    baseTimelineWeeks: 10,
  },
  interior: {
    label: "Interior",
    description: "Interior architecture, detailing, and procurement.",
    baseRatePerSqm: 1550,
    baseTimelineWeeks: 14,
  },
  construction: {
    label: "Construction",
    description: "Site delivery, project controls, and specialist trades.",
    baseRatePerSqm: 2300,
    baseTimelineWeeks: 24,
  },
  development: {
    label: "Development",
    description: "End-to-end development strategy and execution.",
    baseRatePerSqm: 2850,
    baseTimelineWeeks: 36,
  },
};

export const specificationMultipliers: Record<SpecificationLevel, number> = {
  standard: 1,
  premium: 1.22,
  luxury: 1.46,
};

export const specificationTimelineOffsets: Record<SpecificationLevel, number> = {
  standard: 0,
  premium: 2,
  luxury: 4,
};

export const urgencyCostMultipliers: Record<TimelineUrgency, number> = {
  flexible: 0.97,
  normal: 1,
  urgent: 1.14,
};

export const urgencyTimelineOffsets: Record<TimelineUrgency, number> = {
  flexible: 3,
  normal: 0,
  urgent: -2,
};

export const sizeLimits: Record<SizeMode, { min: number; max: number }> = {
  sqm: { min: 45, max: 1200 },
  bedrooms: { min: 1, max: 12 },
};

export const addOnConfig = {
  planningSupport: {
    label: "Planning support",
    description: "Pre-app advice, submission packs, and consultant coordination.",
    flatFee: 18000,
    timelineWeeks: 2,
  },
  bespokeJoinery: {
    label: "Bespoke joinery",
    description: "Custom cabinetry, specialist detailing, and workshop management.",
    flatFee: 32000,
    timelineWeeks: 3,
  },
  smartHome: {
    label: "Smart home",
    description: "Integrated lighting, AV, controls, and commissioning.",
    flatFee: 22000,
    timelineWeeks: 2,
  },
} as const;

export type AddOnKey = keyof typeof addOnConfig;

export const projectTypeOrder: ProjectType[] = [
  "architecture",
  "interior",
  "construction",
  "development",
];

export const specificationLevelOrder: SpecificationLevel[] = [
  "standard",
  "premium",
  "luxury",
];

export const timelineUrgencyOrder: TimelineUrgency[] = [
  "flexible",
  "normal",
  "urgent",
];

export const addOnOrder: AddOnKey[] = ["planningSupport", "bespokeJoinery", "smartHome"];

export type PricingInputs = {
  projectType: ProjectType;
  sizeMode: SizeMode;
  propertySize: number;
  specificationLevel: SpecificationLevel;
  timelineUrgency: TimelineUrgency;
  addOns: AddOnKey[];
};

export const defaultPricingInputs: PricingInputs = {
  projectType: "construction",
  sizeMode: "sqm",
  propertySize: 180,
  specificationLevel: "premium",
  timelineUrgency: "normal",
  addOns: ["planningSupport"],
};

const clampNumber = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const isAddOnKey = (value: string): value is AddOnKey =>
  Object.prototype.hasOwnProperty.call(addOnConfig, value);

export const bedroomsToSqm = (bedrooms: number) => bedrooms * 38 + 55;

export const sqmToBedrooms = (sqm: number) => Math.max(1, Math.round((sqm - 55) / 38));

export const normalizeSizeToSqm = (sizeMode: SizeMode, propertySize: number) => {
  if (sizeMode === "sqm") {
    return propertySize;
  }

  return bedroomsToSqm(propertySize);
};

export const sanitizePricingInputs = (inputs: PricingInputs): PricingInputs => {
  const limits = sizeLimits[inputs.sizeMode];
  const safeSize = Number.isFinite(inputs.propertySize)
    ? Math.round(clampNumber(inputs.propertySize, limits.min, limits.max))
    : limits.min;

  const safeAddOns = Array.from(new Set(inputs.addOns)).filter((item) => isAddOnKey(item));

  return {
    ...inputs,
    propertySize: safeSize,
    addOns: safeAddOns,
  };
};

export type PricingEstimate = {
  normalizedSizeSqm: number;
  baseCost: number;
  addOnsCost: number;
  subtotal: number;
  costRange: {
    min: number;
    max: number;
  };
  timelineRangeWeeks: {
    min: number;
    max: number;
  };
  timelineRangeMonths: {
    min: number;
    max: number;
  };
  breakdown: {
    projectRatePerSqm: number;
    specificationMultiplier: number;
    urgencyMultiplier: number;
    specificationTimelineWeeks: number;
    urgencyTimelineAdjustmentWeeks: number;
    addOnTimelineWeeks: number;
  };
};

const roundTo500 = (value: number) => Math.round(value / 500) * 500;

const weeksToMonths = (weeks: number) => Number((weeks / 4.345).toFixed(1));

export const calculatePricingEstimate = (rawInputs: PricingInputs): PricingEstimate => {
  const inputs = sanitizePricingInputs(rawInputs);
  const project = projectTypeConfig[inputs.projectType];
  const normalizedSizeSqm = normalizeSizeToSqm(inputs.sizeMode, inputs.propertySize);

  const specificationMultiplier = specificationMultipliers[inputs.specificationLevel];
  const urgencyMultiplier = urgencyCostMultipliers[inputs.timelineUrgency];

  const baseCost = normalizedSizeSqm * project.baseRatePerSqm * specificationMultiplier * urgencyMultiplier;
  const addOnsCost = inputs.addOns.reduce((total, addOn) => total + addOnConfig[addOn].flatFee, 0);
  const subtotal = baseCost + addOnsCost;

  const costRange = {
    min: roundTo500(subtotal * 0.9),
    max: roundTo500(subtotal * 1.18),
  };

  const specificationTimelineWeeks = specificationTimelineOffsets[inputs.specificationLevel];
  const urgencyTimelineAdjustmentWeeks = urgencyTimelineOffsets[inputs.timelineUrgency];
  const addOnTimelineWeeks = inputs.addOns.reduce(
    (total, addOn) => total + addOnConfig[addOn].timelineWeeks,
    0,
  );

  const sizeTimelineWeeks = Math.ceil(normalizedSizeSqm / 45);
  const baselineTimelineWeeks =
    project.baseTimelineWeeks +
    sizeTimelineWeeks +
    specificationTimelineWeeks +
    addOnTimelineWeeks +
    urgencyTimelineAdjustmentWeeks;

  const timelineMinWeeks = Math.max(project.baseTimelineWeeks, Math.floor(baselineTimelineWeeks * 0.9));
  const timelineMaxWeeks = Math.max(timelineMinWeeks + 1, Math.ceil(baselineTimelineWeeks * 1.2));

  return {
    normalizedSizeSqm,
    baseCost: roundTo500(baseCost),
    addOnsCost,
    subtotal: roundTo500(subtotal),
    costRange,
    timelineRangeWeeks: {
      min: timelineMinWeeks,
      max: timelineMaxWeeks,
    },
    timelineRangeMonths: {
      min: weeksToMonths(timelineMinWeeks),
      max: weeksToMonths(timelineMaxWeeks),
    },
    breakdown: {
      projectRatePerSqm: project.baseRatePerSqm,
      specificationMultiplier,
      urgencyMultiplier,
      specificationTimelineWeeks,
      urgencyTimelineAdjustmentWeeks,
      addOnTimelineWeeks,
    },
  };
};
