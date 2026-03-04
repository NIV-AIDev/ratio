export type PropertyType =
  | "detached"
  | "semiDetached"
  | "endTerrace"
  | "terracedFlatBack"
  | "terracedLShaped";

export type ExtensionType = "rear" | "side" | "wraparound";

export type RoofType = "flat" | "pitched" | "gable" | "crown";

export type SpecificationLevel = "standard" | "premium" | "luxury";

export type UrgencyLevel = "planned" | "expedited";

export type CostRange = {
  min: number;
  max: number;
};

export type TimelineRangeWeeks = {
  min: number;
  max: number;
};

export type TimelineRangeMonths = {
  min: number;
  max: number;
};

export type PricingSelections = {
  propertyType: PropertyType;
  extensionType: ExtensionType;
  roofType: RoofType;
};

export type PricingSelectionsDraft = {
  propertyType: PropertyType | null;
  extensionType: ExtensionType | null;
  roofType: RoofType | null;
};

export type PricingModelOptions = {
  specificationLevel?: SpecificationLevel;
  urgency?: UrgencyLevel;
};

export type PricingOutput = {
  costRange: CostRange;
  timelineRangeWeeks: TimelineRangeWeeks;
  timelineRangeMonths: TimelineRangeMonths;
};

export type ExampleCostCard = PricingSelections & {
  id: string;
  title: string;
  costRange: CostRange;
  timelineRangeWeeks: TimelineRangeWeeks;
  timelineRangeMonths: TimelineRangeMonths;
};

export const emptyPricingSelections: PricingSelectionsDraft = {
  propertyType: null,
  extensionType: null,
  roofType: null,
};

export const propertyTypeOrder: PropertyType[] = [
  "detached",
  "semiDetached",
  "endTerrace",
  "terracedFlatBack",
  "terracedLShaped",
];

export const extensionTypeOrder: ExtensionType[] = ["rear", "side", "wraparound"];

export const roofTypeOrder: RoofType[] = ["flat", "pitched", "gable", "crown"];

export const propertyTypeMeta: Record<
  PropertyType,
  {
    label: string;
    shortLabel: string;
    description: string;
  }
> = {
  detached: {
    label: "Detached",
    shortLabel: "Detached",
    description: "Freestanding homes with broad scope and higher structural complexity.",
  },
  semiDetached: {
    label: "Semi-detached",
    shortLabel: "Semi",
    description: "Shared wall homes with balanced structural and finishing requirements.",
  },
  endTerrace: {
    label: "End of terrace",
    shortLabel: "End terrace",
    description: "End terrace plots with side access and moderate intervention complexity.",
  },
  terracedFlatBack: {
    label: "Terraced - Flat back",
    shortLabel: "Flat back",
    description: "Straight-run terraces with efficient rear extension opportunities.",
  },
  terracedLShaped: {
    label: "Terraced - L shaped",
    shortLabel: "L shaped",
    description: "L-shaped terraces requiring more intricate structural coordination.",
  },
};

export const extensionTypeMeta: Record<
  ExtensionType,
  {
    label: string;
    description: string;
  }
> = {
  rear: {
    label: "Rear extension",
    description: "Extend the rear footprint to open up kitchen, dining, and family zones.",
  },
  side: {
    label: "Side extension",
    description: "Unlock side-return width and improve circulation through key living areas.",
  },
  wraparound: {
    label: "Wraparound extension",
    description: "Combine rear + side additions for a substantial reconfiguration of the ground floor.",
  },
};

export const roofTypeMeta: Record<
  RoofType,
  {
    label: string;
    description: string;
  }
> = {
  flat: {
    label: "Flat roof",
    description: "Contemporary profile with efficient build sequencing and clean detailing.",
  },
  pitched: {
    label: "Pitched roof",
    description: "Traditional silhouette with additional structural and roofing complexity.",
  },
  gable: {
    label: "Gable roof",
    description: "Strong architectural form with premium carpentry and junction detailing.",
  },
  crown: {
    label: "Crown roof",
    description: "High-end stepped roof profile used in larger, design-led extensions.",
  },
};

