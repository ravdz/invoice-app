<template>
	<div
		class="flex items-center justify-end bg-white-0 px-6 py-5 dark:bg-black-600 md:dark:bg-transparent"
	>
		<Button :variant="3" class="mr-2" aria-label="Cancel" @click="triggerCloseSidebar">
			Cancel
		</Button>
		<Button :variant="2" aria-label="Save Changes" @click="triggerSubmit"> Save Changes </Button>
	</div>
</template>

<script lang="ts">
export default {
	name: "ActionButtons",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import Button from "@/components/atoms/Button.vue";

const emit = defineEmits(["close", "submit"]);

const triggerCloseSidebar = () => {
	emit("close");
};

const triggerSubmit = () => {
	emit("submit");
};
</script>
