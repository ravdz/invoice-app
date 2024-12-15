import { $fetch, setup } from "@nuxt/test-utils";
import { describe, test } from "vitest";

describe("buttonComponent", async () => {
	await setup({
		// test context options
	});
	test("should have an aria-label attr", async () => {
		const html = await $fetch("/");
		console.log(html);
	});
});
