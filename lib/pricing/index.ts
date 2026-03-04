import {
  calculateExtensionEstimate,
  extensionInputSchema,
  extensionPropertyMeta,
  extensionPropertyTypeOrder,
  extensionRoofMeta,
  extensionRoofTypeOrder,
  extensionTypeMeta,
  extensionTypeOrder,
  type ExtensionModelInput,
  type ExtensionPropertyType,
  type ExtensionRoofType,
  type ExtensionType,
} from "@/lib/pricing/extensionModel";
import {
  finishLevelOrder,
  loftFinishMeta,
  projectTypeMeta,
  projectTypeOrder,
  renovationRegionMeta,
  ukRegionMeta,
  ukRegionOrder,
  type FinishLevel,
  type ProjectType,
  type UkRegion,
} from "@/lib/pricing/multipliers";
import {
  calculateLoftEstimate,
  loftInputSchema,
  loftTypeMeta,
  loftTypeOrder,
  type LoftModelInput,
  type LoftType,
} from "@/lib/pricing/loftModel";
import {
  calculateRenovationEstimate,
  renovationInputSchema,
  renovationScopeMeta,
  renovationScopeOrder,
  type RenovationModelInput,
  type RenovationScope,
} from "@/lib/pricing/renovationModel";
import { weeksToMonths, type PricingModelResult } from "@/lib/pricing/utils";

export type {
  ExtensionModelInput,
  ExtensionPropertyType,
  ExtensionRoofType,
  ExtensionType,
  FinishLevel,
  LoftModelInput,
  LoftType,
  PricingModelResult,
  ProjectType,
  RenovationModelInput,
  RenovationScope,
  UkRegion,
};

export {
  extensionInputSchema,
  extensionPropertyMeta,
  extensionPropertyTypeOrder,
  extensionRoofMeta,
  extensionRoofTypeOrder,
  extensionTypeMeta,
  extensionTypeOrder,
  finishLevelOrder,
  loftFinishMeta,
  loftInputSchema,
  loftTypeMeta,
  loftTypeOrder,
  projectTypeMeta,
  projectTypeOrder,
  renovationInputSchema,
  renovationRegionMeta,
  renovationScopeMeta,
  renovationScopeOrder,
  ukRegionMeta,
  ukRegionOrder,
};

export type PricingWizardSelections = {
  projectType: ProjectType | null;
  extension: {
    propertyType: ExtensionPropertyType | null;
    extensionType: ExtensionType | null;
    roofType: ExtensionRoofType | null;
  };
  loft: {
    loftType: LoftType | null;
    sizeM2: number;
    location: UkRegion | null;
    finishLevel: FinishLevel | null;
  };
  renovation: {
    areaM2: number;
    scope: RenovationScope | null;
    location: UkRegion | null;
    finishLevel: FinishLevel | null;
  };
};

export const defaultPricingWizardSelections: PricingWizardSelections = {
  projectType: null,
  extension: {
    propertyType: null,
    extensionType: null,
    roofType: null,
  },
  loft: {
    loftType: null,
    sizeM2: 35,
    location: null,
    finishLevel: null,
  },
  renovation: {
    areaM2: 140,
    scope: null,
    location: null,
    finishLevel: null,
  },
};

export const getStepLabels = (projectType: ProjectType): readonly [string, string, string] => {
  if (projectType === "extension") {
    return ["Property", "Extension", "Roof"] as const;
  }

  if (projectType === "loftConversion") {
    return ["Loft type", "Size + region", "Finish"] as const;
  }

  return ["Scope", "Area + region", "Finish"] as const;
};

