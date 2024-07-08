<script lang="ts">
	import { error } from '@sveltejs/kit';
	import Gallery from 'svelte-lightbox-gallery';
	import { onMount } from 'svelte';

	/** @type {import('./$types').PageData} */
	export let data;
	let description;

	async function getDescription() {
		try {
			const description = await import(`./description.md`);

			return {
				content: description.default
			};
		} catch (e) {
			error(404, `Could not find description`);
		}
	}

	onMount(async () => {
		description = await getDescription();
	});
</script>

{#if description?.content}
	<div class="prose pb-5">
		<svelte:component this={description.content} />
	</div>
{/if}

{#await data.photos}
	<p>Loading...</p>
{:then photos}
	<Gallery {photos} dark={true} />
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
