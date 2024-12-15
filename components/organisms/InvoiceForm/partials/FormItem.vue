<template>
	<div
		class="form-item relative mt-12 flex w-full min-w-full max-w-full flex-wrap items-center justify-center first:mt-0 md:mt-4.5 md:flex-nowrap"
	>
		<Input
			v-model="name"
			label="Item Name"
			name="name"
			class="mb-6 basis-full md:mb-0 md:basis-4/12 [&>.label>.error-label]:hidden md:[&>.label]:hidden"
			:error-message="errorMessage.name.length ? errorMessage.name[0].$message : null"
		/>
		<Input
			v-model="quantity"
			label="Qty."
			name="quantity"
			type="number"
			min="0"
			step="1"
			class="basis-1/6 pr-4 md:basis-2/12 md:px-4 [&>.label>.error-label]:hidden md:[&>.label]:hidden [&>input]:px-0 [&>input]:text-center"
			:error-message="errorMessage.quantity.length ? errorMessage.quantity[0].$message : null"
		/>
		<Input
			v-model="price"
			label="Price"
			name="price"
			type="number"
			min="0"
			step="0.01"
			class="basis-2/6 text-center md:basis-3/12 md:pr-4 [&>.label>.error-label]:hidden md:[&>.label]:hidden"
			:error-message="errorMessage.price.length ? errorMessage.price[0].$message : null"
		/>
		<div class="flex basis-2/6 flex-col items-start justify-center pl-4 md:basis-2/12 md:pl-0">
			<Text
				tag="span"
				class="mb-2 w-fit leading-3 -tracking-xs text-blue-300 dark:text-blue-100 md:hidden"
			>
				Total
			</Text>
			<Heading
				tag="span"
				size="s"
				class="block w-full py-4.5 pr-5 leading-3 text-blue-200 dark:text-blue-100"
			>
				{{ totalPrice }}
			</Heading>
		</div>

		<button
			aria-label="Delete"
			type="button"
			class="basis-1/6 pl-4 md:basis-1/12"
			@click="removeItem"
		>
			<BinIcon :filled="true" />
		</button>
	</div>
</template>

<script lang="ts">
export default {
	name: "FormItem",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import BinIcon from "@/assets/svg/bin-icon.svg";
import Heading from "@/components/atoms/Heading.vue";
import Input from "@/components/atoms/Input.vue";
import Text from "@/components/atoms/Text.vue";
import type { FormItem as FormItemType } from "@/interfaces/invoice-form";
import { roundNumber } from "@/utils/helpers";

interface Props {
	data: FormItemType;
	errorMessage: any;
}

const props = defineProps<Props>();

const emit = defineEmits(["remove", "update"]);

const name = computed({
	get() {
		return props.data.name;
	},
	set(fieldValue) {
		emit("update", {
			itemId: props.data.id,
			fieldName: "name",
			fieldValue,
		});
	},
});

const quantity = computed({
	get() {
		return props.data.quantity;
	},
	set(fieldValue) {
		emit("update", {
			itemId: props.data.id,
			fieldName: "quantity",
			fieldValue,
		});
	},
});

const price = computed({
	get() {
		return props.data.price;
	},
	set(fieldValue) {
		emit("update", {
			itemId: props.data.id,
			fieldName: "price",
			fieldValue,
		});
	},
});

const totalPrice = computed(() => {
	const { quantity, price } = props.data;
	return roundNumber(price * quantity);
});

const removeItem = () => {
	emit("remove", props.data.id);
};
</script>
