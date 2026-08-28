# Project Specification

## Project identity and status

- **Project name:** Marie’s minks n beauty bar website
- **Client-facing display name:** Marie’s Minks & Beauty Bar, confirmed by the client during Step 3 review on August 28, 2026; legal-name confirmation remains required before production launch if it differs from the display name
- **Project type:** New marketing website
- **Workflow status:** Step 0, the questionnaire-driven Step 1 reassessment, and Step 2 are complete. Step 3 implementation began on August 28, 2026. A local, non-production preview now covers the approved route structure; final client content and provider-account decisions remain pending.
- **Repository location:** `C:\Users\Michael Bellony\Documents\ChatGPT\NOVA Web Services Projects`

This document is the project source of truth. Update it whenever requirements or architectural decisions materially change. Do not store credentials or private customer information here.

## Client intake record

- **Source:** Completed NOVA Website Starter Questionnaire submission dated August 27, 2026. The raw CSV remains outside the repository; its signed asset URLs are not copied into project documentation.
- **Final website decision-maker:** Angelina Dunn
- **Preferred public contact:** angelinadunn1@aol.com · +1 352-843-1383
- **Public business context:** Appointment-only home studio; address is provided after booking; service area is Ocala and surrounding areas.

## Purpose, audience, and conversions

The website will introduce a versatile beauty specialist offering individual lash extensions, Brazilian waxing, brow waxing/tinting/lamination, lash lifts and tints, facials, and lash/wax training classes. It serves customers seeking a polished, luxury-oriented beauty experience in Ocala and surrounding areas.

The questionnaire identifies following and connecting on social media as the #1 visitor action. Secondary conversions are understanding and purchasing services, booking through Acuity, paying through approved Square flows, joining an email list, viewing the portfolio, reading reviews, and contacting the business. The audience is described as professional, high-maintenance customers who value the upkeep and experience of luxury services.

## Step 1 reassessment — intake findings

### Confirmed from the questionnaire

- Brand: Marie’s Minks & Beauty Bar (display capitalization/punctuation confirmed during Step 3 review; legal spelling still needs confirmation if different)
- Business: versatile beauty specialist serving Ocala and surrounding areas from an appointment-only home studio
- Services: individual lash extensions, Brazilian waxing, brow waxing/tinting/lamination, lash lifts/tints, facials, and lash/wax training classes
- Public contact: +1 352-843-1383 and angelinadunn1@aol.com
- Public social links: Facebook, Instagram, and TikTok
- Primary visitor action: follow/connect on social media
- Desired customer actions: contact, book, pay online, join an email list, view a gallery, read reviews, and view services/pricing
- Existing providers: Acuity for booking and Square for an unresolved payment/store use case
- Desired domain: `Mariesminksnbeautybar.com`; current ownership is unknown
- Brand direction: luxurious and professional; black, white, soft pink, and gold
- Content workflow: combination of NOVA-managed and client-managed updates
- Client-editable areas requested: prices, services, photos, blog/news, business hours, promotions, staff information, and testimonials
- Nine private image links were supplied, downloaded into `assets/originals/client-questionnaire/`, and inventoried without retaining their signed source URLs. They are professional brand/about/training portraits, not a treatment-results portfolio. Identity, ownership, releases, and publication approval remain required.

### A — Required before final content implementation or launch approval

- Final business name, capitalization, punctuation, logo, brand assets, approved colors, and typography
- Complete service and training menu with approved names, descriptions, prices, durations, preparation/aftercare, contraindications, class details, and permissions
- Decision on whether website pricing is maintained manually, mirrored from Acuity, or managed through a client-editable content source
- Confirmation that the client-owned Sanity CMS plan and administrative access model are acceptable; whether blog/news is required at launch
- Square purpose and scope: service deposits, training payments, products, or another offer; plus refund/deposit policy
- Email-list provider, signup destination, consent language, unsubscribe handling, ownership, and budget
- Approval of the Step 2 contact decision: public phone, email, and social links at launch, with no custom contact form
- Approved treatment-result portfolio images, testimonials/reviews, releases, and intended use for the nine supplied portraits
- Training-class schedule, format, location, capacity, curriculum, credentials, pricing, and Acuity/Square flow
- Booking, cancellation, rescheduling, late-arrival, deposit, refund, privacy, and customer policies
- Domain ownership/availability, hosting preference, source ownership, launch date, and budget

