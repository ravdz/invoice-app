<template>
    <div
        class="fixed z-10 top-18 md:top-20 xl:top-0 left-0 w-0 h-[calc(100vh-4.5rem)] md:h-[calc(100vh-5rem)] xl:h-screen"
    >
        <Transition name="slide-from-left">
            <div
                v-if="isOpen"
                class="h-full w-screen md:w-98 xl:w-100 md:rounded-r-2.5xl overflow-y-auto relative z-10 bg-white-0 dark:bg-black-700 xl:pt-0 xl:pl-26 flex flex-col items-stretch"
            >
                <slot />
            </div>
        </Transition>
        <Transition name="fade">
            <div
                v-if="isOpen"
                class="hidden md:block absolute top-0 left-0 bg-black-900 opacity-50 z-0 w-screen h-screen"
                @click="triggerCloseSidebar"
            />
        </Transition>
    </div>
</template>

<script lang="ts">
export default {
    name: 'Sidebar',
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

const triggerCloseSidebar = () => {
    emit('close')
}
</script>
