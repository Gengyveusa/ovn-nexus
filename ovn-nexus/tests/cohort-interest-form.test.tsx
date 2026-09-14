// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CohortInterestForm } from "@/components/cohort-interest-form";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  window.history.replaceState({}, "", "/");
});

function fillInterest() {
  fireEvent.change(screen.getByRole("textbox", { name: "Your name" }), { target: { value: "Alex Rivera" } });
  fireEvent.change(screen.getByRole("textbox", { name: "Email address" }), { target: { value: "alex@example.com" } });
  fireEvent.change(screen.getByRole("combobox", { name: "Profession" }), { target: { value: "Dental hygienist" } });
  fireEvent.change(screen.getByRole("textbox", { name: /What would you like us to work through/ }), {
    target: { value: "How do we get a concern followed up between recall visits?" },
  });
}

function response(ok: boolean, body: Record<string, unknown>) {
  return { ok, json: async () => body } as Response;
}

describe("joining the first 1840 course interest list", () => {
  it("leaves consent unchecked and requires the visitor to opt in before submitting", () => {
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    render(<CohortInterestForm />);
    fillInterest();

    const consent = screen.getByRole("checkbox", { name: /Email me about the first 1840 hygienist course/ }) as HTMLInputElement;
    expect(consent.checked).toBe(false);
    expect(consent.required).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: "Keep me posted" }));

    expect(fetch).not.toHaveBeenCalled();
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("sends the entered details, explicit consent and newsletter attribution, then confirms only after acceptance", async () => {
    window.history.replaceState({}, "", "/hygienists-first?utm_source=1840&utm_medium=email&utm_campaign=hygienists-first&utm_content=letter-seven-button");
    let complete!: (value: Response) => void;
    const pending = new Promise<Response>(resolve => { complete = resolve; });
    const fetch = vi.fn().mockReturnValue(pending);
    vi.stubGlobal("fetch", fetch);
    render(<CohortInterestForm />);
    fillInterest();
    fireEvent.click(screen.getByRole("checkbox", { name: /Email me about the first 1840 hygienist course/ }));
    fireEvent.click(screen.getByRole("button", { name: "Keep me posted" }));

    expect(fetch).toHaveBeenCalledTimes(1);
    const [url, options] = fetch.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("/api/cohort-interest");
    expect(options.method).toBe("POST");
    expect(options.headers).toEqual({ "Content-Type": "application/json" });
    expect(JSON.parse(options.body as string)).toEqual({
      name: "Alex Rivera",
      email: "alex@example.com",
      profession: "Dental hygienist",
      question: "How do we get a concern followed up between recall visits?",
      website: "",
      consent: true,
      utm_source: "1840",
      utm_medium: "email",
      utm_campaign: "hygienists-first",
      utm_content: "letter-seven-button",
    });
    expect(screen.getByRole("form", { name: "Course interest form" }).getAttribute("aria-busy")).toBe("true");
    expect(screen.getByRole("button", { name: "Saving your interest…" }).matches(":disabled")).toBe(true);
    expect(screen.queryByRole("status")).toBeNull();

    complete(response(true, { ok: true }));
    const status = await screen.findByRole("status");
    expect(status.textContent).toContain("You’re on the interest list. We’ll email you when the dates and enrollment details are ready.");
    expect(status.textContent).toContain("You haven’t enrolled or committed to a payment.");
    expect(document.activeElement).toBe(status);
    expect(screen.queryByRole("form", { name: "Course interest form" })).toBeNull();
  });

  it.each([
    ["an unsuccessful HTTP response", false, { ok: true }],
    ["a response that does not confirm saving", true, { ok: false }],
  ])("preserves entries and allows retry after %s", async (_label, httpOk, body) => {
    const fetch = vi.fn()
      .mockResolvedValueOnce(response(httpOk, body))
      .mockResolvedValueOnce(response(true, { ok: true }));
    vi.stubGlobal("fetch", fetch);
    render(<CohortInterestForm />);
    fillInterest();
    fireEvent.click(screen.getByRole("checkbox", { name: /Email me about the first 1840 hygienist course/ }));
    fireEvent.click(screen.getByRole("button", { name: "Keep me posted" }));

    const alert = await screen.findByRole("alert");
    expect(alert.textContent).toContain("We couldn’t confirm your signup. Please try again.");
    expect(document.activeElement).toBe(alert);
    expect(screen.queryByRole("status")).toBeNull();
    expect((screen.getByRole("textbox", { name: "Your name" }) as HTMLInputElement).value).toBe("Alex Rivera");
    expect((screen.getByRole("textbox", { name: "Email address" }) as HTMLInputElement).value).toBe("alex@example.com");
    expect((screen.getByRole("combobox", { name: "Profession" }) as HTMLSelectElement).value).toBe("Dental hygienist");
    expect((screen.getByRole("textbox", { name: /What would you like us to work through/ }) as HTMLTextAreaElement).value).toBe("How do we get a concern followed up between recall visits?");
    expect((screen.getByRole("checkbox") as HTMLInputElement).checked).toBe(true);
    expect(screen.getByRole("button", { name: "Keep me posted" }).matches(":disabled")).toBe(false);

    fireEvent.click(screen.getByRole("button", { name: "Keep me posted" }));
    await waitFor(() => expect(screen.getByRole("status")).toBeTruthy());
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch.mock.calls[1][1].body).toBe(fetch.mock.calls[0][1].body);
  });
});
