<template>
	<div class="mt-9 overflow-hidden rounded-lg">
		<div class="bg-white-200 p-6 dark:bg-black-500 md:p-8 md:pb-10">
			<div class="mb-8 hidden w-full items-center md:flex">
				<Text tag="span" class="basis-5/12 text-left text-blue-300 dark:text-blue-100">
					Item Name
				</Text>
				<Text tag="span" class="basis-1/12 text-center text-blue-300 dark:text-blue-100">
					QTY.
				</Text>
				<Text tag="span" class="basis-3/12 text-right text-blue-300 dark:text-blue-100">
					Price
				</Text>
				<Text tag="span" class="basis-3/12 text-right text-blue-300 dark:text-blue-100">
					Total
				</Text>
			</div>
			<ul class="">
				<DetailsItem v-for="item in items" :key="item.id" :item="item" />
			</ul>
		</div>

		<div
			class="flex items-center justify-between bg-black-400 p-6 dark:bg-black-800 md:px-8 md:pb-5 md:pt-7"
		>
			<Text tag="span" class="text-white-0"> Amount Due </Text>
			<Heading tag="span" size="m" class="leading-8 text-white-0">
				{{ amountDue }}
			</Heading>
		</div>
	</div>
</template>

<script lang="ts">
export default {
	name: "DetailItemList",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import Heading from "@/components/atoms/Heading.vue";
import Text from "@/components/atoms/Text.vue";
import DetailsItem from "@/components/organisms/DetailItemList/partials/DetailsItem.vue";
import type { FormItem } from "@/types/invoice-form";

type Props = {
	items: FormItem[];
};

const props = defineProps<Props>();

const amountDue = computed(() => {
	const allPrices = props.items.map(({ price, quantity }: FormItem) => {
		return price * quantity;
	});
	if (allPrices.length) {
		const sum = allPrices.reduce((partialSum, a) => partialSum + a, 0);
		if (!isNaN(sum)) return `$${roundNumber(sum)}`;
	}
	return 0;
});
</script>
