import { site as localSite, socialByLabel as localSocialByLabel } from '../data/site';

/**
 * Content boundary for the public site.
 *
 * Local intake data is intentionally used until the client-owned Sanity project
 * is provisioned. Step 3 keeps page components dependent on this module rather
 * than a provider SDK, so the future Sanity implementation only replaces this
 * adapter and not the rendered site.
 */
export const getSiteSettings = () => localSite;

export const getSocialLink = (label: (typeof localSite.socials)[number]['label']) =>
	localSocialByLabel(label);
