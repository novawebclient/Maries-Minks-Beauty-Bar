# Content Boundary

The public site currently reads approved intake facts from `src/data/site.ts` through `site.ts` in this directory. This is deliberate: no client-owned Sanity project, project ID, dataset, or editor access has been supplied yet.

When Sanity is provisioned, retain the `getSiteSettings` and `getSocialLink` contract and replace the local lookup behind it. Keep booking URL construction in `src/data/booking.ts`; it is an Acuity integration concern, not presentational CMS data.

Do not put write tokens, private customer data, the home-studio address, or signed asset URLs in CMS records, source control, or public browser code.
