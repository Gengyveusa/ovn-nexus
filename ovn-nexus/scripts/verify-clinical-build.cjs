// Inspect production build artifacts without contacting accounts or databases.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const { JSDOM } = require("jsdom");

for (const route of ["index", "for-dentists", "for-dentists/guide", "science", "about"]) {
  const doc = new JSDOM(fs.readFileSync(`.next/server/app/${route}.html`, "utf8")).window.document;
  assert.equal(doc.querySelectorAll("h1").length, 1, `${route}: one primary heading`);
  assert(!/~1\s*(Billion|B\b)|studied deeper than anyone/.test(doc.body.textContent), `${route}: retired claims`);
  if (route === "index" || route.startsWith("for-dentists")) {
    assert(doc.querySelector("main#main-content"));
    assert(doc.querySelector('meta[property="og:image"]').content.endsWith("/clinical-brief-og.png"));
    for (const link of doc.querySelectorAll('a[href^="#"]')) {
      assert(doc.getElementById(link.getAttribute("href").slice(1)), `${route}: anchor ${link.getAttribute("href")}`);
    }
    assert(!doc.body.textContent.includes("local-build-placeholder"));
  }
  if (route === "for-dentists") {
    assert.equal(doc.querySelector('link[rel="canonical"]').href, "https://www.ovnnexus.com/for-dentists");
    assert.equal(doc.querySelectorAll("button[aria-pressed]").length, 3);
    assert(doc.querySelector("a[download]").href.includes("ovn-clinical-conversation-guide.pdf"));
  }
  console.log(`Verified built document: ${route}`);
}
assert.equal(fs.readFileSync("public/downloads/ovn-clinical-conversation-guide.pdf").subarray(0, 5).toString(), "%PDF-");
assert(fs.readFileSync(".next/server/app/sitemap.xml.body", "utf8").includes("/for-dentists/guide"));
console.log("Guide PDF and sitemap verified.");

// Check actual rendered anchors, including shared footer and course placements.
let taggedLinks = 0;
for (const entry of fs.readdirSync(".next/server/app", { recursive: true })) {
  if (!entry.endsWith(".html")) continue;
  const doc = new JSDOM(fs.readFileSync(`.next/server/app/${entry}`, "utf8")).window.document;
  for (const anchor of doc.querySelectorAll("a[href]")) {
    let url;
    try { url = new URL(anchor.getAttribute("href")); } catch { continue; }
    if (!["gengyveusa.com", "www.gengyveusa.com", "ledger.gengyveusa.com"].includes(url.hostname)) continue;
    assert.equal(url.searchParams.get("utm_source"), "ovn_nexus", `${entry}: untagged source`);
    assert.equal(url.searchParams.get("utm_medium"), "referral", `${entry}: untagged medium`);
    assert(url.searchParams.get("utm_campaign"), `${entry}: missing campaign`);
    assert(url.searchParams.get("utm_content"), `${entry}: missing placement`);
    taggedLinks++;
  }
}
assert(taggedLinks > 0, "Expected tagged links in built HTML");
console.log(`Verified ${taggedLinks} rendered Gengyve / Practice Ledger links.`);