export const isProjectComplete = (selections: PricingWizardSelections) => {
  if (selections.projectType === "extension") {
    return Boolean(
      selections.extension.propertyType &&
        selections.extension.extensionType &&
        selections.extension.roofType,
    );
  }

  if (selections.projectType === "loftConversion") {
    return Boolean(
      selections.loft.loftType &&
        selections.loft.location &&
        selections.loft.finishLevel &&
        selections.loft.sizeM2 > 0,
    );
  }

  if (selections.projectType === "fullHouseRenovation") {
    return Boolean(
      selections.renovation.scope &&
        selections.renovation.location &&
        selections.renovation.finishLevel &&
        selections.renovation.areaM2 > 0,
    );
  }

  return false;
};

export const calculateCurrentProject = (
  selections: PricingWizardSelections,
): PricingModelResult | null => {
  if (selections.projectType === "extension") {
    const { propertyType, extensionType, roofType } = selections.extension;

    if (!propertyType || !extensionType || !roofType) {
      return null;
    }

    return calculateExtensionEstimate({ propertyType, extensionType, roofType });
  }

  if (selections.projectType === "loftConversion") {
    const { loftType, sizeM2, location, finishLevel } = selections.loft;

    if (!loftType || !location || !finishLevel) {
      return null;
    }

    return calculateLoftEstimate({
      loftType,
      sizeM2,
      location,
      finishLevel,
    });
  }

  if (selections.projectType === "fullHouseRenovation") {
    const { areaM2, scope, location, finishLevel } = selections.renovation;

    if (!scope || !location || !finishLevel) {
      return null;
    }

    return calculateRenovationEstimate({
      areaM2,
      scope,
      location,
      finishLevel,
    });
  }

  return null;
};

export const buildSelectionRows = (selections: PricingWizardSelections) => {
  if (!selections.projectType) {
    return [] as Array<{ label: string; value: string }>;
  }

  if (selections.projectType === "extension") {
    return [
      {
        label: "Project",
        value: projectTypeMeta.extension.label,
      },
      {
        label: "Property",
        value: selections.extension.propertyType
          ? extensionPropertyMeta[selections.extension.propertyType].label
          : "Not selected",
      },
      {
        label: "Extension",
        value: selections.extension.extensionType
          ? extensionTypeMeta[selections.extension.extensionType].label
          : "Not selected",
      },
      {
        label: "Roof",
        value: selections.extension.roofType
          ? extensionRoofMeta[selections.extension.roofType].label
          : "Not selected",
      },
    ];
  }

  if (selections.projectType === "loftConversion") {
    return [
      {
        label: "Project",
        value: projectTypeMeta.loftConversion.label,
      },
      {
        label: "Loft type",
        value: selections.loft.loftType
          ? loftTypeMeta[selections.loft.loftType].label
          : "Not selected",
      },
      {
        label: "Size",
        value: `${Math.round(selections.loft.sizeM2)} m²`,
      },
      {
        label: "Region",
        value: selections.loft.location
          ? ukRegionMeta[selections.loft.location].label
          : "Not selected",
      },
      {
        label: "Finish",
        value: selections.loft.finishLevel
          ? loftFinishMeta[selections.loft.finishLevel].label
          : "Not selected",
      },
    ];
  }

  return [
    {
      label: "Project",
      value: projectTypeMeta.fullHouseRenovation.label,
    },
    {
      label: "Scope",
      value: selections.renovation.scope
        ? renovationScopeMeta[selections.renovation.scope].label
        : "Not selected",
    },
    {
      label: "Area",
      value: `${Math.round(selections.renovation.areaM2)} m²`,
    },
    {
      label: "Region",
      value: selections.renovation.location
        ? renovationRegionMeta[selections.renovation.location].label
        : "Not selected",
    },
    {
      label: "Finish",
      value: selections.renovation.finishLevel
        ? loftFinishMeta[selections.renovation.finishLevel].label
        : "Not selected",
    },
  ];
};

export const formatTimelineWithMonths = (timelineWeeks: { min: number; max: number }) => ({
  weeks: timelineWeeks,
  months: {
    min: weeksToMonths(timelineWeeks.min),
    max: weeksToMonths(timelineWeeks.max),
  },
});
