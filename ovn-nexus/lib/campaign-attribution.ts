import { cohortAttribution } from "./cohort-interest";

export type Campaign = ReturnType<typeof cohortAttribution>;
const STORAGE_KEY = "ovn-campaign-v1";
const MAX_AGE = 30 * 60 * 1000;

// Public editorial routes only: never attach research/account paths to store links.
export function editorialPath(path: string) {
  return /^\/(?:$|(?:about|science|for-dentists|for-hygienists|hygienists-first|education|ce|blog)(?:\/|$))/.test(path)
    ? path : "/";
}

/** Last tagged invitation in this tab, retained for 30 minutes across navigation.
 * Stores campaign labels only; no visitor ID, email, referrer URL or full query. */
export function currentCampaign(): Campaign {
  if (typeof window === "undefined") return cohortAttribution("");
  const incoming = cohortAttribution(window.location.search);
  const tagged = Object.values(incoming).some(Boolean);
  try {
    if (tagged) {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ at: Date.now(), campaign: incoming }));
      return incoming;
    }
    const stored = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || "null");
    if (stored && typeof stored.at === "number" && stored.at <= Date.now() && Date.now() - stored.at < MAX_AGE) {
      const params = new URLSearchParams();
      for (const key of Object.keys(incoming)) {
        if (typeof stored.campaign?.[key] === "string") params.set(key, stored.campaign[key]);
      }
      return cohortAttribution(params.toString());
    }
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch { /* Storage restrictions must never prevent navigation or signup. */ }
  return incoming;
}

export function campaignLink(href: string, placement: string, path = "/", campaign?: Campaign) {
  const url = new URL(href);
  if (url.protocol !== "https:" || !["gengyveusa.com", "www.gengyveusa.com", "ledger.gengyveusa.com"].includes(url.hostname)) {
    throw new Error("Campaign links require an approved destination.");
  }
  const page = editorialPath(path).replace(/^\/+|\/+$/g, "").replace(/[^a-zA-Z0-9_-]+/g, "-") || "home";
  const cleanPlacement = placement.replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 60);
  url.searchParams.set("utm_source", "ovn_nexus");
  url.searchParams.set("utm_medium", "referral");
  url.searchParams.set("utm_campaign", campaign?.utm_campaign || (url.hostname === "ledger.gengyveusa.com" ? "practice-ledger" : "gengyve-discovery"));
  url.searchParams.set("utm_content", `${page}--${cleanPlacement}`.slice(0, 160));
  // Preserve the publication and installment separately from the OVN placement.
  for (const [key, value] of Object.entries(campaign || {})) {
    if (value) url.searchParams.set(key.replace("utm_", "ovn_origin_"), value);
  }
  return url.toString();
}
