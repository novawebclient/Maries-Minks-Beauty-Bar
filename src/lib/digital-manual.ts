const textEncoder = new TextEncoder();
const checkoutItemName = 'The Lash Artist Digital Training Manual';
const checkoutAmount = 14700;
const checkoutCurrency = 'USD';

type PdfObject = {
	body: ReadableStream;
	httpMetadata?: { contentType?: string };
};

export interface DigitalManualRuntimeEnv {
	SQUARE_ACCESS_TOKEN?: string;
	SQUARE_LOCATION_ID?: string;
	SQUARE_ENVIRONMENT?: string;
	SQUARE_WEBHOOK_SIGNATURE_KEY?: string;
	DOWNLOAD_SIGNING_SECRET?: string;
	R2_OBJECT_KEY?: string;
	DOWNLOAD_FILENAME?: string;
	SITE_URL?: string;
	JOTFORM_TRAINING_URL?: string;
	PDF_BUCKET?: { get: (key: string) => Promise<PdfObject | null> };
}

type CheckoutToken = {
	nonce: string;
	expiresAt: number;
};

type SquareMoney = { amount?: number; currency?: string };
type SquareOrder = {
	id?: string;
	location_id?: string;
	reference_id?: string;
	total_money?: SquareMoney;
	line_items?: Array<{ name?: string; quantity?: string; base_price_money?: SquareMoney }>;
	tenders?: Array<{ payment_id?: string }>;
};
type SquarePayment = {
	payment?: { status?: string; order_id?: string; location_id?: string; amount_money?: SquareMoney };
};

const isConfigured = (value?: string) => Boolean(value?.trim());

export const isCheckoutConfigured = (env: DigitalManualRuntimeEnv) =>
	isConfigured(env.SQUARE_ACCESS_TOKEN) &&
	isConfigured(env.SQUARE_LOCATION_ID) &&
	isConfigured(env.DOWNLOAD_SIGNING_SECRET) &&
	isConfigured(env.SITE_URL) &&
	isConfigured(env.R2_OBJECT_KEY) &&
	Boolean(env.PDF_BUCKET);

const base64UrlEncode = (value: Uint8Array | string) => {
	const bytes = typeof value === 'string' ? textEncoder.encode(value) : value;
	let binary = '';
	bytes.forEach((byte) => {
		binary += String.fromCharCode(byte);
	});
	return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/u, '');
};

const base64UrlDecode = (value: string) => {
	const padded = value.replaceAll('-', '+').replaceAll('_', '/') + '='.repeat((4 - (value.length % 4)) % 4);
	const binary = atob(padded);
	return Uint8Array.from(binary, (character) => character.charCodeAt(0));
};

const hmacKey = (secret: string, usage: KeyUsage[]) =>
	crypto.subtle.importKey('raw', textEncoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, usage);

const createSignature = async (secret: string, value: string) => {
	const signature = await crypto.subtle.sign('HMAC', await hmacKey(secret, ['sign']), textEncoder.encode(value));
	return base64UrlEncode(new Uint8Array(signature));
};

const verifySignature = async (secret: string, value: string, signature: string) => {
	try {
		return crypto.subtle.verify('HMAC', await hmacKey(secret, ['verify']), base64UrlDecode(signature), textEncoder.encode(value));
	} catch {
		return false;
	}
};

export const createCheckoutToken = async (secret: string): Promise<{ token: string; nonce: string }> => {
	const payload: CheckoutToken = {
		nonce: crypto.randomUUID(),
		expiresAt: Date.now() + 30 * 60 * 1000,
	};
	const encodedPayload = base64UrlEncode(JSON.stringify(payload));
	return {
		nonce: payload.nonce,
		token: `${encodedPayload}.${await createSignature(secret, encodedPayload)}`,
	};
};

export const parseCheckoutToken = async (secret: string, token: string | null): Promise<CheckoutToken | null> => {
	if (!token) return null;
	const [encodedPayload, signature, ...extra] = token.split('.');
	if (!encodedPayload || !signature || extra.length > 0 || !(await verifySignature(secret, encodedPayload, signature))) return null;

	try {
		const payload = JSON.parse(new TextDecoder().decode(base64UrlDecode(encodedPayload))) as CheckoutToken;
		if (!payload.nonce || !Number.isFinite(payload.expiresAt) || payload.expiresAt < Date.now()) return null;
		return payload;
	} catch {
		return null;
	}
};

const squareApiUrl = (env: DigitalManualRuntimeEnv, path: string) => {
	const host = env.SQUARE_ENVIRONMENT === 'production' ? 'https://connect.squareup.com' : 'https://connect.squareupsandbox.com';
	return `${host}${path}`;
};

