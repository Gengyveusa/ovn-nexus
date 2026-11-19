import { NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { inquirySchema } from "@/lib/inquiry";
import { deliverInquiry } from "@/lib/inquiry-delivery";

export const runtime = "nodejs";
export const maxDuration = 30;
const MAX_BODY_BYTES = 16384;
const attempts = new Map<string, { count: number; expires: number }>();
const respond = (body: object, status: number) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: NextRequest) {
  if (request.headers.get("origin") !== request.nextUrl.origin) {
    return respond({ error: "Please send your question from the OVN Nexus site." }, 403);
  }
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return respond({ error: "Please send your question from the OVN Nexus site." }, 415);
  }
  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) {
    return respond({ error: "Please shorten your message and try again." }, 413);
  }

  // Best-effort per-instance burst limit, alongside bounded payloads and the honeypot.
  const ip = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0];
  if (ip) {
    const now = Date.now();
    for (const [key, value] of attempts) if (value.expires <= now) attempts.delete(key);
    const key = createHash("sha256").update(ip).digest("hex");
    const attempt = attempts.get(key);
    if (attempt && attempt.count >= 5) return respond({ error: "Please wait a minute before trying again." }, 429);
    if (attempt) attempt.count++;
    else if (attempts.size < 2000) attempts.set(key, { count: 1, expires: now + 60000 });
  }

  let body: unknown;
  try {
    const text = await request.text();
    if (Buffer.byteLength(text) > MAX_BODY_BYTES) return respond({ error: "Please shorten your message and try again." }, 413);
    body = JSON.parse(text);
  } catch {
    return respond({ error: "Please complete the form and try again." }, 400);
  }
  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return respond({ error: "Please check your name, email, and message. Messages can be 10 to 3,000 characters." }, 400);
  }
  try {
    await deliverInquiry(parsed.data);
    return respond({ ok: true }, 200);
  } catch {
    // Never log names, emails, messages, or credentials.
    console.error("A site question could not be delivered.");
    return respond({ error: "We couldn’t send your question. Please try again, or email Thad using the link below." }, 503);
  }
}
