import "server-only";
import { createHash } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { COHORT_CONSENT, COHORT_CONSENT_VERSION, COHORT_SLUG, type CohortInterestInput } from "./cohort-interest";

export const INTEREST_BUCKET = "cohort-interest";

// This private bucket is separate from public media and requires no auth account
// for the visitor. Only the server's service-role client can access the records.
export async function saveCohortInterest(input: CohortInterestInput) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) throw new Error("interest_storage_not_configured");
  const client = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (resource, options) => fetch(resource, { ...options, signal: AbortSignal.timeout(10000) }) },
  });

  let bucket = await client.storage.getBucket(INTEREST_BUCKET);
  if (bucket.error && (String(bucket.error.statusCode) === "404" || bucket.error.message === "Bucket not found")) {
    // A concurrent first request may create the bucket first; verify below.
    await client.storage.createBucket(INTEREST_BUCKET, {
      public: false, fileSizeLimit: 16384, allowedMimeTypes: ["application/json"],
    });
    bucket = await client.storage.getBucket(INTEREST_BUCKET);
  }
  if (bucket.error || !bucket.data || bucket.data.public !== false ||
      bucket.data.allowed_mime_types?.length !== 1 || bucket.data.allowed_mime_types[0] !== "application/json" ||
      !bucket.data.file_size_limit || bucket.data.file_size_limit > 16384) {
    throw new Error("interest_private_storage_unavailable");
  }

  const digest = createHash("sha256").update(`${COHORT_SLUG}:${input.email}`).digest("hex");
  const path = `${COHORT_SLUG}/${digest}.json`;
  const record = {
    schema_version: 1,
    course: COHORT_SLUG,
    name: input.name,
    email: input.email,
    profession: input.profession,
    question: input.question,
    source: input.utm_source || "direct",
    utm_source: input.utm_source,
    utm_medium: input.utm_medium,
    utm_campaign: input.utm_campaign,
    utm_content: input.utm_content,
    consent_text: COHORT_CONSENT,
    consent_version: COHORT_CONSENT_VERSION,
    consented_at: new Date().toISOString(),
    landing_path: "/hygienists-first",
  };
  const storage = client.storage.from(INTEREST_BUCKET);
  const uploaded = await storage.upload(path, JSON.stringify(record), {
    contentType: "application/json", upsert: false,
  });
  if (uploaded.error && !["409", "Duplicate"].includes(String(uploaded.error.statusCode)) && uploaded.error.message !== "The resource already exists") {
    throw new Error("interest_storage_write_failed");
  }
  // Confirm persistence for both new records and duplicates. Never overwrite a
  // previous visitor's details or return their information to the caller.
  const stored = await storage.download(path);
  if (stored.error || !stored.data) throw new Error("interest_storage_confirmation_failed");
  const confirmed = JSON.parse(await stored.data.text());
  if (confirmed.schema_version !== 1 || confirmed.course !== COHORT_SLUG || confirmed.email !== input.email || confirmed.consent_version !== COHORT_CONSENT_VERSION) {
    throw new Error("interest_storage_confirmation_failed");
  }
}
