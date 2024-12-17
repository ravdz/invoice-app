<template>
	<div :class="inputWrapperClasses">
		<div class="label mb-2 flex items-center justify-between">
			<label
				v-if="!!label"
				:for="name"
				class="w-fit text-xs leading-3 -tracking-xs"
				:class="hasError ? 'text-red-500' : 'text-blue-300 dark:text-blue-100'"
			>
				{{ label }}
			</label>
			<span
				v-if="hasError"
				class="error-label text-xxs font-bold leading-3 -tracking-sm text-red-500"
			>
				{{ errorMessage }}
			</span>
		</div>
		<input
			:id="name"
			v-model="inputValue"
			:type="type"
			:name="name"
			:placeholder="placeholder"
			:min="min"
			:step="step"
			:max="max"
			class="box-border w-full rounded border bg-transparent px-5 py-4.5 text-sm font-bold leading-3 -tracking-sm transition placeholder:text-blue-100 focus:outline-none focus:ring-1 dark:bg-black-600 dark:text-white-0 dark:focus:ring-black-500"
			:class="
				hasError
					? 'border-red-500 focus:border-red-500 focus:ring-red-400'
					: 'border-blue-100 focus:border-blue-400 focus:ring-blue-400 dark:border-black-500 dark:focus:border-black-500'
			"
		/>
	</div>
</template>

<script lang="ts">
export default {
	name: "VueInput",
	inheritAttrs: true,
};
</script>

<script setup lang="ts">
import type { ErrorObject } from "@vuelidate/core";
import { twMerge } from "tailwind-merge";

type Props = {
	label?: string;
	type?: string;
	name: string;
	placeholder?: string;
	modelValue: string | number;
	error?: string | ErrorObject[] | null;
	min?: string;
	step?: string;
	max?: string;
};

const props = withDefaults(defineProps<Props>(), {
	label: "",
	type: "text",
	placeholder: "",
	error: null,
	min: "",
	step: "",
	max: "",
});

const emit = defineEmits(["update:modelValue"]);

const attrs = useAttrs();

const inputValue = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit("update:modelValue", value);
	},
});

const hasError = computed(() => !!props.error?.length);

const errorMessage = computed(() => {
	if (typeof props.error === "string") return props.error;
	else if (props.error?.length) return props.error[0].$message;
	else return "";
});

const inputWrapperClasses = computed(() => {
	const baseClasses = "flex flex-col";
	if (typeof attrs.class === "string" || attrs.class instanceof String) {
		return twMerge(baseClasses, attrs.class as string);
	}
	return baseClasses;
});
</script>

<style lang="scss" scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

/* Firefox */
input[type="number"] {
	-moz-appearance: textfield;
}
</style>
