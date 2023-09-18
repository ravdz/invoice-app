<template>
    <div>
        <button
            v-if="isThemeLight"
            aria-label="Dark theme"
            class="flex justify-center items-center"
            type="button"
            @click="colorMode.preference = 'dark'"
        >
            <MoonIcon :filled="true" />
        </button>

        <button
            v-if="isThemeDark"
            aria-label="Light theme"
            class="flex justify-center items-center"
            type="button"
            @click="colorMode.preference = 'light'"
        >
            <SunIcon :filled="true" />
        </button>
    </div>
</template>

<script lang="ts">
export default {
    name: 'ThemeSwitcher',
    inheritAttrs: false
}
</script>

<script lang="ts" setup>
import MoonIcon from '@/assets/svg/moon-icon.svg'
import SunIcon from '@/assets/svg/sun-icon.svg'

const colorMode = useColorMode()

const isThemeDark = computed(() => colorMode.value === 'dark' || colorMode.value === 'sepia')
const isThemeLight = computed(() => colorMode.value === 'light')
</script>
