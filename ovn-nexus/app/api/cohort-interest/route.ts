import { NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { cohortInterestSchema } from "@/lib/cohort-interest";
import { saveCohortInterest } from "@/lib/cohort-interest-storage";

export const runtime = "nodejs";
export const maxDuration = 60;
const MAX_BODY_BYTES = 12288;
const attempts = new Map<string, { count: number; expires: number }>();
const respond = (body: object, status: number) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: NextRequest) {
  if (request.headers.get("origin") !== request.nextUrl.origin) {
    return respond({ error: "Please submit the form from the course page." }, 403);
  }
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return respond({ error: "Please submit the form from the course page." }, 415);
  }
  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) {
    return respond({ error: "Please shorten your message and try again." }, 413);
  }

  // Best-effort per-instance burst limit, in addition to provider protections,
  // bounded payloads, the honeypot, and durable per-email deduplication.
  const ip = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0];
  if (ip) {
    const now = Date.now();
    for (const [key, value] of attempts) if (value.expires <= now) attempts.delete(key);
    const key = createHash("sha256").update(ip).digest("hex");
    const attempt = attempts.get(key);
    if (attempt && attempt.count >= 8) return respond({ error: "Please wait a minute before trying again." }, 429);
    if (attempt) attempt.count++;
    else if (attempts.size < 2000) attempts.set(key, { count: 1, expires: now + 60000 });
  }

  let body: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return respond({ error: "Please complete the form." }, 400);
    const chunks: Uint8Array[] = [];
    let length = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > MAX_BODY_BYTES) {
        await reader.cancel();
        return respond({ error: "Please shorten your message and try again." }, 413);
      }
      chunks.push(value);
    }
    body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return respond({ error: "Please complete the form and try again." }, 400);
  }
  const parsed = cohortInterestSchema.safeParse(body);
  if (!parsed.success) {
    return respond({ error: "Please check your name, email, profession, and email permission. Messages can be up to 2,000 characters." }, 400);
  }
  try {
    await saveCohortInterest(parsed.data);
    return respond({ ok: true }, 200);
  } catch {
    // Never log names, emails, optional clinical questions, or credentials.
    console.error("Cohort interest could not be saved or confirmed.");
    return respond({ error: "We couldn’t confirm your signup. Please try again, or email Thad using the link below." }, 503);
  }
}
