import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
const factory = vi.hoisted(() => vi.fn());
vi.mock("@/lib/db/supabase-client", () => ({ createServiceClient: factory }));
import { GET, POST } from "@/app/api/video/store/route";

beforeEach(() => factory.mockReset());
describe("media storage cannot write into the private interest bucket", () => {
  it.each([
    { presentationId: "../cohort-interest", filename: "lead.json" },
    { presentationId: "normal", filename: "../../cohort-interest/lead.json" },
    { presentationId: "%2e%2e%2fcohort-interest" },
    { slideIndex: "../../cohort-interest/lead" },
  ])("rejects unsafe path components before opening the service client: %j", async override => {
    const response = await POST(new NextRequest("https://example.test/api/video/store", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ audioBase64: "dGVzdA==", presentationId: "normal", slideIndex: 1, ...override }),
    }));
    expect(response.status).toBe(400);
    expect(factory).not.toHaveBeenCalled();
  });
  it("rejects a traversal prefix on the listing endpoint", async () => {
    const response = await GET(new NextRequest("https://example.test/api/video/store?presentationId=..%2Fcohort-interest"));
    expect(response.status).toBe(400);
    expect(factory).not.toHaveBeenCalled();
  });
});
