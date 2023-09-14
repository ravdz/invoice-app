<template>
    <div class="h-18 md:h-20 w-full xl:w-26 xl:h-screen z-20 relative">
        <div
            class="w-full xl:w-26 xl:h-screen xl:rounded-r-[20px] fixed flex justify-between items-stretch xl:flex-col bg-black-400 dark:bg-black-600 "
        >
            <div
                class="flex justify-center items-center w-18 md:w-20 xl:w-full h-18 md:h-20 xl:h-auto relative"
            >
                <LogoBg :filled="true" :font-controlled="false" class="w-full h-full" />
                <Logo
                    :filled="true"
                    :font-controlled="false"
                    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
            </div>
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
    </div>
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
import LogoBg from '@/assets/svg/logo-bg.svg'
import Logo from '@/assets/svg/logo.svg'
</script>
