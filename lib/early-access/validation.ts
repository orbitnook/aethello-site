import { z } from "zod";

export const EARLY_ACCESS_LIMITS = { email: 320, name: 120, organisation: 200, researchContext: 1000, role: 120, website: 200 } as const;

export const earlyAccessSchema = z.object({
  email: z.string().trim().min(1, "Enter your work email.").max(EARLY_ACCESS_LIMITS.email, "Email must be 320 characters or fewer.").email("Enter a valid work email."),
  name: z.string().trim().min(1, "Enter your name.").max(EARLY_ACCESS_LIMITS.name, "Name must be 120 characters or fewer."),
  organisation: z.string().trim().max(EARLY_ACCESS_LIMITS.organisation, "Organisation must be 200 characters or fewer."),
  researchContext: z.string().trim().max(EARLY_ACCESS_LIMITS.researchContext, "Research context must be 1,000 characters or fewer."),
  role: z.string().trim().max(EARLY_ACCESS_LIMITS.role, "Role must be 120 characters or fewer."),
  website: z.string().max(EARLY_ACCESS_LIMITS.website).default(""),
});

export type EarlyAccessValues = z.infer<typeof earlyAccessSchema>;

export function readEarlyAccessFormData(formData: FormData): EarlyAccessValues {
  const text = (name: string) => { const value = formData.get(name); return typeof value === "string" ? value : ""; };
  return { email: text("email"), name: text("name"), organisation: text("organisation"), researchContext: text("researchContext"), role: text("role"), website: text("website") };
}
