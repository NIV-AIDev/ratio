"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { getCalculatorOptionIcon } from "@/components/pricing/calculatorOptionIcons";
import OptionCard from "@/components/pricing/OptionCard";
import ResultsPanel from "@/components/pricing/ResultsPanel";
import SelectionsSummary from "@/components/pricing/SelectionsSummary";
import StepProgress from "@/components/pricing/StepProgress";
import Container from "@/components/ui/container";
import {
  buildSelectionRows,
  calculateCurrentProject,
  defaultPricingWizardSelections,
  extensionPropertyMeta,
  extensionPropertyTypeOrder,
  extensionRoofMeta,
  extensionRoofTypeOrder,
  extensionTypeMeta,
  extensionTypeOrder,
  finishLevelOrder,
  getStepLabels,
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
  type ExtensionPropertyType,
  type ExtensionRoofType,
  type ExtensionType,
  type FinishLevel,
  type LoftType,
  type PricingWizardSelections,
  type ProjectType,
  type RenovationScope,
  type UkRegion,
} from "@/lib/pricing";
import { cn } from "@/lib/utils";

type WizardStep = 0 | 1 | 2 | 3;

const emptyLabels = ["Step 01", "Step 02", "Step 03"] as const;

const clampNumber = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export default function CalculatorWizard() {
  const prefersReducedMotion = useReducedMotion();
  const [step, setStep] = useState<WizardStep>(0);
  const [selections, setSelections] = useState<PricingWizardSelections>(
    defaultPricingWizardSelections,
  );
  const [loftSizeDraft, setLoftSizeDraft] = useState(
    String(defaultPricingWizardSelections.loft.sizeM2),
  );
  const [renovationAreaDraft, setRenovationAreaDraft] = useState(
    String(defaultPricingWizardSelections.renovation.areaM2),
  );
  const [loftSizeError, setLoftSizeError] = useState<string | null>(null);
  const [renovationAreaError, setRenovationAreaError] = useState<string | null>(null);

  const activeLabels = selections.projectType
    ? getStepLabels(selections.projectType)
    : emptyLabels;

  const estimate = useMemo(() => calculateCurrentProject(selections), [selections]);
  const selectionRows = useMemo(() => buildSelectionRows(selections), [selections]);

  const loftBounds = loftInputSchema.sizeM2;
  const renovationBounds = renovationInputSchema.areaM2;

  const isCurrentStepComplete = useMemo(() => {
    if (step === 0) {
      return Boolean(selections.projectType);
    }

    if (!selections.projectType) {
      return false;
    }

    if (selections.projectType === "extension") {
      if (step === 1) {
        return Boolean(selections.extension.propertyType);
      }

      if (step === 2) {
        return Boolean(selections.extension.extensionType);
      }

      return Boolean(selections.extension.roofType);
    }

    if (selections.projectType === "loftConversion") {
      if (step === 1) {
        return Boolean(selections.loft.loftType);
      }

      if (step === 2) {
        return Boolean(
          selections.loft.location && !loftSizeError && loftSizeDraft.trim() !== "",
        );
      }

      return Boolean(selections.loft.finishLevel);
    }

    if (step === 1) {
      return Boolean(selections.renovation.scope);
    }

    if (step === 2) {
      return Boolean(
        selections.renovation.location &&
          !renovationAreaError &&
          renovationAreaDraft.trim() !== "",
      );
    }

    return Boolean(selections.renovation.finishLevel);
  }, [
    loftSizeDraft,
    loftSizeError,
    renovationAreaDraft,
    renovationAreaError,
    selections,
    step,
  ]);

  const currentHeading = useMemo(() => {
    if (step === 0) {
      return {
        title: "Project type",
        description:
          "Choose the estimator model first. Steps 01–03 then adapt to your selected project.",
      };
    }

    if (!selections.projectType) {
      return {
        title: "Project setup",
        description: "Select a project type at Step 00 to continue.",
      };
    }

    if (selections.projectType === "extension") {
      if (step === 1) {
        return {
          title: "Property type",
          description: "Select your existing property context.",
        };
      }

      if (step === 2) {
        return {
          title: "Extension type",
          description: "Choose the extension configuration you are comparing.",
        };
      }

      return {
        title: "Roof type",
        description: "Choose your roof structure to complete the extension scenario.",
      };
    }

    if (selections.projectType === "loftConversion") {
      if (step === 1) {
        return {
          title: "Loft type",
          description: "Select the conversion style to set structural complexity factors.",
        };
      }

      if (step === 2) {
        return {
          title: "Size and region",
          description: "Input loft size and market region for UK 2026 unit-rate scaling.",
        };
      }

      return {
        title: "Finish level",
        description: "Choose finish intensity to apply fit-out multipliers.",
      };
    }

    if (step === 1) {
      return {
        title: "Renovation scope",
        description: "Select the level of intervention for your property.",
      };
    }

    if (step === 2) {
      return {
        title: "Area and region",
        description: "Set project area and location to apply deterministic scope cost factors.",
      };
    }

    return {
      title: "Finish level",
      description: "Select finish level to position your typical budget within the range.",
    };
  }, [selections.projectType, step]);

  const handleReset = () => {
    setSelections(defaultPricingWizardSelections);
    setStep(0);
    setLoftSizeDraft(String(defaultPricingWizardSelections.loft.sizeM2));
    setRenovationAreaDraft(String(defaultPricingWizardSelections.renovation.areaM2));
    setLoftSizeError(null);
    setRenovationAreaError(null);
  };

  const focusResults = () => {
    const target = document.getElementById("pricing-results");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleNext = () => {
    if (!isCurrentStepComplete) {
      return;
    }

    if (step === 3) {
      focusResults();
      return;
    }

    setStep((current) => Math.min(3, current + 1) as WizardStep);
  };

  const handleBack = () => {
    setStep((current) => Math.max(0, current - 1) as WizardStep);
  };

  const setProjectType = (projectType: ProjectType) => {
    setSelections((current) => ({ ...current, projectType }));
  };

  const handleLoftSizeChange = (draftValue: string) => {
    setLoftSizeDraft(draftValue);

    if (draftValue.trim() === "") {
      setLoftSizeError(`Enter a value between ${loftBounds.min} and ${loftBounds.max}.`);
      return;
    }

    const parsed = Number(draftValue);

    if (!Number.isFinite(parsed)) {
      setLoftSizeError("Enter numbers only.");
      return;
    }

    if (parsed < loftBounds.min || parsed > loftBounds.max) {
      setLoftSizeError(`Use a value between ${loftBounds.min} and ${loftBounds.max}.`);
      return;
    }

    setLoftSizeError(null);
    setSelections((current) => ({
      ...current,
      loft: {
        ...current.loft,
        sizeM2: Math.round(parsed),
      },
    }));
  };

  const commitLoftSize = (value: number) => {
    const safeValue = clampNumber(Math.round(value), loftBounds.min, loftBounds.max);
    setSelections((current) => ({
      ...current,
      loft: {
        ...current.loft,
        sizeM2: safeValue,
      },
    }));
    setLoftSizeDraft(String(safeValue));
    setLoftSizeError(null);
  };

  const handleRenovationAreaChange = (draftValue: string) => {
    setRenovationAreaDraft(draftValue);

    if (draftValue.trim() === "") {
      setRenovationAreaError(
        `Enter a value between ${renovationBounds.min} and ${renovationBounds.max}.`,
      );
      return;
    }

    const parsed = Number(draftValue);

    if (!Number.isFinite(parsed)) {
      setRenovationAreaError("Enter numbers only.");
      return;
    }

    if (parsed < renovationBounds.min || parsed > renovationBounds.max) {
      setRenovationAreaError(
        `Use a value between ${renovationBounds.min} and ${renovationBounds.max}.`,
      );
      return;
    }

    setRenovationAreaError(null);
    setSelections((current) => ({
      ...current,
      renovation: {
        ...current.renovation,
        areaM2: Math.round(parsed),
      },
    }));
  };

  const commitRenovationArea = (value: number) => {
    const safeValue = clampNumber(Math.round(value), renovationBounds.min, renovationBounds.max);
    setSelections((current) => ({
      ...current,
      renovation: {
        ...current.renovation,
        areaM2: safeValue,
      },
    }));
    setRenovationAreaDraft(String(safeValue));
    setRenovationAreaError(null);
  };

  const renderProjectTypeStep = () => (
    <div className="grid gap-4 sm:grid-cols-3">
      {projectTypeOrder.map((projectType) => (
        <OptionCard
          key={projectType}
          title={projectTypeMeta[projectType].label}
          description={projectTypeMeta[projectType].description}
          selected={selections.projectType === projectType}
          onSelect={() => setProjectType(projectType)}
          icon={getCalculatorOptionIcon(projectType)}
        />
      ))}
    </div>
  );

  const renderExtensionStep = () => {
    if (step === 1) {
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          {extensionPropertyTypeOrder.map((propertyType) => (
            <OptionCard
              key={propertyType}
              title={extensionPropertyMeta[propertyType].label}
              description={extensionPropertyMeta[propertyType].description}
              selected={selections.extension.propertyType === propertyType}
              onSelect={() =>
                setSelections((current) => ({
                  ...current,
                  extension: {
                    ...current.extension,
                    propertyType: propertyType as ExtensionPropertyType,
                  },
                }))
              }
              icon={getCalculatorOptionIcon(propertyType)}
            />
          ))}
        </div>
      );
    }

    if (step === 2) {
      return (
        <div className="grid gap-4 sm:grid-cols-3">
          {extensionTypeOrder.map((extensionType) => (
            <OptionCard
              key={extensionType}
              title={extensionTypeMeta[extensionType].label}
              description={extensionTypeMeta[extensionType].description}
              selected={selections.extension.extensionType === extensionType}
              onSelect={() =>
                setSelections((current) => ({
                  ...current,
                  extension: {
                    ...current.extension,
                    extensionType: extensionType as ExtensionType,
                  },
                }))
              }
              icon={getCalculatorOptionIcon(extensionType)}
            />
          ))}
        </div>
      );
    }

    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {extensionRoofTypeOrder.map((roofType) => (
          <OptionCard
            key={roofType}
            title={extensionRoofMeta[roofType].label}
            description={extensionRoofMeta[roofType].description}
            selected={selections.extension.roofType === roofType}
            onSelect={() =>
              setSelections((current) => ({
                ...current,
                extension: {
                  ...current.extension,
                  roofType: roofType as ExtensionRoofType,
                },
              }))
            }
            icon={getCalculatorOptionIcon(roofType)}
          />
        ))}
      </div>
    );
  };

  const renderLoftStep = () => {
    if (step === 1) {
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          {loftTypeOrder.map((loftType) => (
            <OptionCard
              key={loftType}
              title={loftTypeMeta[loftType].label}
              description={loftTypeMeta[loftType].description}
              selected={selections.loft.loftType === loftType}
              onSelect={() =>
                setSelections((current) => ({
                  ...current,
                  loft: {
                    ...current.loft,
                    loftType: loftType as LoftType,
                  },
                }))
              }
              icon={getCalculatorOptionIcon(loftType)}
            />
          ))}
        </div>
      );
    }

    if (step === 2) {
      return (
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-[220px_1fr] sm:items-center">
            <label htmlFor="loft-size" className="space-y-2">
              <span className="block text-[11px] uppercase tracking-[0.24em] text-[#8f7c63]">Loft size (m²)</span>
              <input
                id="loft-size"
                aria-label="Loft size in square metres"
                type="number"
                min={loftBounds.min}
                max={loftBounds.max}
                value={loftSizeDraft}
                onChange={(event) => handleLoftSizeChange(event.target.value)}
                onBlur={() => commitLoftSize(Number(loftSizeDraft) || loftBounds.min)}
                className="w-full rounded-xl border border-[#dbcdb8] bg-[#faf7f2] px-4 py-3 text-lg font-medium text-[#2f2922] outline-none transition-colors focus:border-[#ab9468]"
              />
            </label>

            <div className="space-y-2">
              <input
                aria-label="Adjust loft size"
                type="range"
                min={loftBounds.min}
                max={loftBounds.max}
                value={selections.loft.sizeM2}
                onChange={(event) => commitLoftSize(Number(event.target.value))}
                className="w-full accent-[#ab9468]"
              />
              <p className="text-xs text-[#726656]">
                Range {loftBounds.min}–{loftBounds.max} m².
              </p>
            </div>
          </div>

          {loftSizeError ? <p className="text-sm text-[#a0473e]">{loftSizeError}</p> : null}

          <div className="grid gap-4 sm:grid-cols-2">
            {(Object.keys(ukRegionMeta) as UkRegion[]).map((region) => (
              <OptionCard
                key={region}
                title={ukRegionMeta[region].label}
                description={`Location factor ${ukRegionMeta[region].factor.min.toFixed(2)}–${ukRegionMeta[region].factor.max.toFixed(2)}`}
                selected={selections.loft.location === region}
                onSelect={() =>
                  setSelections((current) => ({
                    ...current,
                    loft: {
                    ...current.loft,
                    location: region,
                  },
                }))
              }
                icon={getCalculatorOptionIcon(region)}
              />
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="grid gap-4 sm:grid-cols-3">
        {finishLevelOrder.map((finishLevel) => (
          <OptionCard
            key={finishLevel}
            title={loftFinishMeta[finishLevel].label}
            description={`Finish factor ${loftFinishMeta[finishLevel].factor.min.toFixed(2)}–${loftFinishMeta[finishLevel].factor.max.toFixed(2)}`}
            selected={selections.loft.finishLevel === finishLevel}
            onSelect={() =>
              setSelections((current) => ({
                ...current,
                loft: {
                  ...current.loft,
                  finishLevel: finishLevel as FinishLevel,
                },
              }))
            }
            icon={getCalculatorOptionIcon(finishLevel)}
          />
        ))}
      </div>
    );
  };

  const renderRenovationStep = () => {
    if (step === 1) {
      return (
        <div className="grid gap-4 sm:grid-cols-3">
          {renovationScopeOrder.map((scope) => (
            <OptionCard
              key={scope}
              title={renovationScopeMeta[scope].label}
              description={renovationScopeMeta[scope].description}
              selected={selections.renovation.scope === scope}
              onSelect={() =>
                setSelections((current) => ({
                  ...current,
                  renovation: {
                    ...current.renovation,
                    scope: scope as RenovationScope,
                  },
                }))
              }
              icon={getCalculatorOptionIcon(scope)}
            />
          ))}
        </div>
      );
    }

    if (step === 2) {
      return (
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-[220px_1fr] sm:items-center">
            <label htmlFor="renovation-area" className="space-y-2">
              <span className="block text-[11px] uppercase tracking-[0.24em] text-[#8f7c63]">Property area (m²)</span>
              <input
                id="renovation-area"
                aria-label="Renovation property area in square metres"
                type="number"
                min={renovationBounds.min}
                max={renovationBounds.max}
                value={renovationAreaDraft}
                onChange={(event) => handleRenovationAreaChange(event.target.value)}
                onBlur={() =>
                  commitRenovationArea(Number(renovationAreaDraft) || renovationBounds.min)
                }
                className="w-full rounded-xl border border-[#dbcdb8] bg-[#faf7f2] px-4 py-3 text-lg font-medium text-[#2f2922] outline-none transition-colors focus:border-[#ab9468]"
              />
            </label>

            <div className="space-y-2">
              <input
                aria-label="Adjust property area"
                type="range"
                min={renovationBounds.min}
                max={renovationBounds.max}
                value={selections.renovation.areaM2}
                onChange={(event) => commitRenovationArea(Number(event.target.value))}
                className="w-full accent-[#ab9468]"
              />
              <p className="text-xs text-[#726656]">
                Range {renovationBounds.min}–{renovationBounds.max} m².
              </p>
            </div>
          </div>

          {renovationAreaError ? (
            <p className="text-sm text-[#a0473e]">{renovationAreaError}</p>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            {(Object.keys(renovationRegionMeta) as UkRegion[]).map((region) => (
              <OptionCard
                key={region}
                title={renovationRegionMeta[region].label}
                description={`Location factor ${renovationRegionMeta[region].factor.min.toFixed(2)}–${renovationRegionMeta[region].factor.max.toFixed(2)}`}
                selected={selections.renovation.location === region}
                onSelect={() =>
                  setSelections((current) => ({
                    ...current,
                    renovation: {
                    ...current.renovation,
                    location: region,
                  },
                }))
              }
                icon={getCalculatorOptionIcon(region)}
              />
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="grid gap-4 sm:grid-cols-3">
        {finishLevelOrder.map((finishLevel) => (
          <OptionCard
            key={finishLevel}
            title={loftFinishMeta[finishLevel].label}
            description="Used to position typical cost inside your calculated range."
            selected={selections.renovation.finishLevel === finishLevel}
            onSelect={() =>
              setSelections((current) => ({
                ...current,
                renovation: {
                  ...current.renovation,
                  finishLevel: finishLevel as FinishLevel,
                },
              }))
            }
            icon={getCalculatorOptionIcon(finishLevel)}
          />
        ))}
      </div>
    );
  };

  const renderCurrentStep = () => {
    if (step === 0) {
      return renderProjectTypeStep();
    }

    if (!selections.projectType) {
      return (
        <div className="rounded-2xl border border-[#e7ddd0] bg-[#fcfaf7] p-5 text-sm text-[#665b4f]">
          Select a project type first to continue through steps 01–03.
        </div>
      );
    }

    if (selections.projectType === "extension") {
      return renderExtensionStep();
    }

    if (selections.projectType === "loftConversion") {
      return renderLoftStep();
    }

    return renderRenovationStep();
  };

  const motionProps = prefersReducedMotion
    ? { initial: { opacity: 1, x: 0 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 1, x: 0 } }
    : { initial: { opacity: 0, x: 8 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -8 } };

  return (
    <section className="relative overflow-hidden bg-[#f6f2ec] py-14 sm:py-18">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top,rgba(171,148,104,0.22),transparent_74%)]" />

      <Container className="relative grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
        <div className="space-y-7">
          <StepProgress
            currentStep={step}
            labels={activeLabels}
            hasProjectType={Boolean(selections.projectType)}
          />

          <section className="rounded-3xl border border-[#dfd4c4] bg-white p-5 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.32em] text-[#8a765c]">
                  {String(step).padStart(2, "0")}/03
                </p>
                <h2 className="mt-2 font-(--font-home-serif) text-3xl uppercase tracking-[0.08em] text-[#2f281f]">
                  {currentHeading.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#675c4f]">{currentHeading.description}</p>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="rounded-full border border-[#d8cab6] bg-white/70 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-[#8a765b] transition-all hover:border-[#ab9468] hover:bg-[#f5efe6]"
              >
                Reset
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${selections.projectType ?? "none"}-${step}`}
                className="mt-5"
                initial={motionProps.initial}
                animate={motionProps.animate}
                exit={motionProps.exit}
                transition={{ duration: prefersReducedMotion ? 0.01 : 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                {renderCurrentStep()}
              </motion.div>
            </AnimatePresence>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-[#ece3d7] pt-5">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 0}
                className="inline-flex rounded-full border border-[#d3c4ad] px-5 py-2 text-[11px] uppercase tracking-[0.26em] text-[#7e6b52] transition-colors hover:border-[#ab9468] hover:bg-[#f5eee2] disabled:cursor-not-allowed disabled:opacity-45"
              >
                Back
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={!isCurrentStepComplete}
                className="group relative inline-flex rounded-full bg-[#ab9468] px-6 py-2 text-[11px] uppercase tracking-[0.28em] text-white transition-all hover:bg-[#937b52] hover:shadow-[0_0_22px_rgba(171,148,104,0.36)] disabled:cursor-not-allowed disabled:bg-[#c9bb9f]"
              >
                <span>{step < 3 ? "Next step" : "See your costs"}</span>
                <span className="absolute inset-x-5 bottom-1 h-px bg-white/0 transition-colors group-hover:bg-white/70" />
              </button>
            </div>
          </section>

          <div id="pricing-results">
            <ResultsPanel
              projectType={selections.projectType}
              estimate={estimate}
              selectionRows={selectionRows}
            />
          </div>
        </div>

        <div className={cn("lg:min-h-[320px]")}>
          <SelectionsSummary selections={selections} onReset={handleReset} />
        </div>
      </Container>

      <motion.button
        type="button"
        onClick={handleReset}
        whileHover={prefersReducedMotion ? undefined : { y: -2 }}
        className="fixed bottom-5 right-5 z-30 hidden rounded-full border border-[#d9cab6] bg-white/78 px-5 py-2 text-[10px] uppercase tracking-[0.28em] text-[#826f53] shadow-[0_10px_26px_rgba(54,35,8,0.16)] transition-colors hover:border-[#ab9468] hover:bg-[#f7f1e7] supports-backdrop-filter:bg-white/56 supports-backdrop-filter:backdrop-blur-md sm:inline-flex"
      >
        Reset estimator
      </motion.button>
    </section>
  );
}
