# Marie’s minks n beauty bar Website

Current Astro-based project for Marie’s minks n beauty bar, covering individual lashes, waxing, Brazilian waxing, brows, lash lifts/tints, facials, and Lash Education.

The completed client questionnaire has been reassessed through NOVA Steps 1 and 2, and Step 3 implementation is now in progress. The site retains static Astro, existing Acuity booking, direct social links, and a provider-neutral local content boundary that will connect to client-owned Sanity after account setup. Square and newsletter connections remain deliberately inactive until their client-owned configurations and terms are supplied. See `PROJECT_SPEC.md` for the source of truth.

## Requirements

- Node.js 22.12 or newer (supported even-numbered release)
- pnpm 11.19.0

## Commands

| Command | Purpose |
| --- | --- |
| `pnpm install` | Install locked project dependencies |
| `pnpm dev` | Start the local development server |
| `pnpm build` | Build the Cloudflare Worker application and its assets in `dist/` |
| `pnpm preview` | Preview the built Worker application locally |

## Current routes

- `/` — Home
- `/services/` — Lash, brow/waxing, and skin/beauty categories
- `/about/` — Beauty-bar story and pending technician-information requirements
- `/book/` — Embedded Acuity scheduler, service-specific deep-link handling, external fallback, and booking guidance
- `/education/` — Lash Education landing page with separate Private 1:1 Lash Training and Digital Lash Training Manual paths
- `/education/private-1-1/` — Private training details, terms, and future Jotform handoff
- `/education/digital-manual/` — Digital manual details and the secure Square checkout handoff
- `/training/` — Legacy redirect to Private 1:1 Lash Training
- `/gallery/` — Portfolio framework; approved treatment-result photography is still required
- `/contact/` — Public phone, email, social profiles, and appointment-only location guidance
- `/privacy/` and `/policies/` — Review-ready structures that require client-approved final copy before launch

## Deployment

The production target is Cloudflare Workers, with GitHub retained as the source repository. The Worker configuration includes a private R2 binding for paid digital products. Square secrets, the R2 PDF, and the live Jotform URL must be configured before those live flows are enabled. Public indexing is intentionally disabled in `public/robots.txt` until launch approval in Step 4.

## Content status

- Generic booking calls to action open the website’s embedded Acuity scheduler.
- Service calls to action pass the matching public Acuity appointment-type ID or a filtered set of IDs. Reverify the mapping before launch if the client changes the Acuity service menu.
- The client supplied Facebook, Instagram, TikTok, Square, public contact details, professional portrait originals, and two approved Lash Education images. Signed asset URLs are intentionally not copied into the repository; the local files and publication gate are documented in `assets/ASSET_INVENTORY.md`. Portraits are used only in the non-production local preview until their publication permission is confirmed.
- Images in `src/assets/` and `public/og.png` are original generated campaign concepts, not depictions of the technician or documented client results.
- Prices are requested on the website, but no price sheet was included in the questionnaire. Website service labels, biography, credentials, business policies, provider ownership, treatment-result photography, and training-class details still require client confirmation before final content can be published. Private training and digital-manual copy are in place, but the live Jotform, Square, R2 PDF, and Cloudflare secrets still need client configuration. Current client facts flow through `src/content/site.ts` so a future Sanity integration can replace the local source without rewriting pages.
