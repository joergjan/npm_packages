<script lang="ts">
	import '../app.css';
	import '../fonts.css';
	import { fade } from 'svelte/transition';
	import { currentPage } from '$lib/client/stores';
	import { onMount, beforeUpdate } from 'svelte';
	import type { PageData } from './$types';
	import { titles } from '$lib/client/navbar';
	import { npmPackages } from '$lib/client/navbar';

	import PageTransition from '$lib/components/transition.svelte';

	export let data: PageData;

	let mobileMenu: boolean = false;
	let isMobile: boolean = false;
	let tabTitle: string = `Jan Jörg`;

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

		for (let i = 0; i < npmPackages.length; i++) {
			if (data.url.includes(npmPackages[i].path)) {
				$currentPage = i + 1;
				break;
			}
		}
	}

	onMount(() => {
		isMobile = window.innerWidth <= 1024;
	});
</script>

<svelte:head>
	<title>NPM Packages</title>
</svelte:head>

<div class="h-[120px] fixed top-0 w-screen bg-background z-40"></div>

<header class="fixed top-0 w-screen right-0 mx-auto left-0 max-w-7xl z-40 overflow-hidden">
	<nav class="px-5">
		<div class="flex h-16 py-2 justify-start">
			<div class="flex flex-shrink-0 items-center">
				<button
					class="group"
					on:click={() => {
						mobileMenu = false;
					}}
				>
					<a href="https://www.jan-joerg.ch" class=" z-30">
						<svg
							class="fill-white group-hover:fill-sky-300 transition-all duration-400"
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

			<ul class="hidden xl:flex ml-16 w-full">
				<div class="justify-start flex items-center w-full divide-x-2 divide-white">
					{#each titles as title, i}
						<li
							class={i === titles.findIndex((t) => t.name.includes('NPM'))
								? 'items-center text-sky-300'
								: 'items-center hover:text-sky-300 hover:transition-all hover:duration-[400ms]'}
						>
							<div class="mx-12">
								<button class="relative group">
									<a href={title.path}>
										<p class="font-semibold inline-flex">
											{title.name}
										</p>
									</a>
								</button>
							</div>
						</li>
					{/each}
				</div>
				<li class="justify-end flex w-full items-center underline">
					<a href="mailto:contact@jan-joerg.ch">contact me</a>
				</li>
			</ul>

			<div class="xl:hidden flex items-center justify-end w-full">
				<button class="" on:click={menuToggle}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24"
						class="fill-white transition-all duration-300 {mobileMenu ? 'rotate-90' : ''}"
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

		<div class="flex h-14 py-2 justify-start -mx-2">
			<ul class="hidden xl:flex w-full">
				<div class="justify-start flex items-center w-full divide-x-2 divide-white -ml-12">
					{#each npmPackages as npm, i}
						<li
							class={$currentPage === i + 1 ||
							($currentPage === 0 && i === titles.findIndex((t) => t.name.includes('NPM')))
								? 'items-center text-sky-300'
								: 'items-center hover:text-sky-300 hover:transition-all hover:duration-[400ms]'}
						>
							<div class="mx-12">
								<button class="relative group">
									<a href={npm.path}>
										<p class="inline-flex">
											{npm.name}
										</p>
									</a>
								</button>
							</div>
						</li>
					{/each}
				</div>
			</ul>
		</div>
	</nav>
</header>

{#if mobileMenu}
	<div
		in:fade={{ duration: 150 }}
		out:fade={{ duration: 150, delay: 150 }}
		class="fixed top-0 w-screen h-screen bg-background z-20"
	>
		<div class="pt-28">
			{#each titles as title, i}
				<a
					href={title.path}
					class="block px-4 py-2 hover place-content-end text-center"
					on:click={menuToggle}
				>
					<p class="font-semibold text-lg">
						{title.name}
					</p>
				</a>
			{/each}
		</div>
	</div>
{/if}

<PageTransition key={data.url}>
	<main class="max-w-7xl mx-auto -mt-4">
		<div class="mt-[120px] mx-3">
			<slot />
		</div>
	</main>
</PageTransition>

<footer>
	<div class="mx-auto max-w-7xl overflow-hidden pb-20 pt-0 px-3">
		<div class="bg-sky-300 h-1 mt-10 mb-8" />

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
