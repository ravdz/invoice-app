<template>
    <div class="rounded-md pt-3.5 pb-2.5 px-8 !bg-opacity-5 flex justify-center items-center" :class="status.classes">
        <div class="w-2 h-2 rounded-full mr-2 mb-1" :class="status.classes" /> <span class="text-inherit text-sm leading-3 -tracking-sm">{{ status.label }}</span>
    </div>
</template>

<script lang="ts">
export default {
    name: 'StatusBadge',
    inheritAttrs: false
}
</script>

<script setup lang="ts">
interface Props {
    statusKey: number
}

const props = defineProps<Props>()

const status = computed(() => {
    const { statusKey } = props
    switch (statusKey) {
    case 0: {
        return {
            label: 'Paid',
            classes: 'text-green-500 bg-green-500'
        }
    }
    case 1: {
        return {
            label: 'Pending',
            classes: 'text-orange-500 bg-orange-500'
        }
    }
    case 2: {
        return {
            label: 'Draft',
            classes: 'text-black-400 bg-black-400 dark:bg-blue-100 dark:text-blue-100'
        }
    }
    default: {
        return {
            label: 'Unknown',
            classes: 'text-black-400 bg-black-400'
        }
    }
    }
})

</script>
