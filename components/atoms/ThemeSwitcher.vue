<template>
    <div>
        <button
            v-if="isThemeLight"
            class="flex justify-center items-center"
            type="button"
            @click="colorMode.preference = 'dark'"
        >
            <MoonIcon :filled="true" />
        </button>

        <button
            v-if="isThemeDark"
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

const isThemeDark = computed(() => colorMode.preference === 'dark')
const isThemeLight = computed(() => colorMode.preference === 'light')
</script>
