# NOVA Universal Website Development Workflow

This document is the master, portable reference for NOVA Web Services' standardized website-development process.

## ChatGPT Model Routing

- **Step 1 — 🌙 Luna Light**
- **Step 2 — ☀️ Sol Extra High**
- **Step 3 — 🌎 Terra High**
- **Step 4 — 🔥 Sol Ultra**

The model assignment is part of the workflow. Use the designated level unless there is a specific reason to temporarily escalate or change models for a subtask.

## Before Step 1 — Client Intake Prerequisite

Provide the completed **NOVA client questionnaire/project brief** and available client-supplied materials, including logos, photos, videos, service lists, pricing, business information, brand guidelines, documents, booking links, social links, and other assets. These materials are the source of truth for Steps 1–4. Do not make the client repeat information already provided.

Organize client assets when the environment allows. Preserve originals and create optimized derivatives as needed. Never guess the identity or purpose of an ambiguous asset.

## STEP 1 — Intake, Discovery & Asset Organization

**Model: 🌙 Luna Light**

Review the questionnaire/project brief and every uploaded asset. Extract business and contact information, products/services, audience, goals, desired actions, brand direction, preferences, existing website information, pages, hours/location, social media, testimonials, FAQs, pricing, booking, forms, payments/e-commerce, accounts, third-party services, domains, hosting, SEO, legal requirements, and special functionality.

Separate missing information into: (A) required before development can continue, (B) safe as a temporary placeholder, and (C) safe to add later. Do not ask for information already supplied.

Organize files logically, adapting a structure such as:

```text
client-project/
├── intake/
├── assets/
│   ├── originals/
│   ├── branding/
│   ├── images/
│   ├── video/
│   └── documents/
├── website-project/
└── PROJECT_SPEC.md
```

Summarize the business, audience, objectives, user actions, brand direction, functionality, assets, integrations, and constraints. Do not select a stack or assume a single-page, multi-page, static, dynamic, or application architecture yet. Preserve portability. End with anything material to Step 2.

## STEP 2 — Website Strategy, Architecture & Technology Selection

**Model: ☀️ Sol Extra High**

Using Step 1 and all project information, determine the information architecture, pages, routes, navigation, hierarchy, calls to action, reusable components, forms, booking flows, conversion paths, mobile navigation, footer, legal pages, search, SEO, growth, maintenance, and customer journey.

Choose technology based on the actual project. The workflow is framework-neutral: do not automatically choose Astro, React, Next.js, Vue, Svelte, WordPress, static HTML, a CMS, a database, or Cloudflare-specific technology. Prefer the simplest architecture that fully satisfies current needs while allowing reasonable future expansion. Do not add unnecessary frameworks, databases, authentication, infrastructure, JavaScript, or dependencies, and do not artificially restrict justified sophistication.

Plan booking/scheduling, payments, e-commerce, email, forms, CRM, analytics, maps, social platforms, accounts, APIs, databases, and other services. Prefer direct booking, service-specific, or deep links over embedding an entire external booking site when cleaner.

Keep the core portable. If Cloudflare Workers, D1, R2, KV, or another provider-specific service is used, isolate it behind service interfaces/adapters and document alternatives or migration paths.

Create or update `PROJECT_SPEC.md` with the overview, goals, audience, scope, pages/routes, navigation, content architecture, CTAs, design, assets and usage, technology and rationale, components, forms, bookings, integrations, APIs, data/storage, authentication, payments, SEO, accessibility, responsive behavior, hosting, environment variables, provider dependencies, portability, migration paths, client-editable content, placeholders, and launch requirements. Present architecture and technology decisions before implementation.

## STEP 3 — Determine Scope, Design & Build the Website

**Model: 🌎 Terra High**

Using intake, organized assets, and `PROJECT_SPEC.md`, determine and implement the appropriate final scope: landing page, small or large multi-page site, content-driven or dynamic site, e-commerce site, portal, dashboard, full web application, or another suitable architecture. A homepage-first prototype is optional and does not determine final architecture.

Design from the client's brand, questionnaire, assets, audience, page purpose, industry, and preferences. Maintain hierarchy, typography, spacing, contrast, consistency, mobile/desktop usability, CTAs, navigation clarity, readability, and accessibility. Use real content/assets whenever available; identify placeholders; optimize website copies while preserving originals.

Implement everything required by `PROJECT_SPEC.md`, including navigation, forms, booking, scheduling, payments, e-commerce, dynamic content, search/filtering, authentication, accounts, dashboards, APIs, databases, storage, email, analytics, and integrations when justified. Keep provider-specific functionality isolated, use logical maintainable directories and minimal dependencies, document non-obvious decisions, and update `PROJECT_SPEC.md` whenever important decisions change.

## STEP 4 — QA, Client Requirement Audit, Launch & Handoff

**Model: 🔥 Sol Ultra**

Before completion or deployment, audit the finished website against the original questionnaire/brief, uploaded materials, `PROJECT_SPEC.md`, and the running site. Verify business/contact information, services, products, pricing, branding, content, pages, navigation, CTAs, forms, booking, scheduling, payments, e-commerce, accounts, integrations, social links, hours, location, testimonials, FAQs, legal requirements, and every client request. Identify anything missing, incomplete, incorrect, or still a placeholder.

Review project structure, configuration, routes, links, components, responsive behavior, state/data handling, databases/storage, services, authentication/authorization, forms, bookings, payments, APIs, environment variables, security-sensitive areas, loading states, and errors. Remove obsolete code, unused assets, abandoned experiments, unnecessary dependencies, and development-only configuration when appropriate.

Test relevant mobile, tablet, and desktop layouts as real users: navigation, buttons, forms, booking/deep links, payments, authentication, dynamic behavior, media, downloads, reloads, direct routes, integrations, errors, performance, image optimization, keyboard navigation, labels, alt text, heading hierarchy, metadata, titles, descriptions, indexing, sitemap/robots requirements, structured data, privacy, cookies, and analytics where applicable.

Audit portability across hosting, functions, databases, storage, authentication, email, forms, analytics, CDN, DNS, and APIs. Document provider-specific dependencies, implementation locations, interfaces/adapters, environment variables, deployment/data-export requirements, and alternatives.

Prepare handoff materials: complete source code, original and optimized assets, `PROJECT_SPEC.md`, README/setup, build/deployment instructions, environment-variable and third-party-service documentation, domain/DNS, database/storage information, migration notes, and account ownership/access information. Never intentionally make the site stop functioning because the client stops working with NOVA Web Services.

Only consider launch-ready when it builds successfully, routes and integrations work, requirements are satisfied, placeholders are resolved or documented, ownership is appropriate, deployment is reproducible, `PROJECT_SPEC.md` reflects the finished project, and portability documentation is complete.

## Workflow Summary

**Client Intake → Step 1: Understand & Organize → Step 2: Architect & Choose Technology → Step 3: Scope, Design & Build → Step 4: Audit, Launch & Handoff**

The workflow standardizes **how NOVA develops websites**, not what every website must look like or what technology it must use.
