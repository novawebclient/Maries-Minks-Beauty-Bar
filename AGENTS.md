# NOVA Universal Website Development Workflow

When the user says "Use the NOVA Universal Website Development Workflow," "NOVA Workflow," "UWDW," or otherwise references that workflow for a website project, read `NOVA_UNIVERSAL_WEBSITE_DEVELOPMENT_WORKFLOW.md` completely before taking project actions and follow it as the controlling development process. When the user asks to see, bring up, or reference the workflow, present the contents or a relevant section from that file.

Treat the completed client questionnaire/project brief and all client-supplied materials as the project's source of truth. Do not ask the client to repeat information already supplied.

The NOVA workflow is framework-neutral. Do not default to Astro or another predetermined stack, architecture, or site scope. Select technology only after intake and architecture analysis. The Astro-specific instructions below apply only when the current project actually uses Astro.

Create and maintain a project-level `PROJECT_SPEC.md` for each NOVA website project, and complete the workflow's requirement audit and QA before declaring the project finished.

The workflow's designated model routing is: Step 1 — Luna Light; Step 2 — Sol Extra High; Step 3 — Terra High; Step 4 — Sol Ultra. Use the designated level unless there is a specific reason to temporarily escalate or change models for a subtask.

Before starting the workflow, require the completed NOVA client questionnaire/project brief and available client-supplied materials. These are the source of truth for Steps 1–4.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
