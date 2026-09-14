import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({
  factory: vi.fn(),
  getBucket: vi.fn(),
  createBucket: vi.fn(),
  from: vi.fn(),
  upload: vi.fn(),
  download: vi.fn(),
  files: new Map<string, string>(),
}));
vi.mock("server-only", () => ({}));
vi.mock("@supabase/supabase-js", () => ({ createClient: state.factory }));
import { INTEREST_BUCKET, saveCohortInterest } from "@/lib/cohort-interest-storage";
import { COHORT_CONSENT, COHORT_CONSENT_VERSION, COHORT_SLUG, cohortInterestSchema } from "@/lib/cohort-interest";

const input = cohortInterestSchema.parse({
  name: "Morgan Test",
  email: "morgan@example.test",
  profession: "Dental hygienist",
  question: "How should we discuss a change between visits?",
  consent: true,
  utm_source: "1840",
  utm_medium: "newsletter",
  utm_campaign: "letter-seven-hygienists-first",
  utm_content: "course-button",
});
const privateBucket = { data: {
  id: INTEREST_BUCKET,
  public: false,
  allowed_mime_types: ["application/json"],
  file_size_limit: 16384,
}, error: null };
const missingBucket = { data: null, error: { statusCode: "404", message: "Bucket not found" } };

beforeEach(() => {
  vi.resetAllMocks();
  state.files.clear();
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://database.example.test");
  vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "unit-test-service-key");
  state.getBucket.mockResolvedValue(privateBucket);
  state.createBucket.mockResolvedValue({ data: { name: INTEREST_BUCKET }, error: null });
  state.upload.mockImplementation(async (path: string, content: string) => {
    if (state.files.has(path)) return { data: null, error: { statusCode: "409", message: "Already exists" } };
    state.files.set(path, content);
    return { data: { path }, error: null };
  });
  state.download.mockImplementation(async (path: string) => ({
    data: state.files.has(path) ? new Blob([state.files.get(path)!], { type: "application/json" }) : null,
    error: null,
  }));
  state.from.mockReturnValue({ upload: state.upload, download: state.download });
  state.factory.mockReturnValue({ storage: {
    getBucket: state.getBucket,
    createBucket: state.createBucket,
    from: state.from,
  } });
});
afterEach(() => vi.unstubAllEnvs());

