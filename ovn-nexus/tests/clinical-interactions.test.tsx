// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { EvidenceExplorer } from "@/components/clinical/evidence-explorer";
import { ShareBrief } from "@/components/clinical/share-brief";

afterEach(() => { cleanup(); vi.restoreAllMocks(); });

describe("a clinician exploring and sharing the brief", () => {
  it("keeps the finding, limitation, and source together when changing pathways", () => {
    render(<EvidenceExplorer />);
    expect(screen.getByRole("button", { name: /Vascular/ }).getAttribute("aria-pressed")).toBe("true");
    fireEvent.click(screen.getByRole("button", { name: /Metabolic/ }));
    expect(screen.getByText(/0.43 percentage points/)).toBeTruthy();
    expect(screen.getByText(/not a guaranteed result/)).toBeTruthy();
    expect(screen.getByRole("link", { name: /Cochrane/ }).getAttribute("href")).toBe("https://doi.org/10.1002/14651858.CD004714.pub4");
    fireEvent.click(screen.getByRole("button", { name: /Neural/ }));
    expect(screen.getByText(/Mouse and cell findings do not demonstrate/)).toBeTruthy();
    expect(screen.queryByText(/0.43 percentage points/)).toBeNull();
    expect(screen.getByRole("link", { name: /Experimental study/ }).getAttribute("href")).toBe("https://doi.org/10.3389/fcimb.2022.925435");
    expect(screen.getAllByRole("button").filter(button => button.getAttribute("aria-pressed") === "true")).toHaveLength(1);
  });

  it("copies the public canonical link, not the preview URL", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
    render(<ShareBrief />);
    fireEvent.click(screen.getByRole("button", { name: /Copy brief link/ }));
    await waitFor(() => expect(screen.getByRole("button", { name: /Link copied/ })).toBeTruthy());
    expect(writeText).toHaveBeenCalledWith("https://www.ovnnexus.com/for-dentists");
  });

  it("provides a selectable link when clipboard permission is unavailable", async () => {
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: vi.fn().mockRejectedValue(new Error("denied")) } });
    render(<ShareBrief />);
    fireEvent.click(screen.getByRole("button", { name: /Copy brief link/ }));
    const input = await screen.findByRole("textbox", { name: /Copy this link/ });
    expect((input as HTMLInputElement).value).toBe("https://www.ovnnexus.com/for-dentists");
    expect(screen.queryByRole("button", { name: /Link copied/ })).toBeNull();
  });
});
