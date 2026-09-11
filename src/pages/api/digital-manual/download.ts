import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getDownloadFilename, getManualPdf, type DigitalManualRuntimeEnv, verifyManualPurchase } from '../../../lib/digital-manual';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
	const runtimeEnv = env as unknown as DigitalManualRuntimeEnv;
	const verified = await verifyManualPurchase(runtimeEnv, url.searchParams.get('token'), url.searchParams.get('orderId'));
	if (!verified) return new Response('A completed purchase is required to download this file.', { status: 403 });

	const file = await getManualPdf(runtimeEnv);
	if (!file) return new Response('The download is not available yet.', { status: 503 });

	return new Response(file.body, {
		headers: {
			'Content-Type': file.httpMetadata?.contentType || 'application/pdf',
			'Content-Disposition': `attachment; filename="${getDownloadFilename(runtimeEnv)}"`,
			'Cache-Control': 'private, no-store',
		},
	});
};
