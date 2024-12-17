<template>
	<div v-click-outside="closeDropdown" :class="dropdownWrapperClasses">
		<div class="mb-2 flex items-center justify-between">
			<span
				class="w-fit text-xs leading-3 -tracking-xs"
				:class="hasError ? 'text-red-500' : 'text-blue-300 dark:text-blue-100'"
			>
				{{ label }}
			</span>
			<span v-if="!!errorMessage" class="text-xxs font-bold leading-3 -tracking-sm text-red-500">
				{{ errorMessage }}
			</span>
		</div>
		<button
			ref="dropdownTriggerRef"
			:aria-label="label"
			type="button"
			:class="[dropdownTriggerClasses, triggerClasses]"
			@click="isOpen ? closeDropdown() : openDropdown()"
		>
			<template v-if="!!modelValue">
				{{ selectionLabel }}
			</template>
			<span v-else class="text-blue-100">Click to select</span>
		</button>
		<Transition name="fade">
			<div v-if="isOpen" class="relative z-10" :class="dropdownClasses">
				<div
					class="absolute left-0 top-0 mt-6 flex max-h-48 w-full flex-col items-stretch justify-start overflow-y-auto rounded-lg bg-white-0 shadow-spread-light dark:bg-black-500 dark:shadow-spread-dark"
				>
					<button
						v-for="option in options"
						:key="option.name"
						:aria-label="label"
						class="w-full border-b border-blue-100 px-6 py-4.5 text-left text-sm font-bold leading-3 -tracking-sm transition last:border-none hover:text-blue-500 dark:border-black-600 dark:text-blue-100 dark:hover:text-blue-400"
						type="button"
						@click="selectOption(option)"
					>
						{{ option.label }}
					</button>
				</div>
			</div>
		</Transition>
	</div>
</template>

<script lang="ts">
export default {
	name: "Dropdown",
	inheritAttrs: true,
};
</script>

<script setup lang="ts">
import type { ErrorObject } from "@vuelidate/core";
import { twMerge } from "tailwind-merge";

import type { Option } from "@/types/dropdown";

type Props = {
	label: string;
	name: string;
	modelValue: number | null;
	error?: string | ErrorObject[] | null;
	options: Option[];
	triggerClasses?: string;
	dropdownClasses?: string;
};

const props = withDefaults(defineProps<Props>(), {
	error: null,
	triggerClasses: "",
	dropdownClasses: "",
});

const emit = defineEmits(["update:modelValue"]);

const dropdownTriggerRef = ref<HTMLDivElement | null>(null);
const isOpen = ref<boolean>(false);

const attrs = useAttrs();

const selectionLabel = computed(() => {
	const option = props.options.find((item: Option) => item.name === props.modelValue);
	if (option) {
		return option.label;
	}
	return "No label";
});

const hasError = computed(() => !!props.error?.length);

const errorMessage = computed(() => {
	if (typeof props.error === "string") return props.error;
	else if (props.error?.length) return props.error[0].$message;
	else return "";
});

const dropdownWrapperClasses = computed(() => {
	const baseClasses = "relative flex flex-col";
	if (typeof attrs.class === "string" || attrs.class instanceof String) {
		return twMerge(baseClasses, attrs.class as string);
	}
	return baseClasses;
});

const dropdownTriggerClasses = computed(() => {
	const baseClasses =
		"border bg-transparent dark:bg-black-600 dark:text-white-0 rounded py-4.5 px-5 text-sm leading-3 -tracking-sm font-bold flex justify-start items-center transition";
	let extraClasses = "";
	if (isOpen.value) {
		if (hasError.value) {
			extraClasses = "border-red-500 ring-1 ring-red-400";
		} else {
			extraClasses =
				"border-blue-400 dark:border-black-500 ring-1 ring-blue-400 dark:ring-black-500";
		}
	} else if (hasError.value) {
		extraClasses = "border-red-500";
	} else {
		extraClasses = "border-blue-100 dark:border-black-500";
	}
	return twMerge(baseClasses, extraClasses as string);
});

const closeDropdown = () => {
	isOpen.value = false;
};

const openDropdown = () => {
	isOpen.value = true;
};

const selectOption = (option: Option) => {
	emit("update:modelValue", option.name);
	closeDropdown();
};
</script>
