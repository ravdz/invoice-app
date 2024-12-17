import { describe, expect, test } from "vitest";

import useUniqueId from "@/composables/useUniqueId";

describe("generateUniqueIdFunc", () => {
	test("should return string with 2 big letters at the start and then 4 numbers", () => {
		const result = useUniqueId();
		expect(result).toMatch(/^[A-Z]{2}\d{4}$/);
	});
});
