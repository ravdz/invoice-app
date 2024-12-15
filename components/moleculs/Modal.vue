<template>
	<div class="fixed left-0 top-0 z-30 h-0 w-0">
		<Transition name="fade">
			<div
				v-if="isOpen"
				class="absolute left-0 top-0 z-0 flex h-screen w-screen items-center justify-center bg-black-900-half-transparent px-6"
				@click="triggerCloseModal"
			>
				<div @click.stop>
					<slot />
				</div>
			</div>
		</Transition>
	</div>
</template>

<script lang="ts">
export default {
	name: "Modal",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
interface Props {
	isOpen: boolean;
}

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

const triggerCloseModal = () => {
	emit("close");
};
</script>
