<template>
	<div
		class="mb-4 flex w-full justify-between rounded-lg bg-white-0 p-6 shadow-sm dark:bg-black-600 md:px-8 md:py-6"
	>
		<div class="flex w-full items-center justify-between md:w-auto">
			<Text tag="span" class="block leading-3 text-blue-300 dark:text-blue-100 md:mr-5">
				Status
			</Text>
			<StatusBadge :status-key="invoiceData.status" />
		</div>
		<div class="hidden items-center justify-end md:flex">
			<Button :variant="3" class="mr-2" aria-label="Edit" @click="editInvoice"> Edit </Button>
			<Button :variant="5" class="mr-2" aria-label="Delete" @click="openDeleteInvoiceModal">
				Delete
			</Button>
			<Button v-if="isNotDraft" :variant="2" aria-label="Change status" @click="changeStatus">
				{{ changeStatusBtnLabel }}
			</Button>
		</div>
	</div>
</template>

<script lang="ts">
export default {
	name: "DetailsPageBar",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import Button from "@/components/atoms/Button.vue";
import StatusBadge from "@/components/atoms/StatusBadge.vue";
import Text from "@/components/atoms/Text.vue";
import type { Invoice, InvoiceStatus } from "@/interfaces/invoice-form";
import { invoicesStore } from "@/store/invoices";
import { modalsStore } from "@/store/modals";
import { sidebarsStore } from "@/store/sidebars";

interface InvoiceData extends Invoice {
	id: string;
	status: InvoiceStatus;
}

interface Props {
	invoiceData: InvoiceData;
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
