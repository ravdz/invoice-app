<template>
    <NuxtLink :to="invoiceUrl" class="invoice-item">
        <div class="invoice-item__id-wrapper">
            <Heading tag="h2" size="s" class="leading-3">
                <span class="text-blue-300">#</span>{{ invoiceData.id }}
            </Heading>
        </div>
        <div class="invoice-item__date-wrapper">
            <span
                class="text-blue-300 dark:text-blue-100 text-xs leading-3 -tracking-xs"
            >
                {{ invoiceDate }}
            </span>
        </div>
        <div class="invoice-item__client-wrapper">
            <span
                class="text-blue-300 dark:text-white-0  text-xs leading-3 -tracking-xs"
            >
                {{ toClientName }}
            </span>
        </div>
        <div class="invoice-item__price-wrapper">
            <span
                class="text-black-800 dark:text-white-0 font-bold text-sm leading-6 -tracking-sm"
            >
                {{ amountDue }}
            </span>
        </div>
        <div class="invoice-item__status-wrapper">
            <StatusBadge :status-key="invoiceData.status" />
            <ArrowRightIcon :filled="true" :font-controlled="false" class="hidden md:block md:ml-5 h-3" />
        </div>
    </NuxtLink>
</template>

<script lang="ts">
export default {
    name: 'InvoiceItem',
    inheritAttrs: false
}
</script>

<script setup lang="ts">
import * as dayjs from 'dayjs'
import StatusBadge from '@/components/atoms/StatusBadge.vue'
import Heading from '@/components/atoms/Heading.vue'
import { Invoice, InvoiceStatus, FormItem } from '@/interfaces/invoice-form'
import ArrowRightIcon from '@/assets/svg/arrow-right-icon.svg'

interface InvoiceWithId extends Invoice {
  id: string;
  status: InvoiceStatus;
}

interface Props {
  invoiceData: InvoiceWithId;
}

const props = defineProps<Props>()

const invoiceDate = computed(() => {
    if (props.invoiceData.invoiceDate) {
        return dayjs(props.invoiceData.invoiceDate).format('DD MMM YYYY')
    } else {
        return 'Unknown'
    }
})

const toClientName = computed(() => props.invoiceData.toClientName || 'Unknown')

const amountDue = computed(() => {
    const allPrices = props.invoiceData.items.map(({ price, quantity } : FormItem) => {
        return price * quantity
    })
    if (allPrices.length) {
        const sum = allPrices.reduce((partialSum, a) => partialSum + a, 0)
        if (!isNaN(sum)) return `$${sum}`
    }
    return 0
})

const invoiceUrl = computed(() => `/invoices/${props.invoiceData.id}`)
</script>

<style lang="scss" scoped>
.invoice-item {
  @apply grid p-6 rounded-lg shadow-sm mb-4 last:mb-0 bg-white-0 dark:bg-black-600 w-full cursor-pointer border border-transparent hover:border-blue-500 transition;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    "id client"
    "date status"
    "price status";
  @media (min-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
    grid-template-areas: "id date client price status";
  }
  &__id-wrapper {
    @apply flex justify-start items-center mb-6 md:mb-0;
    grid-area: id;
  }
  &__date-wrapper {
    @apply flex justify-start md:justify-center items-center mb-2 md:mb-0;
    grid-area: date;
  }
  &__client-wrapper {
    @apply flex justify-end md:justify-center items-center mb-6 md:mb-0;
    grid-area: client;
  }
  &__price-wrapper {
    @apply flex justify-start md:justify-center items-center;
    grid-area: price;
  }
  &__status-wrapper {
    @apply flex justify-end items-center;
    grid-area: status;
  }
}
</style>
