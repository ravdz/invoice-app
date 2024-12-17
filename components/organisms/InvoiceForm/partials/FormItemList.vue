<template>
	<div>
		<Heading tag="h3" size="s" class="leading-3 text-blue-500 dark:text-blue-500">
			Item list
		</Heading>

		<div class="mt-5 md:mt-3.5">
			<FormItem
				v-for="item in modelValue"
				:key="item.id"
				:item="item"
				@remove="removeItem"
				@update="updateItem"
			/>
		</div>

		<Button :variant="6" class="mt-4.5" aria-label="Add New Item" @click="addItem">
			+ Add New Item
		</Button>

		<div v-if="errorMessage" class="mt-8">
			<span class="text-xxs font-bold text-red-500"> - {{ errorMessage }} </span>
		</div>
	</div>
</template>

<script lang="ts">
export default {
	name: "FormItemList",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { ErrorObject } from "@vuelidate/core";
import { v4 as uuidv4 } from "uuid";

import Button from "@/components/atoms/Button.vue";
import Heading from "@/components/atoms/Heading.vue";
import FormItem from "@/components/organisms/InvoiceForm/partials/FormItem.vue";
import type { FormItem as FormItemType, UpdateItemType } from "@/types/invoice-form";

type Props = {
	modelValue: FormItemType[];
	errors?: ErrorObject[];
};

const props = defineProps<Props>();

const emit = defineEmits(["update:modelValue"]);

const errorMessage = computed(() => {
	const { errors } = props;
	if (errors?.length && typeof errors[0].$message === "string") return errors[0].$message;
	return "";
});

const addItem = () => {
	emit("update:modelValue", [
		...props.modelValue,
		{
			id: uuidv4(),
			name: "Item",
			quantity: 1,
			price: 0.01,
		},
	]);
};

const removeItem = (itemId: string) => {
	emit(
		"update:modelValue",
		props.modelValue.filter((item: FormItemType) => item.id !== itemId),
	);
};

const updateItem = (data: UpdateItemType) => {
	const { itemId, fieldName, fieldValue } = data;
	const updatedItemList = props.modelValue.map((item) => {
		if (item.id === itemId) {
			return { ...item, [fieldName]: fieldValue };
		}
		return item;
	});
	emit("update:modelValue", updatedItemList);
};
</script>
