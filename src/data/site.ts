export const site = {
	displayName: 'Marie’s Minks & Beauty Bar',
	shortName: 'Marie’s Minks',
	serviceArea: 'Ocala and surrounding areas',
	hours: 'By appointment only',
	contact: {
		email: 'angelinadunn1@aol.com',
		phoneDisplay: '(352) 843-1383',
		phoneHref: 'tel:+13528431383',
	},
	socials: [
		{ label: 'Instagram', href: 'https://www.instagram.com/mariesminksnbeautybar/' },
		{ label: 'Facebook', href: 'https://www.facebook.com/share/1U8psjBpbJ/?mibextid=wwXIfr' },
		{ label: 'TikTok', href: 'https://www.tiktok.com/@mariesminksnbeautybar_' },
	],
} as const;

export const socialByLabel = (label: (typeof site.socials)[number]['label']) =>
	site.socials.find((social) => social.label === label);
