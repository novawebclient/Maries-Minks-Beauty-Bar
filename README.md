# Marie’s Minks n Beauty Bar

Production website for Marie’s Minks n Beauty Bar, an appointment-only beauty business serving Ocala and surrounding areas. The public site covers services, booking, a client gallery, lash and waxing education, training-request handoffs, policies, and secure purchase/delivery of the Lash Artist Digital Training Manual.

- **Production:** https://mariesminksnbeautybar.com
- **Source:** https://github.com/novawebclient/Maries-Minks-Beauty-Bar
- **Runtime:** Astro on Cloudflare Workers
- **Project source of truth:** [`PROJECT_SPEC.md`](PROJECT_SPEC.md)
- **Operations and ownership:** [`OPERATIONS_HANDOFF.md`](OPERATIONS_HANDOFF.md)
- **Controlling workflow:** [`NOVA_UNIVERSAL_WEBSITE_DEVELOPMENT_WORKFLOW.md`](NOVA_UNIVERSAL_WEBSITE_DEVELOPMENT_WORKFLOW.md)

## Requirements

- Node.js 22.12 or newer
- pnpm 11.19.0
- A Cloudflare account with access to the Worker, R2 bucket, Secrets Store, DNS zone, and custom domain
- A Square developer application and seller location for production checkout

## Local development

```text
pnpm install --frozen-lockfile
pnpm dev
```

Copy `.dev.vars.example` to `.dev.vars` and enter local-only values when exercising the server-side checkout flow. Never commit `.dev.vars`, access tokens, webhook keys, signing secrets, customer records, or the paid PDF.

| Command | Purpose |
| --- | --- |
| `pnpm install --frozen-lockfile` | Install the locked dependency set |
| `pnpm dev` | Start Astro locally |
| `pnpm build` | Build the Cloudflare Worker and static assets into `dist/` |
| `pnpm preview` | Preview the built Worker locally |

## Public routes

| Route | Purpose |
| --- | --- |
| `/` | Home and primary social/booking calls to action |
| `/services/` | Service categories and service-specific booking handoffs |
| `/about/` | Business and educator story |
| `/book/` | Embedded Acuity scheduler with direct-provider fallback |
| `/education/` | Education landing page with three offers |
| `/education/private-1-1/` | Private 1:1 lash training and Jotform request handoff |
| `/education/waxing-training/` | 1:1 Brazilian and body waxing training and Jotform handoff |
| `/education/digital-manual/` | $147 digital manual offer and Square checkout handoff |
| `/education/digital-manual/success/` | Private purchase verification/download result; excluded from indexing |
| `/training/` | Legacy redirect to private lash training |
| `/gallery/` | Approved client work gallery |
| `/faq/` | Booking and training FAQs |
| `/contact/` | Public contact details and social links |
| `/privacy/` | Launch privacy notice |
| `/policies/` | Booking, service, and training policies |
| `/404` | Branded not-found response |
| `/sitemap.xml` | Public search-engine route list |

The `/api/` routes create Square checkout links, validate completed payments, stream the paid PDF from private R2 storage, and validate Square webhooks. They are not public content pages.

## Integrations

- **Acuity:** Booking is embedded on `/book/`; service buttons carry mapped appointment-type IDs from `src/data/booking.ts`.
- **Jotform:** Lash and waxing training requests open their dedicated external forms. Public override variables are supported, while approved production URLs remain safe source fallbacks.
- **Square:** The Worker creates a unique hosted checkout for the digital manual, then verifies the order, item, amount, location, and completed payment server-side.
- **Cloudflare R2:** The paid PDF stays in a private bucket and is streamed only after verification. It is never committed to Git or exposed as a public bucket object.
- **Cloudflare Secrets Store:** Square and signing credentials are runtime bindings, not source code or build variables.

No analytics, Meta Pixel, newsletter, advertising tracker, custom contact form, account system, or public database is enabled at launch.

## Deployment

Cloudflare Workers Builds deploys the `main` branch. The expected commands are:

```text
pnpm build
npx wrangler deploy
```

The root directory is `/`. `wrangler.jsonc` owns non-secret production bindings and values; Cloudflare runtime bindings own secrets and R2 access. The canonical production origin is `https://mariesminksnbeautybar.com`, and `www.mariesminksnbeautybar.com` redirects permanently to the apex domain.

See `OPERATIONS_HANDOFF.md` before changing the domain, Worker, R2 object, Square application, booking mappings, or training-form URLs.

## Content maintenance

- Public business facts and social links: `src/data/site.ts`
- Booking categories and Acuity IDs: `src/data/booking.ts`
- Shared content boundary: `src/content/site.ts`
- Page copy: `src/pages/`
- Global visual system: `src/styles/global.css`
- Client originals and rights/provenance notes: `assets/`

A CMS is intentionally not part of the launch build. Sanity remains an optional future enhancement if the client needs direct editing; adding it requires a scoped migration, client-owned project, roles, preview/publishing workflow, and backup plan.

## Release standard

Before a production release:

1. Run `pnpm build` and resolve every error.
2. Check `git diff --check` and ensure no secrets or paid files are staged.
3. Test navigation, booking, both Jotforms, checkout initiation, the negative purchase-verification state, and responsive layouts.
4. Revalidate Acuity appointment IDs after any scheduler change.
5. Use a controlled low-value/approved production purchase only when the payment flow itself changed; do not create unnecessary customer charges during ordinary content releases.
6. Confirm the sitemap, robots directives, canonical URLs, and custom-domain redirect.
