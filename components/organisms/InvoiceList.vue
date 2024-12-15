<template>
	<ClientOnly>
		<div
			v-if="invoicesStoreRef.filteredInvoices.length"
			class="mt-8 flex flex-col items-stretch justify-start md:mt-14 xl:mt-16"
		>
			<InvoiceItem
				v-for="invoice in invoicesStoreRef.filteredInvoices"
				:key="invoice.id + invoice.status"
				:invoice-data="invoice"
			/>
		</div>
		<EmptyList v-else />
	</ClientOnly>
</template>

<script lang="ts">
export default {
	name: "InvoiceList",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import EmptyList from "@/components/moleculs/EmptyList.vue";
import InvoiceItem from "@/components/moleculs/InvoiceItem.vue";
import { invoicesStore } from "@/store/invoices";

const invoicesStoreRef = invoicesStore();
</script>
