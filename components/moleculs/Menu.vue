<template>
	<nav class="relative z-20 h-18 w-full md:h-20 xl:h-screen xl:w-26" role="navigation">
		<div
			class="fixed flex w-full items-stretch justify-between bg-black-400 dark:bg-black-600 xl:h-screen xl:w-26 xl:flex-col xl:rounded-r-[20px]"
		>
			<img :src="LogoImg" alt="invoice app logo" class="h-18 md:h-20 xl:h-auto xl:w-26" />
			<div
				class="flex h-18 items-center justify-center pr-8 md:h-20 xl:h-auto xl:w-full xl:flex-col xl:pb-6 xl:pr-0"
			>
				<div
					class="flex h-full items-center justify-center border-r border-[#494E6E] pr-7 xl:w-full xl:border-b xl:border-r-0 xl:pb-6 xl:pr-0"
				>
					<ThemeSwitcher />
				</div>
				<div class="flex h-full items-center justify-center pl-7 xl:w-full xl:pl-0 xl:pt-6">
					<UserProfilePreview />
				</div>
			</div>
		</div>
	</nav>
</template>

<script lang="ts">
export default {
	name: "VueMenu",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import LogoImg from "@/assets/img/logo.png";
import ThemeSwitcher from "@/components/atoms/ThemeSwitcher.vue";
import UserProfilePreview from "@/components/atoms/UserProfilePreview.vue";
</script>
