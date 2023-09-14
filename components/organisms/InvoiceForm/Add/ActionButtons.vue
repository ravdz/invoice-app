<template>
    <div
        class="flex justify-between items-center px-6 md:px-14 py-5 md:pt-0 md:pb-8 bg-white-0 dark:bg-black-600 md:dark:bg-transparent"
    >
        <Button :variant="3" class="mr-2" @click="triggerCloseSidebar">
            Discard
        </Button>
        <div class="flex items-center">
            <Button :variant="4" class="mr-2" @click="triggerCloseSidebar">
                Save as Draft
            </Button>
            <Button :variant="2" @click="triggerSubmit">
                Save & Send
            </Button>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'ActionButtons',
    inheritAttrs: false
}
</script>

<script setup lang="ts">
import Button from '@/components/atoms/Button.vue'

const emit = defineEmits(['close', 'submit'])

const triggerCloseSidebar = () => {
    emit('close')
}

const triggerSubmit = () => {
    emit('submit')
}
</script>