### B — Safe as temporary placeholders

- Existing Astro pages and visual direction can remain as a reviewable prototype while Step 2 compares architectures.
- Generated campaign imagery, generic FAQ copy, and provisional service descriptions can remain only when clearly marked as concept or pending client approval.
- “Ocala and surrounding areas” and “appointment only” can be used as provisional public context; the home-studio address should remain private.
- Direct Acuity booking can remain as the temporary booking path while final service, pricing, and policy copy are approved.

### C — Safe to add later

- Blog/news content and promotion history after the editing workflow is selected
- Additional staff profiles after approved biographies and photography are available
- Advanced analytics, advertising pixels, localization, on-site search, and other growth features after launch goals and privacy requirements are defined
- Expanded product commerce if the client confirms that products are actually in scope

### Material to Step 2

The questionnaire changes the project from a small brochure site into a service, portfolio, social-conversion, booking, payment-link, email-list, and client-editable content project. Step 2 confirmed that these needs justify a hosted content layer and additional external integrations, but not a backend application or a replatform.

## Confirmed information architecture — Step 2

| Route | Purpose | Launch scope |
| --- | --- | --- |
| `/` | Brand introduction, primary Instagram/social connection, service overview, featured work, reviews, email signup, and trust content | Required |
| `/services/` | Lash, waxing, brow, lash-lift/tint, and facial services with approved prices and direct Acuity handoffs | Required |
| `/training/` | Lash and wax training offers, instructor credibility, expectations, availability, and approved booking/payment path | Required once class details are supplied |
| `/gallery/` | Approved treatment-result portfolio organized by service family; brand portraits may support editorial sections but do not substitute for results | Required once result photography is supplied |
| `/about/` | Technician story, experience, credentials, approach, and appointment-only studio expectations | Required |
| `/contact/` | Public phone, email, service area, appointment-only expectations, and social links; no custom form at launch | Required |
| `/book/` | Embedded Acuity flow, service-specific handoff, direct-provider fallback, and booking guidance | Required |
| `/privacy/` | Website, newsletter, embedded-provider, and analytics disclosures based on the final configuration | Required before launch |
| `/policies/` | Booking, cancellation, rescheduling, lateness, deposit, refund, service, and training policies | Required before launch |

Reviews and FAQs are sections on Home and Services rather than standalone routes. A journal/blog, shop, staff index, on-site search, locations page, and individual service-detail routes are deferred until the client supplies enough content and confirms they are needed. This keeps the first release focused and avoids empty or thin pages.

### Navigation and CTA hierarchy

- The wordmark/logo links Home. Primary navigation is Services, Training, Gallery, About, and Contact, with Book as the persistent high-emphasis action.
- The Home hero’s primary community action is Follow on Instagram, matching the questionnaire. Book an appointment remains the principal transactional action in the header, service cards, and lower-page conversion panels.
- Every service CTA must pass the matching Acuity appointment-type ID or filtered appointment-type set so visitors do not reselect a service they already chose.
- Training CTAs must link directly to the confirmed Acuity class or Square payment link. Do not use the supplied Square URL until its exact offer, price, and policy are confirmed.
- Newsletter signup is a secondary retention action. Phone, email, Facebook, Instagram, and TikTok remain direct contact/social options.
- Mobile navigation must keep Book immediately accessible, use a keyboard-operable menu, avoid horizontal overflow, and maintain touch targets of at least 44 by 44 CSS pixels.

### Page-content blueprint

