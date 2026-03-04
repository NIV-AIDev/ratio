import {
  midpoint,
  roundCurrency,
  type NumericRange,
  type PricingModelResult,
} from "@/lib/pricing/utils";

export type ExtensionPropertyType =
  | "detached"
  | "semiDetached"
  | "endTerrace"
  | "terracedFlatBack"
  | "terracedLShaped";

export type ExtensionType = "rear" | "side" | "wraparound";

export type ExtensionRoofType = "flat" | "pitched" | "gable" | "crown";

export type ExtensionModelInput = {
  propertyType: ExtensionPropertyType;
  extensionType: ExtensionType;
  roofType: ExtensionRoofType;
};

export const extensionPropertyTypeOrder: ExtensionPropertyType[] = [
  "detached",
  "semiDetached",
  "endTerrace",
  "terracedFlatBack",
  "terracedLShaped",
];

export const extensionTypeOrder: ExtensionType[] = ["rear", "side", "wraparound"];

export const extensionRoofTypeOrder: ExtensionRoofType[] = [
  "flat",
  "pitched",
  "gable",
  "crown",
];

export const extensionPropertyMeta: Record<
  ExtensionPropertyType,
  { label: string; description: string }
> = {
  detached: {
    label: "Detached",
    description: "Freestanding homes with broader structural scope.",
  },
  semiDetached: {
    label: "Semi-detached",
    description: "Shared-wall homes with moderate complexity.",
  },
  endTerrace: {
    label: "End terrace",
    description: "End plots with side access and mixed constraints.",
  },
  terracedFlatBack: {
    label: "Terraced flat-back",
    description: "Straight terraces suited to efficient rear expansion.",
  },
  terracedLShaped: {
    label: "Terraced L-shaped",
    description: "L-plan terraces requiring more intricate junctions.",
  },
};

export const extensionTypeMeta: Record<ExtensionType, { label: string; description: string }> = {
  rear: {
    label: "Rear extension",
    description: "Open-plan rear additions for kitchen-living zones.",
  },
  side: {
    label: "Side extension",
    description: "Side-return footprint gains and improved circulation.",
  },
  wraparound: {
    label: "Wraparound extension",
    description: "Combined rear + side extension with larger reconfiguration.",
  },
};

export const extensionRoofMeta: Record<
  ExtensionRoofType,
  { label: string; description: string }
> = {
  flat: {
    label: "Flat roof",
    description: "Contemporary profile and efficient sequencing.",
  },
  pitched: {
    label: "Pitched roof",
    description: "Traditional profile with added roofing complexity.",
  },
  gable: {
    label: "Gable roof",
    description: "Premium carpentry and detailed structural form.",
  },
  crown: {
    label: "Crown roof",
    description: "High-spec stepped roof profile for large schemes.",
  },
};

const baseByExtensionAndRoof: Record<ExtensionType, Record<ExtensionRoofType, NumericRange>> = {
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

const propertyCostFactors: Record<ExtensionPropertyType, number> = {
  detached: 1.22,
  semiDetached: 1.08,
  endTerrace: 1.03,
  terracedFlatBack: 0.94,
  terracedLShaped: 0.98,
};

const timelineByExtensionAndRoof: Record<
  ExtensionType,
  Record<ExtensionRoofType, NumericRange>
> = {
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

const propertyTimelineOffsets: Record<ExtensionPropertyType, number> = {
  detached: 2,
  semiDetached: 1,
  endTerrace: 1,
  terracedFlatBack: 0,
  terracedLShaped: 1,
};

const buildBaseCostTable = () => {
  const mapped = {} as Record<
    ExtensionType,
    Record<ExtensionRoofType, Record<ExtensionPropertyType, NumericRange>>
  >;

  for (const extensionType of extensionTypeOrder) {
    mapped[extensionType] = {} as Record<
      ExtensionRoofType,
      Record<ExtensionPropertyType, NumericRange>
    >;

    for (const roofType of extensionRoofTypeOrder) {
      mapped[extensionType][roofType] = {} as Record<ExtensionPropertyType, NumericRange>;

      for (const propertyType of extensionPropertyTypeOrder) {
        const factor = propertyCostFactors[propertyType];
        const baseRange = baseByExtensionAndRoof[extensionType][roofType];

        mapped[extensionType][roofType][propertyType] = {
          min: roundCurrency(baseRange.min * factor),
          max: roundCurrency(baseRange.max * factor),
        };
      }
    }
  }

  return mapped;
};

export const extensionBaseCostTable = buildBaseCostTable();

export const extensionInputSchema = {
  propertyTypes: extensionPropertyTypeOrder,
  extensionTypes: extensionTypeOrder,
  roofTypes: extensionRoofTypeOrder,
} as const;

export const calculateExtensionEstimate = (input: ExtensionModelInput): PricingModelResult => {
  const costRange = extensionBaseCostTable[input.extensionType][input.roofType][input.propertyType];
  const baseTimeline = timelineByExtensionAndRoof[input.extensionType][input.roofType];
  const timelineOffset = propertyTimelineOffsets[input.propertyType];

  const timelineWeeks = {
    min: Math.max(8, baseTimeline.min + timelineOffset),
    max: Math.max(10, baseTimeline.max + timelineOffset),
  };

  return {
    minCost: roundCurrency(costRange.min),
    maxCost: roundCurrency(costRange.max),
    typicalCost: roundCurrency(midpoint(costRange)),
    timelineWeeks,
    assumptions: [
      "Includes structure, shell works, standard MEP allowances, and contractor preliminaries.",
      "Assumes clear access and no abnormal ground conditions.",
      "Assumes planning/design routes are already aligned with extension strategy.",
      "Contingency guidance: allow 10% to 15% for project-specific risk.",
    ],
    exclusions: [
      "Statutory fees, planning consultant fees, and party wall awards.",
      "Bespoke joinery packages, specialist AV, and loose furniture.",
      "Client change instructions after contract award.",
    ],
    formula:
      "CostRange = extensionBaseCostTable[extensionType][roofType][propertyType] (deterministic table lookup)",
  };
};
