<template>
	<NuxtLayout>
		<div class="px-6 py-9 md:px-12 md:py-18 xl:px-0 xl:py-20">
			<div class="mb-8 flex w-full items-center justify-start">
				<NuxtLink to="/">
					<GoBackButton />
				</NuxtLink>
			</div>
			<template v-if="!!invoiceData">
				<div>
					<DetailsPageBar :invoice-data="invoiceData" />
					<InvoiceDetails :invoice-data="invoiceData" />
				</div>
			</template>
		</div>
		<DetailsActionBar :invoice-data="invoiceData" />
		<DeleteInvoiceModal :invoice-id="invoiceData.id" />
	</NuxtLayout>
</template>

<script setup lang="ts">
import GoBackButton from "@/components/atoms/GoBackButton.vue";
import DetailsActionBar from "@/components/moleculs/DetailsActionBar.vue";
import DetailsPageBar from "@/components/moleculs/DetailsPageBar.vue";
import DeleteInvoiceModal from "@/components/organisms/DeleteInvoiceModal.vue";
import InvoiceDetails from "@/components/organisms/InvoiceDetails.vue";
import { invoicesStore } from "@/store/invoices";
import type { Invoice, InvoiceStatus } from "@/types/invoice-form";

interface InvoiceWithId extends Invoice {
	id: string;
	status: InvoiceStatus;
}

const store = invoicesStore();

const { id } = useRoute().params;

const invoiceData = computed(() => {
	const invoice = store.invoices.find((invoiceItem: InvoiceWithId) => invoiceItem.id === id);
	if (!invoice) {
		throw createError({ statusCode: 404, statusMessage: "Invoice not found", fatal: true });
	} else {
		return invoice;
	}
});

useHead({
	title: `InvoiceApp - #${id}`,
	meta: [
		{
			name: "description",
			content: `Details of #${id} invoice`,
		},
		{
			name: "robots",
			content: "noindex, nofollow",
		},
	],
});
</script>
