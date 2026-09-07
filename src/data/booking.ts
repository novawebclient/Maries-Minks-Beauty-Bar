import { withBase } from '../utils/urls';

export const bookingSchedulerUrl = 'https://mariesminksnbeautybar.as.me/';
export const generalBookingPath = withBase('/book/#scheduler');

export interface BookingOption {
	name: string;
	appointmentTypeIds: number[];
	bookingPath: string;
	bookingUrl: string;
}

export interface ServiceCategory {
	number: string;
	eyebrow: string;
	name: string;
	intro: string;
	description: string;
	items: BookingOption[];
	bookingPath: string;
	bookingUrl: string;
}

const buildAppointmentQuery = (appointmentTypeIds: number[]) => {
	const uniqueIds = [...new Set(appointmentTypeIds)];

	if (uniqueIds.length === 1) {
		return `appointmentType=${uniqueIds[0]}`;
	}

	return uniqueIds.map((id) => `appointmentType[]=${id}`).join('&');
};

export const getEmbeddedBookingPath = (appointmentTypeIds: number[]) =>
	withBase(`/book/?${buildAppointmentQuery(appointmentTypeIds)}#scheduler`);

export const getBookingSchedulerUrl = (appointmentTypeIds: number[]) =>
	`${bookingSchedulerUrl}?${buildAppointmentQuery(appointmentTypeIds)}`;

const createOption = (name: string, appointmentTypeIds: number[]): BookingOption => ({
	name,
	appointmentTypeIds,
	bookingPath: getEmbeddedBookingPath(appointmentTypeIds),
	bookingUrl: getBookingSchedulerUrl(appointmentTypeIds),
});

const categoryDetails = [
	{
		number: '01',
		eyebrow: 'Lash Studio',
		name: 'Lashes',
		intro: 'Choose a fresh set, maintain your current look, or enhance your natural lashes with a lift.',
		description: 'Fresh sets, maintenance, and natural-lash enhancement, all organized around the look you want to achieve.',
		items: [
			createOption('Full Lash Sets', [46143812, 47584300, 49832007, 50576837, 53440900, 53605136, 69640283, 81771405, 40520140, 39484578]),
			createOption('Lash Fills and Maintenance', [41682212, 47586225, 47586310, 53440920, 62200144, 62211175, 77406627, 40637880, 40638000, 39857121]),
			createOption('Korean Lash Lift and Tint', [86862685]),
		],
	},
	{
		number: '02',
		eyebrow: 'Shape and Smooth',
		name: 'Brows and Waxing',
		intro: 'Explore brow and beauty-bar waxing options, including Brazilian waxing, in the live scheduler.',
		description: 'Brow shaping and beauty-bar waxing services, with each website choice connected to its matching booking options.',
		items: [
			createOption('Brow Services', [50364709, 53785797, 80206768]),
			createOption('Facial and Body Waxing', [50364785, 50436180, 50436215, 54243035, 54243045, 62200121, 62211247, 62211302, 62211328, 62211405, 82728790]),
			createOption('Brazilian Waxing', [52221941, 52945724]),
		],
	},
	{
		number: '03',
		eyebrow: 'Refresh and Glow',
		name: 'Skin and Beauty',
		intro: 'Find facial services and additional beauty appointments in one easy booking path.',
		description: 'Facials and additional beauty services collected into one easy path from discovery to booking.',
		items: [
			createOption('Facial Services', [50808734, 50808861, 76792273, 84050883]),
			createOption('Skin-Focused Treatments', [55091009, 55091105, 62371498]),
			createOption('VIP Beauty Bundle', [51646778]),
		],
	},
];

export const serviceCategories: ServiceCategory[] = categoryDetails.map((category) => ({
	...category,
	bookingPath: getEmbeddedBookingPath(category.items.flatMap((item) => item.appointmentTypeIds)),
	bookingUrl: getBookingSchedulerUrl(category.items.flatMap((item) => item.appointmentTypeIds)),
}));
