<template>
    <div v-click-outside="closeDropdown" :class="dropdownWrapperClasses">
        <div class="flex justify-between items-center mb-2">
            <span
                class="text-xs leading-3 -tracking-xs w-fit"
                :class="hasError ? 'text-red-500' : 'text-blue-300 dark:text-blue-100'"
            >
                {{ label }}
            </span>
            <span
                v-if="!!errorMessage"
                class="text-xxs leading-3 -tracking-sm font-bold text-red-500"
            >
                {{ errorMessage }}
            </span>
        </div>
        <button
            ref="dropdownTriggerRef"
            :aria-label="label"
            type="button"
            :class="[dropdownTriggerClasses, triggerClasses]"
            @click="isOpen ? closeDropdown() : openDropdown()"
        >
            <template v-if="!!modelValue">
                {{ selectionLabel }}
            </template>
            <span v-else class="text-blue-100">Click to select</span>
        </button>
        <Transition name="fade">
            <div v-if="isOpen" class="relative z-10" :class="dropdownClasses">
                <div
                    class="absolute top-0 left-0 w-full mt-6 max-h-48 rounded-lg shadow-spread-light dark:shadow-spread-dark flex flex-col justify-start items-stretch bg-white-0 dark:bg-black-500 overflow-y-auto"
                >
                    <button
                        v-for="option in options"
                        :key="option.name"
                        :aria-label="label"
                        class="w-full py-4.5 px-6 border-b last:border-none border-blue-100 dark:border-black-600 dark:text-blue-100 text-left text-sm leading-3 -tracking-sm font-bold hover:text-blue-500 dark:hover:text-blue-400 transition"
                        type="button"
                        @click="selectOption(option)"
                    >
                        {{ option.label }}
                    </button>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script lang="ts">
export default {
    name: 'Dropdown',
    inheritAttrs: true
}
</script>

<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import { Option } from '@/interfaces/dropdown'

interface Props {
  label: string;
  name: string;
  modelValue: number | null;
  errorMessage?: string | null;
  options: Option[];
  triggerClasses?: string;
  dropdownClasses?: string;
}

const props = withDefaults(defineProps<Props>(), {
    triggerClasses: '',
    dropdownClasses: '',
    errorMessage: ''
})

const emit = defineEmits(['update:modelValue'])

const dropdownTriggerRef = ref<HTMLDivElement | null>(null)
const isOpen = ref<boolean>(false)

const attrs = useAttrs()

const selectionLabel = computed(() => {
    const option = props.options.find(
        (item: Option) => item.name === props.modelValue
    )
    if (option) { return option.label }
    return 'No label'
})

const hasError = computed(() => {
    if (props.errorMessage) { return true }
    return false
})

const dropdownWrapperClasses = computed(() => {
    const baseClasses = 'relative flex flex-col'
    if (typeof attrs.class === 'string' || attrs.class instanceof String) { return twMerge(baseClasses, attrs.class as string) }
    return baseClasses
})

const dropdownTriggerClasses = computed(() => {
    const baseClasses =
    'border bg-transparent dark:bg-black-600 dark:text-white-0 rounded py-4.5 px-5 text-sm leading-3 -tracking-sm font-bold flex justify-start items-center transition'
    let extraClasses = ''
    if (isOpen.value) {
        if (hasError.value) {
            extraClasses = 'border-red-500 ring-1 ring-red-400'
        } else {
            extraClasses =
        'border-blue-400 dark:border-black-500 ring-1 ring-blue-400 dark:ring-black-500'
        }
    } else if (hasError.value) {
        extraClasses = 'border-red-500'
    } else {
        extraClasses = 'border-blue-100 dark:border-black-500'
    }
    return twMerge(baseClasses, extraClasses as string)
})

const closeDropdown = () => {
    isOpen.value = false
}

const openDropdown = () => {
    isOpen.value = true
}

const selectOption = (option: Option) => {
    emit('update:modelValue', option.name)
    closeDropdown()
}
</script>