- **Home:** brand proposition; approved portrait/editorial imagery; services summary; social/Instagram prompt; selected treatment-work preview when available; experience/differentiator; reviews; training callout; newsletter; booking close.
- **Services:** short service-navigation index; category sections; approved description, price, duration, preparation/aftercare summary, contraindication prompt, and direct booking action for each offer; FAQ; policies link.
- **Training:** who the classes serve; lash/wax tracks; instructor credentials; curriculum/outcomes; format, dates, capacity, location, inclusions, price, policy, and direct registration/payment action once confirmed.
- **Gallery:** approved results only, filterable by simple service-category controls if volume justifies it; no search system or client uploads. Each image requires useful alternative text or a documented decorative treatment.
- **About:** approved technician identity, biography, qualifications, specialties, values, experience, studio approach, and portrait photography.
- **Contact:** phone, email, service area, appointment-only note, social profiles, booking action, and response expectations. Do not expose the home-studio address.
- **Book:** short booking guidance; embedded Acuity scheduler seeded from the selected service where possible; direct Acuity fallback; approved booking/policy reminders.
- **Privacy/Policies:** plain-language disclosures and client-approved operational policies; footer access from every page.

### Component and interaction plan

- Shared layout, metadata, header, mobile navigation, footer, section heading, button/link, image treatment, and conversion-panel components
- Structured service-category, service-card, price/duration, training-offer, gallery-grid/item, testimonial, promotion, staff/profile, and policy components fed through project-owned content models
- Integration components for Acuity booking links/embed, Square payment links, newsletter signup, and social links; each receives configuration/content rather than hard-coding provider values into visual components
- Progressive enhancement only: content and navigation remain usable without client-side JavaScript except where Acuity/Brevo provider interfaces inherently require it
- No carousel required. Use a responsive grid or editorial sequence unless real content volume establishes a clear need for another interaction.
- Motion must be optional, restrained, and disabled by `prefers-reduced-motion`. Dialogs/menus, if used, must manage focus, escape behavior, labels, and return focus correctly.

### Footer and legal structure

The footer must include the approved display name, Ocala-area service context, appointment-only note, phone, email, direct social links, primary navigation, Book action, newsletter signup or link, Privacy, Policies, and copyright. It must not publish a street address. Privacy and policy copy require client/legal approval; NOVA should not invent legal terms.

### Customer journeys

1. A local-service or social visitor lands on Home or Services, understands the offer, sees approved proof, chooses a service, and reaches that Acuity appointment type without reselecting it.
2. A community-oriented visitor reaches Instagram/TikTok/Facebook through a clear direct action or joins the newsletter through the provider-owned consent flow.
3. A training prospect enters Training, verifies fit and instructor credibility, reviews class details/policies, and follows the confirmed Acuity or Square path without encountering an unrelated generic checkout.
4. A trust-seeking visitor reviews About, Gallery, testimonials, contact context, and policies before booking.

## Required functionality

- Responsive informational website
- Clear navigation across the final approved information architecture
- Service information and prices for individual lashes, Brazilian waxing, brows, lash lifts/tints, facials, and training classes
- Technician information based only on client-approved facts
- Social links and a primary follow/connect conversion path
- Contact method using approved public phone/email and any client-approved form
- Portfolio/gallery and testimonials/reviews using approved assets and permissions
- Email-list signup using a client-approved provider and consent flow
- Embedded Acuity Scheduling integration rather than a custom booking system
- Service-specific and service-family booking links that preserve the visitor’s website selection
- Square payment/store link integration where the client confirms what customers should pay for online
- Lash and waxing training-class information and booking/payment flow, subject to Acuity/Square confirmation
- Approved client photography and brand assets; generated concept imagery must not replace real portfolio material when the client supplies it
- Search-friendly semantic HTML and per-page metadata
- Keyboard-accessible navigation, visible focus states, reduced-motion respect, and a WCAG 2.2 AA design target

Not currently requested: user accounts, authentication, a database, client dashboards/portals, file uploads, on-site search, localization, or custom product e-commerce. A custom payment flow is not selected; Square remains an external option until scope is clarified.

## Expected sophistication

This is a professional service, portfolio, social-conversion, and booking website with possible lightweight content management. It needs strong visual presentation, accessibility, performance, local-service SEO, maintainable service/pricing content, social/email conversion paths, and maintainable content updates. It does not currently justify application-level infrastructure.

## Architecture decision

### Selected architecture

