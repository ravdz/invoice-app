import { useVuelidate } from "@vuelidate/core";
import type { WritableComputedRef } from "vue";

import {
	decimal,
	integer,
	maxLength,
	minLength,
	minNumber,
	required,
} from "@/utils/validation/rules";

type State = {
	id: string;
	name: WritableComputedRef<string>;
	quantity: WritableComputedRef<number>;
	price: WritableComputedRef<number>;
};

const useInvoiceItemForm = (state: State) => {
	const invoiceItemFormSchema = computed(() => ({
		name: {
			required: required(),
			minLength: minLength(2),
			maxLength: maxLength(35),
		},
		quantity: {
			integer,
			required: required(),
			minValue: minNumber(1),
		},
		price: {
			decimal,
			required: required(),
			minValue: minNumber(0.01),
		},
	}));

	return useVuelidate(invoiceItemFormSchema, state, {
		$registerAs: `items.item[${state.id}]`,
	});
};

export default useInvoiceItemForm;
