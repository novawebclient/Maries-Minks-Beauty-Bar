# Project Specification

## Identity and status

- **Project:** Marie’s Minks n Beauty Bar website
- **Approved public display name:** Marie’s Minks n Beauty Bar
- **Production origin:** https://mariesminksnbeautybar.com
- **Service context:** Appointment-only beauty business serving Ocala and surrounding areas
- **Decision-maker:** Angelina Dunn
- **Repository:** https://github.com/novawebclient/Maries-Minks-Beauty-Bar
- **Hosting/runtime:** Cloudflare Workers with Cloudflare-managed DNS and custom domain
- **Workflow status:** NOVA UWDW Step 4 complete — launched, verified, and documented
- **Last reconciled:** September 21, 2026

This file is the current project source of truth. The completed client questionnaire, later client instructions, approved images, and the deployed production behavior were reconciled for Step 4. Secrets, customer data, the paid manual, and private business records do not belong in this repository.

## Public business facts

- **General contact email:** angelinadunn1@aol.com
- **Privacy contact email:** angelinadunn1@gmail.com
- **Phone:** (352) 843-1383
- **Service area:** Ocala and surrounding areas
- **Location policy:** Appointment only; the home-studio street address is not published
- **Instagram:** https://www.instagram.com/mariesminksnbeautybar/
- **Facebook:** https://www.facebook.com/share/1U8psjBpbJ/?mibextid=wwXIfr
- **TikTok:** https://www.tiktok.com/@mariesminksnbeautybar_

## Launch goals

1. Present the business as a polished, luxury-oriented lash, waxing, brow, and facial studio.
2. Move service visitors into the appropriate Acuity booking path without requiring them to reselect a category unnecessarily.
3. Present separate education paths for private lash training, private Brazilian/body waxing training, and a self-paced digital lash manual.
4. Send training applicants to dedicated Jotform request forms.
5. Sell the digital manual through Square and release the private R2 file only after server-side payment verification.
6. Build trust with approved imagery, clear policies, FAQs, contact information, privacy disclosures, and an accessible responsive experience.
7. Make social connection—especially Instagram—easy while retaining Book Now as the persistent transactional action.

## Launch scope

### Public pages

| Route | Required outcome |
| --- | --- |
| `/` | Brand introduction, social action, service overview, gallery preview, education callout, and booking close |
| `/services/` | Service categories and appointment-specific booking actions |
| `/about/` | Approved business/educator story and portrait presentation |
| `/book/` | Embedded Acuity scheduler with selected appointment IDs and a direct fallback |
| `/education/` | Three clearly separated education offers |
| `/education/private-1-1/` | $750 private lash training details and lash-training Jotform handoff |
| `/education/waxing-training/` | $650 Brazilian/body waxing training, curriculum, inclusions, policies, FAQ, and waxing Jotform handoff |
| `/education/digital-manual/` | $147 manual description, exclusions, final-sale language, and Square checkout |
| `/education/digital-manual/success/` | Non-indexed payment verification and private download result |
| `/training/` | Backward-compatible redirect to private lash training |
| `/gallery/` | Approved client work in an intentionally diverse sequence |
| `/faq/` | Approved service, booking, payment, and training answers |
| `/contact/` | Phone, email, service area, appointment-only note, socials, and booking action |
| `/privacy/` | Plain-language launch privacy disclosure |
| `/policies/` | Booking, deposit, cancellation, rescheduling, lateness, lash-fill, preparation, refund, and training terms |
| `/404` | Branded recovery path |
| `/sitemap.xml` | Indexable public routes only |

### Services represented

- Individual lash extensions and fills
- Korean lash lift and tint
- Brow services
- Facial and body waxing
- Brazilian waxing
- Facials and other skin-focused treatments
- VIP beauty bundle
- Private lash education
- Private Brazilian and body waxing education
- Digital lash education manual

Exact consumer service availability, live duration, and bookable pricing are governed by the client’s Acuity scheduler. The site groups and routes services; it does not maintain a second complete service catalog that could drift from the booking source.

## Confirmed integration configuration

### Acuity

