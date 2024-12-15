<template>
	<li class="mb-6 w-full last:mb-0 md:mb-8">
		<div class="flex w-full items-center justify-between md:hidden">
			<div>
				<Heading tag="span" size="s" class="mb-2 block leading-3">
					{{ item.name }}
				</Heading>
				<Heading tag="span" size="s" class="block leading-3 text-blue-300 dark:text-blue-200">
					{{ item.quantity }} x ${{ item.price }}
				</Heading>
			</div>
			<Heading tag="span" size="s" class="leading-3">
				{{ totalPrice }}
			</Heading>
		</div>
		<div class="hidden w-full items-center md:flex">
			<Heading
				tag="span"
				size="s"
				class="basis-5/12 text-left leading-3 text-black-800 dark:text-white-0"
			>
				{{ item.name }}
			</Heading>
			<Heading
				tag="span"
				size="s"
				class="basis-1/12 text-center leading-3 text-blue-300 dark:text-blue-100"
			>
				{{ item.quantity }}
			</Heading>
			<Heading
				tag="span"
				size="s"
				class="basis-3/12 text-right leading-3 text-blue-300 dark:text-blue-100"
			>
				${{ item.price }}
			</Heading>
			<Heading
				tag="span"
				size="s"
				class="basis-3/12 text-right leading-3 text-black-800 dark:text-white-0"
			>
				{{ totalPrice }}
			</Heading>
		</div>
	</li>
</template>

<script lang="ts">
export default {
	name: "DetailsItem",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import Heading from "@/components/atoms/Heading.vue";
import type { FormItem } from "@/interfaces/invoice-form";
import { roundNumber } from "@/utils/helpers";

interface Props {
	item: FormItem;
}

const props = defineProps<Props>();

const totalPrice = computed(() => {
	const { quantity, price } = props.item;
	return `$${roundNumber(price * quantity)}`;
});
</script>