const squareRequest = async <T>(env: DigitalManualRuntimeEnv, path: string, init: RequestInit = {}): Promise<T> => {
	if (!env.SQUARE_ACCESS_TOKEN) throw new Error('Square is not configured.');
	const response = await fetch(squareApiUrl(env, path), {
		...init,
		headers: {
			Authorization: `Bearer ${env.SQUARE_ACCESS_TOKEN}`,
			'Content-Type': 'application/json',
			'Square-Version': '2026-08-19',
			...init.headers,
		},
	});
	if (!response.ok) throw new Error(`Square request failed with status ${response.status}.`);
	return response.json() as Promise<T>;
};

const cleanSiteUrl = (siteUrl: string) => siteUrl.replace(/\/$/u, '');

export const createManualCheckout = async (env: DigitalManualRuntimeEnv) => {
	if (!isCheckoutConfigured(env) || !env.DOWNLOAD_SIGNING_SECRET || !env.SQUARE_LOCATION_ID || !env.SITE_URL) {
		throw new Error('Digital checkout is not configured.');
	}

	const { token, nonce } = await createCheckoutToken(env.DOWNLOAD_SIGNING_SECRET);
	const redirectUrl = `${cleanSiteUrl(env.SITE_URL)}/education/digital-manual/success/?token=${encodeURIComponent(token)}`;
	const result = await squareRequest<{ payment_link?: { url?: string; order_id?: string } }>(env, '/v2/online-checkout/payment-links', {
		method: 'POST',
		body: JSON.stringify({
			idempotency_key: crypto.randomUUID(),
			order: {
				location_id: env.SQUARE_LOCATION_ID,
				reference_id: nonce,
				line_items: [{
					name: checkoutItemName,
					quantity: '1',
					base_price_money: { amount: checkoutAmount, currency: checkoutCurrency },
				}],
			},
			checkout_options: { redirect_url: redirectUrl },
		}),
	});

	if (!result.payment_link?.url || !result.payment_link.order_id) throw new Error('Square did not return a checkout link.');
	return { checkoutUrl: result.payment_link.url };
};

export const verifyManualPurchase = async (env: DigitalManualRuntimeEnv, token: string | null, orderId: string | null) => {
	if (!isCheckoutConfigured(env) || !env.DOWNLOAD_SIGNING_SECRET || !env.SQUARE_LOCATION_ID || !orderId) return false;
	const payload = await parseCheckoutToken(env.DOWNLOAD_SIGNING_SECRET, token);
	if (!payload) return false;

	try {
		const { order } = await squareRequest<{ order?: SquareOrder }>(env, `/v2/orders/${encodeURIComponent(orderId)}`);
		const correctItem = order?.line_items?.some((item) =>
			item.name === checkoutItemName && item.quantity === '1' && item.base_price_money?.amount === checkoutAmount && item.base_price_money?.currency === checkoutCurrency,
		);
		const paymentId = order?.tenders?.find((tender) => tender.payment_id)?.payment_id;
		if (!order || order.reference_id !== payload.nonce || order.location_id !== env.SQUARE_LOCATION_ID || !correctItem || order.total_money?.amount !== checkoutAmount || order.total_money?.currency !== checkoutCurrency || !paymentId) return false;

		const { payment } = await squareRequest<SquarePayment>(env, `/v2/payments/${encodeURIComponent(paymentId)}`);
		return payment?.status === 'COMPLETED'
			&& payment.order_id === orderId
			&& payment.location_id === env.SQUARE_LOCATION_ID
			&& payment.amount_money?.amount === checkoutAmount
			&& payment.amount_money?.currency === checkoutCurrency;
	} catch {
		return false;
	}
};

export const getManualPdf = async (env: DigitalManualRuntimeEnv) => {
	if (!env.PDF_BUCKET || !env.R2_OBJECT_KEY) return null;
	return env.PDF_BUCKET.get(env.R2_OBJECT_KEY);
};

export const getDownloadFilename = (env: DigitalManualRuntimeEnv) =>
	(env.DOWNLOAD_FILENAME || 'Maries-Minks-Lash-Artist-Digital-Training-Manual.pdf').replaceAll(/[\r\n"]/gu, '');

export const validateWebhookSignature = (env: DigitalManualRuntimeEnv, requestUrl: string, body: string, signature: string | null) =>
	env.SQUARE_WEBHOOK_SIGNATURE_KEY && signature
		? verifySignature(env.SQUARE_WEBHOOK_SIGNATURE_KEY, `${requestUrl}${body}`, signature)
		: Promise.resolve(false);