- Scheduler: https://mariesminksnbeautybar.as.me/
- The Book page embeds Acuity.
- `src/data/booking.ts` owns appointment-type mappings and builds both embedded and direct-provider URLs.
- IDs must be revalidated whenever the client adds, removes, or renames Acuity appointment types.

### Training request forms

- Lash request: https://form.jotform.com/262538566461061
- Waxing request: https://form.jotform.com/262606037948060
- Both open as external provider pages.
- Jotform stores the submitted request data under the form owner’s configuration. The website does not proxy or store submissions.

### Digital manual purchase and fulfillment

- Product: The Lash Artist Digital Training Manual
- Price: $147 USD
- Checkout provider: Square Online Checkout API
- Production Square location ID: `LF4WPYTAV6TXH`
- Payment state required for download: `COMPLETED`
- Storage: private Cloudflare R2 bucket `maries-minks-digital-products`
- Worker R2 binding: `PDF_BUCKET`
- Configured object key and download filename: `Ebook lash training manual .pdf`
- Webhook route: `/api/square/webhook`
- Checkout route: `/api/digital-manual/checkout`
- Download route: `/api/digital-manual/download`

The implementation creates a unique Square payment link, records a signed short-lived nonce as the Square order reference, verifies the order/location/item/amount/payment directly with Square, and only then streams the private R2 object. The success page and download response must remain non-indexable and non-cacheable.

### Social and contact

Social URLs and public contact data are centralized in `src/data/site.ts`. No custom contact form is in launch scope.

## Architecture

- Astro 7 in server output mode
- Cloudflare adapter and Worker runtime
- TypeScript/Astro components with project-owned local content data
- Sharp for image compilation/optimization
- Cloudflare Workers Builds from the GitHub `main` branch
- Cloudflare DNS/custom domain and `www` to apex permanent redirect
- Private R2 storage and Cloudflare Secrets Store runtime bindings
- External Acuity, Jotform, and Square services
- No site database, authentication, account portal, custom card form, or client-side payment handling

Marketing pages share `BaseLayout.astro`; global design rules live in `src/styles/global.css`. Business settings and booking mappings are separated from page presentation. Server-only payment behavior is isolated in `src/lib/digital-manual.ts` and the `src/pages/api/` routes.

## Security and privacy requirements

- Never expose Square access tokens, webhook signature keys, or download signing secrets in source, build variables, client JavaScript, logs, or screenshots.
- Keep the paid PDF outside the repository and public build output.
- Keep the R2 bucket private; access it only through the Worker binding.
- Reject mismatched checkout request origins.
- Verify payment server-side on every download request.
- Validate Square webhook signatures.
- Set private/no-store caching on transactional responses and downloads.
- Exclude API and purchase-success routes from search indexing and the sitemap.
- Do not publish the home-studio street address.
- Do not add analytics, Meta Pixel, newsletter tracking, advertising cookies, or other trackers without a new privacy/consent review.
- The launch privacy notice states the confirmed operating configuration; it is not a substitute for jurisdiction-specific legal advice.

## SEO, accessibility, and quality requirements

- Canonical URLs must use `https://mariesminksnbeautybar.com`.
- Public launch pages must be indexable; API and transactional routes must not be.
- `robots.txt` must point to the production sitemap.
- Unique titles/descriptions, Open Graph data, favicon, and BeautySalon structured data must use confirmed public facts only.
- Do not add unsupported ratings, street address, credentials, business hours, or testimonials to structured data.
- Preserve semantic landmarks, logical headings, keyboard-operable navigation, visible focus, useful alternative text, adequate contrast, 44-pixel touch targets, and reduced-motion support.
- Support current mobile, tablet, and desktop layouts without horizontal overflow.
- Provide direct-provider fallback links for embedded third-party experiences.
- Use a branded 404 and working direct-route responses.

## Content and rights record

The repository preserves original client-supplied assets under `assets/originals/`; optimized/build-time copies are imported by the site. During implementation, the client/user supplied the files and explicitly directed their public placement, cropping, reordering, or reuse. That direction is the project’s publication approval record. The repository does not contain independent photographer contracts, model releases, or trademark opinions; the business owner remains responsible for retaining any underlying rights documentation.

