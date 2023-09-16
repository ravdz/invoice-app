<template>
    <div :class="datePickerWrapperClasses">
        <div class="flex justify-between items-center mb-2">
            <span
                :for="name"
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

        <VueDatePicker
            v-model="date"
            placeholder="Select date"
            format="dd MMM yyyy"
            model-type="timestamp"
            :clearable="false"
            :enable-time-picker="false"
            auto-apply
            @open="openDatePicker"
            @closed="closeDatePicker"
        >
            <template #arrow-left>
                <ArrowLeftIcon :filled="true" />
            </template>
            <template #arrow-right>
                <ArrowRightIcon :filled="true" />
            </template>
            <template #calendar-icon>
                <CalendarIcon :filled="true" />
            </template>
            <template #dp-input="{ value }">
                <button type="button" :class="datePickerTriggerClasses">
                    <div class="flex justify-start items-center w-full relative">
                        <span v-if="!!value" class="dark:text-white-0">{{ value }}</span>
                        <span v-else class="text-blue-100">Select date</span>
                        <CalendarIcon
                            :filled="true"
                            :font-controlled="false"
                            class="w-4 h-4 absolute top-1/2 right-0 -translate-y-1/2"
                        />
                    </div>
                </button>
            </template>
        </VueDatePicker>
    </div>
</template>

<script lang="ts">
export default {
    name: 'DatePicker',
    inheritAttrs: true
}
</script>

<script setup lang="ts">
// import * as dayjs from 'dayjs'
import VueDatePicker from '@vuepic/vue-datepicker'
import { twMerge } from 'tailwind-merge'
import CalendarIcon from '@/assets/svg/calendar-icon.svg'
import ArrowLeftIcon from '@/assets/svg/arrow-left-icon.svg'
import ArrowRightIcon from '@/assets/svg/arrow-right-icon.svg'
import '@vuepic/vue-datepicker/dist/main.css'

interface Props {
  label: string;
  name: string;
  modelValue: number | null;
  errorMessage?: string | null;
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: 0,
    errorMessage: ''
})

const emit = defineEmits(['update:modelValue'])

const { $dayjs } = useNuxtApp()

const attrs = useAttrs()

const isOpen = ref<boolean>(false)

const hasError = computed(() => {
    if (props.errorMessage) { return true }
    return false
})

const datePickerWrapperClasses = computed(() => {
    const baseClasses = 'flex flex-col'
    if (typeof attrs.class === 'string' || attrs.class instanceof String) { return twMerge(baseClasses, attrs.class as string) }
    return baseClasses
})

const datePickerTriggerClasses = computed(() => {
    const baseClasses =
    'w-full border bg-transparent dark:bg-black-600 rounded py-4.5 px-5 text-sm leading-3 -tracking-sm font-bold flex justify-start items-center transition'
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

const date = computed({
    get () {
        if (props.modelValue) {
            return $dayjs(props.modelValue).valueOf()
        }
        return ''
    },
    set (value) {
        emit('update:modelValue', value)
    }
})

const closeDatePicker = () => {
    isOpen.value = false
}

const openDatePicker = () => {
    isOpen.value = true
}
</script>

<style lang="scss">
:root {
  --dp-month-year-row-button-size: 8px;
  --dp-month-year-row-height: auto;
  --dp-menu-padding: 26px 20px 31px;
}

.dp {
  &__theme_light {
    --dp-border-color: transparent;
    --dp-menu-border-color: transparent;
    --dp-border-color-hover: transparent;
  }
  &__arrow_top,
  &__arrow_bottom {
    @apply hidden;
  }
  &__month_year {
    &_wrap {
      @apply flex justify-center items-center;
    }
    &_select {
      @apply h-auto text-sm leading-3 -tracking-sm text-black-800 dark:text-blue-100 font-bold w-auto transition;
      &:first-child {
        @apply mr-1.5;
      }
      &:hover {
        @apply bg-transparent text-blue-500 dark:text-blue-500;
      }
    }
    &_row {
      @apply mb-8;
    }
  }
  &__menu {
    @apply border border-white-0 dark:border-black-500 rounded-lg shadow-spread-light dark:shadow-spread-dark bg-white-0 dark:bg-black-500 overflow-hidden;
  }
  &__calendar {
    &_header,
    &_header_separator {
      @apply hidden;
    }
  }
  &__cell {
    &_disabled {
      @apply text-black-800 dark:text-blue-100;
    }
    &_inner {
      @apply text-sm leading-3 -tracking-sm font-bold text-black-800 dark:text-blue-100 transition;
    }
    &_offset {
      @apply opacity-[0.0814] dark:text-blue-100;
    }
  }
  &__inner_nav {
    &:hover {
      @apply bg-transparent;
    }
  }
  &__today {
    @apply border-none;
  }
  &__date_hover {
    &:hover {
      @apply bg-transparent text-blue-500 opacity-100;
    }
  }
  &__active_date {
    @apply bg-transparent text-blue-500;
  }
  &__overlay {
    @apply p-3 flex flex-col justify-start items-stretch  bg-white-0 dark:bg-black-500;
    &_container {
      @apply grow;
    }
    &_cell {
      @apply text-sm leading-3 -tracking-sm font-bold transition dark:text-blue-100;
      &:hover,
      &_active {
        @apply bg-transparent text-blue-500 font-bold;
      }
    }
  }
  &__selection_grid_header {
    @apply hidden;
  }
  &__button {
    &.dp__overlay_action {
      @apply h-7 relative bottom-auto p-0;
      & > svg {
        @apply mb-0;
        & > path {
          @apply fill-blue-500;
        }
      }
    }
    &:hover {
      @apply bg-transparent;
    }
  }
}
</style>
