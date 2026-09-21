# Operations and Handoff Guide

## Purpose

This guide is the owner/operator reference for the production website at https://mariesminksnbeautybar.com. It separates routine content work from changes that require NOVA or another developer, documents every production dependency, and provides deploy, rollback, backup, recovery, and migration steps without exposing credentials.

## Production inventory

| Item | Production value |
| --- | --- |
| Canonical domain | `mariesminksnbeautybar.com` |
| `www` behavior | Permanent redirect to the apex domain, preserving path and query |
| Cloudflare Worker | `maries-minks-beauty-bar` |
| Source branch | GitHub `main` |
| R2 bucket | `maries-minks-digital-products` |
| R2 binding | `PDF_BUCKET` |
| Manual object key | `Ebook lash training manual .pdf` |
| Square environment | Production |
| Square location ID | `LF4WPYTAV6TXH` |
| Acuity scheduler | `https://mariesminksnbeautybar.as.me/` |
| Lash request form | `https://form.jotform.com/262538566461061` |
| Waxing request form | `https://form.jotform.com/262606037948060` |

## Account ownership and access checklist

| System | Current/expected owner | Handoff action |
| --- | --- | --- |
| Cloudflare account, domain, DNS, Worker, R2, Secrets Store | Client account | Keep two-factor authentication and at least two recovery methods; client retains billing |
| Square seller and developer application | Client | Keep production access limited to trusted administrators; retain seller support/recovery information |
| Acuity | Client | Confirm at least one client administrator and current billing/recovery email |
| Jotform | Client or designated form administrator | Confirm who owns both forms, notification recipients, and account recovery |
| GitHub repository | NOVA organization `novawebclient` | Decide whether the client receives admin/read access or the repository is transferred; document the chosen arrangement |
| Google Search Console | Client-owned Google account | Verify the domain property and invite NOVA only if ongoing SEO support is contracted |

Never paste access tokens, signing keys, passwords, recovery codes, customer submissions, or card/payment details into Git, this guide, email threads, or screenshots.

## What the client can change without code

The client can manage:

- Bookable services, availability, durations, and live pricing in Acuity.
- Form questions, notifications, and submissions in Jotform.
- Payment/refund operations and transaction records in Square.
- The private manual object in R2, if the exact object key is preserved.
- Domain billing and account security in Cloudflare.

The client should ask NOVA/developer support for:

- Website text, photos, gallery order, navigation, policies, or page layout.
- Acuity appointment IDs added to the website after scheduler changes.
- New products, price changes to the digital manual, or checkout-flow changes.
- Domain, DNS, Worker, R2 binding, webhook, or secret rotation changes.
- CMS/Sanity implementation.
- Analytics, Meta Pixel, newsletter, cookie consent, or new data collection.
- Framework/dependency upgrades and accessibility/SEO releases.

## Build variables versus Runtime variables

Cloudflare exposes two different areas; use the correct one.

### Build variables

Build variables are available while Astro compiles the site. They are appropriate only for public `PUBLIC_*` settings:

| Name | Secret? | Purpose |
| --- | --- | --- |
| `PUBLIC_DIGITAL_CHECKOUT_READY` | No | Set to `false` for an emergency checkout-button pause; otherwise checkout is enabled |
| `PUBLIC_JOTFORM_TRAINING_URL` | No | Optional override for the approved lash request URL |
| `PUBLIC_JOTFORM_WAXING_TRAINING_URL` | No | Optional override for the approved waxing request URL |

The two Jotform URLs also have approved source fallbacks, so their build variables are optional. Never store Square tokens, webhook keys, or signing secrets as Build variables.

### Runtime values and bindings

These values exist when the Worker handles a request. Non-secret values are committed in `wrangler.jsonc`; secret values are Cloudflare Secrets Store bindings.

Non-secret Worker values:

| Name | Production value/source |
| --- | --- |
| `SITE_URL` | `https://mariesminksnbeautybar.com` |
| `SQUARE_ENVIRONMENT` | `production` |
| `SQUARE_LOCATION_ID` | `LF4WPYTAV6TXH` |
| `R2_OBJECT_KEY` | `Ebook lash training manual .pdf` |
| `DOWNLOAD_FILENAME` | `Ebook lash training manual .pdf` |
| `PDF_BUCKET` | R2 binding to `maries-minks-digital-products` |

Secret Runtime bindings:

