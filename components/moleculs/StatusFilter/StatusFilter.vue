<template>
    <div v-click-outside="closeDropdown" class="relative mr-10">
        <button
            aria-label="Filter by status"
            type="button"
            class="text-black-800 dark:text-white-0 text-sm leading-3 -tracking-sm font-bold flex justify-start items-center z-0 relative"
            @click="isOpen ? closeDropdown() : openDropdown()"
        >
            Filter by status
            <span
                v-if="numberOfSelected"
                class="w-5 h-5 rounded-full text-xs bg-blue-500 text-white-0 flex justify-center items-center pt-1 ml-2 flex-shrink-0"
            >
                {{ numberOfSelected }}
            </span>
            <ArrowUpIcon
                :filled="true"
                :font-controlled="false"
                class="h-2 ml-3 mb-0.5"
                :class="!isOpen && '-scale-y-100'"
            />
        </button>
        <Transition name="fade">
            <div v-if="isOpen" class="relative z-10">
                <div
                    class="absolute top-0 left-0 mt-6 p-6 max-h-48 rounded-lg shadow-spread-light dark:shadow-spread-dark flex flex-col justify-start items-stretch bg-white-0 dark:bg-black-500 overflow-y-auto"
                >
                    <DropdownItem
                        v-for="option in options"
                        :key="option.name"
                        :option="option"
                    />
                </div>
            </div>
        </Transition>
    </div>
</template>

<script lang="ts">
export default {
    name: 'StatusFilter',
    inheritAttrs: false
}
</script>

<script setup lang="ts">
import { invoicesStore } from '@/store/invoices'
import DropdownItem from '@/components/moleculs/StatusFilter/partials/DropdownItem.vue'
import ArrowUpIcon from '@/assets/svg/arrow-up-icon.svg'

const invoicesStoreRef = invoicesStore()

const options = ref([
    { name: 0, label: 'Paid' },
    { name: 1, label: 'Pending' },
    { name: 2, label: 'Draft' }
])

const isOpen = ref<boolean>(false)

const closeDropdown = () => {
    isOpen.value = false
}

const openDropdown = () => {
    isOpen.value = true
}

const numberOfSelected = computed(() => {
    const statuses = options.value.filter(status =>
        invoicesStoreRef.filterBy.includes(status.name)
    )
    return statuses.length
})
</script>
