/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	test: {
		browser: {
			enabled: true,
			provider: 'playwright',
			// https://vitest.dev/guide/browser/playwright
			instances: [
				{
					browser: 'chromium',
				},
			],
		},
		globals: true,
		environment: 'jsdom',
		setupFiles: './vitest.setup.ts',
	},
});
