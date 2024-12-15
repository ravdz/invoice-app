<template>
	<div class="rounded-lg bg-white-0 p-6 shadow-sm dark:bg-black-600 md:p-8">
		<div
			class="mb-8 flex w-full flex-col items-stretch justify-start md:mb-5 md:flex-row md:items-start md:justify-between"
		>
			<div class="mb-8 md:mb-0">
				<Heading tag="span" size="s" class="mb-1 block leading-3">
					<span class="text-blue-300">#</span>{{ invoiceData.id }}
				</Heading>
				<Text tag="span" class="leading-3 text-blue-300 dark:text-blue-100">
					{{ description }}
				</Text>
			</div>
			<div class="flex flex-col items-start justify-start">
				<Text tag="span" class="text-blue-300 dark:text-blue-100">
					{{ fromStreet }}
				</Text>
				<Text tag="span" class="text-blue-300 dark:text-blue-100">
					{{ fromCity }}
				</Text>
				<Text tag="span" class="text-blue-300 dark:text-blue-100">
					{{ fromZip }}
				</Text>
				<Text tag="span" class="text-blue-300 dark:text-blue-100">
					{{ fromCountry }}
				</Text>
			</div>
		</div>

		<div class="flex flex-wrap">
			<div class="basis-1/2 md:basis-1/3">
				<Text tag="span" class="mb-3.5 block leading-3 text-blue-300 dark:text-blue-100">
					Invoice Date
				</Text>
				<Heading tag="span" size="s" class="mb-8 block leading-4.5">
					{{ invoiceDate }}
				</Heading>

				<Text tag="span" class="mb-3.5 block leading-3 text-blue-300 dark:text-blue-100">
					Payment Due
				</Text>
				<Heading tag="span" size="s" class="block leading-4.5">
					{{ paymentDue }}
				</Heading>
			</div>
			<div class="basis-1/2 md:basis-1/3">
				<Text tag="span" class="mb-3.5 block leading-3 text-blue-300 dark:text-blue-100">
					Bill to
				</Text>
				<Heading tag="span" size="s" class="mb-2 block leading-4.5">
					{{ toClientName }}
				</Heading>
				<Text tag="span" class="block text-blue-300 dark:text-blue-100">
					{{ toStreet }}
				</Text>
				<Text tag="span" class="block text-blue-300 dark:text-blue-100">
					{{ toCity }}
				</Text>
				<Text tag="span" class="block text-blue-300 dark:text-blue-100">
					{{ toZip }}
				</Text>
				<Text tag="span" class="block text-blue-300 dark:text-blue-100">
					{{ toCountry }}
				</Text>
			</div>
			<div class="mt-8 basis-full md:mt-0 md:basis-1/3">
				<Text tag="span" class="mb-3.5 block leading-3 text-blue-300 dark:text-blue-100">
					Sent to
				</Text>
				<Heading tag="span" size="s" class="block leading-4.5">
					{{ toClientEmail }}
				</Heading>
			</div>
		</div>

		<DetailItemList v-if="invoiceData.items.length" :items="invoiceData.items" />
	</div>
</template>

<script lang="ts">
export default {
	name: "InvoiceDetails",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
// import * as dayjs from 'dayjs'
import Heading from "@/components/atoms/Heading.vue";
import Text from "@/components/atoms/Text.vue";
import DetailItemList from "@/components/organisms/DetailItemList/DetailItemList.vue";
import type { Invoice, InvoiceStatus } from "@/interfaces/invoice-form";

interface InvoiceWithId extends Invoice {
	id: string;
	status: InvoiceStatus;
}

interface Props {
	invoiceData: InvoiceWithId;
}

const props = defineProps<Props>();

const { $dayjs } = useNuxtApp();

const description = computed(() => props.invoiceData.description || "Unknown");
const fromCity = computed(() => props.invoiceData.fromCity || "Unknown");
const toCity = computed(() => props.invoiceData.toCity || "Unknown");
const toClientEmail = computed(() => props.invoiceData.toClientEmail || "Unknown");
const toClientName = computed(() => props.invoiceData.toClientName || "Unknown");
const toCountry = computed(() => props.invoiceData.toCountry || "Unknown");
const toStreet = computed(() => props.invoiceData.toStreet || "Unknown");
const toZip = computed(() => props.invoiceData.toZip || "Unknown");
const fromCountry = computed(() => props.invoiceData.fromCountry || "Unknown");
const fromStreet = computed(() => props.invoiceData.fromStreet || "Unknown");
const fromZip = computed(() => props.invoiceData.fromZip || "Unknown");
const invoiceDate = computed(() => {
	if (props.invoiceData.invoiceDate) {
		return $dayjs(props.invoiceData.invoiceDate).format("DD MMM YYYY");
	} else {
		return "Unknown";
	}
});

const paymentDue = computed(() => {
	const daysNumber = props.invoiceData.paymentTerms;
	if (!!daysNumber && !!invoiceDate.value) {
		const paymentDate = $dayjs(invoiceDate.value).add(daysNumber || 0, "day");
		return $dayjs(paymentDate).format("DD MMM YYYY");
	} else {
		return "Unknown";
	}
});
</script>
