# 1840: Hygienists first

Landing page: https://www.ovnnexus.com/hygienists-first

Letter seven button: **Take a look at the course**

Tracked destination:
https://www.ovnnexus.com/hygienists-first?utm_source=1840&utm_medium=newsletter&utm_campaign=hygienists-first&utm_content=letter-7

Newsletter paragraph, for use after publishing the landing page:

> I’ve been rebuilding OVN Nexus, and that’s where we’ll do this work. I’ve put the first hygienist course there so you can see what we’re planning and leave your name if you’d like to join us.
>
> If there’s something you want to ask me first, just reply to this letter. I’d like to hear from you.

## Signups and follow-through

- The form records interest only. It does not enroll, charge, create a portal account, or subscribe the visitor to a newsletter or product marketing.
- Explicit course-update email permission is required and saved with its wording and timestamp. Dates, tuition and CE credit are unconfirmed.
- Submissions are stored as JSON in the existing Supabase project's private `cohort-interest` bucket under `hygienists-first/`. Filenames are SHA-256 hashes of course + normalized email. No public listing or download endpoint is added.
- The server lazily creates the private, JSON-only, 16KB bucket using the existing `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` deployment variables. It verifies bucket privacy/settings and reads the saved record back before returning success. Missing configuration/storage failures return an error and the visitor can email Thad.
- Repeated email submissions preserve the original details, consent and first submitted campaign. Direct arrivals record `source=direct`; link campaign parameters are recorded as supplied. This measures signup attribution, not all page visits or newsletter clicks.
- Confirmation appears on the page. No automatic email is sent by this feature. Course updates must later be sent to the consenting list; use the current requested details, not a promised launch date.
- Owner access: Supabase dashboard → Storage → `cohort-interest` → `hygienists-first`. For a CSV export, the trusted `scripts/export-cohort-interest.mjs` script uses existing server credentials and writes to an explicit output file. Reserved example/test email domains are excluded. Keep contact exports out of git.
- Existing portal profile roles are not used to authorize access to these leads. No lead-reading admin route is added.
- A small path-validation fix in the existing media uploader prevents its service-role paths from escaping into other storage buckets.
- No newsletter was sent or published as part of this page build.

## Validation

Run `npm test` and `npm run build`. Build-only placeholders may be needed locally for pre-existing integrations (Supabase, OpenAI, ElevenLabs); Vercel uses the project's existing environment.

Before release, verify the preview form saves a reserved-domain QA entry, repeated submission works without overwriting, anonymous storage access is denied, the live page renders, and production deployment is READY. Record the actual deployment outcome on the Trail.
