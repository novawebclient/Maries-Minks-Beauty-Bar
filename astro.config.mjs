// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

const productionSite = 'https://mariesminksnbeautybar.com';

// https://astro.build/config
export default defineConfig({
	output: 'server',
	session: false,
	adapter: cloudflare({
		imageService: 'compile',
		prerenderEnvironment: 'node',
	}),
	site: process.env.SITE_URL || productionSite,
});