type BaseCostsMap = Record<ExtensionType, Record<RoofType, Record<PropertyType, CostRange>>>;

type TimelineMap = Record<ExtensionType, Record<RoofType, TimelineRangeWeeks>>;

const roundToNearest500 = (value: number) => Math.round(value / 500) * 500;

const weeksToMonths = (weeks: number): number => Number((weeks / 4.345).toFixed(1));

const baseByExtensionAndRoof: Record<ExtensionType, Record<RoofType, CostRange>> = {
  rear: {
    flat: { min: 72000, max: 98000 },
    pitched: { min: 85000, max: 118000 },
    gable: { min: 90000, max: 126000 },
    crown: { min: 94000, max: 132000 },
  },
  side: {
    flat: { min: 76000, max: 106000 },
    pitched: { min: 83000, max: 114000 },
    gable: { min: 88000, max: 121000 },
    crown: { min: 91000, max: 126000 },
  },
  wraparound: {
    flat: { min: 98000, max: 145000 },
    pitched: { min: 102000, max: 150000 },
    gable: { min: 104000, max: 154000 },
    crown: { min: 108000, max: 160000 },
  },
};

const propertyCostFactors: Record<PropertyType, number> = {
  detached: 1.22,
  semiDetached: 1.08,
  endTerrace: 1.03,
  terracedFlatBack: 0.94,
  terracedLShaped: 0.98,
};

const baseTimelineByExtensionAndRoof: TimelineMap = {
  rear: {
    flat: { min: 10, max: 14 },
    pitched: { min: 12, max: 18 },
    gable: { min: 13, max: 19 },
    crown: { min: 14, max: 20 },
  },
  side: {
    flat: { min: 11, max: 16 },
    pitched: { min: 12, max: 17 },
    gable: { min: 13, max: 19 },
    crown: { min: 14, max: 20 },
  },
  wraparound: {
    flat: { min: 14, max: 21 },
    pitched: { min: 15, max: 22 },
    gable: { min: 15, max: 22 },
    crown: { min: 15, max: 23 },
  },
};

const propertyTimelineOffsets: Record<PropertyType, number> = {
  detached: 2,
  semiDetached: 1,
  endTerrace: 1,
  terracedFlatBack: 0,
  terracedLShaped: 1,
};

export const multipliers = {
  specificationLevel: {
    standard: 1,
    premium: 1.08,
    luxury: 1.18,
  },
  urgency: {
    planned: {
      cost: 1,
      timeline: 1,
    },
    expedited: {
      cost: 1.07,
      timeline: 0.88,
    },
  },
} as const;

const specificationTimelineOffsets: Record<SpecificationLevel, number> = {
  standard: 0,
  premium: 1,
  luxury: 3,
};

const buildBaseCosts = (): BaseCostsMap => {
  const mapped = {} as BaseCostsMap;

  for (const extensionType of extensionTypeOrder) {
    mapped[extensionType] = {} as BaseCostsMap[ExtensionType];

    for (const roofType of roofTypeOrder) {
      mapped[extensionType][roofType] = {} as BaseCostsMap[ExtensionType][RoofType];

      for (const propertyType of propertyTypeOrder) {
        const baseRange = baseByExtensionAndRoof[extensionType][roofType];
        const factor = propertyCostFactors[propertyType];

        mapped[extensionType][roofType][propertyType] = {
          min: roundToNearest500(baseRange.min * factor),
          max: roundToNearest500(baseRange.max * factor),
        };
      }
    }
  }

  return mapped;
};

export const baseCosts = buildBaseCosts();

const defaultModelOptions: Required<PricingModelOptions> = {
  specificationLevel: "standard",
  urgency: "planned",
};

export const isPropertyType = (value: string): value is PropertyType =>
  propertyTypeOrder.includes(value as PropertyType);

