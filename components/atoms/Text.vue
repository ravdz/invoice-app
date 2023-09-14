<template>
    <component :is="tag" :class="classes">
        <slot />
    </component>
</template>

<script lang="ts">
export default {
    name: 'VueText',
    inheritAttrs: true
}
</script>

<script setup lang="ts">
import { twMerge } from 'tailwind-merge'

interface Props {
  tag: 'span' | 'p';
}

defineProps<Props>()

const attrs = useAttrs()

const classes = computed(() => {
    const baseClasses =
    'text-xs leading-4 -tracking-xs font-medium dark:text-white-0 '
    if (typeof attrs.class === 'string' || attrs.class instanceof String) { return twMerge(baseClasses, attrs.class as string) }
    return baseClasses
})
</script>
