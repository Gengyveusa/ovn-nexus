// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { campaignLink, currentCampaign } from "@/lib/campaign-attribution";
import { CampaignLink, CaptureCampaign } from "@/components/campaign-link";

vi.mock("next/navigation", () => ({ usePathname: () => window.location.pathname }));
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.useRealTimers();
  window.sessionStorage.clear();
  window.history.replaceState({}, "", "/");
});

describe("publication to OVN to signup or store attribution", () => {
  it("retains an 1840 invitation across an untagged internal navigation", () => {
    window.history.replaceState({}, "", "/?utm_source=1840&utm_medium=email&utm_campaign=oral-pellicle&utm_content=letter-08");
    render(<CaptureCampaign />);
    window.history.replaceState({}, "", "/hygienists-first");
    expect(currentCampaign()).toEqual({ utm_source: "1840", utm_medium: "email", utm_campaign: "oral-pellicle", utm_content: "letter-08" });
  });

  it("gives store links the OVN placement and retains the originating publication and installment", () => {
    window.history.replaceState({}, "", "/?utm_source=practice_ledger&utm_medium=email&utm_campaign=omics&utm_content=letter-09");
    currentCampaign();
    window.history.replaceState({}, "", "/for-dentists");
    render(<CampaignLink href="https://gengyveusa.com/products/gengyve?variant=123#details" placement="brand-shop">Shop</CampaignLink>);
    const url = new URL(screen.getByRole("link", { name: "Shop" }).getAttribute("href")!);
    expect(url.pathname).toBe("/products/gengyve");
    expect(url.searchParams.get("variant")).toBe("123");
    expect(url.hash).toBe("#details");
    expect(Object.fromEntries(url.searchParams)).toMatchObject({
      utm_source: "ovn_nexus", utm_medium: "referral", utm_campaign: "omics",
      utm_content: "for-dentists--brand-shop", ovn_origin_source: "practice_ledger", ovn_origin_content: "letter-09",
    });
  });

  it("replaces the entire campaign on a new invitation, without mixing installments", () => {
    window.history.replaceState({}, "", "/?utm_source=1840&utm_campaign=old&utm_content=letter-01");
    currentCampaign();
    window.history.replaceState({}, "", "/?utm_source=practice_ledger");
    expect(currentCampaign()).toEqual({ utm_source: "practice_ledger", utm_medium: "", utm_campaign: "", utm_content: "" });
  });

  it("expires a previous invitation after 30 minutes", () => {
    vi.useFakeTimers();
    window.history.replaceState({}, "", "/?utm_source=1840");
    currentCampaign();
    window.history.replaceState({}, "", "/hygienists-first");
    vi.advanceTimersByTime(30 * 60 * 1000 + 1);
    expect(currentCampaign().utm_source).toBe("");
  });

  it("works with blocked browser storage and sanitizes inbound labels", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("blocked"); });
    window.history.replaceState({}, "", "/?utm_source=1840%3Cscript%3E");
    expect(currentCampaign().utm_source).toBe("1840script");
    expect(campaignLink("https://ledger.gengyveusa.com/subscribe", "subscribe")).toContain("utm_source=ovn_nexus");
  });

  it("does not export private portal paths or accept unapproved destinations", () => {
    const url = new URL(campaignLink("https://gengyveusa.com", "footer-store", "/patients/private-id"));
    expect(url.searchParams.get("utm_content")).toBe("home--footer-store");
    expect(() => campaignLink("https://gengyveusa.com.evil.test", "shop")).toThrow();
    expect(() => campaignLink("http://gengyveusa.com", "shop")).toThrow();
  });
});
