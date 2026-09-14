import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const state = vi.hoisted(() => ({ user: null as null | { id: string }, profile: null as null | { research_access: boolean; role: string }, factory: vi.fn() }));
vi.mock("@supabase/ssr", () => ({ createServerClient: state.factory }));
import { updateSession } from "@/lib/auth/middleware";

beforeEach(() => {
  state.user = null;
  state.profile = null;
  state.factory.mockReset().mockImplementation(() => ({
    auth: { getUser: async () => ({ data: { user: state.user } }) },
    from: () => ({ select: () => ({ eq: () => ({ single: async () => ({ data: state.profile }) }) }) }),
  }));
});

describe("public briefs and existing access boundaries", () => {
  it.each(["/", "/for-dentists", "/for-dentists/guide", "/hygienists-first", "/api/cohort-interest"])("serves %s without an auth dependency", async pathname => {
    const response = await updateSession(new NextRequest(`https://example.test${pathname}`));
    expect(response.status).toBe(200);
    expect(state.factory).not.toHaveBeenCalled();
    expect(response.headers.get("x-middleware-request-x-pathname")).toBe(pathname);
  });

  it.each(["/hub", "/patients", "/admin", "/for-dentists/private", "/for-dentists-other", "/hygienists-first/private"])("still requires login for %s", async pathname => {
    const response = await updateSession(new NextRequest(`https://example.test${pathname}`));
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("https://example.test/login");
  });

  it("keeps regular members out of research and admin areas", async () => {
    state.user = { id: "test-member" };
    state.profile = { research_access: false, role: "member" };
    for (const path of ["/patients/record", "/admin/keys"]) {
      const response = await updateSession(new NextRequest(`https://example.test${path}`));
      expect(response.headers.get("location")).toBe("https://example.test/hub");
    }
  });

  it("retains research access without granting admin access", async () => {
    state.user = { id: "test-researcher" };
    state.profile = { research_access: true, role: "member" };
    expect((await updateSession(new NextRequest("https://example.test/patients"))).status).toBe(200);
    expect((await updateSession(new NextRequest("https://example.test/admin"))).status).toBe(307);
  });
});
