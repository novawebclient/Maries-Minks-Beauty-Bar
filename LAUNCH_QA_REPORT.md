# Step 4 Launch QA Report

## Scope and constraints

- Project: Marie’s Minks n Beauty Bar
- Canonical origin: `https://mariesminksnbeautybar.com`
- Test date: September 21, 2026
- Workflow: NOVA Universal Website Development Workflow, Step 4
- Visual constraint: the approved page imagery, layout, palette, typography, and content presentation were preserved during the final verification pass.

This report covers the source-controlled site, the local Cloudflare Worker build, public provider handoffs, and the production smoke test. It does not reproduce secret values, customer records, payment details, form submissions, or the paid manual.

## Requirements reconciliation

- All required public pages and the three Education paths are present.
- Lash and waxing training pages contain their approved investment, deposit, curriculum, inclusions, policy, FAQ, and request-form handoffs.
- The digital manual remains a separate $147 product with Square-hosted checkout and private R2 fulfillment.
- General booking remains in Acuity; lash and waxing training requests remain in their dedicated Jotforms.
- Privacy and policy pages reflect the confirmed launch configuration: no Google Analytics, Meta Pixel, newsletter, advertising tracker, customer-data sale, or marketing-data sharing.
- Documented deferrals—CMS, newsletter, analytics, testimonials, blog, staff index, custom accounts, and a larger storefront—are intentional and are not launch blockers.

## Build and source checks

| Check | Result |
| --- | --- |
| `pnpm build` using the Cloudflare adapter | Pass |
| `git diff --check` | Pass |
| Credential-pattern scan of source and documentation | Pass; no secret value found |
| Paid PDF/manual in Git or public build output | Pass; not present |
| Stale GitHub Pages deployment/configuration | Removed |
| Obsolete, unused generated campaign concepts | Removed |
| Local missing Secrets Store values | Fail closed without a framework error |

## Route and responsive matrix

The following routes were exercised directly at desktop (1440 × 900), tablet (820 × 1180), and mobile (390 × 844):

- `/`
- `/about/`
- `/services/`
- `/gallery/`
- `/education/`
- `/education/private-1-1/`
- `/education/waxing-training/`
- `/education/digital-manual/`
- `/book/`
- `/faq/`
- `/contact/`
- `/privacy/`
- `/policies/`
- a nonexistent path for 404 behavior

Results:

- No horizontal overflow at any tested viewport.
- No broken rendered images.
- Exactly one page-level `h1` on each route.
- Public pages use `index, follow`; the branded 404 uses `noindex, follow`.
- Canonical URLs resolve to the production apex origin.
- Mobile navigation opens and exposes every primary route.
- Desktop Education pricing rows remain aligned and the action area clears the footer.
- The gallery lightbox opens, moves focus to its close control, closes, and restores focus to the originating image button.

## Accessibility smoke checks

- Skip link and visible keyboard focus verified.
- Navigation and gallery controls are keyboard operable.
- No rendered image is missing an `alt` attribute.
- No tested link or button has an empty accessible label.
- No duplicate IDs were found on the tested routes.
- Acuity iframes have titles and direct-provider fallback links.
- Reduced-motion styling is present.
- This is a practical launch smoke test, not a substitute for a formal third-party WCAG conformance audit.

## Metadata, indexing, and error handling

- Unique page titles and descriptions are present.
- Canonical, Open Graph, Twitter-card, favicon, and BeautySalon structured data are present and use confirmed public facts.
- `robots.txt` permits public crawling, excludes API and purchase-success paths, and points to the production sitemap.
- `sitemap.xml` contains only public launch routes.
- The purchase-success page and transactional API responses are non-indexable and non-cacheable.
- A branded 404 renders on an unknown direct route.
- Security headers include CSP, HSTS, content-type protection, referrer policy, permissions policy, and frame restrictions.

## Integration checks

| Integration | Verification |
| --- | --- |
| Acuity | Public scheduler resolves to the client’s live appointment catalog; embedded and direct fallback URLs verified |
| Lash Jotform | Resolves to “Request Your 1 to 1 Lash Training Date”; no test submission created |
| Waxing Jotform | Resolves to “Request Your 1:1 Waxing Training Date”; no test submission created |
| Square | Production environment/location and hosted-checkout flow configured; checkout creation is same-origin protected |
| R2 | Private bucket binding and exact manual object key documented; download requires server-side completed-payment verification |
| Webhook | Production endpoint and `payment.updated` signature validation documented |

The production payment, verification, and R2 delivery flow was previously completed successfully with a controlled transaction. Final release verification rechecks checkout initiation without creating another charge.

## Operations and portability

- `README.md`, `PROJECT_SPEC.md`, `OPERATIONS_HANDOFF.md`, asset records, and `.dev.vars.example` reflect the production architecture.
- Build variables are clearly separated from Runtime values/secrets.
- Deployment, rollback, R2 replacement, backup, incident response, and provider-migration procedures are documented.
- Domain/DNS, Worker, R2, Secrets Store, Square, Acuity, and form ownership boundaries are recorded.
- Search Console verification is recorded as a client-owned post-launch account action; the site is crawlable before Google completes indexing.

## Release verification

Step 4 is complete.

- Source release pushed to `main`; release record identified by tag `launch-2026-09-21`.
- Cloudflare deployed the release successfully to the production custom domain.
- All 13 sitemap routes returned HTTP 200; an unknown route returned the branded HTTP 404.
- `www.mariesminksnbeautybar.com/education/?qa=step4` returned a permanent 301 to the same path and query on the apex domain.
- The production sitemap, crawlable robots policy, canonical URL, social metadata, favicon, structured data, security headers, and private/no-store transactional headers are live.
- A mismatched checkout origin returned HTTP 403.
- A same-origin production checkout request returned a Square-hosted checkout showing **The Lash Artist Digital Training Manual**, **$147.00**, and **Pay $147.00**. No payment details were entered and no charge was submitted.
- Acuity, both Jotforms, the gallery interaction, navigation, direct routes, and responsive layouts passed their recorded checks.
- No launch blocker remains. Google Search Console property verification/submission remains a client-owned post-launch account action, as documented in `OPERATIONS_HANDOFF.md`.
