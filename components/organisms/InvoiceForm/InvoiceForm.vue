<template>
	<div class="w-full px-6 pt-8 md:px-14 md:pt-14 xl:hidden">
		<GoBackButton @close="triggerCloseSidebar" />
	</div>
	<div class="flex-grow">
		<div class="flex min-h-full flex-wrap">
			<!-- form fields section -->
			<div class="basis-full px-6 py-7 md:px-14 md:py-12">
				<EditHeader v-if="isEditMode" :invoice-id="invoiceId" />
				<AddHeader v-else />

				<div class="mt-12 flex flex-col items-stretch justify-start">
					<Heading tag="h3" size="s" class="leading-3 text-blue-500 dark:text-blue-500">
						Bill From
					</Heading>
					<Input
						v-model="invoiceForm.fromStreet"
						label="Street Address"
						name="fromStreet"
						class="mt-6"
						:error-message="v.fromStreet.$errors.length ? v.fromStreet.$errors[0].$message : null"
					/>
					<div
						class="mt-6 flex flex-wrap items-center justify-center md:grid md:grid-cols-3 md:gap-6"
					>
						<Input
							v-model="invoiceForm.fromCity"
							label="City"
							name="fromCity"
							class="basis-1/2 pr-3 md:basis-auto md:pr-0"
							:error-message="v.fromCity.$errors.length ? v.fromCity.$errors[0].$message : null"
						/>
						<Input
							v-model="invoiceForm.fromZip"
							label="Post Code"
							name="fromZip"
							class="basis-1/2 pl-3 md:basis-auto md:pl-0"
							:error-message="v.fromZip.$errors.length ? v.fromZip.$errors[0].$message : null"
						/>
						<Input
							v-model="invoiceForm.fromCountry"
							label="Country"
							name="fromCountry"
							class="mt-6 basis-full md:mt-0 md:basis-auto"
							:error-message="
								v.fromCountry.$errors.length ? v.fromCountry.$errors[0].$message : null
							"
						/>
					</div>
				</div>

				<div class="mt-12 flex flex-col items-stretch justify-start">
					<Heading tag="h3" size="s" class="leading-3 text-blue-500 dark:text-blue-500">
						Bill To
					</Heading>
					<Input
						v-model="invoiceForm.toClientName"
						label="Client's Name"
						name="toClientName"
						class="mt-6"
						:error-message="
							v.toClientName.$errors.length ? v.toClientName.$errors[0].$message : null
						"
					/>
					<Input
						v-model="invoiceForm.toClientEmail"
						label="Client's Email"
						name="toClientEmail"
						class="mt-6"
						:error-message="
							v.toClientEmail.$errors.length ? v.toClientEmail.$errors[0].$message : null
						"
					/>
					<Input
						v-model="invoiceForm.toStreet"
						label="Street Address"
						name="toStreet"
						class="mt-6"
						:error-message="v.toStreet.$errors.length ? v.toStreet.$errors[0].$message : null"
					/>
					<div
						class="mt-6 flex flex-wrap items-center justify-center md:grid md:grid-cols-3 md:gap-6"
					>
						<Input
							v-model="invoiceForm.toCity"
							label="City"
							name="toCity"
							class="basis-1/2 pr-3 md:basis-auto md:pr-0"
							:error-message="v.toCity.$errors.length ? v.toCity.$errors[0].$message : null"
						/>
						<Input
							v-model="invoiceForm.toZip"
							label="Post Code"
							name="toZip"
							class="basis-1/2 pl-3 md:basis-auto md:pl-0"
							:error-message="v.toZip.$errors.length ? v.toZip.$errors[0].$message : null"
						/>
						<Input
							v-model="invoiceForm.toCountry"
							label="Country"
							name="toCountry"
							class="mt-6 basis-full md:mt-0 md:basis-auto"
							:error-message="v.toCountry.$errors.length ? v.toCountry.$errors[0].$message : null"
						/>
					</div>
					<div class="mt-12 flex flex-wrap">
						<DatePicker
							v-model="invoiceForm.invoiceDate"
							label="Invoice Date"
							name="invoiceDate"
							class="basis-full md:basis-1/2 md:pr-3"
							:error-message="
								v.invoiceDate.$errors.length ? v.invoiceDate.$errors[0].$message : null
							"
						/>
						<Dropdown
							v-model="invoiceForm.paymentTerms"
							label="Payment Terms"
							name="paymentTerms"
							:options="paymentTermsOptions"
							class="mt-6 basis-full md:mt-0 md:basis-1/2 md:pl-3"
							:error-message="
								v.paymentTerms.$errors.length ? v.paymentTerms.$errors[0].$message : null
							"
						/>
					</div>
					<Input
						v-model="invoiceForm.description"
						label="Project Description"
						name="description"
						class="mt-6"
						:error-message="v.description.$errors.length ? v.description.$errors[0].$message : null"
					/>
				</div>

				<div class="mt-12">
					<FormItemList
						:items="invoiceForm.items"
						:error-messages="v.items"
						@add="addItem"
						@remove="removeItem"
						@update="updateItem"
					/>
				</div>
			</div>

			<!-- buttons section -->
			<div class="basis-full self-end">
				<div
					style="background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 100%)"
					class="h-16 w-full md:hidden"
				/>
				<EditActionButtons
					v-if="isEditMode"
					@close="triggerCloseSidebar"
					@submit="triggerUpdateInvoice"
				/>
				<AddActionButtons
					v-else
					@close="triggerCloseSidebar"
					@draft="triggerSaveAsDraft"
					@submit="triggerAddInvoice"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
