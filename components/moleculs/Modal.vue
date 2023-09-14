<template>
    <div
        class="fixed top-0 left-0 w-0 h-0 z-30"
    >
        <Transition name="fade">
            <div
                v-if="isOpen"
                class=" absolute top-0 left-0 bg-black-900-half-transparent z-0 w-screen h-screen flex justify-center items-center px-6"
                @click="triggerCloseModal"
            >
                <div @click.stop>
                    <slot />
                </div>
            </div>
        </Transition>
    </div>
</template>

<script lang="ts">
export default {
    name: 'Modal',
    inheritAttrs: false
}
</script>

<script setup lang="ts">

interface Props {
  isOpen: boolean;
}

const props = defineProps<Props>()

const emit = defineEmits(['close'])

watch(
    () => props.isOpen,
    (value) => {
        if (document.body) {
            document.body.style.overflow = value ? 'hidden' : ''
        }
    }
)

const triggerCloseModal = () => {
    emit('close')
}
</script>
