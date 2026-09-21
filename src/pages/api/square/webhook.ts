import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { resolveDigitalManualRuntimeEnv, type DigitalManualRuntimeEnv, validateWebhookSignature } from '../../../lib/digital-manual';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	const body = await request.text();
	const verified = await validateWebhookSignature(
		await resolveDigitalManualRuntimeEnv(env as unknown as DigitalManualRuntimeEnv),
		request.url,
		body,
		request.headers.get('x-square-hmacsha256-signature'),
	);
	if (!verified) return new Response('Request rejected.', { status: 403 });

	// Download authorization is intentionally re-verified against Square on every request.
	// This endpoint remains ready for payment auditing or future fulfillment features without D1.
	return new Response(null, { status: 204 });
};
