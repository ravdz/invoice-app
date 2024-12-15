<template>
	<button
		aria-label="Go back"
		class="flex items-center justify-center"
		type="button"
		@click="triggerCloseSidebar"
	>
		<ArrowLeftIcon :filled="true" :font-controlled="false" class="mr-3 w-2" />
		<Heading tag="h6" size="s" class="leading-3"> Go back </Heading>
	</button>
</template>

<script lang="ts">
export default {
	name: "GoBackButton",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import ArrowLeftIcon from "@/assets/svg/arrow-left-icon.svg";
import Heading from "@/components/atoms/Heading.vue";

const emit = defineEmits(["close"]);

const triggerCloseSidebar = () => {
	emit("close");
};
</script>
