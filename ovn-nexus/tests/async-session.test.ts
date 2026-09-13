import { expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({ get: vi.fn(), set: vi.fn(), factory: vi.fn(), cookies: vi.fn() }));
vi.mock("next/headers", () => ({ cookies: state.cookies }));
vi.mock("@supabase/ssr", () => ({ createServerClient: state.factory }));
import { createServerSupabaseClient } from "@/lib/db/supabase-server";

it("awaits Next 15's cookie store before constructing the session client", async () => {
  state.cookies.mockResolvedValue({ get: state.get, set: state.set });
  state.get.mockReturnValue({ value: "test-session-value" });
  const client = { auth: {} };
  state.factory.mockReturnValue(client);
  expect(await createServerSupabaseClient()).toBe(client);
  const adapters = state.factory.mock.calls[0][2].cookies;
  expect(adapters.get("test-session")).toBe("test-session-value");
  adapters.set("test-session", "updated-test-value", { httpOnly: true });
  expect(state.set).toHaveBeenCalledWith({ name: "test-session", value: "updated-test-value", httpOnly: true });
  adapters.remove("test-session", { path: "/" });
  expect(state.set).toHaveBeenCalledWith({ name: "test-session", value: "", path: "/" });
});
