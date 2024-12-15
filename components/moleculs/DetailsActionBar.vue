<template>
	<div
		class="flex w-full items-center justify-end bg-white-0 px-6 py-5 shadow-sm dark:bg-black-600 md:hidden"
	>
		<Button :variant="3" class="mr-2" aria-label="Edit" @click="editInvoice"> Edit </Button>
		<Button :variant="5" class="mr-2" aria-label="Delete" @click="openDeleteInvoiceModal">
			Delete
		</Button>
		<Button v-if="isNotDraft" :variant="2" aria-label="Change status" @click="changeStatus">
			{{ changeStatusBtnLabel }}
		</Button>
	</div>
</template>

<script lang="ts">
export default {
	name: "DetailsActionBar",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import Button from "@/components/atoms/Button.vue";
import type { Invoice, InvoiceStatus } from "@/interfaces/invoice-form";
import { invoicesStore } from "@/store/invoices";
import { modalsStore } from "@/store/modals";
import { sidebarsStore } from "@/store/sidebars";

interface InvoiceWithId extends Invoice {
	id: string;
	status: InvoiceStatus;
}

interface Props {
	invoiceData: InvoiceWithId;
}

const props = defineProps<Props>();

const invoicesStoreRef = invoicesStore();
const modalsStoreRef = modalsStore();
const sidebarsStoreRef = sidebarsStore();

const changeStatusBtnLabel = computed(() => {
	if (props.invoiceData.status === 1) {
		return "Mark as paid";
	}
	return "Mark as pending";
});

const isNotDraft = computed(() => props.invoiceData.status !== 2);

const editInvoice = () => {
	sidebarsStoreRef.changeInvoiceSidebarVisibility(true, props.invoiceData);
};

const changeStatus = () => {
	const { id, status } = props.invoiceData;
	const newStatus = status === 1 ? 0 : 1;
	invoicesStoreRef.updateInvoice(id, { status: newStatus });
};

const openDeleteInvoiceModal = () => {
	modalsStoreRef.changeDeleteInvoiceModalVisibility(true);
};
</script>