- Preserve the existing statically generated Astro 7.2.6 site and pnpm 11.19.0 conventions.
- Add a client-owned Sanity project as the structured content-management layer during Step 3. Published content is fetched at build time; the public site remains static and does not need a persistent server runtime.
- Keep presentation components independent of Sanity document shapes. A small content adapter maps CMS records into project-owned TypeScript models so changing CMS providers does not require redesigning the site.
- Keep schema definitions and Studio configuration in the source repository. Maintain periodic Sanity dataset exports, including assets, as transferable backups.
- Use source-controlled local fixture content before the CMS is provisioned. Once the production dataset is enabled, missing required CMS configuration must fail the production build clearly instead of silently publishing stale placeholder content.
- Continue using standard Astro components, semantic HTML, and CSS. Do not add React, Vue, Svelte, Tailwind, a UI kit, server adapter, custom API, authentication, or an application database without a new requirement.
- Node.js 22.12 or newer on an Astro-supported even-numbered release remains the runtime convention; the project was created and validated with Node.js 24.19.0.

### Why this fits

Astro remains well suited to a mostly editorial local-business site whose interactivity is limited to navigation and third-party service handoffs. Static output gives fast pages, small attack surface, broad hosting compatibility, and simple source transfer. Sanity is justified because the client explicitly wants to update services, prices, photography, hours, promotions, staff, testimonials, and possible news content without editing source code. The adapter and export strategy limit provider lock-in while avoiding a custom CMS or backend.

### Content models

The Step 3 schema should cover `siteSettings`, `serviceCategory`, `service`, `trainingOffer`, `galleryItem`, `testimonial`, `promotion`, `staffMember`, and `policy`. An `article` model may be prepared but should not create a public journal route until the client confirms launch content. Models must use stable slugs/keys, explicit display order, draft/published state, accessible image alternative text, and optional Acuity/Square references rather than provider-specific logic in components.

### Alternatives considered

- **Plain HTML/CSS/JavaScript or Astro with local files only:** Sufficient for visitors, but not for the requested client editing experience. It remains the lowest-cost fallback if the client declines a CMS and accepts NOVA-managed updates.
- **Git-backed CMS:** More provider-neutral and potentially no-cost, but it ties the editing workflow to a remote Git provider and authentication setup and is less approachable for this client than a focused content studio.
- **WordPress or a closed website builder:** Adds replatforming, hosting/maintenance, plugin, security, or source-portability costs without a compensating requirement.
- **React/Next.js or another full-stack framework:** Capable but unjustified because there is no custom state, authentication, dashboard, server rendering, database, or bespoke commerce requirement.
- **Custom backend/database:** Rejected because Acuity, Square, Brevo, and Sanity already cover the specialized data flows more safely and with clearer ownership.

## Dependencies

Current application dependencies are `astro` and `sharp`. Sharp is used only at build time to generate responsive image derivatives. Build-time transitive dependencies are locked in `pnpm-lock.yaml`.

Step 3 may add the official Sanity client to the site and the minimum packages required for a separately deployable Sanity Studio. Do not add CMS plugins beyond the core editing requirement. Brevo, Acuity, Square, and social links should use supported hosted/embed/link mechanisms and do not require SDK dependencies. No analytics, UI framework, styling framework, payment SDK, or hosting adapter is selected.

## Content and CMS strategy

Sanity is the selected client-editable content layer, subject to client acceptance of its account/role model. The Sanity organization/project must be created under client-controlled credentials, with NOVA invited only as needed. The initial Free plan is sufficient for this site’s expected content volume, but its datasets are public and its available working roles are Administrator and Viewer; the client must approve having administrative access or approve the paid Growth role model.

Services and displayed prices are editorial content in Sanity; Acuity remains the scheduling source of truth. There is no reliable reason to scrape or tightly couple the public scheduler. The maintenance procedure is to update Acuity first, update the matching CMS service record second, and run a price/name/deep-link audit before publishing. Promotions must carry start/end dates and should not remain visible after expiration.

The website repository owns the content models and rendering rules. Sanity owns published content records and uploaded CMS media, with documented dataset exports for backup/migration. If the client declines Sanity, the same project-owned models can be supplied from local version-controlled content, with NOVA managing changes; this fallback does not require replatforming.

