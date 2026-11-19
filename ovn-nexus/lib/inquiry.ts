import { z } from "zod";

export const INQUIRY_RECIPIENT = "thad@gengyveusa.com";
export const inquiryTopics = ["A clinical question", "Gengyve products", "Ordering for a practice", "Something else"] as const;
export const inquiryRoles = ["Dentist", "Dental hygienist", "Physician", "Practice team", "Patient", "Other"] as const;

const attribution = z.string().trim().max(160).regex(/^[\p{L}\p{N} _./:-]*$/u).optional().default("");
// One line only: the name is used in the email subject.
const singleLine = /^[^\p{Cc}]*$/u;

export const inquirySchema = z.object({
  name: z.string().trim().min(2).max(120).regex(singleLine),
  email: z.string().trim().email().max(254).transform(value => value.toLowerCase()),
  role: z.enum(inquiryRoles),
  topic: z.enum(inquiryTopics),
  message: z.string().trim().min(10).max(3000),
  page: z.string().max(200).regex(/^\/[A-Za-z0-9/_-]*$/).optional().default("/"),
  website: z.string().max(0).optional().default(""),
  utm_source: attribution,
  utm_medium: attribution,
  utm_campaign: attribution,
  utm_content: attribution,
});

export type InquiryInput = z.infer<typeof inquirySchema>;
