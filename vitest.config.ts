import { resolve } from "node:path";

import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [vue()],
	test: {
		globals: true,
		environment: "jsdom",
	},
	resolve: {
		alias: [{ find: "@", replacement: resolve(__dirname, "./") }],
	},
});
