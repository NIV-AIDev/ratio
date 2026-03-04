"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { ExampleCostCard, PricingSelectionsDraft } from "@/lib/pricing/model";
import {
  extensionTypeMeta,
  propertyTypeMeta,
  roofTypeMeta,
} from "@/lib/pricing/model";
import {
  pricingContactSchema,
  sanitizePricingContactFormValues,
  type PricingContactFormValues,
} from "@/lib/validation/pricing-contact";
import { cn } from "@/lib/utils";

type PricingContactFormProps = {
  selections: PricingSelectionsDraft;
  yourExample: ExampleCostCard | null;
};

type FormStatus = {
  type: "success" | "error";
  message: string;
};

const inputClassName =
  "w-full rounded-xl border border-[#d9ccba] bg-[#fcf9f4] px-4 py-3 text-sm text-[#2f2922] outline-none transition-colors placeholder:text-[#9d8d78] focus:border-[#ab9468]";

export default function PricingContactForm({
  selections,
  yourExample,
}: PricingContactFormProps) {
  const [status, setStatus] = useState<FormStatus | null>(null);
  const [messageLength, setMessageLength] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PricingContactFormValues>({
    resolver: zodResolver(pricingContactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      postcode: "",
      message: "",
      consent: false,
    },
  });

  const messageField = register("message", {
    onChange: (event) => {
      setMessageLength(String(event.target.value ?? "").length);
    },
  });

  const onSubmit = async (values: PricingContactFormValues) => {
    setStatus(null);

    try {
      sanitizePricingContactFormValues(values);

      await new Promise((resolve) => {
        window.setTimeout(resolve, 700);
      });

      reset();
      setMessageLength(0);
      setStatus({
        type: "success",
        message: "Thanks. Your consultation request has been captured and our team will contact you shortly.",
      });
    } catch {
      setStatus({
        type: "error",
        message: "Please review the fields and try again.",
      });
    }
  };

  const submissionBlocked = !yourExample;

  return (
    <section className="rounded-3xl border border-[#ddcfbb] bg-white p-6 sm:p-8">
      <h3 className="font-(--font-home-serif) text-3xl uppercase tracking-[0.08em] text-[#2f281f]">
        Request a consultation
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-[#675c4f]">
        Share your details and we&apos;ll prepare next-step guidance for your project scope.
      </p>

      <div className="mt-5 rounded-2xl border border-[#eadfce] bg-[#faf6f0] p-4 text-sm text-[#5f5447]">
        <p className="text-[10px] uppercase tracking-[0.24em] text-[#8a755b]">Current calculator selections</p>
        <p className="mt-2">
          Property: {selections.propertyType ? propertyTypeMeta[selections.propertyType].label : "Not selected"}
        </p>
        <p>
          Extension: {selections.extensionType ? extensionTypeMeta[selections.extensionType].label : "Not selected"}
        </p>
        <p>Roof: {selections.roofType ? roofTypeMeta[selections.roofType].label : "Not selected"}</p>
      </div>

      <form className="mt-6 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="pricing-full-name" className="text-[11px] uppercase tracking-[0.26em] text-[#8b775d]">
              Full name*
            </label>
            <input
              id="pricing-full-name"
              maxLength={80}
              autoComplete="name"
              className={inputClassName}
              {...register("fullName")}
            />
            {errors.fullName ? <p className="mt-1 text-xs text-[#a44d42]">{errors.fullName.message}</p> : null}
          </div>

          <div>
            <label htmlFor="pricing-email" className="text-[11px] uppercase tracking-[0.26em] text-[#8b775d]">
              Email address*
            </label>
            <input
              id="pricing-email"
              type="email"
              maxLength={120}
              autoComplete="email"
              className={inputClassName}
              {...register("email")}
            />
            {errors.email ? <p className="mt-1 text-xs text-[#a44d42]">{errors.email.message}</p> : null}
          </div>

          <div>
            <label htmlFor="pricing-phone" className="text-[11px] uppercase tracking-[0.26em] text-[#8b775d]">
              Phone number*
            </label>
            <input
              id="pricing-phone"
              type="tel"
              maxLength={24}
              autoComplete="tel"
              className={inputClassName}
              {...register("phone")}
            />
            {errors.phone ? <p className="mt-1 text-xs text-[#a44d42]">{errors.phone.message}</p> : null}
          </div>

          <div>
            <label htmlFor="pricing-postcode" className="text-[11px] uppercase tracking-[0.26em] text-[#8b775d]">
              Postcode*
            </label>
            <input
              id="pricing-postcode"
              maxLength={12}
              autoComplete="postal-code"
              className={inputClassName}
              {...register("postcode")}
            />
            {errors.postcode ? <p className="mt-1 text-xs text-[#a44d42]">{errors.postcode.message}</p> : null}
          </div>
        </div>

        <div>
          <label htmlFor="pricing-message" className="text-[11px] uppercase tracking-[0.26em] text-[#8b775d]">
            Project message*
          </label>
          <textarea
            id="pricing-message"
            rows={5}
            maxLength={1200}
            className={cn(inputClassName, "resize-y")}
            placeholder="Briefly outline your goals, timing, and any constraints."
            {...messageField}
          />
          <div className="mt-1 flex items-center justify-between text-xs text-[#7a6d5e]">
            <span>{errors.message ? errors.message.message : "Minimum 20 characters."}</span>
            <span>{messageLength}/1200</span>
          </div>
        </div>

        <label className="flex items-start gap-2 text-sm text-[#615648]">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-[#b79c73] accent-[#ab9468]"
            {...register("consent")}
          />
          <span>I agree to be contacted about my pricing enquiry.</span>
        </label>
        {errors.consent ? <p className="-mt-2 text-xs text-[#a44d42]">{errors.consent.message}</p> : null}

        {status ? (
          <div
            className={cn(
              "rounded-xl border px-4 py-3 text-sm",
              status.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-rose-200 bg-rose-50 text-rose-700",
            )}
          >
            {status.message}
          </div>
        ) : null}

        {submissionBlocked ? (
          <p className="text-sm text-[#7b6d5d]">
            Complete all three calculator selections to submit this consultation request.
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting || submissionBlocked}
          className="inline-flex w-fit items-center rounded-full bg-[#ab9468] px-6 py-3 text-[11px] uppercase tracking-[0.3em] text-white transition-colors hover:bg-[#937b52] disabled:cursor-not-allowed disabled:bg-[#c5b79f]"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </section>
  );
}
