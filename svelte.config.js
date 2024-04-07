import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex, escapeSvelte } from 'mdsvex';
import { getHighlighter } from 'shiki';

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const highlighter = await getHighlighter({
				themes: ['houston'],
				langs: ['javascript', 'typescript', 'bash', 'svelte']
			});
			await highlighter.loadLanguage('javascript', 'typescript');
			const html = escapeSvelte(
				highlighter.codeToHtml(code, {
					lang,
					theme: 'houston',
					colorReplacements: { '#17191e': '#2c2f36' }
				})
			);
			return `{@html \`${html}\` }`;
		}
	},
	layout: {
		_: './src/mdsvex.svelte'
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	kit: {
		adapter: adapter()
	}
};

export default config;
