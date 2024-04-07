<script lang="ts">
	import '../app.css';
	import '../fonts.css';
	import { fade } from 'svelte/transition';
	import { currentPage } from '$lib/scripts/stores';
	import { onMount, beforeUpdate } from 'svelte';
	import type { PageData } from './$types';
	import { titles } from '$lib/scripts/navbar';

	import PageTransition from '$lib/components/transition.svelte';

	export let data: PageData;

	let mobileMenu = false;
	let isMobile = false;
	let tabTitle = `Jan Jörg | NPM`;

	function menuToggle() {
		if (mobileMenu) {
			mobileMenu = false;
		} else {
			mobileMenu = true;
		}
	}

	$: data.url && updateCurrentPage();

	function updateCurrentPage() {
		if (data.url === '/') {
			$currentPage = 0;
			return;
		}

		for (let i = 0; i < titles.length; i++) {
			if (data.url.includes(titles[i].path)) {
				$currentPage = i + 1;
				break;
			}
		}
	}

	onMount(() => {
		isMobile = window.innerWidth <= 1024;
	});

	function checkTitleIndex() {
		if (data.url === '/') {
			return -1;
		} else {
			for (let i = 0; i < titles.length; i++) {
				if (data.url.includes(titles[i].path)) {
					return i;
				}
			}
		}
		return 0;
	}

	onMount(() => {
		window.addEventListener('popstate', updateTitle);
		updateTitle();
	});

	function updateTitle() {
		if (checkTitleIndex() === -1) {
			tabTitle = 'MY NPM PACKAGES';
			return;
		}
		tabTitle = titles[checkTitleIndex()].title;
	}

	beforeUpdate(updateTitle);
</script>

<svelte:head>
	<title>{tabTitle}</title>
</svelte:head>

<nav class="sticky top-0 z-40 overflow-hidden">
	<div class="bg-gray-800 mx-auto max-w-7xl pt-2 pb-2 xl:pb-0 px-4 sm:px-6 xl:px-8">
		<div class="flex h-16 py-2 justify-between">
			<div class="flex flex-shrink-0 items-center">
				<button
					class="group"
					on:click={() => {
						mobileMenu = false;
					}}
				>
					<a href="/" class=" z-30">
						<svg
							class="{$currentPage !== 0
								? 'fill-white'
								: 'fill-blue-400'} group-hover:fill-blue-400 transition-all duration-400"
							xmlns="http://www.w3.org/2000/svg"
							height="24"
							viewBox="0 -960 960 960"
							width="24"
						>
							<path
								d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"
							/>
						</svg>
					</a>
				</button>
			</div>

			<ul class="hidden xl:flex justify-end space-x-24 w-full">
				{#each titles as title, i}
					<li
						class={$currentPage === i + 1
							? 'inline-flex items-center text-blue-400'
							: 'inline-flex items-center hover:text-blue-400  hover:transition-all hover:duration-[400ms];'}
					>
						<button class="relative group">
							<a href={title.path}>
								<p class="font-semibold">
									{title.name}
								</p>
							</a>
						</button>
					</li>
				{/each}
			</ul>

			<div class="xl:hidden flex items-center">
				<button class="" on:click={menuToggle}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24"
						class="fill-white {mobileMenu ? 'rotate' : ''}"
						viewBox="0 -960 960 960"
						width="24"
					>
						{#if mobileMenu}
							<path
								d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
							/>
						{:else}
							<path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
						{/if}
					</svg>
				</button>
			</div>
		</div>
	</div>
</nav>

{#if mobileMenu}
	<div
		in:fade={{ duration: 150 }}
		out:fade={{ duration: 150, delay: 150 }}
		class="fixed top-12 w-screen h-screen bg-gray-800 z-20"
	>
		<div class="pt-24">
			{#each titles as title, i}
				<a
					href={title.path}
					class="block px-4 py-2 hover place-content-end text-center"
					on:click={menuToggle}
				>
					<p class="font-semibold">
						{title.name}
					</p>
				</a>
			{/each}
		</div>
	</div>
{/if}

<PageTransition key={data.url}>
	<main>
		<slot />
	</main>
</PageTransition>

<footer>
	<div class="mx-auto max-w-7xl overflow-hidden pb-20 pt-0 px-6 xl:px-8">
		<div class="bg-gray-500 h-1 mt-10 mb-8" />

		<div class="mx-auto max-w-7xl overflow-hidden pb-20 pt-0 px-6 xl:px-8">
			<nav class="-mb-6 columns-2 md:flex md:justify-center md:space-x-12" aria-label="Footer">
				{#each titles as title, i}
					<div class="pb-6">
						<a href={title.path} class="hover"> {title.name}</a>
					</div>
				{/each}
			</nav>
		</div>
		<div class="mb-32" />
	</div>
</footer>
