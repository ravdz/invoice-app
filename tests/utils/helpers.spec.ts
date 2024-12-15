import { describe, expect, test } from "vitest";

import { generateUniqueID, roundNumber } from "@/utils/helpers";

describe("generateUniqueIDFunc", () => {
	test("should return string with 2 big letters at the start and then 4 numbers", () => {
		const result = generateUniqueID();
		expect(result).toMatch(/^[A-Z]{2}\d{4}$/);
	});
});

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