## Data and storage

The website should not store customer, appointment, payment-card, or training-registration data. Acuity remains the system of record for availability, appointments, customer booking details, and any payment enabled inside Acuity. Square remains the system of record for transactions made through approved payment links. Brevo is the recommended system of record for newsletter contacts and consent. Sanity stores public editorial content and approved media only; do not place customer records, private home-address details, credentials, or secrets in the CMS.

## Acuity Scheduling integration

- The supplied scheduler resolves to the client-owned public page at `https://mariesminksnbeautybar.as.me/`.
- `/book/` embeds the Acuity scheduler using Acuity’s supported iframe and resize script. A separate-window Acuity link remains directly below it as an accessibility and failure fallback.
- Generic booking calls to action stay on the website and move visitors to the embedded scheduler.
- Service calls to action pass Acuity’s supported `appointmentType` parameter. Exact services use one public appointment-type ID; broader labels use Acuity’s supported repeated `appointmentType[]` parameter to show only the relevant choices.
- The public scheduler currently has no appointment categories configured, so category deep links are not used. Provider-specific IDs and URL construction are isolated in `src/data/booking.ts` so the integration can be updated without editing every page.
- Appointment-type mappings were verified against the public scheduler on August 24, 2026. Reverify them before launch and whenever the client adds, removes, renames, or replaces an Acuity appointment type.
- Do not copy credentials, private calendar data, or account secrets into the repository.
- Test through time selection without confirming or paying before launch; do not create a real appointment during website QA.
- Acuity is an existing external service dependency. Its subscription tier, limits, and production cost are unresolved; this project has not created or upgraded an account.

## Other integrations selected in Step 2

- **Square Payment Links:** Use direct links or Square’s supported buy-button output only after the client confirms the supplied link’s exact offer, price, and refund/deposit terms. The website will not handle card fields or payment webhooks. Do not build a product catalog or cart at launch while the questionnaire’s product-scope answers conflict.
- **Social media:** Use ordinary outbound links to the supplied Instagram (`https://www.instagram.com/mariesminksnbeautybar/`), Facebook (use the supplied share URL until the client provides a canonical business-page URL), and TikTok (`https://www.tiktok.com/@mariesminksnbeautybar_`) profiles. Instagram is the primary community CTA. Avoid social-feed embeds at launch because they add tracking, performance cost, and failure states without being required.
- **Email list:** Recommend a client-owned Brevo account and a hosted or embedded subscription form configured for explicit consent, double opt-in where appropriate, unsubscribe handling, and provider-side storage. The provider URL/list identifier must be configuration, not duplicated across templates. If the client already has another compliant email provider, retain the same provider-neutral component and substitute its supported form.
- **Contact:** Launch with the approved public phone number, email address, and social links. Do not add a custom contact form until the client requests one and approves notification, spam, retention, and privacy behavior.
- **Training classes:** Present training on its own route, but publish payment/registration CTAs only after class format, schedule, location, capacity, curriculum, credentials, price, and Acuity/Square responsibility are confirmed.
- **Analytics and advertising:** None selected. Add only after the client identifies decisions the data will support and approves privacy/cookie requirements.
- **Maps/location:** No map or public street address. Describe the appointment-only Ocala-area service context and state that the home-studio address is provided after booking.

## Deployment and portability

No hosting provider, production domain, or remote Git provider has been selected. The supplied `chatgpt.site` URL is a visual reference and client preview, not the deployment target for this portable project. Astro remains configured for static output. The deployable artifact is the standard `dist/` directory, which can be served by many static hosts, object/CDN hosts, or conventional web servers without a framework-specific runtime.

Provider-specific behavior must be isolated: Acuity URL construction in the booking data/service module, CMS queries in the content adapter, Brevo configuration in the newsletter component, and Square URLs in content/configuration. Sanity schemas and Studio configuration live with the source, and documented dataset exports include content and assets. Reasonable adapter/configuration work may be needed to change providers; a redesign or framework rewrite should not be required.

