import { defineMiddleware } from 'astro:middleware';

const contentSecurityPolicy = [
	"default-src 'self'",
	"base-uri 'self'",
	"connect-src 'self'",
	"font-src 'self' https://fonts.gstatic.com",
	"form-action 'self'",
	"frame-ancestors 'self'",
	"frame-src https://*.as.me https://*.acuityscheduling.com",
	"img-src 'self' data:",
	"object-src 'none'",
	"script-src 'self' 'unsafe-inline' https://embed.acuityscheduling.com",
	"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
	'upgrade-insecure-requests',
].join('; ');

const securityHeaders = {
	'Content-Security-Policy': contentSecurityPolicy,
	'Permissions-Policy': 'camera=(), geolocation=(), microphone=()',
	'Referrer-Policy': 'strict-origin-when-cross-origin',
	'Strict-Transport-Security': 'max-age=31536000',
	'X-Content-Type-Options': 'nosniff',
	'X-Frame-Options': 'SAMEORIGIN',
} as const;

const isSensitivePath = (pathname: string) =>
	pathname === '/education/digital-manual/success'
	|| pathname === '/education/digital-manual/success/'
	|| pathname.startsWith('/api/digital-manual/')
	|| pathname === '/api/square/webhook';

export const onRequest = defineMiddleware(async ({ url }, next) => {
	const response = await next();
	const headers = new Headers(response.headers);

	Object.entries(securityHeaders).forEach(([name, value]) => headers.set(name, value));

	if (isSensitivePath(url.pathname)) {
		headers.set('Cache-Control', 'private, no-store, max-age=0');
		headers.set('Expires', '0');
		headers.set('Pragma', 'no-cache');
		headers.set('Referrer-Policy', 'no-referrer');
		headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
	}

	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers,
	});
});
