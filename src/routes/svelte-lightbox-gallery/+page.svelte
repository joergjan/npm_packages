<script lang="ts">
	import Gallery from 'svelte-lightbox-gallery';
	import { onMount } from 'svelte';

	export let data;
	let photos: string[] = [
		'https://source.unsplash.com/random/?city,night',
		'https://source.unsplash.com/random/?city,animal',
		'https://source.unsplash.com/random/?city,energy',
		'https://source.unsplash.com/random/?village',
		'https://source.unsplash.com/random/?bear,night',
		'https://source.unsplash.com/random/?lion,night',
		'https://source.unsplash.com/random/?cat,night',
		'https://source.unsplash.com/random/?city,cat',
		'https://source.unsplash.com/random/?city,elephant',
		'https://source.unsplash.com/random/?city,giraffe',
		'https://source.unsplash.com/random/?penguin,night',
		'https://source.unsplash.com/random/?rat,lion',
		'https://source.unsplash.com/random/?cat,rat',
		'https://source.unsplash.com/random/?storm,night',
		'https://source.unsplash.com/random/?city,day',
		'https://source.unsplash.com/random/?cloud',
		'https://source.unsplash.com/random/?movie',
		'https://source.unsplash.com/random/?light,night',
		'https://source.unsplash.com/random/?netflix,disney',
		'https://source.unsplash.com/random/?scarf',
		'https://source.unsplash.com/random/?playground,clown',
		'https://source.unsplash.com/random/?batman',
		'https://source.unsplash.com/random',
		'https://source.unsplash.com/random/?model',
		'https://source.unsplash.com/random/?shoe',
		'https://source.unsplash.com/random/?hoodie',
		'https://source.unsplash.com/random/?building',
		'https://source.unsplash.com/random/?',
		'https://source.unsplash.com/random/?nature',
		'https://source.unsplash.com/random/?ocean,beach',
		'https://source.unsplash.com/random/?mountain,snow',
		'https://source.unsplash.com/random/?forest',
		'https://source.unsplash.com/random/?desert',
		'https://source.unsplash.com/random/?sky',
		'https://source.unsplash.com/random/?cityscape',
		'https://source.unsplash.com/random/?abstract',
		'https://source.unsplash.com/random/?pattern',
		'https://source.unsplash.com/random/?food',
		'https://source.unsplash.com/random/?people',
		'https://source.unsplash.com/random/?technology',
		'https://source.unsplash.com/random/?space',
		'https://source.unsplash.com/random/?ocean',
		'https://source.unsplash.com/random/?animals',
		'https://source.unsplash.com/random/?sports',
		'https://source.unsplash.com/random/?music',
		'https://source.unsplash.com/random/?industry',
		'https://source.unsplash.com/random/?travel',
		'https://source.unsplash.com/random/?adventure',
		'https://source.unsplash.com/random/?fashion',
		'https://source.unsplash.com/random/?culture',
		'https://source.unsplash.com/random/?business',
		'https://source.unsplash.com/random/?architecture',
		'https://source.unsplash.com/random/?art',
		'https://source.unsplash.com/random/?history',
		'https://source.unsplash.com/random/?science',
		'https://source.unsplash.com/random/?education',
		'https://source.unsplash.com/random/?weather',
		'https://source.unsplash.com/random/?landscape',
		'https://source.unsplash.com/random/?macro',
		'https://source.unsplash.com/random/?underwater',
		'https://source.unsplash.com/random/?aerial',
		'https://source.unsplash.com/random/?cars',
		'https://source.unsplash.com/random/?books',
		'https://source.unsplash.com/random/?gaming',
		'https://source.unsplash.com/random/?flowers',
		'https://source.unsplash.com/random/?city,night',
		'https://source.unsplash.com/random/?wildlife',
		'https://source.unsplash.com/random/?mountains',
		'https://source.unsplash.com/random/?beach',
		'https://source.unsplash.com/random/?forest',
		'https://source.unsplash.com/random/?sky,stars',
		'https://source.unsplash.com/random/?coffee',
		'https://source.unsplash.com/random/?office',
		'https://source.unsplash.com/random/?computer',
		'https://source.unsplash.com/random/?party',
		'https://source.unsplash.com/random/?fitness',
		'https://source.unsplash.com/random/?yoga',
		'https://source.unsplash.com/random/?cooking',
		'https://source.unsplash.com/random/?baking',
		'https://source.unsplash.com/random/?gardening',
		'https://source.unsplash.com/random/?painting',
		'https://source.unsplash.com/random/?knitting',
		'https://source.unsplash.com/random/?camping',
		'https://source.unsplash.com/random/?hiking',
		'https://source.unsplash.com/random/?cycling',
		'https://source.unsplash.com/random/?swimming',
		'https://source.unsplash.com/random/?running',
		'https://source.unsplash.com/random/?fishing',
		'https://source.unsplash.com/random/?sailing',
		'https://source.unsplash.com/random/?skiing',
		'https://source.unsplash.com/random/?surfing'
	];
</script>

<div class="prose pb-5">
	<svelte:component this={data.content} />
</div>

<div>
	<Gallery {photos} dark={true} />
</div>