`public/robots.txt` currently blocks indexing to protect an unfinished site. Step 4 must replace that rule when the production domain and launch approval are confirmed.

## Ownership and cost model

- Source repository: client-controlled or transferable; no remote is connected yet
- Hosting/domain: unresolved; do not open or purchase accounts without approval
- Acuity: expected to remain client-owned; existing plan details are unresolved
- Square Payment Links: no monthly fee; Square currently lists a 3.3% + $0.30 standard online processing fee for new US customers, with different pricing possible by account/payment method
- Sanity: recommended Free plan is $0 and currently includes 20 seats, 2 public datasets, 10,000 documents, 100 GB assets, 100 GB monthly bandwidth, 1 million monthly API CDN requests, and 250,000 monthly API requests. Free has no paid overages; Growth currently starts at $15 per seat per month and permits paid overages. Recheck limits before account creation.
- Brevo: recommended Free plan is $0 and currently permits 300 email sends per day, storage for up to 100,000 contacts, one user, and Brevo branding. Starter currently begins at $9 per month. Recheck limits before account creation.
- No provider account, subscription, purchase, or new recurring charge was created in Step 2

## Security and privacy

- No secrets belong in source control or `PROJECT_SPEC.md`.
- The static marketing pages do not collect personal data directly. The embedded booking page loads Acuity and its supporting third-party resources inside an iframe.
- Booking data is handled by Acuity under the client's Acuity configuration and applicable terms.
- Card data is handled on Square/Acuity-controlled checkout surfaces and must never pass through this repository or a custom website endpoint.
- Newsletter subscriptions are handled by Brevo or the client-approved replacement. The final privacy notice must identify the provider, purpose, consent basis, unsubscribe method, and retention/contact process.
- Sanity is limited to approved public editorial content. Use environment configuration for project IDs/datasets and tokens; use no write token in public browser code and commit no credentials.
- Analytics, advertising pixels, cookie consent, privacy policy, and data-retention requirements are unresolved. Do not add trackers by default.
- If later content introduces forms, payments, medical/skin-condition intake, or sensitive data, reassess privacy, consent, security, and compliance before implementation.

## SEO and accessibility

- Use unique titles and descriptions for confirmed pages.
- Preserve semantic landmarks, logical headings, accessible navigation, keyboard operation, visible focus indicators, adequate color contrast, useful alternative text, and reduced-motion support.
- Target WCAG 2.2 AA while recognizing that final conformance depends on approved content, imagery, Acuity behavior, and testing.
- Add the questionnaire’s public service area (Ocala and surrounding areas), appointment-only hours, phone, email, and final business name after confirming display preference and legal spelling. Do not publish the home-studio address; it is provided after booking.
- Add `BeautySalon`/local-business structured data using only confirmed public facts, including `areaServed` and supplied social profiles; omit a street address and unsupported ratings, prices, credentials, or opening hours.
- Optimize pages around honest service-and-location language such as lash extensions, Brazilian waxing, brow services, lash lifts/tints, facials, and beauty training in the Ocala area. Do not create doorway pages for surrounding cities without distinct, useful content.
- Add canonical URLs, sitemap behavior, social-sharing metadata, and production robots rules after the canonical domain is known.
- An original `public/og.png` social card is ready. Open Graph/X titles and descriptions are implemented; the image URL activates when a trusted canonical `site` origin is configured.

## Growth and maintenance plan

- Begin with social links, service-specific booking attribution where Acuity/Square support it, and newsletter growth. Do not add advertising pixels, remarketing, or behavior tracking by default.
- Use descriptive provider/link labels and, if analytics is later approved, record only the minimum outbound conversion events needed to evaluate booking, social, payment, and signup actions.
- Client/NOVA content workflow: client may edit approved Sanity fields; NOVA maintains schema, layouts, accessibility, integrations, and releases. Material navigation, schema, policy, or integration changes require NOVA review.
- Update Acuity first and Sanity second for service names/prices, then verify every service-specific link. Review mappings before each release and after scheduler changes.
- Review promotions for expiry, test all external links, and check public contact/hours quarterly or before campaigns.
- Export the Sanity dataset with assets after major content migrations and on an agreed recurring cadence; keep exports outside public web output and under client-controlled storage.
- Recheck provider pricing/quotas before account creation and at least annually. No upgrade or paid add-on is authorized without client approval.

