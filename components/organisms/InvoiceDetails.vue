<template>
    <div class="p-6 md:p-8 rounded-lg bg-white-0 dark:bg-black-600 shadow-sm">
        <div class="flex flex-col md:flex-row justify-start md:justify-between items-stretch md:items-start w-full mb-8 md:mb-5">
            <div class="mb-8 md:mb-0">
                <Heading tag="span" size="s" class="leading-3 mb-1 block">
                    <span class="text-blue-300">#</span>{{ invoiceData.id }}
                </Heading>
                <Text tag="span" class="text-blue-300 dark:text-blue-100 leading-3">
                    {{ invoiceData.description }}
                </Text>
            </div>
            <div class="flex flex-col justify-start items-start">
                <Text tag="span" class="text-blue-300 dark:text-blue-100">
                    {{ invoiceData.fromStreet }}
                </Text>
                <Text tag="span" class="text-blue-300 dark:text-blue-100">
                    {{ invoiceData.fromCity }}
                </Text>
                <Text tag="span" class="text-blue-300 dark:text-blue-100">
                    {{ invoiceData.fromZip }}
                </Text>
                <Text tag="span" class="text-blue-300 dark:text-blue-100">
                    {{ invoiceData.fromCountry }}
                </Text>
            </div>
        </div>

        <div class="flex flex-wrap">
            <div class="basis-1/2 md:basis-1/3">
                <Text tag="span" class="text-blue-300 dark:text-blue-100 leading-3 mb-3.5 block">
                    Invoice Date
                </Text>
                <Heading tag="span" size="s" class="leading-4.5 mb-8 block">
                    {{ invoiceDate }}
                </Heading>

                <Text tag="span" class="text-blue-300 dark:text-blue-100 leading-3 mb-3.5 block">
                    Payment Due
                </Text>
                <Heading tag="span" size="s" class="leading-4.5 block">
                    {{ paymentDue }}
                </Heading>
            </div>
            <div class="basis-1/2 md:basis-1/3">
                <Text tag="span" class="text-blue-300 dark:text-blue-100 leading-3 mb-3.5 block">
                    Bill to
                </Text>
                <Heading tag="span" size="s" class="leading-4.5 mb-2 block">
                    {{ invoiceData.toClientName }}
                </Heading>
                <Text tag="span" class="text-blue-300 dark:text-blue-100 block">
                    {{ invoiceData.toStreet }}
                </Text>
                <Text tag="span" class="text-blue-300 dark:text-blue-100 block">
                    {{ invoiceData.toCity }}
                </Text>
                <Text tag="span" class="text-blue-300 dark:text-blue-100 block">
                    {{ invoiceData.toZip }}
                </Text>
                <Text tag="span" class="text-blue-300 dark:text-blue-100 block">
                    {{ invoiceData.toCountry }}
                </Text>
            </div>
            <div class="basis-full md:basis-1/3 mt-8 md:mt-0">
                <Text tag="span" class="text-blue-300 dark:text-blue-100 leading-3 mb-3.5 block">
                    Sent to
                </Text>
                <Heading tag="span" size="s" class="leading-4.5 block">
                    {{ invoiceData.toClientEmail }}
                </Heading>
            </div>
        </div>

        <DetailItemList :items="invoiceData.items" />
    </div>
</template>

<script lang="ts">
export default {
    name: 'InvoiceDetails',
    inheritAttrs: false
}
</script>

<script setup lang="ts">
import * as dayjs from 'dayjs'
import Text from '@/components/atoms/Text.vue'
import Heading from '@/components/atoms/Heading.vue'
import DetailItemList from '@/components/organisms/DetailItemList.vue'
import { Invoice, InvoiceStatus } from '@/interfaces/invoice-form'

interface InvoiceWithId extends Invoice {
  id: string;
  status: InvoiceStatus;
}

interface Props {
invoiceData: InvoiceWithId
}

const props = defineProps<Props>()

const invoiceDate = computed(() => dayjs(props.invoiceData.invoiceDate).format('DD MMM YYYY'))

const paymentDue = computed(() => {
    const daysNumber = props.invoiceData.paymentTerms
    const paymentDate = dayjs(invoiceDate.value).add(daysNumber || 0, 'day')
    return dayjs(paymentDate).format('DD MMM YYYY')
})

</script>
