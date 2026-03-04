"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useReducedMotion } from "framer-motion";
import { useForm } from "react-hook-form";
import { SocialMediaIcon } from "@/components/navigation/social-media";
import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import {
  contactBudgetRangeOptions,
  contactPageSchema,
  contactProjectTypeOptions,
  sanitizeContactPageFormValues,
  type ContactPageFormValues,
} from "@/lib/validation/contact-page";
import { cn } from "@/lib/utils";

type FormStatus = {
  type: "success" | "error";
  message: string;
};

type ContactApiResponse = {
  message?: string;
  errors?: Record<string, string[]>;
};

const luxuryEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const revealIn = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.82, ease: luxuryEase },
  },
};

const primaryButtonClassName =
  "inline-flex items-center justify-center rounded-full bg-[#ab9468] px-6 py-3 text-[11px] uppercase tracking-[0.32em] text-[#1a1a18] transition duration-300 hover:bg-[#977f55] disabled:cursor-not-allowed disabled:bg-[#c7b89f]";

const fieldLabelClassName = "text-[11px] uppercase tracking-[0.28em] text-[#8a755b]";

const fieldClassName =
  "mt-2 w-full border-b border-[#d4c5b2] bg-transparent px-0 py-3 text-base text-[#2f2a24] outline-none transition-colors placeholder:text-[#a19381] focus:border-[#ab9468]";

const selectClassName =
  "mt-2 w-full border-b border-[#d4c5b2] bg-transparent px-0 py-3 text-base text-[#2f2a24] outline-none transition-colors focus:border-[#ab9468]";

const defaultValues: ContactPageFormValues = {
  fullName: "",
  email: "",
  phone: "",
  projectType: "",
  budgetRange: "",
  message: "",
};

const heroContactIconLinks = [
  {
    id: "phone",
    type: "phone",
    href: "tel:+447983996669",
    ariaLabel: "Call The Ratio",
  },
  {
    id: "instagram",
    type: "social",
    platform: "Instagram",
    href: "https://www.instagram.com",
    ariaLabel: "Instagram",
  },
  {
    id: "linkedin",
    type: "social",
    platform: "LinkedIn",
    href: "https://www.linkedin.com",
    ariaLabel: "LinkedIn",
  },
  {
    id: "houzz",
    type: "social",
    platform: "Houzz",
    href: "https://www.houzz.co.uk",
    ariaLabel: "Houzz",
  },
  {
    id: "location",
    type: "location",
    href: "#office-map",
    ariaLabel: "Jump to office map",
  },
] as const;

