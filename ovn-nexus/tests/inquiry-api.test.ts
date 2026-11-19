import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const state = vi.hoisted(() => ({ deliver: vi.fn() }));
vi.mock("@/lib/inquiry-delivery", () => ({ deliverInquiry: state.deliver }));
import { POST } from "@/app/api/inquiry/route";

const valid = {
  name: "Morgan Test",
  email: "morgan@example.test",
  role: "Dentist",
  topic: "Gengyve products",
  message: "Can I order Gengyve for my practice?",
  page: "/for-dentists/coding",
};

function request(body: unknown = valid, headers: Record<string, string> = {}) {
  return new NextRequest("https://www.ovnnexus.com/api/inquiry", {
    method: "POST",
    headers: { origin: "https://www.ovnnexus.com", "content-type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

beforeEach(() => { state.deliver.mockReset().mockResolvedValue({ emailed: true, stored: true }); });
afterEach(() => vi.restoreAllMocks());

describe("question form request boundary", () => {
  it("delivers a normalized question without returning personal information", async () => {
    const response = await POST(request({ ...valid, name: "  Morgan Test ", email: " MORGAN@EXAMPLE.TEST ", utm_source: "1840" }));
    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(await response.json()).toEqual({ ok: true });
    expect(state.deliver).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({
      name: valid.name, email: valid.email, topic: valid.topic, page: valid.page, utm_source: "1840",
    }));
  });

  it.each([
    { email: "not-an-email" },
    { role: "Administrator" },
    { topic: "Free samples" },
    { name: "Morgan\r\nBcc: someone@example.test" },
    { message: "short" },
    { message: "x".repeat(3001) },
    { page: "https://elsewhere.example" },
    { website: "spam.example.test" },
  ])("rejects invalid or automated input before delivery: %j", async invalid => {
    expect((await POST(request({ ...valid, ...invalid }))).status).toBe(400);
    expect(state.deliver).not.toHaveBeenCalled();
  });

  it.each(["https://elsewhere.example", "null", ""])("rejects an untrusted origin: %s", async origin => {
    expect((await POST(request(valid, { origin }))).status).toBe(403);
    expect(state.deliver).not.toHaveBeenCalled();
  });

  it("rejects non-JSON, malformed and oversized requests", async () => {
    expect((await POST(request(valid, { "content-type": "text/plain" }))).status).toBe(415);
    expect((await POST(request("{unfinished"))).status).toBe(400);
    expect((await POST(request({ ...valid, message: "x".repeat(17000) }))).status).toBe(413);
    expect(state.deliver).not.toHaveBeenCalled();
  });

  it("does not report success or leak details when delivery fails", async () => {
    state.deliver.mockRejectedValue(new Error(`rejected ${valid.email}: private-key`));
    const errorLog = vi.spyOn(console, "error").mockImplementation(() => {});
    const response = await POST(request());
    expect(response.status).toBe(503);
    const body = await response.json();
    expect(body.ok).toBeUndefined();
    expect(JSON.stringify([body, errorLog.mock.calls])).not.toContain(valid.email);
    expect(JSON.stringify([body, errorLog.mock.calls])).not.toContain("private-key");
  });

  it("limits repeated submissions from one address", async () => {
    const headers = { "x-real-ip": "192.0.2.201" };
    for (let attempt = 0; attempt < 5; attempt++) expect((await POST(request(valid, headers))).status).toBe(200);
    expect((await POST(request(valid, headers))).status).toBe(429);
    expect(state.deliver).toHaveBeenCalledTimes(5);
  });
});
