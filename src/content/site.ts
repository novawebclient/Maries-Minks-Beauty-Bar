import { site as localSite, socialByLabel as localSocialByLabel } from '../data/site';

/**
 * Content boundary for the public site.
 *
 * Launch content is intentionally source-controlled. Page components depend on
 * this module rather than a provider SDK, so an approved future CMS migration
 * can replace the adapter without rewriting the rendered site.
 */
export const getSiteSettings = () => localSite;

export const getSocialLink = (label: (typeof localSite.socials)[number]['label']) =>
	localSocialByLabel(label);
