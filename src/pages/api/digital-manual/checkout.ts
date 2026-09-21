import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { createManualCheckout, resolveDigitalManualRuntimeEnv, type DigitalManualRuntimeEnv } from '../../../lib/digital-manual';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	const runtimeEnv = await resolveDigitalManualRuntimeEnv(env as unknown as DigitalManualRuntimeEnv);
	const unavailable = (status: number) => Response.json(
		{ message: 'We couldn’t start secure checkout. Please try again or contact us for help.' },
		{ status },
	);
	const requestOrigin = new URL(request.url).origin;
	const origin = request.headers.get('origin');
	let siteOrigin: string;

	try {
		siteOrigin = new URL(runtimeEnv.SITE_URL || '').origin;
	} catch {
		return unavailable(503);
	}

	if (origin !== siteOrigin || requestOrigin !== siteOrigin) return unavailable(403);

	try {
		const { checkoutUrl } = await createManualCheckout(runtimeEnv);
		return Response.json({ checkoutUrl });
	} catch {
		return unavailable(503);
	}
};
