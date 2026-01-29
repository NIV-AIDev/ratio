import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required."),
  email: z.string().email("Enter a valid email."),
  subject: z
    .string()
    .min(2, "Subject is required.")
    .max(120, "Subject is too long."),
  message: z
    .string()
    .min(10, "Message should be at least 10 characters.")
    .max(2000, "Message is too long."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
