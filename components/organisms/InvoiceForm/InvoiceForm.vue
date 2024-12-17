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
						v-model="v.fromStreet.$model"
						label="Street Address"
						name="fromStreet"
						class="mt-6"
						:error="v.fromStreet.$errors"
					/>
					<div
						class="mt-6 flex flex-wrap items-center justify-center md:grid md:grid-cols-3 md:gap-6"
					>
						<Input
							v-model="v.fromCity.$model"
							label="City"
							name="fromCity"
							class="basis-1/2 pr-3 md:basis-auto md:pr-0"
							:error="v.fromCity.$errors"
						/>
						<Input
							v-model="v.fromZip.$model"
							label="Post Code"
							name="fromZip"
							class="basis-1/2 pl-3 md:basis-auto md:pl-0"
							:error="v.fromZip.$errors"
						/>
						<Input
							v-model="v.fromCountry.$model"
							label="Country"
							name="fromCountry"
							class="mt-6 basis-full md:mt-0 md:basis-auto"
							:error="v.fromCountry.$errors"
						/>
					</div>
				</div>

				<div class="mt-12 flex flex-col items-stretch justify-start">
					<Heading tag="h3" size="s" class="leading-3 text-blue-500 dark:text-blue-500">
						Bill To
					</Heading>
					<Input
						v-model="v.toClientName.$model"
						label="Client's Name"
						name="toClientName"
						class="mt-6"
						:error="v.toClientName.$errors"
					/>
					<Input
						v-model="v.toClientEmail.$model"
						label="Client's Email"
						name="toClientEmail"
						class="mt-6"
						:error="v.toClientEmail.$errors"
					/>
					<Input
						v-model="v.toStreet.$model"
						label="Street Address"
						name="toStreet"
						class="mt-6"
						:error="v.toStreet.$errors"
					/>
					<div
						class="mt-6 flex flex-wrap items-center justify-center md:grid md:grid-cols-3 md:gap-6"
					>
						<Input
							v-model="v.toCity.$model"
							label="City"
							name="toCity"
							class="basis-1/2 pr-3 md:basis-auto md:pr-0"
							:error="v.toCity.$errors"
						/>
						<Input
							v-model="v.toZip.$model"
							label="Post Code"
							name="toZip"
							class="basis-1/2 pl-3 md:basis-auto md:pl-0"
							:error="v.toZip.$errors"
						/>
						<Input
							v-model="v.toCountry.$model"
							label="Country"
							name="toCountry"
							class="mt-6 basis-full md:mt-0 md:basis-auto"
							:error="v.toCountry.$errors"
						/>
					</div>
					<div class="mt-12 flex flex-wrap">
						<DatePicker
							v-model="v.invoiceDate.$model"
							label="Invoice Date"
							name="invoiceDate"
							class="basis-full md:basis-1/2 md:pr-3"
							:error="v.invoiceDate.$errors"
						/>
						<Dropdown
							v-model="v.paymentTerms.$model"
							label="Payment Terms"
							name="paymentTerms"
							:options="paymentTermsOptions"
							class="mt-6 basis-full md:mt-0 md:basis-1/2 md:pl-3"
							:error="v.paymentTerms.$errors"
						/>
					</div>
					<Input
						v-model="v.description.$model"
						label="Project Description"
						name="description"
						class="mt-6"
						:error="v.description.$errors"
					/>
				</div>

				<div class="mt-12">
					<FormItemList v-model="v.items.$model" :errors="v.items.$errors" />
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
import useInvoiceForm from "@/composables/useInvoiceForm";
import { invoicesStore } from "@/store/invoices";
import { sidebarsStore } from "@/store/sidebars";
import type { Option } from "@/types/dropdown";
import { type Invoice, InvoiceStatus } from "@/types/invoice-form";

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

const invoiceStatus = computed<InvoiceStatus>(() => {
	if (
		typeof invoiceData?.status === "number" &&
		Object.values(InvoiceStatus).includes(invoiceData.status)
	) {
		return invoiceData.status;
	} else {
		return 2;
	}
});

const v = useInvoiceForm(invoiceForm.value);

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
</script>
