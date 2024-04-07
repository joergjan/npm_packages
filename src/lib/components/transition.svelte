<script lang="ts">
	import { fade } from 'svelte/transition';

	export let key: string;
</script>

{#key key}
	<div in:fade={{ delay: 150, duration: 150 }} out:fade={{ delay: 0, duration: 150 }}>
		<slot />
	</div>
{/key}
