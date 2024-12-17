import { describe, expect, test } from "vitest";

import { roundNumber } from "@/utils/helpers";

describe("roundNumberFunc", () => {
	test("should return a rounded number with only 2 digits", () => {
		const number = 234.455;
		const result = roundNumber(number);
		expect(result).toBe(234.46);
	});

	test("should return a number without digits after rounded", () => {
		const number = 234.004;
		const result = roundNumber(number);
		expect(result).toBe(234);
	});
});