export default {
	name: "InvoiceForm",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";

import DatePicker from "@/components/atoms/DatePicker.vue";
import Dropdown from "@/components/atoms/Dropdown.vue";
import GoBackButton from "@/components/atoms/GoBackButton.vue";
import Heading from "@/components/atoms/Heading.vue";
import Input from "@/components/atoms/Input.vue";
import AddActionButtons from "@/components/organisms/InvoiceForm/partials/Add/ActionButtons.vue";
import AddHeader from "@/components/organisms/InvoiceForm/partials/Add/Header.vue";
import EditActionButtons from "@/components/organisms/InvoiceForm/partials/Edit/ActionButtons.vue";
import EditHeader from "@/components/organisms/InvoiceForm/partials/Edit/Header.vue";
import FormItemList from "@/components/organisms/InvoiceForm/partials/FormItemList.vue";
import { Option } from "@/interfaces/dropdown";
import type { FormItem, Invoice, InvoiceStatus, IUpdateItem } from "@/interfaces/invoice-form";
import { invoicesStore } from "@/store/invoices";
import { sidebarsStore } from "@/store/sidebars";
import {
	decimal,
	email,
	integer,
	maxLength,
	minLength,
	minNumber,
	required,
} from "@/utils/validation/rules";

const emit = defineEmits(["close"]);

const invoicesStoreRef = invoicesStore();
const {
	invoiceSidebar: { invoiceData },
} = sidebarsStore();

const paymentTermsOptions = ref<Option[]>([
	{ name: 1, label: "Net 1 Day" },
	{ name: 7, label: "Net 7 Days" },
	{ name: 14, label: "Net 14 Days" },
	{ name: 30, label: "Net 30 Days" },
	{ name: 45, label: "Net 45 Days" },
	{ name: 60, label: "Net 60 Days" },
]);

const invoiceId = ref<string>(invoiceData?.id || "");
const invoiceForm = ref<Invoice>({
	fromStreet: invoiceData?.fromStreet || "",
	fromCity: invoiceData?.fromCity || "",
	fromZip: invoiceData?.fromZip || "",
	fromCountry: invoiceData?.fromCountry || "",
	toClientName: invoiceData?.toClientName || "",
	toClientEmail: invoiceData?.toClientEmail || "",
	toStreet: invoiceData?.toStreet || "",
	toCity: invoiceData?.toCity || "",
	toZip: invoiceData?.toZip || "",
	toCountry: invoiceData?.toCountry || "",
	invoiceDate: invoiceData?.invoiceDate || null,
	paymentTerms: invoiceData?.paymentTerms || null,
	description: invoiceData?.description || "",
	items: invoiceData?.items || [],
});

const isEditMode = computed(() => !!invoiceId.value);

const invoiceStatus = computed(() => {
	if (
		typeof invoiceData?.status === "number" &&
		Object.values(InvoiceStatus).includes(invoiceData.status)
	) {
		return invoiceData.status as InvoiceStatus;
	} else {
		return 2;
	}
});

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
		required: required("An item must be added"),
		$each: helpers.forEach({
			name: {
				required: required("All fields must be added"),
				minLength: minLength(2),
				maxLength: maxLength(35),
			},
			quantity: {
				integer,
				required: required("All fields must be added"),
				minValue: minNumber(1),
			},
			price: {
				decimal,
				required: required("All fields must be added"),
				minValue: minNumber(0.01),
			},
		}),
	},
}));

const v = useVuelidate(invoiceFormSchema, invoiceForm.value);

const triggerCloseSidebar = () => {
	emit("close");
};

const triggerUpdateInvoice = async () => {
	try {
		const isValid = await v.value.$validate();
		if (isValid) {
			const updatedInvoice = {
				...invoiceForm.value,
				status: invoiceStatus.value === 2 ? 1 : invoiceStatus.value,
			};
			invoicesStoreRef.updateInvoice(invoiceId.value, updatedInvoice);
			triggerCloseSidebar();
		}
	} catch (error: any) {
		console.error(error);
	}
};

const triggerAddInvoice = async () => {
	try {
		const isValid = await v.value.$validate();
		if (isValid) {
			invoicesStoreRef.addInvoice(invoiceForm.value, 1);
			triggerCloseSidebar();
		}
	} catch (error: any) {
		console.error(error);
	}
};

const triggerSaveAsDraft = () => {
	try {
		v.value.$reset();
		invoicesStoreRef.addInvoice(invoiceForm.value, 2);
		triggerCloseSidebar();
	} catch (error: any) {
		console.error(error);
	}
};

const addItem = (newItem: FormItem) => {
	invoiceForm.value.items = [...invoiceForm.value.items, newItem];
};

const removeItem = (itemId: string) => {
	const newItemList = invoiceForm.value.items.filter((item: FormItem) => item.id !== itemId);
	invoiceForm.value.items = newItemList;
};

const updateItem = (data: IUpdateItem) => {
	const { itemId, fieldName, fieldValue } = data;
	const updatedItems = invoiceForm.value.items.map((item: FormItem) => {
		if (item.id === itemId) {
			return { ...item, [fieldName]: fieldValue };
		}
		return item;
	});
	invoiceForm.value.items = updatedItems;
};
</script>
