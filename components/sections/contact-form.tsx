"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import {
  contactSchema,
  type ContactFormValues,
} from "@/lib/validation/contact";
import SectionHeading from "@/components/sections/section-heading";
import SectionShell from "@/components/sections/section-shell";

type FormStatus = {
  type: "success" | "error";
  message: string;
};

const inputClassName =
  "w-full border border-zinc-200/70 bg-white px-4 py-3 text-sm uppercase tracking-[0.2em] text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200";

export default function ContactFormSection() {
  const [status, setStatus] = useState<FormStatus | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setStatus(null);
    trackEvent({ event: "contact_form_submit_attempt" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const payload = (await response.json().catch(() => null)) as
        | { message?: string; errors?: Record<string, string[]> }
        | null;

      if (!response.ok) {
        const message =
          payload?.message ?? "Unable to send your message right now.";
        setStatus({ type: "error", message });
        trackEvent({
          event: "contact_form_submit_error",
          status: response.status,
        });
        return;
      }

      reset();
      setStatus({
        type: "success",
        message: payload?.message ?? "Message sent. We will be in touch soon.",
      });
      trackEvent({ event: "contact_form_submit_success" });
    } catch (error) {
      console.error("Contact form submission failed", error);
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again shortly.",
      });
      trackEvent({ event: "contact_form_submit_error", status: "network" });
    }
  };

  const handleFirstInteraction = () => {
    if (status?.type === "success") {
      return;
    }

    trackEvent({ event: "contact_form_start" });
  };

  return (
    <SectionShell id="contact-form">
      <SectionHeading
        label="Contact"
        title="Start a project inquiry"
        description="Share a few details and we will respond with next steps."
        as="h2"
      />
      <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="contact-name"
              className="text-[11px] uppercase tracking-[0.3em] text-zinc-500"
            >
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              autoComplete="name"
              className={inputClassName}
              onFocus={handleFirstInteraction}
              {...register("name")}
            />
            {errors.name ? (
              <p className="text-[11px] uppercase tracking-[0.3em] text-rose-500">
                {errors.name.message}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="contact-email"
              className="text-[11px] uppercase tracking-[0.3em] text-zinc-500"
            >
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              autoComplete="email"
              className={inputClassName}
              onFocus={handleFirstInteraction}
              {...register("email")}
            />
            {errors.email ? (
              <p className="text-[11px] uppercase tracking-[0.3em] text-rose-500">
                {errors.email.message}
              </p>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="contact-subject"
            className="text-[11px] uppercase tracking-[0.3em] text-zinc-500"
          >
            Subject
          </label>
          <input
            id="contact-subject"
            type="text"
            className={inputClassName}
            onFocus={handleFirstInteraction}
            {...register("subject")}
          />
          {errors.subject ? (
            <p className="text-[11px] uppercase tracking-[0.3em] text-rose-500">
              {errors.subject.message}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="contact-message"
            className="text-[11px] uppercase tracking-[0.3em] text-zinc-500"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            className={cn(inputClassName, "min-h-[160px] resize-none")}
            onFocus={handleFirstInteraction}
            {...register("message")}
          />
          {errors.message ? (
            <p className="text-[11px] uppercase tracking-[0.3em] text-rose-500">
              {errors.message.message}
            </p>
          ) : null}
        </div>
        {status ? (
          <div
            className={cn(
              "rounded border px-4 py-3 text-[11px] uppercase tracking-[0.3em]",
              status.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-rose-200 bg-rose-50 text-rose-700",
            )}
          >
            {status.message}
          </div>
        ) : null}
        <button
          type="submit"
          className="w-fit border border-zinc-900 px-6 py-3 text-[11px] uppercase tracking-[0.35em] text-zinc-900 transition-opacity disabled:opacity-60"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send message"}
        </button>
      </form>
    </SectionShell>
  );
}
