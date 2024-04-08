<script lang="ts">
	export let href: string;
</script>

<a {href} target="_blank">
	<slot />
</a>

<style>
	a {
		@apply underline hover:text-blue-300;
	}
</style>
