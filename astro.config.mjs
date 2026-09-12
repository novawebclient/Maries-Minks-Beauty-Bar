// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

const isGitHubPagesReview = process.env.DEPLOY_TARGET === 'github-pages';

// https://astro.build/config
export default defineConfig({
	output: isGitHubPagesReview ? 'static' : 'server',
	session: false,
	// GitHub Pages needs flat static output; Cloudflare preserves its own client/server layout.
	adapter: isGitHubPagesReview ? undefined : cloudflare({
		imageService: 'compile',
		prerenderEnvironment: 'node',
	}),
	site: isGitHubPagesReview ? 'https://novawebclient.github.io' : process.env.SITE_URL,
	base: isGitHubPagesReview ? '/Maries-Minks-Beauty-Bar' : undefined,
});
