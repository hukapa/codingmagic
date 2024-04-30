import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	server: {
		fs: {
		  allow: ['E:/escola/PAP/PAP_jogo_web/frontend/codingmagic/static'],
		},
	  },
	plugins: [sveltekit()]
});


