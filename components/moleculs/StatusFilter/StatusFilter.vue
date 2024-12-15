<template>
	<div v-click-outside="closeDropdown" class="relative mr-10">
		<button
			aria-label="Filter by status"
			type="button"
			class="relative z-0 flex items-center justify-start text-sm font-bold leading-3 -tracking-sm text-black-800 dark:text-white-0"
			@click="isOpen ? closeDropdown() : openDropdown()"
		>
			Filter by status
			<span
				v-if="numberOfSelected"
				class="ml-2 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 pt-1 text-xs text-white-0"
			>
				{{ numberOfSelected }}
			</span>
			<ArrowUpIcon
				:filled="true"
				:font-controlled="false"
				class="mb-0.5 ml-3 h-2"
				:class="!isOpen && '-scale-y-100'"
			/>
		</button>
		<Transition name="fade">
			<div v-if="isOpen" class="relative z-10">
				<div
					class="absolute left-0 top-0 mt-6 flex max-h-48 flex-col items-stretch justify-start overflow-y-auto rounded-lg bg-white-0 p-6 shadow-spread-light dark:bg-black-500 dark:shadow-spread-dark"
				>
					<DropdownItem v-for="option in options" :key="option.name" :option="option" />
				</div>
			</div>
		</Transition>
	</div>
</template>

<script lang="ts">
export default {
	name: "StatusFilter",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import ArrowUpIcon from "@/assets/svg/arrow-up-icon.svg";
import DropdownItem from "@/components/moleculs/StatusFilter/partials/DropdownItem.vue";
import { invoicesStore } from "@/store/invoices";

const invoicesStoreRef = invoicesStore();

const options = ref([
	{ name: 0, label: "Paid" },
	{ name: 1, label: "Pending" },
	{ name: 2, label: "Draft" },
]);

const isOpen = ref<boolean>(false);

const closeDropdown = () => {
	isOpen.value = false;
};

const openDropdown = () => {
	isOpen.value = true;
};

const numberOfSelected = computed(() => {
	const statuses = options.value.filter((status) =>
		invoicesStoreRef.filterBy.includes(status.name),
	);
	return statuses.length;
});
</script>