export default function ContactPageContent() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [status, setStatus] = useState<FormStatus | null>(null);
  const [messageLength, setMessageLength] = useState(0);
  const [submissionLocked, setSubmissionLocked] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactPageFormValues>({
    resolver: zodResolver(contactPageSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const messageField = register("message", {
    onChange: (event) => {
      setMessageLength(String(event.target.value ?? "").length);
      if (status) {
        setStatus(null);
      }
    },
  });

  const onSubmit = async (values: ContactPageFormValues) => {
    if (submissionLocked) {
      return;
    }

    setSubmissionLocked(true);
    setStatus(null);

    try {
      const sanitized = sanitizeContactPageFormValues(values);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanitized),
      });

      const payload = (await response.json().catch(() => null)) as ContactApiResponse | null;

      if (!response.ok) {
        throw new Error(payload?.message ?? "Unable to send your enquiry right now.");
      }

      reset(defaultValues);
      setMessageLength(0);
      setStatus({
        type: "success",
        message: payload?.message ?? "Thank you. Your enquiry has been received and our team will respond shortly.",
      });
    } catch (error) {
      const fallbackMessage = "We could not send your enquiry right now. Please try again in a moment.";

      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : fallbackMessage,
      });
    } finally {
      setSubmissionLocked(false);
    }
  };

  const disableSubmit = submissionLocked || isSubmitting;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const isPricingSource = params.get("source") === "pricing";
    const pricingPrefillMessage = isPricingSource ? params.get("prefill") : null;

    if (isPricingSource) {
      requestAnimationFrame(() => {
        const contactForm = document.getElementById("contact-form");
        if (!contactForm) {
          return;
        }

        contactForm.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start",
        });
      });
    }

    if (!pricingPrefillMessage) {
      return;
    }

    const normalizedMessage = pricingPrefillMessage.trim().slice(0, 1200);
    if (!normalizedMessage) {
      return;
    }

    setValue("message", normalizedMessage);
    setMessageLength(normalizedMessage.length);
  }, [prefersReducedMotion, setValue]);

  const handleMapIconClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const mapSection = document.getElementById("office-map");
    if (!mapSection) {
      return;
    }

    mapSection.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <>
      <Section className="relative overflow-hidden bg-[#110f0d] pb-14 pt-28 text-white sm:pb-16 sm:pt-32 lg:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(171,148,104,0.24),transparent_56%)]" />
        <Container className="relative grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-end">
          <motion.div
            variants={revealIn}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            className="max-w-2xl space-y-5"
          >
            <p className="text-[11px] uppercase tracking-[0.4em] text-white/65">Contact</p>
            <h1 className="font-(--font-home-serif) text-4xl uppercase leading-tight tracking-[0.08em] sm:text-5xl lg:text-6xl">
              Start your project conversation.
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-white/78 sm:text-lg">
              Share your scope, timing, and aspirations. We&apos;ll come back with the right next step for your
              project.
            </p>
          </motion.div>

          <motion.div
            variants={revealIn}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            transition={prefersReducedMotion ? { duration: 0.01 } : { delay: 0.06, duration: 0.82, ease: luxuryEase }}
            className="rounded-3xl border border-white/20 bg-white/8 p-6 supports-backdrop-filter:bg-white/6 supports-backdrop-filter:backdrop-blur-md sm:p-7"
          >
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/68">Direct contact</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              {heroContactIconLinks.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  aria-label={item.ariaLabel}
                  target={item.type === "social" ? "_blank" : undefined}
                  rel={item.type === "social" ? "noreferrer" : undefined}
                  onClick={item.type === "location" ? handleMapIconClick : undefined}
                  className="group inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-white/25 text-white/70 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d7bf96]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#110f0d] hover:border-[#b6814b] hover:text-[#b6814b]"
                >
                  {item.type === "social" ? (
                    <SocialMediaIcon platform={item.platform} className="h-full w-full scale-[1.15]" />
                  ) : null}
                  {item.type === "phone" ? (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-[85%] w-[85%]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 4h4l1.5 4-2 2a14.5 14.5 0 0 0 5.5 5.5l2-2L20 15v4a2 2 0 0 1-2.2 2A16.8 16.8 0 0 1 3 6.2 2 2 0 0 1 5 4Z" />
                    </svg>
                  ) : null}
                  {item.type === "location" ? (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-[85%] w-[85%]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12 21s6-5.7 6-10a6 6 0 1 0-12 0c0 4.3 6 10 6 10Z" />
                      <circle cx="12" cy="11" r="2.2" />
                    </svg>
                  ) : null}
                </a>
              ))}
            </div>
            <Link
              href="#contact-form"
              className="mt-7 inline-flex border-b border-[#d7bf96] pb-1 text-[11px] uppercase tracking-[0.28em] text-[#d7bf96] transition-colors hover:text-[#ecd9ba]"
            >
              Complete enquiry form
            </Link>
          </motion.div>
        </Container>
      </Section>

      <Section className="relative overflow-hidden bg-[#f6f1e8] py-14 sm:py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(171,148,104,0.16),transparent)]" />

        <Container className="relative grid gap-7 lg:grid-cols-[minmax(0,1.16fr)_minmax(0,0.84fr)] lg:items-start">
          <motion.form
            id="contact-form"
            variants={revealIn}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.22 }}
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-[28px] border border-[#dfd0bd] bg-white/88 p-6 shadow-[0_18px_42px_rgba(45,31,12,0.1)] supports-backdrop-filter:bg-white/72 supports-backdrop-filter:backdrop-blur-md sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-full-name" className={fieldLabelClassName}>
                  Full name*
                </label>
                <input
                  id="contact-full-name"
                  autoComplete="name"
                  maxLength={80}
                  className={fieldClassName}
                  {...register("fullName")}
                />
                {errors.fullName ? <p className="mt-1 text-xs text-[#a44d42]">{errors.fullName.message}</p> : null}
              </div>

              <div>
                <label htmlFor="contact-email" className={fieldLabelClassName}>
                  Email*
                </label>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  maxLength={120}
                  className={fieldClassName}
                  {...register("email")}
                />
                {errors.email ? <p className="mt-1 text-xs text-[#a44d42]">{errors.email.message}</p> : null}
              </div>

              <div>
                <label htmlFor="contact-phone" className={fieldLabelClassName}>
                  Phone (optional)
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  autoComplete="tel"
                  maxLength={24}
                  className={fieldClassName}
                  {...register("phone")}
                />
                {errors.phone ? <p className="mt-1 text-xs text-[#a44d42]">{errors.phone.message}</p> : null}
              </div>

              <div>
                <label htmlFor="contact-project-type" className={fieldLabelClassName}>
                  Project type
                </label>
                <select id="contact-project-type" className={selectClassName} {...register("projectType")}>
                  {contactProjectTypeOptions.map((option) => (
                    <option key={option.value || "empty"} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="contact-budget-range" className={fieldLabelClassName}>
                  Budget range
                </label>
                <select id="contact-budget-range" className={selectClassName} {...register("budgetRange")}>
                  {contactBudgetRangeOptions.map((option) => (
                    <option key={option.value || "empty"} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="contact-message" className={fieldLabelClassName}>
                Message*
              </label>
              <textarea
                id="contact-message"
                rows={6}
                maxLength={1200}
                className={cn(fieldClassName, "resize-y")}
                placeholder="Tell us about your property, timeline, and aspirations."
                {...messageField}
              />
              <div className="mt-1 flex items-center justify-between text-xs text-[#7a6d5e]">
                <span>{errors.message ? errors.message.message : "Minimum 20 characters."}</span>
                <span>{messageLength}/1200</span>
              </div>
            </div>

            {status ? (
              <div
                className={cn(
                  "mt-5 rounded-xl border px-4 py-3 text-sm",
                  status.type === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-rose-200 bg-rose-50 text-rose-700",
                )}
              >
                {status.message}
              </div>
            ) : null}

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button type="submit" disabled={disableSubmit} className={primaryButtonClassName}>
                {disableSubmit ? "Submitting..." : "Submit"}
              </button>
            </div>
          </motion.form>

          <motion.aside
            variants={revealIn}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={prefersReducedMotion ? { duration: 0.01 } : { delay: 0.08, duration: 0.82, ease: luxuryEase }}
            className="space-y-5 rounded-[28px] border border-[#d9cbb9] bg-[#120f0c] p-6 text-white shadow-[0_20px_46px_rgba(22,15,7,0.32)] supports-backdrop-filter:bg-[#120f0c]/90 supports-backdrop-filter:backdrop-blur-md sm:p-7"
          >
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/56">Main office</p>
              <p className="mt-3 text-sm leading-relaxed text-white/84">Unit 9 Shield Drive Brentford TW8 9EX</p>
              <a
                href="https://maps.google.com/?q=Unit%209%20Shield%20Drive%20Brentford%20TW8%209EX"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex border-b border-[#d7bf96] pb-1 text-[11px] uppercase tracking-[0.24em] text-[#d7bf96] transition-colors hover:text-[#ecd9ba]"
              >
                Get directions
              </a>
            </div>

            <div className="border-t border-white/14 pt-4">
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/56">Contact us</p>
              <div className="mt-3 space-y-2 text-sm text-white/84">
                <a href="tel:+447983996669" className="block transition-colors hover:text-[#ecd9ba]">
                  +44 7983 996669
                </a>
                <a href="mailto:Info@theratio.co.uk" className="block break-all transition-colors hover:text-[#ecd9ba]">
                  Info@theratio.co.uk
                </a>
              </div>
            </div>

            <div className="border-t border-white/14 pt-4">
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/56">Office hours</p>
              <ul className="mt-3 space-y-2 text-sm text-white/84">
                <li>Mon–Fri · 09:00–18:00</li>
                <li>Saturday · By appointment</li>
                <li>Sunday · Closed</li>
              </ul>
            </div>

            <Link href="#contact-form" className={primaryButtonClassName}>
              Start a project
            </Link>
          </motion.aside>
        </Container>
      </Section>

      <Section className="bg-[#0f0d0b] pb-[max(4.5rem,env(safe-area-inset-bottom))] pt-0 text-white">
        <Container>
          <motion.div
            id="office-map"
            variants={revealIn}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="overflow-hidden rounded-[28px] border border-white/16 bg-black/35"
          >
            <div className="px-6 py-5 sm:px-8">
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">Brentford office map</p>
            </div>
            <div className="h-[320px] w-full border-t border-white/12 sm:h-[380px]">
              <iframe
                title="The Ratio Brentford office map"
                src="https://www.google.com/maps?q=Unit%209%20Shield%20Drive%20Brentford%20TW8%209EX&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full"
              />
            </div>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
