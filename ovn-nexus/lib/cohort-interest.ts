import { z } from "zod";

export const COHORT_SLUG = "hygienists-first";
export const COHORT_CONSENT_VERSION = "cohort-updates-2026-09-14";
export const COHORT_CONSENT = "Email me about the first 1840 hygienist course, including dates and enrollment details.";
export const COHORT_SUCCESS = "You’re on the interest list. We’ll email you when the dates and enrollment details are ready.";
export const professions = ["Dental hygienist", "Dentist", "Physician", "Student", "Other"] as const;

const attribution = z.string().trim().max(160).regex(/^[\p{L}\p{N} _./:-]*$/u).optional().default("");
export const cohortInterestSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.string().trim().email("Please enter a valid email address.").max(254).transform(value => value.toLowerCase()),
  profession: z.enum(professions),
  question: z.string().trim().max(2000).optional().default(""),
  consent: z.literal(true),
  website: z.string().max(0).optional().default(""),
  utm_source: attribution,
  utm_medium: attribution,
  utm_campaign: attribution,
  utm_content: attribution,
});

export type CohortInterestInput = z.infer<typeof cohortInterestSchema>;

export function cohortAttribution(search: string) {
  const params = new URLSearchParams(search);
  const clean = (key: string) => (params.get(key) || "").replace(/[^\p{L}\p{N} _./:-]/gu, "").slice(0, 160);
  return {
    utm_source: clean("utm_source"),
    utm_medium: clean("utm_medium"),
    utm_campaign: clean("utm_campaign"),
    utm_content: clean("utm_content"),
  };
}
