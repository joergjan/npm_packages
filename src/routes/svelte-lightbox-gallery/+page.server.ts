import { createApi } from 'unsplash-js';
import {
	UNSPLASH_SEKRET_KEY,
	UNSPLASH_APPLICATION_ID,
	UNSPLASH_ACCESS_KEY
} from '$env/static/private';
import type { PageServerLoad } from './$types';
import type { ApiResponse } from 'unsplash-js/dist/helpers/response';
import type { Random } from 'unsplash-js/dist/methods/photos/types';

const unsplash = createApi({
	accessKey: UNSPLASH_ACCESS_KEY
});

export const load: PageServerLoad = async () => {
	const photos = await getPhotos();

	return {
		photos: photos
	};
};

async function getPhotos() {
	const query = `${getRandomTag()},${getRandomTag()},${getRandomTag()}`;
	try {
		const result: ApiResponse<Random[]> = await unsplash.photos.getRandom<Random[]>({
			query,
			count: 40
		});

		// Map over the result to extract only the photo.urls.regular for each photo
		const regularUrls = result.response.map((photo) => photo.urls.regular);
		return regularUrls;
	} catch (error) {
		console.error('Failed to fetch photos:', error);
		return []; // Return an empty array or handle the error as needed
	}
}

let tags = [
	'city',
	'night',
	'animal',
	'energy',
	'village',
	'bear',
	'lion',
	'cat',
	'elephant',
	'giraffe',
	'penguin',
	'rat',
	'storm',
	'cloud',
	'movie',
	'light',
	'netflix',
	'disney',
	'scarf',
	'kid',
	'batman',
	'hoodie',
	'shoe',
	'building',
	'nature',
	'ocean',
	'mountain',
	'forest',
	'desert',
	'sky',
	'cityscape',
	'abstract',
	'pattern',
	'food',
	'people',
	'technology',
	'space',
	'animals',
	'sports',
	'music',
	'industry',
	'travel',
	'adventure',
	'fashion',
	'culture',
	'business',
	'architecture',
	'art',
	'history',
	'science',
	'education',
	'weather',
	'landscape',
	'macro',
	'underwater',
	'aerial',
	'cars',
	'books',
	'gaming',
	'flowers',
	'wildlife',
	'stars',
	'coffee',
	'office',
	'computer',
	'party',
	'fitness',
	'yoga',
	'cooking',
	'baking',
	'gardening',
	'painting',
	'knitting',
	'camping',
	'hiking',
	'cycling',
	'swimming',
	'running',
	'fishing',
	'sailing',
	'skiing',
	'surfing'
];

function getRandomTag() {
	return tags[Math.floor(Math.random() * tags.length)];
}