| Name | Source |
| --- | --- |
| `SQUARE_ACCESS_TOKEN` | Square production access token in Cloudflare Secrets Store |
| `SQUARE_WEBHOOK_SIGNATURE_KEY` | Signature key for the production Square webhook subscription |
| `DOWNLOAD_SIGNING_SECRET` | Long random server-only value generated specifically for download tokens |

After editing any Runtime value or binding, deploy a new Worker version and test checkout initiation. Changing a Build variable requires a rebuild/deployment.

## Standard deployment

Cloudflare Workers Builds is connected to GitHub and should deploy a push to `main`.

Expected settings:

- Repository: `novawebclient/Maries-Minks-Beauty-Bar`
- Production branch: `main`
- Root directory: `/`
- Build command: `pnpm build`
- Deploy command: `npx wrangler deploy`
- Node.js: 22 or newer
- Package manager: pnpm 11.19.0

Pre-deploy locally:

```text
pnpm install --frozen-lockfile
pnpm build
git diff --check
```

Then review staged files and ensure there is no `.dev.vars`, PDF/manual, secret, customer export, or local log. Push the approved commit. In Cloudflare, confirm the newest deployment is successful, then smoke-test the production domain.

## Production smoke test

Perform these checks after a deployment:

1. Open the apex domain in a private browser window.
2. Open the `www` version with a path and confirm it redirects to the same path on the apex domain.
3. Visit Home, Services, About, Gallery, Education, all three education detail pages, Book, FAQ, Contact, Privacy, and Policies.
4. Use the header/menu and footer on mobile and desktop.
5. Open one service scheduler and verify the embedded calendar or direct fallback reaches Acuity.
6. Open both training-request buttons and verify the correct Jotform titles. Do not submit junk entries.
7. Click **Purchase Digital Manual — $147** and verify the public Square production checkout opens with the correct item and price. Stop before payment unless a real controlled transaction is expressly approved.
8. Visit the success page without a valid token and confirm no file is exposed.
9. Check `/robots.txt`, `/sitemap.xml`, a nonexistent URL/404, and the page-source canonical URL.
10. Confirm phone, general email, privacy email, and social links.

A full paid test is required only when the payment/verification/storage integration changes. Use an approved transaction and refund procedure; never enter card details into the website itself because checkout is Square-hosted.

## Square and webhook maintenance

The production webhook destination is:

```text
https://mariesminksnbeautybar.com/api/square/webhook
```

The subscription uses `payment.updated`. The corresponding production signature key must be bound as `SQUARE_WEBHOOK_SIGNATURE_KEY`. If the endpoint URL, webhook subscription, or Square application changes, update the Cloudflare secret binding and redeploy.

The purchase flow also verifies Square directly on download, so the webhook is not the only authorization control. Do not weaken the order checks in `src/lib/digital-manual.ts`: item name, quantity, price, currency, location, order reference, payment order/location/amount, and `COMPLETED` status all matter.

## R2 manual replacement and recovery

R2 must remain private.

To replace the manual:

1. Export/download a backup of the current object to client-controlled encrypted storage.
2. Confirm the replacement is the final customer PDF and does not expose private draft notes.
3. Upload it to `maries-minks-digital-products` using the exact key `Ebook lash training manual .pdf`, replacing the old object only after the backup exists.
4. Confirm the R2 binding remains named `PDF_BUCKET`.
5. Run one approved end-to-end paid fulfillment test if the object/key or checkout code changed.
6. Record the date, file checksum, and responsible operator in the private business operations record—not in the public site.

Recovery: restore the backed-up object to the same key. If checkout must pause while the file is unavailable, set the Build variable `PUBLIC_DIGITAL_CHECKOUT_READY=false`, rebuild/deploy, and confirm the disabled state.

## Rollback

Cloudflare keeps deployment history.

1. Open the Worker in Cloudflare.
2. Open **Deployments**.
3. Identify the last known-good version by time and source commit.
4. Roll back/promote that version.
5. Re-run the production smoke test.

If the failure came from a Git commit, create a normal revert commit rather than rewriting shared history. Do not use a destructive reset on the production branch.

A code rollback does not automatically undo changed DNS, Square settings, Jotform edits, Acuity services, R2 objects, or rotated secrets. Restore those systems separately using their own history/backups.

## Backups

