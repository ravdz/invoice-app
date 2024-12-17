<template>
	<component :is="tag" :class="classes">
		<slot />
	</component>
</template>

<script lang="ts">
export default {
	name: "Heading",
	inheritAttrs: true,
};
</script>

<script setup lang="ts">
import { twMerge } from "tailwind-merge";

type Props = {
	tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p";
	size: "s" | "m" | "l";
};
const props = defineProps<Props>();

const attrs = useAttrs();

const variantStyle = computed(() => {
	switch (props.size) {
		case "s": {
			return "text-sm leading-6 -tracking-sm";
		}
		case "m": {
			return "text-2xl leading-5 -tracking-md";
		}
		case "l": {
			return "text-4xl leading-8 -tracking-lg";
		}
		default: {
			return "";
		}
	}
});

const classes = computed(() => {
	const baseClasses = `font-bold dark:text-white-0 ${variantStyle.value}`;
	if (typeof attrs.class === "string" || attrs.class instanceof String) {
		return twMerge(baseClasses, attrs.class as string);
	}
	return baseClasses;
});
</script>
