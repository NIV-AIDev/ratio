export type NumericRange = {
  min: number;
  max: number;
};

export type PricingModelResult = {
  minCost: number;
  maxCost: number;
  typicalCost: number;
  timelineWeeks: NumericRange;
  assumptions: string[];
  exclusions: string[];
  formula: string;
};

export const clampNumber = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export const roundToNearest = (value: number, step: number) =>
  Math.round(value / step) * step;

export const roundCurrency = (value: number) => roundToNearest(value, 500);

export const midpoint = (range: NumericRange) => (range.min + range.max) / 2;

export const ensureRange = (range: NumericRange): NumericRange => ({
  min: Math.min(range.min, range.max),
  max: Math.max(range.min, range.max),
});

export const multiplyRanges = (...ranges: NumericRange[]): NumericRange => {
  const result = ranges.reduce(
    (acc, range) => ({
      min: acc.min * range.min,
      max: acc.max * range.max,
    }),
    { min: 1, max: 1 },
  );

  return ensureRange(result);
};

export const weeksToMonths = (weeks: number) => Number((weeks / 4.345).toFixed(1));
