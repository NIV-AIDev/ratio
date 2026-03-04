import { z } from "zod";

const projectTypeValues = [
  "",
  "extension",
  "loft-conversion",
  "full-house-renovation",
  "interior-design",
  "new-build",
  "other",
] as const;

const budgetRangeValues = [
  "",
  "under-250k",
  "250k-500k",
  "500k-1m",
  "1m-2m",
  "2m-plus",
  "not-sure-yet",
] as const;

const sanitizeSingleLine = (value: string) =>
  value
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const sanitizeMultiline = (value: string) =>
  value
    .replace(/[<>]/g, "")
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .trim();

export const contactProjectTypeOptions: Array<{ value: ContactProjectType; label: string }> = [
  { value: "", label: "Select a project type" },
  { value: "extension", label: "Extension" },
  { value: "loft-conversion", label: "Loft Conversion" },
  { value: "full-house-renovation", label: "Full House Renovation" },
  { value: "interior-design", label: "Interior Design" },
  { value: "new-build", label: "New Build" },
  { value: "other", label: "Other" },
];

export const contactBudgetRangeOptions: Array<{ value: ContactBudgetRange; label: string }> = [
  { value: "", label: "Select a budget range" },
  { value: "under-250k", label: "Under £250k" },
  { value: "250k-500k", label: "£250k – £500k" },
  { value: "500k-1m", label: "£500k – £1m" },
  { value: "1m-2m", label: "£1m – £2m" },
  { value: "2m-plus", label: "£2m+" },
  { value: "not-sure-yet", label: "Not sure yet" },
];

export type ContactProjectType = (typeof projectTypeValues)[number];
export type ContactBudgetRange = (typeof budgetRangeValues)[number];

export const contactPageSchema = z.object({
  fullName: z
    .string()
    .transform(sanitizeSingleLine)
    .pipe(z.string().min(2, "Full name is required.").max(80, "Use 80 characters or fewer.")),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid email address.")
    .max(120, "Use 120 characters or fewer."),
  phone: z
    .string()
    .transform(sanitizeSingleLine)
    .pipe(
      z
        .string()
        .max(24, "Use 24 characters or fewer.")
        .refine((value) => value === "" || /^[0-9+()\-\s]{7,24}$/.test(value), {
          message: "Enter a valid phone number.",
        }),
    ),
  projectType: z.enum(projectTypeValues),
  budgetRange: z.enum(budgetRangeValues),
  message: z
    .string()
    .transform(sanitizeMultiline)
    .pipe(
      z
        .string()
        .min(20, "Please share at least 20 characters.")
        .max(1200, "Use 1200 characters or fewer."),
    ),
});

export type ContactPageFormValues = z.infer<typeof contactPageSchema>;

export const sanitizeContactPageFormValues = (
  values: ContactPageFormValues,
): ContactPageFormValues => contactPageSchema.parse(values);
