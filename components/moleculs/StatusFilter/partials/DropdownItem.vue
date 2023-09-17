<template>
    <button
        class="w-full dark:text-white-0 text-left text-sm leading-3 -tracking-sm font-bold flex justify-start items-center mb-4 last:mb-0 group"
        type="button"
        @click="handleChangeFilter"
    >
        <div class="relative flex justify-center items-center w-4 h-4 rounded mr-4 shrink-0 border border-transparent group-hover:border-blue-500 transition" :class="checked ? 'bg-blue-500 border-blue-500' : 'bg-blue-100 dark:bg-black-600'">
            <i v-show="checked" class="gg-check" />
        </div>
        {{ option.label }}
    </button>
</template>

<script lang="ts">
export default {
    name: 'DropdownItem',
    inheritAttrs: false
}
</script>

<script setup lang="ts">
import { invoicesStore } from '@/store/invoices'
import { Option } from '@/interfaces/dropdown'

interface Props {
    option: Option
}

const props = defineProps<Props>()

const store = invoicesStore()

const checked = computed(() => {
    return store.filterBy.includes(props.option.name)
})

const handleChangeFilter = () => {
    store.changeFilters(props.option.name)
}

</script>

<style lang="scss" scoped>
.gg-check {
    @apply box-border absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 block w-[22px] h-[22px] border-2 border-transparent rounded-full
}
.gg-check::after {
    @apply block box-border absolute left-[3px] top-[-1px] w-1.5 h-2.5 border-r-2 border-b-2 origin-bottom-left rotate-45;
    content: "";
}
</style>
