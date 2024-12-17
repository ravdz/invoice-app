import { useVuelidate } from "@vuelidate/core";

import type { Invoice } from "@/types/invoice-form";
import { email, integer, maxLength, minLength, required } from "@/utils/validation/rules";

const useInvoiceForm = (state: Invoice) => {
	const invoiceFormSchema = computed(() => ({
		fromStreet: {
			required: required(),
			minLength: minLength(2),
			maxLength: maxLength(35),
		},
		fromCity: {
			required: required(),
			minLength: minLength(2),
			maxLength: maxLength(35),
		},
		fromZip: {
			required: required(),
			minLength: minLength(2),
			maxLength: maxLength(10),
		},
		fromCountry: {
			required: required(),
			minLength: minLength(2),
			maxLength: maxLength(35),
		},
		toClientName: {
			required: required(),
			minLength: minLength(2),
			maxLength: maxLength(50),
		},
		toClientEmail: {
			required: required(),
			email,
			minLength: minLength(2),
			maxLength: maxLength(50),
		},
		toStreet: {
			required: required(),
			minLength: minLength(2),
			maxLength: maxLength(50),
		},
		toCity: {
			required: required(),
			minLength: minLength(2),
			maxLength: maxLength(35),
		},
		toZip: {
			required: required(),
			minLength: minLength(2),
			maxLength: maxLength(10),
		},
		toCountry: {
			required: required(),
			minLength: minLength(2),
			maxLength: maxLength(35),
		},
		invoiceDate: {
			required: required(),
		},
		paymentTerms: {
			required: required(),
			integer,
		},
		description: {
			required: required(),
			minLength: minLength(2),
			maxLength: maxLength(150),
		},
		items: {
			required: required("At least one item is required"),
		},
	}));

	return useVuelidate(invoiceFormSchema, state);
};

export default useInvoiceForm;
