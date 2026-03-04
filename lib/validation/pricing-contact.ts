import { z } from "zod";

export const pricingContactSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required.").max(80, "Use 80 characters or fewer."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid email address.")
    .max(120, "Use 120 characters or fewer."),
  phone: z
    .string()
    .trim()
    .min(7, "Phone number is required.")
    .max(24, "Use 24 characters or fewer."),
  postcode: z.string().trim().min(3, "Postcode is required.").max(12, "Use 12 characters or fewer."),
  message: z
    .string()
    .trim()
    .min(20, "Please share at least 20 characters.")
    .max(1200, "Use 1200 characters or fewer."),
  consent: z.boolean().refine((value) => value, {
    message: "You must agree before submitting.",
  }),
});

export type PricingContactFormValues = z.infer<typeof pricingContactSchema>;

export const sanitizePricingContactFormValues = (
  values: PricingContactFormValues,
): PricingContactFormValues => pricingContactSchema.parse(values);
