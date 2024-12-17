<template>
	<button
		:aria-label="option.label"
		class="group mb-4 flex w-full items-center justify-start text-left text-sm font-bold leading-3 -tracking-sm last:mb-0 dark:text-white-0"
		type="button"
		@click="handleChangeFilter"
	>
		<div
			class="relative mr-4 flex h-4 w-4 shrink-0 items-center justify-center rounded border border-transparent transition group-hover:border-blue-500"
			:class="checked ? 'border-blue-500 bg-blue-500' : 'bg-blue-100 dark:bg-black-600'"
		>
			<i v-show="checked" class="gg-check" />
		</div>
		{{ option.label }}
	</button>
</template>

<script lang="ts">
export default {
	name: "DropdownItem",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { invoicesStore } from "@/store/invoices";
import type { Option } from "@/types/dropdown";

type Props = {
	option: Option;
};

const props = defineProps<Props>();

const store = invoicesStore();

const checked = computed(() => {
	return store.filterBy.includes(props.option.name);
});

const handleChangeFilter = () => {
	store.changeFilters(props.option.name);
};
</script>

<style lang="scss" scoped>
.gg-check {
	@apply absolute left-1/2 top-1/2 box-border block h-[22px] w-[22px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-transparent;
}
.gg-check::after {
	@apply absolute left-[3px] top-[-1px] box-border block h-2.5 w-1.5 origin-bottom-left rotate-45 border-b-2 border-r-2;
	content: "";
}
</style>
