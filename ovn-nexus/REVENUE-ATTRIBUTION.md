# OVN Nexus revenue attribution

## What this release does

All 13 Gengyve / Practice Ledger anchor placements in the current app use the shared CampaignLink component. Shared footer and brand placements expand across the public pages. The main brand purchase button goes directly to the verified `/products/gengyve` product. No prices, discounts, or subscription terms are introduced.

Outbound tags work in the initial HTML without JavaScript. With JavaScript, they also retain the originating publication and installment from the last tagged invitation in the same browser tab, for up to 30 minutes. Course-interest submissions use the same attribution, including after an internal navigation. Browser storage failure does not block signup or navigation. This feature is attribution, not a pageview or click counter.

| Field | Meaning |
| --- | --- |
| `utm_source` | `ovn_nexus` for outbound links from OVN |
| `utm_medium` | `referral` |
| `utm_campaign` | Incoming story/chapter campaign when available; otherwise `gengyve-discovery` or `practice-ledger` |
| `utm_content` | Public page plus link placement, e.g. `for-dentists--brand-shop` |
| `ovn_origin_source` | Originating publication, if provided |
| `ovn_origin_medium` | Original channel, if provided |
| `ovn_origin_campaign` | Original story/chapter, if provided |
| `ovn_origin_content` | Original installment/link placement, if provided |

The `ovn_origin_*` fields are custom landing-URL parameters, not native Shopify report dimensions. They can be inspected in landing URLs where Shopify retains them. Standard campaign/source/content tags are the primary reporting fields. Do not claim a purchase is attributed just because a tagged link was clicked.

## Editorial story and publication links

Thad's direction on October 5: connect 1840, The Practice Ledger, oral pellicle, and omics (corrected from "omits"). "6 mo" and the exact meaning of "the law of omics" need clarification before committing to a schedule or publishing scientific claims.

Use stable publication source names: `1840`, `practice_ledger`, `oral_health_bulletin`, `quantum_distillery`. Use the story/chapter for campaign (`oral-pellicle`, `omics`), and the actual installment and placement for content. Email uses medium `email`; a LinkedIn publication should use medium `social` instead. Existing historical newsletter tags remain valid.

Generate each future email link with:

```sh
node scripts/campaign-link.mjs --publication 1840 --campaign oral-pellicle --content letter-08-main --url https://www.ovnnexus.com/hygienists-first
node scripts/campaign-link.mjs --publication practice_ledger --campaign omics --content letter-09-main --url https://www.ovnnexus.com/for-dentists
```

These installment numbers are examples, not a publishing schedule. The generator does not edit or send newsletters. Do not add campaign tags to internal OVN navigation, which would overwrite the real invitation source.

## Measurement and follow-through

1. Shopify: use campaign/source reporting for `ovn_nexus`; inspect the order's conversion summary to verify first/last visit attribution. `CustomerJourneySummary` documentation: https://shopify.dev/docs/api/admin-graphql/2026-07/objects/CustomerJourneySummary . Attribution depends on Shopify tracking availability, consent, and its attribution window. Untagged historical visits cannot be reconstructed by this release.
   The validated read-only query in `scripts/shopify-attribution.graphql` retrieves these fields. Supply a `created_at` filter and paginate every page; count first- and last-visit matches separately without double-counting orders. Missing/not-ready attribution is unknown. The first/last visit query does not prove that no intermediate OVN-assisted visit occurred.
2. Course leads: existing private `cohort-interest/hygienists-first` records and `scripts/export-cohort-interest.mjs` retain source/campaign/content and explicit course-update consent. Repeated submissions preserve the initial stored attribution. Signup counts are not paid enrollments.
3. Practice Ledger: verify campaign parameters survive the subscription flow in the newsletter provider before claiming subscriber conversion attribution. These changes tag the incoming links; they do not modify that separate service.
4. Traffic: Cloudflare's email total is not a unique-human visitor count. Inspect page/referrer and bot data in the account before estimating revenue from it. No new analytics vendor or advertising pixel is installed.

## Remaining launch dependencies

- No email-sending credentials were present in the OVN production environment at inspection. Automatic confirmations/follow-up are not enabled by this release. Configure an authorized sender and delivery monitoring, and honor the course-specific consent; do not add these contacts to product marketing automatically.
- The paid hygienist workshop still needs an agreed date, tuition, actual credit status, checkout, and fulfillment. Do not charge or advertise confirmed CE before those are settled.
- The publication and campaign labels allow the narrative to be measured. Paid subscriptions, sponsors, and a six-month editorial commitment have not been launched.

## Verification

Run `npm test`, `npm run typecheck`, `npm run build`, and `npm run verify:clinical`. The build verifier checks static HTML for untagged Gengyve / Ledger links. After deployment, inspect live home, About, dentist, and hygienist links. Verify a real attributed purchase when one arrives; this release does not place a test order or send email.