describe("private course interest persistence", () => {
  it("stores consent and campaign details privately and confirms persistence before returning", async () => {
    await expect(saveCohortInterest(input)).resolves.toBeUndefined();
    expect(state.from).toHaveBeenCalledWith(INTEREST_BUCKET);
    const [path, content, options] = state.upload.mock.calls[0];
    expect(path).toMatch(/^hygienists-first\/[a-f0-9]{64}\.json$/);
    expect(path).not.toContain(input.email);
    expect(options).toEqual({ contentType: "application/json", upsert: false });
    const stored = JSON.parse(content);
    expect(stored).toMatchObject({
      schema_version: 1,
      course: COHORT_SLUG,
      email: input.email,
      name: input.name,
      question: input.question,
      source: "1840",
      utm_source: "1840",
      utm_medium: "newsletter",
      utm_campaign: "letter-seven-hygienists-first",
      utm_content: "course-button",
      consent_text: COHORT_CONSENT,
      consent_version: COHORT_CONSENT_VERSION,
      landing_path: "/hygienists-first",
    });
    expect(Number.isNaN(Date.parse(stored.consented_at))).toBe(false);
    expect(state.download).toHaveBeenCalledExactlyOnceWith(path);
  });

  it("keeps the first submission unchanged when the same normalized email returns", async () => {
    await saveCohortInterest(input);
    const original = [...state.files.entries()];
    const returning = cohortInterestSchema.parse({ ...input, email: " MORGAN@EXAMPLE.TEST ", name: "Changed name", utm_source: "later-campaign" });
    await expect(saveCohortInterest(returning)).resolves.toBeUndefined();
    expect([...state.files.entries()]).toEqual(original);
    expect(state.upload.mock.calls[1][0]).toBe(state.upload.mock.calls[0][0]);
    expect(state.download).toHaveBeenCalledTimes(2);
  });

  it.each(["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"])("fails closed without %s", async variable => {
    vi.stubEnv(variable, "");
    await expect(saveCohortInterest(input)).rejects.toThrow("interest_storage_not_configured");
    expect(state.factory).not.toHaveBeenCalled();
  });

  it.each([
    { data: { public: true }, error: null },
    { data: {}, error: null },
    { data: null, error: { statusCode: "403" } },
    { data: { ...privateBucket.data, allowed_mime_types: null }, error: null },
    { data: { ...privateBucket.data, allowed_mime_types: ["application/json", "audio/mpeg"] }, error: null },
    { data: { ...privateBucket.data, file_size_limit: 32768 }, error: null },
  ])("never uploads when bucket privacy is not confirmed: %j", async bucket => {
    state.getBucket.mockResolvedValue(bucket);
    await expect(saveCohortInterest(input)).rejects.toThrow("interest_private_storage_unavailable");
    expect(state.upload).not.toHaveBeenCalled();
  });

  it("creates a size-limited JSON-only private bucket and rereads its privacy", async () => {
    state.getBucket.mockResolvedValueOnce(missingBucket).mockResolvedValueOnce(privateBucket);
    await saveCohortInterest(input);
    expect(state.createBucket).toHaveBeenCalledExactlyOnceWith(INTEREST_BUCKET, {
      public: false, fileSizeLimit: 16384, allowedMimeTypes: ["application/json"],
    });
    expect(state.getBucket).toHaveBeenCalledTimes(2);
    expect(state.getBucket.mock.invocationCallOrder[1]).toBeLessThan(state.upload.mock.invocationCallOrder[0]);
  });

  it("accepts a concurrent creation only after confirming the existing bucket is private", async () => {
    state.getBucket.mockResolvedValueOnce(missingBucket).mockResolvedValueOnce(privateBucket);
    state.createBucket.mockResolvedValue({ data: null, error: { statusCode: "409" } });
    await expect(saveCohortInterest(input)).resolves.toBeUndefined();
    expect(state.getBucket).toHaveBeenCalledTimes(2);
  });

  it("does not upload after creation fails and the bucket remains unavailable", async () => {
    state.getBucket.mockResolvedValue(missingBucket);
    state.createBucket.mockResolvedValue({ data: null, error: { statusCode: "403" } });
    await expect(saveCohortInterest(input)).rejects.toThrow("interest_private_storage_unavailable");
    expect(state.upload).not.toHaveBeenCalled();
  });

  it("does not treat an arbitrary storage failure as a duplicate", async () => {
    state.upload.mockResolvedValue({ data: null, error: { statusCode: "500", message: "Storage unavailable" } });
    await expect(saveCohortInterest(input)).rejects.toThrow("interest_storage_write_failed");
    expect(state.download).not.toHaveBeenCalled();
  });

  it("does not confirm a write or duplicate if its private readback fails", async () => {
    await saveCohortInterest(input);
    state.download.mockResolvedValue({ data: null, error: { statusCode: "503" } });
    await expect(saveCohortInterest(input)).rejects.toThrow("interest_storage_confirmation_failed");
  });

  it.each([
    { course: "another-course" },
    { email: "someone-else@example.test" },
    { consent_version: "unrecognized-consent" },
    { schema_version: 999 },
  ])("rejects incompatible or mismatched saved data: %j", async changed => {
    state.download.mockResolvedValue({ data: new Blob([JSON.stringify({
      course: COHORT_SLUG,
      email: input.email,
      consent_version: COHORT_CONSENT_VERSION,
      schema_version: 1,
      ...changed,
    })]), error: null });
    await expect(saveCohortInterest(input)).rejects.toThrow("interest_storage_confirmation_failed");
  });

  it("never confirms unreadable JSON", async () => {
    state.download.mockResolvedValue({ data: new Blob(["not JSON"]), error: null });
    await expect(saveCohortInterest(input)).rejects.toThrow();
  });
});
