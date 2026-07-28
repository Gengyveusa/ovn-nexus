/**
 * robots.txt — hand-built so it can carry directives Next.js can't express.
 *
 * WHY THIS IS A ROUTE HANDLER AND NOT app/robots.ts
 * -------------------------------------------------
 * Next's MetadataRoute.Robots understands userAgent / allow / disallow /
 * sitemap and nothing else. It cannot emit `Content-Signal`, which is how the
 * site states "you may read and cite this, you may not train on it." That
 * distinction is the entire AEO position for OVN Nexus, so it has to be
 * expressible.
 *
 * WHY THIS FILE EXISTS AT ALL
 * ---------------------------
 * Cloudflare's "Managed robots.txt" toggle (AI Crawl Control → Signals) used
 * to inject a block that Disallowed ClaudeBot, GPTBot, Google-Extended, CCBot,
 * Applebot-Extended, Amazonbot, Bytespider and meta-externalagent from the
 * whole domain. That is a coherent policy for a site that wants to stay out of
 * AI entirely; it is the opposite of what this site wants, because the point of
 * OVN Nexus is to be the thing a clinician's assistant cites.
 *
 * With that toggle off, this file is the single source of truth — in version
 * control, reviewable in a diff, and impossible to change silently from a
 * dashboard.
 *
 * THE POSITION
 * ------------
 * Readable and citable; not training data. Retrieval crawlers are allowed so
 * the evidence-tier work can be cited. Training-corpus crawlers stay blocked,
 * which is what makes `ai-train=no` an actual practice rather than a claim.
 */

/** Gated portal routes. Not secret, but not content — no crawler needs them. */
const PRIVATE_PATHS = [
  '/api/',
  '/dashboard',
  '/admin',
  '/clinics',
  '/patients',
  '/biomarkers',
  '/experiments',
  '/datasets',
  '/papers',
  '/trials',
  '/hub',
];

/**
 * Crawlers that fetch in order to answer a question and cite a source.
 *
 * These get the same access as any search engine — including the same
 * exclusions. That repetition is load-bearing: under RFC 9309 a crawler that
 * matches its own named group ignores the `*` group completely, so omitting
 * the disallows here would grant ClaudeBot access to /patients.
 */
const RETRIEVAL_CRAWLERS = [
  'ClaudeBot',
  'Claude-Web',
  'Claude-User',
  'anthropic-ai',
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot',
];

/**
 * Crawlers whose purpose is bulk corpus collection for model training.
 *
 * Applebot-Extended is Apple's training opt-out token specifically; CCBot
 * feeds Common Crawl, the most widely reused training corpus. Blocking these
 * is how `ai-train=no` is enforced rather than merely asserted.
 */
const TRAINING_CRAWLERS = [
  'CCBot',
  'Applebot-Extended',
  'Bytespider',
  'Amazonbot',
  'meta-externalagent',
];

const SITE = 'https://www.ovnnexus.com';

function group(userAgent: string, { allowAll = true } = {}) {
  const lines = [`User-agent: ${userAgent}`];
  if (allowAll) {
    lines.push('Allow: /');
    lines.push(...PRIVATE_PATHS.map((p) => `Disallow: ${p}`));
  } else {
    lines.push('Disallow: /');
  }
  return lines.join('\n');
}

function body() {
  return [
    '# OVN Nexus — the research platform behind Gengyve.',
    '#',
    '# Position: readable and citable, not training data. Retrieval crawlers are',
    '# welcome so this work can be cited; training-corpus crawlers are not.',
    '# Managed in source at app/robots.txt/route.ts — if this file ever contains',
    "# a block marked 'Cloudflare Managed content', the dashboard toggle at",
    '# AI Crawl Control → Signals has been switched back on and is overriding it.',
    '',
    '# Content Signals Policy — https://contentsignals.org/',
    '#   search=yes      may be indexed and surfaced in search results',
    '#   ai-train=no     may NOT be used to train generative models',
    '#   use=reference   may be read to answer a question, with attribution',
    group('*'),
    'Content-Signal: search=yes, ai-train=no, use=reference',
    '',
    '# ── Retrieval and answer engines — allowed ───────────────────────────',
    ...RETRIEVAL_CRAWLERS.flatMap((ua) => [group(ua), '']),
    '# ── Training-corpus crawlers — blocked, per ai-train=no ──────────────',
    ...TRAINING_CRAWLERS.flatMap((ua) => [group(ua, { allowAll: false }), '']),
    `Sitemap: ${SITE}/sitemap.xml`,
    '',
  ].join('\n');
}

export function GET() {
  return new Response(body(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      // Short cache: this is policy, and policy changes should propagate fast.
      'Cache-Control': 'public, max-age=3600, must-revalidate',
    },
  });
}
