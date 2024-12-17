import {
	decimal as decimalVuelidate,
	email as emailVuelidate,
	helpers,
	integer as integerVuelidate,
	maxLength as maxLengthVuelidate,
	maxValue,
	minLength as minLengthVuelidate,
	minValue,
	required as requiredVuelidate,
	requiredIf as requiredIfVuelidate,
} from "@vuelidate/validators";

export const required = (customMessage?: string) => {
	return helpers.withMessage(customMessage || "can't be empty", requiredVuelidate);
};

export const requiredIf = (value: boolean, customMessage?: string) => {
	return helpers.withMessage(customMessage || "can't be empty", requiredIfVuelidate(value));
};

export const email = helpers.withMessage("must have a valid email format", emailVuelidate);

export const integer = helpers.withMessage("must be an integer", integerVuelidate);

export const decimal = helpers.withMessage("must be a decimal", decimalVuelidate);

export const minLength = (min: number, customMessage?: string) =>
	helpers.withMessage(customMessage || "value is too short", minLengthVuelidate(min));

export const maxLength = (max: number, customMessage?: string) =>
	helpers.withMessage(customMessage || "value is too long", maxLengthVuelidate(max));

export const minNumber = (min: number, customMessage?: string) =>
	helpers.withMessage(customMessage || "value is too low", minValue(min));

export const maxNumber = (max: number, customMessage?: string) =>
	helpers.withMessage(customMessage || "value is too large", maxValue(max));
