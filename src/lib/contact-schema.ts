import { z } from "zod";

export type ContactKind = "general" | "catalog";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "required"),
  email: z.string().trim().email("email"),
  phone: z.string().trim().optional().or(z.literal("")),
  company: z.string().trim().optional().or(z.literal("")),
  message: z.string().trim().min(10, "minMessage"),
  topic: z.string().optional(),
  honeypot: z.string().optional(),
});

export type ContactValues = z.infer<typeof contactSchema>;

export const catalogRequestSchema = z.object({
  name: z.string().trim().min(2, "required"),
  email: z.string().trim().email("email"),
  catalog: z.string().min(1),
  honeypot: z.string().optional(),
});

export type CatalogRequestValues = z.infer<typeof catalogRequestSchema>;
