<template>
	<div class="mt-28 flex flex-col items-center justify-center md:mt-52 xl:mt-36">
		<EmptyListImg :filled="true" :font-controlled="false" class="w-48 md:w-60" />
		<Heading tag="h2" size="m" class="mt-16 text-center"> There is nothing here </Heading>
		<Text tag="span" class="m-6 text-center">
			Create an invoice by clicking the
			<br />
			New button and get started
		</Text>
	</div>
</template>

<script lang="ts">
export default {
	name: "EmptyList",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import EmptyListImg from "@/assets/svg/empty-list-img.svg";
import Heading from "@/components/atoms/Heading.vue";
import Text from "@/components/atoms/Text.vue";
</script>
