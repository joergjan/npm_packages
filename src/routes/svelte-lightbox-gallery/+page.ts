import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const description = await import(`./description.md`);

		return {
			content: description.default
		};
	} catch (e) {
		error(404, `Could not find description`);
	}
}
