"use client";

import { cn } from "@/lib/utils";

type StepProgressProps = {
  currentStep: 0 | 1 | 2 | 3;
  labels: readonly [string, string, string];
  hasProjectType: boolean;
};

export default function StepProgress({
  currentStep,
  labels,
  hasProjectType,
}: StepProgressProps) {
  const progressPercent = hasProjectType ? (currentStep / 3) * 100 : 0;

  return (
    <div className="rounded-2xl border border-[#e3d6c4] bg-white/65 p-4 shadow-[0_14px_32px_rgba(72,51,22,0.09)] supports-backdrop-filter:bg-white/45 sm:p-5 sm:supports-backdrop-filter:backdrop-blur-sm">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[11px] uppercase tracking-[0.32em] text-[#8b775d]">Estimator progress</p>
        <p className="font-(--font-home-serif) text-xl uppercase tracking-[0.08em] text-[#3a3228]">
          {String(currentStep).padStart(2, "0")}/03
        </p>
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#eadfce]">
        <div
          className="h-full rounded-full bg-[#ab9468] transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <ol className="mt-4 grid grid-cols-3 gap-2">
        {labels.map((label, index) => {
          const stepNumber = (index + 1) as 1 | 2 | 3;
          const isActive = hasProjectType && stepNumber === currentStep;
          const isComplete = hasProjectType && stepNumber < currentStep;

          return (
            <li
              key={label}
              className={cn(
                "rounded-xl border px-2 py-2 text-center",
                isActive
                  ? "border-[#ab9468] bg-[#f5eee2]"
                  : isComplete
                    ? "border-[#d7c5ac] bg-[#f8f3eb]"
                    : "border-[#e7ddd0] bg-white",
              )}
            >
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#8b775d]">
                {String(stepNumber).padStart(2, "0")}
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-[#3c3328]">{label}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
