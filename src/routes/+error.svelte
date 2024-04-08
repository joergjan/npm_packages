<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { Progress } from '$lib/components/ui/progress';

	let value = 0;

	onMount(() => {
		setInterval(() => {
			value++;
		}, 10);
	});

	$: {
		if (value == 110) {
			window.location.href = '/';
		}
	}
</script>

<h1>{$page.status}</h1>
<p>{$page.error.message}</p>
<div class="flex justify-center items-center px-10 pt-5">
	<Progress {value} max={100} class="max-w-[500px] h-3 bg-gray-700" />
</div>