## Visual direction confirmed by questionnaire and reference

- Bright white background
- Saturated editorial pink and deep black campaign panels
- Luxurious and professional feel with black, white, soft pink, and gold accents
- Modern Inter-based typography throughout the current refinement; the header wordmark uses the client-requested Inter Variable/Arial stack
- Magazine-like image blocks, service accordions, strong booking panels, and restrained geometric decoration
- Direction is informed by the supplied `maries-minks-beauty-bar.mrb1-personal.chatgpt.site` client preview without copying its source, logos, or imagery
- Nine client-provided portrait originals are organized in `assets/originals/client-questionnaire/` and documented in `assets/ASSET_INVENTORY.md`. They are suitable candidates for approved brand, About, and Training use. They do not show lash, brow, waxing, facial, or other treatment results and therefore cannot satisfy the gallery requirement by themselves.
- The client supplied and approved one circular gold-ring portrait for small header brand use during Step 3 review. It replaces the former text monogram in the website header.
- Existing generated campaign imagery is original concept work and must not be presented as the technician, treatment results, or client portfolio once approved client photography is available.

## Unresolved client information and architecture questions

- Legal business name confirmation if it differs from the approved display name, `Marie’s Minks & Beauty Bar`
- Logo and complete brand guidelines; exact pink and gold tones, typography, and usage rules are not approved
- Technician's preferred name, pronouns, title, biography, experience, licenses, certifications, specialties, and service philosophy
- Final approval of website service labels, descriptions, preparation instructions, aftercare, contraindication language, and training-class content; the client requested website prices but supplied no price sheet
- Final service menu, prices, durations, and matching Acuity appointment types. Step 2 selected Sanity as the website display source and Acuity as the booking source; both require a controlled update/audit process.
- Questionnaire scope conflict: “Sell products” is selected as a goal, while “Buy products” is not selected as a website capability. Confirm whether products/store content belongs in this project.
- Final approval of the Step 2 CTA hierarchy: Instagram/social follow as the lead community action, with persistent Book and service-specific booking actions for transactional visitors
- Acuity account ownership confirmation, plan/tier, payment/deposit behavior, and booking policies
- Square’s purpose and checkout scope: products, service deposits, training payments, or another offer
- Approval of public phone/email/social links as the launch contact implementation; a later form would require a separate provider/privacy decision
- Acceptance of Brevo or identification of an existing email provider; consent wording, client ownership, sender identity, double-opt-in preference, and privacy notice
- Training class schedule, format, location, capacity, price, curriculum, credentials, and booking/payment flow
- Service location or service area, address publication preference, accessibility/location notes, business hours, phone, email, and social links
- Cancellation, late-arrival, rescheduling, deposit, refund, privacy, and other customer policies
- Confirmation of who appears in the nine supplied portraits, photographer/model releases, publication/cropping permission, approved uses, and separate approved treatment-result photography
- Domain ownership and availability for `Mariesminksnbeautybar.com`, hosting provider, remote Git provider, ownership/management arrangement, launch date, and budget
- Sanity account ownership, administrative access acceptance, editor onboarding, edit frequency, publication approval process, backup cadence, and whether blog/news is required at launch
- Analytics, advertising, cookie-consent, privacy, and jurisdiction-specific compliance needs
- Localization, search, traffic/scale expectations, and any future features not yet discussed

## Working assumptions

- English-only launch
- Small-to-moderate local-business traffic compatible with static hosting
- Client-editable structured content will use Sanity once the client-owned project is provisioned; local fixtures remain development-only
- No custom payment processor or account system; Square and Acuity remain external systems
- Public address is not displayed; booking is appointment-only
- No production analytics or marketing trackers until explicitly approved
- No product catalog/cart at launch unless the client resolves the questionnaire conflict and supplies product, fulfillment, tax, return, and inventory requirements
- Blog/news is deferred from launch navigation until the client confirms a publishing plan and supplies initial content
- Clearly marked Step 3 concept copy is not approved client content
- Generated beauty models and still-life images are campaign concepts, not the technician, staff, customers, or documented treatment results

