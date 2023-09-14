<template>
    <li class="mb-6 md:mb-8 last:mb-0 w-full">
        <div class="flex justify-between items-center w-full md:hidden">
            <div>
                <Heading tag="span" size="s" class="leading-3 mb-2 block">
                    {{ item.name }}
                </Heading>
                <Heading tag="span" size="s" class="leading-3 text-blue-300 dark:text-blue-200 block">
                    {{ item.quantity }} x ${{ item.price }}
                </Heading>
            </div>
            <Heading tag="span" size="s" class="leading-3">
                {{ totalPrice }}
            </Heading>
        </div>
        <div class="hidden md:flex items-center w-full">
            <Heading tag="span" size="s" class="leading-3 basis-5/12 text-black-800 dark:text-white-0 text-left">
                {{ item.name }}
            </Heading>
            <Heading tag="span" size="s" class="leading-3 basis-1/12 text-blue-300 dark:text-blue-100 text-center">
                {{ item.quantity }}
            </Heading>
            <Heading tag="span" size="s" class="leading-3 basis-3/12 text-blue-300 dark:text-blue-100 text-right">
                ${{ item.price }}
            </Heading>
            <Heading tag="span" size="s" class="leading-3 basis-3/12 text-black-800 dark:text-white-0 text-right">
                {{ totalPrice }}
            </Heading>
        </div>
    </li>
</template>

<script lang="ts">
export default {
    name: 'DetailsItem',
    inheritAttrs: false
}
</script>

<script setup lang="ts">
import Heading from '@/components/atoms/Heading.vue'
import { FormItem } from '@/interfaces/invoice-form'
import { roundNumber } from '@/utils/helpers'

interface Props {
item: FormItem
}

const props = defineProps<Props>()

const totalPrice = computed(() => {
    const { quantity, price } = props.item
    return `$${roundNumber(price * quantity)}`
})

</script>
