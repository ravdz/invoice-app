<template>
	<Heading tag="h2" size="m">
		Edit
		<span class="text-blue-200">#</span>{{ invoiceId }}
	</Heading>
</template>

<script lang="ts">
export default {
	name: "VueHeader",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import Heading from "@/components/atoms/Heading.vue";

interface Props {
	invoiceId: string;
}

defineProps<Props>();
</script>
