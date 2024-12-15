<template>
	<NuxtLink :to="invoiceUrl" class="invoice-item">
		<div class="invoice-item__id-wrapper">
			<Heading tag="h2" size="s" class="leading-3">
				<span class="text-blue-300">#</span>{{ invoiceData.id }}
			</Heading>
		</div>
		<div class="invoice-item__date-wrapper">
			<span class="text-xs leading-3 -tracking-xs text-blue-300 dark:text-blue-100">
				{{ invoiceDate }}
			</span>
		</div>
		<div class="invoice-item__client-wrapper">
			<span class="text-xs leading-3 -tracking-xs text-blue-300 dark:text-white-0">
				{{ toClientName }}
			</span>
		</div>
		<div class="invoice-item__price-wrapper">
			<span class="text-sm font-bold leading-6 -tracking-sm text-black-800 dark:text-white-0">
				{{ amountDue }}
			</span>
		</div>
		<div class="invoice-item__status-wrapper">
			<StatusBadge :status-key="invoiceData.status" />
			<ArrowRightIcon :filled="true" :font-controlled="false" class="hidden h-3 md:ml-5 md:block" />
		</div>
	</NuxtLink>
</template>

<script lang="ts">
export default {
	name: "InvoiceItem",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import ArrowRightIcon from "@/assets/svg/arrow-right-icon.svg";
import Heading from "@/components/atoms/Heading.vue";
import StatusBadge from "@/components/atoms/StatusBadge.vue";
import type { FormItem, Invoice, InvoiceStatus } from "@/interfaces/invoice-form";

interface InvoiceWithId extends Invoice {
	id: string;
	status: InvoiceStatus;
}

interface Props {
	invoiceData: InvoiceWithId;
}

const props = defineProps<Props>();

const { $dayjs } = useNuxtApp();

const invoiceDate = computed(() => {
	if (props.invoiceData.invoiceDate) {
		return $dayjs(props.invoiceData.invoiceDate).format("DD MMM YYYY");
	} else {
		return "Unknown";
	}
});

const toClientName = computed(() => props.invoiceData.toClientName || "Unknown");

const amountDue = computed(() => {
	const allPrices = props.invoiceData.items.map(({ price, quantity }: FormItem) => {
		return price * quantity;
	});
	if (allPrices.length) {
		const sum = allPrices.reduce((partialSum, a) => partialSum + a, 0);
		if (!isNaN(sum)) return `$${sum}`;
	}
	return 0;
});

const invoiceUrl = computed(() => `/invoices/${props.invoiceData.id}`);
</script>

<style lang="scss" scoped>
.invoice-item {
	@apply mb-4 grid w-full cursor-pointer rounded-lg border border-transparent bg-white-0 p-6 shadow-sm transition last:mb-0 hover:border-blue-500 dark:bg-black-600;
	grid-template-columns: repeat(2, 1fr);
	grid-template-areas:
		"id client"
		"date status"
		"price status";
	@media (min-width: 768px) {
		grid-template-columns: repeat(5, 1fr);
		grid-template-areas: "id date client price status";
	}
	&__id-wrapper {
		@apply mb-6 flex items-center justify-start md:mb-0;
		grid-area: id;
	}
	&__date-wrapper {
		@apply mb-2 flex items-center justify-start md:mb-0 md:justify-center;
		grid-area: date;
	}
	&__client-wrapper {
		@apply mb-6 flex items-center justify-end md:mb-0 md:justify-center;
		grid-area: client;
	}
	&__price-wrapper {
		@apply flex items-center justify-start md:justify-center;
		grid-area: price;
	}
	&__status-wrapper {
		@apply flex items-center justify-end;
		grid-area: status;
	}
}
</style>
