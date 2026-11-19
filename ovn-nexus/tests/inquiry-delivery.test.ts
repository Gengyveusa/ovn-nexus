import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
const state = vi.hoisted(() => ({ upload: vi.fn(), isPublic: false }));
vi.mock("@supabase/supabase-js", () => ({
  createClient: () => ({ storage: {
    getBucket: async () => ({ data: { public: state.isPublic }, error: null }),
    createBucket: async () => ({}),
    from: () => ({ upload: state.upload }),
  } }),
}));
import { deliverInquiry } from "@/lib/inquiry-delivery";
import { inquirySchema } from "@/lib/inquiry";

const input = inquirySchema.parse({
  name: "Morgan Test", email: "morgan@example.test", role: "Dentist", topic: "Gengyve products",
  message: "Can I order Gengyve for my practice?", page: "/for-dentists",
});
const fetchMock = vi.fn();

beforeEach(() => {
  vi.stubGlobal("fetch", fetchMock.mockReset().mockResolvedValue({ ok: true }));
  state.upload.mockReset().mockResolvedValue({ error: null });
  state.isPublic = false;
  vi.stubEnv("RESEND_API_KEY", "test-key");
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://project.example.test");
  vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "service-key");
  vi.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe("question delivery", () => {
  it("emails Thad with the sender as reply-to and keeps a private copy", async () => {
    expect(await deliverInquiry(input)).toEqual({ emailed: true, stored: true });
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    const sent = JSON.parse(options.body);
    expect(sent.to).toEqual(["thad@gengyveusa.com"]);
    expect(sent.reply_to).toBe("morgan@example.test");
    expect(sent.text).toContain(input.message);
    const stored = JSON.parse(state.upload.mock.calls[0][1]);
    expect(stored).toMatchObject({ email: input.email, message: input.message });
    expect(stored.website).toBeUndefined();
  });

  it("still succeeds from the private copy when email is not configured or fails", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    expect(await deliverInquiry(input)).toEqual({ emailed: false, stored: true });
    expect(fetchMock).not.toHaveBeenCalled();
    vi.stubEnv("RESEND_API_KEY", "test-key");
    fetchMock.mockResolvedValue({ ok: false });
    expect(await deliverInquiry(input)).toEqual({ emailed: false, stored: true });
  });

  it("refuses a public bucket and fails when nothing was delivered", async () => {
    state.isPublic = true;
    expect(await deliverInquiry(input)).toEqual({ emailed: true, stored: false });
    expect(state.upload).not.toHaveBeenCalled();
    fetchMock.mockResolvedValue({ ok: false });
    await expect(deliverInquiry(input)).rejects.toThrow("inquiry_not_delivered");
  });
});
