<template>
	<div
		class="flex items-center justify-center rounded-md !bg-opacity-5 px-8 pb-2.5 pt-3.5"
		:class="status.classes"
	>
		<div class="mb-1 mr-2 h-2 w-2 rounded-full" :class="status.classes" />
		<span class="text-sm leading-3 -tracking-sm text-inherit">{{ status.label }}</span>
	</div>
</template>

<script lang="ts">
export default {
	name: "StatusBadge",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
interface Props {
	statusKey: number;
}

const props = defineProps<Props>();

const status = computed(() => {
	const { statusKey } = props;
	switch (statusKey) {
		case 0: {
			return {
				label: "Paid",
				classes: "text-green-500 bg-green-500",
			};
		}
		case 1: {
			return {
				label: "Pending",
				classes: "text-orange-500 bg-orange-500",
			};
		}
		case 2: {
			return {
				label: "Draft",
				classes: "text-black-400 bg-black-400 dark:bg-blue-100 dark:text-blue-100",
			};
		}
		default: {
			return {
				label: "Unknown",
				classes: "text-black-400 bg-black-400",
			};
		}
	}
});
</script>
