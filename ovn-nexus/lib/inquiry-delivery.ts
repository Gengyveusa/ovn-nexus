import "server-only";
import { randomUUID } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { INQUIRY_RECIPIENT, type InquiryInput } from "./inquiry";

export const INQUIRY_BUCKET = "site-inquiries";

/** Emails the question to Thad through Resend. Returns false when no key is set. */
async function emailInquiry(input: InquiryInput) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    signal: AbortSignal.timeout(10000),
    body: JSON.stringify({
      from: process.env.INQUIRY_FROM_EMAIL || "OVN Nexus <questions@ovnnexus.com>",
      to: [process.env.INQUIRY_TO_EMAIL || INQUIRY_RECIPIENT],
      reply_to: input.email,
      subject: `OVN Nexus: ${input.topic} from ${input.name}`,
      text: [
        `From: ${input.name} <${input.email}>`,
        `Role: ${input.role}`,
        `Topic: ${input.topic}`,
        `Page: ${input.page}`,
        `Source: ${input.utm_source || "direct"}${input.utm_campaign ? ` / ${input.utm_campaign}` : ""}`,
        "",
        input.message,
        "",
        "Reply to this email to answer the sender directly.",
      ].join("\n"),
    }),
  });
  if (!response.ok) throw new Error("inquiry_email_failed");
  return true;
}

/** Keeps a private copy so a question survives an email outage. */
async function storeInquiry(input: InquiryInput) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return false;
  const client = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (resource, options) => fetch(resource, { ...options, signal: AbortSignal.timeout(10000) }) },
  });
  let bucket = await client.storage.getBucket(INQUIRY_BUCKET);
  if (bucket.error) {
    await client.storage.createBucket(INQUIRY_BUCKET, { public: false, fileSizeLimit: 16384, allowedMimeTypes: ["application/json"] });
    bucket = await client.storage.getBucket(INQUIRY_BUCKET);
  }
  // Never write a visitor's message into a bucket that could be read publicly.
  if (bucket.error || bucket.data?.public !== false) throw new Error("inquiry_private_storage_unavailable");
  const now = new Date().toISOString();
  const { website: _website, ...record } = input;
  const uploaded = await client.storage.from(INQUIRY_BUCKET).upload(
    `${now.slice(0, 7)}/${randomUUID()}.json`,
    JSON.stringify({ schema_version: 1, received_at: now, ...record }),
    { contentType: "application/json", upsert: false },
  );
  if (uploaded.error) throw new Error("inquiry_storage_write_failed");
  return true;
}

/** Succeeds when the question reached Thad's inbox or the private copy; throws when neither did. */
export async function deliverInquiry(input: InquiryInput) {
  const [emailed, stored] = await Promise.all([
    emailInquiry(input).catch(() => false),
    storeInquiry(input).catch(() => false),
  ]);
  if (!emailed && !stored) throw new Error("inquiry_not_delivered");
  if (!emailed) console.error("A site question was stored but not emailed.");
  return { emailed, stored };
}
