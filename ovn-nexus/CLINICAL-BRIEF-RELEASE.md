# Clinical brief release

## Visitor experience

- Homepage: a clinical introduction, interactive evidence map, clear route to the brief.
- `/for-dentists`: ungated essentials, human/preclinical evidence labels, source links, patient conversation starter, PDF download, and an invitation to email Thad.
- `/for-dentists/guide`: accessible HTML companion to `/downloads/ovn-clinical-conversation-guide.pdf`.
- Sharing: canonical public URL and 1200 × 630 social preview; clipboard failure exposes a selectable URL.
- Navigation: native mobile menu and preserved access to education, CE, music, showcase, and member hub.

## Content and evidence

The homepage and science presentation no longer contain the incorrect dementia figure or misleading population-burden framing. General research findings are distinguished from commercial product evidence. Author affiliations are not presented as institutional endorsement. No testimonial, clinical outcome, or video was fabricated.

Source records live in `lib/clinical-evidence.ts`. They point to the AHA 2026 statement, Tonetti's 2007 endothelial-function trial, the 2022 Cochrane diabetes review, and Gong's 2022 animal/cell study. Recheck sources before changing clinical claims. The date on the brief records this evidence check; it does not imply independent physician sign-off on this edition.

## Run and verify

Run from the `ovn-nexus` application directory with Node 22 or 24 and npm 11. npm 10.9.4 hit an upstream peer-resolution error when updating the test tools; npm 11 resolves and installs this lockfile successfully:

```sh
npx --yes npm@11 ci
npm test
npm run build
npm run verify:clinical
npm start
```

The existing app requires its Supabase public URL/key and OpenAI key to be configured for a full build. Use the existing Vercel project's environment for deployment. Never commit environment files or credentials. For a local build-only check, these nonfunctional values allow the existing integrations to initialize without granting account access:

```sh
NEXT_PUBLIC_SUPABASE_URL=https://example.supabase.co \
NEXT_PUBLIC_SUPABASE_ANON_KEY=local-build-placeholder \
OPENAI_API_KEY=local-build-placeholder npm run build
```

These values are exclusively for local build checks; do not deploy them. They cannot validate login, research data, or AI integrations.

## Framework maintenance

Next.js moved from 14.1.0 to 15.5.25, a patched maintenance release following the August 25, 2026 security advisory: https://nextjs.org/blog/august-2026-security-release . Sharp was updated to 0.35.4. Next uses a PostCSS 8.5.28 override to avoid its vulnerable pinned CSS dependency; remove that override when the framework ships a fixed dependency. Compatible transitive dependency fixes were also applied. Server cookies, headers, route parameters, and their callers now await the Next 15 request APIs. Database operations and research/admin authorization rules remain in place. Only the three exact public editorial routes bypass authentication initialization.

## Validation and limits

- Production build and TypeScript checks; 95 static pages generated.
- Automated interaction tests for evidence selection and both clipboard outcomes.
- Access regression tests for public routes, lookalike paths, unauthenticated access, research membership, and admin restrictions.
- Next 15 cookie adapter regression test.
- Built HTML checks for anchors, headings, corrected claims, canonical sharing metadata, download reference, and sitemap entries.
- One-page PDF text and five link annotations checked; PDF and share image rendered and visually inspected.
- Desktop/mobile browser walkthrough could not run because Codex's admin policy verification service denied browser access. Do not treat source and component checks as a completed browser walkthrough.
- Final dependency audit: zero critical, high, or moderate findings; two low findings remain in the pre-existing Supabase SSR/cookie chain. A separate authentication-library migration can address those.
- No live login, patient records, AI generation, or outbound messages were exercised.

## Publication

Use the existing GitHub repository `Gengyveusa/ovn-nexus` and Vercel project `ovn-nexus` in `gengyveusas-projects`. Validate the branch preview build, then merge to `main` for production. Confirm the production deployment commit and `www.ovnnexus.com` / `ovnnexus.com` aliases. The pre-upgrade production commit was `102cb77c69b5de707dc2ef0cfe6d455683e8283c`; roll back through Vercel or revert the release commit if required.