- **Source:** GitHub commit history plus a release tag.
- **Client originals:** Keep an encrypted client-owned copy of `assets/originals/` outside GitHub.
- **R2 manual:** Keep a private, encrypted client-owned copy and checksum.
- **Jotform:** Export forms/submissions according to the client’s retention needs; submissions are not source assets.
- **Acuity:** Export appointments/customer records according to the client’s business and privacy procedures.
- **Square:** Use Square’s transaction/report exports; never store card data.
- **DNS/runtime configuration:** Periodically export/document zone records, Worker bindings, and non-secret settings. Store secret recovery information only in an approved password manager.

## Content-update map

| Change | Primary file/system |
| --- | --- |
| Public business facts/socials | `src/data/site.ts` |
| Acuity appointment IDs/categories | `src/data/booking.ts` |
| Page wording and sections | `src/pages/` |
| Navigation/footer/metadata/schema | `src/layouts/BaseLayout.astro` |
| Styling/responsive layout | `src/styles/global.css` |
| Gallery images/order | `src/pages/gallery.astro` and `assets/originals/client-gallery/` |
| Training images | `assets/originals/client-training/` |
| Social card | `assets/brand/social-preview.svg`, then regenerate `public/og.png` |
| Booking availability/live service data | Acuity |
| Training request questions/notifications | Jotform |
| Digital manual PDF | Private R2 bucket |
| Digital manual price/product verification | `src/lib/digital-manual.ts`; requires developer and Square regression test |

## Maintenance cadence

Monthly:

- Check the production homepage, booking, forms, and checkout initiation.
- Review broken-link or provider notices.
- Confirm domain, Cloudflare, Acuity, Jotform, and Square billing/recovery emails remain current.

Quarterly:

- Revalidate Acuity appointment IDs.
- Review public contact, services, policies, privacy statements, and social links.
- Check dependency/security updates, build health, accessibility, performance, sitemap, and Search Console coverage.
- Confirm R2 backup and account recovery access.

After any provider/account change:

- Re-run the smoke test.
- Update `PROJECT_SPEC.md`, this guide, and the relevant ownership record.

## Search Console launch

Use a client-owned Google account:

1. Add a **Domain** property for `mariesminksnbeautybar.com`.
2. Cloudflare DNS can satisfy the TXT verification record.
3. Submit `https://mariesminksnbeautybar.com/sitemap.xml`.
4. Request indexing for the homepage after robots/canonical checks pass.
5. Invite NOVA only if ongoing SEO support is part of the agreement.

Search Console is external account setup. A valid sitemap and crawlable production site can launch before Google finishes indexing.

## Privacy and incident response

At launch there is no analytics, Meta Pixel, newsletter, advertising tracker, custom contact form, or account database. Acuity, Jotform, Square, Cloudflare, and social platforms process data on their own surfaces or infrastructure as described on the Privacy page.

For suspected credential exposure:

1. Disable or rotate the affected credential immediately in the owning provider.
2. Update the corresponding Cloudflare Runtime secret binding.
3. Deploy and smoke-test.
4. Review provider logs/transactions/submissions.
5. Follow the provider’s incident guidance and applicable notice obligations.
6. Never commit the replacement value.

For a mistaken public PDF exposure, remove public access, rotate download-signing material if relevant, inspect access logs, and restore private R2-only delivery.

## Portability and migration

The Git repository contains the marketing UI, data mappings, integration code, and documentation. It does not contain the paid PDF, credentials, or provider-owned customer data.

Migration map:

- **Cloudflare Worker:** replace `@astrojs/cloudflare` and the `cloudflare:workers` environment access with the destination serverless adapter/runtime.
- **R2:** move the private object to a private S3-compatible store and replace `PDF_BUCKET.get()` with the destination SDK.
- **Secrets Store:** recreate encrypted server-only values in the destination secret manager.
- **Domain/DNS:** reproduce the apex/`www` TLS and redirect behavior before changing nameservers.
- **Square:** retain Square and update webhook/callback origins, or rebuild checkout and verification against a different processor.
- **Acuity/Jotform:** update centralized mappings/URLs and the Privacy page if the provider changes.
- **CMS:** a future Sanity project should be client-owned, use least-privilege roles, keep write tokens out of the browser, define preview/publish/backup workflows, and preserve source-controlled schema and fallback/export data.

Do not move this site to static-only hosting without replacing the server-side checkout, payment verification, webhook, signed download, and private-object delivery functions.
