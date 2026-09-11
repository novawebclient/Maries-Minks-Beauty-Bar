// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
	output: 'server',
	session: false,
	adapter: cloudflare({
		imageService: 'compile',
		prerenderEnvironment: 'node',
	}),
	site: process.env.SITE_URL,
});
