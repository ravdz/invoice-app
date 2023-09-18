<template>
    <nav class="h-18 md:h-20 w-full xl:w-26 xl:h-screen z-20 relative" role="navigation">
        <div
            class="w-full xl:w-26 xl:h-screen xl:rounded-r-[20px] fixed flex justify-between items-stretch xl:flex-col bg-black-400 dark:bg-black-600 "
        >
            <img :src="LogoImg" alt="invoice app logo" class="h-18 md:h-20 xl:h-auto xl:w-26">
            <div
                class="flex justify-center items-center xl:flex-col h-18 md:h-20 xl:h-auto xl:w-full pr-8 xl:pr-0 xl:pb-6"
            >
                <div
                    class="pr-7 xl:pr-0 xl:pb-6 border-r xl:border-r-0 xl:border-b border-[#494E6E] h-full flex justify-center items-center xl:w-full"
                >
                    <ThemeSwitcher />
                </div>
                <div
                    class="pl-7 xl:pl-0 xl:pt-6 h-full flex justify-center items-center xl:w-full"
                >
                    <UserProfilePreview />
                </div>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
export default {
    name: 'VueMenu',
    inheritAttrs: false
}
</script>

<script setup lang="ts">
import ThemeSwitcher from '@/components/atoms/ThemeSwitcher.vue'
import UserProfilePreview from '@/components/atoms/UserProfilePreview.vue'
import LogoImg from '@/assets/img/logo.png'
</script>