export const isExtensionType = (value: string): value is ExtensionType =>
  extensionTypeOrder.includes(value as ExtensionType);

export const isRoofType = (value: string): value is RoofType =>
  roofTypeOrder.includes(value as RoofType);

export const hasCompleteSelections = (
  selections: PricingSelectionsDraft,
): selections is PricingSelections => {
  return Boolean(
    selections.propertyType && selections.extensionType && selections.roofType,
  );
};

export const firstIncompleteStep = (selections: PricingSelectionsDraft): 1 | 2 | 3 => {
  if (!selections.propertyType) {
    return 1;
  }

  if (!selections.extensionType) {
    return 2;
  }

  if (!selections.roofType) {
    return 3;
  }

  return 3;
};

export const calculatePricingOutput = (
  selections: PricingSelections,
  options: PricingModelOptions = {},
): PricingOutput => {
  const activeOptions = {
    ...defaultModelOptions,
    ...options,
  };

  const baseCostRange =
    baseCosts[selections.extensionType][selections.roofType][selections.propertyType];

  const costMultiplier =
    multipliers.specificationLevel[activeOptions.specificationLevel] *
    multipliers.urgency[activeOptions.urgency].cost;

  const costRange = {
    min: roundToNearest500(baseCostRange.min * costMultiplier),
    max: roundToNearest500(baseCostRange.max * costMultiplier),
  };

  const baseTimelineRange =
    baseTimelineByExtensionAndRoof[selections.extensionType][selections.roofType];
  const propertyTimelineOffset = propertyTimelineOffsets[selections.propertyType];
  const specificationOffset =
    specificationTimelineOffsets[activeOptions.specificationLevel];
  const urgencyTimelineMultiplier =
    multipliers.urgency[activeOptions.urgency].timeline;

  const timelineRangeWeeks = {
    min: Math.max(
      8,
      Math.round(
        (baseTimelineRange.min + propertyTimelineOffset + specificationOffset) *
          urgencyTimelineMultiplier,
      ),
    ),
    max: Math.max(
      10,
      Math.round(
        (baseTimelineRange.max + propertyTimelineOffset + specificationOffset) *
          urgencyTimelineMultiplier,
      ),
    ),
  };

  const safeTimelineRangeWeeks = {
    min: Math.min(timelineRangeWeeks.min, timelineRangeWeeks.max - 1),
    max: Math.max(timelineRangeWeeks.max, timelineRangeWeeks.min + 1),
  };

  return {
    costRange,
    timelineRangeWeeks: safeTimelineRangeWeeks,
    timelineRangeMonths: {
      min: weeksToMonths(safeTimelineRangeWeeks.min),
      max: weeksToMonths(safeTimelineRangeWeeks.max),
    },
  };
};

export const getExampleCostCard = (
  selections: PricingSelections,
  options: PricingModelOptions = {},
): ExampleCostCard => {
  const output = calculatePricingOutput(selections, options);

  return {
    ...selections,
    id: `${selections.propertyType}-${selections.extensionType}-${selections.roofType}`,
    title: `${extensionTypeMeta[selections.extensionType].label} · ${roofTypeMeta[selections.roofType].label}`,
    costRange: output.costRange,
    timelineRangeWeeks: output.timelineRangeWeeks,
    timelineRangeMonths: output.timelineRangeMonths,
  };
};

export const getAllExampleCostsForProperty = (
  propertyType: PropertyType,
  options: PricingModelOptions = {},
): ExampleCostCard[] => {
  const cards: ExampleCostCard[] = [];

  for (const extensionType of extensionTypeOrder) {
    for (const roofType of roofTypeOrder) {
      cards.push(
        getExampleCostCard(
          {
            propertyType,
            extensionType,
            roofType,
          },
          options,
        ),
      );
    }
  }

  return cards.sort((first, second) => first.costRange.min - second.costRange.min);
};
