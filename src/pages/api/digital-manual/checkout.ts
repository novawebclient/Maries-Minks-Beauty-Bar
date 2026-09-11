import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { createManualCheckout, type DigitalManualRuntimeEnv } from '../../../lib/digital-manual';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	const runtimeEnv = env as unknown as DigitalManualRuntimeEnv;
	const siteUrl = runtimeEnv.SITE_URL?.replace(/\/$/u, '');
	const origin = request.headers.get('origin')?.replace(/\/$/u, '');
	if (!siteUrl || origin !== siteUrl) return new Response('Invalid request origin.', { status: 403 });

	try {
		const { checkoutUrl } = await createManualCheckout(runtimeEnv);
		return Response.json({ checkoutUrl });
	} catch {
		return Response.json({ message: 'Digital checkout is not available yet.' }, { status: 503 });
	}
};
