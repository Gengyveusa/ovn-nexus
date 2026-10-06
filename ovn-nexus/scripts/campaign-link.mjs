// Usage: node scripts/campaign-link.mjs --publication 1840 --campaign oral-pellicle --content letter-08 --url https://www.ovnnexus.com/hygienists-first
import { parseArgs } from "node:util";
const { values } = parseArgs({ options: {
  publication: { type: "string" }, campaign: { type: "string" },
  content: { type: "string" }, url: { type: "string" },
} });
const sources = ["1840", "practice_ledger", "oral_health_bulletin", "quantum_distillery"];
if (!sources.includes(values.publication) || !/^[a-z0-9][a-z0-9_-]{0,79}$/.test(values.campaign || "") || !/^[a-z0-9][a-z0-9_-]{0,79}$/.test(values.content || "")) {
  throw new Error(`Use --publication (${sources.join(" | ")}), --campaign chapter-slug, --content installment-placement, and --url destination. Labels must be lowercase slugs.`);
}
const url = new URL(values.url);
if (url.protocol !== "https:" || !["ovnnexus.com", "www.ovnnexus.com", "gengyveusa.com", "ledger.gengyveusa.com"].includes(url.hostname)) {
  throw new Error("Choose an HTTPS OVN Nexus, Gengyve, or Practice Ledger destination.");
}
url.searchParams.set("utm_source", values.publication);
url.searchParams.set("utm_medium", "email");
url.searchParams.set("utm_campaign", values.campaign);
url.searchParams.set("utm_content", values.content);
console.log(url.toString());
