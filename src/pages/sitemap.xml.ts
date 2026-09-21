import type { APIRoute } from 'astro';
import { site } from '../data/site';

export const prerender = true;

const publicRoutes = [
	'/',
	'/about/',
	'/services/',
	'/gallery/',
	'/education/',
	'/education/private-1-1/',
	'/education/waxing-training/',
	'/education/digital-manual/',
	'/book/',
	'/faq/',
	'/contact/',
	'/privacy/',
	'/policies/',
] as const;

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${publicRoutes.map((route) => `\t<url><loc>${new URL(route, site.url).toString()}</loc></url>`).join('\n')}
</urlset>\n`;

export const GET: APIRoute = () => new Response(sitemap, {
	headers: {
		'Content-Type': 'application/xml; charset=utf-8',
	},
});
