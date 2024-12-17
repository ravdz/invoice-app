<template>
	<Modal :is-open="modalsStoreRef.deleteInvoiceModalOpen" @close="triggerCloseModal">
		<div
			class="w-full max-w-[480px] rounded-lg bg-white-0 p-8 shadow-sm dark:bg-black-600 md:p-12 md:pb-11"
		>
			<Heading tag="h2" size="m" class="mb-2 leading-8 text-black-800 dark:text-white-0 md:mb-3">
				Confirm Deletion
			</Heading>
			<Text tag="p" class="mb-5 leading-5 text-blue-200 dark:text-blue-100 md:mb-3.5">
				Are you sure you want to delete invoice #{{ invoiceId }}? This action cannot be undone.
			</Text>
			<div class="flex items-center justify-end">
				<Button :variant="3" class="mr-2" aria-label="Cancel" @click="triggerCloseModal">
					Cancel
				</Button>
				<Button :variant="5" aria-label="Delete" @click="deleteInvoice"> Delete </Button>
			</div>
		</div>
	</Modal>
</template>

<script lang="ts">
export default {
	name: "DeleteInvoiceModal",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import Button from "@/components/atoms/Button.vue";
import Heading from "@/components/atoms/Heading.vue";
import Text from "@/components/atoms/Text.vue";
import Modal from "@/components/moleculs/Modal.vue";
import { invoicesStore } from "@/store/invoices";
import { modalsStore } from "@/store/modals";

type Props = {
	invoiceId: string;
};

const props = defineProps<Props>();

const modalsStoreRef = modalsStore();
const invoicesStoreRef = invoicesStore();

const triggerCloseModal = () => {
	modalsStoreRef.changeDeleteInvoiceModalVisibility(false);
};

const deleteInvoice = () => {
	invoicesStoreRef.deleteInvoice(props.invoiceId);
	triggerCloseModal();
	return navigateTo("/");
};
</script>
