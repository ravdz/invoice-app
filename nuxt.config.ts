import { existsSync, readFileSync } from "node:fs";
export default defineNuxtConfig({
	ssr: false,
	vite: {
		vue: {
			script: {
				fs: {
					fileExists(file) {
						return existsSync(file);
					},
					readFile(file) {
						return readFileSync(file, "utf-8");
					},
				},
			},
		},
		css: {
			preprocessorOptions: {
				scss: {
					api: "modern",
				},
			},
		},
	},

	devtools: { enabled: true },

	build: {
		transpile: ["@vuepic/vue-datepicker"],
	},

	modules: [
		[
			"@nuxtjs/google-fonts",
			{
				families: {
					"League Spartan": [500, 700],
				},
			},
		],
		"@nuxtjs/tailwindcss",
		"@nuxtjs/color-mode",
		"nuxt-svgo",
		"@pinia/nuxt",
		"pinia-plugin-persistedstate/nuxt",
		"@nuxt/test-utils/module",
	],

	css: ["@/assets/style/global.scss"],

	colorMode: {
		classSuffix: "",
	},

	plugins: ["@/plugins/dayjs.js", "@/plugins/clickOutside.js"],
	compatibilityDate: "2024-12-15",
});
