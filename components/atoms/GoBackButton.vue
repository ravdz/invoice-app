<template>
    <button
        aria-label="Go back"
        class="flex justify-center items-center"
        type="button"
        @click="triggerCloseSidebar"
    >
        <ArrowLeftIcon :filled="true" :font-controlled="false" class="w-2 mr-3" />
        <Heading tag="h6" size="s" class="leading-3">
            Go back
        </Heading>
    </button>
</template>

<script lang="ts">
export default {
    name: 'GoBackButton',
    inheritAttrs: false
}
</script>

<script setup lang="ts">
import Heading from '@/components/atoms/Heading.vue'
import ArrowLeftIcon from '@/assets/svg/arrow-left-icon.svg'

const emit = defineEmits(['close'])

const triggerCloseSidebar = () => {
    emit('close')
}
</script>
