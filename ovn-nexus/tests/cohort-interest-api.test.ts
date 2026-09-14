import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const state = vi.hoisted(() => ({ save: vi.fn() }));
vi.mock("@/lib/cohort-interest-storage", () => ({ saveCohortInterest: state.save }));
import { POST } from "@/app/api/cohort-interest/route";

const valid = {
  name: "Morgan Test",
  email: "morgan@example.test",
  profession: "Dental hygienist",
  question: "How should we discuss a change between visits?",
  consent: true,
};

function request(body: unknown = valid, headers: Record<string, string> = {}) {
  return new NextRequest("https://www.ovnnexus.com/api/cohort-interest", {
    method: "POST",
    headers: { origin: "https://www.ovnnexus.com", "content-type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

beforeEach(() => { state.save.mockReset().mockResolvedValue(undefined); });
afterEach(() => vi.restoreAllMocks());

describe("course interest request boundary", () => {
  it("stores normalized details and letter-seven attribution without returning personal information", async () => {
    const response = await POST(request({
      ...valid,
      name: "  Morgan Test  ",
      email: " MORGAN@EXAMPLE.TEST ",
      utm_source: "1840",
      utm_medium: "newsletter",
      utm_campaign: "letter-seven-hygienists-first",
      utm_content: "course-button",
    }));
    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(await response.json()).toEqual({ ok: true });
    expect(state.save).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({
      name: valid.name,
      email: valid.email,
      consent: true,
      utm_source: "1840",
      utm_medium: "newsletter",
      utm_campaign: "letter-seven-hygienists-first",
      utm_content: "course-button",
    }));
  });

  it.each([false, "true", undefined])("requires explicit boolean consent (%s)", async consent => {
    expect((await POST(request({ ...valid, consent }))).status).toBe(400);
    expect(state.save).not.toHaveBeenCalled();
  });

  it.each([
    { email: "not-an-email" },
    { profession: "Administrator" },
    { name: " " },
    { question: "x".repeat(2001) },
    { website: "spam.example.test" },
    { utm_campaign: "x".repeat(161) },
  ])("rejects invalid or automated input before storage: %j", async invalid => {
    expect((await POST(request({ ...valid, ...invalid }))).status).toBe(400);
    expect(state.save).not.toHaveBeenCalled();
  });

  it.each(["https://elsewhere.example", "null", ""])("rejects an untrusted origin: %s", async origin => {
    expect((await POST(request(valid, { origin }))).status).toBe(403);
    expect(state.save).not.toHaveBeenCalled();
  });

  it("rejects non-JSON and malformed JSON requests", async () => {
    expect((await POST(request(valid, { "content-type": "text/plain" }))).status).toBe(415);
    expect((await POST(request("{unfinished"))).status).toBe(400);
    expect(state.save).not.toHaveBeenCalled();
  });

  it("enforces both declared and actual request size limits", async () => {
    expect((await POST(request(valid, { "content-length": "12289" }))).status).toBe(413);
    expect((await POST(request({ ...valid, question: "x".repeat(13000) }))).status).toBe(413);
    expect(state.save).not.toHaveBeenCalled();
  });

  it("does not report a signup or leak details when persistence fails", async () => {
    state.save.mockRejectedValue(new Error(`storage rejected ${valid.email}: private-service-key`));
    const errorLog = vi.spyOn(console, "error").mockImplementation(() => {});
    const response = await POST(request());
    expect(response.status).toBe(503);
    const body = await response.json();
    expect(body.ok).toBeUndefined();
    expect(body.error).toContain("couldn’t confirm");
    expect(JSON.stringify([body, errorLog.mock.calls])).not.toContain(valid.email);
    expect(JSON.stringify([body, errorLog.mock.calls])).not.toContain("private-service-key");
    expect(response.headers.get("cache-control")).toBe("no-store");
  });

  it("limits repeated submissions from one address before additional storage writes", async () => {
    const headers = { "x-real-ip": "192.0.2.177" };
    for (let attempt = 0; attempt < 8; attempt++) {
      expect((await POST(request(valid, headers))).status).toBe(200);
    }
    expect((await POST(request(valid, headers))).status).toBe(429);
    expect(state.save).toHaveBeenCalledTimes(8);
  });
});