## Step 3 preservation rules

- Do not fabricate business facts, testimonials, credentials, prices, policies, or contact details.
- Preserve Astro static generation and the provider-neutral content adapter. Do not replatform or add server infrastructure without a material new requirement.
- Implement the minimum Sanity client/Studio dependencies; keep schemas and content models in source control and CMS ownership client-controlled.
- Keep Acuity, Square, Brevo, and social integrations isolated and configurable. Use supported service-specific deep links and direct provider flows.
- Build mobile-first and retain accessible semantics and keyboard behavior.
- Use the black, white, soft-pink, and gold direction while waiting for exact brand tokens.
- Replace all architectural placeholders with approved client copy before launch.
- Do not identify the subject in the supplied portraits or publish those images until identity, releases, and usage approval are confirmed. Request actual treatment-result images for the Gallery.
- Preserve the embedded Acuity scheduler, appointment-type handoff, and direct Acuity fallback unless the provider or client requirements materially change.
- Replace `noindex` metadata and the blocking `robots.txt` only after production-domain and launch approval.
- Do not deploy or connect a production domain without explicit Step 4 authorization.

## Step 3 implementation record

- **Public preview scope:** Home, Services, Training, Gallery, About, Contact, Book, Privacy, and Policies are implemented as static Astro routes. Home keeps Instagram as the lead community CTA while the persistent booking and service actions maintain Acuity’s service-specific handoff.
- **Booking:** Existing Acuity iframe embedding, direct fallback, and appointment-type URL mappings remain intact in `src/data/booking.ts`.
- **Booking language:** Public pages refer only to secure online booking or the booking calendar. The provider name remains an internal implementation detail and is not used for marketing or branding.
- **Content foundation:** `src/content/site.ts` provides a provider-neutral content boundary over the local intake data. It is the intended replacement point for the client-owned Sanity integration once account ownership, project ID, dataset, and editor access are supplied. No provider account, credentials, SDK dependency, or write token has been created/added.
- **Client imagery:** The local preview uses selected questionnaire portraits as neutral editorial visuals, without naming or identifying the subject. They remain publication-gated pending client confirmation of identity, rights/releases, cropping, and intended use. The Gallery explicitly distinguishes concept/brand images from treatment-result photography.
- **New content areas:** Training, Gallery, Contact, Privacy, and Policies are complete as content structures. Training pricing/schedule/payment, real portfolio items, newsletter signup, client biography/credentials, official policies, testimonials, and website price cards await client-supplied/approved information.
- **Privacy:** No custom contact form, card entry, account system, analytics, advertising pixels, map, or custom database was added. Acuity and any later Square/Brevo flows remain provider-controlled.
- **Build:** Passed after the Step 3 route and content-boundary work; all nine current static routes generated successfully.
- **Local review:** The local Astro development preview is available at `http://localhost:4322/`. This is not a production deployment.

## Step 2 completion record

- **Completed:** August 28, 2026
- **Architecture:** Portable static Astro site with a build-time, client-owned Sanity content layer and project-owned content adapter/models
- **Specialized services:** Existing Acuity for booking, existing Square Payment Links for approved payments, recommended Brevo for newsletter subscriptions, and direct Instagram/Facebook/TikTok links
- **Direct data collection by website:** None selected
- **Version control:** Local Git repository exists; no remote is connected and all current project files are untracked, so no commit was created without explicit instruction
- **Project preparation:** Existing pnpm/Astro structure is retained. CMS packages are intentionally deferred until Step 3 implementation so no unused dependency or provider account is created in Step 2.
- **Build:** Passed on August 28, 2026 with Astro static output; four current routes generated successfully
- **Readiness:** Ready for Step 3 architecture implementation and visual/content refinement when explicitly authorized. Final copy, prices, policies, image permissions/result photography, training details, Square scope, and provider ownership remain content/sign-off dependencies, not reasons to re-architect.
