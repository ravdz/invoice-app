<template>
    <div class="rounded-lg mt-9 overflow-hidden">
        <div class="p-6 md:p-8 md:pb-10 bg-white-200 dark:bg-black-500">
            <div class="md:flex items-center w-full mb-8 hidden">
                <Text tag="span" class="basis-5/12 text-blue-300 dark:text-blue-100 text-left">
                    Item Name
                </Text>
                <Text tag="span" class="basis-1/12 text-blue-300 dark:text-blue-100 text-center">
                    QTY.
                </Text>
                <Text tag="span" class="basis-3/12 text-blue-300 dark:text-blue-100 text-right">
                    Price
                </Text>
                <Text tag="span" class="basis-3/12 text-blue-300 dark:text-blue-100 text-right">
                    Total
                </Text>
            </div>
            <ul class="">
                <DetailsItem v-for="item in items" :key="item.id" :item="item" />
            </ul>
        </div>

        <div class="bg-black-400 dark:bg-black-800 p-6 md:px-8 md:pt-7 md:pb-5 flex justify-between items-center">
            <Text tag="span" class="text-white-0">
                Amount Due
            </Text>
            <Heading tag="span" size="m" class=" leading-8 text-white-0">
                {{ amountDue }}
            </Heading>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'DetailItemList',
    inheritAttrs: false
}
</script>

<script setup lang="ts">
import DetailsItem from '@/components/organisms/DetailItemList/partials/DetailsItem.vue'
import Text from '@/components/atoms/Text.vue'
import Heading from '@/components/atoms/Heading.vue'
import { FormItem } from '@/interfaces/invoice-form'

interface Props {
  items: FormItem[];
}

const props = defineProps<Props>()

const amountDue = computed(() => {
    const allPrices = props.items.map(({ price, quantity } : FormItem) => {
        return price * quantity
    })
    if (allPrices.length) {
        const sum = allPrices.reduce((partialSum, a) => partialSum + a, 0)
        if (!isNaN(sum)) return `$${roundNumber(sum)}`
    }
    return 0
})

</script>
