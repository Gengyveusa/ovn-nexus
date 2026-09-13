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
