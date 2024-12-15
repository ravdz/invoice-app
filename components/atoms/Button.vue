<template>
	<button :class="classes" type="button" :aria-label="ariaLabel || ''">
		<div v-if="variant === 1" class="pr-4">
			<PlusIcon :filled="true" :font-controlled="false" class="h-8 w-8" />
		</div>
		<slot />
	</button>
</template>

<script lang="ts">
export default {
	name: "VueButton",
	inheritAttrs: true,
};
</script>

<script setup lang="ts">
import { twMerge } from "tailwind-merge";

import PlusIcon from "@/assets/svg/plus-icon.svg";

interface Props {
	variant: 1 | 2 | 3 | 4 | 5 | 6;
	ariaLabel?: string;
}

const props = defineProps<Props>();

const attrs = useAttrs();

const variantStyle = computed(() => {
	switch (props.variant) {
		case 1: {
			return "pt-2 pb-2 pl-2 pr-4.5 bg-blue-500 hover:bg-blue-400 text-white-0";
		}
		case 2: {
			return "pt-4.5 pb-3.5 px-6 bg-blue-500 hover:bg-blue-400 text-white-0";
		}
		case 3: {
			return "pt-4.5 pb-3.5 px-6 bg-white-200 hover:bg-blue-100 text-blue-300 dark:bg-black-500 dark:hover:bg-white-0 dark:text-blue-100";
		}
		case 4: {
			return "pt-4.5 pb-3.5 px-6 bg-black-400 hover:bg-black-800 text-blue-200 dark:hover:bg-black-600 dark:text-blue-100";
		}
		case 5: {
			return "pt-4.5 pb-3.5 px-6 bg-red-500 hover:bg-red-100 text-white-0";
		}
		case 6: {
			return "pt-4.5 pb-3.5 px-6 bg-white-200 dark:bg-black-500 dark:hover:bg-white-0 dark:text-blue-100 hover:bg-blue-100 text-blue-300 w-full";
		}
		default: {
			return "px-6 py-4.5";
		}
	}
});

const classes = computed(() => {
	const baseClasses = `rounded-3xl transition flex justify-center items-center font-bold text-sm leading-3 -tracking-sm ${variantStyle.value}`;
	if (typeof attrs.class === "string" || attrs.class instanceof String) {
		return twMerge(baseClasses, attrs.class as string);
	}
	return baseClasses;
});
</script>
