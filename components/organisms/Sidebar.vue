<template>
	<div
		class="fixed left-0 top-18 z-10 h-[calc(100vh-4.5rem)] w-0 md:top-20 md:h-[calc(100vh-5rem)] xl:top-0 xl:h-screen"
	>
		<Transition name="slide-from-left">
			<div
				v-if="isOpen"
				class="relative z-10 flex h-full w-screen flex-col items-stretch overflow-y-auto bg-white-0 dark:bg-black-700 md:w-98 md:rounded-r-2.5xl xl:w-100 xl:pl-26 xl:pt-0"
			>
				<slot />
			</div>
		</Transition>
		<Transition name="fade">
			<div
				v-if="isOpen"
				class="absolute left-0 top-0 z-0 hidden h-screen w-screen bg-black-900 opacity-50 md:block"
				@click="triggerCloseSidebar"
			/>
		</Transition>
	</div>
</template>

<script lang="ts">
export default {
	name: "Sidebar",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
type Props = {
	isOpen: boolean;
};

const props = defineProps<Props>();

const emit = defineEmits(["close"]);

watch(
	() => props.isOpen,
	(value) => {
		if (document.body) {
			document.body.style.overflow = value ? "hidden" : "";
		}
	},
);

const triggerCloseSidebar = () => {
	emit("close");
};
</script>
