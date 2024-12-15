<template>
	<div
		class="h-8 w-8 rounded-[32px] bg-cover bg-center bg-no-repeat xl:h-10 xl:w-10"
		:style="`background-image: url('${UserImg}')`"
	/>
</template>

<script lang="ts">
export default {
	name: "UserProfilePreview",
	inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import UserImg from "@/assets/img/user.png";
</script>
