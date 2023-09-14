<template>
    <div :class="inputWrapperClasses">
        <div class="flex justify-between items-center mb-2 label">
            <label
                v-if="!!label"
                :for="name"
                class="text-xs leading-3 -tracking-xs w-fit"
                :class="hasError ? 'text-red-500' : 'text-blue-300 dark:text-blue-100'"
            >
                {{ label }}
            </label>
            <span
                v-if="hasError"
                class="text-xxs leading-3 -tracking-sm font-bold text-red-500 error-label"
            >
                {{ errorMessage }}
            </span>
        </div>
        <input
            :id="name"
            v-model="inputValue"
            :type="type"
            :name="name"
            :placeholder="placeholder"
            :min="min"
            :step="step"
            :max="max"
            class="border box-border w-full placeholder:text-blue-100 bg-transparent dark:bg-black-600 dark:text-white-0 rounded py-4.5 px-5 text-sm leading-3 -tracking-sm font-bold focus:outline-none focus:ring-1 dark:focus:ring-black-500 transition"
            :class="
                hasError
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-400'
                    : 'border-blue-100 dark:border-black-500 focus:border-blue-400 dark:focus:border-black-500 focus:ring-blue-400'
            "
        >
    </div>
</template>

<script lang="ts">
export default {
    name: 'VueInput',
    inheritAttrs: true
}
</script>

<script setup lang="ts">
import { twMerge } from 'tailwind-merge'

interface Props {
  label?: string;
  type?: string;
  name: string;
  placeholder?: string;
  modelValue: string | number;
  errorMessage?: string | null;
  min?: string;
  step?: string;
  max?: string;
}

const props = withDefaults(defineProps<Props>(), {
    label: '',
    type: 'text',
    placeholder: '',
    modelValue: '',
    errorMessage: '',
    min: '',
    step: '',
    max: ''
})

const emit = defineEmits(['update:modelValue'])

const attrs = useAttrs()

const inputValue = computed({
    get () {
        return props.modelValue
    },
    set (value) {
        emit('update:modelValue', value)
    }
})

const hasError = computed(() => {
    if (props.errorMessage) { return true }
    return false
})

const inputWrapperClasses = computed(() => {
    const baseClasses = 'flex flex-col'
    if (typeof attrs.class === 'string' || attrs.class instanceof String) { return twMerge(baseClasses, attrs.class as string) }
    return baseClasses
})
</script>

<style lang="scss" scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