The paid training manual is intentionally absent from Git. It is an enrolled-customer product stored privately in R2.

## Launch decisions and documented deferrals

| Item | Launch decision |
| --- | --- |
| CMS/Sanity | Deferred. Current content is source-controlled and maintained by NOVA. Sanity is optional future scope, not a hidden dependency. |
| Newsletter/email capture | Excluded at launch by client decision. |
| Analytics, Meta Pixel, advertising trackers | Excluded at launch by client decision. |
| Testimonials/reviews | Deferred until approved, attributable content is supplied. No fabricated testimonials are permitted. |
| Blog/news | Deferred until a publishing plan and initial content exist. |
| Staff index | Deferred; no additional approved staff profiles supplied. |
| On-site search/localization | Not required for the launch content volume. |
| Custom service database/catalog | Excluded; Acuity remains the live availability, pricing, and duration source. |
| Product storefront/cart | Excluded; the only launch commerce item is the digital manual. |
| Custom user accounts | Excluded. |

These items are deliberate scope decisions and do not block launch.

## Ownership and access

| System | Intended owner/administrator | Launch note |
| --- | --- | --- |
| Domain and DNS | Client Cloudflare account | Domain purchased and active |
| Cloudflare Worker, R2, and Secrets Store | Client Cloudflare account | Production runtime and fulfillment |
| Square application/location | Client | Production values configured; secret values are not in Git |
| Acuity scheduler | Client | Existing scheduler and appointment types |
| Jotform forms | Client or designated form administrator | Confirm ongoing notification recipients and administrator recovery access |
| GitHub repository | NOVA-managed `novawebclient` organization at launch | Decide whether to transfer ownership or grant client admin/read access during handoff |
| Google Search Console | Client-owned Google account | Configure/verify during Step 4 launch handoff |

Unknown ownership details must be recorded as handoff actions rather than guessed.

## Build and deployment contract

- Package manager: pnpm 11.19.0
- Node engine: 22.12 or newer
- Build: `pnpm build`
- Deploy: `npx wrangler deploy`
- Cloudflare Worker name: `maries-minks-beauty-bar`
- Root directory: `/`
- Canonical branch: `main`
- Non-secret runtime values and bindings: `wrangler.jsonc`
- Secret runtime bindings: Cloudflare Secrets Store
- Local secret template: `.dev.vars.example`

A release is acceptable only when the lockfile install/build succeeds, direct routes work, external handoffs resolve, no secret/paid file is committed, metadata/indexing is correct, and rollback steps remain available.

## Portability

The project is source-controlled and can move, but the commerce path is provider-specific:

- Cloudflare Worker → another serverless runtime by replacing the adapter and `cloudflare:workers` bindings.
- R2 → a private S3-compatible object store by replacing `PDF_BUCKET.get()`.
- Secrets Store → the destination host’s encrypted runtime-secret system.
- Cloudflare DNS/CDN → any DNS provider after reproducing apex/`www`, TLS, redirects, and security headers.
- Square → another payment provider only after rebuilding checkout creation, webhook validation, completed-payment verification, and download authorization.
- Acuity/Jotform → replacement hosted providers by updating centralized mappings/URLs and privacy copy.

Marketing content and page components are largely provider-neutral. Server-side manual fulfillment should not be treated as a static-hosting-only site.

## Step 4 exit criteria

Step 4 is complete only when:

- The production build and route checks pass.
- Client requirements and documented launch deferrals are reconciled.
- Public indexing, canonical URLs, sitemap, robots rules, metadata, structured data, and 404 behavior pass.
- Navigation, booking, training forms, checkout initiation, verified-download behavior, contact links, and media pass.
- Mobile, tablet, desktop, keyboard, reduced-motion, and basic accessibility checks pass.
- Production-domain and `www` behavior pass.
- Handoff/operations documentation, asset records, environment template, account ownership notes, and migration paths are current.
- Source is committed, pushed, tagged or otherwise release-marked, and the deployed revision is identified.
- Search Console setup is completed or recorded as a client-owned post-launch action.
